[TOC]



# cpu的结构和功能

本章从分析CPU 的功能和内部结构入手，详细讨论机器完成一条指令的全过程，以及为了
进一步提高数据的处理能力、开发系统的并行性所采取的流水技术。



## cpu控制器必须具备的功能

取指令:自动形成指令地址;发出取指令

分析指令:分析操作码和地址码

执行指令:执行 操作码的 命令 ,并控制 其他部件 如 ALU etc. 程序输入和结果输出等.



## 结构框图

![image-20200520163741072](D:\src\Typora记录\计算机组成原理\images\image-20200520163741072.png)



![image-20200520163754565](D:\src\Typora记录\计算机组成原理\images\image-20200520163754565.png)





## cpu中的寄存器

### 1.用户可见寄存器

- 通用寄存器
- 数据寄存器
- 地址寄存器
- 条件吗寄存器

### 2.控制和状态寄存器(用户不可见)

用于控制cpu的操作和运算

- MAR
- MDR
- PC
- IR
- 状态字寄存器 psw

### 应用举例:

![image-20200522183152545](D:\src\Typora记录\计算机组成原理\images\image-20200522183152545.png)



### 控制单元和中断系统

一种是组合逻辑设计方法，为硬连线逻辑；另一种是微程序设
计方法，为存储逻辑

中断系统主要用于处理计算机的各种中断，详细内容在8.4 节介绍。