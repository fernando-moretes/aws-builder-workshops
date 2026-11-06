---
title: Examples with real answers
description: The mission prompts run on a real AI, with the check done afterwards, and how each one becomes an article proposal.
---

We ran the mission prompts on a real AI (Claude Sonnet 5.5, on 06/11/2026, without web search) and checked the answers afterwards. **One answer per prompt: this is not a benchmark.** Another AI, or the same one on another day, may answer differently.

The lesson was not what we expected: the AI did well. Checking is still what turns an answer into evidence.

## Mission 1: the cost report

[Full answer](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-1-custos.md) (in Portuguese)

| What we checked | Result |
|---|---|
| Totals: 0.92 and 25.63 USD | Correct, they match the `custos` command |
| Biggest increase: NAT Gateway, +16.20 | Identified correctly |
| Ended with questions, without the ready-made conclusion | Yes, as the prompt asked |
| Claims beyond the file | "Lambda and Amplify probably stayed in the free tier": that is a guess, and it said "probably" |

**It becomes this proposal**

- **Topic:** what weighs the most in a small AWS account was not what I imagined.
- **Audience:** people who just created their account.
- **Problem:** thinking the cost is always in the server.
- **Goal:** read a report and find the biggest increase in 1 hour.
- **Evidence:** the hypothesis, the AI's answer, the output of `custos` and the alert you created.

## Mission 2: the options for publishing a site

[Full answer](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-2-site.md) (in Portuguese)

| What we checked | Result |
|---|---|
| Warned that a site on S3 requires Block Public Access to be off | Yes, and the documentation confirms it |
| Said that a site on S3 only has HTTP | Yes, and the documentation confirms it |
| 7 links cited | All of them opened. It warned that it had not opened them |
| Recommendation | S3 with CloudFront, mentioning Amplify as a simpler alternative |

Notice that the AI and the mission chose different paths, and both are defensible. CloudFront gives more control. Amplify has fewer pieces for people just getting started. **Comparing and deciding is your job**, and that decision makes a great paragraph for the article.

**It becomes this proposal**

- **Topic:** I published my portfolio without leaving a bucket public.
- **Audience:** people who have never published anything in the cloud.
- **Problem:** choosing between options without knowing what each one opens up.
- **Goal:** compare two options and publish one in 1 hour.
- **Evidence:** the comparison, the sources you opened, the site with HTTPS and the cleanup.

## Mission 3: tutoring on the error

[Full answer](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-3-tutor.md) (in Portuguese)

| What we checked | Result |
|---|---|
| Pointed to the right line | Yes |
| Held back the fix, as asked | Yes: it asked a question and waited |

## Mission 3: the StatusCode 200

[Full answer](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/examples/respostas-ia/missao-3-statuscode.md) (in Portuguese)

| What we checked | Result |
|---|---|
| Said that 200 does not guarantee the function ran without errors | Correct, and it matched our real test |
| Citation of `FunctionError` | Matches the [Invoke API](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html) |
| 202 for `Event` and 204 for `DryRun` | Match the same page |

**It becomes this proposal**

- **Topic:** my Lambda answered 200 and it was broken.
- **Audience:** people learning to read logs.
- **Problem:** trusting only the status code.
- **Goal:** find an error from the log, without asking for the ready-made answer.
- **Evidence:** the hypothesis, the real output, the log and the documentation.

## A complete example

Want to see it from start to finish, with hypotheses that fell apart and the finished article? See the [queue example](/aws-builder-workshops/en/trilhas/exemplo-completo/).
