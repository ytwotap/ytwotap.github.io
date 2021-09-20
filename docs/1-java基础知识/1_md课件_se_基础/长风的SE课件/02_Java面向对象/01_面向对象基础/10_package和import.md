# package和import关键字

> package和import两个关键字涉及到了一个Java文件中的包的操作

## package

> 作用？

- 在Java源文件的**第一行**，使用package关键字声明

  - 声明该Java源文件中，所定义的所有类，都属于同一个包
    - 一个Java源文件，只能有一个public修饰的类
    - **一个Java文件下，所有的类（包括public修饰和非public修饰），它们之间是同包的关系**
  - package关键字后，跟上当前类的包名，表示所处的包

- 语法

  - ```java
    package 包名;
    ```

- 注意

  - 包名的书写，用逗号隔开
  - 语法上，该声明语句一定位于一个Java源文件的有效代码的第一行，否则会报错
    - 注释不算有效代码，你可以把package声明放在注释下面
    - 但是根据规范，不要这么做
    - 应该将package永远放在Java源文件真正意义的第一行











## 全限定类名

> 什么时全限定类名？

- 可以**唯一确定一个类**的，由包名加上类名组成的字符串
- 不做任何操作的情况下，直接输出一个类的对象，会打印全限定类名
- 例如：com.cskaoyan.oop.statickeyword.Star









## import

> 引例

- 在包名为onepackage的包中创建一个Student类
- 在包名为anotherpackage的包中创建一个同名Student类
- 在onepackage包下，写一个测试类Test
- 在测试类Test中，创建anotherpackage包中Student类的对象



> 显然编译器会默认优先搜索同包下的，Student类，然后去创建它的对象
>
> 为了让编译器，去获取到不同包下的，Student类，必须由程序员显式的告诉编译器怎么去找到这个类
>
> 有两种解决方法

- 在创建类的对象的语句中，不使用简单的类名，而是使用全限定类名

  - 不可能真的这么做，因为全限定类名太长了

- 使用import关键字，声明要使用的类

  - 语法

    - ```Java
      import 全限定类名;
      ```

  - 语法上import关键字应该放在，package声明语句和类声明语句之间

    - 和package关键字一样，import声明应该永远紧跟在package声明之后（规范）

    - import声明提供了一种包的智能导入方式，语法为

      - ```Java
        import <包名>.*;
        ```

      - 包中的类将根据需要导入，避免使用多条import声明
    
      - 需要注意的是，如果本包中已存在同名类，就判定为不需要导包，.*就不会自动导包

  - Java语言核心包java.lang包中的类将被隐式导入，可以直接使用其中的类
  
    - ```java 
    import java.lang.*;
      ```
  
    - 我们使用的String、Integer、System都属于这个包
  
- 静态导入

  - 语法

    - ```java 
      import static 全限定类名.*;
      import static 全限定类名.静态成员;
      ```
    
  - 可以用来导入静态方法和静态成员变量

  - 以往我们调用不同包的静态成员，通过类名.成员名访问，如果静态导入，可以省略类名

  - 例如

    - ```Java
      import static java.lang.System.*;
      ```

    - 可以这样写输出语句

      ```java
      out.println("Hello World!");
      ```

    - ```java 
      import static java.lang.Math.*;
      ```

    - 可以这样使用

      ```Java
      double pi = PI;
      double result = pow(2,3);
      ```

- 实践开发中，static导入很少使用，了解认识即可







> 如果不同包下两个同名类，我都想使用咋办？

- 真的存在这种需求，建议改名一个
- 一个用全限定类名去使用

