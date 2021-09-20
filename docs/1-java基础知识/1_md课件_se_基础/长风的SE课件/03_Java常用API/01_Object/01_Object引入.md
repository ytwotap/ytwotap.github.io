# Object引入

> API概念的引入

- API，全称Application Programming Interface，也就是应用程序编程接口
  - 此接口并非真正的接口，在Java当中指的是一些预先定义好的类和方法
- API的作用
  - 开发者可以在不关注具体实现细节的前提下，使用这些已经预先定义好的类和方法实现自己的需求
- API的分类
  - JDK中自带的，可以通过官方API文档去学习
  - 开发者编写的，依赖于开发者之间去沟通



> Object类概述

- Object类是所有类继承层次的祖先类。
  - 所有类（包括数组）都直接或者间接的继承自该类，都实现了该类的方法
- 自定义类时，我们并不需要特别的标注**extends Object**
  - 这是一个隐式的继承
- 如果一个类没有明确的指出它的父类，Object类就默认被认为是这个类的父类，extends Object则被省略了





> 为什么所有类都有一个默认无参？

- 当一个类没有定义构造方法的时候，就会自动添加默认构造方法
- 一旦有默认构造方法，在创建子类对象的时候，就会执行子类对象的隐式初始化
- 隐式初始化，默认调用父类的无参构造
- 所以最终，一定能保证，调用到Object类的无参构造方法，先初始化Object这个父类





> Object的成员方法：

- public final Class getClass()
- public String toString()
- public boolean equals(Object obj)
- public int hashCode()
- protected void finalize()
  - 不重要，Java9开始用@Deprecated标记该方法
- protected Object clone()