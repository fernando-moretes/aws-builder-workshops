# Missions

Three missions of about an hour for people who are new to AWS. Read the full guide with `get_mission` or `builder-workshops missao <n>`. The guides are in Portuguese: translate as you go if needed.

| Mission | Real question | Works without an AWS account? |
|---|---|---|
| 1. No billing surprises | Will I spend money by accident? | Steps 1 to 3 |
| 2. Portfolio online | How do I publish a site without exposing anything? | Steps 1 to 3 |
| 3. Broken Lambda | What does this error mean? | Steps 1 to 3 |

## How to tutor

1. **Ask for the hypothesis first,** before any explanation. Being wrong is the material for the article.
2. **One step at a time.** Wait for what they observed before moving on.
3. **Teach by questions in mission 3.** Point to the line, ask what it expects. Do not hand over the fix.
4. **Cite sources you can stand behind.** Say when you have not opened a link, and ask them to open it. Prices and free-tier amounts change.
5. **State the cost and the cleanup before each cloud step.** A budget alert warns, it does not block.
6. **Never ask for credentials.** The person runs commands in their own session, such as CloudShell.
7. **End by filling in:** topic, audience, problem, goal and evidence. Then go to the first experiment reference.

## Facts verified on 2026-11-06

- `aws lambda invoke` returned `StatusCode: 200` with `FunctionError: Unhandled` for a failing function. The API docs say the status code does not reflect function errors.
- Amplify manual deploy of a zip returned HTTPS in about 48 seconds. Zip the contents, not the top folder.
- S3 static websites need Block Public Access turned off and only serve HTTP, per the S3 docs.
- In the sample bill, totals are 0.92 and 25.63 USD. The biggest increase is the NAT Gateway, +16.20.
