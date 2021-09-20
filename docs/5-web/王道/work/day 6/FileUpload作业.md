# FileUpload作业

1.上课的代码自己动手敲一遍







2.设计一个注册页面(用户可以提交用户名、密码、头像等信息),获取用户提交过来的各项信息，并将信息保存到应用根目录下WEB-INF目录下的一个文件中。

```java
package work6;

import lombok.SneakyThrows;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import work6.bean.User;


import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 类<code>Doc</code>用于：TODO
 *获取用户的注册信息,并保存在wen-inf目录下user中
 * @author 12824
 * @version 1.0
 * @date 2021-08-19
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    @SneakyThrows
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*
        * 获取信息封装在bean中 ,图片得到链接地址 ok
        * bean to string 保存,或者直接序列化.
        *   1.bean对象
        *   2. 注入
        *
        * 序列化
        *
        * */
        // Check that we have a file upload request
        boolean isMultipart = ServletFileUpload.isMultipartContent(req);
        if (isMultipart){
            //生产
            final DiskFileItemFactory factory = new DiskFileItemFactory();
            //缓存仓库
            ServletContext servletContext = this.getServletConfig().getServletContext();
            File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
            factory.setRepository(repository);

            // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload(factory);
            upload.setFileSizeMax(1024*1024*1024);
            // Parse the request
            List<FileItem> items = upload.parseRequest(req);
            //map 存放 请求体数据
            Map<String,Object>  map=new HashMap<>();
            /*Processing the uploaded items*/
            // Process the uploaded items
            Iterator<FileItem> iter = items.iterator();
            while (iter.hasNext()) {
                FileItem item = iter.next();

                if (item.isFormField()) {
                    processFormField(item,map);
                } else {
                    processUploadedFile(item,map);
                }
            }

            //注入
            final User user = new User();
            BeanUtils.populate(user,map);
            //注入春宫 保存

            // 唯一标识符
            final String identity = User.identityToString(user);

            String path="/WEB-INF/objectStore/";
            final File file = new File(getServletContext().getRealPath(path));
            if (!file.exists()){
                final boolean mkdirs = file.mkdirs();
                if (!mkdirs){
                    resp.getWriter().println("文件路径存取失败");
                    return;
                }
            }
            FileOutputStream fos = new FileOutputStream(file.getPath()+"/"+identity);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(user);
            /*关闭*/
            fos.close();
            oos.close();

        }

    }

    /**
     * upload file
     *  封装请求头数据到文件中
     * @param item
     * @param map
     */
    private void processUploadedFile(FileItem item, Map<String, Object> map) {
        String fieldName = item.getFieldName();
        String fileName = item.getName();
        String contentType = item.getContentType();
        boolean isInMemory = item.isInMemory();
        long sizeInBytes = item.getSize();
        //保存
        final ServletContext servletContext = getServletContext();
        /*相对路径*/
        String relativePath="img/"+fileName;
        final String realPath = servletContext.getRealPath(relativePath);
        final File file = new File(realPath);
        try {
            item.write(file);
            //注入map file 路径
            map.put(fieldName,relativePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * form logical
     * regular form field
     * @param item
     * @param map
     */
    private void processFormField(FileItem item, Map<String, Object> map) throws UnsupportedEncodingException {
        String name = item.getFieldName();
        String value = item.getString("utf-8");
        map.put(name, value);
    }
}

```



bean:

```java
package work6.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-08-19
 */
@Data
public class User implements Serializable {

    String username;
    String password;
    //head img path .
    String headImg;

    /**
     * 返回对象的唯一标识符
     * @param obj 需要取得唯一标识符的对象
     * @return className@hashcode 形式的唯一标识符。
     */
    public static String identityToString(Object obj){
        return obj.getClass().getSimpleName() + Integer.toHexString(System.identityHashCode(obj));
    }
}
```

html:

```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    <form method="POST" enctype="multipart/form-data" action="/register">
        <label >name:</label>
        <input type="text" name="username"><br>
        <label>password:</label>
        <input type="password" name="password"><br>
        <label>file:</label>
        <input type="file" name="headImg"><br/>
        <input type="submit" value="Submit">
    </form>
    </body>
    </html>
```



3.今天课堂上的提交用户名、密码，头像的案例，思考一下，如果需要将这些数据回显给用户（即文件上传逻辑执行完毕之后再将用户提交的数据显示给用户浏览器）需要怎么来实现？（选做，建议认真思考）

第二题后面加转发包含:

```java

            //转发包含
            req.setAttribute("user", user);
            RequestDispatcher dispatcher = req.getRequestDispatcher("/getInfo");
            dispatcher.forward(req, resp);
```

```java
package work6;

import work6.bean.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 * 转发包含--显示注册的数据
 * @author 12824
 * @version 1.0
 * @date 2021-08-19
 */
@WebServlet("/getInfo")
public class Display extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /**
         * 1.获取bean对象
         *      如何获取? 涉及到数据共享?? 或者转发包含?
         *      使用request域传入对象
         * 2.bean对象写入html中.
         *      如何写入? 直接写
         */
        final User user = (User) req.getAttribute("user");
        if (user==null){
            resp.getWriter().println("获取bean对象失败");
            return;
        }
        //获取到了对象
        //写入
        resp.getWriter().println("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>info</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<h2>\n" +
                "    username=\n" +user.getUsername()+
                "</h2>\n" +
                "<hr>\n" +
                "<h2>\n" +
                "    password=\n" +user.getPassword()+
                "</h2>\n" +
                "<hr>\n" +
                "<h2>\n" +
                "    <img src=\""+user.getHeadImg()+
                        "\" alt=\"\">\n"+
                "</h2>\n" +
                "<hr>\n" +
                "</body>\n" +
                "</html>");
    }
}
```

结果:

![image-20210819234458136](FileUpload%E4%BD%9C%E4%B8%9A.assets/image-20210819234458136.png)
