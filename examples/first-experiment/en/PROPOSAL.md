# Experiment proposal

- **Real question:** when a queue piles up messages, does adding consumers fix it?
- **Audience:** someone in their first job with asynchronous systems, who hears "just scale it" in every incident.
- **Problem:** this person can't predict when more consumers help and when they change nothing.
- **Goal:** in two hours, calculate three scenarios and explain the difference.
- **Hypothesis:** with 20 consumers the queue is already healthy, because 20 × 5 messages/s covers the 100 messages/s arriving. With 30, it drains faster, and nothing else changes.
- **How I'll test it:** a local capacity calculation with fictional data: 100 messages/s, 200 ms of service time, 6,000 in the backlog.
- **What counts as evidence:** utilization, surplus and drain time for each scenario.
- **Expected cost:** zero. It runs in the terminal, with no cloud account.
