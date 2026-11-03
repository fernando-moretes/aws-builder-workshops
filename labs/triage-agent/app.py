"""AgentCore-compatible entrypoint, also runnable on localhost without AWS."""
import json
import logging
import os
import uuid

from bedrock_agentcore import BedrockAgentCoreApp
from core import offline_report, validate_payload

app = BedrockAgentCoreApp()
logger = logging.getLogger("triage")


@app.entrypoint
def invoke(payload):
    request_id = str(uuid.uuid4())
    try:
        case_id, _ = validate_payload(payload)
    except ValueError as exc:
        return {"status": "invalid_request", "error": str(exc), "request_id": request_id}
    mode = os.environ.get("TRIAGE_MODE", "offline")
    if mode not in {"offline", "bedrock"}:
        return {"status": "configuration_error", "request_id": request_id}
    try:
        if mode == "bedrock":
            from agent import bedrock_report
            result = bedrock_report(payload)
        else:
            result = offline_report(payload)
    except Exception as exc:
        # Deliberately omit exception detail from client/log to avoid leaking SDK credentials or internals.
        logger.warning(json.dumps({"event": "triage_failed", "request_id": request_id,
                                   "case_id": case_id, "error_type": type(exc).__name__}))
        return {"status": "unavailable", "case_id": case_id, "request_id": request_id,
                "message": "Não foi possível concluir a consulta. Nenhum resultado deve ser inferido."}
    logger.info(json.dumps({"event": "triage_completed", "request_id": request_id,
                           "case_id": case_id, "mode": result["mode"],
                           "model_calls": result["model_calls"], "tool_calls": len(result["tool_calls"])}))
    return {"status": "completed", **result, "request_id": request_id}


if __name__ == "__main__":
    app.run(host=os.environ.get("TRIAGE_BIND", "127.0.0.1"))
