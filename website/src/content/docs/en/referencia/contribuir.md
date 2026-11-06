---
title: How to contribute
description: Testing the first run, reporting what confused you and proposing scenarios are the most useful contributions.
---

## The most useful right now: test the first run

You don't need an AWS account. Follow the [lab guide](/aws-builder-workshops/en/trilhas/lab-triagem/) and [open a report](https://github.com/fernando-moretes/aws-builder-workshops/issues/new?template=reproducao.yml) telling us where you got stuck. A confusing instruction or a reproducible failure is worth more than a compliment.

## Other ways

- **New adversarial case:** describe the condition, the expected behavior and the common failure.
- **Source fix:** a broken link or an outdated claim.
- **Translation:** Portuguese and English today. Other languages are welcome.
- **Workshop report:** what worked and what ran late, with permission from the people who took part.

## Changing code

```sh
git clone https://github.com/fernando-moretes/aws-builder-workshops.git
cd aws-builder-workshops
npm install
npm test
npm run check
```

- Changed `labs/triage-agent/core.py`? Run `npm run golden` and keep `core.mjs` identical.
- Changed the skill? Run `npm run sync`.
- Say what was and wasn't run on AWS.

## What to never send

Credentials, account information, personal data, customer data or content under a nondisclosure agreement.
