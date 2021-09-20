

# @Aspect 注解使用详解

AOP为Aspect Oriented Programming的缩写，意为：面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术.AOP是OOP的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

在spring AOP中业务逻辑仅仅只关注业务本身，将日志记录，性能统计，安全控制，事务处理，异常处理等代码从业务逻辑代码中划分出来，通过对这些行为的分离，我们希望可以将它们独立到非指导业务逻辑的方法中，进而改变这些行为的时候不影响业务逻辑的代码。

相关注解介绍：

@Aspect:作用是把当前类标识为一个切面供容器读取

@Pointcut：Pointcut是植入Advice的触发条件。每个Pointcut的定义包括2部分，一是表达式，二是方法签名。方法签名必须是 public及void型。可以将Pointcut中的方法看作是一个被Advice引用的助记符，因为表达式不直观，因此我们可以通过方法签名的方式为 此表达式命名。因此Pointcut中的方法只需要方法签名，而不需要在方法体内编写实际代码。
@Around：环绕增强，相当于MethodInterceptor
@AfterReturning：后置增强，相当于AfterReturningAdvice，方法正常退出时执行
@Before：标识一个前置增强方法，相当于BeforeAdvice的功能，相似功能的还有
@AfterThrowing：异常抛出增强，相当于ThrowsAdvice
@After: final增强，不管是抛出异常或者正常退出都会执行
使用pointcut代码：

package com.aspectj.test.advice;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class AdviceTest {
    @Around("execution(* com.abc.service.*.many*(..))")
    public Object process(ProceedingJoinPoint point) throws Throwable {
        System.out.println("@Around：执行目标方法之前...");
        //访问目标方法的参数：
        Object[] args = point.getArgs();
        if (args != null && args.length > 0 && args[0].getClass() == String.class) {
            args[0] = "改变后的参数1";
        }
        //用改变后的参数执行目标方法
        Object returnValue = point.proceed(args);
        System.out.println("@Around：执行目标方法之后...");
        System.out.println("@Around：被织入的目标对象为：" + point.getTarget());
        return "原返回值：" + returnValue + "，这是返回结果的后缀";
    }
    
    @Before("execution(* com.abc.service.*.many*(..))")
    public void permissionCheck(JoinPoint point) {
        System.out.println("@Before：模拟权限检查...");
        System.out.println("@Before：目标方法为：" + 
                point.getSignature().getDeclaringTypeName() + 
                "." + point.getSignature().getName());
        System.out.println("@Before：参数为：" + Arrays.toString(point.getArgs()));
        System.out.println("@Before：被织入的目标对象为：" + point.getTarget());
    }
    
    @AfterReturning(pointcut="execution(* com.abc.service.*.many*(..))", 
        returning="returnValue")
    public void log(JoinPoint point, Object returnValue) {
        System.out.println("@AfterReturning：模拟日志记录功能...");
        System.out.println("@AfterReturning：目标方法为：" + 
                point.getSignature().getDeclaringTypeName() + 
                "." + point.getSignature().getName());
        System.out.println("@AfterReturning：参数为：" + 
                Arrays.toString(point.getArgs()));
        System.out.println("@AfterReturning：返回值为：" + returnValue);
        System.out.println("@AfterReturning：被织入的目标对象为：" + point.getTarget());
        
    }
    
    @After("execution(* com.abc.service.*.many*(..))")
    public void releaseResource(JoinPoint point) {
        System.out.println("@After：模拟释放资源...");
        System.out.println("@After：目标方法为：" + 
                point.getSignature().getDeclaringTypeName() + 
                "." + point.getSignature().getName());
        System.out.println("@After：参数为：" + Arrays.toString(point.getArgs()));
        System.out.println("@After：被织入的目标对象为：" + point.getTarget());
    }
}
使用annotation代码：

//注解实体类
package com.trip.demo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD })
public @interface SMSAndMailSender {
    /*短信模板String格式化串*/
    String value() default "";

    String smsContent() default "";
     
    String mailContent() default "";
    /*是否激活发送功能*/
    boolean isActive() default true;
    /*主题*/
    String subject() default "";
}

 

//切面类
@Aspect
@Component("smsAndMailSenderMonitor")
public class SMSAndMailSenderMonitor {

    private Logger logger = LoggerFactory.getLogger(SMSAndMailSenderMonitor.class);

 



    /**
     * 在所有标记了@SMSAndMailSender的方法中切入
     * @param joinPoint
     * @param result
     */
    @AfterReturning(value="@annotation(com.trip.demo.SMSAndMailSender)", returning="result")//有注解标记的方法，执行该后置返回
    public void afterReturning(JoinPoint joinPoint , Object result//注解标注的方法返回值) {
        MethodSignature ms = (MethodSignature) joinPoint.getSignature();
        Method method = ms.getMethod();
        boolean active = method.getAnnotation(SMSAndMailSender.class).isActive();
        if (!active) {
            return;
        }
        String smsContent = method.getAnnotation(SMSAndMailSender.class).smsContent();
        String mailContent = method.getAnnotation(SMSAndMailSender.class).mailContent();
        String subject = method.getAnnotation(SMSAndMailSender.class).subject();
       
    }


​    

    /**
     * 在抛出异常时使用
     * @param joinPoint
     * @param ex
     */
    @AfterThrowing(value="@annotation(com.trip.order.monitor.SMSAndMailSender)",throwing = "ex")
    public void afterThrowing(JoinPoint joinPoint, Throwable ex//注解标注的方法抛出的异常) {
        MethodSignature ms = (MethodSignature) joinPoint.getSignature();
        Method method = ms.getMethod();
        String subject = method.getAnnotation(SMSAndMailSender.class).subject();
        
    }

}


//实体类中使用该注解标注方法
@Service("testService ")
public class TestService {


    @Override
    @SMSAndMailSender(smsContent = "MODEL_SUBMIT_SMS", mailContent =     
    "MODEL_SUPPLIER_EMAIL", subject = "MODEL_SUBJECT_EMAIL")
    public String test(String param) {
        return "success";
    }
｝


注意，记得在配置文件中加上：

<aop:aspectj-autoproxy proxy-target-class="true"/>
————————————————
版权声明：本文为CSDN博主「狂丰」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/fz13768884254/article/details/83538709







# jpa[动态查询](https://www.jianshu.com/p/45ad65690e33)

# Spring Data JPA 动态查询

0.2232017.04.01 01:25:45字数 680阅读 12,329

### Spring Data JPA 动态查询的两种方法

### 前言

一般在写业务接口的过程中，很有可能需要实现可以动态组合各种查询条件的接口。如果我们根据一种查询条件组合一个方法的做法来写，那么将会有大量方法存在，繁琐，维护起来相当困难。想要实现动态查询，其实就是要实现拼接SQL语句。无论实现如何复杂，基本都是包括select的**字段**，from或者join的**表**，where或者having的**条件**。在Spring Data JPA有两种方法可以实现查询条件的动态查询，两种方法都用到了Criteria API。

### Criteria API

这套API可用于构建对数据库的查询。
**类型安全**。通过定义元数据模型，在程序编译阶段就可以对类型进行检查，不像SQL需要与Mysql进行交互后才能发现类型问题。
如下即为元数据模型。创建一个元模型类，类名最后一个字符为下划线，内部的成员变量与UserInfo.class这个实体类的属性值相对应。



```java
@StaticMetamodel(UserInfo.class)
public class UserInfo_ {
    public static volatile SingularAttribute<UserInfo, Integer> userId;
    public static volatile SingularAttribute<UserInfo, String> name;
    public static volatile SingularAttribute<UserInfo, Integer> age;
    public static volatile SingularAttribute<UserInfo, Long> high;
}
```

**可移植**。API并不依赖具体的数据库，可以根据数据库类型的不同生成对应数据库类型的SQL，所以其为可移植的。
**面向对象**。Criteria API是使用的是各种类和对象如CriteriaQuery、Predicate等构建查询，是面向对象的。而如果直接书写SQL则相对于面向的是字符串。

### 第一种:通过JPA的Criteria API实现

1. EntityManager获取CriteriaBuilder
2. CriteriaBuilder创建CriteriaQuery
3. CriteriaQuery指定要查询的表，得到Root<UserInfo>，Root代表要查询的表
4. CriteriaBuilder创建条件Predicate，Predicate相对于SQL的where条件，多个Predicate可以进行与、或操作。
5. 通过EntityManager创建TypedQuery
6. TypedQuery执行查询，返回结果



```java
public class UserInfoExtendDao {

    @PersistenceContext(unitName = "springJpa")
    EntityManager em;

    public List<UserInfo> getUserInfo(String name,int age,int high) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserInfo> query = cb.createQuery(UserInfo.class);

        //from
        Root<UserInfo> root = query.from(UserInfo.class);

        //where
        Predicate p1 = null;
        if(name!=null) {
            Predicate p2 = cb.equal(root.get(UserInfo_.name),name);
            if(p1 != null) {
                p1 = cb.and(p1,p2);
            } else {
                p1 = p2;
            }
        }

        if(age!=0) {
            Predicate p2 = cb.equal(root.get(UserInfo_.age), age);
            if(p1 != null) {
                p1 = cb.and(p1,p2);
            } else {
                p1 = p2;
            }
        }

        if(high!=0) {
            Predicate p2 = cb.equal(root.get(UserInfo_.high), high);
            if(p1 != null) {
                p1 = cb.and(p1,p2);
            } else {
                p1 = p2;
            }
        }
        query.where(p1);

        List<UserInfo> userInfos = em.createQuery(query).getResultList();
        return userInfos;
    }
}
```

### 第二种:DAO层接口实现JpaSpecificationExecutor<T>接口

JpaSpecificationExecutor如下，方法参数Specification接口有一个方法toPredicate，返回值正好是Criteria API中的Predicate，而Predicate相对于SQL的where条件。与上一个方法相比，这种写法不需要指定查询的表是哪一张，也不需要自己通过Criteria API实现排序和分页，只需要通过新建Pageable、Sort对象并传参给findAll方法即可，简便一些。



```java
public interface JpaSpecificationExecutor<T> {
    T findOne(Specification<T> spec);
    List<T> findAll(Specification<T> spec);
    Page<T> findAll(Specification<T> spec, Pageable pageable);
    List<T> findAll(Specification<T> spec, Sort sort);
    long count(Specification<T> spec);
}
```

UserInfoDao实现JpaSpecificationExecutor



```java
public interface UserInfoDao 
      extends PagingAndSortingRepository<UserInfo, String>, JpaSpecificationExecutor<UserInfo> {}
```

实现Specification



```java
 public static Specification<UserInfo> getSpec(final String name,final int age,final int high) {
        return new Specification<UserInfo>() {
            @Override
            public Predicate toPredicate(Root<UserInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Predicate p1 = null;
                if(name!=null) {
                    Predicate p2 = cb.equal(root.get(UserInfo_.name),name);
                    if(p1 != null) {
                        p1 = cb.and(p1,p2);
                    } else {
                        p1 = p2;
                    }
                }

                if(age!=0) {
                    Predicate p2 = cb.equal(root.get(UserInfo_.age), age);
                    if(p1 != null) {
                        p1 = cb.and(p1,p2);
                    } else {
                        p1 = p2;
                    }
                }

                if(high!=0) {
                    Predicate p2 = cb.equal(root.get(UserInfo_.high), high);
                    if(p1 != null) {
                        p1 = cb.and(p1,p2);
                    } else {
                        p1 = p2;
                    }
                }

                return p1;
            }
        };
    }
```

### Github代码

[https://github.com/deeplinux/springdatajpademo](https://link.jianshu.com/?t=https://github.com/deeplinux/springdatajpademo)

### 参考资料

[封装JPA(Hibernate)动态查询（CriteriaQuery）](https://link.jianshu.com/?t=https://www.oschina.net/code/snippet_1864608_37194)
[JPA criteria 查询:类型安全与面向对象](https://link.jianshu.com/?t=https://my.oschina.net/zhaoqian/blog/133500)





# Spring Boot [Model](http://zetcode.com/springboot/model/)

Spring is a popular Java application framework and Spring Boot is an evolution of Spring that helps create stand-alone, production-grade Spring based applications easily.

<iframe frameborder="0" src="https://f92d61dfe664bcbb5ce851fdebec18be.safeframe.googlesyndication.com/safeframe/1-0-37/html/container.html" id="google_ads_iframe_/232881841/ZETC_728v_1_0" title="3rd party ad content" name="" scrolling="no" marginwidth="0" marginheight="0" width="728" height="90" data-is-safeframe="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" data-google-container-id="1" data-load-complete="true" style="box-sizing: inherit; border: 0px; vertical-align: bottom;"></iframe>

## MVC

MVC (Model-View-Controller) is a software architecture pattern, which separates application into three parts: model, view, and controller. The model represents a Java object carrying data. The view visualizes the data that the model contains. The controller manages the data flow into model object and updates the view whenever data changes; it keeps view and model separate.

## Spring MVC

Spring MVC is the original web framework built on the Servlet API. It is build on the MVC design pattern. Spring Framework 5.0 introduced a parallel reactive stack web framework called *Spring WebFlux*.

## Model, ModelMap, ModelAndView

`Model`, `ModelMap`, and `ModelAndView` are used to define a model in a Spring MVC application. `Model` defines a holder for model attributes and is primarily designed for adding attributes to the model. `ModelMap` is an extension of `Model` with the ability to store attributes in a map and chain method calls. `ModelAndView` is a holder for a model and a view; it allows to return both model and view in one return value.

## Spring Boot Model example

The following simple web application uses `Model`, `ModelMap`, and `ModelAndView` in the controller methods. The model holds application data, which is displayed in the view. We use the Freemaker library for the view layer.

```
pom.xml
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── controller
│   │               └── MyController.java
│   └── resources
│       ├── application.properties
│       ├── static
│       │   └── index.html
│       └── templates
│           └── show.ftlh
└── test
    └── java
```

This is the project structure of the Spring application.

pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.zetcode</groupId>
    <artifactId>springbootmodelex</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.2.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-freemarker</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

This is the Maven `pom.xml` file. The `spring-boot-starter-parent` is a parent POM providing dependency and plugin management for applications built with Maven. The `spring-boot-starter-freemarker` is a dependency for the Freemarker template engine. This dependency will also have the Spring MVC included in the project. The `spring-boot-maven-plugin` packages Spring applications into executable JAR or WAR archives.

resources/application.properties

```
spring.main.banner-mode=off
spring.main.log-startup-info=false

mymessage=Hello there
```

The `application.properties` is the main configuration file in Spring Boot. We turn off the Spring banner and startup logging of the Spring framework. The `mymessage` property contains the message.

com/zetcode/MyController.java

```
package com.zetcode.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

@Controller
public class MyController {

    @Value("${mymessage}")
    private String message;

    @GetMapping("/getMessage")
    public String getMessage(Model model) {

        model.addAttribute("message", message);

        return "show";
    }

    @GetMapping("/getMessage2")
    public ModelAndView getMessage() {

        var mav = new ModelAndView();

        mav.addObject("message", message);
        mav.setViewName("show");

        return mav;
    }

    @GetMapping("/getMessageAndTime")
    public String getMessageAndTime(ModelMap map) {

        var ldt = LocalDateTime.now();

        var fmt = DateTimeFormatter.ofLocalizedDateTime(
                FormatStyle.MEDIUM);

        fmt.withLocale(new Locale("sk", "SK"));
        fmt.withZone(ZoneId.of("CET"));
        String time = fmt.format(ldt);

        map.addAttribute("message", message).addAttribute("time", time);

        return "show";
    }
}
```

This is `MyController`. It has three methods that respond to client requests.

```
@Controller
public class MyController {
```

`MyController` is annotated with the `@Controller` annotation.

```
@Value("${mymessage}")
private String message;
```

With the `@Value` annotation, we insert the `mymessage` property from the `application.properties` file into the `message` attribute.

```
@GetMapping("/getMessage")
public String getMessage(Model model) {

    model.addAttribute("message", message);

    return "show";
}
```

The `@GetMapping` maps the `/getMessage` URL pattern to the `getMessage()` method. In the `getMessage()` method, we use the `Model`. It receives a `message` attribute with the `addAttribute()` method. The return keyword returns the name of the view, which will be resolved to `show.ftl`, because we use the Freemarker template system.

```
@GetMapping("/getMessage2")
public ModelAndView getMessage() {

    var mav = new ModelAndView();
    mav.addObject("message", message);
    mav.setViewName("show");

    return mav;
}
```

In the second case, we use the `ModelAndView`. We use `addObject()` and `setViewName()` to add the model data and the view name. The method returns `ModelAndView` object.

```
@GetMapping("/getMessageAndTime")
public String getMessageAndTime(ModelMap map) {

    var ldt = LocalDateTime.now();

    var fmt = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);

    fmt.withLocale(new Locale("sk", "SK"));
    fmt.withZone(ZoneId.of("CET"));

    var time = fmt.format(ldt);

    map.addAttribute("message", message).addAttribute("time", time);

    return "show";
}
```

In the `getMessageAndTime()` method, we use `ModelMap`. The model map receives two attributes: message and time.

resources/static/index.html

```
<!DOCTYPE html>
<html>
    <head>
        <title>Home page</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <ul>
            <li><a href="getMessage">Get message</a></li>
            <li><a href="getMessage2">Get message 2</a></li>
            <li><a href="getMessageAndTime">Get message and time</a></li>
        </ul>
    </body>
</html>
```

This is the home page. It contains three links that call the Spring controller methods. It is a static resource and is located in the predefined `src/main/resources/static` directory.

resources/templates/show.ftlh

```
<!DOCTYPE html>
<html>
    <head>
        <title>Message</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <p>
            Message: ${message}
        </p>

        <#if time??>
            <p>Date and time: ${time}</p>
        </#if>

    </body>
</html>
```

The `show.ftl` is a Freemarker template file. It is located in the predefined `src/main/resources/templates` directory. It outputs the message and optionally the time with the `${}` syntax.

com/zetcode/Application.java

```
package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

`Application` is the entry point which sets up Spring Boot application. The `@SpringBootApplication` annotation enables auto-configuration and component scanning. During the scanning process, the `@Controller` annotation is looked up and a Spring bean is created from the `MyController` class.

```
$ mvn -q spring-boot:run
```

After we start the application, we navigate to `localhost:8080`.

In this tutorial, we have have worked with a model in a Spring application.



# idea也能使用数据库

![image-20200713171356349](D:\src\TyporaRecord\spring boot\images\idea database.png)

# [form 表单](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)

**HTML `<form>` 元素**表示文档中的一个区域，此区域包含交互控件，用于向 Web 服务器提交信息。

## [Form 表单提交知识的总结（全）](https://juejin.im/post/5bc6aa8be51d450e9943804d)

以下几点需要特别注意

1. form 的提交行为需要通过type=submit实现
2. form 中的method 属性不指定时， form 默认的提交方式为 get请求。
3. form 表单的提交后会有默认行为，会跳转刷新到action 的页面
4. form 表单的提交方式，==请求头默认的content-type 为 x-www-form-urlencoded==
5. 当一个form 表单内部，所有的input 中只有一个 type='text' 的时候，enter 键会有默认的提交行为（注意前提条件）。



作者：不做祖国的韭菜
链接：https://juejin.im/post/5bc6aa8be51d450e9943804d
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。