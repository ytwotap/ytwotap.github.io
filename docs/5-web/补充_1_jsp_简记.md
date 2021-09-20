

## 8、JSP

### 8.1什么是JSP

java Server Pages : Java服务器端页面，也和Servlet一样，用于动态Web技术。

最大的特点：

- 写JSP就像在写HTML
- 区别：
  - HTML只写给用户提供静态的数据
  - JSP页面中可以嵌入java代码，为用户提供动态数据

### 8.2 JSP原理

思路：JSP怎么执行？

- 代码层面无问题

- 服务器内部工作

  - tomcat中有一个work目录

  - IDEA 使用Tomcat的会在IDEA的Tomcat中生产一个work目录
  - 页面转换为了Java程序

  ![](JavaWeb\14.png)

**浏览器向服务器发送请求，不管访问什么资源，其实都是在访问Servlet**

JSP最终会被转换成为一个Java类

**JSP本质就是一个Servlet**

```java
//初始化
public void _jspInit(){
}
//销毁
public void _jspDestroy(){
}
//JSPServices
public void _jspService(HttpServletRequest request,HttpServletResponse response){
}
```

1. 判断请求

2. 内置一些对象

   ```java
   final javax.servlet.jsp.PageContext pagecontext;	//页面上下文
   javax.servlet.http.HttpSession session = null; 		//session
   final javax.servlet.ServletContext application;		//applicationContext
   final javax.servlet.ServletConfig config;			//config
   javax.servlet.jsp.JspWriter out = null;				//out
   final java.lang.Object page = this;					//page:当前
   HttpServletRequest request							//请求
   HttpServletResponse response						//响应
   ```

3. 输出页面增加的代码

   ```java
   response.setContextType("text/html");		//设置响应的页面类型
   page.Context = _jspxfactory.getPageContext(this,request,response,null,true,8192,true);
   _jspx_page_context = pageContext;
   application = pageContext.getServletContext();
   config = pafeContext.getServletConfig();
   session = pageContext.getSession();
   out = pageContext.getOut();
   _jspx_out = out;
   ```

4. 以上的这些对象可以再JSP页面中直接使用

![](JavaWeb\15.png)

在JSP页面中 ，只要是Java代码就会原封不动地输出

如果是HTML代码，就会被转换为

```
out.write("<html>\r\n")
```

这样的格式输出到前端。

### 8.3 JSP基础语法

#### 8.3.1 JSP表达式

```jsp
<%--JSP表达式
  作用：用来将程序的输出发送到客户端
  <%= 变量或者表达式%>
  --%>
  <%= new java.util.Date()%>
```

#### 8.3.2 JSP脚本片段

```jsp
<%--JSP脚本片段--%>
  <%
    int sum=0;
    for (int i = 0; i < 10; i++) {
      sum+=i;
    }
    out.println("<h1>Sum="+"</h1>");
  %>
```

#### 8.3.3 脚本片段的再实现

```jsp
<%
    int x = 10;
    out.println(x);
  %>
  <p>这是一个jsp文档</p>
  <%
    int y = 3;
    out.println(y);
  %>
  <hr>

  <%--在代码HTML元素--%>
  <%
    for (int i = 0; i < 5; i++) {
  %>
    <h1>Hello,Krito  ${i}</h1>
  <%
    }
  %>
```

#### 8.3.4 JSP声明

```jsp
<%!
    static{
      System.out.println("Loading Servlet");
    }

    private int glovalVar = 0;

    public void Krito()
    {
      System.out.println("进入了方法Krito");
    }
  %>
```



- JSP声明：会被编译到JSP生成JAVA的类中。其他的就会被生成到_jspService方法中

- 在JSP中嵌入Java代码即可

- JSP的注释不会在客户端显示，HTML会



### 8.4 JSP指令

```jsp
<%@ page ....%>

<%--提取公共页面--%>
<%@include file=""%>

<%--将两个页面合一起--%>
<%@include file="common/header.jsp"%>
<h1>
    网页主体
</h1>
<%@include file="common/footer.jsp"%>

<%--jsp标签
    jsp:include: 拼接页面，本质上还是三个
    --%>
<jsp:include page="common/header.jsp"/>
<h1>
    网页主体
</h1>
<jsp:include page="common/footer.jsp"/>
```



### 8.5 9大内置对象

- PageContext  存东西
- Request  存东西
- Response
- Session  存东西
- Application  [ServletContext]  存东西
- config  [SevletConfig]  
- out
- page (不用)
- exception

```java
pageContext.setAttribute("name1","桐人1号");//保存的数据只在一个页面中有效 
request.setAttribute("name2","桐人2号");//保存的数据只在一次请求中有效，请求转发会携带这个数据
session.setAttribute("name3","桐人3号");//保存的数据只在一次会话中有效，从打开浏览器到关闭浏览器
application.setAttribute("name4","桐人4号");//保存的数据只在一次服务器中有效，从打开服务器到关闭服务器
```

request:客户端向服务器发送请求，产生的数据用户用完就无用了。比如：新闻，用户看完后此消息变得无用

session：客户端向服务器发送请求，产生的数据用户用完后一会儿还有用。比如：购物车

application：客户端向服务器发送请求，产生的数据一个用户用完了，其他用户还可能使用。比如：聊天数据

