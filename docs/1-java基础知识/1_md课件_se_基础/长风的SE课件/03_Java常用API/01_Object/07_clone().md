# clone()

> 引入
>
> 生物学上的clone，是由物种A的体细胞经过无性繁殖，生成基因型完全一致的后代的过程
>
> Java问世时，生物学上clone技术已经风靡全球，所以Java中的clone方法和生物学中的克隆有类似性
>
> 所以Java中的克隆就是复制一个和之前对象一模一样但又完全独立的一个新对象



> 概述

- protected Object clone() 
- 语法：对象名点clone();
- 创建并返回此对象的一个副本（对象的引用）
- 该副本和原对象具有相同的属性



> 使用clone()方法注意事项

- protected权限问题
  - 在一个类中创建自身对象，然后调用clone()拷贝，无需重写clone() 方法
  - 在其他类中克隆一个类的对象，需要重写clone()方法权限
- 要想使用一个类的clone() 方法，这个类都必须实现Cloneable接口
  - 否则抛出CloneNotSupportedException异常

- 使用clone() 方法创建对象，和new创建对象属于同等级别的Java中创建对象的方式
  - clone()方法创建对象是调用native方法，不调用构造方法
- 返回值类型是一个Object对象，必要的时候要进行强转





> clone() 方法对该副本的要求：

​	对于任何对象 x，表达式： 

​		1，x.clone() != x 为 true（这一条是必须的）

​		2，x.clone().getClass() == x.getClass() 为true

​		3，x.clone().equals(x) 为true（一般情况下为true，但这并不是必须要满足的要求）







> Cloneable（空）接口简介

- 该接口是一个空接口，没有任何方法，通常把这种接口叫
- 空（标记）接口的意义：
  - 实现空接口后，从成员角度，该类没有任何变化
  - 但是在内存中，该类的数据类型已然发生了改变，成为了这个接口的一个实现类
- 空接口的作用：
  - 空接口给该实现类打上了标记
  - 使用 instanceOf 运算符，可以判断一个类是否是该空接口的实现类
  - 如果判定是，可以进行一系列操作





> 浅拷贝和深拷贝：

- 浅拷贝：
  - 被复制对象的，所有基本类型成员变量值，都与原来对象的相同，且独立
  - 被复制对象的，所有引用类型的引用，仍然指向原来的对象，相当于复制了对象引用，而没有复制对象
- 深拷贝：
  - 在浅拷贝的基础上，复制对象引用的同时，也复制了对象，并让复制的引用指向了复制的对象
- Object类当中的clone() 方法只是浅拷贝
- 深拷贝基于浅拷贝实现，需要我们手动重写clone() 方法实现

​	



> 深度克隆练习

- 现在有三个类 FirstLevel 、SecondLevel 、ThirdLevel 

- FirstLevel 类有三个属性

  - ```Java
     int firstIntValue;
     double firstDoubleValue;
     SecondLevel second;
    ```

- SecondLevel 类有三个属性

  - ```Java
     int secondIntValue;
     double secondDoubleValue;
     ThirdLevel third;
    ```

- ThirdLevel 类有两个属性

  - ```Java
     int thirdIntValue;
     double thirdDouleValue;
    ```

    

