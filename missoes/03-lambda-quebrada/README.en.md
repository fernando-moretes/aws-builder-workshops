# Mission 3: broken Lambda

**The question:** "What does this error mean, and how do I find out on my own?"

You will break a function on purpose, read the error and use the AI to learn how to investigate, not just to receive a ready-made answer.

| | |
|---|---|
| **Time** | About 1 hour |
| **Cost** | Normally zero: the Lambda free tier includes 1 million requests per month |
| **No AWS account?** | Do steps 1 to 3 on your computer, with just Python |
| **You take away** | A way of reading logs that works in any system |

## 1. Write your hypothesis

Look at the function, in [lambda_function.py](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/03-lambda-quebrada/lambda_function.py):

```python
def lambda_handler(event, context):
    nome = event["nome"]
    return {"statusCode": 200, "body": json.dumps({"mensagem": f"Oi, {nome}!"})}
```

Write down: **what happens if it receives an empty event, `{}`?** And which status code do you expect to see?

## 2. Break it on your computer

Download the files `lambda_function.py` and [rodar_local.py](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/03-lambda-quebrada/rodar_local.py) and run:

```sh
python3 rodar_local.py '{}'
```

```text
KeyError: 'nome'
```

Now with a correct event:

```sh
python3 rodar_local.py '{"nome": "Ana"}'
```

## 3. Use the AI as a tutor, not as an oracle

```text
You are my tutor. I am learning to read errors and I do NOT want the ready-made fix.

This is my code: [paste the function]
This is the error: [paste the error]

1. Tell me which line to look at and what that line expects to receive.
2. Ask me a question that helps me find the cause on my own.
3. Only after I answer, compare my answer with yours.
```

When you understand the cause, fix it yourself. For example: what should the function do when `nome` is missing?

## 4. Break it on AWS

Skip this if you do not have an account yet. In [CloudShell](https://console.aws.amazon.com/cloudshell/?lang=en), region `us-east-1`:

```sh
B=https://raw.githubusercontent.com/fernando-moretes/aws-builder-workshops/main/missoes/03-lambda-quebrada
curl -sO $B/lambda_function.py
curl -sO $B/politica-confianca.json
zip f.zip lambda_function.py

CONTA=$(aws sts get-caller-identity --query Account --output text)
aws iam create-role --role-name missao3-role \
  --assume-role-policy-document file://politica-confianca.json
aws iam attach-role-policy --role-name missao3-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
sleep 15

aws lambda create-function --function-name missao3 --runtime python3.13 \
  --handler lambda_function.lambda_handler \
  --role arn:aws:iam::$CONTA:role/missao3-role --zip-file fileb://f.zip
aws lambda wait function-active-v2 --function-name missao3
```

Call the function with an empty event:

```sh
aws lambda invoke --function-name missao3 --cli-binary-format raw-in-base64-out \
  --payload '{}' resposta.json
cat resposta.json
```

This was the real response in our test:

```json
{ "StatusCode": 200, "FunctionError": "Unhandled" }
```

```json
{"errorMessage": "'nome'", "errorType": "KeyError"}
```

**Look at the detail: the status is 200, and the function still failed.** The 200 says the call to the Lambda service worked. The error from your function is in `FunctionError`. Anyone who looks only at the status thinks everything went fine.

## 5. Read the log, and catch the AI making a mistake

Wait about 15 seconds and read the logs:

```sh
aws logs tail /aws/lambda/missao3 --since 10m --format short
```

```text
[ERROR] KeyError: 'nome'
  File "/var/task/lambda_function.py", line 5, in lambda_handler
    nome = event["nome"]
REPORT ... Duration: 52.74 ms  Memory Size: 128 MB  Max Memory Used: 32 MB
```

Ask your AI, **without showing it this page**:

```text
I called a Lambda function with the AWS CLI and the StatusCode came back 200.
Does that mean my function ran without errors? Cite the documentation.
```

Did it notice the difference? Does the link it cited confirm it? Open it and write it down. The [Invoke API documentation](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html) says it plainly: "The status code in the API response doesn't reflect function errors".

## Cleanup

Run everything and check that nothing is left:

```sh
aws lambda delete-function --function-name missao3
aws iam detach-role-policy --role-name missao3-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam delete-role --role-name missao3-role
aws logs delete-log-group --log-group-name /aws/lambda/missao3
aws lambda list-functions --query "Functions[?FunctionName=='missao3'].FunctionName"
```

The last line must show `[]`.

## Now turn this into content

| Field | Example of what to write |
|---|---|
| **Topic** | My Lambda answered 200 and it was broken |
| **Audience** | People learning to read logs |
| **Problem** | Trusting only the status code |
| **Goal** | Find an error from the log, without asking for the ready-made answer |
| **Evidence** | Your hypothesis, the real output, the log, and what the AI got right or wrong |

Continue with [From test to article](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/primeiro-experimento/).

## What was tested

On 06/11/2026, the function, the outputs above and the cleanup ran in a real account with the AWS CLI, in `us-east-1` and Python 3.13. The names used in the test were different, with their own prefix, and nothing was left in the account. The commands were not run inside CloudShell.

Sources, checked on 06/11/2026: [Invoke API](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html), [Lambda pricing](https://aws.amazon.com/lambda/pricing/) and [CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html).
