# B+树

## 简介

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Bplustree.png/400px-Bplustree.png)

**B+ 树**是一种[树数据结构](https://zh.wikipedia.org/wiki/树_(数据结构))，通常用于[数据库](https://zh.wikipedia.org/wiki/数据库)和[操作系统](https://zh.wikipedia.org/wiki/操作系统)的[文件系统](https://zh.wikipedia.org/wiki/文件系统)中。B+ 树的特点是能够保持数据稳定有序，其插入与修改拥有较稳定的对数时间复杂度。B+ 树元素自底向上插入，这与[二叉树](https://zh.wikipedia.org/wiki/二叉树)恰好相反。

B+ 树在节点访问时间远远超过节点内部访问时间的时候，比可作为替代的实现有着实在的优势。这通常在多数节点在[次级存储](https://zh.wikipedia.org/w/index.php?title=次级存储&action=edit&redlink=1)比如[硬盘](https://zh.wikipedia.org/wiki/硬盘)中的时候出现。通过最大化在每个[内部节点](https://zh.wikipedia.org/w/index.php?title=内部节点&action=edit&redlink=1)内的[子节点](https://zh.wikipedia.org/w/index.php?title=子节点&action=edit&redlink=1)的数目减少树的高度，平衡操作不经常发生，而且效率增加了。这种价值得以确立通常需要每个节点在次级存储中占据完整的[磁盘块](https://zh.wikipedia.org/w/index.php?title=磁盘块&action=edit&redlink=1)或近似的大小。

B+ 背后的想法是内部节点可以有在预定范围内的可变量目的子节点。因此，B+ 树不需要像其他[自平衡二叉查找树](https://zh.wikipedia.org/wiki/自平衡二叉查找树)那样经常的重新平衡。对于特定的实现在子节点数目上的低和高边界是固定的。例如，在 2-3 B 树（常简称为**2-3 树**）中，每个内部节点只可能有 2 或 3 个子节点。如果节点有无效数目的子节点则被当作处于违规状态。

B+ 树的创造者 [Rudolf Bayer](https://zh.wikipedia.org/wiki/Rudolf_Bayer) 没有解释*B*代表什么。最常见的观点是*B*代表*平衡*(balanced)，因为所有的叶子节点在树中都在相同的级别上。*B*也可能代表*Bayer*，或者是[波音](https://zh.wikipedia.org/wiki/波音)（Boeing），因为他曾经工作于*波音科学研究实验室*。

## 结构

在B+树中的节点通常被表示为一组有序的元素和子指针。

来源:[数据可视化](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)

![image-20210805112013411](C:/Users/12824/AppData/Roaming/Typora/typora-user-images/image-20210805112013411.png)

