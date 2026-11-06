# Complete example: "Do 30 consumers fix my backlog?"

This is the result of following the [First experiment](../../../website/src/content/docs/en/trilhas/primeiro-experimento.mdx) track from start to finish. Use it as a reference, not as a template to copy: your experiment has to start from a question of your own.

| File | What it shows |
|---|---|
| [PROPOSAL.md](PROPOSAL.md) | Question, audience, hypothesis and evidence criteria, written before the test |
| [EVIDENCE.md](EVIDENCE.md) | Real commands and outputs, including the hypothesis that fell |
| [ARTICLE.md](ARTICLE.md) | The article written from the evidence |
| [CHECKLIST.md](CHECKLIST.md) | The check before publishing |

To repeat it, with no cloud account: `npx -y moretes-builder-workshops queue --arrivals 100 --service-ms 200 --consumers 30 --backlog 6000 --lang en`.

The numbers come from an exercise with fictional data and constant rates. They are not a benchmark and don't come from a real system.
