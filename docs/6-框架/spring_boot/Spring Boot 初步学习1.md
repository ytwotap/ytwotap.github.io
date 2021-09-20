# Spring Boot 初步学习（一）

**为了 完成个人博客项目的建立 所以先初步学习下 后面再深入学习 **



[TOC]

# spring boot架构图

![img](imge\webp)

学习上面的结构

Spring Framework总共有十几个组件，其中核心组件只有三个：Core、Context 和 Beans。

组成 Spring Framework的每个模块（或组件）都可以单独存在，或者与其他一个或多个模块联合实现。每个模块的功能如下：

- Spring Core（核心容器）：核心容器提供 Spring 框架的基本功能。核心容器的主要组件是 BeanFactory，它是工厂模式的实现。BeanFactory 使用控制反转 （IOC） 模式将应用程序的配置和依赖性规范与实际的应用程序代码分开。
- Spring Context（上下文）：Spring 上下文是一个配置文件，向 Spring 框架提供上下文信息。Spring 上下文包括企业服务，例如：JNDI、EJB、电子邮件、国际化、校验和调度功能。
- Spring AOP：通过配置管理特性，Spring AOP 模块直接将面向方面的编程功能集成到了 Spring 框架中。所以，可以很容易地使 Spring 框架管理的任何对象支持 AOP。Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。通过使用 Spring AOP，不用依赖 EJB 组件，就可以将声明性事务管理集成到应用程序中。
- Spring DAO：JDBC DAO 抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理和不同数据库供应商抛出的错误消息。异常层次结构简化了错误处理，并且极大地降低了需要编写的异常代码数量（例如打开和关闭连接）。Spring DAO 的面向 JDBC 的异常遵从通用的 DAO 异常层次结构。
- Spring ORM：Spring 框架插入了若干个 ORM 框架，从而提供了 ORM 的对象关系工具，其中包括 JDO、Hibernate 和 iBatis SQL Map。所有这些都遵从 Spring 的通用事务和 DAO 异常层次结构。
- Spring Web 模块：Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文。所以，Spring 框架支持与 Jakarta Struts 的集成。Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。
- Spring MVC 框架：MVC 框架是一个全功能的构建 Web 应用程序的 MVC 实现。通过策略接口，MVC 框架变成为高度可配置的，MVC 容纳了大量视图技术，其中包括 JSP、Velocity、Tiles、iText 和 POI。

从图中可以看出，IOC 的实现包 spring-beans 和 AOP 的实现包 spring-aop 也是整个框架的基础，而 spring-core 是整个框架的核心，基础的功能都在这里。

在此基础之上，spring-context 提供上下文环境，为各个模块提供粘合作用。

在 spring-context 基础之上提供了 spring-tx 和 spring-orm包，而web部分的功能，都是要依赖spring-web来实现的。



# 如何学习好 spring boot 

**看官方文档 不懂的 标记**

**动手**

**总结**

**循环上面的** 

## 1.Spring 和Spring Boot 的关系

Spring Boot 是 集成了 Spring , 完成了从创建到应用的组件依赖导入



## 2.Spring study

### 1.[Spring Quickstart Guide](https://spring.io/quickstart)

Use [start.spring.io](https://start.spring.io/) to create a “web” project. In the “Dependencies” dialog search for and add the “web” dependency as shown in the screenshot. Hit the “Generate” button, download the zip, and unpack it into a folder on your computer.

- run command: mvnw spring-boot:run

### 2.[Guides](https://spring.io/guides)

Whatever you're building, these guides are designed to get you productive as quickly as possible – using the latest Spring project releases and techniques as recommended by the Spring team.

#### 	Getting Started Guides

##### 		a.[Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)

  - RESTfule web Service 

    		- it is [表现层状态转换]([https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2](https://zh.wikipedia.org/wiki/表现层状态转换))
      - **表现层状态转换**（[英语](https://zh.wikipedia.org/wiki/英语)：**Representational State Transfer**，[缩写](https://zh.wikipedia.org/wiki/縮寫)：**REST**）是[Roy Thomas Fielding](https://zh.wikipedia.org/w/index.php?title=Roy_Thomas_Fielding&action=edit&redlink=1)博士于2000年在他的博士论文[[1\]](https://zh.wikipedia.org/wiki/表现层状态转换#cite_note-Fielding-Ch5-1)中提出来的一种[万维网](https://zh.wikipedia.org/wiki/万维网)[软件架构](https://zh.wikipedia.org/wiki/软件架构)风格，目的是便于不同软件/程序在网络（例如互联网）中互相传递信息。表现层状态转换是根基于[超文本传输协议（HTTP）](https://zh.wikipedia.org/wiki/超文本传输协议)之上而确定的一组约束和属性，是一种设计提供万维网络服务的[软件构建风格](https://zh.wikipedia.org/wiki/軟件架構)。符合或兼容于这种架构风格（简称为 REST 或 RESTful）的网络服务，允许客户端发出以[统一资源标识符](https://zh.wikipedia.org/wiki/统一资源标志符)访问和操作网络资源的请求，而与预先定义好的无状态操作集一致化

- [Apache Maven](https://zh.wikipedia.org/wiki/Apache_Maven)

  - 软件项目管理和自动构建该工具

-  companion annotations for other HTTP verbs 

  -  There are companion annotations for other HTTP verbs (e.g. `@PostMapping` for POST). There is also a `@RequestMapping` annotation that they all derive from, and can serve as a synonym (e.g. `@RequestMapping(method=GET)`).

- ```java
  @RestController
  public class GreetingController {
  
      private static final String template = "Hello, %s!";
      private final AtomicLong counter = new AtomicLong();
  
      @GetMapping("/greeting")
      public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
          return new Greeting(counter.incrementAndGet(), String.format(template, name));
          
      }
  }
  ```

- @RestController

  - This code uses Spring [`@RestController`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RestController.html) annotation, which marks the class as a controller where every method returns a domain object instead of a view. It is shorthand for including both `@Controller` and `@ResponseBody`.

- ```java
  package com.example.restservice;
  
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  
  @SpringBootApplication
  public class RestServiceApplication {
  
      public static void main(String[] args) {
          SpringApplication.run(RestServiceApplication.class, args);
      }
  
  }
  ```

  - `@SpringBootApplication` is a convenience annotation that adds all of the following:
    - `@Configuration`: Tags the class as a source of bean definitions for the application context.
    - `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    - `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
  
  

### SUMMARY

Congratulations! You have just developed a RESTful web service with Spring.



