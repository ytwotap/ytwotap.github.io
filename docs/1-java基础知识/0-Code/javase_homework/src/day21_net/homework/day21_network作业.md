

# 今天的代码敲一遍



# 线程池

.创建一个任务，它将睡眠随机1-10s， 然后显示睡眠时间并退出。创建并运行一定数量的这个任务
ps:利用线程池

```java
package src.day21_net.homework;

import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 类<code>Doc</code>用于：TODO
 *.创建一个任务，它将睡眠随机1-10s， 然后显示睡眠时间并退出。创建并运行一定数量的这个任务 ps:利用线程池
 * @author 12824
 * @version 1.0
 * @date 2021-07-02
 */
public class Demo1 {
    public static void main(String[] args) {
        //new runable object
        DisplaySleepTime t1 = new DisplaySleepTime();
        DisplaySleepTime t2 = new DisplaySleepTime();
        DisplaySleepTime t3 = new DisplaySleepTime();
        DisplaySleepTime t4 = new DisplaySleepTime();

        //create excutors
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        //submit
        executorService.submit(t1);
        executorService.submit(t2);
        executorService.submit(t3);
        executorService.submit(t4);
        //shut down  close thread pool
        executorService.shutdown();
    }
}
//imp runnable interface
class  DisplaySleepTime implements Runnable{

    @Override
    public void run() {
        //randowm number
        Random random = new Random();
        int i = random.nextInt(10)+1;

        //sleep 1-10s
        try {
            Thread.sleep(i*1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //display time
        System.out.println(Thread.currentThread().getName()+"-"+"sleep time :"+i);
    }
}

```

![image-20210702194807652](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702194807652.png)



# Callable

**用Callable的方式去实现之前的多线程文件复制**

复制成功后,返回复制成功的文件路径,并利用Callable的方式接收返回值,然后把这几个路径都保存到新的文件中.

```java
package src.day21_net.homework;

import java.io.*;
import java.text.NumberFormat;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * 类<code>Doc</code>用于：TODO
 * *用Callable的方式去实现之前的多线程文件复制**
 * <p>
 * 复制成功后,返回复制成功的文件路径,并利用Callable的方式接收返回值,然后把这几个路径都保存到新的文件中.
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-30
 */
public class Demo2 {
    public static void main(String[] args) throws ExecutionException, InterruptedException, IOException {
        //new  object
        CopyFile copyFile1 = new CopyFile("readline.txt",
                "E:\\test\\readline_copy.txt");
        CopyFile copyFile2 =new CopyFile("original_file.txt",
                "E:\\tes\\original_file_copy.txt");
        //new future
        FutureTask futureTask1 = new FutureTask<>(copyFile1);
        FutureTask futureTask2 = new FutureTask<>(copyFile2);
        //new thread
        //sout  scheule
        Thread thread1 = new Thread(futureTask1);
        Thread thread2 = new Thread(futureTask2);
        //start
        thread1.start();
        thread2.start();
        //get success path
        String s1 = (String) futureTask1.get();
        String s2 = (String) futureTask2.get();
        //not null;
        if (s1 !=null||s2!=null ){
            //save a new path
            BufferedWriter writer=new BufferedWriter(new FileWriter("successPath.txt"));
            if (s1!=null){
                writer.write(s1+"\n");
            }
            if (s2!=null){
                writer.write(s2);
            }
            System.out.println("successPath.txt--路径保存成功");
            if (writer!=null){
                writer.close();
            }
        }else {
            System.out.println("路径存入失败");
        }
    }

}

//implement callable interface
class CopyFile implements Callable {
    //filds
    String oldFilePath;
    String newFilePath;

    //get path
    public CopyFile(String oldFilePath, String newFilePath) {
        this.oldFilePath = oldFilePath;
        this.newFilePath = newFilePath;
    }

    //多文件复制 并复制成功的值
    @Override
    public String call() throws Exception {
        //new read and write object
        File oldFile = new File(oldFilePath);
        //get file length double .
        double length = oldFile.length();
        long copyLength = 0;
        double schedule = 0;
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
                copyLength = copyLength + readnumber;
                schedule = copyLength / length;
                NumberFormat nf = NumberFormat.getPercentInstance();
                System.out.println(oldFilePath + "文件已复制:" + numberFormat.format(schedule));
            }
            //display schedule ok
            System.out.println(oldFilePath + "复制完成");
            return this.newFilePath;
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
      return null;
    }

}
```

![image-20210702203356443](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702203356443.png)

![image-20210702203416585](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702203416585.png)



# UDP

用UDP方式跟你同桌通信

```java
package src.day21_net.homework;

import java.awt.desktop.ScreenSleepEvent;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.Arrays;
import java.util.Scanner;

/**
 * 类<code>Doc</code>用于：TODO
 *用UDP方式跟你同桌通信
 * @author 12824
 * @version 1.0
 * @date 2021-07-02
 */
public class Demo3 {
    public static void main(String[] args) throws IOException {
        Communication communication=new Communication("192.168.8.108",5555,7777,8888);
        SendMessage sendMessage = new SendMessage(communication);
        receive receive=new receive(communication);
        sendMessage.start();
        receive.start();

    }
}
class SendMessage extends Thread{
    Communication communication;

    public SendMessage(Communication communication) {
        this.communication = communication;
    }

    @Override
    public void run() {
        try {
            communication.send();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
class receive extends Thread{
    Communication communication;

    public receive(Communication communication) {
        this.communication=communication;
    }

    @Override
    public void run() {
        try {
            communication.receive();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
class Communication {
    DatagramSocket datagramSocket1 ;
    DatagramSocket datagramSocket2 ;

    int receivePort;
    int sendPort;

    int ipPort;
    String IP;
    InetAddress byAddress;
    BufferedReader bufferedReader;
    public Communication( String IP,int sendPort,int ipPort,int receivePort) throws UnknownHostException {
        this.receivePort=receivePort;
        this.sendPort=sendPort;
        this.IP = IP;
        this.ipPort=ipPort;
        byAddress=InetAddress.getByName(IP);
    }
    //sent
    public void send() throws IOException {
        datagramSocket1=new DatagramSocket(this.sendPort);
        //get data
        bufferedReader=new BufferedReader(new InputStreamReader(System.in));
        //get String
        while (true){
            //get string
            String getData= null;
            try {
                getData = bufferedReader.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            //exit
            if(getData.equals("exit")){
                //close
                bufferedReader.close();
                datagramSocket1.close();
                System.out.println("发送端退出");
                break;
            }
            //send;
            byte[] bytes = getData.getBytes();

            DatagramPacket datagramPacket = new DatagramPacket(bytes,
                    bytes.length, byAddress, ipPort);
            datagramSocket1.send(datagramPacket);
        }
    }
    //receive
    public void receive() throws IOException {
        /*receive */
        datagramSocket2=new DatagramSocket(receivePort);
        while (true) {
            byte[] bytes = new byte[1024];
            //create packet
            DatagramPacket datagramPacketRe = new DatagramPacket(bytes,bytes.length);
            datagramSocket2.receive(datagramPacketRe);
            String getData=new String(datagramPacketRe.getData(),0,datagramPacketRe.getLength());
            //exit
            if(getData.equals("exit")){
                //close
                bufferedReader.close();
                datagramSocket2.close();
                System.out.println("接收端退出");
                break;
            }
            //not exit , sout
            System.out.println("接收到--"+datagramPacketRe.getAddress()+":"+datagramPacketRe.getPort()+" 消息 ："+getData);
        }
    }
}
```

![image-20210702220111577](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702220111577.png)

# TCP

PPT上的练习

- 客户端键盘录入，服务器保存到文本文件中
- 客户端上传文本文件，服务器把内容输出到控制台
- 客户端上传文本文件，服务器保存文本文件



```java
package src.day21_net.homework.Demo4;

import java.awt.*;
import java.io.*;
import java.net.Socket;
import java.util.Scanner;

/**
 * - 客户端键盘录入，服务器保存到文本文件中
 *  * - 客户端上传文本文件，服务器把内容输出到控制台
 *  * - 客户端上传文本文件，服务器保存文本文件
 * @description:
 * @author: songtao@cskaoyan.onaliyun.com
 **/

public class Client {
    public static void main(String[] args) throws IOException {
        //键盘循环输入
        BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(System.in));
        StringBuilder text= null;
        String readLine;
        while (true){
            System.out.println("请输入你想输入的类容, exit 推出");
            //读取
            readLine = bufferedReader.readLine();
            if(readLine.equals("exit")){
                System.out.println("退出输入");
                bufferedReader.close();
                break;
            }
            readLine=readLine+"\n";
            //合并
            if (text==null){
                text = new StringBuilder(readLine);
            }
            text.append(readLine);
        }
        // 创建客户端的socket对象
        Socket socket = new Socket("127.0.0.1", 8888);
        // 获取输出流对象
        OutputStream out = socket.getOutputStream();
        // 边读取边写
        byte[] bytes = text.toString().getBytes();
        out.write(bytes);
        System.out.println("upload done");
        // 结束标记
        socket.shutdownOutput();
        // 接收来自服务端的反馈
        // 获取输入流
        InputStream inputStream = socket.getInputStream();
        byte[] bytes1 = new byte[1024];
        // 读取服务端反馈
        int readCount2 = inputStream.read(bytes1);
        System.out.println(new String(bytes1,0,readCount2));
        // close
        socket.close();
    }
}
```

```java
package src.day21_net.homework.Demo4;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @description: 服务端
 * @author: songtao@cskaoyan.onaliyun.com
 **/

public class Server {
    public static void main(String[] args) throws IOException {
        // 创建自己的输出流对象
        FileOutputStream out = new FileOutputStream("storage.txt");
        // 创建服务端socket对象
        ServerSocket serverSocket = new ServerSocket(8888);
        // accept方法
        Socket client = serverSocket.accept();
        // 获取输入流
        InputStream in = client.getInputStream();
        // 边读边写
        byte[] bytes = new byte[1024];
        int readCount;
        while ((readCount = in.read(bytes)) != -1) {
            out.write(bytes,0,readCount);
        }
        out.close();
        System.out.println("上传成功");
        // 给客户端一个反馈消息
        // 获取输出流
        OutputStream outputStream = client.getOutputStream();
        outputStream.write("successful!".getBytes());

    }
}
```

![image-20210702223414814](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702223414814.png)

![image-20210702223445662](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702223445662.png)

![image-20210702223459380](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210702223459380.png)
