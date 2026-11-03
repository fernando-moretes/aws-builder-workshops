"""Exercise the actual Strands tool loop using botocore Stubber; no network or billing."""
import os
import unittest
from unittest.mock import patch
import boto3
from botocore.stub import Stubber
from strands.types.exceptions import EventLoopException
from agent import bedrock_report, ModelCallLimit

ENV={"TRIAGE_ENABLE_BEDROCK":"1","TRIAGE_MODEL_ID":"amazon.nova-micro-v1:0",
     "AWS_REGION":"us-east-1","AWS_EC2_METADATA_DISABLED":"true"}

def response(content, reason):
    return {"output":{"message":{"role":"assistant","content":content}},
            "stopReason":reason,"usage":{"inputTokens":20,"outputTokens":10,"totalTokens":30},
            "metrics":{"latencyMs":10}}

class AdapterTests(unittest.TestCase):
    def session(self):
        return boto3.Session(aws_access_key_id="testing",aws_secret_access_key="testing",
                             region_name="us-east-1")

    def test_real_sdk_tool_round_trip_with_stubbed_bedrock(self):
        session=self.session()
        client=session.client("bedrock-runtime")
        with Stubber(client) as stub:
            stub.add_response("converse",response([{"toolUse":{"toolUseId":"tool1","name":"consultar_status","input":{"componente":"fila"}}}],"tool_use"))
            stub.add_response("converse",response([{"text":"A fila possui backlog sintético de 6000: fixture://A1/status/fila. A causa permanece desconhecida."}],"end_turn"))
            with patch.dict(os.environ,ENV,clear=True),patch("boto3.Session",return_value=session),patch.object(session,"client",return_value=client):
                report=bedrock_report({"case_id":"A1"})
            stub.assert_no_pending_responses()
        self.assertEqual(report["model_calls"],2)
        self.assertEqual(report["tool_calls"],[{"tool":"consultar_status","component":"fila"}])
        self.assertEqual(report["evidence"][0]["metrics"]["backlog_messages"],6000)
        self.assertEqual(report["mutations"],0)
        self.assertEqual(report["usage"]["totalTokens"],60)

    def test_hook_stops_repeated_tool_loop_before_fifth_model_call(self):
        session=self.session()
        client=session.client("bedrock-runtime")
        with Stubber(client) as stub:
            for n in range(4):
                stub.add_response("converse",response([{"toolUse":{"toolUseId":"tool"+str(n),"name":"consultar_status","input":{"componente":"api"}}}],"tool_use"))
            with patch.dict(os.environ,ENV,clear=True),patch("boto3.Session",return_value=session),patch.object(session,"client",return_value=client):
                with self.assertRaises(EventLoopException) as raised:
                    bedrock_report({"case_id":"A1"})
                self.assertIsInstance(raised.exception.__cause__, ModelCallLimit)
            stub.assert_no_pending_responses()

    def test_unknown_component_is_not_added_to_evidence(self):
        session=self.session()
        client=session.client("bedrock-runtime")
        with Stubber(client) as stub:
            stub.add_response("converse",response([{"toolUse":{"toolUseId":"bad","name":"consultar_status","input":{"componente":"production-secret"}}}],"tool_use"))
            stub.add_response("converse",response([{"text":"Não tenho evidência desse componente."}],"end_turn"))
            with patch.dict(os.environ,ENV,clear=True),patch("boto3.Session",return_value=session),patch.object(session,"client",return_value=client):
                report=bedrock_report({"case_id":"A1"})
            stub.assert_no_pending_responses()
        self.assertEqual(report["evidence"],[])
        self.assertEqual(report["tool_calls"],[])

if __name__=="__main__": unittest.main()
