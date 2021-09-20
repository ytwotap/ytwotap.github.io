这章主要是spring boot 文档学习 记录

[TOC]



# [Spring Boot](https://spring.io/projects/spring-boot) 文档

[Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/)



# spring [framework](https://docs.spring.io/spring/docs/5.3.0-SNAPSHOT/spring-framework-reference/overview.html#overview-spring)

## Spring Framework Overview

### Design Philosophy

When you learn about a framework, it’s important to know not only what it does but what principles it follows. Here are the guiding principles of the Spring Framework:

- Provide choice at every level. Spring lets you defer design decisions as late as possible. For example, you can switch persistence providers through configuration without changing your code. The same is true for many other infrastructure concerns and integration with third-party APIs.
- Accommodate diverse perspectives. Spring embraces flexibility and is not opinionated about how things should be done. It supports a wide range of application needs with different perspectives.
- Maintain strong backward compatibility. Spring’s evolution has been carefully managed to force few breaking changes between versions. Spring supports a carefully chosen range of JDK versions and third-party libraries to facilitate maintenance of applications and libraries that depend on Spring.
- Care about API design. The Spring team puts a lot of thought and time into making APIs that are intuitive and that hold up across many versions and many years.
- Set high standards for code quality. The Spring Framework puts a strong emphasis on meaningful, current, and accurate javadoc. It is one of very few projects that can claim clean code structure with no circular dependencies between packages.

# [Spring IOC容器基本原理](https://www.cnblogs.com/linjiqin/p/3407126.html)

**总结 : ioc 就是 自动 化配置对象 ,通过xml 文件 ,实现 .**

**重要接口实现是 : BeanFactory**

让我们来看下IOC容器到底是如何工作。在此我们以xml配置方式来分析一下：
一、准备配置文件：就像前边Hello World配置文件一样，在配置文件中声明Bean定义也就是为Bean配置元数据。
二、由IOC容器进行解析元数据： IOC容器的Bean Reader读取并解析配置文件，根据定义生成BeanDefinition配置元数据对象，IOC容器根据BeanDefinition进行实例化、配置及组装Bean。
三、实例化IOC容器：由客户端实例化容器，获取需要的Bean。

整个过程是不是很简单，执行过程如下，其实IOC容器很容易使用，主要是如何进行Bean定义。下一章我们详细介绍定义Bean。
![img](D:\src\Typora记录\spring boot\imge\04231317-d581eb1d20b84070a7f6fc43ddf1df91.jpg)

**2.2.5 小结**
除了测试程序的代码外，也就是程序入口，所有代码都没有出现Spring任何组件，而且所有我们写的代码没有实现框架拥有的接口，因而能非常容易的替换掉Spring，是不是非入侵。
客户端代码完全面向接口编程，无需知道实现类，可以通过修改配置文件来更换接口实现，客户端代码不需要任何修改。是不是低耦合。
如果在开发初期没有真正的实现，我们可以模拟一个实现来测试，不耦合代码，是不是很方便测试。
Bean之间几乎没有依赖关系，是不是很容易重用。



# spring boot [实例](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/getting-started.html#getting-started-whats-next)

# java[注解](https://zh.wikipedia.org/wiki/Java%E6%B3%A8%E8%A7%A3)

**Java注解**又称**Java标注**，是[Java](https://zh.wikipedia.org/wiki/Java)语言5.0版本开始支持加入[源代码](https://zh.wikipedia.org/wiki/源代码)的特殊语法[元数据](https://zh.wikipedia.org/wiki/元数据)[[1\]](https://zh.wikipedia.org/wiki/Java注解#cite_note-1)。

元数据是指“描述数据的数据”。虽然说源自于[希腊](https://zh.wikipedia.org/wiki/希臘文)[介词](https://zh.wikipedia.org/wiki/介詞)和[前缀](https://zh.wikipedia.org/wiki/前綴) *μετά-* 的英文前缀“meta”代表“之后”或“之下”的意思，在此处实际上是使用[知识论](https://zh.wikipedia.org/wiki/知識論)中“关于”的意思。元数据被定义为提供某些数据单方面或多方面信息的数据；它被用来概述数据的基础信息，以简化查找过程与方便使用[[4\]](https://zh.wikipedia.org/wiki/元数据#cite_note-4)。例如：

- 创建数据的方法
- 数据的用途
- 创建的时间与日期
- 数据的创建者或作者
- 数据被创建在[电脑网络](https://zh.wikipedia.org/wiki/电脑网络)的何处
- 用作[标准](https://zh.wikipedia.org/wiki/标准)
- 文件大小

# 注解 annotations

```java
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableAutoConfiguration
public class Example {

    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        SpringApplication.run(Example.class, args);
    }

}
```

The `@RequestMapping` annotation provides “routing” information. It tells Spring that any HTTP request with the `/` path should be mapped to the `home` method. The `@RestController` annotation tells Spring to render the resulting string directly back to the caller.

The second class-level annotation is `@EnableAutoConfiguration`. This annotation tells Spring Boot to “guess” how you want to configure Spring, based on the jar dependencies that you have added. Since `spring-boot-starter-web` added Tomcat and Spring MVC, the auto-configuration assumes that you are developing a web application and sets up Spring accordingly.

## main

The final part of our application is the `main` method. This is just a standard method that follows the Java convention for an application entry point. Our main method delegates to Spring Boot’s `SpringApplication` class by calling `run`. `SpringApplication` bootstraps our application, starting Spring, which, in turn, starts the auto-configured Tomcat web server. We need to pass `Example.class` as an argument to the `run` method to tell `SpringApplication` which is the primary Spring component. The `args` array is also passed through to expose any command-line arguments.



## 执行jar 

idea 中的mevn 有 mvn package

![image-20200519111328258](D:\src\Typora记录\spring boot\imge\image-20200519111328258.png)