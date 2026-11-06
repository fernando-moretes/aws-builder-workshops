import json


def lambda_handler(event, context):
    nome = event["nome"]
    return {"statusCode": 200, "body": json.dumps({"mensagem": f"Oi, {nome}!"})}
