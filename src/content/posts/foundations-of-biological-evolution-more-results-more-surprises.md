---
title: 生物演化的基础 - Stephen Wolfram
slug: foundations-of-biological-evolution-more-results-more-surprises
lang: zh
translationKey: foundations-of-biological-evolution-more-results-more-surprises
description: 'Foundations of Biological Evolution: More Results & More Surprises'
date: '2026-11-07T16:00:00.000Z'
tags:
  - BusyDobby
featured: false
publish: true
draft: false
---
# 生物演化的基础

**原题：** Foundations of Biological Evolution: More Results & More Surprises\
**作者：** Stephen Wolfram\
**发表日期：** 2024 年 12 月 5 日\
**原文：** [Stephen Wolfram Writings](https://writings.stephenwolfram.com/2024/12/foundations-of-biological-evolution-more-results-more-surprises/)\
**DOI：** [10.31855/9f64da89-ae1](https://doi.org/10.31855/9f64da89-ae1)

> 非官方简体中文译文，译制日期为 2026 年 11 月 8 日

![Pasted image 20261108170644.png](/media/c7566112df7c700e46eb.webp)

本文是[《生物演化为何能奏效？——生物演化及其他适应过程的最简模型》](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/)（2024 年 5 月 3 日）的续篇。

## 目录

1. [一个极其简单的模型带来的更多发现](#even-more-from-an-extremely-simple-model)
2. [所有可能演化过程构成的多路图](#the-multiway-graph-of-all-possible-evolutions)
3. [基于宽高比的适应度函数](#fitness-functions-based-on-aspect-ratio)
4. [无法到达的情况](#unreachable-cases)
5. [更大规则空间中的多路图](#multiway-graphs-for-larger-rule-spaces)
6. [宽高比适应度](#aspect-ratio-fitness)
7. [多路演化图中的分支](#branching-in-the-multiway-evolution-graph)
8. [精确匹配适应度函数](#exact-match-fitness-functions)
9. [适应度如何逐步提高](#how-fitness-builds-up)
10. [但它能够被解释吗？](#but-is-it-explainable)
11. [在形态空间中的分布](#distribution-in-morphospace)
12. [概率与演化的时间进程](#probabilities-and-the-time-course-of-evolution)
13. [演化的宏观流动](#the-macroscopic-flow-of-evolution)
14. [演化可以逆转吗？](#can-evolution-be-reversed)
15. [随机产生，还是经过选择？能分辨出来吗？](#random-or-selected-can-one-tell)
16. [初始条件的适应性演化](#adaptive-evolution-of-initial-conditions)
17. [二维元胞自动机](#2d-cellular-automata)
18. [图灵机的情形](#the-turing-machine-case)
19. [多路图灵机](#multiway-turing-machines)
20. [一些结论](#some-conclusions)
21. [还有太多值得研究的东西！](#theres-so-much-more-to-study)
22. [致谢](#thanks)

***

<a id="even-more-from-an-extremely-simple-model"></a>

## 一个极其简单的模型带来的更多发现

[几个月前，我介绍了一个极其简单的“适应性元胞自动机”模型](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/)，它似乎能够非常出色地把握生物演化过程的本质。但在过去几个月里，我逐渐意识到，这个模型实际上比我原先设想的还要丰富、深刻。这里，我将介绍我如今对这个模型的一些新认识，以及它对生物演化的基础所揭示的那些常常令人意外的含义。

[这个模型](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-model)的出发点，是用抽象的计算概念来看待生物系统。我们认为，生物体具有一个由程序表示的基因型，运行这个程序便会生成其表型。例如，下图左边的[元胞自动机](https://www.wolframscience.com/nks/chap-2--the-crucial-experiment#sect-2-1--how-do-simple-programs-behave)规则对应一种基因型；运行这些规则，就会生成右边的表型（从单个红色元胞这颗“种子”出发）：

[![原图 2](/media/03f69d4f701c6a3dc027.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg1_copy.txt)

模型的关键思想，是让基因型规则进行适应性演化，比如对规则的输出列表进行单次“点突变”：

[![原图 3](/media/12707aacd256fe1292b8.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg2_copy.txt)

在适应性演化的每一步，如果某次突变产生的表型，比之前的表型具有更高、或至少相等的适应度，我们就“接受”这次突变。例如，把适应度函数定义为表型图案的高度（即寿命），并将无限延伸的图案的适应度设为零，那么，从空规则到上面那条规则的一系列（随机选择的）适应性演化步骤，可能如下所示：

[![原图 4](/media/b5773d8c34873cb7e08f.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg3_copy.txt)

如果采用另一系列随机选择的适应性演化步骤，会怎样？下面是几个例子；从某种意义上说，每个例子都在“运用不同的思路”来获得高适应度：

[![原图 5](/media/56fd9ff4b75d9a2ebefc.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg4_copy.txt)

是的，无论是这些图案的复杂程度，还是它们的多样性，都“栩栩如生”得令人惊叹。但我们所看到的这一切，归根结底是由什么造成的？这一直是关于生物演化的一个核心问题。演化所产生的形态，是环境（及其隐含的适应度函数）精心“雕琢”的结果，还是说，这些形态最重要的特征，其实来自某种更内在、更根本、并不依赖适应度函数细节的东西？

不妨换一个[不同的适应度函数](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#other-adaptive-evolution-strategies:~:text=what%20about%20other%20kinds%20of%20objectives)，例如，不采用表型图案的高度，而采用它的宽度（更具体地说，是其包围盒的宽度）。下面是这种情况下适应性演化的一些结果：

[![原图 6](/media/9d6bc5bbe5c91bee46d1.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg5_copy.txt)

是的，现在得到的图案确实实现了更大的“包围盒宽度”。但不知为何，它们与前面采用颇为不同的适应度函数时看到的结果，仍有显著的相似之处。例如，在这两种情况下，高适应度通常似乎都是以复杂而难以理解的方式实现的。（最后一个图案算是一个小小的例外；正如生物学中也可能发生的那样，这一次我们终于能看出一种可以理解的“机制”。）

那么，究竟发生了什么？正如我在[几个月前介绍这个模型时](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/)讨论过的，“主导力量”似乎并不是依据适应度函数进行的选择，而是一种根本的计算现象：[计算不可约性](https://www.wolframscience.com/nks/p737--computational-irreducibility/)。这里我们将发现，我们所看到的现象，最主要的来源其实是两者之间的相互作用：表型发育过程的计算不可约性，以及常见适应度函数形式的计算有界性。

这种相互作用的重要性，因为我们的[物理学项目](https://www.wolframphysics.org/)而变得格外清晰。事实上，如今[看来，物理学和数学的基础](https://writings.stephenwolfram.com/2022/03/the-physicalization-of-metamathematics-and-its-implications-for-the-foundations-of-mathematics/#mathematics-and-physics-have-the-same-foundations)最主要地都是这种相互作用的体现。现在看来，生物演化也是如此。

在研究这个模型的过程中，我们会遇到许多具体的现象；其中大多数，似乎都在真实的生物演化中有着惊人直接的对应。例如，对于上面的第一个例子，如果把适应度函数在适应性演化过程中的表现画出来，就会得到：

[![原图 7](/media/82db661425e7fac56a17.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg6_copy.txt)

我们看到一连串“平台期”，其间穿插着适应度的跃升，反映出某种“突破”的发生。图中，每个红点都表示某个被尝试过的基因型所对应的适应度。许多红点落在“迄今最佳结果”这条线的下方。但也有大量红点恰好落在线上，它们对应的基因型给出的适应度，与已经达到的适应度相同。不过，在这里，与真实的生物演化中一样，有一点很重要：可以存在“[适应度中性演化](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#:~:text=phenomena.%20There%20are-,%E2%80%9Cfitness%2Dneutral%E2%80%9D%20mutations,-that%20can%20%E2%80%9Cgo)”，即基因型发生改变，而适应度不变。通常，这类基因型变化不仅会给出相同的适应度，还会给出完全相同的表型。但有时，不同的表型也可以具有相同的适应度；本例中确实有一个阶段发生了这种情况：

[![原图 8](/media/3b2dc38e1e8d08567347.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg7_copy.txt)

而在上面展示的第二个例子中，有多个阶段都出现了这种情况：

[![原图 9](/media/e6bd3716a7c06fe51b3e.webp)](https://content.wolfram.com/sites/43/2024/12/12032024modelimg8_copy.txt)

<a id="the-multiway-graph-of-all-possible-evolutions"></a>

## 所有可能演化过程构成的多路图

上一节中，我们看到了几条特定的随机突变序列所产生的结果。但如果考察所有可能的突变序列，又会怎样？正如我在[介绍这个模型时讨论过的](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-multiway-graph-of-all-possible-mutation-histories)，我们可以构造一张[多路图](https://www.wolframscience.com/nks/chap-5--two-dimensions-and-beyond#sect-5-6--multiway-systems)，表示所有可能的突变路径。对于对称的 k = 2、r = 2 规则，从空规则出发，并以高度作为适应度函数，得到的结果如下：

[![原图 10](/media/a3a49ad6a53014f76e2e.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg1_copy.txt)

按照这张图的构造方式，从某个给定表型出发，会有箭头指向所有通过一次突变即可到达、并具有更大（有限）高度的表型。

但如果适应度函数采用宽度而不是高度呢？那么，我们会得到另一张多路图，其中的箭头指向的表型不再具有更大的高度，而是具有更大的宽度：

[![原图 11](/media/f83a836ded4860a0b50f.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg2_copy.txt)

那么，这里究竟发生了什么？归根结底，可以认为存在一张底层图（可以称之为“[突变图](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#:~:text=graph%20of%20every%20possible%20way)”）。其中，每一条边都表示两个表型之间的一种变换，而这种变换可以通过底层基因型的一次突变来实现：

[![原图 12](/media/ab4065eecec1e905b6f7.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg3_copy.txt)

在这一层面，变换可以双向进行，因此这是一张无向图。但关键在于，一旦施加一个适应度函数，它就会为每种变换规定一个特定的方向（至少对于那些相对于该适应度函数并非适应度中性的变换而言如此）。随后，如果从空规则之类的起点出发，就会在原始突变图中选出一个特定的“演化锥”子图。

例如，以宽度作为适应度函数时，得到的子图就是下图高亮显示的部分：

[![原图 13](/media/c32d45ca43936fed6cc6.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg4_copy.txt)

这里有几处微妙之处。首先，我们通过[传递约简](https://reference.wolfram.com/language/ref/TransitiveReductionGraph.html)简化了多路图，只画出确定图的连通关系所必需的最少边。如果想看到表型之间所有可能的单次突变变换，就需要进行[传递补全](https://reference.wolfram.com/language/ref/TransitiveClosureGraph.html)。这样，对于宽度适应度函数，得到的多路图如下：

[![原图 14](/media/a2a2b97cd52d18832a5b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg5_copy.txt)

但现在又出现了另一个微妙之处。多路图中的边表示会改变适应度的变换，但也存在适应度中性的变换。有时，这些变换甚至会产生不同的表型，尽管它们的适应度相等。因此，上图（比如经过传递约简的那张图）中的每个节点，有时实际上应该对应多个表型：

[![原图 15](/media/d444876d4073f6ffa840.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg6_copy.txt)

这些表型可以在“适应度中性”的情况下相互转换，例如：

[![原图 16](/media/82942c85dd9eb67a6c75.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg7_copy.txt)

但微妙之处还不止这些。适应度中性集合通常包含许多基因型，它们在某些规则情形上的取值有所不同，但这些差别并不影响生成的表型。不过，其中可能只有一个或少数几个基因型已经“准备就绪”，能够仅再经过一次突变就生成另一种表型。换句话说，上面的多路图中，每个节点都代表一整类“在适应度中性变换下等价”的基因型；我们画出一个箭头，表示这一类中的某个基因型，可以通过一次突变，转变为与另一种表型相关的那一类中的某个基因型：

[![原图 17](/media/6a787bfc7e07eef6cb83.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg8_copy.txt)

撇开这些微妙之处，关键在于，特定的适应度函数实际上只是在底层突变图上定义了特定的次序。这有点像物理学中对参考系或同时性曲面族的选择。不同的适应度函数选择，实际上定义了演化随着时间推移，在底层突变图中“行进”的不同方式。

恰好，高度和宽度这两种适应度函数所得的结果，并没有那么不同。下面是一张合并后的多路图，标出了这两种不同适应度函数各自允许的变换：

[![原图 18](/media/ff9d1b5499b3b796dcd9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg9_copy.txt)

聚焦这张图的一小部分，可以看到，最大化高度和最大化宽度分别对应着不同的“流向”：

[![原图 19](/media/871feda51272be67d522.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024multiwayimg10_copy.txt)

如果采用单个适应度函数，对于任意两个表型，它都一贯地将其中一个视为比另一个更适应，那么多路图就必然始终定义一个确定的流向。但一旦考虑在演化过程中改变适应度函数，多路图中就可能出现循环，如上面的例子所示；于是，实际上，“演化可以重演”。

<a id="fitness-functions-based-on-aspect-ratio"></a>

## 基于宽高比的适应度函数

我们已经考察过分别以最大化高度和最大化宽度为目标的适应度函数。但如果尝试把它们结合起来呢？下面这张图显示了前面研究的对称 k = 2、r = 2 情况下，所有表型的宽度与高度：

[![原图 20](/media/c1bb5a9105c8003f2e16.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg1_copy.txt)

我们可以设想多种不同方式，来定义这里的“适应度前沿”。不过，作为一个具体例子，不妨考虑以达到特定宽高比为目标的适应度函数，也就是寻找在上图中尽可能接近某条固定宽高比直线的表型。

对于这里使用的对称 k = 2、r = 2 规则，能够得到的宽高比只能来自一个特定集合：

[<img src="/media/3005385895b19d87fdf9.webp" alt="原文行内图示" width="638" height="36" style="display:inline;vertical-align:middle;margin:0;width:638px;height:36px">](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessBimg2_copy.txt)

[![原图 22](/media/afedfb667581509ef11d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg3_copy.txt)

相应的表型（以及各自的宽高比）如下：

[![原图 23](/media/379cbe12cedcef7ac713.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg4_copy.txt)

当我们改变试图达到的宽高比时，演化多路图也会随之改变：

[![原图 24](/media/0fdb817a01fd3b40b82b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessBimg5_copy.txt)

在所有情况下，我们都从空规则出发。对于目标宽高比 1.0，空规则本身就已经达到了这个宽高比，因此这种情况下的多路图是平凡的。但一般而言，不同的宽高比会给出不同的演化多路图，它们是前面那张完整突变图的不同子图。

那么，如果沿着所有可能的演化路径前进，我们究竟能多接近某个给定的目标宽高比？下图显示，随着目标宽高比变化，最终能够达到哪些宽高比：

[![原图 25](/media/f12af2a2b7d789b6df31.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024fitnessBimg6_copy.txt)

从某种意义上说，这概括了“发育约束”对于这类“适应性元胞自动机生物体”的影响。如果不存在约束，那么对于每一个目标宽高比，都能够得到一个具有该宽高比的“生物体”，因而图中就会有一个点落在红线上。但实际上，元胞自动机的生长过程施加了约束，具体来说，只允许具有某些宽高比的某些表型存在。除此之外，哪些表型实际上能够通过适应性演化到达，还取决于演化多路图；在图中选择“不同的转弯”，会导向具有不同适应度（即不同宽高比）的表型。

不过，总体上，上图表明，在某个目标宽高比范围内，适应性演化能够成功地至少接近这些宽高比。但如果目标宽高比超出这个范围，“发育约束”就会发挥作用，阻止我们达到目标。

如果具有“更大的基因组”，也就是需要指定更多规则情形的规则，就能够做得更好，在更大的数值范围内，更精确地达到特定的宽高比。事实上，即使对于对称 k = 2、r = 2 规则，只要把能够达到的宽高比随规则中需要指定的情形数的变化画出来，也能看到这种效应的某种体现：

[![原图 26](/media/784f2ce0a9b49d80ea7f.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg7_copy.txt)

另一种可视化方式，是把“对目标的最佳逼近程度”随规则情形数的变化画出来。我们再次看到，规则情形数越多，我们就能越接近目标宽高比：

[![原图 27](/media/872386ecb2becad47dcd.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg8_copy.txt)

值得一提的是，与上面讨论高度和宽度适应度函数时一样，这里也存在与适应度中性集合有关的微妙之处。例如，下面这些表型集合中的所有表型，都具有所标明的宽高比；其中，能够通过单次点突变相互到达的表型用线相连：

[![原图 28](/media/9cee65011d19eff75ac7.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg9_copy.txt)

在上面的演化多路图中，我们对每个适应度中性集合只选取了一个表型。但对于目标宽高比 0.7，如果显示具有给定适应度的全部表型，就会得到：

[![原图 29](/media/8cca0db18a3ea2e821c5.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg10_copy.txt)

注意，最上面一行并不只有空规则，而是有四种表型；它们都与空规则一样，具有宽高比 1，因而与目标宽高比 0.7 的距离相等。

上图只是经过传递约简的图。如果把与单次点突变相关的所有可能变换都包括进来，就会得到：

[![原图 30](/media/695f840bb06c67fb416a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg11_copy.txt)

根据这张图，我们现在可以作出一种相当于叶状分解的表示：展示至少经过某个给定突变次数才能到达的表型集合，它们会逐步接近目标宽高比（这里是 0.7）：

[![原图 31](/media/917b7bc4e8dc14ed1ce9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg12_copy.txt)

对于上面展示的目标宽高比范围，得到的结果如下（与前面一样，“终点表型”用高亮显示）：

[![原图 32](/media/67fc8df73f7d462ad017.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024fitnessAimg13_copy.txt)

从某种意义上说，这些序列告诉我们：在这个极其简单的模型中，对于不同的（宽高比）适应度函数，“化石记录”的各个相继阶段可能出现哪些表型。高亮的情况是“演化死路”，其余的则可以继续演化。

<a id="unreachable-cases"></a>

## 无法到达的情况

我们的模型规定，适应性演化过程永远不会“倒退”；换句话说，永远不会从某个给定基因型演化到适应度更低的基因型。但这意味着，从某个特定基因型（比如空规则）出发，可能存在永远无法到达的基因型（因而也有无法到达的表型）。

以高度作为适应度函数时，[只有两个单独的（“孤儿”）表型](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-whole-space-exhaustive-search-vs-adaptive-evolution)无法到达：

[![原图 33](/media/c8418133ecee2e8949fa.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024unreachableimg1_copy.txt)

而以宽度作为适应度函数时，结果表明，无法到达的也恰好是这两个表型：

[![原图 34](/media/5f877a7afb5d9712b9d4.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024unreachableimg2_copy.txt)

但如果采用一个试图达到例如宽高比 0.7 的适应度函数，就会有更多表型无法从空规则出发到达：

[![原图 35](/media/a9cd79faee6a84f35dad.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024unreachableimg3_copy.txt)

在原始突变图中，所有表型都会出现。但当我们用某个特定的适应度函数，对这张图进行叶状分解（或者更准确地说，排序）时，有些表型就无法再通过演化所允许的变换到达。这大致类似于物理学中存在事件视界时，某些事件会变得无法到达的情形。

<a id="multiway-graphs-for-larger-rule-spaces"></a>

## 更大规则空间中的多路图

到目前为止，我们在这里讨论的多路图都只涉及对称的 k = 2、r = 2 规则。这样的规则总共有 524,288（= 2<sup>19</sup>）条，产生[77 种不同的表型](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-whole-space-exhaustive-search-vs-adaptive-evolution:~:text=77%20distinct%20phenotypic%20patterns)。但更大的规则类别又怎样？例如，我们可以考虑不受对称性约束的全部 k = 2、r = 2 规则。这样的规则总共有 2,147,483,648（= 2<sup>31</sup>）条，结果表明，它们产生了 3137 种不同的表型。

对于高度适应度函数，这种情况下的完整多路图是：

[![原图 36](/media/3b4324951d415e2ce509.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg3_copy.txt)

或者，标注上实际的表型后：

[![原图 37](/media/036bf75d0ef36225f83c.webp)](https://www.wolframcloud.com/obj/blog-posts/BiologicalEvolution2/k2r2/index.html)

点击图片可缩放和平移

如果只显示包围盒，就更容易看出长寿命表型出现在哪里：

[![原图 38](/media/c8fdbdf7a02c2c910de1.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg5_copy.txt)

采用另一种图布局后，演化多路图变为如下形式（图中标出了初始节点）：

[![原图 39](/media/5cdc083c5eb4a6f174c0.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg6_copy.txt)

这里有一个微妙之处：空规则[没有通过单次点突变即可到达的后继](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-whole-space-exhaustive-search-vs-adaptive-evolution:~:text=procedure%20never%20reaches%20the%20null%20rule)。在讨论对称 k = 2、r = 2 规则时，我们规定，一次“点突变”总是同时改变某种规则情形及其镜像。但如果没有对称性要求，一次点突变就确实可以只改变一种规则情形。如果从空规则出发，考察以所有可能方式仅改变一位（即只改变一种规则情形的输出）所得到的结果，就会发现，要么得到与空规则相同的图案，要么得到无限生长的图案：

[![原图 40](/media/8eee0d1675811b334b20.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg7_copy.txt)

换句话说，单纯从空规则出发，通过单比特突变，我们无法取得任何进展。因此，我们改为从 k = 2、r = 2 的第 20 号规则出发构建多路图。这条规则有两个位处于“开启”状态，并产生以下表型：

[<img src="/media/602f9cfa990b0b67eecb.webp" alt="原文行内图示" width="65" height="39" style="display:inline;vertical-align:middle;margin:0;width:65px;height:39px">](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg8_copy.txt)

但从这里出发，只需要一次突变（加上一系列适应度中性突变），就足以产生 94 种表型；去除镜像后，则是 49 种：

[![原图 42](/media/7a53de16ca78c324315e.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg9_copy.txt)

随着（非适应度中性）突变次数逐渐增加，我们能够到达的新表型的总数如下：

[![原图 43](/media/6569f849fd60234c350b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg10_copy.txt)

而相继出现的[最长寿命图案](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-whole-space-exhaustive-search-vs-adaptive-evolution)是：

[![原图 44](/media/a0ce864db0cf8169f153.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg11_copy.txt)

这里我们看到，原则上，即使经过相当少的突变，也有可能达到较长的寿命。但如果随机进行突变，仍可能需要极其多的步骤，才能通过“随机游走”成功到达长寿命表型。

在总共 2407 种不同的表型中，有 984 种是无法继续演化的“死路”。其中一些死路的寿命很长：

[![原图 45](/media/760995d2fd48dfd3959f.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg12_copy.txt)

但另一些的寿命却很短：

[![原图 46](/media/2b2ec33de74accd82c6d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg13_copy.txt)

这张多路图中还有许多值得探索的东西，我们稍后还会继续讨论一些。但现在，先来看另一张规模仍然可处理的演化多路图：对称 k = 3、r = 1 规则的多路图。这样的规则总共有 129,140,163（= 3<sup>17</sup>）条，总共产生 14,778 种不同的表型：

[![原图 47](/media/19e72569a21c64d2745d.webp)](https://www.wolframcloud.com/obj/blog-posts/BiologicalEvolution2/k3r1/zoom.html)

点击图片可缩放和平移

只显示图案的包围盒，就会得到：

[![原图 48](/media/0fe8a3c53db2bba904ae.webp)](https://content.wolfram.com/sites/43/2024/12/sw12122024C2Cupdateimg1_copy.txt)

与 k = 2、r = 2 的情况不同，现在整张图可以从空规则开始。不过，如果考察所有可能的对称 k = 3、r = 1 规则，就会发现有 6 个“孤立者”，无法通过以高度作为适应度函数、从空规则出发的适应性演化到达：

[![原图 49](/media/90a22b1e985360e89f54.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg17_copy.txt)

从空规则出发，随着（非适应度中性）突变次数逐渐增加，能够到达的表型数量如下：

[![原图 50](/media/88e94f9a06fa43c81bb4.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg18_copy.txt)

而这些表型中相继出现的[最长寿命表型](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-whole-space-exhaustive-search-vs-adaptive-evolution:~:text=maximum%20lifetime%20found%20is%20not%20just%20308%2C%20but%202194)是：

[![原图 51](/media/719d1f1adc114d50136a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024ruleimg19_copy.txt)

<a id="aspect-ratio-fitness"></a>

## 宽高比适应度

正如前面对于对称 k = 2、r = 2 规则考察基于宽高比的适应度函数一样，现在我们也可以对所有可能的 k = 2、r = 2 规则构成的整个空间进行同样的研究。下面这张图显示了这些规则能够生成的图案的高度与宽度：

[![原图 52](/media/2bb09d44f912f44e6384.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg1_copy.txt)

由此得到的可能宽高比如下：

[<img src="/media/4375a2d210e7db197633.webp" alt="原文行内图示" width="648" height="35" style="display:inline;vertical-align:middle;margin:0;width:648px;height:35px">](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg2_copy.txt)

它们的分布如下（采用对数刻度）：

[![原图 54](/media/02894005eba6b66a98b1.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg3_copy.txt)

可能取值的范围比对称 k = 2、r = 2 规则大得多：从 <img src="/media/93438b31a57ca13fe1d8.webp" alt="原文行内图示" width="53" height="34" style="display:inline;vertical-align:middle;margin:0;width:53px;height:34px"> 到 <img src="/media/e846c32a32dcddaa1daf.webp" alt="原文行内图示" width="80" height="37" style="display:inline;vertical-align:middle;margin:0;width:80px;height:37px">，而不再是从 <img src="/media/93438b31a57ca13fe1d8.webp" alt="原文行内图示" width="53" height="34" style="display:inline;vertical-align:middle;margin:0;width:53px;height:34px"> 到 <img src="/media/eebb69d704fd5c0c615f.webp" alt="原文行内图示" width="68" height="36" style="display:inline;vertical-align:middle;margin:0;width:68px;height:36px">。现在，宽高比最大的图案是：

[![原图 59](/media/ce0acaa6a72d4e3a1e62.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg8_copy.txt)

而宽高比最小的图案是：

[![原图 60](/media/afa7d577f2c542b8f3e8.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg9_copy.txt)

注意，与对称 k = 2、r = 2 规则一样，要达到更广的宽高比范围，就必须指定规则中更多的情形：

[![原图 61](/media/7315c27f26864b4f765d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg10_copy.txt)

那么，如果通过适应性演化，尝试达到不同的可能目标宽高比，会发生什么？大多数时候（至少在宽高比不超过约 3 时），都存在某条能够做到这一点的突变序列，尽管我们也常常会停滞在另一个宽高比上：

[![原图 62](/media/faf00af9752806cb3bc5.webp)](https://content.wolfram.com/sites/43/2024/12/sw12122024C2Cupdateimg2_copy.txt)

如果考察对某个给定目标宽高比的“最佳逼近程度”，就会看到，随着规则中指定的情形数增加，这一程度也会改善：

[![原图 63](/media/7296dbf3c78ba85ce078.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg12_copy.txt)

那么，对于与某个特定宽高比对应的适应度函数，多路图会是什么样？下面是宽高比为 3 时的结果：

[![原图 64](/media/3c8c7eda4d251cd252cf.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg13_copy.txt)

初始节点涉及宽高比为 1 的图案，实际上是一个包含 263 种这种图案的适应度中性集合。随着我们沿多路图前进，宽高比会逐渐接近 3。不过，最接近 3 的是下面这些图案（它们在图中的位置已经标出）：

[![原图 65](/media/a10e34809e3218028417.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg14_copy.txt)

但实际上（正如我们在上面的图案排列中看到的），确实有一条规则能够给出恰好为 3 的宽高比：

[![原图 66](/media/b497ca35842eb8c15712.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg15_copy.txt)

然而，结果表明，这条规则无法通过每一步只进行一次点突变的适应性演化到达。实际上，适应性演化还不够“强大”，无法实现我们想要的精确宽高比；我们可以认为，这是具有计算不可约性的“发育约束”，以一种“不可预测”的方式阻止了它。

那么，[对称的 k = 3、r = 1 规则](https://writings.internal.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#symmetric)又怎样？它们在宽度和高度上的分布如下：

[![原图 67](/media/871e689c830620a4d09b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg16_copy.txt)

是的，正如“总会有意外”这类故事中经常发生的那样，这里出现了一个奇特的图案：高度为 265，宽度为 173：

[![原图 68](/media/b56e338c78e651bdcafd.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg17_copy.txt)

现在，全部可能的宽高比如下：

[<img src="/media/2da67f251a0629608e91.webp" alt="原文行内图示" width="648" height="35" style="display:inline;vertical-align:middle;margin:0;width:648px;height:35px">](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg18_copy.txt)

它们的（对数）分布是：

[![原图 70](/media/2ea28b2d1b9cbc114975.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg19_copy.txt)

宽高比最大的表型是：

[![原图 71](/media/60df0a1aa71949d4936a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg20_copy.txt)

而宽高比最小的表型是：

[![原图 72](/media/4fa36aa1c0582ab50568.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg21_copy.txt)

同样，要达到更广的宽高比范围，就必须指定规则中更多的情形：

[![原图 73](/media/345c092cdae35469da51.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024aspectimg22_copy.txt)

如果尝试以某个特定宽高比为目标，与 k = 2、r = 2 规则相比，现在会更容易陷入停滞。部分原因也许是，如今可用规则的总数更少了，尽管表型更多：

[![原图 74](/media/0f0ddd565ccaf029cdc9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12122024C2Cupdateimg3_copy.txt)

<a id="branching-in-the-multiway-evolution-graph"></a>

## 多路演化图中的分支

观察这样一幅典型的多路演化图：

[![原图 75](/media/263677c94f9a05265b22.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg1_copy.txt)

我们会看到，不同表型在图中可能相隔甚远，有点像真实生物学中处于生命之树不同分支上的生物体。但怎样刻画这种分隔呢？一种方法是计算这幅图的所谓[支配树](https://reference.wolfram.com/language/ref/DominatorTreeGraph.html)：

[![原图 76](/media/aeb0359f7048b271daed.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg2_copy.txt)

我们可以把它看作一张展示所有节点最近公共祖先的地图。这棵树的构造方式是：给定两个节点，只要沿树向上追溯，就能找到它们的共同祖先。对这棵树的另一种解释是，它告诉我们，从初始节点到达任意给定节点，哪些节点是必经之地。换句话说，要到达某个给定表型，适应性演化沿途必须产生哪些表型。

下面是这棵树的另一种画法：

[![原图 77](/media/4a4b36032e5edaf48582.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg3_copy.txt)

我们可以把它看作生物学中生命之树的对应物；接连出现的分支划分出越来越精细的“分类范围”（类似于界、门等）。

这棵树还告诉我们另一件事：不同连边或节点有多重要，以及移除它们会把树的多大一部分“砍掉”。或者换个说法，阻断某条连边或某个节点能达到多大效果——例如，我们可以设想用这种方式尝试阻止细菌或肿瘤细胞的演化。

如果考察更大的多路演化图，例如完整的 k = 2、r = 2 情形，会怎样？我们同样可以构造支配树：

[![原图 78](/media/f43398452b6fa3c03dad.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg4_copy.txt)

值得注意的是，这里的“分出分支数”差异极大，而拥有最多后继的表型却相当不起眼：

[![原图 79](/media/69c9b1e9e65594518a6c.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg5_copy.txt)

但如果我们的明确目标是到达某个寿命最长（长度为 308）的表型呢？那么，我们就必须沿着原多路演化图中某个特定子图里的路径前进：

[![原图 80](/media/eadbb453edd7b6291d87.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg6_copy.txt)

它对应的表型图如下：

[![原图 81](/media/c88d7d1a811de778e8d4.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024branchingimg7_copy.txt)

一旦偏离这条“狭窄的路径”，就再也无法到达长度为 308 的表型，而必然会困在这棵“生命之树”对应物的另一个分支中。因此，如果我们想把“演化引导”到某个特定结果，这就告诉我们，需要封住许多“岔路出口”。

但通向长度为 308 的表型的子图，占“整幅图的多大比例”呢？整幅图有 2409 个顶点和 3878 条边，而这个子图有 64 个顶点和 119 条边，也就是说，两者的比例都约为 3%。另一种度量是，穿过整幅图的所有路径中，有多大比例通向长度为 308 的表型。路径总数为 606,081 条，其中通向长度为 308 的表型的有 1260 条，约占 0.2%。这是否就告诉了我们，随机进行一系列突变时，到达该表型的概率是多少？还不完全是，因为在多路演化图中，我们进行了许多等价归并，尤其是对适应度中性集合的归并。而如果不做这种归并，相应的数值实际上会小得多——约为 0.007%，下文将讨论这一点。

<a id="exact-match-fitness-functions"></a>

## 精确匹配适应度函数

到目前为止，我们考虑的适应度函数只关注表型图案的粗略特征，例如高度、宽度和宽高比。但如果一个适应度函数只有在表型精确匹配某个特定图案时才达到最大值，会发生什么？

例如，考虑 k = 2、r = 1 的元胞自动机，让其表型生长指定的步数，并用一个适应度函数来统计其中有多少元胞与目标中的对应元胞一致：

[![原图 82](/media/fbf11fd9cb3395fee21e.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg1_copy.txt)

假设从空规则开始，然后通过对规则（这里仅有 8 比特）进行单点突变，实现适应性演化。以规则 30 的图案为目标时，得到的多路图如下：

[![原图 83](/media/bb79573d7b1e3f3e6e05.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg2_copy.txt)

我们看到，经过一番遍历将近三分之一可能规则的大巡游之后，我们可以成功到达规则 30 的图案。但也可能困在规则 86 和规则 190 的图案上，尽管它们的适应度值低得多：

[![原图 84](/media/fa76e5a37be0ed7ab46e.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg3_copy.txt)

如果把所有可能的 k = 2、r = 1 元胞自动机图案分别作为目标，那么每一个目标都能通过从空规则出发的适应性演化到达。不过，在略少于一半的情况下，还存在其他可能的终点（这里用规则编号表示），演化过程可能在那里陷入停滞：

[![原图 85](/media/d4bf706022109ff0128b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg4_copy.txt)

到目前为止，我们一直假设，通过匹配某个元胞自动机生成的图案，就能让适应度函数达到最大值。但如果选一个截然不同的图案来匹配呢？假设我们的图案是：

[![原图 86](/media/6a4353733091dbc755b7.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg5_copy.txt)

采用 k = 2、r = 1 规则（在有限区域中运行，并使用首尾相接的周期边界），我们可以构造出一幅多路图：

[![原图 87](/media/a3cb51a7c2b3cbf350a7.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg6_copy.txt)

并发现，适应度最高的终点是下面这些不太像样的近似：

[![原图 88](/media/cb88603f5957848175f3.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg7_copy.txt)

通过施加随机突变，我们也能到达这些结果：

[![原图 89](/media/afe99cbc46acf8261c33.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg8_copy.txt)

但如果尝试更大的规则空间，例如 k = 2、r = 2 的规则，会怎样？对“A”图像的近似会稍有改善：

[![原图 90](/media/3bcd0515eda1f795db8d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg9_copy.txt)

增大到 k = 2、r = 3 时，最终的近似又稍好一些，但仍算不上好：

[![原图 91](/media/336f0fc78f3a3a538c50.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg10_copy.txt)

如果尝试做同样的事，却把目标换成：

[![原图 92](/media/ac4e61a85b8a6d5ebe2c.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg11_copy.txt)

就会得到例如这样的结果：

[![原图 93](/media/d835d775cb7ddf7e09b2.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg12_copy.txt)

而对于下面这个目标：

[![原图 94](/media/563110cc40b8b5d1da69.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg13_copy.txt)

得到的结果就更不像了，例如：

[![原图 95](/media/e96910ebcbe4f6efc131.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024exactimg14_copy.txt)

这里发生了什么？基本上，如果我们试图设置过于精细复杂的适应度函数，那么规则空间里就不会包含能够成功使它达到最大值的规则，适应性演化过程最终也就只能得到各种不太理想的近似。

<a id="how-fitness-builds-up"></a>

## 适应度如何逐步提高

当我们观察这样的演化过程时：

[![原图 96](/media/59fe131c6bc0ab063612.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024fitnessimg1_copy.txt)

通常会有一种印象：接连出现的表型，是在以某种方式逐渐“沿用并发展”先前表型的“思路”，从而取得更高的适应度。为了更细致地了解这一点，我们可以在每一步中，高亮显示那些使用了规则中“新添加情形”的元胞：

[![原图 97](/media/7610dde8a39e11be6379.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024fitnessimg2_copy.txt)

我们可以把新的规则情形看作有点像生物学中的新基因。因此，我们在这里看到的，就对应于生物演化过程中，新基因被开启（或开始出现）的情形。

下面是其他一些演化路径中的情况：

[![原图 98](/media/31289bb477575a7d9a37.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024nikupdatesimg4_copy.txt)

我们看到的情况相当多样。有少数例子中，新的规则情形只在最后才出现，仿佛某个新“逐步设计出来”的图案被“嫁接在了末尾”。但大多数时候，新的规则情形会稀疏地散布在整个图案中。不知怎么，这几处“微调”就带来了更高的适应度，尽管我们既看不出明显的原因，也没有显而易见的方法预测它们应该出现在什么位置。

把这与真实生物学相比较很有意思：在看起来非常相似的生物体之间，经常能看到似乎是“随机而多余的变化”。（是的，这可能引发各种问题，例如比较模式动物与人类的毒性反应或药物效果时。）

要定量刻画“规则利用”是如何逐步增加的，有许多种方法。下面仅举一例：对于上面演化路径中接连出现的表型，我们可以画出新的规则情形出现在生长过程的哪些阶段：

[![原图 99](/media/16ab088cf5deaf8985bc.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024fitnessimg4_copy.txt)

[![原图 100](/media/5e213602113778c44467.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024fitnessimg5_copy.txt)

<a id="but-is-it-explainable"></a>

## 但它能够被解释吗？

下面是我们在开头讨论过的两条通过“适应性演化”得到的长寿命规则：

[![原图 101](/media/434edfb0c15ee15695ca.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg1_copy.txt)

我们随时可以运行这些规则，看看它们生成什么图案。但有没有办法解释它们的行为？例如，分析它们究竟怎样产生这样的寿命？还是说，我们在这些规则中看到的，基本上是“纯粹的计算不可约性”：要知道它们会生成什么图案、能存活多久，唯一的方法就是一步一步地明确运行它们？

这里的第二条规则似乎比第一条稍有规律，所以我们先研究它。来看看“刀片”部分。一旦这样的结构形成，无论宽度是多少，它的行为基本上都会重复，而且很容易预测接下来会发生什么：

[![原图 102](/media/bea11afceb0fa6c47a8c.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg2_copy.txt)

左边缘每 7 步移动 1 个位置，右边缘每 12 步移动 4 个位置。由于 <img src="/media/011d7a164a0c936cf39c.webp" alt="原文行内图示" width="41" height="34" style="display:inline;vertical-align:middle;margin:0;width:41px;height:34px">，无论初始构型有多宽，它总会消亡；所需的步数大约是初始宽度的 <img src="/media/f404f9a93859530177ff.webp" alt="原文行内图示" width="67" height="34" style="display:inline;vertical-align:middle;margin:0;width:67px;height:34px"> 倍。

但这样的构型是怎样产生的呢？这就远非显而易见了。对于一系列仅含少量元胞的初始条件 <img src="/media/191b74d3ff5bf47be800.webp" alt="原文行内图示" width="91" height="15" style="display:inline;vertical-align:middle;margin:0;width:91px;height:15px"> ……，结果如下：

[![原图 106](/media/a98a07e0573a03f3cae0.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg5_copy.txt)

所以，它确实并不总会直接形成“刀片”。例如，有时反而会形成下面这样的东西；其中一些基本上只是进入重复行为，并永远存活：

[![原图 107](/media/244e49d3fe901ee94111.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg6_copy.txt)

即便从一种“刀片纹理”开始，也可能出现意外情况：

[![原图 108](/media/900c49b36bc322afc9b5.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg7_copy.txt)

有一些[可以持续存在的重复图案](https://www.wolframscience.com/nks/p268--special-initial-conditions/)，而“刀片”确实就使用了其中一种：

[![原图 109](/media/bdb2e4194c93bced194b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg8_copy.txt)

从随机初始条件出发，会看到各种各样的行为，其中刀片相当常见：

[![原图 110](/media/27a799c6a9cf62f23ff8.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg9_copy.txt)

但所有这些，都没有真正让我们更接近“解释”为什么这条规则从单个红色元胞出发，会生成一个长寿命图案。是的，一旦“刀片”形成，我们就知道它需要一段时间才会收拢成尖端。但在这一小块计算可约性区域之外，我们通常无法对这条规则的行为作出多少判断，也无法解释为什么例如在这个初始条件下会形成刀片。

那么，另一条规则呢？那里完全看不出有什么值得关注的可约性局部区域。考察一系列仅含少量元胞的初始条件，我们得到：

[![原图 111](/media/b6dcffdb8991567cf1f1.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg10_copy.txt)

确实，各种不同的行为都可能出现：

[![原图 112](/media/9a1b85cc0fc2ff59ab15.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg11_copy.txt)

其中第一个图案基本上是周期性的，只是每 56 步向左平移 2 个元胞。第三个图案在 369 步后消亡，第四个则在 1023 步后变得基本上呈周期性，周期为 56：

[![原图 113](/media/0ffb14d6b6852c68a1ab.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg12_copy.txt)

如果从随机初始条件开始，我们会看到，少数位置的图案以一种可重复的模式消亡。但总体而言，一切都显得非常复杂：

[![原图 114](/media/6a8af21c720c6d3a008d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg13_copy.txt)

[一如往常](https://www.wolframscience.com/nks/p267--special-initial-conditions/)，这条规则也允许存在呈重复行为的区域，但这些区域通常无法延伸得足够远，因而不能带来任何显著的计算可约性：

[![原图 115](/media/e8b973a880652117c647.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024explainableimg14_copy.txt)

那么，结论是什么？基本上，这些规则与我们在这里见到的几乎所有其他规则一样，其行为在本质上都是计算不可约的。为什么它们寿命很长？我们真正能说的只是“因为它们就是如此”。是的，我们总能运行它们，看看会发生什么。但我们无法建立任何一种“解释性理论”，例如我们在物理学的数学研究方法中所习惯的那种理论。

<a id="distribution-in-morphospace"></a>

## 在形态空间中的分布

我们可以把每种表型所展现的生长图案，看作定义了生物学中所谓的“[形态](https://www.wolframscience.com/nks/chap-8--implications-for-everyday-systems#sect-8-6--growth-of-plants-and-animals)”。那么，如果我们尝试充当“纯粹的分类学家”，把不同表型排列在“形态空间”中，会怎样？下面是使用[机器学习和 FeatureSpacePlot](https://reference.wolfram.com/language/ref/FeatureSpacePlot.html)得到的结果：

[![原图 116](/media/1732abd58d14f8209f0a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024morphospaceimg1_copy.txt)

确实，这种方法倾向于把“视觉上相似”的表型聚在一起。但形态空间中的相近，与基因型中的相近有什么关系？下面的表型排列与上图相同，但现在标出了基因型单次突变所对应的转变：

[![原图 117](/media/77b222a142061ab4872c.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024morphospaceimg2_copy.txt)

例如，如果考虑把高度最大化，那么只会选出其中一些表型：

[![原图 118](/media/c258707f4965778e17c4.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024morphospaceimg3_copy.txt)

对于宽度，选出的集合又稍有不同：

[![原图 119](/media/8bea11c67583ed60589b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024morphospaceimg4_copy.txt)

而如果适应度函数基于宽高比，结果如下：

[![原图 120](/media/960b9637d1551477ac7b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024morphospaceimg5_copy.txt)

换句话说，不同的适应度函数会“选出”形态空间中的不同区域。

我们还可以不局限于对称规则，而是为所有 k = 2、r = 2 规则构造一个形态空间：

[![原图 121](/media/013d1cf3e7f664651b3a.webp)](https://content.wolfram.com/sites/43/2026/08/sw08182026-jira3894updateimg1_copy.txt)

这里的具体排列图案并没有特别重要的意义，主要只是反映了我们采用的降维方法。不过，更有意义的是，不同适应度函数如何从形态空间中选出不同区域。下图展示了基于高度和宽度的适应度函数的结果，各点的颜色依据相应表型的实际高度和宽度值确定：

[![原图 122](/media/cd5ad2e0a2cd04aec045.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024morphospaceCimg8_copy.txt)

下面是基于不同目标宽高比的适应度函数所得到的相应结果，这次颜色依据与目标宽高比的接近程度确定：

[![原图 123](/media/e006675168cee1a008af.webp)](https://content.wolfram.com/sites/43/2024/12/sw12062024colorupdateimg1_copy.txt)

这里的主要结论是什么？我们也许原本会以为，不同适应度函数会清楚地选出形态空间中视觉上不同的部分。但至少在我们这种基于机器学习的形态空间布局方法中，看到的并不是这样。而且，这很可能实际上是一项普遍结论：不存在一种布局方法，能够让任何“容易描述”的适应度函数在形态空间中都具有“几何上的简单性”。这大概又是底层计算不可约性的结果：我们不能指望任何形态空间布局方法，都能提供一种适用于所有适应度函数的方式来“解开不可约性”。

<a id="probabilities-and-the-time-course-of-evolution"></a>

## 概率与演化的时间进程

到目前为止，我们主要关注的是，通过适应性演化究竟可能产生哪些表型序列之类的问题。但在与真实生物演化作类比时——尤其是与化石记录所呈现的生物演化作类比时——讨论时间也很重要。我们不仅要问能产生哪些表型，还要问它们何时出现、出现得多频繁。

例如，假设单点突变以恒定的时间速率发生。那么，从某条给定规则（例如空规则）出发，向其他规则的转变就会以某个速率发生。其中一些转变会产生遭到淘汰的规则。另一些会被保留，却产生同样的表型。还有一些则会导致向不同表型的转变。

我们可以用一幅“表型转变图”来表示这一点：从某个表型出发的每条边，其粗细表示所有可能突变中，导致该边所对应转变的比例：

[![原图 124](/media/401f77ca3443d8c40aca.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg1_copy.txt)

图中的灰色自环表示回到同一表型的转变，因为它们改变的是规则中不起作用的情形。粉色自环则对应于产生会遭到淘汰的规则的转变。这里没有画出被淘汰的规则；我们改为假设，在这种情况下，我们只是“留在原来的表型上等待”，并不进行转变。

我们可以给整个对称 k = 2、r = 2 多路演化图标注转变概率：

[![原图 125](/media/2f13d1dccc9b592a71ba.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg2_copy.txt)

这幅图的底层，是全部 2<sup>19</sup> 条可能的对称 k = 2、r = 2 规则之间的转变概率矩阵。其中的结构反映了这样一个事实：许多规则会转变为仅相差一个比特的规则：

[![原图 126](/media/a7224a6f9ba947248b7e.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg4_copy.txt)

只保留不同的表型，并按寿命排序，我们就可以得到一个表型转变概率矩阵：

[![原图 127](/media/2d59a0b766102c23d87e.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg5_copy.txt)

把这些转变当作马尔可夫过程处理，我们就能计算出每种表型的预期频率随时间（即突变次数）变化的函数：

[![原图 128](/media/b9064cfa884cc0788d90.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg6_copy.txt)

这里发生的事情，基本上就是演化持续地远离单元胞表型。一些中间表型出现后又消失，但最终，一切都“流向”多路演化图上最终的“叶”表型，从而形成一个极限的“平衡”概率分布：

[![原图 129](/media/b761c62739398c70066a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg7_copy.txt)

把各条曲线堆叠起来，就能以另一种方式展示表型频率的演化：

[![原图 130](/media/0b2b00782051bd806fdb.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg8_copy.txt)

如果我们用足够多的独立个体来“运行演化”，得到的极限曲线就是这些。如果减少个体数量，就会开始看到波动。例如，某个特定表型的个体数最终降至零、因而实际上灭绝，就会有一定概率发生。

那么，换一个适应度函数会怎样？下面是用宽度代替高度的结果：

[![原图 131](/media/35d1c653f42fe0e8dc5d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg9_copy.txt)

下面则是以一系列不同目标宽高比为基础的适应度函数的结果：

[![原图 132](/media/38e2edc8bb4451e2f686.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg10_copy.txt)

确实，适应度函数会影响适应性演化过程的时间进程。

到目前为止，我们只考察了对称的 k = 2、r = 2 规则。如果考察所有可能的 k = 2、r = 2 规则组成的空间，看到的行为也很相似。例如，采用标准的高度适应度函数时，可能表型随时间的演化如下：

[![原图 133](/media/dde3df2b48a54ddabe82.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg11_copy.txt)

而如果只看寿命最长（也就是高度最大）的情形，我们会看到：

[![原图 134](/media/901e585c9c30bba619f9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg12_copy.txt)

正如这里的刻度所显示的，这些长寿命表型相当罕见，尽管即使经过任意长的时间，大多数仍会以非零频率出现。这是必然的，因为它们在多路图中是“最大适应度”的终端节点。

事实上，如果把表型的最终频率相对于寿命画出来，就会看到各种各样的情况：

[![原图 135](/media/05beee5bd265bc9640d4.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg13_copy.txt)

“平衡”频率最高的表型如下：

[![原图 136](/media/b20e4119be40c37fff2a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024probabilitiesXimg14_copy.txt)

其中有些寿命相当短，另一些则较长。

<a id="the-macroscopic-flow-of-evolution"></a>

## 演化的宏观流动

上一节中，我们考察了在各种不同但固定的适应度函数下，演化随时间变化的进程。但如果适应度函数本身随时间改变，会怎样？例如，这类似于生物演化所处的环境随时间改变。

如果采用一个目标值随时间线性增加的宽高比适应度函数，结果如下：

[![原图 137](/media/f52b1b1571dbb32ef256.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024macroscopicimg1_copy.txt)

我们看到的行为相当复杂：某些表型会“占一阵子上风”，随后却消失，往往还消失得十分突然，其他表型则取而代之。

如果目标宽高比反而随时间减小，看到的行为就相当不同：

[![原图 138](/media/6e1b57c9a60647c0a0bf.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024macroscopicimg2_copy.txt)

（这里导数的不连续，基本上与新表型在某些特定目标宽高比值处突然出现有关。）

也可以通过突然改变目标宽高比，给“系统一次冲击”：

[![原图 139](/media/fb4b9be96faa10c149f6.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024macroscopicimg3_copy.txt)

[![原图 140](/media/7e5d11298c2f80c3412d.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024macroscopicimg4_copy.txt)

我们看到，有时这种冲击会让存活的表型减少，有时则会让它们增加。

我们可以把不断变化的适应度函数，看作对系统施加“宏观驱动力”的因素。在单次突变与选择事件的层面，事情发生得很快；但适应度函数定义的是系统整体的“目标”，实际上这些目标只缓慢改变。（这有点像流体：分子尺度的过程很快，但压强等宏观参数的变化通常很慢。）

但如果适应度函数定义了一个目标，系统又能在多大程度上达到它呢？下面比较了目标宽高比（这里随时间线性增加）与实际达到的宽高比分布。深色曲线表示对各表型加权平均后得到的平均宽高比，浅蓝色区域表示标准差：

[![原图 141](/media/ddd70197c2b431e63d44.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024macroscopicimg5_copy.txt)

确实，正如从先前结果可以预料的，系统在实现目标方面表现并不特别好。最终，它的行为并没有受到适应度函数的力量“精细雕琢”；相反，它主要由底层适应性演化过程内在的、计算不可约的动力学所主导。

不过，有一点很重要：结果取决于一个参数的值，它本质上是底层突变的发生速率与适应度函数变化速率的相对大小。上图中，在适应度函数从最小值变到最大值的期间，共发生了 5000 次突变。如果改变发生的突变次数（实际上也就是“突变速率”），结果如下：

[![原图 142](/media/c084b098a63fc6bdd3b9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024macroscopicimg6_copy.txt)

一般而言，而且并不出人意料，突变速率越高，适应性演化就越能接近目标。不过，这里展示的两种情况都离目标相当远。

从总体特征来看，我们这里的结果似乎让人联想到连续系统的典型研究，例如基于微分方程的研究。事实上，可以设想，也许存在某种“适应性演化的连续方程”，支配着我们在这里看到的这些情形。但必须明白，这种可能性远非不言自明。因为所有现象的底层，都是一幅结构确定而复杂的多路演化图。我们可能会认为，这种结构的细节会影响整个“连续演化过程”。而且，有时确实如此。

但正如我们在整个[物理学项目](https://www.wolframphysics.org/)中所看到的，当[计算能力有界的观察者](https://writings.stephenwolfram.com/2023/12/observer-theory/)观察现象时，底层的计算不可约性会带来某种不可避免的简单性。我们可以预期，生物演化中也可能发生类似的事情，实际上，[一般的适应性演化](https://writings.stephenwolfram.com/2024/08/whats-really-going-on-in-machine-learning-some-minimal-models/)也是如此。假设我们的适应度函数及其变化过程具有计算有界性，那么可以预期，它们的“总体效应”会遵循相对简单的规律。我们或许可以把这些规律理解为“演化之流”响应外部输入的规律。

<a id="can-evolution-be-reversed"></a>

## 演化可以逆转吗？

上一节中，我们看到，采用不同适应度函数时，会出现不同的表型时间序列，例如某些表型有时会“灭绝”。但假设演化已经在某个特定适应度函数下进行到一定阶段，现在存在着某些表型。那么，我们可以问：能否“逆转”这段演化，回到先前存在过的表型？换句话说，如果改变适应度函数，能否让演化“倒着走”？

我们经常讨论一种以总的有限寿命最大化为目标的适应度函数。但如果使用一段时间后，再把它“反过来”，改为让总寿命最小化，会怎样？

考虑从空规则出发的对称 k = 2、r = 2 规则的多路演化图，适应度函数仍然是把寿命最大化：

[![原图 143](/media/079e08ef2857222d4e71.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024reversedimg1_copy.txt)

但如果现在规定，适应度函数的目标是使寿命最小化呢？从寿命最长的表型出发，就会得到一幅“寿命最小化”的多路图：

[![原图 144](/media/8a2b5293cf292b9b7bf8.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024reversedimg2_copy.txt)

我们可以把这幅“反向图”，与包含从空规则到最大寿命规则的所有路径的“正向图”作比较：

[![原图 145](/media/29b29b834183b81ab36a.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024reversedAimg3_copy.txt)

在这个例子中，出现的表型几乎完全相同，唯一的区别是，反向情形中可能出现 <img src="/media/0d01b065b0d417edafdf.webp" alt="原文行内图示" width="29" height="18" style="display:inline;vertical-align:middle;margin:0;width:29px;height:18px">。

那么，考察所有 k = 2、r = 2 规则时，会怎样？下面是从最长寿命表型出发的“反向图”：

[![原图 147](/media/4ec7449fad8f93f69f57.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024reversedimg5_copy.txt)

这里共出现了 345 种表型，最终一直回到 <img src="/media/cd2b5e2523f6e6b527a1.webp" alt="原文行内图示" width="26" height="18" style="display:inline;vertical-align:middle;margin:0;width:26px;height:18px">。整个“正向图”则共出现了 2409 种表型，而且必须从 <img src="/media/63152d72381e7a943bfa.webp" alt="原文行内图示" width="23" height="18" style="display:inline;vertical-align:middle;margin:0;width:23px;height:18px"> 开始，而不能从 <img src="/media/cd2b5e2523f6e6b527a1.webp" alt="原文行内图示" width="26" height="18" style="display:inline;vertical-align:middle;margin:0;width:26px;height:18px"> 开始。不过，正如前面看到的，其中只有 64 种表型出现在最终通向最大寿命表型的路径上：

[![原图 151](/media/3e80f6badd372a3a3e63.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024reversedimg9_copy.txt)

我们在这里看到，正向图与反向图看起来非常不同。但我们是否可以为反向图构造一个适应度函数，成功约束演化过程，让它精确地沿着正向图的步骤原路返回呢？

一般而言，我们不能指望做到这一点。因为这实际上要求“打破系统的计算不可约性”。它需要一个本质上能够预测演化过程每个细节的适应度函数，从而有能力引导演化。但要做到这一点，从某种意义上说，适应度函数的计算能力就必须达到与演化过程本身同等的层次。

这是我们在本文中多次使用过的一种论证的变体。现实中的适应度函数具有计算有界性，而且在实践中往往还相当粗略。这意味着，不能指望它们能与底层演化过程的计算不可约性相抗衡。

这里可以类比[热力学第二定律](https://writings.stephenwolfram.com/2023/02/computational-foundations-for-the-second-law-of-thermodynamics/)。正如单个分子的微观碰撞原则上很容易逆转，演化图中的单次转变也可能如此。但把许多碰撞或许多转变放在一起，就会产生一个在计算上足够复杂的过程，以至于我们掌握的那些相当粗略的手段无法对其“解码”并逆转。

换句话说，在实践中，分子动力学和生物演化都存在某种不可避免的不可逆性。是的，只要投入足够的计算工作，例如为每一个生物个体仔细控制适应度函数，原则上也许就能精确地“逆转演化”。但在实践中，自然界中存在的，或我们在实验室里容易建立的那些适应度函数，其计算能力都实在太弱。因此，我们不能指望能够让演化精确地原路返回。

<a id="random-or-selected-can-one-tell"></a>

## 随机产生，还是经过选择？能分辨出来吗？

仅仅给出一个基因型，有没有办法判断，它是“纯粹随机”的，还是[某个漫长而复杂的适应性演化过程的实际产物](https://writings.stephenwolfram.com/2018/01/showing-off-to-the-universe-beacons-for-the-afterlife-of-our-civilization/)？原则上，我们可以根据基因型所定义的规则，“长出”相应的表型，再看看它的适应度是否“异常高”。但问题在于，能否不付出生成表型所需的计算工作，而直接从基因型中判断出些什么。

从某种意义上说，这就像是在问：例如，仅根据一条元胞自动机规则，能否预测该元胞自动机的最终行为？计算不可约性的一个核心后果是，一般而言，我们不能指望做到这一点。不过，人们或许会设想，至少可以作出某种“合理猜测”，判断某个基因型“更有可能”是“完全随机”选出的，还是经过了“精心选择”。

为了探索这一点，我们可以观察对称 k = 2、r = 2 规则的基因型，例如，按基于寿命的适应度排列。这里，黑色和白色代表规则中“必须确定”的情形，灰色代表未确定的情形，其中每一个都可以独立地取黑色或白色：

[![原图 152](/media/6e88db5a8ad8ff5cc668.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024randomimg1_copy.txt)

右侧汇总了每个基因型中白色、黑色和未确定的灰色输出结果的数量。正如我们已经多次看到的，要达到高适应度，全部或几乎全部输出结果都必须确定下来，因此，从某种意义上说，整个或几乎整个基因组都“得到了使用”。但我们仍需追问：给定某种实际的输出结果排列，能否成功猜出该基因型是否是选择的产物？

为了进一步了解这一点，我们可以画出规则中每一种情形对应不同输出结果的概率：首先是组合上所有可能的基因型，这一结果很简单；然后是所有能够产生可存活表型的基因型，在我们的例子中，可存活就是寿命有限；最后是“经过选择的基因型”：

[![原图 153](/media/d8c3daf75ef78fe287ea.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024randomimg2_copy.txt)

对于所有可存活的基因组，某些情形总是完全确定的，但原因相当简单。例如，如果 <img src="/media/74c0dd76c7b3f959dcd8.webp" alt="原文行内图示" width="73" height="13" style="display:inline;vertical-align:middle;margin:0;width:73px;height:13px">，生成的图案就会永远以最大速度扩张，因此不可能具有有限寿命。

那么，对于所有 k = 2、r = 2 规则，会发生什么？下面是达到特定适应度水平的实际基因组：

[![原图 155](/media/c23ab9adeb5cc4937862.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024randomimg4_copy.txt)

而下面是规则中每一种情形对应不同输出结果的相应概率：

[![原图 156](/media/b91447790a3e4b3784f2.webp)](https://content.wolfram.com/sites/43/2024/12/sw12032024randomimg5_copy.txt)

的确，在给定的具体设置下，我们可以设想，根据这样的结果，至少近似地算出某个随机选取的基因组是经过选择的基因组的可能性。但一般而言，情况如何？能否在计算工作量有界的条件下，也就是不明确计算表型及其适应度，确定某种信息，从而较好地估计某个基因组是否经过选择？我们有充分理由相信，计算不可约性会让这件事变得不可能。

当然，如果给出的是一个“已经完整计算出来”的表型，那就是另一回事了。但在基因组层面，如果不做这一步计算，似乎不太可能指望区分随机基因型与“以某种方式经过选择”的基因型。

<a id="adaptive-evolution-of-initial-conditions"></a>

## 初始条件的适应性演化

在构建生物演化的理想化模型时，我们关注的是基因型的适应性演化，生物学似乎也是如此；而在我们的例子中，基因型就是元胞自动机的底层规则。但如果我们不改变底层规则，而是改变用来“长出每个生物体”的初始条件，会怎么样呢？

例如，假设我们从此前一直使用的“单个元胞”出发，但在适应性演化的每一步中，改变初始条件中某一个元胞的值，例如，把变化限制在原始元胞一定距离以内；然后保留所有不会导致寿命缩短的初始条件：

[![原图 157](/media/5bfddb740904882efc3c.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveimg1_copy.txt)

在这个适应性演化过程中，得到的寿命序列，也就是“适应度值”序列，为：

[![原图 158](/media/3ab493ed6905f4dd6ce0.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveimg2_copy.txt)

而实现“突破”的初始条件为：

[![原图 159](/media/6cca9067520cc7340ed9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveAimg3_copy.txt)

这一基本设置，与我们此前在规则而非初始条件的适应性演化中反复看到的情况很相似。但有一个立即可见的区别：至少在刚才的例子中，改变初始条件并没有那么明显地为增加寿命“引入新想法”；它给人的印象，更像是在直接扩展“已有的想法”。

那么，更一般的情况如何？k = 2、r = 1 的规则往往要么表现为无限生长，要么不生长，只有通过直接“侵蚀”初始条件，才会出现有限寿命，下面展示的是规则104和164：

[![原图 160](/media/941eb083f22438727ead.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveimg4_copy.txt)

对于 k = 2、r = 2 的规则，即使在对称情形中，情况也更复杂。下面展示了对各种规则，使用所有可能的、逐渐加宽的初始条件时，所得到的最长寿命图案的序列：

[![原图 161](/media/360eb0898d5b7c9f550f.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveimg5_copy.txt)

这里同样显得有些缺乏“根本上的新想法”，尽管某些“机制”确实会随着初始条件增大而逐渐扩展。一个值得注意的规律是，图案的最大寿命常常似乎与允许使用的初始条件宽度大致成正比。

适应性演化能“发现更多东西”吗？通常，如果它只是修改某个固定区域内的初始条件，似乎并不能；这同样更像是在“扩展已有机制”，而不是引入新机制：

[![原图 162](/media/46558e11bba2dd889aee.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveimg6_copy.txt)

[![原图 163](/media/62dc1552168a8635062b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024adaptiveimg7_copy.txt)

<a id="2d-cellular-automata"></a>

## 二维元胞自动机

到目前为止，我们做的一切都针对一维元胞自动机。那么，转到二维后，会发生什么？最终，情况将与一维非常相似，只是即便邻域相当小，规则空间也会庞大得多。

对于 k = 2 种颜色，如果使用5元胞邻域 <img src="/media/8ad9a80e3ca59612da21.webp" alt="原文行内图示" width="18" height="18" style="display:inline;vertical-align:middle;margin:0;width:18px;height:18px">，结果表明，无法通过单点突变“摆脱空规则”。问题在于，无论在规则中添加哪一个单独的情形，要么什么都不发生，要么只会导致无界生长。而且，即使使用9元胞邻域 <img src="/media/b9cba23bbf5b58c96316.webp" alt="原文行内图示" width="18" height="18" style="display:inline;vertical-align:middle;margin:0;width:18px;height:18px">，从单元胞初始条件出发，也无法得到能表现出既非受限、也非无限的生长行为的规则。但若采用 <img src="/media/8ad9a80e3ca59612da21.webp" alt="原文行内图示" width="18" height="18" style="display:inline;vertical-align:middle;margin:0;width:18px;height:18px"> 这样的初始条件，就可以做到。例如，下面是以寿命为适应度函数，通过适应性演化生成的表型图案序列：

[![原图 167](/media/87fdda2b6a913222d0ef.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024cellularimg1_copy.txt)

这些图案“从上方俯视”时，看起来是这样的：

[![原图 168](/media/6e42375b0f80de6d773d.webp)](https://content.wolfram.com/sites/43/2026/07/sw07272026bioevoupdateimg1_copy.txt)

而在这一情形中，适应度是这样逐步提高的：

[![原图 169](/media/bc168d089cd20d260382.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024cellularimg3_copy.txt)

9邻域规则总共有 [2<sup>512</sup> ≈ 10<sup>154</sup> 种](https://www.wolframscience.com/nks/notes-5-2--numbers-of-possible-2d-cellular-automaton-rules/)，在这个庞大的规则空间中，适应性演化很容易找到寿命很长但有限的规则。顺便说一句，我并不知道这个空间中“忙海狸”寿命的绝对最大值是多少。

正如在一维情形中一样，我们看到的行为也存在相当大的差异。下面是不同适应性演化实例所得到的“最终规则”的一些例子：

[![原图 170](/media/9d4a35f6a6d32139d922.webp)](https://content.wolfram.com/sites/43/2024/12/sw12042024cellularimg5_copy.txt)

在少数情况下，我们很容易“看出”决定其寿命的“机制”，例如它与局域结构之间的碰撞有关。但大多数情况下，正如我们看到的其他例子一样，要说明这些规则如何实现漫长却有限的寿命，并不存在切实可行的“叙事性解释”。

<a id="the-turing-machine-case"></a>

## 图灵机的情形

好，现在我们既研究了一维元胞自动机，也研究了二维元胞自动机。但那些根本不是元胞自动机的系统又如何呢？我们还会看到在元胞自动机中识别出的那些适应性演化核心现象吗？[计算等价原理](https://www.wolframscience.com/nks/chap-12--the-principle-of-computational-equivalence/)无疑会让我们预期，答案是肯定的。不过，为了至少检验一个例子，让我们来看看[图灵机](https://www.wolframscience.com/nks/chap-3--the-world-of-simple-programs#sect-3-4--turing-machines)。

下面这台图灵机的读写头有 s = 3 种状态，纸带上的元胞有 k = 2 种颜色：

[![原图 171](/media/4b212af3c86003fe9cae.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg1_copy.txt)

这台图灵机被设定为：一旦遇到规则中输出为 <img src="/media/131278007dcf90beb38a.webp" alt="原文行内图示" width="9" height="9" style="display:inline;vertical-align:middle;margin:0;width:9px;height:9px"> 的情形，就停机。从空白初始条件出发，这台特定的图灵机会在19步后停机。

那么，如果我们尝试通过适应性演化，得到寿命很长，也就是经过很多步才停机的图灵机，会怎么样？假设我们从一条在所有情形下都会停机的“空规则”出发，然后对规则进行一系列单点突变，保留那些不会让图灵机比之前更早停机的突变。下面这个例子中，适应性演化最终得到了一台经过95步才停机的图灵机：

[![原图 173](/media/2e530134ade006e6cc1c.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg3_copy.txt)

这里涉及的“突破性”突变序列为：

[![原图 174](/media/5363c063b85793759d1f.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg4_copy.txt)

其对应的适应度曲线为：

[![原图 175](/media/abbbfb3f8be68984dc93.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg5_copy.txt)

的确，这一切都与我们在元胞自动机中看到的情形非常类似。但有一点不同：在图灵机中，停机时间通常会出现大得多的跳跃。其根本原因只是，在任意一个特定步骤中，图灵机所做的事情，都远少于典型的元胞自动机，因此它们达到某个特定状态，例如停机状态，可能需要长得多的时间。

下面是在 s = 3、k = 3 图灵机空间中进行适应性演化的一个例子。在这个例子中，最终的停机时间足够长，以至于我们不得不把图像沿竖直方向压缩至原来的五分之一：

[![原图 176](/media/2770f1c21ee4677859db.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg6_copy.txt)

这个例子的适应度曲线，最好用对数尺度查看：

[![原图 177](/media/5797b53a24e60b5f3806.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg7_copy.txt)

不过，上文中我们看到的最长寿命元胞自动机，通常似乎具有非常复杂的行为；而这里寿命最长的图灵机，至少从表面上看，运作方式似乎要“系统化”和“机械化”得多。确实，如果我们进一步压缩可视化结果，只查看图灵机读写头改变移动方向时的步骤，这一点就会更加明显：

[![原图 178](/media/df8e0f6a47dcac39f9b9.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg8_copy.txt)

通过适应性演化找到的长寿命图灵机，并不总是这么简单，不过它们仍往往比长寿命元胞自动机表现出更多规律性：

[![原图 179](/media/c499632da9f2b1839937.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg9_copy.txt)

不过，可能正因为图灵机比元胞自动机“效率更低”，它们所能达到的最长寿命可以极其巨大。目前还不清楚，能否通过适应性演化找到具有这种寿命的规则，尤其是因为，即使只计算某条特定候选规则的适应度函数，也可能[耗费没有上界的时间](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#the-issue-of-undecidability)。事实上，在 s = 3、k = 3 的规则中，[可能的最长寿命约为10<sup>17</sup>步](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#computation-theoretic-perspectives-and-busy-beavers)，由下面这条规则实现：

[<img src="/media/159850384897c650ea6b.webp" alt="原文行内图示" width="371" height="32" style="display:inline;vertical-align:middle;margin:0;width:371px;height:32px">](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg12_copy.txt)

它的行为如下，可谓“极其一板一眼”：

[![原图 181](/media/d13e55bfad09bd39c3a0.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg13_copy.txt)

那么，多路演化图又如何呢？允许包含停机状态的 s = 2、k = 2 图灵机，总共有20,736台。它们能够产生37种不同的有限寿命表型：

[![原图 182](/media/a9ebd4a5ae5d512b1f14.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg14_copy.txt)

正如我们研究过的其他情形一样，这里也存在适应度中性集合，例如：

[![原图 183](/media/a23d7a0d971c66b8703b.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingBimg14_copy.txt)

从这18个集合中的每一个只取一个代表，我们就可以构造以寿命为适应度函数的2,2图灵机多路演化图：

[![原图 184](/media/653a8d505b60f5d8d5fc.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024turingimg16_copy.txt)

下面是3,2图灵机的对应结果，有2250种不同表型，最长寿命为21步，图灵机产生的图案仅以“薄片”形式显示：

[![原图 185](/media/3cd8a44a19f1e1961014.webp)](https://content.wolfram.com/sites/43/2024/12/sw12122024C2Cupdateimg4_copy.txt)

我们也可以选择其他适应度函数，例如图案的最大宽度、读写头反向移动的次数等。但适应性演化的基本结构与后果，在图灵机和元胞自动机中似乎非常相似，正如计算等价原理让我们预期的那样。

<a id="multiway-turing-machines"></a>

## 多路图灵机

普通图灵机，以及普通元胞自动机，实际上始终沿着单一的历史路径前进，根据底层规则，产生一个确定的状态序列。但我们也可以研究[多路图灵机](https://www.wolframphysics.org/bulletins/2021/02/multiway-turing-machines/)，其中可以沿着多条历史路径前进。例如，考虑下面这条规则：

[![原图 186](/media/ace5386b79307fc4d1cc.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024machinesimg1_copy.txt)

这条规则中的 <img src="/media/aaf743ec14ecd330798d.webp" alt="原文行内图示" width="19" height="19" style="display:inline;vertical-align:middle;margin:0;width:19px;height:19px"> 情形，有两个可能的输出结果，因此这是一个多路系统，我们需要用多路图来表示其行为：

[![原图 188](/media/8326a4b89e19bd238e20.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024machinesimg3_copy.txt)

从生物学的角度看，我们或许可以把这样的多路系统，视为适应性演化过程的一个理想化模型。于是现在可以问：我们能让这种演化本身演化吗？换句话说，能否对多路图灵机这样的系统应用适应性演化？

例如，假定我们进行单点突变，只改变多路图灵机规则中的一个情形：

[![原图 189](/media/fdaaebabae01962a22ed.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024machinesimg4_copy.txt)

许多多路图灵机不会停机，或者至少不会在所有分支上都停机。但对于我们的适应度函数，假定要求多路图灵机在所有分支上都停机，或者至少进入会反复访问相同状态的循环；然后，把适应度定义为[所有分支都停机后，多路图中的节点总数](https://bulletins.wolframphysics.org/2021/02/multiway-turing-machines/#the-halting-problem-and-busy-beavers)。的确，这是我们为普通图灵机定义的寿命适应度函数的直接推广。

在这一设置下，下面展示了适应性演化过程中“突破”序列的一些例子：

[![原图 190](/media/c3f259ddd26c86f92d48.webp)](https://content.wolfram.com/sites/43/2024/12/sw12122024C2Cupdateimg5_copy.txt)

但如果考察多路图灵机的所有可能演化路径，会怎么样？换句话说，如果为多路图灵机的演化构造一个多路图，又会如何？

下面是这样做得到的一个例子，每个节点只展示相应适应度中性集合中的一个例子：

[![原图 191](/media/fc4d1f15b2dfac58e5f2.webp)](https://content.wolfram.com/sites/43/2024/12/sw12052024machinesimg6_copy.txt)

那么，这里到底发生了什么？我们得到了一个由多路图构成的多路图。不过，需要理解的是，内层与外层的多路图稍有不同。外层实际上是一个[规则空间多路图（rulial multiway graph）](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/)，其中不同部分对应于遵循不同规则。内层实际上是一个分支多路图（branchial multiway graph），其中不同部分对应于应用某条特定规则的不同方式。不过，至少在原则上，我们最终可以预期，能够把分支变换编码为规则空间变换，反之亦然。

因此，我们可以把多路图灵机的适应性演化，视为探索“高阶演化”的第一步：演化的演化，等等。最终，我们也由此探索规则宇宙中的递归演化所面临的必然极限，以及这些极限可能如何与规则宇宙中观察者的形成相关联。

<a id="some-conclusions"></a>

## 一些结论

这一切对于生物演化的基础意味着什么？首先，也是最重要的一点，它强化了这样一种认识：[计算不可约性是生物学中的主导力量](https://www.wolframscience.com/nks/chap-8--implications-for-everyday-systems#sect-8-5--fundamental-issues-in-biology)。人们或许会以为，生物学中看到的一切，必定是由适应度约束，例如环境施加的约束，“精心雕琢”出来的。但我们在这里发现的情况提示，我们所见的许多事物，其实只是计算不可约性的直接体现。而归根结底，生物演化似乎最主要的工作，就是“征用”一块块不可约计算，并对它们加以配置，以实现“适应度目标”。

正如我最近发现的，这与[机器学习中发生的事情](https://writings.stephenwolfram.com/2024/08/whats-really-going-on-in-machine-learning-some-minimal-models/)非常相似。在这两种情形中，这幅图景都意味着，我们能够期望得到的解释类型存在限制。如果问，某个事物为什么具有它如今的形式，答案往往只会是：“因为碰巧选中了这一块不可约计算。”我们没有理由认为，会存在传统科学中人们可能期望的那种“叙事性解释”。

模型的简单性，使我们不仅能够研究适应性演化的某些特定可能路径，还能研究由所有可能路径构成的完整多路图。我们在这里看到，适应度函数实际上为这样的多路图定义了某种[遍历次序，或者大致说来，某种叶状分解](https://www.wolframphysics.org/technical-introduction/the-updating-process-for-string-substitution-systems/foliations-and-coordinates-on-causal-graphs)。如果这样的叶状分解可以任意复杂，它们就可能挑选出演化的特定结果，实际上通过自然选择和适应度函数的细节，成功地“雕琢生物世界”。

但关键在于，适应度函数及其产生的多路演化图的叶状分解，并不会变得任意复杂。尽管表型发育的底层过程充满计算不可约性，应用于其上的适应度函数却是计算有界的。因此，复杂性或许是生物系统最引人注目的直观特征，而实际上，它来自选择过程的计算有界性，与底层生长发育过程的计算不可约性之间的相互作用。

所有这些，都建立在一个根本思想之上：生物演化，以及生物学，在核心上都是计算现象。基于这种理解，一种非凡的统一图景正在浮现。

这一图景始于[规则宇宙（ruliad）](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/)，这个抽象对象对应于所有可能计算过程相互纠缠的极限。我们讨论过，可以把规则宇宙视为物理学和[数学](https://writings.stephenwolfram.com/2022/03/the-physicalization-of-metamathematics-and-its-implications-for-the-foundations-of-mathematics/)的终极基础。现在我们看到，也可以把它视为生物学的终极基础。

在物理学中，关键在于，[像我们这样的观察者，会以某些方式“解析”规则宇宙](https://writings.stephenwolfram.com/2023/12/observer-theory/)，而这些方式让我们对规则宇宙形成的感知，遵循已知的核心物理定律。类似地，当像我们这样的观察者做数学时，可以认为，我们是在从解析规则宇宙的方式中“提取数学”。而现在我们看到，生物学之所以涌现，是因为来自环境等的选择，以某种方式“解析”了规则宇宙。

这种观点的力量在于，即使对选择如何运作只作出出人意料地少的假设，我们依然能够推导出生物学中的重要结论。尤其是，如果假定选择以计算有界的方式运作，那么，仅根据从规则宇宙“继承”而来的、不可避免的底层计算不可约性，我们就立即知道，生物学必定具有某些特征。

在物理学中，[热力学第二定律源于这样一种相互作用](https://writings.stephenwolfram.com/2023/02/computational-foundations-for-the-second-law-of-thermodynamics/)：一方面，是涉及许多粒子或其他对象的力学过程所具有的底层计算不可约性；另一方面，是我们作为观察者的计算有界性。我们之所以觉得“随机性正在增加”，是因为作为计算有界的观察者，我们无法“解密”底层的计算不可约性。

那么，它在生物学中的对应是什么？正如我们不能指望在一个遵循第二定律的系统中“说清会发生什么”，也不能指望“通过选择来解释”生物系统中发生的一切。换句话说，生物学中我们看到的许多事物，仅仅是因为计算不可约性才成为如今这样；无论我们怎样尝试，都无法用某种我们能够描述的适应度标准来“解释”它们。

但这并不意味着，我们不能期待推导出“一般性的生物学定律”，正如气体具有一般定律，尽管其细节结构遵循第二定律。通过这里所做的工作，我们已经可以开始看到一些线索，了解这些一般定律可能是什么样子。

它们可能会是一些总体性的陈述，描述可能的演化路径，以及改变这些路径所受约束的影响；这有点像流体力学定律，只不过如今应用于可能基因型所构成的规则空间。但有一点已经很清楚：我们发展出的生物演化最简模型，具有非凡的丰富性与潜力。过去，我们能够谈论的，实际上相当于演化的纯粹组合关系；现在，我们则可以开始有条理地讨论演化实际在做什么。这样做，也使我们朝着最终为生物学奠定理论科学基础的方向前进。

<a id="theres-so-much-more-to-study"></a>

## 还有太多值得研究的东西！

尽管这已经是我关于这个生物演化最简模型的第二篇长文，但对于它能用来做什么，我的探索还只是皮毛。首先，也是最重要的，是要在模型与生物学中已经观察到，或者可能观察到的实际现象之间，建立许多具体联系。但模型本身也有很多东西值得直接研究，实际上，还需要对它开展大量规则学研究。尤其值得注意的是，其中许多规则学研究都很容易着手。没错，你可以点击这里的任何一张图，获取生成它的 Wolfram 语言代码。有哪些显然值得做的事情呢？这里举几项：研究其他适应度函数，其他规则空间，其他初始条件，其他演化策略。研究让规则和初始条件同时演化的情况。研究在演化过程中，以不同方式改变适应度函数的情况。研究使用大得多的规则空间会有何影响。研究对扰动是否具有稳健性。

在这里的工作中，我实际上分别归并了相同的基因型（以及相同的表型）。但也可以研究，如果实际上“追踪每一个生物个体”，会发生什么。得到的抽象结构，将推广我们在这里展示的多路系统，并关联到更高层次的抽象形式体系，从而能够描述那些实际上处于“物种以下”的现象。

[历史说明见这里 »](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/#historical-notes)

<a id="thanks"></a>

## 致谢

感谢 Wolfram 研究所研究员 Richard Assar 和 Nik Murzin 的帮助，也感谢 Wolfram 研究所新设理论生物学计划的支持者。还要感谢 Brad Klee 的帮助。今年，Brian Mboya、Tadas Turonis、Ahama Dalmia 和 Owen Xuan 在我们的[暑期项目](https://education.wolfram.com/programs/)中完成了相关学生项目。

自从3月写下[我的第一篇生物演化文章](https://writings.stephenwolfram.com/2024/05/why-does-biological-evolution-work-a-minimal-model-for-biological-evolution-and-other-adaptive-processes/)以来，我有机会参加了两场生物学会议：SynBioBeta，以及在卡内基研究所举办的 WISE，即“信息、选择与演化研讨会”。感谢这两场会议的许多与会者所给予的热情与意见。有趣的是，在2024年10月的 WISE 会议之前，我上一次参加关于生物演化的会议，已经是40多年前的事了，那是1984年6月举行的 Mountain Lake（山湖）演化与发育会议。

***

## 来源与许可

原作：Stephen Wolfram（2024），*Foundations of Biological Evolution: More Results & More Surprises*，Stephen Wolfram Writings。© Stephen Wolfram, LLC。

原网站页脚将开放内容标为 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)，代码另标为 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)。本译文属于将英文译为中文并调整为 Markdown 排版的改编，译文按 CC BY-SA 4.0 提供；这不表示原作者认可本译文。

图片保持原样，版权为 © Stephen Wolfram, LLC；依据[原站图片使用条款](https://writings.stephenwolfram.com/terms/)，未另行标注的图片采用 MIT 许可。图片许可声明见[原站图片使用条款](https://writings.stephenwolfram.com/terms/)。
