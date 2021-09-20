# HTTP作业

大家作业导出成pdf格式提交吧。提交作业的格式和方式和之前相同。



1.自己动手抓包，用自己的语言分析当访问http://www.cskaoyan.com时，整个请求处理过程

1. 输入UR发起http请求

   ```
   Request URL: http://www.cskaoyan.com/forum.php
   ```

2. 浏览器通过dns首先查询ip地址

   1. 查询本地dns缓存,有,返回.
   2. 递归查询本地dns解析器,有,返回.
   3. 迭代查询远程dns服务器,得到ip地址,返回.

3. dns得到ip地址后,通过http访问ip地址对应的主机

   1. http协议请求被分段,之后被tcp协议包装成tcp请求.
   2. tcp请求在经过ip协议包装,之后通过数据链路层和物理层,找到对应的ip主机.
   3. 通过解封成tcp协议,来完成3次握手,传输tcp数据,4次握手断开连接.实现http的传输.

4. server 通过webserver 服务器监听的端口接受http请求.

5. 找到主机的forum.php通过http response 响应

6. cilent得到response.从响应体中得到html文件

   ```
   Status Code: 200 OK
   ```

7. 接着循环上面的1-6的方法,根据html代码解析,访问了js 图片等信息,具体文件如下:

   ```
   Scriptmd5.js?dg5	Image124630dfe06gfbddfxf8g0.png	Image124659mfxzgeh4ivhiuxui.png	Imagecollapsed_no.gif	Imageforum.gif	Scripthome.php?mod=misc&ac=sendmail&rand=1628862998	Imagebackground.png	Imagesearch.png	Imagemenu_bg.gif	Imagept_item.png	Imagechart.png	Imagescrolltop.png	Scripthm.js?5f3c4e32676aacc710ede84276010d9b	Scriptpush.js	Documentextn-utils.html	Images.gif?l=http://www.cskaoyan.com/forum.php	Imagehm.gif?hca=4CE72E3F712A0A56&cc=1&ck=1&cl=24-bit&ds…=1532&u=http%3A%2F%2Fwww.cskaoyan.com%2Fforum.php	Imagehm.gif?cc=1&ck=1&cl=24-bit&ds=1536x864&vl=636&et=0…9%E6%BB%B4%E6%BB%B4!%20-%20Powered%20by%20Discuz!	Scriptextn-utils.js	Otherfavicon.ico
   ```

8. 最后完成了页面请求完整过程.



2.课堂上面的服务器案例，可以思考一下如何来完成，参考一下上午在获取学生性别时使用的方式，如果我还希望获取请求报文的其他部分，比如请求方法、请求头等，如何操作比较合适（不做统一要求）

​	对字符串进行分析.

- 换行符风格
- 空格风格各个部分

```java
package main;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 类<code>Doc</code>用于：TODO
 * 分析报文
 * 字符串进行分析.
 * - 换行符风格
 * - 空格风格各个部分
 *
 * @author 12824
 * @version 1.0
 * @date 2021-08-13
 */
public class Server5 {
    public static void main(String[] args) {

        /*监听端口*/
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(8090);
        } catch (IOException e) {
            e.printStackTrace();
        }

        ServerSocket finalServerSocket = serverSocket;
        /*多线程解决*/

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    while (true) {
                        /*获取请求*/
                        Socket accept = finalServerSocket.accept();
                        /*获取请求的文本类型*/
                        /**/
                        InputStream inputStream = accept.getInputStream();
                        /*读取输入流*/
                        byte[] bytes = new byte[1024];
                        //阻塞步骤, 新客户端连接就是阻塞队列
                        int read = inputStream.read(bytes);
                        final String s = new String(bytes, 0, read);
                        /*分隔*/
                        final String[] strings = parsingStringLine(s);
                        /*分析请求行 */
                        //get first line
                        final String[] requestLine = parsingStringSpace(strings[0]);
                        /*get request line */
                        System.out.println(Arrays.toString(requestLine));
                        System.out.println("------------------end------------------");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }

    /**
     * 分隔字符串
     * 换行
     *
     * @param s
     * @return 分隔后的字符数组
     */
    public static String[] parsingStringLine(String s) {
        String lines[] = s.split("\\r?\\n"); //分隔行
        return lines;
    }

    /**
     * 按空格分隔字符串 数组按空格
     *
     * @param s
     * @return 分隔后的 List
     */
    public static List<String[]> parsingStringSpace(String s[]) {
        List<String[]> lists = new ArrayList<>();   //存放分隔后的字符串
        for (String ss : s) { //foreach s[]
            String[] ines = ss.split("\\s+"); //分隔
            lists.add(ines); //赋值
        }
        return lists; //返回
    }

    /**
     * 分隔空格
     *
     * @param s 字符串
     * @return
     */
    public static String[] parsingStringSpace(String s) {
        String[] ines = s.split("\\s+"); //分隔
        return ines; //返回
    }
}

```

3.针对课堂上面的网络编程、IO部分的课程，如果感觉很生疏，可以利用晚上和周末的时间及时进行巩固复习

