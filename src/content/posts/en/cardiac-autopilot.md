---
title: An Autopilot for the Heart
slug: cardiac-autopilot
lang: en
translationKey: 心脏的autopilot
description: >-
  From a heart–computer interface to observability, physiological modeling, and
  closed-loop control of the cardiovascular system.
date: '2026-11-03T00:00:00.000Z'
tags:
  - CrazyDobby
featured: false
publish: true
draft: false
---
# An Autopilot for the Heart

Recently I have been developing something called a Heart–Computer Interface (HCI). The basic idea is to place a dense array of sensors around the heart, continuously recording electrical activity, pressure, volume, and mechanical motion, in an attempt to reconstruct its physiological state in real time.

That brought another question to mind.

Why does modern civil aviation rely so heavily on autopilot? Why is it widely accepted in aviation that, for these tasks, automatic control can be more reliable than a pilot?

Because of sensors and control systems.

If we can sense a system’s state accurately enough, and understand the relationship between its inputs and outputs, a computer can perform continuous feedback control.

Why not apply the same logic to the human body, especially in the ICU?

## 01. An ICU physician is also a controller

Think about what ICU physicians do every day.

They observe measurements such as MAP, CVP, CO, HR, and SpO₂, use their experience to assess a patient’s circulation, and intervene with vasoactive drugs, fluids, inotropes, or even mechanical circulatory support.

Then they observe again and adjust again.

Isn’t that a classic closed-loop control system?

The difference is that its controller is human.

Human limitations are clear. We intermittently observe a limited set of physiological measurements. We cannot continuously process data from hundreds of sensors, and it is difficult to predict precisely how different interventions will affect the dynamics of the circulation as a whole.

> An ICU physician is a controller with a very low sampling rate, but a great deal of prior knowledge.

Of course, human strengths include understanding causes, handling unfamiliar situations, and making judgments with incomplete information.

But why must people perform every highly repetitive task with a well-defined control objective?

Studies have already used closed-loop norepinephrine administration to achieve more stable blood-pressure management than manual adjustment.

And that is with arterial pressure alone as the feedback signal. What if we could observe the state of the entire cardiovascular system?

## 02. Observability

This question may be more complicated than it first appears.

The same MAP of 60 mmHg, for instance, might result from inadequate myocardial contractility, reduced circulating volume, or low vascular resistance.

To a system that measures only blood pressure, these situations may look alike. Their treatments, however, can be very different. This brings us to an important concept in control theory: observability.

**Can we infer a system’s actual internal state from a limited number of sensors?**

I think this may be the most interesting aspect of HCI.

Traditionally, we describe the heart through a few aggregate measurements such as EF, CO, and pressure. Those measurements compress a great deal of spatial and temporal information. Could a high-density sensor network, continuously recording electrical, mechanical, and hemodynamic signals across different regions, reconstruct the heart’s state more fully?

Taking this further, could sensors distributed across the cardiovascular system, perhaps combined with perfusion monitoring in different organs, produce a continuously updated model of the circulation?

> More sensors do not necessarily mean better observability. They might simply produce more redundancy and noise.

What matters is whether these signals allow us to distinguish different pathophysiological mechanisms.

During a hypotensive episode, for example, the system would not merely detect falling pressure. It would also identify whether the problem lies in preload, contractility, or vascular resistance.

At that point, monitoring begins to approach understanding.

## 03. From monitoring to autonomous control

If we can reconstruct cardiovascular state in real time, prediction is the natural next step.

What would happen to MAP, CO, and organ perfusion if we increased norepinephrine slightly now?

What if we used an inotrope instead?

What if we also adjusted volume loading?

In clinical practice, these questions depend on a physician’s experience. In principle, however, they can be computed using an individualized physiological model.

This reminds me of Model Predictive Control (MPC).

Starting from the current state, predict the system’s response over a future interval, choose the strategy that best meets the objective, and keep correcting it as new feedback arrives.

In other words:

**Sensing → State Estimation → Prediction → Control**

Yet the cardiovascular system is not quite an aircraft. Its dynamic parameters change with disease and treatment, and many important states cannot be measured directly. An incorrect model coupled with a controller that executes it very precisely could be especially dangerous.

Moreover, normal MAP does not guarantee normal tissue perfusion, and optimizing CO does not necessarily improve patient outcomes.

The ultimate objective should therefore be more than a blood-pressure controller. It should be an attempt at genuine **physiological control**.

This might require a continuously updated, patient-specific digital twin, together with coordinated control of drugs, fluids, mechanical support, and other inputs. We could certainly begin in shadow mode: the system continuously observes the patient and predicts the outcomes of interventions, without actually administering treatment. If it reconstructs circulatory state more accurately than existing monitoring, or predicts hemodynamic decompensation earlier, that alone would be meaningful.

## 04. What would physicians become?

This brings us back to the original question.

If a computer could continuously sense the cardiovascular system, understand its internal state, and regulate circulation more precisely than a physician, how would the work of an ICU physician change?

Perhaps it would resemble the work of a pilot.

Rather than personally performing every low-level control task, physicians would set treatment objectives, understand complex causes, manage abnormalities the system cannot recognize, and supervise the overall control process.

This could also change how we design medical devices.

Most devices have traditionally been separate: monitors handle monitoring, infusion pumps handle delivery, and physicians handle decisions.

Why couldn’t they form a single system?

> Suddenly this is no longer just a Heart–Computer Interface. It is a proposal for an autopilot for the entire cardiovascular system—which is where the title comes from.

Of course, I do not yet know how far this can go. The body contains nonlinear feedback, compensatory mechanisms, and internal states that are difficult to observe. We cannot conclude that a system is better at treating disease merely because it controls a particular measurement more precisely.

Still, I increasingly see an interesting technological gap in modern medicine. We have powerful imaging, molecular profiling, and monitoring technologies, yet still rely primarily on humans to turn that information into intervention decisions.

The next step seems clear: integrate those scattered sensing capabilities, make physiological state sufficiently observable, and eventually achieve reliable closed-loop modulation.

This also calls for a separate discussion of ethics and mechanistic thinking.
