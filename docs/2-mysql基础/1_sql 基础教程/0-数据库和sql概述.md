# 数据库的好处

![image-20210305164914877](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305164914877.png)

实现数据的持久化 

使用哦完整的管理系统统一管理 易于查询

# 数据库的概念

![image-20210305165002189](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165002189.png)

**SQL的优点：**

 1、不是某个特定数据库供应商专有的语言，几乎所有 DBMS都支持SQL 2、简单易学 3、虽然简单，但实际上是一种强有力的语言，灵活使 用其语言元素，可以进行非常复杂和高级的数据库操作。

## DBMS

![image-20210305165037146](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165037146.png)

## 数据库分类:

### [关系型数据库](关系数据库.md)

不仅可以存储数据，还可以存储数据与数据之间的关系。

![image-20210729111458384](%E7%AC%AC0%E8%8A%82%20%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8Csql%E6%A6%82%E8%BF%B0.assets/image-20210729111458384.png)



例如上面的例子，我们可以在城市表中维护一个省份的编号，这样我们就能知道省份表和城市表之间的关系。

关系型数据库基本上都是SQL数据库。也就是要通过SQL语言来去操作的数据库。关系型数据库这类数据库基本上都是基于磁盘来存储的。那么基于磁盘来存储的话，就有读写比较慢的问题，很难去适用于并发量比较大的场景，那么这个时候非关系型数据库应运而生。

**关系型数据库有哪些产品呢？**

- Oracle 这是一家美国公司，起初就是以Oracle这个数据库发家的。

- MySQL MySQL最开始是一个开源的数据库，前几年被Oracle收购了。

  > 	关于 MariaDB、MySQL、MaxDB 名字的由来，这里有个不得不说的小插曲。Monty 有一个女儿，名叫 My，因此他将自己开发的数据库命名为 MySQL。Monty 还有一个儿子，名为 Max，因此在 2003 年，SAP 公司与 MySQL 公司建立合作伙伴关系后，Monty 又将与 SAP 合作开发的数据库命名为 MaxDB。而现在的 MariaDB 中的 Maria 是 Monty 小孙女的名字。
  >

- MariaDB 一个开源的数据库，和MySQL是同一个作者。

- SQL server 微软的产品

- Access Office套件中的一个产品，其实就是一个可视化的数据库

- SQL lite 这个是一个轻量级的数据库，用于在Android 系统中存储联系人，短信等等

- OceanBase 这是一个阿里的数据库产品

关系型数据库有这么多的产品，那么我们是不是都需要学习呢？

所有的关系型数据库都是遵循SQL标准的，其实就是都是遵循SQL语法的，也就是我们只需要学会SQL语法，那么就能去使用上面的所有的数据库了。SQL语法就好比普通话，我们所有省份的人都要会说普通话，但是不同的省份可能会有方言。所有我们要去掌握SQL的标准语法。

### 非关系型数据库

NoSQL数据库。Not only SQL数据库，它是对我们关系型数据库的一个良好的补充，一般来说，非关系型数据库都是基于内存来存储的，所以读写速度比较快。

- Memcache 其实就是一个内存数据库，它就是一个大号的静态的Map，可以支持数据过期等等，但是有一个致命的特点--不能持久化，也就是在突发状况下，不能把内存中的数据持久化到磁盘
- **[Redis](https://redis.io/) Redis是一个开源非关系型数据库，Redis最显著的进步其实就是可以支持多种持久化的方法。最火的非关系型数据库** 
- MongoDB

应用模型：



![image-20210729111510906](%E7%AC%AC0%E8%8A%82%20%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8Csql%E6%A6%82%E8%BF%B0.assets/image-20210729111510906.png)

## sql语言概述

![](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165037146.png)

![image-20210305165101081](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165101081.png)

什么是SQL？SQL是结构化查询语言的缩写，用来访问和操作数据库系统。SQL语句既可以查询数据库中的数据，也可以添加、更新和删除数据库中的数据，还可以对数据库进行管理和维护操作。不同的数据库，都支持SQL，这样，我们通过学习SQL这一种语言，就可以操作各种不同的数据库。

**总的来说，SQL语言定义了这么几种操作数据库的能力：**

​	|

​	|

<.   .>

# sql语言分类

![image-20210305165133238](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165133238.png)

## DML:

![image-20210305165153936](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165153936.png)

## DDL:

![image-20210305165245642](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165245642.png)

## DCL:

![image-20210305165311640](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/sql/image-20210305165311640.png)

