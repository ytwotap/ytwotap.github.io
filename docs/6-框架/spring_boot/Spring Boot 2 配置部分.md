# 配置文件详解

[Spring Boot 2.x基础教程：配置文件详解](http://blog.didispace.com/spring-boot-learning-21-1-3/)****

在[快速入门](http://blog.didispace.com/spring-boot-learning-21-1-1/)一节中，我们轻松的实现了一个简单的RESTful API应用，体验了一下Spring Boot给我们带来的诸多优点，我们用非常少的代码量就成功的实现了一个Web应用，这是传统的Spring应用无法办到的，虽然我们在实现Controller时用到的代码是一样的，但是在配置方面，相信大家也注意到了，在上面的例子中，除了Maven的配置之后，就没有引入任何的配置。

这就是之前我们所提到的，Spring Boot针对我们常用的开发场景提供了一系列自动化配置来减少原本复杂而又几乎很少改动的模板化配置内容。但是，我们还是需要去了解如何在Spring Boot中修改这些自动化的配置内容，以应对一些特殊的场景需求，比如：我们在同一台主机上需要启动多个基于Spring Boot的web应用，若我们不为每个应用指定特别的端口号，那么默认的8080端口必将导致冲突。

如果您还有在读我的[Spring Cloud系列教程](http://blog.didispace.com/spring-cloud-learning/)，其实有大量的工作都会是针对配置文件的。所以我们有必要深入的了解一些关于Spring Boot中的配置文件的知识，比如：它的配置方式、如何实现多环境配置，配置信息的加载顺序等。

## 配置基础

在[快速入门](http://blog.didispace.com/spring-boot-learning-21-1-1/)示例中，我们介绍Spring Boot的工程结构时，有提到过 `src/main/resources`目录是Spring Boot的配置目录，所以我们要为应用创建配置个性化配置时，就是在该目录之下。

Spring Boot的默认配置文件位置为： `src/main/resources/application.properties`。关于Spring Boot应用的配置内容都可以集中在该文件中了，根据我们引入的不同Starter模块，可以在这里定义诸如：容器端口名、数据库链接信息、日志级别等各种配置信息。比如，我们需要自定义web模块的服务端口号，可以在`application.properties`中添加`server.port=8888`来指定服务端口为8888，也可以通过`spring.application.name=hello`来指定应用名（该名字在Spring Cloud应用中会被注册为服务名）。

Spring Boot的配置文件除了可以使用传统的properties文件之外，还支持现在被广泛推荐使用的YAML文件。

> YAML（英语发音：/ˈjæməl/，尾音类似camel骆驼）是一个可读性高，用来表达资料序列的格式。YAML参考了其他多种语言，包括：C语言、Python、Perl，并从XML、电子邮件的数据格式（RFC 2822）中获得灵感。Clark Evans在2001年首次发表了这种语言，另外Ingy döt Net与Oren Ben-Kiki也是这语言的共同设计者。目前已经有数种编程语言或脚本语言支援（或者说解析）这种语言。YAML是”YAML Ain’t a Markup Language”（YAML不是一种标记语言）的递回缩写。在开发的这种语言时，YAML 的意思其实是：”Yet Another Markup Language”（仍是一种标记语言），但为了强调这种语言以数据做为中心，而不是以标记语言为重点，而用反向缩略语重新命名。AML的语法和其他高阶语言类似，并且可以简单表达清单、散列表，标量等资料形态。它使用空白符号缩排和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种设定档、倾印除错内容、文件大纲（例如：许多电子邮件标题格式和YAML非常接近）。尽管它比较适合用来表达阶层式（hierarchical model）的数据结构，不过也有精致的语法可以表示关联性（relational model）的资料。由于YAML使用空白字元和分行来分隔资料，使得它特别适合用grep／Python／Perl／Ruby操作。其让人最容易上手的特色是巧妙避开各种封闭符号，如：引号、各种括号等，这些符号在巢状结构时会变得复杂而难以辨认。 —— 维基百科

YAML采用的配置格式不像properties的配置那样以单纯的键值对形式来表示，而是以类似大纲的缩进形式来表示。比如：下面的一段YAML配置信息

YAML采用的配置格式不像properties的配置那样以单纯的键值对形式来表示，而是以类似大纲的缩进形式来表示。比如：下面的一段YAML配置信息

```
environments:
    dev:
        url: http://dev.bar.com
        name: Developer Setup
    prod:
        url: http://foo.bar.com
        name: My Cool App
```

与其等价的properties配置如下。

```
environments.dev.url=http://dev.bar.com
environments.dev.name=Developer Setup
environments.prod.url=http://foo.bar.com
environments.prod.name=My Cool App
```

通过YAML的配置方式，我们可以看到配置信息利用阶梯化缩进的方式，其结构显得更为清晰易读，同时配置内容的字符量也得到显著的减少。除此之外，YAML还可以在一个单个文件中通过使用`spring.profiles`属性来定义多个不同的环境配置。例如下面的内容，在指定为test环境时，`server.port`将使用8882端口；而在prod环境，`server.port`将使用8883端口；如果没有指定环境，`server.port`将使用8881端口。

```
server:
  port: 8881
---
spring:
  profiles: test
server:
  port: 8882
---
spring:
  profiles: prod
server:
  port: 8883
```

**注意：YAML目前还有一些不足，它无法通过`@PropertySource`注解来加载配置。但是，YAML加载属性到内存中保存的时候是有序的，所以当配置文件中的信息需要具备顺序含义时，YAML的配置方式比起properties配置文件更有优势。**YAML采用的配置格式不像properties的配置那样以单纯的键值对形式来表示，而是以类似大纲的缩进形式来表示。比如：下面的一段YAML配置信息

```
environments:
    dev:
        url: http://dev.bar.com
        name: Developer Setup
    prod:
        url: http://foo.bar.com
        name: My Cool App
```

与其等价的properties配置如下。

```
environments.dev.url=http://dev.bar.com
environments.dev.name=Developer Setup
environments.prod.url=http://foo.bar.com
environments.prod.name=My Cool App
```

通过YAML的配置方式，我们可以看到配置信息利用阶梯化缩进的方式，其结构显得更为清晰易读，同时配置内容的字符量也得到显著的减少。除此之外，YAML还可以在一个单个文件中通过使用`spring.profiles`属性来定义多个不同的环境配置。例如下面的内容，在指定为test环境时，`server.port`将使用8882端口；而在prod环境，`server.port`将使用8883端口；如果没有指定环境，`server.port`将使用8881端口。

```
server:
  port: 8881
---
spring:
  profiles: test
server:
  port: 8882
---
spring:
  profiles: prod
server:
  port: 8883
```

**注意：YAML目前还有一些不足，它无法通过`@PropertySource`注解来加载配置。但是，YAML加载属性到内存中保存的时候是有序的，所以当配置文件中的信息需要具备顺序含义时，YAML的配置方式比起properties配置文件更有优势。**

### 自定义参数

> 不知道为啥在 yaml中自定义参数失败

我们除了可以在Spring Boot的配置文件中设置各个Starter模块中预定义的配置属性，也可以在配置文件中定义一些我们需要的自定义属性。比如在`application.properties`中添加：

```
book.name=SpringCloudInAction
book.author=ZhaiYongchao
```

然后，在应用中我们可以通过`@Value`注解来加载这些自定义的参数，比如：

```java
@Component
public class Book {

    @Value("${book.name}")
    private String name;
    @Value("${book.author}")
    private String author;

    // 省略getter和setter
}
```

`@Value`注解加载属性值的时候可以支持两种表达式来进行配置：

- 一种是我们上面介绍的PlaceHolder方式，格式为 `${...}`，大括号内为PlaceHolder
- 另外还可以使用SpEL表达式（Spring Expression Language）， 格式为 `#{...}`，大括号内为SpEL表达式

### 参数引用

在`application.properties`中的各个参数之间，我们也可以直接通过使用PlaceHolder的方式来进行引用，就像下面的设置：

```properties
book.name=SpringCloud
book.author=ZhaiYongchao
book.desc=${book.author}  is writing《${book.name}》
```

`book.desc`参数引用了上文中定义的`book.name`和`book.author`属性，最后该属性的值就是`ZhaiYongchao is writing《SpringCloud》`。

### 使用随机数

在一些特殊情况下，有些参数我们希望它每次加载的时候不是一个固定的值，比如：密钥、服务端口等。在Spring Boot的属性配置文件中，我们可以通过使用`${random}`配置来产生随机的int值、long值或者string字符串，这样我们就可以容易的通过配置来属性的随机生成，而不是在程序中通过编码来实现这些逻辑。

`${random}`的配置方式主要有一下几种，读者可作为参考使用。

```properties
# 随机字符串
com.didispace.blog.value=${random.value}
# 随机int
com.didispace.blog.number=${random.int}
# 随机long
com.didispace.blog.bignumber=${random.long}
# 10以内的随机数
com.didispace.blog.test1=${random.int(10)}
# 10-20的随机数
com.didispace.blog.test2=${random.int[10,20]}
```

**该配置方式可以用于设置应用端口等场景，避免在本地调试时出现端口冲突的麻烦**

### 命令行参数

回顾一下在本章的快速入门中，我们还介绍了如何启动Spring Boot应用，其中提到了使用命令`java -jar`命令来启动的方式。该命令除了启动应用之外，还可以在命令行中来指定应用的参数，比如：`java -jar xxx.jar --server.port=8888`，直接以命令行的方式，来设置server.port属性，另启动应用的端口设为8888。

在命令行方式启动Spring Boot应用时，连续的两个减号`--`就是对`application.properties`中的属性值进行赋值的标识。所以，`java -jar xxx.jar --server.port=8888`命令，等价于我们在`application.properties`中添加属性`server.port=8888`。

通过命令行来修改属性值是Spring Boot非常重要的一个特性，通过此特性，理论上已经使得我们应用的属性在启动前是可变的，所以其中端口号也好、数据库连接也好，都是可以在应用启动时发生改变，而不同于以往的Spring应用通过Maven的Profile在编译器进行不同环境的构建。其最大的区别就是，Spring Boot的这种方式，可以让应用程序的打包内容，贯穿开发、测试以及线上部署，而Maven不同Profile的方案每个环境所构建的包，其内容本质上是不同的。但是，如果每个参数都需要通过命令行来指定，这显然也不是一个好的方案，所以下面我们看看如果在Spring Boot中实现多环境的配置。

### 多环境配置

我们在开发任何应用的时候，通常同一套程序会被应用和安装到几个不同的环境，比如：开发、测试、生产等。其中每个环境的数据库地址、服务器端口等等配置都会不同，如果在为不同环境打包时都要频繁修改配置文件的话，那必将是个非常繁琐且容易发生错误的事。

对于多环境的配置，各种项目构建工具或是框架的基本思路是一致的，通过配置多份不同环境的配置文件，再通过打包命令指定需要打包的内容之后进行区分打包，Spring Boot也不例外，或者说更加简单。

在Spring Boot中多环境配置文件名需要满足`application-{profile}.properties`的格式，其中`{profile}`对应你的环境标识，比如：

- `application-dev.properties`：开发环境
- `application-test.properties`：测试环境
- `application-prod.properties`：生产环境

至于哪个具体的配置文件会被加载，需要在`application.properties`文件中通过`spring.profiles.active`属性来设置，其值对应配置文件中的`{profile}`值。如：`spring.profiles.active=test`就会加载`application-test.properties`配置文件内容。

下面，以不同环境配置不同的服务端口为例，进行样例实验。

- 针对各环境新建不同的配置文件`application-dev.properties`、`application-test.properties`、`application-prod.properties`
- 在这三个文件均都设置不同的`server.port`属性，如：dev环境设置为1111，test环境设置为2222，prod环境设置为3333
- application.properties中设置`spring.profiles.active=dev`，就是说默认以dev环境设置
- 测试不同配置的加载
- 执行`java -jar xxx.jar`，可以观察到服务端口被设置为`1111`，也就是默认的开发环境（dev）
- 执行`java -jar xxx.jar --spring.profiles.active=test`，可以观察到服务端口被设置为`2222`，也就是测试环境的配置（test）
- 执行`java -jar xxx.jar --spring.profiles.active=prod`，可以观察到服务端口被设置为`3333`，也就是生产环境的配置（prod）

按照上面的实验，可以如下总结多环境的配置思路：

- `application.properties`中配置通用内容，并设置`spring.profiles.active=dev`，以开发环境为默认配置

- `application-{profile}.properties`中配置各个环境不同的内容

- 通过命令行方式去激活不同环境的配置

  

### 加载顺序

在上面的例子中，我们将Spring Boot应用需要的配置内容都放在了项目工程中，虽然我们已经能够通过`spring.profiles.active`或是通过Maven来实现多环境的支持。但是，当我们的团队逐渐壮大，分工越来越细致之后，往往我们不需要让开发人员知道测试或是生成环境的细节，而是希望由每个环境各自的负责人（QA或是运维）来集中维护这些信息。那么如果还是以这样的方式存储配置内容，对于不同环境配置的修改就不得不去获取工程内容来修改这些配置内容，当应用非常多的时候就变得非常不方便。同时，配置内容都对开发人员可见，本身这也是一种安全隐患。对此，现在出现了很多将配置内容外部化的框架和工具，后续将要介绍的Spring Cloud Config就是其中之一，为了后续能更好的理解Spring Cloud Config的加载机制，我们需要对Spring Boot对数据文件的加载机制有一定的了解。

Spring Boot为了能够更合理的重写各属性的值，使用了下面这种较为特别的属性加载顺序：

1. 命令行中传入的参数。
2. `SPRING_APPLICATION_JSON`中的属性。`SPRING_APPLICATION_JSON`是以JSON格式配置在系统环境变量中的内容。
3. `java:comp/env`中的`JNDI`属性。
4. Java的系统属性，可以通过`System.getProperties()`获得的内容。
5. 操作系统的环境变量
6. 通过`random.*`配置的随机属性
7. 位于当前应用jar包之外，针对不同`{profile}`环境的配置文件内容，例如：`application-{profile}.properties`或是`YAML`定义的配置文件
8. 位于当前应用jar包之内，针对不同`{profile}`环境的配置文件内容，例如：`application-{profile}.properties`或是`YAML`定义的配置文件
9. 位于当前应用jar包之外的`application.properties`和`YAML`配置内容
10. 位于当前应用jar包之内的`application.properties`和`YAML`配置内容
11. 在`@Configuration`注解修改的类中，通过`@PropertySource`注解定义的属性
12. 应用默认属性，使用`SpringApplication.setDefaultProperties`定义的内容

**优先级按上面的顺序有高到低，数字越小优先级越高。**

可以看到，其中第7项和第9项都是从应用jar包之外读取配置文件，所以，实现外部化配置的原理就是从此切入，为其指定外部配置文件的加载位置来取代jar包之内的配置内容。通过这样的实现，我们的工程在配置中就变的非常干净，我们只需要在本地放置开发需要的配置即可，而其他环境的配置就可以不用关心，由其对应环境的负责人去维护即可。

## 2.x 新特性

在Spring Boot 2.0中推出了Relaxed Binding 2.0，对原有的属性绑定功能做了非常多的改进以帮助我们更容易的在Spring应用中加载和读取配置信息。下面本文就来说说Spring Boot 2.0中对配置的改进。

### 配置文件绑定

#### 简单类型

在Spring Boot 2.0中对配置属性加载的时候会除了像1.x版本时候那样**移除特殊字符**外，还会将配置均以**全小写**的方式进行匹配和加载。所以，下面的4种配置方式都是等价的：

- properties格式：

```
spring.jpa.databaseplatform=mysql
spring.jpa.database-platform=mysql
spring.jpa.databasePlatform=mysql
spring.JPA.database_platform=mysql
```

- yaml格式：

```
spring:
  jpa:
    databaseplatform: mysql
    database-platform: mysql
    databasePlatform: mysql
    database_platform: mysql
```

**Tips：推荐使用全小写配合`-`分隔符的方式来配置，比如：`spring.jpa.database-platform=mysql`**

#### List类型

在properties文件中使用`[]`来定位列表类型，比如：

```
spring.my-example.url[0]=http://example.com
spring.my-example.url[1]=http://spring.io
```

也支持使用**逗号**分割的配置方式，上面与下面的配置是等价的：

```
spring.my-example.url=http://example.com,http://spring.io
```

而在yaml文件中使用可以使用如下配置：

```
spring:
  my-example:
    url:
      - http://example.com
      - http://spring.io
```

也支持**逗号**分割的方式：

```
spring:
  my-example:
    url: http://example.com, http://spring.io
```

**注意：在Spring Boot 2.0中对于List类型的配置必须是连续的，不然会抛出`UnboundConfigurationPropertiesException`异常，所以如下配置是不允许的：**

```
foo[0]=a
foo[2]=b
```

**在Spring Boot 1.x中上述配置是可以的，`foo[1]`由于没有配置，它的值会是`null`**

#### Map类型

Map类型在properties和yaml中的标准配置方式如下：

- properties格式：

```
spring.my-example.foo=bar
spring.my-example.hello=world
```

- yaml格式：

```
spring:
  my-example:
    foo: bar
    hello: world
```

**注意：如果Map类型的key包含非字母数字和`-`的字符，需要用`[]`括起来，比如：**

```
spring:
  my-example:
    '[foo.baz]': bar
```

### 环境属性绑定

**简单类型**

在环境变量中通过小写转换与`.`替换`_`来映射配置文件中的内容，比如：环境变量`SPRING_JPA_DATABASEPLATFORM=mysql`的配置会产生与在配置文件中设置`spring.jpa.databaseplatform=mysql`一样的效果。

**List类型**

由于环境变量中无法使用`[`和`]`符号，所以使用`_`来替代。任何由下划线包围的数字都会被认为是`[]`的数组形式。比如：

```
MY_FOO_1_ = my.foo[1]
MY_FOO_1_BAR = my.foo[1].bar
MY_FOO_1_2_ = my.foo[1][2]
```

另外，最后环境变量最后是以数字和下划线结尾的话，最后的下划线可以省略，比如上面例子中的第一条和第三条等价于下面的配置：

```
MY_FOO_1 = my.foo[1]
MY_FOO_1_2 = my.foo[1][2]
```

### 系统属性绑定

**简单类型**

系统属性与文件配置中的类似，都以移除特殊字符并转化小写后实现绑定，比如下面的命令行参数都会实现配置`spring.jpa.databaseplatform=mysql`的效果：

```
-Dspring.jpa.database-platform=mysql
-Dspring.jpa.databasePlatform=mysql
-Dspring.JPA.database_platform=mysql
```

**List类型**

系统属性的绑定也与文件属性的绑定类似，通过`[]`来标示，比如：

```
-D"spring.my-example.url[0]=http://example.com"
-D"spring.my-example.url[1]=http://spring.io"
```

同样的，他也支持逗号分割的方式，比如：

```
-Dspring.my-example.url=http://example.com,http://spring.io
```

### 属性的读取

上文介绍了Spring Boot 2.0中对属性绑定的内容，可以看到对于一个属性我们可以有多种不同的表达，但是如果我们要在Spring应用程序的environment中读取属性的时候，每个属性的唯一名称符合如下规则：

- 通过`.`分离各个元素
- 最后一个`.`将前缀与属性名称分开
- 必须是字母（a-z）和数字(0-9)
- 必须是小写字母
- 用连字符`-`来分隔单词
- 唯一允许的其他字符是`[`和`]`，用于List的索引
- 不能以数字开头

所以，如果我们要读取配置文件中`spring.jpa.database-platform`的配置，可以这样写：

```
this.environment.containsProperty("spring.jpa.database-platform")
```

而下面的方式是无法获取到`spring.jpa.database-platform`配置内容的：

```
this.environment.containsProperty("spring.jpa.databasePlatform")
```

**注意：使用`@Value`获取配置内容的时候也需要这样的特点**

### 全新的绑定API

在Spring Boot 2.0中增加了新的绑定API来帮助我们更容易的获取配置信息。下面举个例子来帮助大家更容易的理解：

**例子一：简单类型**

假设在propertes配置中有这样一个配置：`com.didispace.foo=bar`

我们为它创建对应的配置类：

```
@Data
@ConfigurationProperties(prefix = "com.didispace")
public class FooProperties {

    private String foo;

}
```

接下来，通过最新的`Binder`就可以这样来拿配置信息了：

```
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(Application.class, args);

        Binder binder = Binder.get(context.getEnvironment());

        // 绑定简单配置
        FooProperties foo = binder.bind("com.didispace", Bindable.of(FooProperties.class)).get();
        System.out.println(foo.getFoo());
    }
}
```

**例子二：List类型**

如果配置内容是List类型呢？比如：

```
com.didispace.post[0]=Why Spring Boot
com.didispace.post[1]=Why Spring Cloud

com.didispace.posts[0].title=Why Spring Boot
com.didispace.posts[0].content=It is perfect!
com.didispace.posts[1].title=Why Spring Cloud
com.didispace.posts[1].content=It is perfect too!
```

要获取这些配置依然很简单，可以这样实现：

```
ApplicationContext context = SpringApplication.run(Application.class, args);

Binder binder = Binder.get(context.getEnvironment());

// 绑定List配置
List<String> post = binder.bind("com.didispace.post", Bindable.listOf(String.class)).get();
System.out.println(post);

List<PostInfo> posts = binder.bind("com.didispace.posts", Bindable.listOf(PostInfo.class)).get();
System.out.println(posts);
```



# 多环境配置

在目前最新的Spring Boot 2.4版本中，对配置的加载机制做了较大的调整。相关的问题最近也被问的比较多，所以今天就花点时间，给大家讲讲Spring Boot 2.4的多环境配置较之前版本有哪些变化。

## 多环境配置

**2.4版本之前**

先回顾下，2.4版本之前，我们在yaml配置文件中，使用`spring.profiles`来定义不同环境的标识，比如下面这样：

```
spring:
  profiles: "dev"

name: dev.didispace.com

---

spring:
  profiles: "test"

name: test.didispace.com

---

spring:
  profiles: "prod"

name: prod.didispace.com
```

**2.4版本之后**

而在本次2.4版本升级之后，我们需要将`spring.profiles`配置用`spring.config.activate.on-profile`替代，比如上面的配置需要修改为如下配置：

```
spring:
  config:
    activate:
      on-profile: "dev"

name: dev.didispace.com

---

spring:
  config:
    activate:
      on-profile: "test"

name: test.didispace.com

---

spring:
  config:
    activate:
      on-profile: "prod"

name: prod.didispace.com
```

**指定环境启动**

应用启动的时候，我们要加载不同的环境配置的参数不变，依然采用`spring.profiles.active`参数，对应值采用`spring.config.activate.on-profile`定义的标识名称。比如下面的命令就能激活`dev`环境的配置。

```
java -jar myapp.jar -Dspring.profiles.active=dev
```

在应用启动的时候，我们也能看到对应的配置激活日志：

```
2020-12-16 16:34:20.614  INFO 5951 --- [           main] c.d.chapter12.Chapter12Application       : The following profiles are active: dev
```

我们也可以将`spring.profiles.active`写入yaml配置中，这样的作用就可以指定默认使用某一个环境的配置，通常我们可以设置成开发环境，这样有利于我们平时的开发调试，而真正部署到其他环境的时候则多以命令参数激活为主。

```
spring:
  profiles:
    active: "dev"

---

spring:
  config:
    activate:
      on-profile: "dev"

name: dev.didispace.com

---

spring:
  config:
    activate:
      on-profile: "test"

name: test.didispace.com

---

spring:
  config:
    activate:
      on-profile: "prod"

name: prod.didispace.com
```

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter1-2`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)

如果您觉得本文不错，欢迎Star支持，您的关注是我坚持的动力！

## 相关阅读

- [Spring Boot 1.x：属性配置文件详解](http://blog.didispace.com/springbootproperties/)
- [Spring Boot 2.0：配置绑定 2.0 全解析](http://blog.didispace.com/Spring-Boot-2-0-feature-1-relaxed-binding-2/)
- [Spring Boot 2.x基础教程：配置文件详解](http://blog.didispace.com/spring-boot-learning-21-1-3/)



# 配置元数据的应用





在使用Spring Boot开发应用的时候，你是否有发现这样的情况：自定义属性是有高量背景的，鼠标放上去，有一个`Cannot resolve configuration property`的配置警告。

[![img](https://blog.didispace.com/images/pasted-416.png)](https://blog.didispace.com/images/pasted-416.png)

如果不对于这个警告觉得烦，想要去掉，那么可以通过设置来去除：

[![img](https://blog.didispace.com/images/pasted-417.png)](https://blog.didispace.com/images/pasted-417.png)

但是，我的建议是不要去掉，因为这个警告正好可以通过高亮来区分你的自定义配置以及框架配置，可以让你快速的分辨哪些是自定义的。

如果你实在想去掉，那么也不建议用上面说的方法，而是建议通过完善配置元数据的方式来完成。所以，今天就来具体说说配置元数据的应用！

## 啥是配置元数据？

我们不妨打开一个已经创建好的Spring Boot项目，查看一下它的Spring Boot依赖包，可以找到如下图的一个json文件：

[![img](https://blog.didispace.com/images/pasted-418.png)](https://blog.didispace.com/images/pasted-418.png)

这里报错的就是配置的元数据信息。有没有发现这些`name`的值都很熟悉？其中`description`是不是也很熟悉？对，这些就是我们常用的Spring Boot原生配置的元数据信息。

这下知道配置元数据可以用来做啥了吧？**它可以帮助IDE来完成配置联想和配置提示的展示。**

**而我们自定义配置之所以会报警告，同时也没有提示信息，就是因为没有这个元数据的配置文件！**

## 配置元数据的自动生成

既然知道了原理，那么接下来我们尝试用一下配置元数据试试！

**第一步**：创建一个配置类，定义一个自定义配置

```
@Data
@Configuration
@ConfigurationProperties(prefix = "com.didispace")
public class DidiProperties {
    
    /**
     * 这是一个测试配置
     */
    private String from;

}
```

**第二步**：在`pom.xml`中添加自动生成配置元数据的依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
```

**第三步**：**`mvn install`下这个项目。**

此时我们可以在工程target目录下找到元数据文件：

[![img](https://blog.didispace.com/images/pasted-419.png)](https://blog.didispace.com/images/pasted-419.png)

同时，我们在配置文件中尝试编写这个自定义的配置项时，可以看到编译器给出了联想和提示：

[![img](https://blog.didispace.com/images/pasted-420.png)](https://blog.didispace.com/images/pasted-420.png)

并且，编写完配置之后，也没有高亮警告了！





## 4、开发小技巧

### 4.1、Lombok

:link: 官网详解：https://projectlombok.org/

Project Lombok is a java library that automatically plugs into your editor and build tools, spicing up your java.
Never write another getter or equals method again, with one annotation your class has a fully featured builder, Automate your logging variables, and much more.

#### 4.1.1 配置lombok

maven:https://www.projectlombok.org/setup/maven

```xml
<dependencies>
	<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<version>1.18.20</version>
		<scope>provided</scope>
	</dependency>
</dependencies>
```

idea:https://projectlombok.org/setup/intellij

> - Go to `File > Settings > Plugins`
> - Click on `Browse repositories...`
> - Search for `Lombok Plugin`
> - Click on `Install plugin`
> - Restart IntelliJ IDEA

#### 4.1.2 Lombok features

The [Lombok javadoc](https://projectlombok.org/api/) is available, but we advise these pages.

> ##### [`val`](https://projectlombok.org/features/val)
>
> Finally! Hassle-free final local variables.
>
> ##### [`var`](https://projectlombok.org/features/var)
>
> Mutably! Hassle-free local variables.
>
> ##### [`@NonNull`](https://projectlombok.org/features/NonNull)
>
> or: How I learned to stop worrying and love the NullPointerException.
>
> ##### [`@Cleanup`](https://projectlombok.org/features/Cleanup)
>
> Automatic resource management: Call your `close()` methods safely with no hassle.
>
> ##### [`@Getter/@Setter`](https://projectlombok.org/features/GetterSetter)
>
> Never write `public int getFoo() {return foo;}` again.
>
> ##### [`@ToString`](https://projectlombok.org/features/ToString)
>
> No need to start a debugger to see your fields: Just let lombok generate a `toString` for you!
>
> ##### [`@EqualsAndHashCode`](https://projectlombok.org/features/EqualsAndHashCode)
>
> Equality made easy: Generates `hashCode` and `equals` implementations from the fields of your object..
>
> ##### [`@NoArgsConstructor, @RequiredArgsConstructor and @AllArgsConstructor`](https://projectlombok.org/features/constructor)
>
> Constructors made to order: Generates constructors that take no arguments, one argument per final / non-nullfield, or one argument for every field.
>
> ##### [`@Data`](https://projectlombok.org/features/Data)
>
> All together now: A shortcut for `@ToString`, `@EqualsAndHashCode`, `@Getter` on all fields, and `@Setter` on all non-final fields, and `@RequiredArgsConstructor`!
>
> ##### [`@Value`](https://projectlombok.org/features/Value)
>
> Immutable classes made very easy.
>
> ##### [`@Builder`](https://projectlombok.org/features/Builder)
>
> ... and Bob's your uncle: No-hassle fancy-pants APIs for object creation!
>
> ##### [`@SneakyThrows`](https://projectlombok.org/features/SneakyThrows)
>
> To boldly throw checked exceptions where no one has thrown them before!
>
> ##### [`@Synchronized`](https://projectlombok.org/features/Synchronized)
>
> `synchronized` done right: Don't expose your locks.
>
> ##### [`@With`](https://projectlombok.org/features/With)
>
> Immutable 'setters' - methods that create a clone but with one changed field.
>
> ##### [`@Getter(lazy=true)`](https://projectlombok.org/features/GetterLazy)
>
> Laziness is a virtue!
>
> ##### [`@Log`](https://projectlombok.org/features/log)
>
> Captain's Log, stardate 24435.7: "What was that line again?"
>
> ##### [`experimental`](https://projectlombok.org/features/experimental/all)
>
> Head to the lab: The new stuff we're working on.
>
> 简化JavaBean开发

```
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>


idea中搜索安装lombok插件
===============================简化JavaBean开发===================================
/*@data is lombox annotion . use to set and get method .
* @to string is tostring() method,but
* */
@Data
//@ToString is create @date , you can use @ data to use toString;
@Component
public class User {
//    @Getter is creat a get method ,but  @data is created the all get and set method;
    private  String name;
    @NotNull //not null in varible;
    private int id=0;
    private int age;
    private String sex;
}



================================简化日志开发===================================
@Slf4j
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String handle01(@RequestParam("name") String name){
        
        log.info("请求进来了....");
        
        return "Hello, Spring Boot 2!"+"你好："+name;
    }
}
```

### 4.2 Simple Logging Facade for Java (SLF4J)

:link:官方文档:http://www.slf4j.org/index.html

The Simple Logging Facade for Java (SLF4J) serves as a simple facade or abstraction for various logging frameworks (e.g. java.util.logging, logback, log4j) allowing the end user to plug in the desired logging framework at *deployment* time.

**slf4j是一个日志标准，使用它可以完美的桥接到具体的日志框架，必要时可以简便的更换底层的日志框架，而不需要关心具体的日志框架的实现（slf4j-simple、logback等）**



#### 4.2.slf4j use in lombok中

重要：https://www.jianshu.com/p/e80ab37294ed

lf4j提供了日志接口、获取具体日志对象的方法，常见用法：



```java
private static final Logger logger = LoggerFactory.getLogger(LoggerTest.class);
logger.debug("debug");
logger.info("info");
logger.error("error");
```

每次写新的类，就需要重新写logger，麻烦，可以使用@Slf4j注解简化：

**1.在pom中引入依赖**



```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

**2.IDE中安装lombok插件**
 File → settings → Plugins

![img](https:////upload-images.jianshu.io/upload_images/16719345-66c715ca6bae4ea4?imageMogr2/auto-orient/strip|imageView2/2/w/1075/format/webp)

在这里插入图片描述


 安装完成后重启即可，其他IDE中类似安装。
**3.在类上添加@Slf4j注解，在方法中直接使用log**





```swift
package com.test;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class LoggerTest {
    private final Logger logger = LoggerFactory.getLogger(LoggerTest.class);

    @Test
    public void test(){
        log.debug("debug");
        log.info("info");
        log.error("error");
        log.warn("warn");
    }
}
```

参考：https://blog.csdn.net/qq_26525215/article/details/79182628
链接：https://www.jianshu.com/p/e80ab37294ed



### 4.3、dev-tools

idea use hot starter:https://juejin.cn/post/6844903696485220359

spring-boot-devtools 是一个为开发者服务的一个模块，其中最重要的功能就是自动应用代码更改到最新的App上面去，即在我们改变了一些代码或者配置文件的时候，应用可以自动重启，这在我们开发的时候，非常有用。 运行完整打包的应用程序时，Developer tools会自动禁用。

```xml
       <dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```



项目或者页面修改以后：Ctrl+F9；







### 4.4、Spring Initailizr（项目初始化向导）



#### 0、选择我们需要的开发场景

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602922147241-73fb2496-e795-4b5a-b909-a18c6011a028.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)





#### 1、自动依赖引入

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602921777330-8fc5c198-75da-4ff9-b82c-71ee3fe18af8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)





#### 2、自动创建项目结构

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602921758313-5099fe18-4c7b-4417-bf6f-2f40b9028296.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)





#### 3、自动编写好主配置类

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602922039074-79e98aad-8158-4113-a7e7-305b57b0a6bf.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



# 补充

[解决报错: Plugin 'org.springframework.boot:spring-boot-maven-plugin:' not found](https://www.jianshu.com/p/c639107543d4)

可以把几个版本号都贴上尝试一下。
最后`<version>2.3.1.RELEASE</version>`完美解决。











-----------------

**下面这个了解即可**



# 03、了解自动配置原理

## 1、SpringBoot特点



### 1.1、依赖管理

- 父项目做依赖管理

```
依赖管理    
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
</parent>

他的父项目
 <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.3.4.RELEASE</version>
  </parent>

几乎声明了所有开发中常用的依赖的版本号,自动版本仲裁机制
```

- 开发导入starter场景启动器

```
1、见到很多 spring-boot-starter-* ： *就某种场景
2、只要引入starter，这个场景的所有常规需要的依赖我们都自动引入
3、SpringBoot所有支持的场景
https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter
4、见到的  *-spring-boot-starter： 第三方为我们提供的简化开发的场景启动器。
5、所有场景启动器最底层的依赖
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter</artifactId>
  <version>2.3.4.RELEASE</version>
  <scope>compile</scope>
</dependency>
```

- 无需关注版本号，自动版本仲裁

```
1、引入依赖默认都可以不写版本
2、引入非版本仲裁的jar，要写版本号。


```

在spring-boot-dependencies中自动配置了版本

![image-20210408123419931](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210408123419931.png)

- 可以修改默认版本号

```
1、查看spring-boot-dependencies里面规定当前依赖的版本 用的 key。
2、在当前项目里面重写配置
    <properties>
        <mysql.version>5.1.43</mysql.version>
    </properties>
```



### 1.2、自动配置

- 自动配好Tomcat

- - 引入Tomcat依赖。
  - 配置Tomcat

```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
      <version>2.3.4.RELEASE</version>
      <scope>compile</scope>
    </dependency>
```

- 自动配好SpringMVC

- - 引入SpringMVC全套组件
  - 自动配好SpringMVC常用组件（功能）

- 自动配好Web常见功能，如：字符编码问题

- - SpringBoot帮我们配置好了所有web开发的常见场景

- 默认的包结构

- - 主程序所在包及其下面的所有子包里面的组件都会被默认扫描进来
  - 无需以前的包扫描配置
  - 想要改变扫描路径，@SpringBootApplication(scanBasePackages=**"com.atguigu"**)

- - - 或者@ComponentScan 指定扫描路径

```
@SpringBootApplication
等同于
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.atguigu.boot")
```



- 各种配置拥有默认值

- - 默认配置最终都是映射到某个类上，如：MultipartProperties
  - 配置文件的值最终会绑定每个类上，这个类会在容器中创建对象

- 按需加载所有自动配置项

- - 非常多的starter
  - 引入了哪些场景这个场景的自动配置才会开启
  - SpringBoot所有的自动配置功能都在 spring-boot-autoconfigure 包里面
  - 

- ......







## 2、容器功能

#### 2.1、组件添加

##### 1、@Configuration

- 基本使用
- **Full模式与Lite模式**

- - 示例
  - 最佳实战

- - - 配置 类组件之间无依赖关系用Lite模式加速容器启动过程，减少判断
    - 配置类组件之间有依赖关系，方法会被调用得到之前单实例组件，用Full模式



```java
#############################Configuration使用示例######################################################
/**
 * 1、配置类里面使用@Bean标注在方法上给容器注册组件，默认也是单实例的
 * 2、配置类本身也是组件
 * 3、proxyBeanMethods：代理bean的方法
 *      Full(proxyBeanMethods = true)、【保证每个@Bean方法被调用多少次返回的组件都是单实例的】
 *      Lite(proxyBeanMethods = false)【每个@Bean方法被调用多少次返回的组件都是新创建的】
 *      组件依赖必须使用Full模式默认。其他默认是否Lite模式
 *
 *
 *
 */
@Configuration(proxyBeanMethods = false) //告诉SpringBoot这是一个配置类 == 配置文件
public class MyConfig {

    /**
     * Full:外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单实例对象
     * @return
     */
    @Bean //给容器中添加组件。以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例
    public User user01(){
        User zhangsan = new User("zhangsan", 18);
        //user组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return zhangsan;
    }

    @Bean("tom") //tom 是 自己命名的bean
    public Pet tomcatPet(){
        return new Pet("tomcat");
    }
}


################################@Configuration测试代码如下########################################
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.atguigu.boot")
public class MainApplication {

    public static void main(String[] args) {
        //1、返回我们IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);

        //2、查看容器里面的组件
        String[] names = run.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }

        //3、从容器中获取组件

        Pet tom01 = run.getBean("tom", Pet.class);

        Pet tom02 = run.getBean("tom", Pet.class);

        System.out.println("组件："+(tom01 == tom02));


        //4、com.atguigu.boot.config.MyConfig$$EnhancerBySpringCGLIB$$51f1e1ca@1654a892
        MyConfig bean = run.getBean(MyConfig.class);
        System.out.println(bean);

        //如果@Configuration(proxyBeanMethods = true)代理对象调用方法。SpringBoot总会检查这个组件是否在容器中有。
        //保持组件单实例
        User user = bean.user01();
        User user1 = bean.user01();
        System.out.println(user == user1);


        User user01 = run.getBean("user01", User.class);
        Pet tom = run.getBean("tom", Pet.class);

        System.out.println("用户的宠物："+(user01.getPet() == tom));



    }
}
```

### 2、@Bean、@Component、@Controller、@Service、@Repository



### 3、@ComponentScan、@Import

```java
 * 4、@Import({User.class, DBHelper.class})
 *      给容器中自动创建出这两个类型的组件、默认组件的名字就是全类名
 *
 *
 *
 */

@Import({User.class, DBHelper.class})
@Configuration(proxyBeanMethods = false) //告诉SpringBoot这是一个配置类 == 配置文件
public class MyConfig {
}
```

@Import 高级用法： https://www.bilibili.com/video/BV1gW411W7wy?p=8

### 4、@Conditional

条件装配：满足Conditional指定的条件，则进行组件注入

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1354552/1602835786727-28b6f936-62f5-4fd6-a6c5-ae690bd1e31d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_YXRndWlndS5jb20g5bCa56GF6LC3%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

```
=====================测试条件装配==========================
@Configuration(proxyBeanMethods = false) //告诉SpringBoot这是一个配置类 == 配置文件
//@ConditionalOnBean(name = "tom")
@ConditionalOnMissingBean(name = "tom")
public class MyConfig {


    /**
     * Full:外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单实例对象
     * @return
     */

    @Bean //给容器中添加组件。以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例
    public User user01(){
        User zhangsan = new User("zhangsan", 18);
        //user组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return zhangsan;
    }

    @Bean("tom22")
    public Pet tomcatPet(){
        return new Pet("tomcat");
    }
}

public static void main(String[] args) {
        //1、返回我们IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);

        //2、查看容器里面的组件
        String[] names = run.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }

        boolean tom = run.containsBean("tom");
        System.out.println("容器中Tom组件："+tom);

        boolean user01 = run.containsBean("user01");
        System.out.println("容器中user01组件："+user01);

        boolean tom22 = run.containsBean("tom22");
        System.out.println("容器中tom22组件："+tom22);


    }
```

### 2.2、原生配置文件引入

### 1、@ImportResource

```
======================beans.xml=========================
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="haha" class="com.atguigu.boot.bean.User">
        <property name="name" value="zhangsan"></property>
        <property name="age" value="18"></property>
    </bean>

    <bean id="hehe" class="com.atguigu.boot.bean.Pet">
        <property name="name" value="tomcat"></property>
    </bean>
</beans>
@ImportResource("classpath:beans.xml")
public class MyConfig {}

======================测试=================
        boolean haha = run.containsBean("haha");
        boolean hehe = run.containsBean("hehe");
        System.out.println("haha："+haha);//true
        System.out.println("hehe："+hehe);//true
```



### 2.3、配置绑定 

如何使用Java读取到properties文件中的内容，并且把它封装到JavaBean中，以供随时使用；

```
public class getProperties {
     public static void main(String[] args) throws FileNotFoundException, IOException {
         Properties pps = new Properties();
         pps.load(new FileInputStream("a.properties"));
         Enumeration enum1 = pps.propertyNames();//得到配置文件的名字
         while(enum1.hasMoreElements()) {
             String strKey = (String) enum1.nextElement();
             String strValue = pps.getProperty(strKey);
             System.out.println(strKey + "=" + strValue);
             //封装到JavaBean。
         }
     }
 }
```

### 1、@ConfigurationProperties

```
/**
 * 只有在容器中的组件，才会拥有SpringBoot提供的强大功能
 */
@Component
@ConfigurationProperties(prefix = "mycar")
public class Car {

    private String brand;
    private Integer price;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
}
```

### 2、@EnableConfigurationProperties + @ConfigurationProperties



### 3、@Component + @ConfigurationProperties

```
@EnableConfigurationProperties(Car.class)
//1、开启Car配置绑定功能
//2、把这个Car这个组件自动注册到容器中
public class MyConfig {
}
```

----

























