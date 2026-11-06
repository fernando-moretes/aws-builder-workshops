---
title: Frequently asked questions
description: Cost, AWS account, use of AI, authorship and what to do when something goes wrong.
---

## About getting started

### I have never used AWS. Can I do this?

Yes: the missions were made for that, and steps 1 to 3 of each one work without an account. Create the account only when you want to go further.

### Which mission do I start with?

Use the [interactive menu](/aws-builder-workshops/en/comece/escolha/). If you are still unsure, start with [A bill without surprises](/aws-builder-workshops/en/missoes/1-conta-sem-susto/): the spending alert is useful before anything else.

### Do I need to know how to program?

In missions 1 and 2, no: you just copy commands and edit some text. Mission 3 uses a 3-line Python function, and understanding the error is the goal.

### Which AI do I use?

The one you already have. The prompts work in any assistant. In Kiro and other IDEs, you can [connect the kit](/aws-builder-workshops/en/agentes/kiro/) so the AI guides you.

## About cost

### Will I spend money?

The steps without an account are free. In the account, regular Budgets have no cost, CloudShell has no additional cost, and Lambda and Amplify have a free tier for a test this size. Check your own account, because values and plans change. Each mission lists its sources, with the date they were checked.

### Does the spending alert block charges?

No. It warns you, but it does not turn anything off. If an email arrives, look at the bill right away.

### I forgot to delete things. Now what?

Run the commands in the **Cleanup** section of the mission. They can be run at any time. Then look at the Billing console to check.

### I was charged by mistake. What do I do?

Delete the resource first and open a case with [AWS Support](https://console.aws.amazon.com/support/?lang=en), explaining what happened. The result cannot be guaranteed, but it is the official path.

## About AI and authorship

### Why doesn't the AI write the article?

Because the value is in what you tested and saw, and a model did not run that test. Also, you are responsible for the text: you need to be able to explain every claim.

### So what can I use AI for?

To ask questions, understand errors, compare options and review clarity and organization. If it helped, say how in the article.

### What if the AI gets everything right?

Great, and checking is still worth it. In the [real examples](/aws-builder-workshops/en/trilhas/exemplos/), the AI got a lot right. You only know that because you checked.

### Are the prices the AI gives correct?

They may be out of date. Ask for the source, open the link and check the date. Treat a number without a source as a hypothesis.

## About security

### Can I paste my account data into the AI?

Do not paste keys, passwords, account IDs, or personal or customer data. Use made-up data, like the data in the missions, or remove anything sensitive.

### The AI asked for my access key. What do I do?

Do not hand it over. No mission needs it: you run the commands in your own CloudShell session.

### Should I use the root user?

Avoid it day to day. Create your own user and turn on MFA following the [IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

## When something goes wrong

### A command gave an error. Now what?

That is part of the mission. Paste the error into the AI with the tutoring prompt from mission 3, read it and write it down in your evidence log.

### "AccessDenied" appears.

The identity you are using does not have that permission. Check with `aws sts get-caller-identity` and ask the AI to explain which permission is missing, without widening access blindly.

### My Amplify site shows "Access Denied".

Almost always, you zipped the folder instead of its contents. Create the `.zip` with `index.html` at the root.

### I found a mistake in this material.

Tell us in [issue #1](https://github.com/fernando-moretes/aws-builder-workshops/issues/1). It is the most useful contribution right now.
