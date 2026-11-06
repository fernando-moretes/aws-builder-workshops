# Evidence log

Real outputs of `builder-workshops queue`, unedited.

## Test 1: 20 consumers

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

## Test 2: 30 consumers

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

## Test 3: just one more consumer

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

## Test 4: the provider accepts only 80/s

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

## Environment

- Node.js v24.15.0, moretes-builder-workshops 0.1.0, tests from 2026-11-06.
- No cloud service and no AI model.

## What changed in my head

- "Keeping up" with what arrives is not the same as having surplus to drain.
- The bottleneck can be outside the consumers.

## What this test doesn't prove

It uses constant rates and ignores batches, retries, failures and broker limits. It doesn't say how many consumers to use in production. It only says it's worth looking at the surplus and the dependency before scaling.
