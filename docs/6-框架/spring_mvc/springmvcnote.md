# spring mvc 资料

官网文档（重点）: https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-servlet	

（视频）尚硅谷:[Read me](onenote:https://d.docs.live.net/e790efa1a5ba307f/Documents/teach yousel computer science/springMVC.one#Read me&section-id={FE4B20A0-551E-48B1-A31B-099E565CD8EF}&page-id={5A5BF592-6794-482E-B5EC-FBBE70A8FFE5}&end) ([Web 视图](https://onedrive.live.com/view.aspx?resid=E790EFA1A5BA307F!7706&id=documents&wd=target(springMVC.one|FE4B20A0-551E-48B1-A31B-099E565CD8EF%2FRead me|5A5BF592-6794-482E-B5EC-FBBE70A8FFE5%2F)))  包含ppt+视频:https://www.bilibili.com/video/BV1mW411M7YA?from=search&seid=9177993868959011416

（my code）github : 代码 :spring_study 

(文本参考)baeldung: https://www.baeldung.com/spring-mvc-annotations 

视频：狂神说 ：https://www.bilibili.com/video/BV1aE41167Tu/?spm_id_from=333.788.recommend_more_video.5（这个主要i路线）

​			狂神说：**文档**https://mp.weixin.qq.com/s?__biz=Mzg2NTAzMTExNg==&mid=2247483970&idx=1&sn=352e571ee88957ce391e972344e2a3d7&scene=19#wechat_redirect





**项目笔记代码：**

https://github.com/ytwotap/spring_study

# 第1部分 概述:



### 大概目录

![image-20210324234334429](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210324234334429.png)

![image-20210324234418864](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210324234418864.png)

### **三层架构**  （重点）

![image-20210326131139504](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326131139504.png)

### **MVC设计模型 mvc 名称 介绍**（重点）

![image-20210326131337535](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326131337535.png)

- The **Model** encapsulates the application data and in general, they will consist of **POJO**.
- The **View** is responsible for rendering the model data and in general, it generates **HTML** output that the client's browser can interpret.
- The **Controller** is responsible for processing **User Requests** and **Building Appropriate Model** and passes it to the view for rendering.

![SpringMVC框架| Flexia's Blog](https://fangfengxin.top/2020/06/25/springmvc/SSM%E6%A1%86%E6%9E%B6%E7%9A%84%E6%9E%B6%E6%9E%84.jpg)



### **spring mvc简介与运行原理**（重点 背诵）

Spring的模型-视图-控制器（MVC）框架是围绕一个DispatcherServlet来设计的，这个Servlet会把请求分发给各个处理器，并支持可配置的处理器映射、视图渲染、本地化、时区与主题渲染等，甚至还能支持文件上传。

![img](https://pic2.zhimg.com/v2-83143f1d1bda7a761cd258f7e6464d81_b.png)

(1) Http请求：客户端请求提交到DispatcherServlet。

(2) 寻找处理器：由DispatcherServlet控制器查询一个或多个HandlerMapping，找到处理请求的Controller。

(3) 调用处理器：DispatcherServlet将请求提交到Controller。

(4)(5)调用业务处理和返回结果：Controller调用业务逻辑处理后，返回ModelAndView。

(6)(7)处理视图映射并返回模型： DispatcherServlet查询一个或多个ViewResoler视图解析器，找到ModelAndView指定的视图。

(8) Http响应：视图负责将结果显示到客户端。



作者：java思维导图
链接：https://zhuanlan.zhihu.com/p/27913104
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





### Spring MVC特点

1、拥有强大的灵活性，非侵入性和可配置性
2、提供了一个前端控制器DispatcherServlet，开发者无需额外开发控制器对象
3、分工明确，包括控制器、验证器、命令对象、模型对象、处理程序映射视图解析器，每一个功能实现由一个专门的对象负责完成
4、可以自动绑定用户输入，并正确的转换数据类型
比如，Spring MVC能自动解析字符串，并将其设置为模型的int或者float类型的属性
5、使用一个名称/值的Map对象，实现更加灵活的模型数据传输
6、内置了常见的校验器，可以校验用户输入，如果校验不通过，则重定向会输入表单，输入校验是可选的，并且支持编程方式及声明方式
7、支持国际化，支持根据用户区域显示多国语言，并且国际化的配置非常简单
8、支持多种视图技术，常见的有JSP及其其他技术，包括Velocity和FreeMarker
9、提供了一个简单而强大的JSP标签库，支持数据绑定功能，使得编写JSP页面更加容易
————————————————
版权声明：本文为CSDN博主「量变决定质变」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/nangeali/article/details/79782691



### springmvc和struts2的区别有哪些 

![image-20210326132733374](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326132733374.png)





------------------

## 2 spring MVC入门



### 流程

![image-20210326133232847](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326133232847.png)



> – 加入 jar 包  --idea maven 导入 依赖
>
> – 在 web.xml 中配置 DispatcherServlet  --xml 配置 
>
> – 加入 Spring MVC 的配置文件  
>
> ​		配置扫描包
>
> ​		配置视图解析器
>
> – 编写处理请求的处理器，并标识为处理器 – 编写视图

###### 1.搭建环境 idea 

​	maven的方式搭建环境目录是不全的  

​	需要 自己搭建 并且

 	要 make as  对应的文件

![image-20210326163427935](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326163427935.png)

######  2.maven

poom.xm配置如下：

​	配置maven 

```xml
    <dependencies>
         <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.1.3-b04</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>4.1.3.RELEASE</version>
            <scope>compile</scope>
        </dependency>
       
    </dependencies>
```

不用导入spring ｗｅｂ　依赖　应为　spring mvc 包含了  。

###### 3.web.xml配置

```xml
<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <--dispatcherServlet 中心-->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>

```

**/ 和 /\* 的区别：**< url-pattern > / </ url-pattern > 不会匹配到.jsp， 只针对我们编写的请求；即：.jsp 不会进入spring的 DispatcherServlet类 。< url-pattern > /* </ url-pattern > 会匹配 *.jsp，会出现返回 jsp视图 时再次进入spring的DispatcherServlet 类，导致找不到对应的controller所以报404错。

###### 4.springmvc.xml

配置 springmvc..xml (在resources下新建)

![image-20210326210348405](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326210348405.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"

       xmlns:mvc="http://www.springframework.org/schema/mvc"

       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd

       http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc.xsd
">

    <!--开启注解扫描-->
    <context:component-scan base-package="com.yt.controller"></context:component-scan>
    <!--视图解析器-->

    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!--后缀-->
        <property name="prefix" value="/WEB-INF/pages/"></property>
        <!--前缀-->
        <property name="suffix" value=".jsp"></property>
    </bean>

    <!--开启sping mvc 框架 注解支持-->
     <!--在自动注入 视图解析器 mapping 解析器 处理器适配器-->
    <mvc:annotation-driven> </mvc:annotation-driven>

</beans>
```

> 注意视图解析器别解析错了 value="/WEB-INF/pages/  **后面有 "/"**
>
> 

###### 视图解析器

![image-20210326221320170](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326221320170.png)

###### 5.配置服务器

![image-20210326164001199](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326164001199.png)

![](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326164001199.png)

> tomacat 热更新 https://blog.csdn.net/zc1320030382/article/details/79217369
>
> 更新失败 解决:https://blog.csdn.net/m0_47188091/article/details/107459463
>
> **注意 热更新 只有 在 debug 下 才能 动 ，且 更改 spring注解没法用热更新**





serverce依赖注意一下:

![image-20210326210515165](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326210515165.png)

> 删除index.jsp   自己在webapp目录下 新建 一个index.jsp 就不会有乱码![image-20210326164229306](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326164229306.png)



完成上面环境就搭建完成了。

###### 6 .hello world test :

![image-20210326210722880](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326210722880.png)

```java
package com.yt.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


//controller class
@Controller
public class HttpController {

    /*请求映射*/
    @RequestMapping("/hello")
    public String sayHello(){
        System.out.println("Hello String MVC");
        return "success";
    }
}
```



点击 运行 test : root + hello





## 入门程序说明

![image-20210326211612505](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326211612505.png)



## 详细流程

![image-20210326211655118](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210326211655118.png)

**![image-20210402164538224](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210402164538224.png)**



![image-20210402164737179](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210402164737179.png)各个组件的详细解释:

https://blog.csdn.net/xlxxcc/article/details/51880518

```java
 <!--开启sping mvc 框架 注解支持-->
    <mvc:annotation-driven> </mvc:annotation-driven>
```

上面实现的组件的加载

## The DispatcherServlet



![Spring DispatcherServlet](https://www.tutorialspoint.com/springmvc/images/spring_dispatcherservlet.png)

Following is the sequence of events corresponding to an incoming HTTP request to DispatcherServlet −

- After receiving an HTTP request, DispatcherServlet consults the **HandlerMapping** to call the appropriate Controller.
- The Controller takes the request and calls the appropriate service methods based on used **GET** or **POST method**. The service method will set model data based on defined business logic and returns view name to the DispatcherServlet.
- The DispatcherServlet will take help from **ViewResolver** to pick up the defined view for the request.
- Once view is finalized, The DispatcherServlet passes the model data to the view, which is finally rendered, on the browsers.

All the above-mentioned components, i.e. HandlerMapping, Controller and ViewResolver are parts of **WebApplicationContext**, which is an extension of the plain **ApplicationContext** with some extra features necessary for web applications.

----



## controller

- 控制器复杂提供访问应用程序的行为，通常通过接口定义或注解定义两种方法实现。
- 控制器负责解析用户的请求并将其转换为一个模型。
- 在Spring MVC中一个控制器类可以包含多个方法
- 在Spring MVC中，对于Controller的配置方式有很多种

### 实现Controller接口

Controller是一个接口，在org.springframework.web.servlet.mvc包下，接口中只有一个方法；

```java
//实现该接口的类获得控制器功能
public interface Controller {
   //处理请求且返回一个模型与视图对象
   ModelAndView handleRequest(HttpServletRequest var1, HttpServletResponse var2) throws Exception;
}
```

**测试**

1. 新建一个Moudle，springmvc-04-controller 。将刚才的03 拷贝一份, 我们进行操作！

2. - 删掉HelloController
   - mvc的配置文件只留下 视图解析器！

3. 编写一个Controller类，ControllerTest1

   ```java
   //定义控制器
   //注意点：不要导错包，实现Controller接口，重写方法；
   public class ControllerTest1 implements Controller {
   
      public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
          //返回一个模型视图对象
          ModelAndView mv = new ModelAndView();
          mv.addObject("msg","Test1Controller");
          mv.setViewName("test");
          return mv;
     }
   }
   ```

4. 编写完毕后，去Spring配置文件中注册请求的bean；name对应请求路径，class对应处理请求的类

   ```
   <bean name="/t1" class="com.kuang.controller.ControllerTest1"/>
   ```

5. 编写前端test.jsp，注意在WEB-INF/jsp目录下编写，对应我们的视图解析器

   ```html
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
      <title>Kuangshen</title>
   </head>
   <body>
   ${msg}
   </body>
   </html>
   ```

6. 配置Tomcat运行测试，我这里没有项目发布名配置的就是一个 / ，所以请求不用加项目名，OK！

**说明：**

- 实现接口Controller定义控制器是较老的办法
- 缺点是：一个控制器中只有一个方法，如果要多个方法则需要定义多个Controller；定义的方式比较麻烦；



### 使用注解@Controller



@Controller注解类型用于声明Spring类的实例是一个控制器（在讲IOC时还提到了另外3个注解）；

Spring可以使用扫描机制来找到应用程序中所有基于注解的控制器类，为了保证Spring能找到你的控制器，需要在配置文件中声明组件扫描。

```xml
<!-- 自动扫描指定的包，下面所有注解类交给IOC容器管理 -->
<context:component-scan base-package="com.kuang.controller"/>
```

增加一个ControllerTest2类，使用注解实现；

```java
//@Controller注解的类会自动添加到Spring上下文中
@Controller
public class ControllerTest2{

   //映射访问路径
   @RequestMapping("/t2")
   public String index(Model model){
       //Spring MVC会自动实例化一个Model对象用于向视图中传值
       model.addAttribute("msg", "ControllerTest2");
       //返回视图位置
       return "test";
  }

}
```



**可以发现，我们的两个请求都可以指向一个视图，但是页面结果的结果是不一样的，从这里可以看出视图是被复用的，而控制器与视图之间是弱偶合关系。**

> **注解方式是平时使用的最多的方式！**



## REST

![What Is REST API? | RESTful API Tutorial For Beginners | Edureka](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrABLUIayrT0LSyyybdIkqej2GpA145U8Ltg&usqp=CAU)

**表现层状态转换**（[英语](https://zh.wikipedia.org/wiki/英语)：**Representational State Transfer**，[缩写](https://zh.wikipedia.org/wiki/縮寫)：**REST**）是[Roy Thomas Fielding](https://zh.wikipedia.org/w/index.php?title=Roy_Thomas_Fielding&action=edit&redlink=1)博士于2000年在他的博士论文[[1\]](https://zh.wikipedia.org/wiki/表现层状态转换#cite_note-Fielding-Ch5-1)中提出来的一种[万维网](https://zh.wikipedia.org/wiki/万维网)[软件架构](https://zh.wikipedia.org/wiki/软件架构)风格，目的是便于不同软件/程序在网络（例如互联网）中互相传递信息。表现层状态转换是根基于[超文本传输协议（HTTP）](https://zh.wikipedia.org/wiki/超文本传输协议)之上而确定的一组约束和属性，是一种设计提供万维网络服务的[软件构建风格](https://zh.wikipedia.org/wiki/軟件架構)。符合或兼容于这种架构风格（简称为 REST 或 RESTful）的网络服务，允许客户端发出以[统一资源标识符](https://zh.wikipedia.org/wiki/统一资源标志符)访问和操作网络资源的请求，而与预先定义好的无状态操作集一致化。

维基百科:https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2



**REST：**即 Representational State Transfer。（资源）表现层状态转化。是目前 最流行的一种互联网软件架构。它结构清晰、符合标准、易于理解、扩展方便， 所以正得到越来越多网站的采用

 • **资源（Resources）**：网络上的一个实体，或者说是网络上的一个具体信息。它 可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的存在。 可以用一个URI（统一资源定位符）指向它，每种资源对应一个特定的 URI 。要 获取这个资源，访问它的URI就可以，因此 URI 即为每一个资源的独一无二的识 别符。 • 表现层（Representation）：把资源具体呈现出来的形式，叫做它的表现层 （Representation）。比如，文本可以用 txt 格式表现，也可以用 HTML 格 式、XML 格式、JSON 格式表现，甚至可以采用二进制格式。

 • **状态转化（State Transfer）**：每发出一个请求，就代表了客户端和服务器的一 次交互过程。HTTP协议，是一个无状态协议，即所有的状态都保存在服务器 端。因此，如果客户端想要操作服务器，必须通过某种手段，让服务器端发生“ 状态转化”（State Transfer）。而这种转化是建立在表现层之上的，所以就是 “ 表现层状态转化” 。具体说，就是 HTTP 协议里面，

四个表示操作方式的动 词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET 用来获 取资源，POST 用来新建资源，PUT 用来更新资源，DELETE 用来删除资源。

**功能**

资源：互联网所有的事物都可以被抽象为资源

资源操作：使用POST、DELETE、PUT、GET，使用不同方法对资源进行操作。

分别对应 添加、 删除、修改、查询。

**传统方式操作资源**  ：通过不同的参数来实现不同的效果！方法单一，post 和 get

​	http://127.0.0.1/item/queryItem.action?id=1 查询,GET

​	http://127.0.0.1/item/saveItem.action 新增,POST

​	http://127.0.0.1/item/updateItem.action 更新,POST

​	http://127.0.0.1/item/deleteItem.action?id=1 删除,GET或POST

**使用RESTful操作资源** ：可以通过不同的请求方式来实现不同的效果！如下：请求地址一样，但是功能可以不同！

​	http://127.0.0.1/item/1 查询,GET

​	http://127.0.0.1/item 新增,POST

​	http://127.0.0.1/item 更新,PUT

​	http://127.0.0.1/item/1 删除,DELETE**传统方式操作资源**  ：通过不同的参数来实现不同的效果！方法单一，post 和 get

​	http://127.0.0.1/item/queryItem.action?id=1 查询,GET

​	http://127.0.0.1/item/saveItem.action 新增,POST

​	http://127.0.0.1/item/updateItem.action 更新,POST

​	http://127.0.0.1/item/deleteItem.action?id=1 删除,GET或POST

**使用RESTful操作资源** ：可以通过不同的请求方式来实现不同的效果！如下：请求地址一样，但是功能可以不同！

​	http://127.0.0.1/item/1 查询,GET

​	http://127.0.0.1/item 新增,POST

​	http://127.0.0.1/item 更新,PUT

​	http://127.0.0.1/item/1 删除,DELETE



**学习测试**

1. 在新建一个类 RestFulController

   ```
   @Controller
   public class RestFulController {
   }
   ```

2. 在Spring MVC中可以使用  @PathVariable 注解，让方法参数的值对应绑定到一个URI模板变量上。

   ```java
   @Controller
   public class RestFulController {
   
      //映射访问路径
      @RequestMapping("/commit/{p1}/{p2}")
      public String index(@PathVariable int p1, @PathVariable int p2, Model model){
          
          int result = p1+p2;
          //Spring MVC会自动实例化一个Model对象用于向视图中传值
          model.addAttribute("msg", "结果："+result);
          //返回视图位置
          return "test";
          
     }
      
   }
   ```

**使用method属性指定请求类型**

用于约束请求的类型，可以收窄请求范围。指定请求谓词的类型如GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE, TRACE等

我们来测试一下：

- 增加一个方法

  ```
  //映射访问路径,必须是POST请求
  @RequestMapping(value = "/hello",method = {RequestMethod.POST})
  public String index2(Model model){
     model.addAttribute("msg", "hello!");
     return "test";
  }
  ```

- 我们使用浏览器地址栏进行访问默认是Get请求，会报错405：

  ![图片](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7JOmNdhqNbrRK9XaseXIDsucZBtV1jA2Clpa2utiajS6zkWWoYIo8VhqlUGIOSiacAjCsiaJEOeVvNUQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- 如果将POST修改为GET则正常了；

  ```
  //映射访问路径,必须是Get请求
  @RequestMapping(value = "/hello",method = {RequestMethod.GET})
  public String index2(Model model){
     model.addAttribute("msg", "hello!");
     return "test";
  }
  ```

  ![图片](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7JOmNdhqNbrRK9XaseXIDsua1f90EJnCRJxuBoeSWiaTmdVfjIDgUo5v6ENY5N307GfoXUp4PxYu0g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**小结：**

Spring MVC 的 @RequestMapping 注解能够处理 HTTP 请求的方法, 比如 GET, PUT, POST, DELETE 以及 PATCH。

> **所有的地址栏请求默认都会是 HTTP GET 类型的。**

方法级别的注解变体有如下几个：组合注解

```
@GetMapping
@PostMapping
@PutMapping
@DeleteMapping
@PatchMapping
```

@GetMapping 是一个组合注解，平时使用的会比较多！

它所扮演的是 @RequestMapping(method =RequestMethod.GET) 的一个快捷方式。

测试：

```java
package com.yt.MAPPINGTEST;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PostsMapping {


    /**
     *  use getmappiing , it is 变异组合
     * @param name get url path variable
     * @param id
     * @return
     */
    @PostMapping("/testposMapping")
    public String postMapping(@RequestParam("name") String name, @RequestParam("id") int id){
        System.out.println("test");
        System.out.println("name"+name);
        System.out.println("id"+id);
        return "result";
    }
    /*You can access the "meta-data" part with @RequestParam as a String but you’ll probably want it deserialized from JSON (similar to @RequestBody).
    Use the @RequestPart annotation to access a multipart after converting it with an HttpMessageConverter:*/
}
```

## model and modelview 区别

中文：https://www.jianshu.com/p/87ccd6115b41

stackoverflow:

https://stackoverflow.com/questions/11212484/difference-between-models-and-view-models/11212619

重点理解：

A model is usually more closely related to how your data is stored (database, services, etc.) and the model will closely resemble those.

The ViewModel on the other hand is closely related to how your data is presented to the user. It is usually a flatten version of your model, denormalized, etc. It can be the aggregation of multiple models.

For your typical `Person` objects, your model may contain properties like the following:

- FirstName
- LastName
- BirthDate

However, in your ViewModel you may choose to represent it differently and have something more like:

- FullName
- Age

中文：参考

实际上，这两者之间有着很大的区别，具体就表现在Model只是用来传输数据的，并不会进行业务的寻址。但是，ModelAndView却是可以进行业务寻址的，就是设置对应的要请求的静态文件，这里的静态文件指的是类似jsp的文件。当然，两者还有一个最大的区别，那就是Model是每一次请求都必须会带着的，但是ModelAndView是需要我们自己去新建的。



作者：Alex_1799
链接：https://www.jianshu.com/p/87ccd6115b41
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# 第二部分 spring MVC -form handing	

-----

## 1.Spring MVC - Form Handling 

https://www.tutorialspoint.com/springmvc/springmvc_form_handling.htm

| Step | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 1    | Create a project with a name HelloWeb under a package com.tutorialspoint as explained in the Spring MVC - Hello World chapter. |
| 2    | Create Java classes Student, StudentController under the com.tutorialspoint package. |
| 3    | Create view files student.jsp, result.jsp under the jsp sub-folder. |
| 4    | The final step is to create the content of the source and configuration files and export the application as explained below. |

```
package com.example.springMVC_03_FormHanding;

public class Student {
    private String name;
    private Integer age;
    private Integer id;

    @Override
    public String toString() {
        return "Strudent{" +
                "age=" + age +
                ", name='" + name + '\'' +
                ", id=" + id +
                '}';
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
```

```
package com.example.springMVC_03_FormHanding;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/HelloWeb")
public class StudentController {
    /*get the student value in modelandview  when use url /student*/
    @RequestMapping(value = "/student",method = RequestMethod.GET)
    public ModelAndView student(){
        return new ModelAndView("student","command",new Student());
    }
    /*add student in model and view in a post request when url is /addStudent*/
    @RequestMapping(value = "/addStudent",method = RequestMethod.POST)
    public String addStudent(@ModelAttribute ("SpringWeb")Student student, ModelMap modelMap){
        modelMap.addAttribute("name",student.getName());
        modelMap.addAttribute("age",student.getAge());
        modelMap.addAttribute("id",student.getId());
        return "result";
    }
}
```

```
<%--
  Created by IntelliJ IDEA.
  User: 12824
  Date: 2021/4/1
  Time: 22:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Spring MVC Form Handing </title>

</head>
<body>
    <h2>Submitted Student Information</h2>
<table>
    <tr>
        <td>Name</td>
        <td>${name}</td>
    </tr>
    <tr>
        <td>Age</td>
        <td>${age}</td>
    </tr>
    <tr>
        <td>Id</td>
        <td>${id}</td>
    </tr>

</table>
</body>
</html>
```

```jsp
<%@taglib uri="http://www.springframework.org/tags/form" prefix = "form"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Spring MVC Form Handling</title>
</head>

<body>
<h2>Student Information</h2>
<form:form method = "post" action = "/HelloWeb/addStudent">
    <table>
        <tr>
            <td><label path = "name">Name</label></td>
            <td><input path = "name" /></td>
        </tr>
        <tr>
            <td><form:label path = "age">Age</form:label></td>
            <td><form:input path = "age" /></td>
        </tr>
        <tr>
            <td><form:label path = "id">id</form:label></td>
            <td><form:input path = "id" /></td>
        </tr>
        <tr>
            <td colspan = "2">
                <input type = "submit" value = "Submit"/>
            </td>
        </tr>
    </table>
</form:form>
</body>
</html>
```



## spring mvc tag lib

配置：

1. **<**%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %**>** 

| Form Tag         | Description                                              |
| :--------------- | :------------------------------------------------------- |
| form:form        | It is a container tag that contains all other form tags. |
| form:input       | This tag is used to generate the text field.             |
| form:radiobutton | This tag is used to generate the radio buttons.          |
| form:checkbox    | This tag is used to generate the checkboxes.             |
| form:password    | This tag is used to generate the password input field.   |
| form:select      | This tag is used to generate the drop-down list.         |
| form:textarea    | This tag is used to generate the multi-line text field.  |
| form:hidden      | This tag is used to generate the hidden input field.     |

## syntax

1. **<****form:form** action="nextFormPath" modelAttribute=?abc**?>** 



## 2.2Spring MVC - Page Redirection Example

a application makes use of redirect to transfer an http request to another page

| Step | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 1    | Create a project with a name HelloWeb under a package com.tutorialspoint as explained in the Spring MVC - Hello World chapter. |
| 2    | Create a Java class WebController under the com.tutorialspoint package. |
| 3    | Create view files index.jsp, final.jsp under jsp sub-folder. |
| 4    | The final step is to create the content of the source and configuration files and export the application as explained below. |

重点是：

return "redirect: finalPage";

```java
package com.example.springMVC_04_PageRedirectionExample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@Controller
@RequestMapping("/HelloWeb2")
public class WebController{
    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public  String index(){
        return "index";
    }
    @RequestMapping(value = "/redirct", method=RequestMethod.GET)
    public String redirect(){
        return "redirect: finalPage"; //重点

    }

    @RequestMapping(value = "/finalPage", method=RequestMethod.GET)
    public String finalPage(){
        return "final";
    }

}
```

```
<%--
  Created by IntelliJ IDEA.
  User: 12824
  Date: 2021/4/2
  Time: 12:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>redirection</title>
</head>
<body>
    <h2>this is redirection page</h2>
</body>
</html>
```

```
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%--
  Created by IntelliJ IDEA.
  User: 12824
  Date: 2021/4/2
  Time: 12:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Spring page redirction </title>
</head>
    <h2>soring page redirction</h2>
    <p>click below button to redirct the result to new page</p>
    <form:form method="get" action="/HelloWeb2/redirct">
        <table>
            <tr>
                <td>
                    <input type="submit" value="Redirct page">
                </td>
            </tr>
        </table>
    </form:form>
<body>

</body>
</html>
```

```
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h1><%= "Hello World!" %>
</h1>
<br/>
<a href="/HelloWeb2/index">Hello Servlet</a>
</body>
</html>
```



## 3 .Spring MVC - Static Pages Example

https://www.tutorialspoint.com/springmvc/springmvc_static_pages.htm

The following example shows how to write a simple web based application using Spring MVC Framework, which can access static pages along with dynamic pages with the help of a **<mvc:resources>** tag.

| Step | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 1    | Create a project with a name HelloWeb under a package com.tutorialspoint as explained in the Spring MVC - Hello World chapter. |
| 2    | Create a Java class WebController under the com.tutorialspoint package. |
| 3    | Create a static file **final.htm** under jsp sub-folder.     |
| 4    | Update the Spring configuration file HelloWeb-servlet.xml under the WebContent/WEB-INF folder as shown below. |
| 5    | The final step is to create the content of the source and configuration files and export the application, which is explained below. |

```java
package com.example.springMVC_05_StaticPages;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.management.ValueExp;

@Controller
public class WebController {
    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public  String index(){
        return "index";
    }
    @RequestMapping(value = "staticPage",method=RequestMethod.GET)
    public  String redirect(){
        return "redirect:/pages/final.html";
    }

}
```

springmvc.xml

```xml
<!--resource is add static resource -->
<mvc:resources mapping="/pages/**" location="/WEB-INF/pages/"></mvc:resources>
```

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  Created by IntelliJ IDEA.
  User: 12824
  Date: 2021/4/2
  Time: 14:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>

<body>
<h2>Spring Landing Pag</h2>
<p>Click below button to get a simple HTML page</p>
<form:form method = "GET" action = "/HelloWeb/staticPage">
    <table>
        <tr>
            <td>
                <input type = "submit" value = "Get HTML Page"/>
            </td>
        </tr>
    </table>
</form:form>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h2>this is simpla html page</h2>
    <img src="https://i.pximg.net/img-master/img/2020/06/17/00/51/44/82373915_p0_master1200.jpg" alt="">
</body>
</html>
```

## RequestMapping

**@RequestMapping**

- @RequestMapping注解用于映射url到控制器类或一个特定的处理程序方法。可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。

- 为了测试结论更加准确，我们可以加上一个项目名测试 myweb

- 只注解在方法上面

  ```
  @Controller
  public class TestController {
     @RequestMapping("/h1")
     public String test(){
         return "test";
    }
  }
  ```

  访问路径：http://localhost:8080 / 项目名 / h1

- 同时注解类与方法

  ```
  @Controller
  @RequestMapping("/admin")
  public class TestController {
     @RequestMapping("/h1")
     public String test(){
         return "test";
    }
  }
  ```

  访问路径：http://localhost:8080 / 项目名/ admin /h1  , 需要先指定类的路径再指定方法的路径；

  

  ### 

# 第3部分 Form Tag library

> **the code you can get it in**:https://github.com/ytwotap/spring_study/tree/main/springMVC_06_FormHanding
>
> 代码是不同部分不同包

## [Spring MVC - Text Box Example](https://www.tutorialspoint.com/springmvc/springmvc_textbox.htm)

The following example shows how to use Text boxes in forms using the Spring Web MVC framework

| Step | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 1    | Create a project with a name HelloWeb under a package com.tutorialspoint as explained in the Spring MVC - Hello World Example chapter. |
| 2    | Create a Java classes Student, StudentController under the com.tutorialspoint package. |
| 3    | Create a view files student.jsp, result.jsp under jsp sub-folder. |
| 4    | The final step is to create the content of the source and configuration files and export the application as explained below. |





## Student.java

```java
package com.tutorialspoint;

public class Student {
   private Integer age;
   private String name;
   private Integer id;

   public void setAge(Integer age) {
      this.age = age;
   }
   public Integer getAge() {
      return age;
   }

   public void setName(String name) {
      this.name = name;
   }
   public String getName() {
      return name;
   }

   public void setId(Integer id) {
      this.id = id;
   }
   public Integer getId() {
      return id;
   }
}
```

## StudentController.java

```java
package com.tutorialspoint;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.ModelMap;

@Controller
public class StudentController {

   @RequestMapping(value = "/student", method = RequestMethod.GET)
   public ModelAndView student() {
      return new ModelAndView("student", "command", new Student());
   }
   
   @RequestMapping(value = "/addStudent", method = RequestMethod.POST)
   public String addStudent(@ModelAttribute("SpringWeb")Student student, 
      ModelMap model) {
      model.addAttribute("name", student.getName());
      model.addAttribute("age", student.getAge());
      model.addAttribute("id", student.getId());
      
      return "result";
   }
}
```

Here, the first service method **student()**, we have passed a blank Studentobject in the ModelAndView object with name "command", because the spring framework expects an object with name "command", if you are using **<form:form>** tags in your JSP file. So, when the student() method is called it returns **student.jsp view**.

The second service method **addStudent()** will be called against a POST method on the **HelloWeb/addStudent** URL. You will prepare your model object based on the submitted information. Finally, a "result" view will be returned from the service method, which will result in rendering result.jsp

## student.jsp

```
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<html>
   <head>
      <title>Spring MVC Form Handling</title>
   </head>
   <body>

      <h2>Student Information</h2>
      <form:form method = "POST" action = "/HelloWeb/addStudent">
         <table>
            <tr>
               <td><form:label path = "name">Name</form:label></td>
               <td><form:input path = "name" /></td>
            </tr>
            <tr>
               <td><form:label path = "age">Age</form:label></td>
               <td><form:input path = "age" /></td>
            </tr>
            <tr>
               <td><form:label path = "id">id</form:label></td>
               <td><form:input path = "id" /></td>
            </tr>
            <tr>
               <td colspan = "2">
                  <input type = "submit" value = "Submit"/>
               </td>
            </tr>
         </table>  
      </form:form>
   </body>
</html>
```

Here, we are using **<form:input />** tag to render an HTML text box. For example −

```
<form:input path = "name" />
```

It will render following HTML content.

```
<input id = "name" name = "name" type = "text" value = ""/>
```

## result.jsp

```
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<html>
   <head>
      <title>Spring MVC Form Handling</title>
   </head>
   <body>

      <h2>Submitted Student Information</h2>
      <table>
         <tr>
            <td>Name</td>
            <td>${name}</td>
         </tr>
         <tr>
            <td>Age</td>
            <td>${age}</td>
         </tr>
         <tr>
            <td>ID</td>
            <td>${id}</td>
         </tr>
      </table>  
   </body>
</html>
```

![Textbox Spring Student Form](https://www.tutorialspoint.com/springmvc/images/text_box_spring_student_form.png)





![Textbox Spring Student Form Result](https://www.tutorialspoint.com/springmvc/images/text_box_spring_student_form_result.png)



## [Spring MVC - Password Example](https://www.tutorialspoint.com/springmvc/springmvc_password.htm)



 how to use Password in forms using the Spring Web MVC framework. 

Here, we are using the <form:password /> tag to render an HTML password box. For example −

```
<form:password path = "password" />
```

It will render the following HTML content.

```
<input id = "password" name = "password" type = "password" value = ""/>
```

## [Spring MVC - TextArea Example](https://www.tutorialspoint.com/springmvc/springmvc_textarea.htm)



Here, we are using **<form:textarea />** tag to render a HTML textarea box. For example −

```
<form:textarea path = "address" rows = "5" cols = "30" />
```

It will render the following HTML content.

```
<textarea id = "address" name = "address" rows = "5" cols = "30"></textarea>
```

## Spring MVC - Checkbox Example

For example −

```jsp
<form:checkbox path="receivePaper" />
```

It will render following HTML content.

```jsp
<input id="receivePaper1" name = "receivePaper" type = "checkbox" value = "true"/>
<input type = "hidden" name = "_receivePaper" value = "on"/>
```



## Spring MVC - RadioButton Example

:seedling:https://www.tutorialspoint.com/springmvc/springmvc_radiobutton.htm

Here, we are using **<form:radiobutton />** tag to render HTML radiobutton.

```
<form:radiobutton path = "gender" value = "M" label = "Male" />
<form:radiobutton path = "gender" value = "F" label = "Female" />
```

It will render following HTML content.

```
<input id = "gender1" name = "gender" type = "radio" value = "M" checked = "checked"/><label for = "gender1">Male</label>
<input id = "gender2" name = "gender" type = "radio" value = "F"/><label for = "gender2">Female</label>
```

Here, the first service method **user()**, we have passed a blank **User** object in the ModelAndView object with name "command", because the spring framework expects an object with name "command", if you are using <form:form> tags in your JSP file. So, when the **user()** method is called, it returns the **user.jsp** view.

The second service method **addUser()** will be called against a POST method on the **HelloWeb/addUser** URL. You will prepare your model object based on the submitted information. Finally, the "users" view will be returned from the service method, which will result in rendering the users.jsp.



### @ModelAttribute`

| `@ModelAttribute` | For access to an existing attribute in the model (instantiated if not present) with data binding and validation applied. See [`@ModelAttribute`](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-modelattrib-method-args) as well as [Model](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-modelattrib-methods) and [`DataBinder`](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-initbinder).Note that use of `@ModelAttribute` is optional (for example, to set its attributes). See “Any other argument” at the end of this table. |
| ----------------- | :----------------------------------------------------------- |
|                   |                                                              |

you can see:https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-modelattrib-method-args

## Spring MVC - RadioButtons Example

Here, we are using **<form:radiobuttons />**tag to render the HTML radiobuttons. For example −

```
<form:radiobuttons path = "favoriteNumber" items="${numbersList}" />
```

It will render the following HTML content.

```
<span>
   <input id = "favoriteNumber1" name = "favoriteNumber" type = "radio" value = "1"/>
   <label for = "favoriteNumber1">1</label>
</span>
<span>
   <input id = "favoriteNumber2" name = "favoriteNumber" type = "radio" value = "2"/>
   <label for = "favoriteNumber2">2</label>
</span>
<span>
   <input id = "favoriteNumber3" name = "favoriteNumber" type = "radio" value = "3"/>
   <label for = "favoriteNumber3">3</label>
</span>
<span>
   <input id = "favoriteNumber4" name = "favoriteNumber" type = "radio" value = "4"/>
   <label for = "favoriteNumber4">4</label>
</span>    
```

## Spring MVC - Dropdown Example



Here, we are using **<form:select /> , <form:option />** and **<form:options />** tags to render HTML select. For example −

```
<form:select path = "country">
   <form:option value = "NONE" label = "Select"/>
   <form:options items = "${countryList}" />
</form:select>     	
```

It will render following HTML content.

```
<select id = "country" name = "country">
   <option value = "NONE">Select</option>
   <option value = "US">United States</option>
   <option value = "CH">China</option>
   <option value = "MY">Malaysia</option>
   <option value = "SG">Singapore</option>
</select>  
```

## Spring MVC - Listbox Example

Here, we are using a **<form:select />** tag , with the attribute **multiple=true** to render an HTML listbox. For example −

```
<form:select path = "skills" items = "${skillsList}" multiple = "true" />
```

It will render following HTML content.

```
<select id = "skills" name = "skills" multiple = "multiple">
   <option value = "Struts">Struts</option>
   <option value = "Hibernate">Hibernate</option>
   <option value = "Apache Wicket">Apache Wicket</option>
   <option value = "Spring">Spring</option>
</select>
<input type = "hidden" name = "_skills" value = "1"/>

```

# Spring MVC - Hidden Field Example



Here, we are using the **<form:hidden />** tag to render a HTML hidden field.

For example −

```
<form:hidden path = "id" value = "1"/>
```

It will render following HTML content.

```
<input id = "id" name = "id" type = "hidden" value = "1"/>
```



## Spring MVC - Error Handling Example

Here we are using **<form:errors />** tag with path="*" to render error messages. For example

```
<form:errors path = "*" cssClass = "errorblock" element = "div" />
```

It will render the error messages for all input validations.

We are using **<form:errors />** tag with path="name" to render error message for name field. For example

```
<form:errors path = "name" cssClass = "error" />
```

It will render error messages for the name field validations.









----

# 第3部分 Spring MVC - Handler Mapping



##  Bean Name Url Handler Mapping Example







# 第4部分 Spring MVC - Controller





# 第5部分 Spring MVC - View Resolver

如何理解视图解析器：https://blog.csdn.net/J080624/article/details/56481819（没仔细看 mark下）





## [**Model, ModelMap, and ModelAndView  in Spring MVC**（必须理解）](https://www.baeldung.com/spring-mvc-model-model-map-model-view)

**model**:To provide a view with usable data, we simply add this data to its *Model* object. Additionally, maps with attributes can be merged with *Model* instances:

```java
@GetMapping("/showViewPage")
public String passParametersWithModel(Model model) {
    Map<String, String> map = new HashMap<>();
    map.put("spring", "mvc");
    model.addAttribute("message", "Baeldung");
    model.mergeAttributes(map);
    return "viewPage";
}
```



**model map:**Just like the *Model* interface above, *ModelMap* is also used to pass values to render a view.The advantage of *ModelMap* is it gives us the ability to pass a collection of values and treat these values as if they were within a *Map*:

```java
@GetMapping("/printViewPage")
public String passParametersWithModelMap(ModelMap map) {
    map.addAttribute("welcomeMessage", "welcome");
    map.addAttribute("message", "Baeldung");
    return "viewPage";
}
```



**modelandview**:The final interface to pass values to a view is the *ModelAndView*.

This interface allows us to pass all the information required by Spring MVC in one return:

```java
@GetMapping("/goToViewPage")
public ModelAndView passParametersWithModelAndView() {
    ModelAndView modelAndView = new ModelAndView("viewPage");
    modelAndView.addObject("message", "Baeldung");
    return modelAndView;
}
```

**other aspect:**

**The View**:All the data, we place within these models, is used by a view – in general, a templated view to render the web page.



If we have a Thymeleaf template file targeted by our controller's methods as their view. A parameter passed through the model will be accessible from within the thymeleaf HTML code:

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Title</title>
</head>
<body>
    <div>Web Application. Passed parameter : th:text="${message}"</div>
</body>
</html>
```

The parameter passed here is used through the syntax *${message}*, which is known as a placeholder. The Thymeleaf template engine will replace this placeholder with an actual value from an attribute of the same name passed through the model.





# 第6部分 Spring MVC - Integration







# 补充：请求参数

##  .@RequestMapping 注解

@RequestMapping

- *path,* or its aliases, *name,* and *value:* which URL the method is mapped to
- *method:* compatible HTTP methods
- *params:* filters requests based on presence, absence, or value of HTTP parameters
- *headers:* filters requests based on presence, absence, or value of HTTP headers
- *consumes:* which media types the method can consume in the HTTP request body
- *produces:* which media types the method can produce in the HTTP response body

RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。
 用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。



```kotlin
@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private MerchantConfigRepository merchantConfigService;
    @Autowired
    DealerService dealerService;
```

@RequsetMapping用在类开头，为整个类规定它的父路径。
 在方法前使用@RequsetMapping，相当于规定该调用方法的路径。



```kotlin
@RequestMapping(value = "/addDealer",method = RequestMethod.POST)
    public String addDealer(@Valid @RequestBody DealerModel dealerModel, BindingResult bindingResult) {
        return dealerService.addDealer(dealerModel);
    }
```

所以该addDealer()方法的调用路径是：



```bash
    http://127.0.0.1:9910/test/addDealer
```

------

RequestMapping注解有六个属性：

###  1、 value， method；

 value：指定请求的实际地址，指定的地址可以是URI Template 模式(?)；  （value 值 支持通配符）
 method：指定请求的method类型， GET、POST、PUT、DELETE等(一般常用POST和GET)



![img](https:////upload-images.jianshu.io/upload_images/12680402-1170d8217d2b55b7.png?imageMogr2/auto-orient/strip|imageView2/2/w/661/format/webp)

@RequestMapping使用的例子.png

### 2、 consumes，produces；

 consumes：指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;
 produces：指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回；’



### 3、 params，headers；（了解）

 params：指定request中必须包含某些参数值时，才让该方法处理。
 headers：指定request中必须包含某 些指定的header值，才能让该方法处理请求。

使用上面两个参数是 更加精确使用

```java
 @RequestMapping(value = "testParamsAndHeaders2",params = {"username","age!=10"})
    public String testParamsAndHeaders2(){
        System.out.println("testParamsAndHeaders");
        return SUCCESS;
    }

```



作者：我就要取名叫夏末
链接：https://www.jianshu.com/p/21fc73f09f41
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





###### reader

> *@GetMapping*, *@PostMapping*, *@PutMapping*, *@DeleteMapping*, and *@PatchMapping* are different variants of *@RequestMapping* with the HTTP method already set to GET, POST, PUT, DELETE, and PATCH respectively.





### 4.@PathVariable

**method argument is bound to a URI template variable**. 

```java
//We can achieve this with the name or its alias, the value argument:
@RequestMapping("/PathVariable/{id}")
public String getEmployeesById(@PathVariable("id") long ID){
    System.out.println(ID);
    return null;
}
/**If the name of the part in the template matches the name of the method argument, we don't have to specify it in the annotation:*/
@RequestMapping("/PathVariable3/{id}")
public String getEmployeesById2(@PathVariable long id){
    System.out.println(id);
    return null;
}
```

![image-20210327123728779](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327123728779.png)



## HiddenHttpMethodFilter

**HiddenHttpMethodFilter**：浏览器 form 表单只支持 GET  与 POST 请求，而DELETE、PUT 等 method 并不支 持，Spring3.0 添加了一个**过滤器**，可以将这些请求转换 为标准的 http 方法，使得支持 GET、POST、PUT 与 DELETE 请求。

### filter

![img](https://segmentfault.com/img/remote/1460000013229594?w=826&h=221)

过滤器可以做：**过滤一些敏感的字符串【规定不能出现敏感字符串】、避免中文乱码【规定Web资源都使用UTF-8编码】、权限验证【规定只有带Session或Cookie的浏览器，才能访问web资源】等等等，过滤器的作用非常大，只要发挥想象就可以有意想不到的效果**

link:https://segmentfault.com/a/1190000013211245

### 配置REST

![image-20210327133639129](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327133639129.png)



配置web.xml:

```xml
<!--配置 hiddenhttpmethodfilter 可以将psot 转化为 delete 或者 post-->
<filter>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```



配置请求:

```jsp
<form action="/springMVC/testRest/1" method="post">
    <input type="hidden" name="_method" value="PUT"/>
    <input type="submit"  value="TestRest put"/>
</form>
<br>
<br>


<form action="/springMVC/testRest/1" method="post">
    <input type="hidden" name="_method" value="PUT"/>
    <input type="submit"  value="TestRest PUT"/>

</form>
<br>
<br>
<form action="/springMVC/testRest/1" method="post">
    <input type="hidden" name="_method" value="DELETE"/>
    <input type="submit"  value="TestRest delete"/>

</form>
<br>

<form action="/springMVC/testRest/" method="post">
    <input type="submit" value="TestRest post ">
</form>
```

请求实现servlet

```java
 private static final String SUCCESS="success";
@RequestMapping(value = "/testRest/{id}",method = RequestMethod.PUT)
public String testRestPut(@PathVariable Integer id){
    System.out.println("this is put :"+id );
    return SUCCESS;
}
@RequestMapping(value = "/testRest/{id}",method = RequestMethod.DELETE)
public String testRestDelete(@PathVariable Integer id){
    System.out.println("this is delete :"+id );
    return SUCCESS;
}
@RequestMapping(value = "/testRest",method = RequestMethod.POST)
public String testRestPost(){
    System.out.println("this is post" );
    return SUCCESS;
}
@RequestMapping(value = "/testRest/{id}",method = RequestMethod.GET)
public String testRestGet(@PathVariable Integer id){
    System.out.println("this is get :"+id );
    return SUCCESS;
}
```

# 

##  @RequestParam

----

![image-20210327155305110](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327155305110.png) 

```java
@RequestMapping("/testRequestParam")
public String testRequestParam(@RequestParam(value = "username") String username,
                               @RequestParam(value = "age",required = false,defaultValue = "0") Integer age){
    System.out.println("username:" +username+" age:"+age);
    return "success";
}
```

----

## @RequestHeader

![image-20210327161209358](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327161209358.png)

```java
@RequestMapping("/testRequestHeader")
public String testRequestHeader(@RequestHeader(value = "Accept-Encoding") String acceptEncode){
    System.out.println("Accept-Encoding" + acceptEncode);
    return "success";
}
```

----

## @cookievalue 

![image-20210327161347329](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327161347329.png)

---

## 使用POJO对象绑定指定的对象值(数据封装)

Spring MVC 会按请求参数名和 POJO 属性名进行自动匹 配，自动为该对象填充属性值。支持级联属性。 如：dept.deptId、dept.address.tel 等

test代码如下

```java
@RequestMapping("testPOJO")
public String testPOJO(User user){
    System.out.println(user.toString());
    return "success";
}
```

```java
package com.yt.entitys;

public class Address {
    private String province;
    private String city;

    @Override
    public String toString() {
        return "Address{" +
                "province='" + province + '\'' +
                ", city='" + city + '\'' +
                '}';
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
```

```java
package com.yt.entitys;

public class User {
    private String username;
    private String password;
    private String email;
    private int age;
    private Address address;

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", address=" + address +
                '}';
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```html
<form action="/springMVC/testPOJO" method="post">
    username:<input type="text" name="username">
    <br>
    password:<input type="password" name="password">
    <br>
    email:
    <input type="text" name="email">
    <br>
    age:
    <input type="text" name="age">
    <br>
    province:<input type="text" name="address.province">
    <br>
    city:
    <input type="text" name="address.city">
    <br>

    <input type="submit" name="submit">

</form>
```

> ### pojo study:https://www.baeldung.com/java-pojo-class
>
> In this short tutorial, **we'll investigate the definition of “Plain Old Java Object”** or POJO for short.
>
> We'll look at how a POJO compares to a JavaBean, and how turning our POJOs into JavaBeans can be helpful.
>
> When we talk about a POJO, what we're describing is a straightforward type with no references to any particular frameworks. **A POJO has no naming convention** for our properties and methods.
>
> POJO的意义就在于它的简单而灵活性，因为它的简单和灵活，使得POJO能够任意扩展，从而胜任多个场合，也就让一个模型贯穿多个层成为现实。

### 集合如何封装

![image-20210327210159291](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327210159291.png)



----







# 4.servlet 传递参数

> 这个 不知道 是啥 问题 没 servletrequest 类

![image-20210327175413624](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327175413624.png)

```
  @RequestMapping("testServletAPI")
    public void testServletAPI(HttpServletRequest request, HttpServletResponse response, Writer out) throws IOException {
        System.out.println("sevlet"+request+response);
        out.write("hello servlet");
       return "success";
    }
```



# @RequestBody

https://www.baeldung.com/spring-request-response-body

Simply put, **the \*@RequestBody\* annotation maps the \*HttpRequest\* body to a transfer or domain object, enabling automatic deserialization** of the inbound *HttpRequest* body onto a Java object.

![image-20210327230040047](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327230040047.png)



这个注解后面有用



# 5.处理模型数据



![image-20210327230648435](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210327230648435.png)

----

## modelandview

**![image-20210328002457227](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210328002457227.png)**

```java
private static final String SUCCESS="success";
@RequestMapping("testModelAndView")
public ModelAndView testModelAndView(){
    String ViewName=SUCCESS;
    ModelAndView modelAndView=new ModelAndView(ViewName);
    //添加魔偶行数据到 ModelAndView 中
    modelAndView.addObject("time",new Date());
    System.out.println( modelAndView.toString());
    return modelAndView;
}
```

jsp:

```jsp
time:${requestScope.time}
```

## Map and Model

![image-20210328003012453](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210328003012453.png)

![image-20210328003936289](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210328003936289.png)

```java
@RequestMapping("testMap")
public String testMap(Map<String,Object> map){
    map.put("names", Arrays.asList("tom","Jerry","Mike"));
    return SUCCESS;
}
```

-----

## Session 





over













# Spring MVC Tutorial

this is Spring MVC Tutorial:https://www.baeldung.com/spring-mvc-tutorial

 **it's a module of the Spring framework dealing with the Model-View-Controller, or MVC pattern**.

Spring implements MVC with the [front controller pattern using its *DispatcherServlet*](https://www.baeldung.com/spring-controllers#Overview).

In a nutshell, the *DispatcherServlet* acts as the main controller to route requests to their intended destination. Model is nothing but the data of our application, and the view is represented by any of the [various template engines](https://www.baeldung.com/spring-template-engines). We'll look at JSPs in our example in a while.

## **Spring MVC Using Java Configuration**

## **Spring MVC Using XML Configuration**

## **Controller and Views**