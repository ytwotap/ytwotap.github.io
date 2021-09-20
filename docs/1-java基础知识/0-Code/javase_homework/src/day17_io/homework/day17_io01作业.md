# 字节流

1.利用字节流去复制文本文件  图片文件  视频文件 (2种方式 单字节  多字节) 体会一下效率上的差别



```java
package src.day17_io.homework;

import src.stage3.Start;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Time;

/**
 * 类<code>Doc</code>用于：TODO
 *1.利用字节流去复制文本文件 图片文件 视频文件 (2种方式 单字节 多字节) 体会一下效率上的差别
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo1 {
    public static void main(String[] args) throws IOException {
        //txt
        System.out.println("-----------------txt------------------");
       copy1("a.txt","a_copy.txt");
       copy2("a.txt","a2_copy.txt");
        //jpg
        System.out.println("-----------------jpg------------------");
        copy1("test.jpg", "test_copy.jpg");
        copy2("test.jpg", "test2_copy.jpg");
        //video
        System.out.println("-----------------video------------------");
        copy1("过去的村庄回来了.ev4", "过去的村庄回来了_copy.ev4");
        copy2("过去的村庄回来了.ev4", "过去的村庄回来了2_copy.ev4");
    }
    //单字节
    public static void copy1 (String copyFileName,String newCreateName) throws IOException {
        //new 对象
        FileInputStream in=new FileInputStream(copyFileName);
        FileOutputStream out=new FileOutputStream(newCreateName);
        //start time
        long strartTime = System.currentTimeMillis();
        //copy
        int getByte;
        while ((getByte=in.read())!=-1){
            //write
            out.write(getByte);
        }
        //end time
        long endTime=System.currentTimeMillis();
        //time difference
        System.out.println("this time :"+(endTime- strartTime)+"ms");
        //close
        out.close();
        in.close();
    }

    //    多字节
    public static void copy2 (String copyFileName,String newCreateName) throws IOException {
        //new 对象
        FileInputStream in=new FileInputStream(copyFileName);
        FileOutputStream out=new FileOutputStream(newCreateName);
        //start time
        long strartTime = System.currentTimeMillis();
        //copy
        byte[] bytes=new byte[1024];
        int count;
        while ((count=in.read(bytes))!=-1){
            //write
            out.write(bytes,0,count);
        }
        //end time
        long endTime=System.currentTimeMillis();
        //time difference
        System.out.println("this time :"+(endTime- strartTime)+"ms");
        //close
        out.close();
        in.close();
    }
}
```

![image-20210628223306262](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210628223306.png)

2.读取一个文件，这个文件中有随机的一些数字字符，统计这些数字有几个偶数，几个奇数，并且追加写入到该文件末尾。
例如：
a.txt文件：	3241256364789629090126581212515
	奇数：xx个
	偶数：xx个

```java
package src.day17_io.homework;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 *2.读取一个文件，这个文件中有随机的一些数字字符，统计这些数字有几个偶数，几个奇数，并且追加写入到该文件末尾。
 *  例如： a.txt文件： 3241256364789629090126581212515 奇数：xx个 偶数：xx个
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo2 {
    public static void main(String[] args) throws IOException {
        checkNumber("b.txt");
    }
    //单字节
    public static void checkNumber (String FileName) throws IOException {
        int l=0; //奇数
        int n=0;//偶数
        //new 对象
        FileInputStream in=new FileInputStream(FileName);
        //read number
        int getByte;
        while ((getByte=in.read())!=-1){
            // 计算数量
            //判断性质
            int i=judge(getByte);
            //统计数量
            if(i==1){
                l++;
            }else{
                n++;
            }
            //输出
        }
        System.out.println("奇数："+l);
        System.out.println("偶数："+n);
        //close;
        in.close();
    }

    /**
     * 判断奇偶性
     * @return
     */
    public static int judge(int number){

        //判断数量大小
        if(number%2==1){
            //奇函数
            return 1;
        }
        //偶数
        return 2;
    }
}
```

![image-20210628223404713](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628223404713.png)

----

3.在一个磁盘的文件里保存26个英文小写字母（乱序），将他们读入内存中，进行排序，把排好顺序的数再重新追加写到磁盘的该文件中。

```java
package src.day17_io.homework;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 * 3.在一个磁盘的文件里保存26个英文小写字母（乱序），将他们读入内存中，进行排序，
 * 把排好顺序的数再重新追加写到磁盘的该文件中。
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo3 {
    public static void main(String[] args) throws IOException {
        sort();
    }

    public static void sort() throws IOException {
        //new in and out 文件 。
        FileInputStream in = new FileInputStream("c.txt");
        FileOutputStream out = new FileOutputStream("c_new.txt");
        //读取文件
        byte[] bytes = new byte[26];
        int i = in.read(bytes);
        if (i != 26) {
            System.out.println("error");
        }
        //冒泡排序
        bytes = rank(bytes);
        //输出
        out.write(bytes);
        //close
        out.close();
        in.close();
    }

    /*排序*/
    public static byte[] rank(byte[] bytes) {
        int len = bytes.length;
        for (int i = 0; i < len - 1; i++) {
            for (int j = 0; j < len - 1 - i; j++) {
                if (bytes[j] > bytes[j + 1]) {        // 相邻元素两两对比
                    byte temp = bytes[j + 1];        // 元素交换
                    bytes[j + 1] = bytes[j];
                    bytes[j] = temp;
                }
            }
        }
        return bytes;
    }
}
```



c.txt

![image-20210628224003722](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210628224003.png)

c_copy.txt

![image-20210628223536667](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210628223536.png)



4.递归查找指定目录中(包括子目录中)，所有的.java文件，
并且，把所有这些找到的java文件，复制(是复制不是移动)到一个指定的目录下

```java
package src.day17_io.homework;

import org.junit.Test;

import java.io.*;
import java.util.logging.Filter;

/**
 * 类<code>Doc</code>用于：TODO
 * 4.递归查找指定目录中(包括子目录中)，所有的.java文件，
 * 并且，把所有这些找到的java文件，复制(是复制不是移动)到一个指定的目录下
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo4 {
    public static void main(String[] args) {
        Operator operator=new Operator();
        File file =new File("F:\\firstLevel");
        //find all .java file
        operator.getListFile(file);
        int i=0;
        //遍历
        for (File f:Operator.files){
            //judge is null or <count
            if(f!=null){
                //judge is sucess?
                if (!operator.copyToPath(f, "F:\\firstLevel_copy"))
                {
                    System.out.println("copy is false  "+f.getName());
                }
            }
        }
        System.out.println("copy is end ! ");
    }

}
class Operator {
    //存放find .java path
    static File[] files = new File[100];
    static int count = 0;

    /**
     * find file dir
     */
    public void getListFile(File file) {
        /*传入文件目录得到里面的list file 列表*/
        File[] s = file.listFiles();
        //遍历
        for (int i = 0; s.length > i; i++) {
            //ｉｓ　ｄｉｒ？　
            if (s[i].isDirectory()) {
                //递归
                getListFile(s[i]);
                //not dir
            } else {
                //judge file
                File fileAnswer = Filter(s[i]);
                if (fileAnswer != null) {
                    files[count] = fileAnswer;
                    count++;
                }
            }
        }
    }

    /**
     * choose .java file
     *
     * @param file file path
     * @return .java's file array path.
     */
    public File Filter(File file) {
        //test is .java end  file?
        if (file.getName().endsWith(".java")) {
            return file;
        }
        return null;
    }

    /**
     * copy file to new address
     *
     * @param file     copy file object
     * @param copyPath Specify the path name
     * @return boolean true is ok .
     */
    public boolean copyToPath(File file, String copyPath) {
        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream=null;
        try {
            //now object
            fileInputStream = new FileInputStream(file);
            //get file name
            String copy=copyPath +"\\"+file.getName();

            fileOutputStream = new FileOutputStream(copy);
            //read file
            byte[] bytes = new byte[1024];
            int number;
            //while all bytys[]
            while ((number = fileInputStream.read(bytes)) != -1) {
                //write to new path
                fileOutputStream.write(bytes);
            }
            return true;
        } catch (IOException e) {
            return false;
        } finally {
            //close
            try {
                if (fileInputStream!=null){
                    fileInputStream.close();
                }
                if (fileOutputStream!=null){
                    fileOutputStream.close();
                }
            } catch (IOException e) {
                System.out.println("close error");
                e.printStackTrace();
            }
        }
    }
//    /**
//     * 更改 path为正确的绝对路径
//     * @param  path 错误的路径
//     * return String 更改的斜杠
//     */
//    public String getRightPath(String path ){
//        return path.replace("/","\\");
//    }

}
```

F:\firstLevel_copy：

![image-20210628223658205](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628223658205.png)

# 字符流

有能力的同学可以先看一下BufferedReader中的readLine方法   可以尝试开始做一下阶段7