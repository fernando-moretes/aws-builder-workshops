"""Roda a função no seu computador, sem conta AWS: python3 rodar_local.py '{}'"""
import json
import sys

from lambda_function import lambda_handler

evento = json.loads(sys.argv[1] if len(sys.argv) > 1 else "{}")
print(lambda_handler(evento, None))
