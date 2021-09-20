# Day5 Response作业

1.上课的代码自己动手敲一遍







2.实现缺省Servlet的功能，要求可以处理当前应用下的静态资源文件

```java
package work5;

import javax.jws.WebService;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.Buffer;
import java.util.Arrays;

/**
 * 类<code>Doc</code>用于：TODO
 * 实现缺省Servlet 处理静态资源
 * 实现缺省Servlet：要求url-pattern为  /
 * 此时静态资源文件均无法正常显示，你需要做的事情就是在设置了/的前提下
 * 依然可以正常访问到资源页面
 * @author 12824
 * @version 1.0
 * @date 2021-08-18
 */

@WebServlet("/")
public class DefaultServlet extends HttpServlet {
    /**
     * get方法 发送获取资源请求
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       /* 1.获取请求url
                获取本地绝对路径
        2.寻找本地资源,默认为index.html
       3.响应给client*/
        // get url
        final String requestUri = req.getServletPath();
        //get real path
        final ServletConfig servletConfig = getServletConfig();
        final ServletContext servletContext = servletConfig.getServletContext();
        final String realPath = servletContext.getRealPath(requestUri);
        //find file path
        final File file = new File(realPath);
        FileReader fileReader=null;
        if (file.exists()) {
            fileReader =new FileReader(file);
        }else{
            resp.setStatus(404);
            return;
        }
        //read file
        StringBuilder buffer = new StringBuilder();
        char[] chars = new char[1024];
        while (-1 != fileReader.read(chars, 0, chars.length)) {
            String str = new String(chars);
            buffer.append(str);
        }
        System.out.println(buffer);
        //编码
        resp.setHeader("Content-Type","text/html;charset=utf-8");
        //response
        final PrintWriter writer = resp.getWriter();
        writer.println(String.valueOf(buffer));
        //关闭
        fileReader.close();
        writer.close();
    }

}
```

![image-20210818170334456](Day5%20Response%E4%BD%9C%E4%B8%9A.assets/image-20210818170334456.png)

