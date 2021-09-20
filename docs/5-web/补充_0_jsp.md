
[TOC]



# jsp参考文档

jsp tutorial:https://www.tutorialspoint.com/jsp/index.htm

尚硅谷笔记

官方文档-javaee 5 tutorial :https://docs.oracle.com/javaee/5/tutorial/doc/bnagx.html





# 目标(了解)

指导jsp语法 +jsp是啥 干啥 为啥有它 就行。

# jsp

![image-20210330222245044](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330222245044.png)

![image-20210330222254145](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330222254145.png)



# 1、为什么要学习 jsp 技术

## 1.1、什么是 jsp？

 JSP(全称 Java Server Pages)是由 Sun 公司专门为了解决动态生成 HTML 文档技术

## 如何建立jsp

![image-20210330222552146](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330222552146.png)

> 注意： jsp不能在web-inf 文件中

> ![image-20210330223056195](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330223056195.png)



# 2.JSP - Architecture(重点 理解jsp )-1

The web server needs a JSP engine, i.e, a container to process JSP pages. The JSP container is responsible for intercepting requests for JSP pages. This tutorial makes use of Apache which has built-in JSP container to support JSP pages development.

A JSP container works with the Web server to provide the runtime environment and other services a JSP needs. It knows how to understand the special elements that are part of JSPs.

Following diagram shows the position of JSP container and JSP files in a Web application.

![JSP Architecture](https://www.tutorialspoint.com/jsp/images/jsp-arch.jpg)

## JSP Processing

The following steps explain how the web server creates the Webpage using JSP −

- As with a normal page, your browser sends an HTTP request to the web server.
- The web server recognizes that the HTTP request is for a JSP page and forwards it to a JSP engine. This is done by using the URL or JSP page which ends with **.jsp** instead of **.html**.
- The JSP engine loads the JSP page from disk and converts it into a servlet content. This conversion is very simple in which all template text is converted to println( ) statements and all JSP elements are converted to Java code. This code implements the corresponding dynamic behavior of the page.
- The JSP engine compiles the servlet into an executable class and forwards the original request to a servlet engine.
- A part of the web server called the servlet engine loads the Servlet class and executes it. During execution, the servlet produces an output in HTML format. The output is furthur passed on to the web server by the servlet engine inside an HTTP response.
- The web server forwards the HTTP response to your browser in terms of static HTML content.
- Finally, the web browser handles the dynamically-generated HTML page inside the HTTP response exactly as if it were a static page.

All the above mentioned steps can be seen in the following diagram −

![JSP Processing](https://www.tutorialspoint.com/jsp/images/jsp-processing.jpg)

Typically, the JSP engine checks to see whether a servlet for a JSP file already exists and whether the modification date on the JSP is older than the servlet. If the JSP is older than its generated servlet, the JSP container assumes that the JSP hasn't changed and that the generated servlet still matches the JSP's contents. This makes the process more efficient than with the other scripting languages (such as PHP) and therefore faster.

So in a way, a JSP page is really just another way to write a servlet without having to be a Java programming wiz. Except for the translation phase, a JSP page is handled exactly like a regular servlet.

# 2.jsp运行原理（要了解）-2

jsp 的本质 ，其实是一个 Servlet 程序

![image-20210330223604194](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330223604194.png)

![image-20210330223749337](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330223749337.png)

![image-20210330223820810](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330223820810.png)

![image-20210330223850188](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330223850188.png)

![image-20210330223904127](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330223904127.png)

context目录下的jsp文件 会被翻译成java文件 并 编译成 class 字节码。

**我们打开index_jsp.java 文件查看里面的内容不难发现。jsp 中的html 页面内容都被翻译到Servlet 中的service方法中直接输出。**



idea 加载时和 正常tomacat 不同的问题 ：

> 1.首先Intellij会为每个web项目建立一个单独的文件夹，以“Unnamed_项目名”命名（可在.idea/workspace.xml中修改）。

> 2.在每次启动项目时，它先将tomcat目录下原始的CATALINA_BASE目录拷贝一份到该目录下，也就是将当前tomcat的配置文件拷贝到“Unnamed_项目名”文件夹下。

> 3.然后将CATALINA_BASE的路径修改为该目录的路径，再在 Unnamed_项目名/conf/Catalina/localhost下添加项目的配置文件ROOT.xml。

> 4.最后启动tomcat，tomcat除了会启动webapps下应用外还会加载/conf/Catalina/localhost下配置的应用，而Intellij就是通过这种方式“隐蔽”地加载web项目。

# 3.jsp的语法（重点）

## 3.1、jsp 文件头部声明介绍（page 指令介绍

```jsp
<%--this is jsp head 声明--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
```

![image-20210330231729748](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330231729748.png)



## 3.2 jsp中的三种脚本介绍

### 1.声明脚本

```
<%!
   //java code
   int i=10; //代码位置
   %>
```

![image-20210330232118784](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330232118784.png)

```java
<%!

    /*全局变量*/
    int i=10;
    /*静态代码块*/
    static{
        /*this is static 代码块*/
        System.out.println("test ");
    }
    /*define method*/
    public void testMethod(){
        System.out.println("this is tes jsp code");
    }
    /*define inner class*/
    class TestJspJavaCode{
        String name ="ｉｎｔｅｒ　ｃｌａｓｓ";
        public void printName(){
            System.out.println(name);
        }
    }
   %>
```

### 2.表达式脚本

```jsp
<%=表达式 %>
```

作用：向页面输出内容
表达式脚本翻译到Servlet 程序的service 方法中以out.print() 打印输出
out 是jsp 的一个内置对象，用于生成html 的源代码
注意：表达式不要以分号结尾，否则会报错

表达式脚本可以输出任意类型。
比如：
1.输出整型
2.输出浮点型
3.输出字符串
4.输出对象

```jsp
<%--表达式脚本2--%>
<%=1%><%--print int --%>
<%=3.1415926%><%--print double--%>
<%="this is a string "%><%--print string--%>
<%=new TestJspJavaCode().printName()%><%--输出对象--%>
```

### 3.代码脚本（*****重点，使用最多）：

代码脚本里可以书写任意的java 语句。
代码脚本的内容都会被翻译到service 方法中。
所以service 方法中可以写的java 代码，都可以书写到代码脚本中

```
<%--java code=java program file--%>
<%
    String testName="java code script";
    System.out.println("this is java script which jsp print this code ");
%>
```

## 3.3、jsp 中的注释：

// 单行java 注释
/*
多行java 代码注释
*/
单行注释和多行注释能在翻译后的java 源代码中看见。
<%-- jsp 注释--%>
jsp 注释在翻译的时候会直接被忽略掉
<!-- html 注释-->

# 4、jsp 九大内置对象

**jsp 中的内置对象，是指Tomcat 在翻译jsp 页面成为Servlet 源代码后，内部提供的九大对象，叫内置对象。**

那么jsp 中九大内置对象分别是：
**request 对象请求对象，可以获取请求信息**
**response 对象响应对象。可以设置响应信息**
pageContext 对象当前页面上下文对象。可以在当前上下文保存属性信息
session 对象会话对象。可以获取会话信息。
exception 对象异常对象只有在jsp 页面的page 指令中设置isErrorPage="true" 的时候才会存在
application 对象ServletContext 对象实例，可以获取整个工程的一些信息。
config 对象ServletConfig 对象实例，可以获取Servlet 的配置信息
out 对象输出流。
page 对象表示当前Servlet 对象实例（无用，用它不如使用this 对象）。

**九大内置对象，都是我们可以在【代码脚本】中或【表达式脚本】中直接使用的对象。**





# 5、jsp 四大域对象

**四大域对象经常用来保存数据信息**。
pageContext 可以保存数据在同一个jsp 页面中使用
request 可以保存数据在同一个request 对象中使用。经常用于在转发的时候传递数据
session 可以保存在一个会话中使用
application(ServletContext) 就是ServletContext 对象
四个作用域的测试代码：
新建两个jsp 页面。分别取名叫：context1.jsp，context2.jsp

context1 :

```java
<%--this is test 4大域对象--%>
<%--this is jsp head 声明--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
this is context1
<br>
<%
    /*set page data*/
    pageContext.setAttribute("Key", "pageContext-value");
    /*set request 域数据*/
    request.setAttribute("Key","requst-value");
    /*set session 域数据*/
    session.setAttribute("Key","session-value");
    /*set application 域数据*/
    application.setAttribute("Key","application-value");
%>
<%--test request 作用域--%>
<%
    request.getRequestDispatcher("/context2.jsp").forward(request,response);
%>
<br>
<%--get 当前页面作用cope --%>
<%=pageContext.getAttribute("Key")%>
<br>
<%=request.getAttribute("Key")%>
<br>
<%=session.getAttribute("Key")%>
<br>
<%=application.getAttribute("Key")%>

</body>
</html>
```

context2:

```java
<%--this is test 4大域对象--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h1>this is context2</h1>
<br>
<%--get 当前页面作用cope --%>
<%=pageContext.getAttribute("Key")%>
<br>
<%=request.getAttribute("Key")%>
<br>
<%=session.getAttribute("Key")%>
<br>
<%=application.getAttribute("Key")%>

</body>
</html>
```

测试pageContext 作用域步骤：
直接访问context1.jsp 文件

测试request 作用域步骤：
1.在context1.jsp 文件中添加转发到context2.jsp（有数据）
2.直接访问context2.jsp 文件（没有数据）

测试session 作用域步骤：
1.访问完context1.jsp 文件
2.关闭浏览器。但是要保持服务器一直开着
3.打开浏览器，直接访问context2.jsp 文件

测试application 作用域步骤：
1.访问完context1.jsp 文件，然后关闭浏览器2.停止服务器。再启动服务器。
3.打开浏览器访问context2.jsp 文件

# 6.jsp 中out 输出流和response.getwriter()输出流

1） jsp 中out 和response 的writer 的区别演示

​	

```jsp
<%
    // out 输出
    out.write("这是out 的第一次输出<br/>");
// out flush 之后。会把输出的内容写入writer 的缓冲区中
    out.flush();
// 最后一次的输出，由于没有手动flush，会在整个页面输出到客户端的时候，自动写入到writer

    out.write("这是out 的第二次输出<br/>");
// writer 的输出
    response.getWriter().write("这是writer 的第一次输出<br/>");
    response.getWriter().write("这是writer 的第二次输出<br/>");
%>
```

![image-20210331005604886](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210331005604886.png)

# 7.jsp 的常用标签（重点****）

<%-- 静态包含--%>
<%-- 动态包含--%>
<%-- 转发--%>

**1）静态包含--很常用**
**<%@ include file="" %>**
静态包含是把包含的页面内容原封装不动的输出到包含的位置。

```jsp
<%--
<%@ include file=""%> 就是静态包含
file 属性指定你要包含的jsp 页面的路径
地址中第一个斜杠/ 表示为http://ip:port/工程路径/ 映射到代码的web 目录
静态包含的特点：
1、静态包含不会翻译被包含的jsp 页面。
2、静态包含其实是把被包含的jsp 页面的代码拷贝到包含的位置执行输出。

--%>
<%@ include file="/include/footer.jsp"%>
```



2）动态包含--很少用
<jsp:include page=""></jsp:include>
动态包含会把包含的jsp 页面单独翻译成servlet 文件，然后在执行到时候再调用翻译的servlet 程序。并把计算的结果返回。
动态包含是在执行的时候，才会加载。所以叫动态包含。

**3）页面转发--常用**
<jsp:forward page=""></jsp:forward>
<jsp:forward 转发功能相当于
request.getRequestDispatcher("/xxxx.jsp").forward(request, response); 的功能。

## 动态和静态的区别

![image-20210331010046150](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210331010046150.png)

在这里需要补充说明一点：我们在工作中，几乎都是使用静态包含。理由很简单。因为jsp 页面虽然可以写java 代码，做其他的功能操作。但是由于jsp 在开发过程中被定位为专门用来展示页面的技术。也就是说。**jsp 页面中，基**
**本上只有html，css，js。还有一些简单的EL，表达式脚本等输出语句**。所以我们都使用静态包含。

# 补充

## 1、什么是Listener 监听器

什么是监听器？监听器就是实时监视一些事物状态的程序，我们称为监听器。
就好像朝阳群众？朝阳区只要有哪个明星有什么不好的事，他们都会知道，然后举报。
那么朝阳群众就是监听器，明星就是被监视的事物，举报就是响应的内容。
又或者说是，电动车的报警器。当报警器锁上的时候。我们去碰电动车，电动车就会报警。
报警器，就是监听器，电动车就是被监视的对象。报警就是响应的内容。

1、Listener 监听器它是JavaWeb 的三大组件之一。JavaWeb 的三大组件分别是：Servlet 程序、Filter 过滤器、Listener 监
听器。
2、Listener 它是JavaEE 的规范，就是接口
3、监听器的作用是，监听某种事物的变化。然后通过回调函数，反馈给客户（程序）去做一些相应的处理。



## 2.javax.servlet.ServletContextListener ServletContext 监听器

**监听器的使用步骤。**
**第一步：我们需要定义一个类。然后去继承生命周期的监听器接口。**
**第二步：然后在Web.xml 文件中配置。**
ServletContextListener 监听器，一定要在web.xml 文件中配置之后才会生效

```xml
<listener>
<listener-class>全类名</listener-class>
</listener>
```

生命周期监听器两个方法：

public void contextInitialized(ServletContextEvent sce) 是ServletContext **对象的创建回调**

public void contextDestroyed(ServletContextEvent sce) 是ServletContext **对象的销毁回调**

我们以ServletContext 的监听器为例演示如下：
1）创建一个ServletContextListenerImpl 类实现ServletContextListener 接口。





# 作业

## 1.99乘法表实现

```jsp
<h2>99乘法口诀表</h2>
    <table align="center">
        <%-- 外层循环遍历行--%>
        <% for (int i = 1; i <= 9; i++) { %>
        <tr>
            <%-- 内层循环遍历单元格--%>
            <% for (int j = 1; j <= i ; j++) { %>
            <td><%=j + "x" + i + "=" + (i*j)%></td>
            <% } %>
        </tr>
        <% } %>
    </table>
<br>
```

**从上面可以看出，jsp的代码脚本分开写并不影响。且可以和html混用。**

## 练习二：jsp 输出一个表格，里面有10 个学生信息。

![image-20210331163749930](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210331163749930.png)

Student 类：

```
public class Student {
private Integer id;
private String name;
private Integer age;
private String phone;
```

SearchStudentServlet 程序

```java
public class SearchStudentServlet extends HttpServlet {
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
IOException {
// 获取请求的参数
// 发sql 语句查询学生的信息
// 使用for 循环生成查询到的数据做模拟
List<Student> studentList = new ArrayList<Student>();
for (int i = 0; i < 10; i++) {
int t = i + 1;
studentList.add(new Student(t,"name"+t, 18+t,"phone"+t));
}
// 保存查询到的结果（学生信息）到request 域中
req.setAttribute("stuList", studentList);
// 请求转发到showStudent.jsp 页面
req.getRequestDispatcher("/test/showStudent.jsp").forward(req,resp);
}
}
```

showStudent.jsp 页面


```jsp
<%@ page import="java.util.List" %>
<%@ page import="com.atguigu.pojo.Student" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<title>Title</title>
<style>
table{
border: 1px blue solid;
width: 600px;
border-collapse: collapse;
}
td,th{
border: 1px blue solid;
}
</style>
</head>
<body>
<%--练习二：jsp 输出一个表格，里面有10 个学生信息。--%>
<%
List<Student> studentList = (List<Student>) request.getAttribute("stuList");
%>
<table>
<tr>
<td>编号</td>
<td>姓名</td>
<td>年龄</td>
<td>电话</td>
<td>操作</td>
</tr>
<% for (Student student : studentList) { %>
<tr>
<td><%=student.getId()%></td>
<td><%=student.getName()%></td>
<td><%=student.getAge()%></td>
<td><%=student.getPhone()%></td>
<td>删除、修改</td>
</tr>
<% } %>
</table>
</body>
</html>
```

**来源：尚硅谷关于jsp的笔记**







# 补充

## 浅谈jsp

在我自学JavaWeb时，有两个地方是我觉得最难的，一个是JDBC相关的内容，另一个就是JSP与Servlet。JSP本质也是Servlet，所以关于Servlet这里只一笔带过，默认大家都会。

JDBC之所以让我感觉很难，在于JDBC是我接触的第一个“非Java类”形式的知识点。它是一个接口，而不是以前学的Java类。这让我有好一阵子缓不过来。啥叫接口？JDBC做成接口的好处有什么？以及JavaWeb中几次jdbcUtils的封装、JDBC+QueryRunner+ThreadLocal一起实现事务等知识点，都具有相当的难度。（建议大家一定要跟上jdbcUtils的几次演变）

Servlet与JSP的难点在于概念太多、太杂、太抽象。首先，你要过好几天才明白它是个什么东西、用来干嘛。其次，等你终于明白它是什么时，你又纳闷它整个流程是怎样的。就好比我现在问你，从浏览器地址栏键入url发起请求到服务器响应数据，中间Servlet和JSP都干了啥，你是否清楚？还有一个就是JSP比Servlet更容易让人迷糊，以至于我一度以为JSP是页面，它运行在客户端而不是在服务器端...等等，现在想来可能觉得云淡风轻，但是对于当时的我来说简直蛋疼。再加上杭州7、8月酷热无比，真可谓：暖风熏得游人醉，直把课桌当床睡。

像前几篇文章一样，这篇也大多都是概念解释。我个人不是很感冒所谓的碎片化学习，都是自欺欺人罢了。所以看完文章，该坐下来静心学习的还是要花时间去学。

主要内容介绍：

- 动乱年代
- JSP是什么
- 一个Http请求的冒险之旅
- JSP与AJAX+HTML
- MVC模式与JAVAEE三层架构

------

## **动乱年代**

在介绍JSP之前，必须要先来聊聊英雄们的故事。

1987年9月14日21时07分，有人从北京向海外发出了中国第一封电子邮件。邮件内容为“Across the GreatWall we can reach every corner in the world(越过长城，走向世界)”，这预示着，互联网时代悄然叩响了中国的大门。

让我们将目光从中国转向海外。上世纪的90年代，当时的互联网还是天地初开、一片混沌。而1995年以及随后的一年，可谓群雄逐鹿风起云涌，注定不平凡。而当时，我还在家里玩泥巴。

1995年5月，SUN公司发布了Java。名字取得很随意，据说是因为那群创始人当时正好在咖啡店激烈讨论取什么名字。其中有一个人望着手中的咖啡突然灵机一动：卧槽，就叫Java吧。这就好比农村生娃，老爹一看，卧槽，这孩子骨骼惊奇，面相清秀，就叫...二狗子吧，的感觉一样一样的。几乎同年，也不知道稍早还是稍晚，反正不重要，PHP也发布了。当时的人们还不知道，它将被黑为“世界上最好的语言”。次年，一个叫布兰登·艾奇（Brendan Eich，1961年～）的技术员，应老板要求花了10+天，借鉴几大语言的优秀特性（包括Java），写出了LiveScript。而为了在发布时蹭Java热度扩大宣传，不惜改名JavaScript。所谓慢工出细活，所以...JavaScript只写了10多天，自然是...好在后来也挽救回来了，现在好歹是GitHub提交量最多的语言，而前端这几年也是火得不行。

我们知道，浏览器能通过解析html语句渲染出页面。比如：

![img](https://pic1.zhimg.com/80/v2-da804ba1f679fb810d9ee73f2f2dfbf8_1440w.jpg)

关键是这些html语句怎么来的？是不是需要浏览器通过http请求某个页面，然后服务器根据浏览器的请求，通过http响应对应页面的html语句回去？而服务器端是我们用Java开发的，它用什么响应这一大堆html语句？答案就是：Servlet！

随手用MyEclipse新建一个Servlet，你会看到，生成的Servlet默认的模板是这样的：

![img](https://pic4.zhimg.com/80/v2-4cbb3f16e4936726d6438293df70068f_1440w.jpg)

可以看到Servlet的doGet()和doPost()方法体中有响应html片段的代码。这其实是上古时期开发习惯的“遗迹”。都2018年了，MyEclipse还自作聪明，以为你会在Servlet中手动输出HTML片段。诚然，在早期的JavaWeb开发中，我们的程序猿祖先确实有那么一段黑暗时光，但那是因为当时还没有现在这么多、这么好用的模板和框架。

![img](https://pic2.zhimg.com/80/v2-3085439d3e970eb52c9e93e313c57d55_1440w.jpg)

上古时代，通常情况是美工写好html静态页面后，丢给Java程序员。Java程序猿在Servlet中调用Service拿到数据后，**逐句复制**html静态页面上的html语句到Servlet的中，根据情况将后端的数据与html片段拼接在一起，然后以诸如

```text
out.println("<span>用户名是："+user.age+<"/span>");
```

的方式疯狂输出。

![img](https://pic2.zhimg.com/80/v2-fc8bb977784e7b703bfd157192825899_1440w.jpg)把html代码从页面复制到Servlet，在Servlet中拼接数据再响应输出

按这种方式，要想拼接数据并完整输出一个html页面，没个几百上千行out.println()是不可能的。所以基本上敲完两个页面两根手指就麻了。

![img](https://pic4.zhimg.com/80/v2-5b33623195756fcec747b71c625019f3_1440w.jpg)

而同时期的PHP，[http://ASP.Net](https://link.zhihu.com/?target=http%3A//asp.net/)就优秀得多了，人家压根不搞你这繁琐的一套。它们选择在html页面中嵌入相应语言来引入动态数据，避免了手动拷贝html片段输出的尴尬局面。

![img](https://pic3.zhimg.com/80/v2-092cb7fb1de6877f53751531d05675de_1440w.jpg)直接在html页面中写代码插入数据

因为仔细想来，**我们的主要目的就是希望在最终输出的html的代码中嵌入后台数据罢了。**除了把html语句拿出来在Servlet里拼接好再输出这种方式外，我们也可以直接在html语句中写入动态数据（注意，不是HTML文件，必须是JSP之类的动态模板文件中的HTML语句）。而这两种几乎是完全相反的设计思路！

孰优孰劣，不用我说了吧。

![img](https://pic3.zhimg.com/v2-464548c14d137868045857b918b8945e_b.webp)

图片来自网络

一部分Java程序员一看，就傻眼了：我靠，PHP还真是世界上最好的语言啊，Web开发竟然如此之简单！老子再也不想复制粘贴了！于是转向了PHP或者其他语言的开发。就这样，Java流失了一部分程序员。SUN公司一看，这不行啊，Java也要搞一个。于是，JSP应运而生。

![img](https://pic1.zhimg.com/80/v2-cdd0a277c0456b7aef975ecd646fb1d4_1440w.jpg)

------

## **JSP是个啥**

JSP全称Java Server Page，直译就是“运行在服务器端的页面”。上面已经介绍过，我们可以直接在JSP文件里写HTML代码，使用上把它**当做**HTML文件。而且JSP中HTML/CSS/JS等的写法和HTML文件中的写法是一模一样的。但它毕竟不是HTML，而且本质差了十万八千里。因为我们还可以把Java代码内嵌在JSP页面中，很方便地把动态数据渲染成静态页面。这一点，HTML打死都做不到。

当有人请求JSP时，服务器内部会经历一次动态资源（JSP）到静态资源（HTML）的转化，服务器会自动帮我们把JSP中的HTML片段和数据拼接成静态资源响应给浏览器。也就是说JSP是运行在服务器端，但最终发给客户端的都已经是转换好的HTML静态页面（在响应体里）。

即：**JSP = HTML + Java片段**（各种标签本质上还是Java片段）

![img](https://pic1.zhimg.com/80/v2-ebed2ed016e2edd8b6abc2e2d7b62a4c_1440w.jpg)记住，1.JSP是服务器端用来将动态页面转化为静态页面的。2.浏览器只能解析静态页面

但所谓的“JSP和HTML相似”只是JSP给我们的表面印象。我们还要继续往下挖一挖。**实际上，JSP和HTML差远了。**JSP本质是一个Java类（Servlet），是在服务器混的，只不过它输出结果是HTML。蜜蜂产出蜂蜜，但是蜜蜂不是蜂蜜啊！在揭开JSP真身之前，我们先来复习一下什么是Servlet。

Servlet是什么？

- 一个Java类，运行在Servlet容器中（Tomcat）
- 负责接收请求
- 调用Service处理数据
- 负责响应数据

![img](https://pic2.zhimg.com/80/v2-83c1a7e3ae1e9d236ce568347dd2c3b1_1440w.jpg)传智播客这张图，画的是真的好啊

再来看看张孝祥老师的心血之作（感谢网友[孤傲苍狼](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/xdp-gacl/p/3760336.html)整理）：

![img](https://pic4.zhimg.com/80/v2-eafe1e2235209f3ae578d88ae34fa91f_1440w.jpg)

![img](https://pic1.zhimg.com/80/v2-2ad676b2daeef5d973a0e146196c091c_1440w.jpg)

![img](https://pic2.zhimg.com/80/v2-452821ced1dae1c572a8dbcb17921a29_1440w.jpg)

至此，想必大家对Servlet是什么，主要做什么已经很清楚。接下来谈谈为什么说JSP本质就是一个Servlet。具体的源码我就不带大家看了，我也看不懂。大致流程是这样的：

> WEB容器接收到以.jsp为扩展名的URL的访问请求时，它将把该请求交给JSP引擎去处理。Tomcat中的JSP引擎就是一个Servlet程序，它负责解释和执行JSP页面。
>
> 每个JSP 页面在第一次被访问时，JSP引擎将它翻译成一个Servlet源程序，接着再把这个Servlet源程序编译成Servlet的class类文件，然后再由WEB容器像调用普通Servlet程序一样的方式来装载和解释执行这个由JSP页面翻译成的Servlet程序。
>
> 【存放位置】
> Tomcat把为JSP页面创建的Servlet源文件和class类文件放置在“<TOMCAT_HOME>\work\Catalina\<主机名>\<应用程序名>\”目录中，Tomcat将JSP页面翻译成的Servlet的包名为org.apache.jsp.<JSP页面在WEB应用程序内的目录名> 。

![img](https://pic3.zhimg.com/80/v2-f50dd0519d8058877bec0d6714c961c6_1440w.jpg)

![img](https://pic3.zhimg.com/80/v2-98ec73e31685456b9a6ca1558e8f47a6_1440w.jpg)

有点晕？来捋一捋。

原本，我们需要把美工的HTML代码一行行复制到Servlet中，然后拼接数据，最后向客户端响应拼接好的HTML页面。

![img](https://pic3.zhimg.com/80/v2-a9c8009324cbd466bbecb1a6c7321c46_1440w.jpg)响应给浏览器的HTML语句在http响应体里，描述了返回的页面，浏览器接收后根据代码“画出”页面

后来我们嫌麻烦，搞了JSP，就可以不用一行行复制HTML代码了，而是在JSP中直接写HTML代码和Java代码，后期JSP编译成一个Servlet，通过Java代码获取后台数据后拼接到HTML片段中，最终通过out.println()输出。

![img](https://pic1.zhimg.com/80/v2-23aee158544d9204aa00f40e87dd6600_1440w.jpg)

现在可以回答上面的问题：为什么完全相反的两种设计理念却完成了同样的需求呢？答案可以有多种，但是其中一种就是：这两种殊途同归，最终实现是一样的，都是在一个Servlet中输出！

我们不妨打开index_jsp.java，观察index.jsp被翻译成Servlet后的源码，可以看到：

![img](https://pic2.zhimg.com/80/v2-a6ce2af590ad6ce60c587cab75e7c3b1_1440w.jpg)

也就是说，虽然我们不用像上古时期一样手动复制html语句到Servlet了，但是JSP编译后的Java类其实还是在out.println()输出。和我们手动复制是一样的结果。

而index_jsp.java这个类继承了HttpJspBase，而HttpJspBase间接实现了Servlet接口。所以可以说，index.jsp被翻译后的Java类也是一个Servlet，所以JSP本质也是一个Servlet。

绕了这么一大圈，我们终于明白：

> 原来，为了不让Java程序员一行行复制HTML代码到Servlet里，**SUN公司干脆让Java程序员直接把HTML写在了Servlet里！**但是毕竟SUN还没有那么明目张胆，好歹让这个Servlet伪装了一把，打扮成JSP，然后跟程序员说：看，我搞了个JSP，这家伙可牛逼了，你能在上面同时写HTML和Java代码哦。
>
> 得了吧，等你写完JSP，回头访问时，Tomcat就把这个JSP翻译成Servlet，原先写在JSP里的HTML代码就**自动**放在了out.println()里啦！**相当于程序帮我做了“逐行复制HTML代码到Servlet”这一步。**（想起来手就麻！）

至此，我们已经知道，JSP就是一个Servlet。那么丝毫不用怀疑，今后无论你在JSP看到什么奇奇怪怪的东西，只要不报错，说明JSP就有足够自信把它变成Java代码的一部分：

- 要么被当成字符串输出（HTML片段）
- 要么本身就是Java片段
- 要么会**转成**Java片段（EL表达式）

![img](https://pic4.zhimg.com/80/v2-0425cc1e7211b11a69b6b10698ee53eb_1440w.jpg)没有EL表达式时Servlet的源码（右图是JSP，左图是JSP编译后的Servlet源码）

![img](https://pic2.zhimg.com/80/v2-a19740d5772ee52f251a64e1e53c20cd_1440w.jpg)JSP中添加了EL表达式后，Servlet源码的变化

所以，大家千万别把EL表达式想太难，记个语法，知道怎么用就行了。至于它怎么变成Java代码的，需要我们操心吗？

最后还要提醒一下EL表达式这些标签是在何时何地起作用的。很多人误以为EL表达式可以在浏览器起作用。根本原因还是对JSP不了解。JSP是服务器端的，所有操作必须在响应给浏览器之前做完。**这些标签，会在JSP文件编译成Servlet时，自动转化为Java代码，然后对数据做处理。**所以本质上和你在JSP页面写的<%%>之类的Java片段一样。它负责从变量（不确定的数）中取出数据，变成静态数据后（确定的数）贴在薄薄的一张HTML静态页面上。

想象一下，变量还未取出来之前，数据是立体的，圆鼓鼓的，而HTML静态页面则薄如一张纸。我们无法在二维面上放入三维物质。而EL表达式从变量取出来的数据则是一个常量，是个字符串一样的东西，可以轻轻地“贴”在HTML里。

至此，我们明白，JSP是立体的机器，在服务器内部，在服务器其他“同僚”的帮助下，生产一张张HTML静态页面让http带回去给浏览器显示。**就像吐钞机与钞票的关系。**

![img](https://pic1.zhimg.com/80/v2-d61a05e5c8823bc6ddc42ccbb19d38e8_1440w.jpg)本质是动态资源到静态资源的转换（省略JSP转为Servlet输出的过程）

------

## **一个Http请求的冒险之旅**

![img](https://pic2.zhimg.com/80/v2-e8748e765b5613d223cd995d5bf9d1a1_1440w.jpg)

------

## **JSP与AJAX+HTML**

其实请求、响应这么一来一回，无非要的就两样东西：数据+HTML骨架。如果把服务器端比作淘宝卖家，客户端（浏览器）比作买家，而数据和HTML则是一件商品的两个重要组成部件。那么我们很自然地能够想到，其实运输方式至少可以有两种：

1.卖家组装好商品后再发货（JSP）

2.卖家把部件拆开，运到之后买家自己组装（AJAX+HTML）

JSP是服务器端的，它的局限性在于数据必须在返回给客户端之前就“装载”完毕。不然HTML都已经发出去了，你就没办法跑到浏览器里把数据给它安上。

而有了AJAX，就可以实现零件发送、目的地组装了。

![img](https://pic2.zhimg.com/80/v2-44c9bdf357743abb38cd984a3b6bf901_1440w.jpg)

其实我对前端也不是很熟悉，只能给个大致的图。我至今没搞明白怎么才叫“前后端分离”。不用JSP，改用HTML+AJAX就是前端分离吗？好像也不完全是。以后有更深的体会时，有机会再和大家聊聊这个问题，挺有意思的。

对了，顺便说一句，初学者朋友是不是听说JSP被淘汰了，犹豫要不要学？别闹了，不学JSP你都没法学其他的模板技术。而且，你可能觉得很新奇的freemarker，其实学过JSP的话，要上手只要几小时。所以，还是有什么学什么，学好才是关键。

再强调一点，**虽然我们在浏览器地址栏输入localhost:8080/xxx/xxx.jsp，就显示出了当前页面，但那不是JSP页面，而是HTML页面。服务器并没有直接把JSP文件从服务端扔到客户端！**JSP是Java Server Page，是服务器端的东西。服务器的东西永远不可能直接在浏览器运行。浏览器只能接受静态页面。

![img](https://pic2.zhimg.com/80/v2-f936b7b3ddef8248879c7f414475d459_1440w.jpg)客户端之所以能显示页面，是因为JSP已经把数据和HTML片段拼凑成完整的静态页面返回给客户端

------

## **MVC模式与JAVAEE三层架构**

![img](https://pic1.zhimg.com/80/v2-955ff75e5217fe00274a13ca880cb80c_1440w.jpg)

聊这个，纯粹是因为很多朋友很容易搞错一个概念，认为MVC模式是JavaEE独有的开发模式。其实不是的。MVC是web开发都有的一种模式，比如PHP开发web时也有MVC模式。而三层架构则是JavaEE的：Controller/Service/Dao。分层开发是为了使代码逻辑更加清晰，也起到了一定的解耦合作用。

值得注意的是，MVC只是在web层。当然，如果站在更高的角度，可以看成这样：

![img](https://pic1.zhimg.com/80/v2-b28da8a6d686a7232c22c3c9480c95ec_1440w.jpg)

------

参考资料：

1.传智播客崔希凡老师JavaWeb

2.黑马32期郝强勇老师JavaWeb

3.[孤傲苍狼博客](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/xdp-gacl/)



看完本篇文章后，如果希望进一步了解JSP在整个Tomcat中的运行流程，请移步：

[JavaWeb(8)：Tomcat外传](https://zhuanlan.zhihu.com/p/54121733)



> 2021年4月17日18:45:59