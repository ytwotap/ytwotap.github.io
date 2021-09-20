# String

> String概述

- 在Java语言中，所有类似“ABC”这样用双引号引起来的字符串，都是String类的对象
- String类位于java.lang包下，是Java语言的核心类
- String类提供了字符串表示、比较、查找、截取、大小写转换等各种针对字符串的操作





> 构造方法（constructor）

- 使用String尤其要注意导包问题，导错包会直接导致不能运行main方法

```Java
//创建空字符串对象，需要注意的是null != ""
public String()
//把字节数组中的元素转换成字符串，字节数组中可以是字符，也可以是ASCII码值
public String(byte[] bytes)
//同上，不过指定了开始下标和长度
public String(byte[] bytes,int offset,int length)
//同字节数组
public String(char[] value)
//同上，不过指定了开始下标和长度
public String(char[] value,int offset,int count)
//套娃
public String(String original)
```



> String对象的最大特征
>
> 引例
>
> 键盘输入接收一个字符串s，并用一个temp字符串引用指向它
>
> 现在修改原先字符串s（拼接一个字符串），比较s和temp

- 字符串是常量，它的值在创建之后不能更改，也就是说String对象不可变
  - String对象不可变指的是对象的状态不可变，而不是引用中的地址不可变
  - 原因是String中的字符串都是由字符数组装着的，而该数组是final修饰的 

> 字符串常量池
>
> Java当中所有双引号引起来的字符串都是字符串对象

- 每一个字符串字面值都作为一个对象存储在堆上的字符串常量池中
  - 字面值常量编译时期，就能确定其取值，编译时期加入常量池
  - 当后续再使用字面值创建相同内容的字符串对象时，直接将该对象返回给引用 
  - 如果使用new关键字创建相同内容字符串对象，对象不共享，但是字符数组仍然共享 

> 字符串是JVM堆内存中最多的对象，字符串不可变后，就可以共享，节省了大量的堆内存空间
>
> 不可变后还变得更安全（多线程，网络传输中可以体现）
>
> 不可变后效率提升（字符串不可变不需要频繁计算hashCode()值，所以String是Map中最常见的key）



> 小试牛刀

- 看程序说结果

  - 
    
    ```Java
    String s = "hello";
    s += "world";
    System.out.println(s);
    ```
    
    

- 下面两种赋值方式有什么区别？

  - ```Java
    String s1 = "我是猪";
    String s = new String("我是猪");
    ```
    
    
  
- 看程序说结果

  - 
    
    ```java
    String s1 = new String("hello");
    String s2 = new String("hello");
    System.out.println(s1 == s2);
    System.out.println(s1.equals(s2));
    
    String s3 = new String("hello");
    String s4 = "hello";
    System.out.println(s3 == s4);
    System.out.println(s3.equals(s4));
    
    String s5 = "hello";
    String s6 = "hello";
    System.out.println(s5 == s6);
    System.out.println(s5.equals(s6));
    ```
    
    



- 看程序说结果

  - ```Java
    String s1 = "hello";
    String s2 = "world";
    String s3 = "helloworld";
    System.out.println(s3==(s1+s2));
    System.out.println(s3.equals(s1+s2));
    
    System.out.println(s3==("hello"+"world"));
    System.out.println(s3.equals("hello"+"world"));
    ```
    
    



>  使用加号对字符串进行拼接操作，会有下述两种结果
>
>  - 直接在常量池中创建新的拼接对象
>  - 在堆上创建新的拼接对象
>
>  经过测试我们发现
>
>  - 当参与字符串拼接的两个字符串中，至少有一个是以引用变量的形式出现时
>   - 必然会在堆上创建新的字符串对象
>      - 原因是变量参与了运算，无法在编译时期确定其值，就不能在编译时期加入常量池
>  - 只有参与字符串拼接运算的两个字符串，都是字符串字面值常量的时候
>   - 此时不会在堆上创建新的字符串对象，而是在常量池中直接拼接创建对象
>   - 如果已存在，则不创建新的对象

