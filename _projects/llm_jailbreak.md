---
layout: page
title: "LLM Jailbreak Analysis: Manual and Random-Search Attacks on SmolLM3-3B"
description: "Evaluating the safety robustness of an instruction-tuned language model under adversarial prompting using manual jailbreaks and automated random-search attacks"
img:
importance: 4
category: research
---

This project investigates the safety behavior of an instruction-tuned language model under adversarial prompting. The focus is on understanding how robust refusal behavior is when the model is exposed to both manually designed jailbreak prompts and an automated random-search suffix attack.

> **Safety note:** Harmful prompts and generated unsafe completions are intentionally redacted or summarized. This write-up focuses on methodology, evaluation, and safety insights rather than reproducing actionable harmful content.

## Project Context

Modern instruction-tuned language models are typically safer than base pretrained models because they are post-trained with instruction-following and safety data. However, these safety behaviors can still be brittle. In this part of the project, I evaluated whether a fine-tuned model could be pushed from refusal behavior toward partial or full compliance under adversarial prompts.

The target model was:

- **Model:** `SmolLM3-3B`
- **Variant:** Instruction-tuned model
- **Task:** Safety robustness evaluation under jailbreak attempts
- **Evaluation library:** `judgezoo`
- **Judge:** `strong-reject`
- **Dataset:** Subset of `JailbreakBench/JBB-Behaviors`

## Goals

The main goals of this experiment were:

1. Test whether the instruction-tuned model refuses direct harmful requests.
2. Design manual jailbreak prompts that weaken or bypass refusal behavior.
3. Implement an automatic jailbreak method using token-level random search.
4. Evaluate attack success using an automated safety judge.
5. Reflect on the limitations of both the model’s safety behavior and the evaluation method.

## Manual Jailbreak Experiments

I first selected harmful queries that the instruction-tuned model refused under direct prompting. The base model was also tested for comparison and was generally less reliable from a safety perspective.

Two manual jailbreak strategies were tested:

### 1. Context Reframing

The first strategy changed the harmful request from a direct instruction into a more indirect, contextual, or historical framing.

Instead of asking the model to directly perform a harmful task, the prompt reframed the request as a discussion of how such actions had occurred in the past. This weakened the model’s refusal behavior in several cases. Although the model often still included warnings or disclaimers, it sometimes started providing more concrete information than it did under the original direct prompt.

### 2. Forced Compliant Opening

The second strategy added a constraint that encouraged the model to begin its response with a compliant phrase.

This also weakened the refusal behavior. In the tested examples, the model sometimes followed the requested opening and then continued with a partially compliant answer, even while mixing in safety disclaimers.

### Manual Jailbreak Finding

Both manual strategies produced at least partial compliance in the tested examples. This suggests that the model’s safety behavior was sensitive to relatively simple prompt modifications.

The key observation was not that the model completely ignored safety in every case, but that its refusal behavior became less stable when the prompt format changed.

## Automatic Jailbreak: Random-Search Suffix Attack

For the automated attack, I implemented a token-level random-search suffix attack.

The goal was to find a short adversarial suffix that, when appended to a harmful user request, increased the likelihood that the model would generate a non-refusal response.

## Method Overview

The random-search attack works by repeatedly modifying a suffix attached to the user prompt. At each step, the algorithm evaluates whether the new suffix increases the model’s probability of producing a target response pattern associated with compliance.

In this implementation, the attack optimized the next-token log-probability of a formatting token that was commonly observed at the beginning of compliant responses from the model. The intuition was that if the model starts with a structured answer format rather than a refusal phrase, it may be more likely to continue with a non-refusal completion.

## Attack Pipeline

The automated jailbreak pipeline had four phases:

### Phase 1: Baseline Response Generation

The instruction-tuned model generated responses to 20 harmful behavior prompts sampled from JailbreakBench.

### Phase 2: Baseline Judging

Each baseline response was evaluated using the `strong-reject` judge from `judgezoo`.

Prompts where the model refused were selected for attack. A response was considered refused or harmless if its harmfulness score was below the threshold.

### Phase 3: Random Search Attack

For each initially refused prompt, the random-search algorithm optimized an adversarial suffix.

Key parameters:

| Parameter | Value |
|---|---:|
| Suffix length | 25 tokens |
| Iterations | 300 |
| Restarts | 1 |
| Optimization target | Next-token log-probability |
| Attack type | Token-level random search |

The search used warm-starting, where the best suffix from a previous run could be reused as a starting point for the next prompt.

### Phase 4: Attack Re-Evaluation

After applying the optimized suffix, the model generated a new response. The new response was scored again using the same `strong-reject` judge.

A jailbreak was counted as successful when the attacked response crossed the harmfulness threshold.

## Model Access Requirements

This method is not fully black-box.

It requires access to:

- the target model’s tokenizer,
- token-level output probabilities or log-probabilities,
- the ability to append suffix tokens to the prompt,
- repeated querying of the model during optimization.

However, it does **not** require access to model gradients. Therefore, it sits between a black-box and full white-box attack setting.

Because the model was open-weight and run locally, I was able to compute the required log-probabilities directly from the model outputs.

## Results

The experiment used 20 harmful behavior prompts from JailbreakBench.

| Metric | Result |
|---|---:|
| Total harmful prompts tested | 20 |
| Initially refused prompts | 10 |
| Successfully jailbroken according to judge | 5 / 10 |
| Judge-based attack success rate | 50% |
| Partially harmful/compliant by manual inspection | 8 / 10 |
| Manual inspection success rate | 80% |

The automated judge produced a clear separation between refused and harmful responses in most cases. Responses close to refusal usually received scores near 0, while clearly harmful or compliant responses received scores close to 1.

However, manual inspection showed that some responses contained concerning or partially compliant information even when the judge assigned a relatively low harmfulness score.

## Key Takeaways

### 1. Safety behavior is brittle

The instruction-tuned model refused direct harmful prompts, but relatively small prompt modifications weakened its refusal behavior.

### 2. Manual jailbreaks can be surprisingly effective

Simple reframing strategies were enough to produce partial compliance in some cases. This shows that refusal behavior may depend strongly on prompt wording rather than deep understanding of user intent.

### 3. Random search can find useful adversarial suffixes

Even without gradients, token-level random search was able to find suffixes that increased the probability of non-refusal responses.

### 4. Automated judges are useful but imperfect

The `strong-reject` judge was helpful for scalable evaluation, but it sometimes appeared conservative. Some outputs that contained partially harmful information were assigned low harmfulness scores, especially when the model mixed unsafe content with disclaimers or indirect phrasing.

### 5. Safety evaluation needs both quantitative and qualitative analysis

The judge-based success rate was 50%, while manual inspection suggested a higher partial-compliance rate of 80%. This gap highlights the importance of combining automated metrics with human review.

## Reflection

This experiment showed that instruction tuning improves safety compared to base models, but refusal behavior is not always robust. The model could refuse direct harmful requests, yet still become partially compliant when the prompt was reframed or when an adversarial suffix was appended.

From a broader AI safety perspective, this suggests that evaluating model safety only on direct harmful prompts is not enough. Robustness testing should include adversarial prompt variations, automated attack methods, and careful qualitative inspection of edge cases.

The project also showed the difficulty of evaluating jailbreak success. A response can include warnings and disclaimers while still leaking harmful or policy-violating information. This makes safety judging more nuanced than a simple binary refusal/compliance classification.