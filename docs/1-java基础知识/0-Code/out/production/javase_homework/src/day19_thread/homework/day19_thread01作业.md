# day19_thread01

**1.使用多线程实现方式一 ,多个文件一起复制功能，并在控制台显示复制的进度，进度以百分比表示。**

例如：把文件A复制到E盘某文件夹下，在控制台上显示“XXX文件已复制xx%”，“XXX文件已复制xxx%”……“XXX文件已复制xxx%”，“XXX复制完成！”

```java
package src.day19_thread.homework;

import java.io.*;
import java.text.NumberFormat;

/**
 * 类<code>Doc</code>用于：TODO
 * **1.使用多线程实现方式一 ,多个文件一起复制功能，并在控制台显示复制的进度，进度以百分比表示。**
 * <p>
 * 例如：把文件A复制到E盘某文件夹下，在控制台上显示“XXX文件已复制xx%”，“XXX文件已复制xxx%”……“XXX文件已复制xxx%”，“XXX复制完成！”
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-30
 */
public class Demo1 {
    public static void main(String[] args) {
        //new thread:  2 thread  invoke copyfile class
        //new file
        //copy
        //sout  scheule
        Thread thread1 = new Thread(new CopyFile("readline.txt", "E:\\test\\oneFile\\this\\readline_copy.txt"));
        Thread thread2 = new Thread(new CopyFile("original_file.txt", "E:\\test\\oneFile\\this\\original_file_copy.txt"));
        thread1.start();
        thread2.start();
    }

}

//implement runable interface
class CopyFile implements Runnable {
    //filds
    String oldFilePath;
    String newFilePath;

    //get path
    public CopyFile(String oldFilePath, String newFilePath) {
        this.oldFilePath = oldFilePath;
        this.newFilePath = newFilePath;
    }

    @Override
    public void run() {
        //new read and write object
        File oldFile = new File(oldFilePath);
        //get file length double .
        double length = oldFile.length();
        long copyLength = 0;
        double schedule=0;
        NumberFormat numberFormat = NumberFormat.getPercentInstance();
        numberFormat.setMinimumFractionDigits(2);
        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;
        //copy file
        try {
            fileInputStream = new FileInputStream(oldFile);
            fileOutputStream = new FileOutputStream(newFilePath);
            byte[] bytes = new byte[1024];
            int readnumber;
            //read and write
            while ((readnumber = fileInputStream.read(bytes)) != -1) {
                fileOutputStream.write(bytes);
                //display schedule and format data
                copyLength=copyLength+readnumber;
                schedule = copyLength/ length;
                NumberFormat nf = NumberFormat.getPercentInstance();
                System.out.println(oldFilePath + "文件已复制:" + numberFormat.format(schedule));
            }
            //display schedule ok
            System.out.println(oldFilePath+"复制完成");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
                if (fileOutputStream != null) {
                    fileOutputStream.close();
                }
                //close
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

![image-20210630160343516](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210630160343516.png)



**2.现在有T1、T2、T3三个线程，你怎样保证T2在T1执行完后执行，T3在T2执行完后执行？**

利用线程控制API

```java
package src.day19_thread.homework;

/**
 * 类<code>Doc</code>用于：TODO
 *2.现在有T1、T2、T3三个线程，你怎样保证T2在T1执行完后执行，T3在T2执行完后执行？
 *
 * 利用线程控制API
 * @author 12824
 * @version 1.0
 * @date 2021-06-30
 */
public class Demo2 {
    public static void main(String[] args) throws InterruptedException {
        SayName t1 = new SayName("T1");
        SayName t2 = new SayName("T2");
        SayName t3 = new SayName("T3");
        t1.start();
        //Waits for this thread to die.
        t1.join();
        t2.start();
        t2.join();
        t3.start();

    }
}
//实现线程 class
class SayName extends Thread{
    //name
    String name;
    SayName(String name){
        this.name=name;
    }
    @Override
    public void run() {
        for (int i=0; i<10; i++) {
            System.out.println("this is "+this.name+"--------"+this.getState());
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```



![image-20210630161230174](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210630161230174.png)



**3.破解密码(选做)**

要求: 从0-9这10个数中

- 生成一个长度是3的随机数字，把这个字符串当作密码
- 创建一个破解线程，使用穷举法，匹配这个密码,直到匹配到正确的
- 创建一个日志线程，将用过的字符串写入文件，这个日志线程设计为守护线程

提示： 破解线程把穷举法生成的可能密码放在一个容器中，日志线程把这个容器中的密码并打印出来。(因为没有学集合,先用数组)
注意:  守护线程的特征,jvm中只有守护线程 jvm退出

- 穷举完了 还没写入 程序就已经终止了
- 穷举完了 写了一半 程序就终止了
- 列一个 写一个 (如果日志线程先执行) 

​                                                                                                                                                                                                                                                                                                                                                                                                                                                     

**4.继续阶段七   八**



**5.找时间看一下计算机网络的前置知识(OSI模型相关的), 放在服务器上了**

