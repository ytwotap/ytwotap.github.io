

[toc]

# web 组件

## 1.监听器 (listener)

> doc:https://docs.oracle.com/javaee/7/api/javax/servlet/ServletContextListener.html

![image-20210821180135829](9_Web%E7%BB%84%E4%BB%B6.assets/image-20210821180135829.png)

### 1.1 介绍

监听器。

在EE规范早期，其实只有servlet一个组件，后面又引入了listener、filter等另外两个组件。

JavaEE中有三大组件：

Servlet（开发动态web资源）、Listener（监听器）、Filter（过滤器）



现实生活中的监听器：

被监听者：艺人

监听者：朝阳人民群众

监听事件：吸毒嫖娼

触发事件：报警





web中的监听器：

被监听者：比如ServletContext对象

监听者：编写的监听器

监听事件：ServletContext对象的创建和销毁

触发事件：调用监听器里面对应的方法



**监听器是Servlet规范定义的一种特殊类，用于监听ServletContext，HttpSession,ServletRequest等域对象的创建、销毁及其属性修改发生变化的事件。监听器可以在事件发生前后进行一些必要的处理操作。**

### 1.2 使用

编写一个类实现`ServletContextListener`接口

`Interface ServletContextListener`

- - All Superinterfaces:

    [EventListener](http://docs.oracle.com/javase/7/docs/api/java/util/EventListener.html?is-external=true)

Interface for receiving notification events about ServletContext lifecycle changes.

In order to receive these notification events, the implementation class must be either declared in the deployment descriptor of the web application, annotated with [`WebListener`](https://docs.oracle.com/javaee/7/api/javax/servlet/annotation/WebListener.html), or registered via one of the addListener methods defined on [`ServletContext`](https://docs.oracle.com/javaee/7/api/javax/servlet/ServletContext.html).

Implementations of this interface are invoked at their [`contextInitialized(javax.servlet.ServletContextEvent)`](https://docs.oracle.com/javaee/7/api/javax/servlet/ServletContextListener.html#contextInitialized-javax.servlet.ServletContextEvent-) method in the order in which they have been declared, and at their [`contextDestroyed(javax.servlet.ServletContextEvent)`](https://docs.oracle.com/javaee/7/api/javax/servlet/ServletContextListener.html#contextDestroyed-javax.servlet.ServletContextEvent-) method in reverse order.

2.配置该Listener（web.xml   注解）

```xml
<listener>
    <listener-class>com.cskaoyan.listener.MyServletContextListener</listener-class>
</listener>
```

或者注解`@WebListener`代替web.xml配置

```java
package com.cskaoyan.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyServletContextListener implements ServletContextListener {

    /**
     * 在servletContext被创建的时候执行该代码逻辑
     * @param servletContextEvent
     */
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("context init");
    }

    /**
     * 在servletContext对象被销毁的时候执行该代码逻辑
     * @param servletContextEvent
     */
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("context destroy");
    }
}

```

不需要通过访问任何地址就可以执行。

### 1.3 作用

有什么用呢？

其实我们可以将之前写在servlet的init方法里面，然后设置load-on-startup=1的这些代码逻辑放到listener里面来写。更为恰当一些。



如果之前想设置一段代码，该代码的运行和当前servlet是否被访问无关，那么可以设置一个init ，随着应用加载而运行。将这块代码逻辑写在init里面。

这段代码逻辑其实和当前servlet其实关系并不是特别的紧密。比如购物车案例，实例化商品。可以写在indexServlet中，也可以写在GoodsServlet中，只要设置init load-on-startup=1即可。

这段代码其实可以认为是一个全局性的代码。全局性的代码最好不要写在某个serlvet中。因为如果你写在某个serlvet中，别人很容易认为该段代码逻辑是和当前servlet是密切相关的。

而应该写在listener里面。

**你可以认为最开始时，只有servlet，只能将这些全局性代码写在sevlet init中， 后面版本中出现了listener，建议就将这些代码逻辑写到listenner中。**





### 1.4 思考题（不做统一要求）

listener是如何实现的？

ServletCotontext对象被创建的这段代码应该是早就已经写好了的，我们编写的监听器是后来写的，如何做到十几年前的老代码调用你写的代码的呢？

继承context 对象 并 是包含manager 对象.

在manager 对象中管理subscribers.

当context对象发生变化时,就调用evenmanager管理器并调用实现evenlisterners的接口的类.



## 2.Filter

model:

![JavaEE-过滤器和监听器案例分析_小钰的博客-CSDN博客](Filter%E5%92%8C%E7%9B%91%E8%A7%86%E5%99%A8.assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1eXV5ZGRk,size_16,color_FFFFFF,t_70.png)



设计模式:

![image-20210823114055512](9_Web%E7%BB%84%E4%BB%B6.assets/image-20210823114055512.png)

**Filter**:过滤器，用来过滤网站的数据

- 处理中文乱码
- 登录验证...

![](JavaWeb\18.png)

### 概念

过滤器、拦截器。

打游戏的时候    发消息    我***

比如古城市，城门，进出城都需要经过城门。城门就类似于filter





filter位于servlet的前面，在请求到达servlet之前，会先经过filter

响应返回给客户端之前，要再次经过filter出去

Filter开发步骤：

1. 导包

2. 编写过滤器

   1. 导包不要错![](JavaWeb\19.png)

   2. 实现Filter接口，重写相应的方法即可

      ```java
      public class CharaterEncodingFilter implements Filter {
              //初始化
          public void init(FilterConfig filterConfig) throws ServletException {
              System.out.println("CharaterEncodingFilter初始化");
          }
      
          //filterChain:链
          /*
              1.过滤中的所有代码，在过滤特定请求的时候都会执行
              2.必须要让过滤器继续同行
                  doFilter(servletRequest,servletResponse)
           */
          public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
              servletRequest.setCharacterEncoding("UTF-8");
              servletResponse.setCharacterEncoding("UTF-8");
              servletResponse.setContentType("text/html;charset=UTF-8");
      
              System.out.println("CharaterEncodingFilter执行前");
              filterChain.doFilter(servletRequest,servletResponse);//让我们的请求继续走，如果不写，程序到这里就被拦截停止
              System.out.println("CharaterEncodingFilter执行后");
          }
          //销毁:web服务器关闭的时候，过滤器会销毁
          public void destroy() {
              System.out.println("CharaterEncodingFilter销毁");
          }
      }
      ```

   3. 在web.xml中配置Filter

      ```xml
      <filter>
              <filter-name>CharacterEncodingFilter</filter-name>
              <filter-class>com.krito.filter.CharaterEncodingFilter</filter-class>
          </filter>
          <filter-mapping>
              <filter-name>CharacterEncodingFilter</filter-name>
              <!--只要是/servlet的任何请求都会经过这个过滤器-->
              <url-pattern>/*</url-pattern>
          </filter-mapping>
      ```

   或者使用注解 @WebFilter("/servlet")

   

   通过filter的介绍，我们清楚请求到达servlet之前会先经过filter，我们创建了一个servlet，访问该servlet

   但是发现请求并没有经过filter。

   说明了fitler此时并没有和servlet产生关联。

   

   `filter如何和servlet产生关联呢？`

   最简单的方式就是通过**url-pattern**，最简单的方式就是将servlet的url-pattern给filter。

   

###  Filter的注意事项

   **1.filter可以设置和servlet相同的url-pattern，这是完全允许的。**

   

   **默认情况下，filter执行的是拦截操作，如果希望filter能够放行请求，需要设置一行代码**

   ```java
   package com.cskaoyan.filter;
   
   import javax.servlet.*;
   import javax.servlet.annotation.WebFilter;
   import java.io.IOException;
   @WebFilter("/servlet1")
   public class FirstFilter implements Filter {
   
       /**
        * 直接随着应用的启动而加载
        * @param filterConfig
        * @throws ServletException
        */
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
           System.out.println("init");
       }
   
       /**
        * 类似于servlet的service方法，每当访问一次filter
        * 那么就会执行一次该方法
        * @param servletRequest
        * @param servletResponse
        * @param filterChain
        * @throws IOException
        * @throws ServletException
        */
       @Override
       public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
           System.out.println("doFilter");
           //这行代码对于请求的进一步放行非常重要，如果没有这行代码，那么filter执行的就是拦截操作
           //如果有这行代码，那么filter执行的就是放行操作
           //比如未登录的情况下访问个人主页
           //这行代码的逻辑的比较复杂：其实是采用了递归的形式去调用下一个组件
           // 管道设计模式、责任链设计模式（不做要求）
           filterChain.doFilter(servletRequest, servletResponse);
       }
   
       /**
        * 应用被卸载、服务器被关闭
        */
       @Override
       public void destroy() {
           System.out.println("destroy");
       }
   }
   ```

   **2.filter和filter之间可不可以设置相同的url-pattern呢？**

   完全可以。

   

   **3.filter可不可以设置/*呢**

   完全可以。

   其实filter设置/*还是很有必要的，假设设置编码格式的代码写在filter中，filter如果设置了/ *，那其实只需要写一处该代码即可，后面所有的servlet均无需重新设置。

   

   **4.既然filter可以设置相同的url-pattern，并且也都会加入到特定请求的处理中，那么执行的先后顺序是如何呢？**

   比如一个filter设置了/*   一个filter设置了/servlet1

   那么当我访问/servlet1时，两个filter均进入到了该请求的执行中来，那么执行的先后顺序应该是什么样的呢？

   如果多个filter加入到了一个请求中，那么执行的先后顺序按照如下顺序

   **1.如果是web.xml，按照filter-mapping声明的先后顺序**

   ```xml
   <filter-mapping>
       <filter-name>filter2</filter-name>
       <url-pattern>/servlet1</url-pattern>
   </filter-mapping>
   
   <filter-mapping>
       <filter-name>filter1</filter-name>
       <url-pattern>/*</url-pattern>
   </filter-mapping>
   ```

   **2.如果是注解，按照`类名`首字母的ASCII先后顺序来**

   **注意：和url-pattern优先级，覆盖范围没有任何关系。**

   

   **有什么实际使用意义呢？**

   比如有一个后台管理系统（管理员使用的 管理员去维护数据的地方），有一个前台系统（用户使用的系统  jd.com）。

   分别设置两个filter，这两个filter分别对应的是后台管理系统的filter和前台用户系统的filter

   除此之外还可以设置一个全局性编码格式的filter

   CharacterEncodingFilter    /*

   AdminFilter   /admin/*

   MallFilter      /mall/*

   CharacterEncodingFilter 、AdminFilter   

   假设AdminFilter里面需要有一个读取请求参数的逻辑，如果AdminFilter在前，CharacterEncodingFilter 在后，那么CharacterEncodingFilter 里面设置编码格式的代码逻辑还有效果吗？

   

   CharacterEncodingFilter、 MallFilter      

   

   ### 引入Filter之后的请求处理流程

   以访问http://localhost/app/servlet1为例，阐述请求的执行流程

   1.输入对应的地址，域名解析，建立TCP连接，发送HTTP请求报文，发送到目标机器之后

   2.被监听80端口号的Connector程序接收到，将其解析成为reqeust对象，同时提供一个response对象

   3.进一步交给engine、host，host去选择一个叫做/app的应用，如果找到，则将这两个对象交该该应用来处理

   **4.应用拿到的有效路径为/servlet1，首先先在当前应用下寻找是否有合适的filter可以处理该请求（/*    /servlet1），发现有两个filter可以同时处理该请求，那么会将这两个filter按照filter先后顺序加入到一个链表中；filter寻找完毕，接下来去寻找有没有合适的servlet（/servlet1）可以处理该请求，将可以处理该请求的这个servlet加入到链表的后面（最终只会找到一个servlet，只会找到一个优先级最高的，如果没有找到servlet，会交给缺省Servlet，最终肯定有一个servlet）**

   **5.依次去调用链表上面的每一个组件，依次去执行filter的doFilter方法以及servlet的service方法，方法需要一个request、response对象，恰好有这两个对象，将这两个对象作为参数传递给对应的方法去执行**

   6.当这些组件的所有方法执行完毕，整个请求处理结束，最终Connector读取response里面的数据生成响应报文。

   

   其实整个请求处理流程就是不同组件依次去操作request、response的过程。

   

   ### 案例

   登录案例：

   用户通过表单页面提交用户名、密码，登录成功，进入到info页面。info页面有一个特点：登录以后可以自由访问，没登录之前直接跳转到登录页面去。

   

   问题：

   **既然通过图示，我们可以看出，请求进入servlet时会经过一次filter，然后返回给客户端时，又会经过一次filter，那么理应filter的doFilter方法里面的log应该打印两遍才对？为什么只打印了一遍？**

   doFilter before---filter doFilter方法之前
   info-----servlet
   doFilter after-----filter doFilter方法之后

   为什么会这样呢？原因就是因为递归调用下一个组件。

   **你可以认为请求从客户端发送到servlet时，走的是doFilter方法上面的部分**

   **从servlet响应回客户端时，代码走的是doFilter下面的部分**

   

## 3.过滤器、监听器常见应用

**监听器：GUI（图形界面编程）编程中经常使用**



用户登录之后才能进入主页，用户 注销之后就不能进入主页。

1. 用户登录之后向Session中放入用户的数据

2. 进入主页的时候要判断用户是否已经登陆；要求：在过滤器中实现

   ```java
   HttpServletRequest request = (HttpServletRequest) req;
           HttpServletResponse response = (HttpServletResponse) resp;
   
           if(request.getSession().getAttribute("USER_SESSION")==null)
           {
               response.sendRedirect("/error.jsp");
           }
   
           filterChain.doFilter(req,resp);
   ```







# 补充:

## 1.doFilter中请求和响应对象为啥能够强制转型 向下

 实质是传入前是 一个子类,之后传入的接口中 被强制转型了 . 所以 ,filter 能强制转型回来

![image-20210824000140766](9_Web%E7%BB%84%E4%BB%B6.assets/image-20210824000140766.png)

```java
 //get url  通过 强转实现
        final HttpServletRequest req = (HttpServletRequest) request;
        final HttpServletResponse resp = (HttpServletResponse) response;
```

doFilter 传入前的方法,传入的是HttpServletRequest ,所以能向下转型.

实质是传入前是 一个子类,之后传入的接口中 被强制转型了 . 所以 ,filter 能强制转型回来

![image-20210824093931966](9_Web%E7%BB%84%E4%BB%B6.assets/image-20210824093931966.png)

在HttpFilter中,判断了doFilter 问题,需要传入 `req instanc`eof HttpServletRequest &&`
            res instanceof HttpServletResponse`

所以,实质是传入的`HttpServletRequest` 和 `HttpServletResponse.`

```java
@Override
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    if (!(req instanceof HttpServletRequest &&
            res instanceof HttpServletResponse)) {
        throw new ServletException("non-HTTP request or response");
    }

    this.doFilter((HttpServletRequest)req, (HttpServletResponse)res, chain);
}
```

