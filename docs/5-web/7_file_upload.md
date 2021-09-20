# 文件上传

**model:**

![5.17. File Upload — TERASOLUNA Server Framework for Java (5.x) Development  Guideline 5.0.0-SNAPSHOT documentation](7_%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.assets/file-upload-overview_basicflow-16293774536716.png)

**应用:**

微信头像

更换头像 本地选择一个头像--------头像更换（就是将本地的图片上传到服务器上面去）

微信的头像：如果是好友更换头像，你可以及时的发现

如果是群里面非好友更换了头像，那么没法及时发现的（群里面的非好友头像，如果你没有点击他的信息查看，那么显示的一直是更入群时那个头像）

微信在处理群内成员信息时，对于好友----及时去更新的；对于非好友-信息不是及时更新的



国庆---头像加国旗

无法更换头像的情况，即便更换成功，依然只是自己可以看到，别人看不到，文件的来源应该是不一样的

![image-20210819114713493](7_%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.assets/image-20210819114713493.png)



## 1. 概述

 文件上传，其实就是**将客户端本地的资源文件上传到服务器上面去**，一般情况下，还需要将该文件保存在服务器的硬盘上面。

其实就是将文件的数据写入到HTTP请求报文中（请求体）（将文件数据写入到请求报文中，需要我们自己完成吗？会由浏览器来完成），HTTP请求报文传输到服务器之后，被服务器解析封装到Request对象中，只需要利用request获取请求体的方法就可以拿到上传的文件的数据。

对于**开发者**来说，你需要做的事情有如下

1.首先**需要去在html页面里面写入指定的标签，那么该标签可以用来上传文件**，浏览器会帮助你将文件的内容写入到HTTP请求报文的请求体中

2.调用servletRequest.getInputStream()这个方法拿到请求体的部分，然后对其进行处理解析即可。

一切还是围绕着HTTP报文

## 2 直接上传

### 2.准备工作

1.准备一个form表单，method根据语义应该设置为post方法

2.准备一个input type=file



点击提交按钮：

```
POST http://localhost/upload0 HTTP/1.1
Host: localhost
Connection: keep-alive
Content-Length: 28
Cache-Control: max-age=0
sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
Origin: http://localhost
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: http://localhost/upload0.html
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7
Cookie: Idea-3a79d3e5=76b7d8ce-a393-4c18-bdfb-65e6867f2d7c; Webstorm-16ea5a2c=ec86a806-acea-4780-97c8-d4e7b352428c; JSESSIONID=FCE3D6DBF41195303406E6E0A7565179

file=preview.gif&note=fsdfds
```

**有没有问题？**

Content-Length: 11，该请求头表示啥意思？表示的是请求体的长度。此时通过长度可以发现，文件上传此时传递的不是文件的内容，而是文件的名称。





**3.form表单设置属性 enctype=multipart/form-data**

![image-20210819200655228](7_%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.assets/image-20210819200655228.png)



后续如何操作？

其实就是利用request提供的API来进行解析处理



**进入到EE阶段之后，我们会遇到一个ServletInputStream和ServletOutputStream，这两个虽然大家很陌生，但是你可以完成把它当做FileInputStream和FileOutputStream来看待，写的过程应当是一模一样的。只是写的目的地不同或者读的来源地不同罢了。**

![image-20210819151150561](7_%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.assets/image-20210819151150561.png)

```java
package com.cskaoyan.upload;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@WebServlet("/upload")
public class UploadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //此时文件的数据在哪呢？
        //需求，将文件写入到服务器本地硬盘上面。希望传到应用根目录下面 1.jpg
        //文件的来源是在request的数组内，已经提供好了
        //你需要做的事情就是将数组里面的内容写入到指定的硬盘路径即可
        //或者说应用根目录下image/1.jpg
        ServletInputStream inputStream = request.getInputStream();
        ServletContext servletContext = getServletContext();
        String realPath = servletContext.getRealPath("image/1.jpg");
        File file = new File(realPath);
        if(!file.getParentFile().exists()){
            //如果file的父级目录不存在，则创建所有的父级目录
            file.getParentFile().mkdirs();
        }
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        int length = 0;
        byte[] bytes = new byte[1024];
        while ((length = inputStream.read(bytes)) != -1){
            fileOutputStream.write(bytes, 0, length);
        }
        inputStream.close();
        fileOutputStream.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    //从本地硬盘上面某个位置D:/app读取文件，然后将其复制到硬盘另外一个位置D:/app2
    private void copyFile(){
        File sourcefile = new File("D:/app/12.jpg");
        File destFile = new File("D:/app2/12.jpg");
        try {
            FileInputStream fileInputStream = new FileInputStream(sourcefile);
            FileOutputStream outputStream = new FileOutputStream(destFile);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

随后发现，保存在硬盘上面的二进制文件损坏，无法打开，为什么呢？

此时可以从另外一个角度去尝试分析一下，使用文本文件来上传。上传一个txt文本。

![image-20210819151823655](7_%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.assets/image-20210819151823655.png)

如果这些字符进入到二进制文件中，肯定会导致文件的损坏。



这些字符数据怎么来的呢？

通过抓取请求报文发现，请求报文发出时，就已经包含了这些字符。不是服务器代码写的有问题，导致了该问题。

尝试同时上传表单数据和文件。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/app/upload" enctype="multipart/form-data" method="post">
        <input type="file" name="image">
        <input type="text" name="username"><br>
        <input type="submit">
    </form>
</body>
</html>
```

之后，我们尝试获取表单数据username

**发现之前可以获取请求参数的方法无法获取到请求参数了，返回null。**

与此同时，抓包请求报文

```
POST http://localhost/app/upload HTTP/1.1
Host: localhost
Connection: keep-alive
Content-Length: 285
Cache-Control: max-age=0
sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Microsoft Edge";v="92"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
Origin: http://localhost
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary3hX2dTZFTR9Bc514
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.73
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: http://localhost/app/upload.html
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Cookie: JSESSIONID=54527195C7ED8AB0C3E99F41C4EEA001

------WebKitFormBoundary3hX2dTZFTR9Bc514
Content-Disposition: form-data; name="image"; filename="1.txt"
Content-Type: text/plain

hello
------WebKitFormBoundary3hX2dTZFTR9Bc514
Content-Disposition: form-data; name="username"

admin
------WebKitFormBoundary3hX2dTZFTR9Bc514--

```

**发现提交过来的请求参数不再是key=value型了。**



### 3 问题

**1.仅会上传文件名，不会上传文件内容**

​	如何去解决呢？ form表单设置属性	**enctype="multipart/form-data"。**该属性值表示的含义是设置了这个以后，那么form表单不仅可以像之前一样上传普通表单数据，也就是文本数据，还可以上传二进制数据。



**2.写了代码解析，随后发现文件损坏，无法打开？**

上传逻辑之后，文件里面会多出来一部分字符，导致了二进制文件的损坏。





**3.之前可以获取请求参数的API也获取不到了，为什么呢？**

因为请求参数不再是key=value型数据了。



### **4 总结：**

**最开始只会上传文件名，不会上传文件内容，采取的措施（enctype="multipart/form-data"）**



添加完之后

可以上传文件内容了，但是此时

**二进制文件会直接损坏**

**文本文件会多出来很多字符**

**获取请求参数的API也获取不到请求参数了**



一切的问题其实都是来自于enctype="multipart/form-data"，如果不添加，没法进行文件上传的；

如果添加了之后，文件可以上传了。（思考一个问题，如果此时可以提交文件数据了，那么请求体里面提交的数据格式还可以是key=value型吗？不可以。）

此时之前的数据格式不能再使用了，只能采用新的数据格式

```
Content-Disposition: form-data; name="image"; filename="1.txt"
Content-Type: text/plain

hello
------WebKitFormBoundary3hX2dTZFTR9Bc514
Content-Disposition: form-data; name="username"

admin
------WebKitFormBoundary3hX2dTZFTR9Bc514--
```

**这些字符其实是用来进行分割每个input部分的。**

通过去分析这些分隔符，发现其实是有规律可循的，利用这些分隔符，就可以将原先的数据进行拆分。

但是实际的实现过程还是比较复杂的，并且市面已经存在了比较成熟的解决方案，所以直接使用组件来完成该功能即可。



## 3 使用**Commons File Upload**进行文件上传(了解,会用即可)

doc:[Commons FileUpload](https://commons.apache.org/proper/commons-fileupload/)

对于组件部分的要求，**根据官网的步骤，完成文件上传功能即可。**这里面会涉及很多API，不要过分纠结于这些API的具体实现原理。

[maven:](https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload/1.4)

```xml
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>

```



代码:

```java
package com.cskaoyan.upload;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@WebServlet("/upload2")
public class UploadServlet2 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        //如果没有上传的文件，那么是不可以使用commons-fileupload组件的
        //在使用之前，一定要确认当前请求是否包含上传的文件（判断是否是multipart/form-data）
        boolean multipart = ServletFileUpload.isMultipartContent(request);
        if(!multipart){
            response.getWriter().println("当前的请求没有包含上传文件");
            return;
        }
        //工厂可以用来生产对应的物件，利用factory可以实例化接下来文件上传的处理器
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //factory首先先设置一个缓存仓库，当文件很大时，采用边缓存边处理的方式
        File repository = (File) getServletContext().getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);

        //利用factory生产出来一个文件处理器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //利用处理器处理我们的请求：将页面提交过来的input封装成一个FileItem对象
        //页面里面每出现一个input框，那么这里面就对应一个FileItem
        try {
            List<FileItem> items = upload.parseRequest(request);
            for (FileItem item : items) {
                //后续的处理中，表单数据和上传的文件要区别对待
                if(item.isFormField()){
                    //判断当前item是否是表单数据
                    processFormField(item);
                }else {
                    processUploadFile(item);
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
    }

    /**
     * 处理上传的文件逻辑
     * @param item
     */
    private void processUploadFile(FileItem item) {
        //想了解一下文件的文件名
        String fieldName = item.getFieldName();
        String fileName = item.getName();
        String contentType = item.getContentType();
        boolean isInMemory = item.isInMemory();
        long sizeInBytes = item.getSize();
        System.out.println(fieldName + "-" + fileName + "-" + contentType + "-" + isInMemory + "-" + sizeInBytes);
        //将文件保存到硬盘上面
        //想把它保存在应用根目录下
        ServletContext servletContext = getServletContext();
        String realPath = servletContext.getRealPath("image/" + fileName);
        File file = new File(realPath);
        try {
            item.write(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 处理常规form表单的逻辑
     * 常规form表单数据，其实只需要获取键值对就可以了
     * @param item
     */
    private void processFormField(FileItem item) {
        String key = item.getFieldName();
        String value = item.getString();
        System.out.println(key + ":" + value);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

}
```

过程

![image-20210819204014886](7_%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.assets/image-20210819204014886.png)

### 2 中文乱码解决方案

在文件上传时，还会不会有中文乱码问题？

1.表单数据里面提交中文，还会不会乱码

会。之前的方法不再适用。

```java
String value = null;
try {
    value = item.getString("utf-8");
} catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
```



2.如果文件名含有中文，会不会乱码？

```java
request.setCharacterEncoding("utf-8");
```

该代码可以解决文件名乱码问题



### 3. 其他常用设置

比如设置提交的文件大小限制。

作业提交的时候，页面显示提交的作业大小有限制5M

微信针对视频有严格的大小限制的  朋友圈分享限制时长（对于来源于微视平台的视频不做限制的）；群聊限制最大的大小

```java
ServletFileUpload upload = new ServletFileUpload(factory);
//  1024 bytes
upload.setFileSizeMax(1024);
```



## 封装数据到对象

思考一个问题，如果这里我上传图片，那么接下来我应该把什么封装到对象中。

存什么路径？硬盘路径？网络路径？

存什么路径其实取决于你接下来这个图片需要干什么？对于用户来说，注册的时候提交了一个头像，接下来肯定是希望web访问过程中能够看到该头像。



```java
package com.cskaoyan.upload;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@WebServlet("/upload3")
public class UploadServlet3 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        //如果没有上传的文件，那么是不可以使用commons-fileupload组件的
        //在使用之前，一定要确认当前请求是否包含上传的文件（判断是否是multipart/form-data）
        boolean multipart = ServletFileUpload.isMultipartContent(request);
        if(!multipart){
            response.getWriter().println("当前的请求没有包含上传文件");
            return;
        }
        //工厂可以用来生产对应的物件，利用factory可以实例化接下来文件上传的处理器
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //factory首先先设置一个缓存仓库，当文件很大时，采用边缓存边处理的方式
        File repository = (File) getServletContext().getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);
        User user = new User();

        //利用factory生产出来一个文件处理器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //  1024 bytes
//        upload.setFileSizeMax(1024);
        //利用处理器处理我们的请求：将页面提交过来的input封装成一个FileItem对象
        //页面里面每出现一个input框，那么这里面就对应一个FileItem
        try {
            List<FileItem> items = upload.parseRequest(request);
            for (FileItem item : items) {
                //后续的处理中，表单数据和上传的文件要区别对待
                if(item.isFormField()){
                    //判断当前item是否是表单数据
                    processFormField(item, user);
                }else {
                    processUploadFile(item, user);
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        System.out.println(user);
    }

    /**
     * 处理上传的文件逻辑
     * @param item
     * @param user
     */
    private void processUploadFile(FileItem item, User user) {
        //想了解一下文件的文件名
        String fieldName = item.getFieldName();
        String fileName = item.getName();
        String contentType = item.getContentType();
        boolean isInMemory = item.isInMemory();
        long sizeInBytes = item.getSize();
        System.out.println(fieldName + "-" + fileName + "-" + contentType + "-" + isInMemory + "-" + sizeInBytes);
        //将文件保存到硬盘上面
        //想把它保存在应用根目录下
        ServletContext servletContext = getServletContext();
        String relativePath = "image/" + fileName;
        String realPath = servletContext.getRealPath(relativePath);
        File file = new File(realPath);
        try {
            item.write(file);
            user.setImage(relativePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 处理常规form表单的逻辑
     * 常规form表单数据，其实只需要获取键值对就可以了
     * @param item
     * @param user
     */
    private void processFormField(FileItem item, User user) {
        String key = item.getFieldName();
        String value = null;
        try {
            value = item.getString("utf-8");
            //判断是username-
            if(key.equals("username")){
                user.setUsername(value);
            }else if(key.equals("password")){
                user.setPassword(value);
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        System.out.println(key + ":" + value);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

}
```

## 封装数据到对象2

BeanUtils出发点是对的。需要一个map。提供一个map。

提供一个空的map对象， 在接下来调用processFormField、processUploadFile方法时，将这个对象作为参数传递进去，对map进行填充数据，数据会保留下来，最后执行BeanUtils的方法，通过反射来完成赋值。

```java
package com.cskaoyan.upload;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/upload4")
public class UploadServlet4 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        //如果没有上传的文件，那么是不可以使用commons-fileupload组件的
        //在使用之前，一定要确认当前请求是否包含上传的文件（判断是否是multipart/form-data）
        boolean multipart = ServletFileUpload.isMultipartContent(request);
        if(!multipart){
            response.getWriter().println("当前的请求没有包含上传文件");
            return;
        }
        //工厂可以用来生产对应的物件，利用factory可以实例化接下来文件上传的处理器
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //factory首先先设置一个缓存仓库，当文件很大时，采用边缓存边处理的方式
        File repository = (File) getServletContext().getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);
        Map<String, Object> params = new HashMap<>();
        //利用factory生产出来一个文件处理器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //  1024 bytes
//        upload.setFileSizeMax(1024);
        //利用处理器处理我们的请求：将页面提交过来的input封装成一个FileItem对象
        //页面里面每出现一个input框，那么这里面就对应一个FileItem
        try {
            List<FileItem> items = upload.parseRequest(request);
            for (FileItem item : items) {
                //后续的处理中，表单数据和上传的文件要区别对待
                if(item.isFormField()){
                    //判断当前item是否是表单数据
                    processFormField(item, params);
                }else {
                    processUploadFile(item, params);
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        User user = new User();
        try {
            BeanUtils.populate(user, params);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        System.out.println(user);
    }

    /**
     * 处理上传的文件逻辑
     * @param item
     * @param map
     */
    private void processUploadFile(FileItem item, Map<String, Object> map) {
        //想了解一下文件的文件名
        String fieldName = item.getFieldName();
        String fileName = item.getName();
        String contentType = item.getContentType();
        boolean isInMemory = item.isInMemory();
        long sizeInBytes = item.getSize();
        System.out.println(fieldName + "-" + fileName + "-" + contentType + "-" + isInMemory + "-" + sizeInBytes);
        //将文件保存到硬盘上面
        //想把它保存在应用根目录下
        ServletContext servletContext = getServletContext();
        String relativePath = "image/" + fileName;
        String realPath = servletContext.getRealPath(relativePath);
        File file = new File(realPath);
        try {
            item.write(file);
            map.put(fieldName, relativePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 处理常规form表单的逻辑
     * 常规form表单数据，其实只需要获取键值对就可以了
     * @param item
     * @param map
     */
    private void processFormField(FileItem item, Map<String, Object> map) {
        String key = item.getFieldName();
        String value = null;
        try {
            value = item.getString("utf-8");
            //判断是username-
            map.put(key, value);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        System.out.println(key + ":" + value);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

}
```



## 封装数据到对象3

在方式2的基础上，只需要在稍微改动一点点，就可以形成一个工具类，接下来不管任何场景下进行文件上传，那么都可以复用它。比如用户注册、商品发布时

想象如果由用户注册变成了商品发布，基本上关于文件上传的代码逻辑不需要做任何改变，那么完全可以复用。可以写成工具类。

```java
package com.cskaoyan.upload;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileUploadUtils {

    public static Map<String, Object> parseRequest(HttpServletRequest request){
        //工厂可以用来生产对应的物件，利用factory可以实例化接下来文件上传的处理器
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //factory首先先设置一个缓存仓库，当文件很大时，采用边缓存边处理的方式
        File repository = (File) request.getServletContext().getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);
        Map<String, Object> params = new HashMap<>();
        //利用factory生产出来一个文件处理器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //  1024 bytes
//        upload.setFileSizeMax(1024);
        //利用处理器处理我们的请求：将页面提交过来的input封装成一个FileItem对象
        //页面里面每出现一个input框，那么这里面就对应一个FileItem
        try {
            List<FileItem> items = upload.parseRequest(request);
            for (FileItem item : items) {
                //后续的处理中，表单数据和上传的文件要区别对待
                if(item.isFormField()){
                    //判断当前item是否是表单数据
                    processFormField(item, params);
                }else {
                    processUploadFile(item, params, request);
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        return params;
    }

    /**
     * 处理上传的文件逻辑
     * @param item
     * @param map
     * @param request
     */
    private static void processUploadFile(FileItem item, Map<String, Object> map, HttpServletRequest request) {
        //想了解一下文件的文件名
        String fieldName = item.getFieldName();
        String fileName = item.getName();
        String contentType = item.getContentType();
        boolean isInMemory = item.isInMemory();
        long sizeInBytes = item.getSize();
        System.out.println(fieldName + "-" + fileName + "-" + contentType + "-" + isInMemory + "-" + sizeInBytes);
        //将文件保存到硬盘上面
        //想把它保存在应用根目录下
        ServletContext servletContext = request.getServletContext();
        String relativePath = "image/" + fileName;
        String realPath = servletContext.getRealPath(relativePath);
        File file = new File(realPath);
        try {
            item.write(file);
            map.put(fieldName, relativePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 处理常规form表单的逻辑
     * 常规form表单数据，其实只需要获取键值对就可以了
     * @param item
     * @param map
     */
    private static void processFormField(FileItem item, Map<String, Object> map) {
        String key = item.getFieldName();
        String value = null;
        try {
            value = item.getString("utf-8");
            //判断是username-
            map.put(key, value);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        System.out.println(key + ":" + value);
    }
}
```



```java
package com.cskaoyan.upload;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/upload5")
public class UploadServlet5 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        //如果没有上传的文件，那么是不可以使用commons-fileupload组件的
        //在使用之前，一定要确认当前请求是否包含上传的文件（判断是否是multipart/form-data）
        boolean multipart = ServletFileUpload.isMultipartContent(request);
        if(!multipart){
            response.getWriter().println("当前的请求没有包含上传文件");
            return;
        }
        Map<String, Object> params = FileUploadUtils.parseRequest(request);
        User user = new User();
        try {
            BeanUtils.populate(user, params);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        System.out.println(user);
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

}
```

今后如果进行商品发布等其他场景，直接使用文件上传的代码即可

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>商品的发布页面</title>
</head>
<body>
    <form action="/app/product" enctype="multipart/form-data" method="post">
        <input type="file" name="image">
        <input type="text" name="productName"><br>
        <input type="text" name="description"><br>
        <input type="submit">
    </form>
</body>
</html>
```



```java
package com.cskaoyan.upload;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

@WebServlet("/product")
public class ProductServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        //如果没有上传的文件，那么是不可以使用commons-fileupload组件的
        //在使用之前，一定要确认当前请求是否包含上传的文件（判断是否是multipart/form-data）
        boolean multipart = ServletFileUpload.isMultipartContent(request);
        if(!multipart){
            response.getWriter().println("当前的请求没有包含上传文件");
            return;
        }
        Map<String, Object> params = FileUploadUtils.parseRequest(request);
        Product product = new Product();
        try {
            BeanUtils.populate(product, params);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```



## 文件重名

使用uuid

```java
/**
 * 文件重名 使用uuid
 */
//使用uuid生成唯一后缀名
final String uuid = UUID.randomUUID().toString();
fileName = uuid + "-" + fileName;
```



对于一个系统来说，它有很多用户，用户在上传图片的时候，都有可能会选择一个叫做1.jpeg的文件

应该将其改名

改名：wxid + timestamp 形成一个独一无二的名字

或者说**完全随机**

```java
String fileName = item.getName();
//对文件名进行处理
String uuid = UUID.randomUUID().toString();
//文件后缀名
fileName = uuid + "-" + fileName;
```

## 目录内文件数过多的问题

假设电脑性能不是特别好，如果一个目录内文件数过多，那么打开该目录，发现加载速度很慢，磁盘在剧烈的转动。

磁盘在努力的进行IO操作。

网络访问过程也是一样，如果文件数很多，那么加载某个文件也是同样的过程， 也会非常慢，这个时候可以怎么做呢？

设置多个目录。按照什么原则设置呢？

比如

可以按照年、月、日设置目录。

有一个问题，不是特别的均匀。如果碰到节假日，大型的节日，某一天的文件可能要超过平时一周的文件。

如何设置的均匀一些呢？

散列。

文件名---hashcode-----------> 0x   1	2	3	6	7	8	A	F/ 文件

```java
private static void processUploadFile(FileItem item, Map<String, Object> map, HttpServletRequest request) {
    //想了解一下文件的文件名
    String fieldName = item.getFieldName();
    String fileName = item.getName();
    //对文件名进行处理
    String uuid = UUID.randomUUID().toString();
    //文件后缀名
    fileName = uuid + "-" + fileName;
    int hashCode = fileName.hashCode();
    String hexString = Integer.toHexString(hashCode);
    char[] chars = hexString.toCharArray();
    String basePath = "image";
    for (char aChar : chars) {
        basePath = basePath + "/" + aChar;
    }
    String contentType = item.getContentType();
    boolean isInMemory = item.isInMemory();
    long sizeInBytes = item.getSize();
    System.out.println(fieldName + "-" + fileName + "-" + contentType + "-" + isInMemory + "-" + sizeInBytes);
    //将文件保存到硬盘上面
    //想把它保存在应用根目录下
    ServletContext servletContext = request.getServletContext();
    String relativePath = basePath + "/" + fileName;
    String realPath = servletContext.getRealPath(relativePath);
    File file = new File(realPath);
    if(!file.getParentFile().exists()){
        file.getParentFile().mkdirs();
    }
    try {
        item.write(file);
        map.put(fieldName, relativePath);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```



