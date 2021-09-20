# 默认数据源Hikari的配置详解

我们已经学会如何应用Spring中的`JdbcTemplate`来完成对MySQL的数据库读写操作。接下来通过本篇文章，重点说说在访问数据库过程中的一个重要概念：数据源（Data Source），以及Spring Boot中对数据源的创建与配置。

## 基本概念

在开始说明Spring Boot中的数据源配置之前，我们先搞清楚关于数据访问的这些基本概念：

**什么是JDBC？**

Java数据库连接（Java Database Connectivity，简称JDBC）是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。JDBC也是Sun Microsystems的商标。我们通常说的JDBC是面向关系型数据库的。

JDBC API主要位于JDK中的`java.sql`包中（之后扩展的内容位于`javax.sql`包中），主要包括（斜体代表接口，需驱动程序提供者来具体实现）：

- DriverManager：负责加载各种不同驱动程序（Driver），并根据不同的请求，向调用者返回相应的数据库连接（Connection）。
- Driver：驱动程序，会将自身加载到DriverManager中去，并处理相应的请求并返回相应的数据库连接（Connection）。
- Connection：数据库连接，负责与进行数据库间通讯，SQL执行以及事务处理都是在某个特定Connection环境中进行的。可以产生用以执行SQL的Statement。
- Statement：用以执行SQL查询和更新（针对静态SQL语句和单次执行）。PreparedStatement：用以执行包含动态参数的SQL查询和更新（在服务器端编译，允许重复执行以提高效率）。
- CallableStatement：用以调用数据库中的存储过程。
- SQLException：代表在数据库连接的建立和关闭和SQL语句的执行过程中发生了例外情况（即错误）。

**什么是数据源？**

可以看到，在`java.sql`中并没有数据源（Data Source）的概念。这是由于在`java.sql`中包含的是JDBC内核API，另外还有个`javax.sql`包，其中包含了JDBC标准的扩展API。而关于数据源（Data Source）的定义，就在`javax.sql`这个扩展包中。

实际上，在JDBC内核API的实现下，就已经可以实现对数据库的访问了，那么我们为什么还需要数据源呢？主要出于以下几个目的：

1. 封装关于数据库访问的各种参数，实现统一管理
2. 通过对数据库的连接池管理，节省开销并提高效率

在Java这个自由开放的生态中，已经有非常多优秀的开源数据源可以供大家选择，比如：DBCP、C3P0、Druid、HikariCP等。

而在Spring Boot 2.x中，对数据源的选择也紧跟潮流，采用了目前性能最佳的[HikariCP](https://github.com/brettwooldridge/HikariCP)。接下来，我们就来具体说说，这个Spring Boot中的默认数据源配置。

## 默认数据源：HikariCP

由于Spring Boot的自动化配置机制，大部分对于数据源的配置都可以通过配置参数的方式去改变。只有一些特殊情况，比如：更换默认数据源，多数据源共存等情况才需要去修改覆盖初始化的Bean内容。本节我们主要讲Hikari的配置，所以对于使用其他数据源或者多数据源的情况，在之后的教程中学习。

在Spring Boot自动化配置中，对于数据源的配置可以分为两类：

- 通用配置：以`spring.datasource.*`的形式存在，主要是对一些即使使用不同数据源也都需要配置的一些常规内容。比如：数据库链接地址、用户名、密码等。这里就不做过多说明了，通常就这些配置：

```
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

- 数据源连接池配置：以`spring.datasource.<数据源名称>.*`的形式存在，比如：Hikari的配置参数就是`spring.datasource.hikari.*`形式。下面这个是我们最常用的几个配置项及对应说明：

```
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.idle-timeout=500000
spring.datasource.hikari.max-lifetime=540000
spring.datasource.hikari.connection-timeout=60000
spring.datasource.hikari.connection-test-query=SELECT 1
```

这些配置的含义：

- `spring.datasource.hikari.minimum-idle`: 最小空闲连接，默认值10，小于0或大于maximum-pool-size，都会重置为maximum-pool-size
- `spring.datasource.hikari.maximum-pool-size`: 最大连接数，小于等于0会被重置为默认值10；大于零小于1会被重置为minimum-idle的值
- `spring.datasource.hikari.idle-timeout`: 空闲连接超时时间，默认值600000（10分钟），大于等于max-lifetime且max-lifetime>0，会被重置为0；不等于0且小于10秒，会被重置为10秒。
- `spring.datasource.hikari.max-lifetime`: 连接最大存活时间，不等于0且小于30秒，会被重置为默认值30分钟.设置应该比mysql设置的超时时间短
- `spring.datasource.hikari.connection-timeout`: 连接超时时间：毫秒，小于250毫秒，否则被重置为默认值30秒
- `spring.datasource.hikari.connection-test-query`: 用于测试连接是否可用的查询语句

更多完整配置项可查看下表：

| **name**                  | **描述**                                                     | **构造器默认值**               | **默认配置validate之后的值** | **validate重置**                                             |
| :------------------------ | :----------------------------------------------------------- | :----------------------------- | :--------------------------- | :----------------------------------------------------------- |
| autoCommit                | 自动提交从池中返回的连接                                     | TRUE                           | TRUE                         | –                                                            |
| connectionTimeout         | 等待来自池的连接的最大毫秒数                                 | SECONDS.toMillis(30) = 30000   | 30000                        | 如果小于250毫秒，则被重置回30秒                              |
| idleTimeout               | 连接允许在池中闲置的最长时间                                 | MINUTES.toMillis(10) = 600000  | 600000                       | 如果idleTimeout+1秒>maxLifetime 且 maxLifetime>0，则会被重置为0（代表永远不会退出）；如果idleTimeout!=0且小于10秒，则会被重置为10秒 |
| maxLifetime               | 池中连接最长生命周期                                         | MINUTES.toMillis(30) = 1800000 | 1800000                      | 如果不等于0且小于30秒则会被重置回30分钟                      |
| connectionTestQuery       | 如果您的驱动程序支持JDBC4，我们强烈建议您不要设置此属性      | null                           | null                         | –                                                            |
| minimumIdle               | 池中维护的最小空闲连接数                                     | -1                             | 10                           | minIdle<0或者minIdle>maxPoolSize,则被重置为maxPoolSize       |
| maximumPoolSize           | 池中最大连接数，包括闲置和使用中的连接                       | -1                             | 10                           | 如果maxPoolSize小于1，则会被重置。当minIdle<=0被重置为DEFAULT_POOL_SIZE则为10;如果minIdle>0则重置为minIdle的值 |
| metricRegistry            | 该属性允许您指定一个 Codahale / Dropwizard MetricRegistry 的实例，供池使用以记录各种指标 | null                           | null                         | –                                                            |
| healthCheckRegistry       | 该属性允许您指定池使用的Codahale / Dropwizard HealthCheckRegistry的实例来报告当前健康信息 | null                           | null                         | –                                                            |
| poolName                  | 连接池的用户定义名称，主要出现在日志记录和JMX管理控制台中以识别池和池配置 | null                           | HikariPool-1                 | –                                                            |
| initializationFailTimeout | 如果池无法成功初始化连接，则此属性控制池是否将 fail fast     | 1                              | 1                            | –                                                            |
| isolateInternalQueries    | 是否在其自己的事务中隔离内部池查询，例如连接活动测试         | FALSE                          | FALSE                        | –                                                            |
| allowPoolSuspension       | 控制池是否可以通过JMX暂停和恢复                              | FALSE                          | FALSE                        | –                                                            |
| readOnly                  | 从池中获取的连接是否默认处于只读模式                         | FALSE                          | FALSE                        | –                                                            |
| registerMbeans            | 是否注册JMX管理Bean（MBeans）                                | FALSE                          | FALSE                        | –                                                            |
| catalog                   | 为支持 catalog 概念的数据库设置默认 catalog                  | driver default                 | null                         | –                                                            |
| connectionInitSql         | 该属性设置一个SQL语句，在将每个新连接创建后，将其添加到池中之前执行该语句。 | null                           | null                         | –                                                            |
| driverClassName           | HikariCP将尝试通过仅基于jdbcUrl的DriverManager解析驱动程序，但对于一些较旧的驱动程序，还必须指定driverClassName | null                           | null                         | –                                                            |
| transactionIsolation      | 控制从池返回的连接的默认事务隔离级别                         | null                           | null                         | –                                                            |
| validationTimeout         | 连接将被测试活动的最大时间量                                 | SECONDS.toMillis(5) = 5000     | 5000                         | 如果小于250毫秒，则会被重置回5秒                             |
| leakDetectionThreshold    | 记录消息之前连接可能离开池的时间量，表示可能的连接泄漏       | 0                              | 0                            | 如果大于0且不是单元测试，则进一步判断：(leakDetectionThreshold < SECONDS.toMillis(2) or (leakDetectionThreshold > maxLifetime && maxLifetime > 0)，会被重置为0 . 即如果要生效则必须>0，而且不能小于2秒，而且当maxLifetime > 0时不能大于maxLifetime |
| dataSource                | 这个属性允许你直接设置数据源的实例被池包装，而不是让HikariCP通过反射来构造它 | null                           | null                         | –                                                            |
| schema                    | 该属性为支持模式概念的数据库设置默认模式                     | driver default                 | null                         | –                                                            |
| threadFactory             | 此属性允许您设置将用于创建池使用的所有线程的java.util.concurrent.ThreadFactory的实例。 | null                           | null                         | –                                                            |
| scheduledExecutor         | 此属性允许您设置将用于各种内部计划任务的java.util.concurrent.ScheduledExecutorService实例 | null                           | null                         | –                                                            |

本系列教程[《Spring Boot 2.x基础教程》点击直达！](http://blog.didispace.com/spring-boot-learning-2x/)。学习过程中如遇困难，建议加入[Spring技术交流群](https://blog.didispace.com/join-group-spring/index.html)，参与交流与讨论，更好的学习与进步！

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter3-2`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)

**如果您觉得本文不错，欢迎`Star`支持，您的关注是我坚持的动力！**

**更多本系列免费教程连载[「点击进入汇总目录」](http://blog.didispace.com/spring-boot-learning-2x/)**

## 参考资料

- [百度百科：JDBC](https://baike.baidu.com/item/Java数据库连接/1173389?fromtitle=JDBC&fromid=485214&fr=aladdin)
- [HikariCP官方文档](https://github.com/brettwooldridge/HikariCP#configuration-knobs-baby)
- [Spring Boot默认HikariDataSource配置](http://www.lanxinbase.com/?p=2482)