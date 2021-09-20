# spring boot

> 源码的讲解有点看不下去
>
> :link: bilibili:https://www.bilibili.com/video/BV19K4y1L7MT?spm_id_from=333.788.b_636f6d6d656e74.13
>
> 笔记：https://www.yuque.com/atguigu/springboot



   

> github基础教程star 13k：文本的
>
> https://blog.didispace.com/spring-boot-learning-2x/
>
> 代码：
>
> https://github.com/dyc87112/SpringBoot-Learning





> **如何记这个笔记**
>
> 看文档 写代码 
>
> 将理解的代码 重点写下来 。 并附代码地址







----

#  **SpringBoot2核心技术-基础入门**

### 学习要求

- 熟悉Spring基础
- 熟悉Maven使用



### 环境要求

- Java8及以上
- Maven 3.3及以上：https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-system-requirements





### 学习资料

- 文档地址： https://www.yuque.com/atguigu/springboot

- - 文档不支持旧版本IE、Edge浏览器，请使用chrome或者firefox

- 视频地址： http://www.gulixueyuan.com/   https://www.bilibili.com/video/BV19K4y1L7MT?p=1
- 源码地址：https://gitee.com/leifengyang/springboot2

# **01、Spring与SpringBoot**

## 1、Spring能做什么

#### 1.1、Spring的能力

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602641710418-5123a24a-60df-4e26-8c23-1d93b8d998d9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



### 1.2、Spring的生态

https://spring.io/projects/spring-boot



覆盖了：

web开发

数据访问

安全控制

分布式

消息服务

移动开发

批处理

......

### 1.3、Spring5重大升级

#### 1.3.1、响应式编程

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602642309979-eac6fe50-dc84-49cc-8ab9-e45b13b90121.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

#### 1.3.2、内部源码设计

基于Java8的一些新特性，如：接口默认实现。重新设计源码架构。



## 2、为什么用SpringBoot



> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
>
> 
>
> 能快速创建出生产级别的Spring应用



### 2.1、SpringBoot优点

- Create stand-alone Spring applications

- - 创建独立Spring应用

- Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)

- - 内嵌web服务器

- Provide opinionated 'starter' dependencies to simplify your build configuration

- - 自动starter依赖，简化构建配置

- Automatically configure Spring and 3rd party libraries whenever possible

- - 自动配置Spring以及第三方功能

- Provide production-ready features such as metrics, health checks, and externalized configuration

- - 提供生产级别的监控、健康检查及外部化配置

- Absolutely no code generation and no requirement for XML configuration

- - 无代码生成、无需编写XML



> SpringBoot是整合Spring技术栈的一站式框架
>
> SpringBoot是简化Spring技术栈的快速开发脚手架



### 2.2、SpringBoot缺点

- 人称版本帝，迭代快，需要时刻关注变化
- 封装太深，内部原理复杂，不容易精通

## 3、时代背景

### 3.1、微服务

[James Lewis and Martin Fowler (2014)](https://martinfowler.com/articles/microservices.html)  提出微服务完整概念。https://martinfowler.com/microservices/

> In short, the **microservice architectural style** is an approach to developing a single application as a **suite of small services**, each **running in its own process** and communicating with **lightweight** mechanisms, often an **HTTP** resource API. These services are **built around business capabilities** and **independently deployable** by fully **automated deployment** machinery. There is a **bare minimum of centralized management** of these services, which may be **written in different programming languages** and use different data storage technologies.-- [James Lewis and Martin Fowler (2014)](https://martinfowler.com/articles/microservices.html)

- 微服务是一种架构风格
- 一个应用拆分为一组小型服务
- 每个服务运行在自己的进程内，也就是可独立部署和升级
- 服务之间使用轻量级HTTP交互
- 服务围绕业务功能拆分
- 可以由全自动部署机制独立部署
- 去中心化，服务自治。服务可以使用不同的语言、不同的存储技术



### 3.2、分布式

![image](https://cdn.nlark.com/yuque/0/2020/png/1613913/1599562347965-a617a866-4270-44e9-9c5b-ced552683eda.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



### 分布式的困难

- 远程调用
- 服务发现
- 负载均衡
- 服务容错
- 配置管理
- 服务监控
- 链路追踪
- 日志管理
- 任务调度
- ......



### 分布式的解决

- SpringBoot + SpringCloud



![image](https://cdn.nlark.com/yuque/0/2020/png/1613913/1599799119457-841ef47a-6585-4ca4-8e3d-8298e796012c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



### 3.3、云原生

原生应用如何上云。 Cloud Native

### 上云的困难

- 服务自愈
- 弹性伸缩
- 服务隔离
- 自动化部署
- 灰度发布
- 流量治理
- ......

### 上云的解决

![image](https://cdn.nlark.com/yuque/0/2020/png/1613913/1599563498261-8b0b4d86-bd9b-49a3-aefc-89696a375dcb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



## 4、如何学习SpringBoot

### 4.1、官网文档架构

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602654700738-b6c50c90-0649-4d62-98d3-57658caf0fdb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602654837853-48916a4f-cb5a-422c-ba7a-83b027c5bf24.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)







查看版本新特性；

https://github.com/spring-projects/spring-boot/wiki#release-notes

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602730009896-1b651f2c-133c-4f62-b21c-92a002f09e73.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

----

# 02、SpringBoot2入门

### 1、系统要求

- [Java 8](https://www.java.com/) & 兼容java14 .
- Maven 3.3+
- idea 2019.1.2



#### 1.1、maven设置

```
<mirrors>
      <mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
      </mirror>
  </mirrors>
 
  <profiles>
         <profile>
              <id>jdk-1.8</id>
              <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>1.8</jdk>
              </activation>
              <properties>
                <maven.compiler.source>1.8</maven.compiler.source>
                <maven.compiler.target>1.8</maven.compiler.target>
                <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
              </properties>
         </profile>
  </profiles>
```

### 2、HelloWorld

创建教程：diea https://blog.didispace.com/spring-boot-learning-21-1-1/

需求：浏览发送/hello请求，响应 Hello，Spring Boot 2 

#### 2.1、创建maven工程



#### 2.2、引入依赖

```
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
    </parent>


    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

    </dependencies>
```

#### 2.3、创建主程序

```
/**
 * 主程序类
 * @SpringBootApplication：这是一个SpringBoot应用
 */
@SpringBootApplication
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class,args);
    }
}
```

#### 2.4、编写业务

```
@RestController
public class HelloController {


    @RequestMapping("/hello")
    public String handle01(){
        return "Hello, Spring Boot 2!";
    }


}
```

#### 2.5、测试

### Run your application and execute requests﻿

1. Press Shift+F10 or use the ![Run](https://resources.jetbrains.com/help/img/idea/2021.1/icons.actions.execute.svg) icon in the gutter to run your application.

   By default, IntelliJ IDEA shows your running Spring Boot application in the [Run](https://www.jetbrains.com/help/idea/run-tool-window.html) tool window.

   ![The Run tool window with a running Spring Boot application](https://resources.jetbrains.com/help/img/idea/2021.1/spring-boot-demo-run-console.png)

   The **Console** tab shows the output of Spring log messages. By default, the built-in Apache Tomcat server is listening on port 8080.

直接运行main方法

#### 2.6、简化配置

application.properties

```
server.port=8888
```

#### 2.7、简化部署

```
 <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

把项目打成jar包，直接在目标服务器执行即可。

![image-20210407194600455](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210407194600455.png)

注意点：

- 取消掉cmd的快速编辑模式
- 打包后的结果：

![image-20210407194608336](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210407194608336.png)

----

# 03 Spring Boot 2.x基础教程：工程结构推荐

Spring Boot框架本身并没有对工程结构有特别的要求，但是按照最佳实践的工程结构可以帮助我们减少可能会遇见的坑，尤其是Spring包扫描机制的存在，如果您使用最佳实践的工程结构，可以免去不少特殊的配置工作。

## 典型示例



以下结构是比较推荐的package组织方式：

```
com
  +- example
    +- myproject
      +- Application.java
      |
      +- domain
      |  +- Customer.java
      |  +- CustomerRepository.java
      |
      +- service
      |  +- CustomerService.java
      |
      +- web
      |  +- CustomerController.java
      |
```



- `root package`：`com.example.myproject`，所有的类和其他package都在root package之下。
- 应用主类：`Application.java`，该类直接位于`root package`下。通常我们会在应用主类中做一些框架配置扫描等配置，我们放在root package下可以帮助程序减少手工配置来加载到我们希望被Spring加载的内容
- `com.example.myproject.domain`包：用于定义实体映射关系与数据访问相关的接口和实现
- `com.example.myproject.service`包：用于编写业务逻辑相关的接口与实现
- `com.example.myproject.web`：用于编写Web层相关的实现，比如：Spring MVC的Controller等





上面的结构中，`root package`与应用主类的位置是整个结构的关键。由于应用主类在`root package`中，所以按照上面的规则定义的所有其他类都处于`root package`下的其他子包之后。默认情况下，Spring Boot的应用主类会自动扫描`root package`以及所有子包下的所有类来进行初始化。



什么意思呢？举个例子，假设我们将`com.example.myproject.web`包与上面所述的`root package`：`com.example.myproject`放在同一级，像下面这样：

```
com
  +- example
    +- myproject
      +- Application.java
      |
      +- domain
      |  +- Customer.java
      |  +- CustomerRepository.java
      |
      +- service
      |  +- CustomerService.java
      |
    +- web
    |  +- CustomerController.java
    |
```

这个时候，应用主类`Application.java`在默认情况下就无法扫描到`com.example.myproject.web`中的Controller定义，就无法初始化Controller中定义的接口。

## 非典型结构下的初始化

那么如果，我们一定要加载非`root package`下的内容怎么办呢？

**方法一**：使用`@ComponentScan`注解指定具体的加载包，比如：

```
@SpringBootApplication
@ComponentScan(basePackages="com.example")
public class Bootstrap {

    public static void main(String[] args) {
        SpringApplication.run(Bootstrap.class, args);
    }

}
```

这种方法通过注解直接指定要扫描的包，比较直观。如果有这样的需求也是可以用的，但是原则上还是推荐以上面的典型结构来定义，这样也可以少写一些注解，代码更加简洁。





