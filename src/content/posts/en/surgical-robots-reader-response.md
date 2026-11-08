---
title: 'Designing Surgical Robots and the Future of Surgery: A Reader’s Response'
slug: surgical-robots-reader-response
lang: en
translationKey: 读者来信
description: >-
  A reader’s questions and replies on surgical-task hierarchies, economic
  constraints, and team expertise.
date: '2026-11-05T00:00:00.000Z'
tags:
  - CrazyDobby
featured: false
publish: true
draft: false
---
# 手术机器人的设计与外科的未来 - 读者来信

## 1. The Two-Pool Framework

In our current model, we have **two pools**:

**Pool 1: Surgical Requirements**

The first pool represents the essential elements required for the successful completion of a surgical procedure, such as MVP, TAVI, Billroth I, or Roux-en-Y reconstruction.

These requirements can be broken down into different surgical tasks, such as destruction, reconstruction, and transplantation.

**Pool 2: Available Surgical Technologies**

The second pool represents the existing technologies and techniques that can be used to accomplish specific surgical tasks.

For example, as you mentioned, when I need to perform a **sealing task**, I have several possible approaches:

1. **Manual surgical knots:** Traditional suturing and knot-tying techniques performed by surgeons.

2. **Laparoscopic anastomosis devices:** Devices produced by companies such as Medtronic, which are increasingly popular in modern laparoscopic surgery.

3. **Advanced materials:** Innovative sealing approaches enabled by developments in materials science.

Each method has its own advantages and is suitable for different surgical scenarios. Therefore, multiple sealing techniques may be used together during a single operation.

Mathematically, we can represent this task as:

**Sealing task = k₁ (manual surgical knots) + k₂ (laparoscopic stapling devices) + k₃ (Zengyirong materials)**

Here, k₁, k₂, and k₃ represent the relative contributions of different techniques to accomplishing the sealing task.

## 2. My Three Main Questions

### Question 1: What Is the Relationship Between the Two Pools?

How should we define the relationship between surgical requirements and available surgical technologies?

For example, I believe that **sealing belongs to the broader category of reconstruction**.

If this understanding is correct, can we express reconstruction as a combination of several surgical tasks?

**Reconstruction = k₁ (sealing) + k₂ (other reconstruction tasks) + …**

In other words, is sealing a subordinate component of reconstruction, while the different sealing techniques belong to the technology pool?

I would like to clarify how these two levels should be connected within our model.

### Reply:

Thanks for your comments. I believe your understanding is matched. Surgery Technique and Procedure is intrinsically a **hierarchy** relation, that is a procedure is a series of spatiotemporal combination of technique done by surgeon.

Legacy surgery have to base on very limited technique to approach ideal tissue anatomy, so brillant surgeon design the very complicate combination. The very optimized combination was believed in elegant.

However, when things begins to happen, we have or will have very variety techniques, so to obtain the anatomy change, there is no need complex combination but to establish by well-modeled device.

So I do not think the practice in complex surgery procedure is necessary in future. Technique has largely decrease the complexity of the procedure which surgeon used to pride.

### Question 2: Where Should Economic Factors Be Incorporated?

We all know that **cost-effectiveness is an important factor in surgical decision-making**.

However, where should economic considerations be incorporated into our framework?

Should economic factors be placed at the same hierarchical level as surgical task categories such as destruction, reconstruction, and transplantation?

My concern is that economic factors directly influence the coefficients assigned to different surgical techniques. Therefore, they may not be suitable as independent variables within the same function.

Instead, could economic considerations constitute a **separate system, or perhaps a third pool**, that influences the selection and weighting of techniques in the existing two-pool framework?

### Reply

Very interesting idea, but I do not think the problem should really answer by surgeon. The root problem is that: how will we pay for a life.

A real but simplied calculation:

Surgery team salary + device payment + consumption <> A LIFE

technique progress will increase the payment of device, but in same time, it reduce the training and the time-taking in surgeon. So in a mark-directing economics, the left side of the equation won't change. But in developing  and government-directing country, the left side will be re-price. In China mainland, surgeon price salary is depressed because we can not determine the device payment and consumption. If (but not very possible) there grow a thrilling market of drug and device development, government will suppress device payment.

Under the macro environment, a well-trained surgeon with traditional procedure skill is hard to growth as you can see in current trace. So in personal choose, you can surely choose a cheaper but complex way for poor patients, but we have to know that environment do not encourage this behavior. You can do it once, but can not do it forever.

In policy, the real resolution is to 1. continue to suppress the surgeon salary; 2. set fund to pay for device.

### Question 3: How Should We Account for Surgical Team Expertise and Preferences?

A similar issue arises in our current “dobby hypothesis\*\*.

At present, we seem to assume that every surgical planner is extremely intelligent, fully rational, and proficient in every available surgical technique.

Under this assumption, these individuals might no longer be considered ordinary surgeons. Instead, they would act more like senior surgical coordinators who oversee multiple surgeons and make optimal decisions on behalf of the entire team.

Does this assumption sound familiar? Haha!

It reminds me of classical economic theories, in which every investor is assumed to be perfectly rational.

However, in reality, **different surgical teams have different levels of expertise, familiarity, experience, and preferences regarding surgical techniques**.

These factors inevitably influence which techniques a team chooses and how effectively those techniques can be performed.

Therefore, we need to find an appropriate place for **surgical team familiarity and preferences** within our model.

Should these factors be incorporated as additional coefficients affecting the selection of surgical techniques? Or should they belong to another independent system?

I believe this question is closely related to Question 2, since both economic constraints and surgical team characteristics influence the practical selection of technologies.

### Reply:

Yes, ironically, surgeon usually keep conservative at early stage but behavior aggressive when now technique has board on.
