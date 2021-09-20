# File类的使用

> 首先，在使用File之前，再明确一下File类的定义
>
> File是文件和目录（文件夹）路径名的抽象表达形式F

- File类是对文件、目录的抽象表示，**并不代表这个文件和目录就一定存在**

- 创建File类对象的时候，编译器也不会去检查这个File对应的文件和目录是否存在

- 用一个file对象调用以下方法，可判断该目录文件是否存在

  ```java 
  public boolean exists()
  ```

  

  





> File类的构造方法

```java
//创建一个File对象，该方法一般使用绝对路径来创建对象，也可以使用相对路径
File (String pathname)
    
//和第一种方式类似，只不过把一个路径劈成了两半
//普遍来说，parent路径表示一个绝对路径。child路径跟一个相对路径
File (String parent, Sting child)
    
//和第二种方式一样，只不过，子路径用一个File对象表示
File (File parent, String child)
```



