

# 预习

## 概述

- io是什么?
  - input  输入
  - output 输出
-  java中如何实现io?
  - 通过流的方式  创建相应的输入输出流对象去实现其io功能
- io流的分类?
  - 字节流: 一连串的0 1 二进制  , 以字节为单位
  - 字符流 : 一连串的字符序列 , 以字符为单位

4个基类是什么? **重点掌握read  write方法**

- **InputStream 字节输入流**   **3个read方法**

  - | abstract  int | read()        从输入流中读取数据的下一个字节。               |
    | ------------- | ------------------------------------------------------------ |
    | int           | read(byte[] b)        从输入流中读取一定数量的字节，并将其存储在缓冲区数组 b 中。 |
    | int           | read(byte[] b,  int off, int len)       将输入流中最多 len 个数据字节读入 byte 数组。 |

- **OutputStream 字节输出流**    **3个write方法**

  - | 方法摘要       |                                                              |
    | -------------- | ------------------------------------------------------------ |
    | void           | close()        关闭此输出流并释放与此流有关的所有系统资源。  |
    | void           | flush()        刷新此输出流并强制写出所有缓冲的输出字节。    |
    | void           | write(byte[] b)        将 b.length 个字节从指定的 byte 数组写入此输出流。 |
    | void           | write(byte[] b,  int off, int len)       将指定 byte 数组中从偏移量 off 开始的  len 个字节写入此输出流。 |
    | abstract  void | write(int b)        将指定的字节写入此输出流。               |

- **Reader 字符输入流**    **3个read方法**

  - | int           | read()        读取单个字符。                                 |
    | ------------- | ------------------------------------------------------------ |
    | int           | read(char[] cbuf)        将字符读入数组。                    |
    | abstract  int | read(char[] cbuf,  int off, int len)       将字符读入数组的某一部分。 |

- **Writer 字符输出流**   **5个write方法**

  - | void           | write(char[] cbuf)        写入字符数组。                     |
    | -------------- | ------------------------------------------------------------ |
    | abstract  void | write(char[] cbuf,  int off, int len)       写入字符数组的某一部分。 |
    | void           | write(int c)        写入单个字符。                           |
    | void           | write(String str)        写入字符串。                        |
    | void           | write(String str,  int off, int len)       写入字符串的某一部分 |





## 字节输出流具体子类(掌握)

- **FileOutputStream    文件字节输出流**
- **BufferedOutputStream    字节缓冲输出流**

**重点掌握:**

1. 怎么创建字节输出流对象?
2. 怎么向文件中写数据?3个write方法 写完数据记得close

写入Demo

```java
// 创建字节输出流对象        
FileOutputStream out = new FileOutputStream("a.txt");
// write(int b) 写单个字节        
out.write(97);
// write(byte[] b) 写字节数组
out.write("hello world".getBytes());
// 关闭资源
out.close();
```





## 字节输入流具体子类(掌握)

- **FileInputStream    文件字节输入流**
- **BufferedInputStream    文件字节输入流**

**重点掌握**

1. 怎么创建字节输入流对象
2. 怎么去读取文件中的数据?3个read方法
3. 怎么循环读取?

读取Demo

```java
// 创建字节输入流对象
FileInputStream in = new FileInputStream("a.txt");
// read() 读取单个字节
int readData = in.read();
System.out.println(((char) readData));
// read(byte[] b) 读取多个字节
byte[] bytes = new byte[1024];
int readCount = in.read(bytes);
System.out.println(new String(bytes,0,readCount));
in.close();
```

循环读

```java
package com.cskaoyan.bytestream.in;

import java.io.FileInputStream;
import java.io.IOException;

/**
 * @description: 循环读取数据
 * @author: songtao@cskaoyan.onaliyun.com
 **/

public class Demo4 {
    public static void main(String[] args) throws IOException {
        // 创建输入流对象
        FileInputStream in = new FileInputStream("a.txt");
        // 循环读取
        //readWhile1(in);

        // 固定写法
        // 单个字节方式
        // readWhile2(in);

        // 多个字节方式
        byte[] bytes = new byte[1024];
        int readCount;
        while ((readCount = in.read(bytes)) != -1) {
            System.out.println(new String(bytes,0,readCount));
        }
        // close
        in.close();
    }

    private static void readWhile2(FileInputStream in) throws IOException {
        int readData;
        while ((readData = in.read()) != -1) {
            System.out.println(readData);
        }
    }

    private static void readWhile1(FileInputStream in) throws IOException {
        // 方式一
        while (true) {
            int readData = in.read();
            System.out.println(readData);
            if (readData == -1) {
                // 如果等于-1 表示读取到了文件末尾
                break;
            }
        }
    }
}

```



## 如何通过字节流实现文件复制?(重点)

思路是什么?  (源文件)磁盘→内存→磁盘(新文件)

- 先把文件从磁盘中读取到内存  用变量接收
- 把内存中的变量接收的数据  写入到磁盘(循环读写,读取一个写一个)
- 所以肯定要有输入流对象 输出流对象 并利用其read   write方法

Q:

- 文本文件可以吗?
- 图片文件可以吗?
- 视频文件可以吗?

## 字节流一些注意的点(重要)

- 怎么换行?
- 怎么追加写入?
- 怎么处理异常?

## 编解码(掌握)

什么是编码表(字符集)?

对于常见的几种编码表,几个字节代表一个汉字? 

常见的编码表

-  utf-8 
-  ISO8859-1 
-  ASCII  
-  gbk

java中如何实现编解码?

- 编码:   字符数据  →字节数据
- 解码 :   字节数据 → 字符数据

操作系统的默认字符集是什么?

- gbk

idea中默认字符集是什么?

- utf-8



## 字符输出流具体子类(掌握)

- **OutputStreamWriter  转换流**
- **FileWriter     简化流**
- **BufferedWriter   缓冲流**

**重点掌握**

- 怎么向文件中写数据?
  - 利用write方法
- 写完数据文件里就有数据了吗?
  - 尝试一下

## 字符输入流具体子类(掌握)

- **InputStreamReader   转换流**
- **FileReader    简化流**
- **BufferedReader    缓冲流**

**重点掌握**

- 怎么从文件中读数据?
  - 利用read方法



## 字符流实现文件复制(掌握)

思路:同字节流实现文件复制的步骤是一样的

Q:

- 文本文件可以吗?
- 图片文件可以吗?
- 视频文件可以吗?

## 其他流(了解)

### 操作java基本数据类型的流DataInputStream   与   DataOutputStream

Q:

- 如果用普通的字节输出流向文件中写入1个int类型的1000,会发生什么?

### 打印流PrintStream     PrintWriter

核心思想:  就是将不同的数据类型转化为相应的字符串(String中API) 

打印流的四个特点:

- 只能操作目的地
  - 换句话理解,打印流本质上只是输出流  并没有与之相对应的输入流
- 可以写入任意类型的数据
  - 本质就是把不同的数据类型转成字符串写入文件   每一种类型对应一种print方法
- 如果开启了自动刷新功能,可以自动刷新 
  - 有前提条件的  可参考jdk文档
- 可以直接操作文件



**标准输入输出流**

什么是标准输入流与标准输出流?

- System.in
- System.out

用.var看一下标准输入流与标准输出流是什么类型的?

> - System.in属于普通的字节输入流   InputStream
> - System.out属于字节打印流    PrintStream



**如何用标准输入流System.in与BufferedReader结合,模拟scanner中的nextLine()功能**

> - 首先思考scanner中的nextLine方法是读取一行数据,那么BufferedReader中正好有一个readLine方法也是读取一行数据,这正是我们需要的.
> - 创建BufferedReader对象,利用其构造方法,发现需要传入一个底层的字符输入流作为参数,然后问题来了, 所能提供的仅仅是System.in标准输入流,只是一个普通的字节输入流,这时候怎么办呢?
> - 借助转换流,转换流是字节流与字符流的桥梁,(转换流是字符流)





### 序列化反序列化流(对象流) ObjectInputStream    ObjectOutputStream

什么是序列化,反序列化?

- 序列化:将对象信息写入文件
- 反序列化:从文件中读取对象信息

如何实现序列化?反序列化?

- 序列化	
  - 需要被序列化的对象的类要实现Serializable接口   比如Student类
  - 创建序列化流对象  创建Student对象
  - writeObject方法 把Student对象写入文件
- 反序列化
  - 创建反序列化流对象
  - readObject方法读取对象信息



