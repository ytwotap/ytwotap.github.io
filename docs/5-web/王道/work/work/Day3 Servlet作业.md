# Day3 Servlet作业

1.通过localhost可以访问到资源文件，需要做哪些配置，过程截图即可

要想通过localhost访问到资源文件.

1. 缺省端口
2. 缺省app名
3. 缺省index

缺省端口:

由于http默认80端口,缺省端口改为80

![image-20210816205144446](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816205144446.png)

缺省app名:

在 conf/Catalina/localhost 下新增 ROOT.xml文件即可

![image-20210816205407530](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816205407530.png)

![image-20210816205505305](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816205505305.png)



缺省资源

缺省资源在web.xml中,默认是index.html 的html文件.

![image-20210816205650335](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816205650335.png)

所以,至于要在加载的程序放上index.html就行了.

![image-20210816205949038](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816205949038.png)

**成果:**

![image-20210816205837219](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816205837219.png)





2.在浏览器窗口中打印当前时间，每刷新一次，显示最新的时间。并尝试用自己的语言说明一下servlet是什么，以及servlet的执行流程

code:

```java
package com.example.servlet1;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import java.io.IOException;
import java.util.Date;

/**
 * 类<code>Doc</code>用于：TODO
 *打印时间在html上,并且通过web.xml 配置servlet 映射.
 * @author 12824
 * @version 1.0
 * @date 2021-08-16
 */
@WebServlet("/ss")
public class FirstServlet extends HttpServlet {
    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("servlet to print : ok ! ");
        /*print to html date*/
        res.getWriter().println(new Date());
    }
}

```

成果:

![image-20210816211103617](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816211103617.png)



servlet:

servlet是一个小的java程序,运行在web server中.

接受和响应web client 的请求,一般是http协议请求.

在tomcat中,connector 接受请求后,一路传递response和request到 context,要想实现动态web程序,就需要在context下的应用进行动态响应,servlet就是对request进行动态响应的一套接口和实现,也可以称为java程序. 通过继承Servlet下的子实现,[GenericServlet](https://docs.oracle.com/javaee/7/api/javax/servlet/GenericServlet.html), [HttpServlet](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServlet.html).分别对不同请求进行处理,从而动态响应.

3.上课的代码自己认真写一遍，两个报错信息自己认真去复现，找到关键语句

1.url-pattern 没有 "/"

```xml
    <servlet-mapping>-
        <servlet-name>httpservlet</servlet-name>
        <!--对外访问url 名-->
        <!--        <url-pattern>/httpservlet</url-pattern>-->
        <!--复现 url-pattern 的错误-->
        <!--没有/ -->
        <url-pattern>httpservlet</url-pattern>

    </servlet-mapping>
```

关键错误句子:	

```
Caused by: java.lang.IllegalArgumentException: servlet映射中的<url pattern>[httpservlet]无效
```



2.同一个servlet ,相同的 url-pattern

![image-20210816213606990](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816213606990.png)

![image-20210816213615810](Day3%20Servlet%E4%BD%9C%E4%B8%9A.assets/image-20210816213615810.png)

关键错误:

```
	Caused by: java.lang.IllegalArgumentException: 名为 [com.example.servlet1.ThirdServlet]和 [com.example.servlet1.ThirdServlet1] 的servlet不能映射为一个url模式(url-pattern) [/servlet3]
```

