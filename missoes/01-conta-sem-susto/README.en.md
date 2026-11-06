# Mission 1: a bill without surprises

**The question:** "If I create an AWS account, will I get a scary bill?"

| | |
|---|---|
| **Time** | About 1 hour |
| **Cost** | Zero. Regular budgets are free |
| **No AWS account?** | Do steps 1 to 3 in full |
| **You take away** | A spending alert and the habit of checking what the AI tells you |

## 1. Write your hypothesis

Before you open any tool, open a file and write down: **what do you think costs the most in a small account?** It is fine to be wrong. The mistake is what makes a good article.

## 2. Ask the AI to help you read a bill

Download the file [custos-exemplo.csv](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/01-conta-sem-susto/custos-exemplo.csv), which has made-up data. Then paste this into your AI assistant:

```text
You are my AWS tutor. I am learning and have never used AWS at work.
Below is a two-month cost report, with made-up data.

1. Tell me the total for each month and the difference.
2. List the services that changed the most, with the amounts.
3. Explain each one with a simple comparison.
4. Finish with 3 questions for me to investigate. Do not give me the conclusion.

[paste the CSV content here]
```

## 3. Catch the AI making a mistake

Check the bill without using the AI:

```sh
npx -y moretes-builder-workshops custos custos-exemplo.csv --lang en
```

```text
Total: 0.92 USD -> 25.63 USD (+24.71 USD)

Biggest changes
  Amazon VPC (NAT Gateway)  0.00 -> 16.20  (+16.20)
  Amazon EC2 - Compute  0.00 -> 8.47  (+8.47)
  Amazon S3  0.12 -> 0.14  (+0.02)
  Amazon CloudWatch  0.30 -> 0.32  (+0.02)

Only sums the file. It does not explain the cause or know current prices.
```

Now compare and write down:

- Do the AI's totals match?
- Did it notice that the biggest increase is the NAT Gateway, not the EC2 server?
- Did it state a price or a cause that was not in the file? If so, ask for the source and open the link.

The AI may get everything right. Checking is still worth it, because that is how you know it got it right. [See a real answer](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/exemplos/).

## 4. Create your alert on AWS

Skip this if you do not have an account yet. In [CloudShell](https://console.aws.amazon.com/cloudshell/?lang=en), the terminal that comes ready to use in the browser, download the two mission files and replace the email in `alertas.exemplo.json`:

```sh
curl -sO https://raw.githubusercontent.com/fernando-moretes/aws-builder-workshops/main/missoes/01-conta-sem-susto/orcamento.json
curl -sO https://raw.githubusercontent.com/fernando-moretes/aws-builder-workshops/main/missoes/01-conta-sem-susto/alertas.exemplo.json
sed -i 's/SEU-EMAIL@exemplo.com/voce@exemplo.com/' alertas.exemplo.json

CONTA=$(aws sts get-caller-identity --query Account --output text)
aws budgets create-budget --account-id "$CONTA" \
  --budget file://orcamento.json \
  --notifications-with-subscribers file://alertas.exemplo.json
```

Check that it came out right:

```sh
aws budgets describe-notifications-for-budget --account-id "$CONTA" \
  --budget-name conta-sem-susto \
  --query 'Notifications[].[NotificationType,Threshold]' --output text
```

```text
ACTUAL      80.0
FORECASTED  100.0
```

This warns you when actual spending passes 80% of US$ 5 and when the forecast passes US$ 5.

Prefer clicking? In the [Budgets console](https://console.aws.amazon.com/cost-management/home?lang=en#/budgets), use **Create budget** and the **Zero spend budget** template.

> **The alert warns you, but it does not block anything.** It does not turn anything off by itself. If an email arrives, the next step is up to you.

## Cleanup

I recommend keeping this alert: it is free and it protects the account. To delete it:

```sh
aws budgets delete-budget --account-id "$CONTA" --budget-name conta-sem-susto
```

## Now turn this into content

| Field | Example of what to write |
|---|---|
| **Topic** | How to avoid a scary AWS bill |
| **Audience** | People who just created their account |
| **Problem** | Not knowing what generates cost |
| **Goal** | Create an alert and read a report in 1 hour |
| **Evidence** | Your hypothesis, the AI's answer, the output of `custos`, and what did not match |

Continue with [From test to article](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/primeiro-experimento/).

## What was tested

On 06/11/2026, the commands in step 4 and in the cleanup ran in a real account, with the AWS CLI. The test used a high limit so it would not trigger emails, and deleted the budget right afterwards. Creating the budget through the console was not tested.

Sources, checked on 06/11/2026: [AWS Budgets pricing](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/), [budget templates](https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html) and [CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html).
