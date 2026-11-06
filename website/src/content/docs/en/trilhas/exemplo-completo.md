---
title: Complete example
description: A real experiment from start to finish, with the question, the commands, the outputs, the hypotheses that fell and the final article.
---

An experiment done by following the track, with real outputs, unedited. The data is fictional and the rates are constant: it's not a benchmark. The files are in [`examples/first-experiment/en`](https://github.com/fernando-moretes/aws-builder-workshops/tree/main/examples/first-experiment/en).

## 1. The proposal, written before the test

- **Real question:** when a queue piles up messages, does adding consumers fix it?
- **Audience:** someone in their first job with asynchronous systems, who hears "just scale it" in every incident.
- **Problem:** this person can't predict when more consumers help and when they change nothing.
- **Goal:** in two hours, calculate three scenarios and explain the difference.
- **Hypothesis:** with 20 consumers the queue is already healthy, because 20 × 5 messages/s covers the 100 messages/s arriving. With 30, it drains faster, and nothing else changes.
- **How I'll test it:** a local capacity calculation with fictional data: 100 messages/s, 200 ms of service time, 6,000 in the backlog.
- **What counts as evidence:** utilization, surplus and drain time for each scenario.
- **Expected cost:** zero. It runs in the terminal, with no cloud account.

## 2. The evidence

Real outputs of `builder-workshops queue`, unedited.

### Test 1: 20 consumers

Expected: a healthy queue, with the backlog draining slowly.

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 20 --backlog 6000 --lang en
Effective capacity: 100/s
Utilization: 100%
Surplus: 0/s
Stable: no
Backlog drain: never at these rates

Constant rates. Not a benchmark or a production setting.
```

**Observed: my hypothesis fell.** It keeps up with what arrives, but nothing is left over. The 6,000 backlog never shrinks.

### Test 2: 30 consumers

Expected: it drains.

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 30 --backlog 6000 --lang en
Effective capacity: 150/s
Utilization: 66.7%
Surplus: 50/s
Stable: yes
Backlog drain: 120 s

Constant rates. Not a benchmark or a production setting.
```

**Observed:** as expected. 50/s of surplus, 120 s to drain.

### Test 3: just one more consumer

A question that came up after test 1: how much surplus changes the result?

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 21 --backlog 6000 --lang en
Effective capacity: 105/s
Utilization: 95.2%
Surplus: 5/s
Stable: yes
Backlog drain: 1200 s

Constant rates. Not a benchmark or a production setting.
```

**Observed:** with 21, draining takes 1,200 s. Going from 21 to 30 consumers, 43% more, makes draining 10 times faster. I didn't expect that: the time depends on the surplus, not on the total number of consumers.

### Test 4: the provider accepts only 80/s

```text
$ builder-workshops queue --arrivals 100 --service-ms 200 --consumers 30 --backlog 6000 --dependency-limit 80 --lang en
Effective capacity: 80/s (limited by the dependency)
Utilization: 125%
Surplus: -20/s
Stable: no
Backlog drain: never at these rates

Constant rates. Not a benchmark or a production setting.
```

**Observed:** the second hypothesis fell too. With that ceiling, 30 consumers save nothing, and the backlog grows by 20 messages per second.

### Environment

- Node.js v24.15.0, moretes-builder-workshops 0.1.0, tests from 2026-11-06.
- No cloud service and no AI model.

### What changed in my head

- "Keeping up" with what arrives is not the same as having surplus to drain.
- The bottleneck can be outside the consumers.

### What this test doesn't prove

It uses constant rates and ignores batches, retries, failures and broker limits. It doesn't say how many consumers to use in production. It only says it's worth looking at the surplus and the dependency before scaling.

## 3. The article

:::note[I doubled the consumers and the backlog didn't change: do this math before scaling]
The text below is the final article.
:::

### Why I looked into this

In every queue delay, the first suggestion I heard was to add consumers. I couldn't predict when that would work, so I did the math for three scenarios, with fictional data and no cloud account.

### What I tested

A queue receiving 100 messages per second. Each message takes 200 ms, so one consumer processes 5 per second. There are already 6,000 messages piled up. To repeat it:

```sh
npx -y moretes-builder-workshops queue --arrivals 100 --service-ms 200 --consumers 20 --backlog 6000 --lang en
```

### What happened

| Scenario | Capacity | Utilization | Surplus | Drain |
|---|---|---|---|---|
| 20 consumers | 100/s | 100% | 0/s | never |
| 21 consumers | 105/s | 95.2% | 5/s | 1,200 s |
| 30 consumers | 150/s | 66.7% | 50/s | 120 s |
| 30, provider limited to 80/s | 80/s | 125% | -20/s | never |

I was wrong twice. I thought 20 consumers made the queue healthy: they keep up with what arrives, but nothing is left over for what was already stuck. And I thought 30 would always fix it: if the provider accepts only 80 per second, the backlog grows by 20 messages per second, with any number of consumers.

What surprised me most was the third test. Going from 21 to 30 consumers is 43% more, and draining gets 10 times faster, because the time depends on the surplus.

### What this doesn't prove

These are constant rates. The math ignores batches, retries, failures and broker limits, so it doesn't say how many consumers to use in production. In a real system, I would measure before deciding.

### When I would do it differently

If the surplus is small and the dependency can take it, I would add consumers. If the dependency is the limit, I wouldn't: more pressure on a saturated provider tends to make things worse. In that case, I would look at concurrency limits and at what to tell the customer while the queue drains.

---

Written by me. Source of the numbers: this experiment's evidence log.
