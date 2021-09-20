# day20_thread02

**1.今天的上课的代码敲一遍**



**2.用多线程实现方式二去修改昨天的多线程文件复制(如果昨天用的方式一 今天用方式二  昨天用方式二 今天用方式一)**

```java
package src.day20_thread2.homework;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.NumberFormat;

/**
 * 类<code>Doc</code>用于：TODO
 *2.用多线程实现方式二去修改昨天的多线程文件复制(如果昨天用的方式一 今天用方式二 昨天用方式二 今天用方式一)
 *
 *  * **1.使用多线程实现方式一 ,多个文件一起复制功能，并在控制台显示复制的进度，进度以百分比表示。**
 *  * <p>
 *  * 例如：把文件A复制到E盘某文件夹下，在控制台上显示“XXX文件已复制xx%”，“XXX文件已复制xxx%”……“XXX文件已复制xxx%”，“XXX复制完成！”
 *
 *  使用方式1 ， 即 extend thread class
 * @author 12824
 * @version 1.0
 * @date 2021-07-01
 */
public class Demo2 {
    public static void main(String[] args) {
        //new thread:  2 thread  invoke copyfile class
        CopyFile copyFile = new CopyFile("readline.txt",
                "E:\\test\\oneFile\\this\\readline_copy.txt");
        CopyFile copyFile1 = new CopyFile("original_file.txt",
                "E:\\test\\oneFile\\this\\original_file_copy.txt");
        //new file
        //copy
        //sout  scheule
        copyFile.start();
        copyFile1.start();

    }
}

//extend Thread 实现 多线程；
class CopyFile extends Thread {
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

![image-20210701201053246](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210701201053246.png)

**3.用多线程代码来模拟，迅雷用3个线程下载100M资源的的过程**。

 每个线程每次，一次下载1兆(M)资源，直到下载完毕，即剩余的待下载资源大小为0

 (用一个整数表示资源大小，每次个线程每次下载多少兆(M), 剩余待下载资源就减少多少兆(M)，

  模拟我们售票的代码实现，考虑多线程的数据安全问题)

```java
package src.day20_thread2.homework.Demo3;

/**
 * 类<code>Doc</code>用于：TODO
 *3.用多线程代码来模拟，迅雷用3个线程下载100M资源的的过程。
 *
 * 每个线程每次，一次下载1兆(M)资源，直到下载完毕，即剩余的待下载资源大小为0
 *
 * (用一个整数表示资源大小，每次个线程每次下载多少兆(M), 剩余待下载资源就减少多少兆(M)，
 *
 * 模拟我们售票的代码实现，考虑多线程的数据安全问题)
 *
 *
 * @author 12824
 * @version 1.0
 * @date 2021-07-01
 */
public class Demo3 {
    public static void main(String[] args) {
        DownloadThread downloadThread = new DownloadThread();
        Thread thread1 = new Thread(downloadThread);
        Thread thread2 = new Thread(downloadThread);
        Thread thread3 = new Thread(downloadThread);
        thread1.start();
        thread2.start();
        thread3.start();

    }
}
/*
think:
        *  3 thread 100m
        *  1m/c
        *  class resource
 *   int 100
         *   dowload(){
         *   lock{
         *       100--;
         *   }
         *   }*/
class DownloadThread implements Runnable{
    Integer downloadResources=100;
    @Override
    public void run() {
        //while print down load m.
        synchronized (DownloadThread.class) {
            while (true){
                if(downloadResources>0) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName()
                            + "---" + "当前现在剩余:" + --downloadResources + "M");
                }else{
                    break;
                }
            }
        }
    }
}
```

![image-20210701202426915](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210701202426915.png)

4. **启动2个线程 打印100个数** (使用wait notify)
    线程a 打印 1 3 5 7 9 ...奇数
    线程b 打印 2 4 6 8 10 ...偶数
    分析：线程a打印的是奇数 线程b打印的是偶数

    ```java
    package src.day20_thread2.homework.Demo4;
    
    /**
     * 类<code>Doc</code>用于：TODO
     *启动2个线程 打印100个数 (使用wait notify)
     *  线程a 打印 1 3 5 7 9 ...奇数
     *  线程b 打印 2 4 6 8 10 ...偶数
     *  分析：线程a打印的是奇数 线程b打印的是偶数
     *
     *  thinK:
     *      class number
     *          int 100
     *          sout number
     *      class PrintNumberOddClass
     *          number
     *          run(){
     *              syn(number){
     *                 if(number%2==1){
     *                     number.print
     *                     number.wait()
     *
     *                 }else{
     *
     *                     number.notify();
     *
     *                 }
     *              }
     *          }
     *      class PrintNumberEvenClass
     *
     * @author 12824
     * @version 1.0
     * @date 2021-07-01
     */
    public class Demo4 {
        public static void main(String[] args) {
            Number number = new Number();
            PrintEvenNumber printEvenNumber = new PrintEvenNumber(number);
            PrintOddNumber printOddNumber = new PrintOddNumber(number);
            printEvenNumber.setName("线程b");
            printOddNumber.setName("线程a");
    
            printEvenNumber.start();
            printOddNumber.start();
    
        }
    }
    
    ```

    ```java
    package src.day20_thread2.homework.Demo4;
    
    /**
     * number class
     *
     */
    public class Number{
        Integer number=1;
    
        public Integer printNumber(){
            return this.number++;
        }
    
    }
    ```

    ```java
    package src.day20_thread2.homework.Demo4;
    
    /**
     * 类<code>Doc</code>用于：TODO
     * 打印偶数
     *
     * @author 12824
     * @version 1.0
     * @date 2021-07-01
     */
    public class PrintEvenNumber extends Thread {
        Number n;
    
        public PrintEvenNumber(Number number) {
            this.n = number;
        }
    
        @Override
        public void run() {
            while (true) {
    
                synchronized (n) {
                    if (n.number <= 100) {
                        if (n.number % 2 == 0) {
                            System.out.println(Thread.currentThread().getName()
                                    + " 打印：" + n.printNumber());
                            n.notify();
                        } else {
                            try {
                                n.wait();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }
    ```

    ```java
    package src.day20_thread2.homework.Demo4;
    
    /**
     * 类<code>Doc</code>用于：TODO
     * 打印奇数
     *
     * @author 12824
     * @version 1.0
     * @date 2021-07-01
     */
    public class PrintOddNumber extends Thread {
        Number n;
    
        public PrintOddNumber(Number number) {
            this.n = number;
        }
    
        @Override
        public void run() {
            while (true) {
                synchronized (n) {
                    if (n.number <= 100) {
                        if (n.number % 2 == 1) {
                            System.out.println(Thread.currentThread().getName()
                                    + " 打印：" + n.printNumber());
                            n.notify();
                        } else {
    
                            try {
                                n.wait();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }
    ```

![image-20210701212902422](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210701212902422.png)

**5.启动3个线程打印递增的数字使用wait notify (选做)**

 线程1先打印1,2,3,4,5, 然后是线程2打印6,7,8,9,10, 然后是线程3打印11,12,13,14,15. 接着再由线程1打印16,17,18,19,20....以此类推, 直到打印到75



6.计算机网络的视频 没看完的要看完 明天要讲网络编程
