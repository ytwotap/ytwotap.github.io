# File API

> 下面来学习File API的使用



> 几个属性

```java 
//与系统有关的多个路径名的分隔符 “;”
static String pathSeparator 
//与系统有关的单个路径层级的分隔符 “\”
static String separator 
```

- 已经没有什么实用意义了，了解知道即可





## 创建功能

```Java
//只负责创建文件，目录路径如果不存在，会报错而不是帮你创建
public boolean createNewFile() 

//只负责创建目录，但只能创建单层目录，如果有多级目录不存在的话，创建失败
public boolean mkdir()
    
//只负责创建目录，但可以创建多级目录，如果多级目录不存在，则帮你全部创建
public boolean mkdirs()
```

- createNewFile()只能创建文件，不能创建目录，会报错
- mkdir()和mkdirs()的区别就在于能否创建多级目录
  - 需要注意的是，它两个都不能创建文件
  - 如果File对象路径中包括文件名，它会把文件名当成目录名处理





## 删除功能

```Java
public boolean delete()
```

- 删除此抽象路径名表示的文件或目录。如果此路径名表示一个目录，则该目录必须为空才能删除







## 移动且重命名文件功能

```Java
public boolean renameTo(File dest)
```

- 当源文件和修改之后的目标文件，在同一目录的时候，效果只是重命名
- 当源文件和修改之后的目标文件，不在同一目录的时候，效果是移动且重命名
- 当源文件和修改之后的目标文件，同目录同名时，方法返回true，实际没有效果
- 真正操作文件，应该使用（IO流操作）    







## 判断功能

```Java
//判断File对象是否表示的是一个文件
public boolean isFile()
    
//判断File对象是否表示的是一个目录
public boolean isDirectory()
    
//判断File对象表示的文件或目录，是否真实存在
public boolean exists()

//判断File对象表示的文件，是否可读
public boolean canRead()

//判断File对象表示的文件，是否可写
public boolean canWrite()

//判断File对象表示的文件是否是隐藏文件
public boolean isHidden()
```





## 获取功能

```Java
//获取File对象表示的抽象文件的绝对路径
public File getAbsolutePath()

//获取File对象表示的抽象路径名的字符串，简单来说，创建的时候给的是什么就输出什么
public String getPath()

//获取File对象表示的文件或者目录的文件名
public String getName()
    
//返回由此抽象路径名表示的文件的所占硬盘空间大小，以字节为单位
//但是需要注意的是，这个方法只能获取文件的大小，不能获取目录大小
public long length()

//返回此File对象表示的文件的最后一次修改的时间
public long lastModified()
```





## 高级获取功能

```Java
//返回一个字符串数组，这些字符串包括，此抽象的路径名表示的目录中的所有文件和文件夹的名字
//如果File对象表示的是一个文件，则返回null
//只能获取当前目录的下一层，并不是获取所有层级
//如果是一个空目录，返回一个长度为0的数组，而不是null
public String[] list() 
    
    
//返回指定File目录下的文件和文件夹的绝对路径形式的File对象数组
//如果File对象表示的是一个文件，则返回null
//只能获取当前目录的下一层，并不是获取所有层级
//如果是一个空目录，返回一个长度为0的数组，而不是null
public File[] listFiles()
```





## 自定义获取功能

```java 
//获取这个文件夹下，满足filter过滤器的条件的文件
File[] listFiles(FileFilter filter) 
```

- 自定义获取功能是在高级获取功能的基础上，加了一个过滤器，所以高级功能的特点它都有

- FileFilter是一个接口，它只有下面一个方法

  - ```Java
    //测试指定抽象路径名是否应该包含在某个路径名列表中
    boolean accept(File pathname)
    ```

  - 这个方法相当于把高级功能中listFiles()获取的File数组中File对象遍历一遍，然后逐个判断

  - 符合条件的留下，不符合条件的干掉（丢弃）- 

- 常用匿名内部类来做实现

```Java
//留下所有txt文件
public class FileTest2 {
    public static void main(String[] args) {
        File file = new File("E:\\temp");
        //匿名内部类创建一个过滤器
        FileFilter fileFilter = new FileFilter() {
            @Override
            public boolean accept(File dir) {
                //条件是 dir对象是一个文件并且它的名字以txt结尾
                return dir.isFile() && dir.getName().endsWith("txt");
            }
        };
        //在有过滤器的情况下创建一个File[]数组，并且遍历
        File[] files = file.listFiles(fileFilter);
        for(File f : files){
            System.out.println(f);
        }
    }
```

- 补充Arrays.sort(files, new Comparator<File>())方法
  - 带比较器的File数组排序方法



> 递归删除目录的思路

- 获取目录的下的所有File对象（包括文件和文件夹）
- 判断，如果是一个空目录或者file对象不是一个目录而是文件
  - 直接删除
- 程序执行到这里，那么一定是一个目录，且不是空目录
  - 遍历获取的file数组
  - 如果这个file对象仍然是一个目录，递归删除该目录
  - 如果这个file对象是文件，直接删除
- 最后不要忘记删除已经是空目录的当前目录

