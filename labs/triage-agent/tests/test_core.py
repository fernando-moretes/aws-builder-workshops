import os
import unittest
from unittest.mock import patch
from core import EvidenceStore, offline_report, validate_payload, CASES
from agent import CallBudget, ModelCallLimit, bedrock_report

class EvidenceTests(unittest.TestCase):
    def test_invalid_payloads_rejected(self):
        for payload in [None, [], "text", {"case_id": []}, {"case_id": "A9"},
                        {"prompt": ""}, {"prompt": 123}, {"prompt": "x"*1501},
                        {"system_prompt": "override"}, {"tools": ["shell"]}]:
            with self.subTest(payload=str(payload)[:60]), self.assertRaises(ValueError):
                validate_payload(payload)

    def test_tool_scope_cannot_be_expanded(self):
        store=EvidenceStore("A1")
        for component in ["database", "../secrets", "https://example.com", None]:
            with self.assertRaises(ValueError): store.status(component)
        with self.assertRaises(ValueError): store.runbook("OTHER")
        self.assertEqual(store.calls, [])

    def test_unavailable_is_not_zero(self):
        evidence=EvidenceStore("A2").status("liquidacao")
        self.assertEqual(evidence["query_status"],"unavailable")
        self.assertEqual(evidence["component_health"],"unknown")
        self.assertIsNone(evidence["metrics"])
        self.assertIsNone(evidence["observed_at"])

    def test_staleness_uses_scenario_clock(self):
        self.assertTrue(EvidenceStore("A3").status("fila")["stale"])
        self.assertFalse(EvidenceStore("A1").status("fila")["stale"])

    def test_returned_values_do_not_corrupt_audit(self):
        store=EvidenceStore("A1")
        result=store.status("fila")
        result["metrics"]["backlog_messages"]=0
        self.assertEqual(store.evidence[0]["metrics"]["backlog_messages"],6000)

    def test_calls_and_evidence_are_isolated(self):
        first=EvidenceStore("A1");second=EvidenceStore("A1")
        first.status("api")
        self.assertEqual(second.calls,[])
        self.assertEqual(second.evidence,[])

    def test_all_cases_label_simulation_and_no_network(self):
        for case in CASES:
            with self.subTest(case=case):
                report=offline_report({"case_id":case})
                self.assertEqual(report["mode"],"offline_simulation")
                self.assertEqual(report["model_calls"],0)
                self.assertEqual(report["aws_calls"],0)
                self.assertEqual(report["mutations"],0)

    def test_adversarial_fixture_is_data(self):
        store=EvidenceStore("A4");result=store.runbook("INC-001")
        self.assertFalse(result["trusted_instructions"])
        self.assertIn("TRECHO ADVERSARIAL",result["content"])
        self.assertFalse(hasattr(store,"shell"))

    def test_mutation_case_performs_no_tool_calls(self):
        report=offline_report({"case_id":"A5"})
        self.assertEqual(report["tool_calls"],[])
        self.assertIn("fora do escopo",report["answer"])

    def test_model_limit_blocks_fifth_call(self):
        budget=CallBudget(4)
        for _ in range(4): budget.consume()
        with self.assertRaises(ModelCallLimit): budget.consume()
        self.assertEqual(budget.calls,4)

    def test_bedrock_requires_explicit_enablement(self):
        with patch.dict(os.environ,{},clear=True),self.assertRaises(RuntimeError):
            bedrock_report({"case_id":"A1"})

    def test_bedrock_rejects_wrong_region_before_sdk(self):
        with patch.dict(os.environ,{"TRIAGE_ENABLE_BEDROCK":"1","AWS_REGION":"sa-east-1"},clear=True),self.assertRaises(RuntimeError):
            bedrock_report({"case_id":"A1"})

if __name__=="__main__": unittest.main()
