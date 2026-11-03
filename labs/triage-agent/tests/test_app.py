import os
import unittest
from unittest.mock import patch
from app import invoke

class AppTests(unittest.TestCase):
    def test_entrypoint_rejects_override_fields(self):
        self.assertEqual(invoke({"case_id":"A1","mode":"bedrock"})["status"],"invalid_request")

    def test_offline_entrypoint_is_complete(self):
        with patch.dict(os.environ,{"TRIAGE_MODE":"offline"}):
            result=invoke({"case_id":"A1"})
        self.assertEqual(result["status"],"completed")
        self.assertEqual(len(result["evidence"]),4)
        self.assertEqual(result["mode"],"offline_simulation")

    def test_invalid_mode_fails_closed(self):
        with patch.dict(os.environ,{"TRIAGE_MODE":"other"}):
            self.assertEqual(invoke({})["status"],"configuration_error")

    def test_missing_bedrock_opt_in_is_safe_error(self):
        with patch.dict(os.environ,{"TRIAGE_MODE":"bedrock"},clear=True):
            result=invoke({"case_id":"A1"})
        self.assertEqual(result["status"],"unavailable")
        self.assertNotIn("answer",result)

if __name__=="__main__": unittest.main()
