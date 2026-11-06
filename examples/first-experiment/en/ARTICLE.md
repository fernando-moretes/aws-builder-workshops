# I doubled the consumers and the backlog didn't change: do this math before scaling

## Why I looked into this

In every queue delay, the first suggestion I heard was to add consumers. I couldn't predict when that would work, so I did the math for three scenarios, with fictional data and no cloud account.

## What I tested

A queue receiving 100 messages per second. Each message takes 200 ms, so one consumer processes 5 per second. There are already 6,000 messages piled up. To repeat it:

```sh
npx -y moretes-builder-workshops queue --arrivals 100 --service-ms 200 --consumers 20 --backlog 6000 --lang en
```

## What happened

| Scenario | Capacity | Utilization | Surplus | Drain |
|---|---|---|---|---|
| 20 consumers | 100/s | 100% | 0/s | never |
| 21 consumers | 105/s | 95.2% | 5/s | 1,200 s |
| 30 consumers | 150/s | 66.7% | 50/s | 120 s |
| 30, provider limited to 80/s | 80/s | 125% | -20/s | never |

I was wrong twice. I thought 20 consumers made the queue healthy: they keep up with what arrives, but nothing is left over for what was already stuck. And I thought 30 would always fix it: if the provider accepts only 80 per second, the backlog grows by 20 messages per second, with any number of consumers.

What surprised me most was the third test. Going from 21 to 30 consumers is 43% more, and draining gets 10 times faster, because the time depends on the surplus.

## What this doesn't prove

These are constant rates. The math ignores batches, retries, failures and broker limits, so it doesn't say how many consumers to use in production. In a real system, I would measure before deciding.

## When I would do it differently

If the surplus is small and the dependency can take it, I would add consumers. If the dependency is the limit, I wouldn't: more pressure on a saturated provider tends to make things worse. In that case, I would look at concurrency limits and at what to tell the customer while the queue drains.

---

Written by me. Source of the numbers: this experiment's evidence log.
