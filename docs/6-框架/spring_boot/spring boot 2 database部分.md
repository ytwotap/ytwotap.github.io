# database

mysql url 时区 serverTimezone 问题 ：https://www.jianshu.com/p/7e9247c0b81a

```xml
jdbc.url=jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai&characterEncoding=utf8
```









# Spring Boot 2.x基础教程：使用JdbcTemplate访问MySQL数据库

在第2章节中，我们介绍了如何通过Spring Boot来实现HTTP接口，以及围绕HTTP接口相关的单元测试、文档生成等实用技能。但是，这些内容还不足以帮助我们构建一个动态应用的服务端程序。不论我们是要做App、小程序、还是传统的Web站点，对于用户的信息、相关业务的内容，通常都需要对其进行存储，而不是像第2章节中那样，把用户信息存储在内存中（重启就丢了！）。

对于信息的存储，现在已经有非常非常多的产品可以选择，其中不乏许多非常优秀的开源免费产品，比如：MySQL，Redis等。接下来，在第3章节，我们将继续学习在使用Spring Boot开发服务端程序的时候，如何实现对各流行数据存储产品的增删改查操作。

作为数据访问章节的第一篇，我们将从最为常用的关系型数据库开始。通过一个简单例子，学习在Spring Boot中最基本的数据访问工具：JdbcTemplate。

## 数据源配置

在我们访问数据库的时候，需要先配置一个数据源，下面分别介绍一下几种不同的数据库配置方式。

首先，为了连接数据库需要引入jdbc支持，在`pom.xml`中引入如下配置：

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

#### 嵌入式数据库支持

嵌入式数据库通常用于开发和测试环境，不推荐用于生产环境。Spring Boot提供自动配置的嵌入式数据库有H2、HSQL、Derby，你不需要提供任何连接配置就能使用。

比如，我们可以在`pom.xml`中引入如下配置使用HSQL

```
<dependency>
    <groupId>org.hsqldb</groupId>
    <artifactId>hsqldb</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 连接生产数据源

以MySQL数据库为例，先引入MySQL连接的依赖包，在`pom.xml`中加入：

```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

在`src/main/resources/application.properties`中配置数据源信息

```
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=dbuser
spring.datasource.password=dbpass
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

**注意：因为Spring Boot 2.1.x默认使用了MySQL 8.0的驱动，所以这里采用`com.mysql.cj.jdbc.Driver`，而不是老的`com.mysql.jdbc.Driver`。**

#### 连接JNDI数据源

当你将应用部署于应用服务器上的时候想让数据源由应用服务器管理，那么可以使用如下配置方式引入JNDI数据源。

```
spring.datasource.jndi-name=java:jboss/datasources/customers
```

## 使用JdbcTemplate操作数据库

Spring的JdbcTemplate是自动配置的，你可以直接使用`@Autowired`或构造函数（推荐）来注入到你自己的bean中来使用。

下面就来一起完成一个增删改查的例子：

#### 准备数据库

先创建`User`表，包含属性`name`、`age`。可以通过执行下面的建表语句：：

```
CREATE TABLE `User` (
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `age` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```

#### 编写领域对象

根据数据库中创建的`User`表，创建领域对象：

```
@Data
@NoArgsConstructor
public class User {

    private String name;
    private Integer age;

}
```

这里使用了Lombok的`@Data`和`@NoArgsConstructor`注解来自动生成各参数的Set、Get函数以及不带参数的构造函数。如果您对Lombok还不了解，可以看看这篇文章：[Java开发神器Lombok的使用与原理](http://blog.didispace.com/java-lombok-how-to-use/)。

#### 编写数据访问对象

- 定义包含有插入、删除、查询的抽象接口UserService

```
public interface UserService {

    /**
     * 新增一个用户
     *
     * @param name
     * @param age
     */
    int create(String name, Integer age);

    /**
     * 根据name查询用户
     *
     * @param name
     * @return
     */
    List<User> getByName(String name);

    /**
     * 根据name删除用户
     *
     * @param name
     */
    int deleteByName(String name);

    /**
     * 获取用户总量
     */
    int getAllUsers();

    /**
     * 删除所有用户
     */
    int deleteAllUsers();

}
```

- 通过`JdbcTemplate`实现`UserService`中定义的数据访问操作

```java
@Service
public class UserServiceImpl implements UserService {

    private JdbcTemplate jdbcTemplate;

    UserServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int create(String name, Integer age) {
        return jdbcTemplate.update("insert into USER(NAME, AGE) values(?, ?)", name, age);
    }

    @Override
    public List<User> getByName(String name) {
        List<User> users = jdbcTemplate.query("select NAME, AGE from USER where NAME = ?", (resultSet, i) 
      {
            User user = new User();
            user.setName(resultSet.getString("NAME"));
            user.setAge(resultSet.getInt("AGE"));
            return user;
        }, name);
        return users;
    }

    @Override
    public int deleteByName(String name) {
        return jdbcTemplate.update("delete from USER where NAME = ?", name);
    }

    @Override
    public int getAllUsers() {
        return jdbcTemplate.queryForObject("select count(1) from USER", Integer.class);
    }

    @Override
    public int deleteAllUsers() {
        return jdbcTemplate.update("delete from USER");
    }

}
```

#### 编写单元测试用例

- 创建对UserService的单元测试用例，通过创建、删除和查询来验证数据库操作的正确性。

```
@RunWith(SpringRunner.class)
@SpringBootTest
public class Chapter31ApplicationTests {

    @Autowired
    private UserService userSerivce;

    @Before
    public void setUp() {
        // 准备，清空user表
        userSerivce.deleteAllUsers();
    }

    @Test
    public void test() throws Exception {
        // 插入5个用户
        userSerivce.create("Tom", 10);
        userSerivce.create("Mike", 11);
        userSerivce.create("Didispace", 30);
        userSerivce.create("Oscar", 21);
        userSerivce.create("Linda", 17);

        // 查询名为Oscar的用户，判断年龄是否匹配
        List<User> userList = userSerivce.getByName("Oscar");
        Assert.assertEquals(21, userList.get(0).getAge().intValue());

        // 查数据库，应该有5个用户
        Assert.assertEquals(5, userSerivce.getAllUsers());

        // 删除两个用户
        userSerivce.deleteByName("Tom");
        userSerivce.deleteByName("Mike");

        // 查数据库，应该有5个用户
        Assert.assertEquals(3, userSerivce.getAllUsers());

    }

}
```

*上面介绍的`JdbcTemplate`只是最基本的几个操作，更多其他数据访问操作的使用请参考：[JdbcTemplate API](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)*

通过上面这个简单的例子，我们可以看到在Spring Boot下访问数据库的配置依然秉承了框架的初衷：简单。我们只需要在pom.xml中加入数据库依赖，再到application.properties中配置连接信息，不需要像Spring应用中创建JdbcTemplate的Bean，就可以直接在自己的对象中注入使用。

# Spring Boot 2.x基础教程：默认数据源Hikari的配置详解

通过[上一节](http://blog.didispace.com/spring-boot-learning-21-3-1)的学习，我们已经学会如何应用Spring中的`JdbcTemplate`来完成对MySQL的数据库读写操作。接下来通过本篇文章，重点说说在访问数据库过程中的一个重要概念：数据源（Data Source），以及Spring Boot中对数据源的创建与配置。

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

  ![How to use JDBC to connect database in Java project](https://ducmanhphan.github.io/img/Java/jdbc/jdbc-facade-pattern.png)

  ![JDBC-连接数据库的方式| Kilric's Blog](https://kilric.github.io/post-images/1573560816410.png)

**什么是数据源？**

可以看到，在`java.sql`中并没有数据源（Data Source）的概念。这是由于在`java.sql`中包含的是JDBC内核API，另外还有个`javax.sql`包，其中包含了JDBC标准的扩展API。而关于数据源（Data Source）的定义，就在`javax.sql`这个扩展包中。

实际上，在JDBC内核API的实现下，就已经可以实现对数据库的访问了，那么我们为什么还需要数据源呢？主要出于以下几个目的：

1. **封装关于数据库访问的各种参数，实现统一管理**
2. **通过对数据库的连接池管理，节省开销并提高效率**

在Java这个自由开放的生态中，已经有非常多优秀的开源数据源可以供大家选择，比如：DBCP、C3P0、Druid、HikariCP等。

而在Spring Boot 2.x中，对数据源的选择也紧跟潮流，采用了目前性能最佳的[HikariCP](	)。接下来，我们就来具体说说，这个Spring Boot中的默认数据源配置。

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





# Spring Boot 2.x基础教程：使用国产数据库连接池Druid

[上一节](http://blog.didispace.com/spring-boot-learning-21-3-2)，我们介绍了Spring Boot在JDBC模块中自动化配置使用的默认数据源HikariCP。接下来这一节，我们将介绍另外一个被广泛应用的开源数据源：Druid。

[Druid](https://github.com/alibaba/druid)是由阿里巴巴数据库事业部出品的开源项目。它除了是一个高性能数据库连接池之外，更是一个自带监控的数据库连接池。虽然HikariCP已经很优秀，但是对于国内用户来说，可能对于Druid更为熟悉。所以，对于如何在Spring Boot中使用Druid是后端开发人员必须要掌握的基本技能。

## 配置Druid数据源

这一节的实践我们将基于[《Spring Boot 2.x基础教程：使用JdbcTemplate访问MySQL数据库》](http://blog.didispace.com/spring-boot-learning-21-3-1)一文的代码基础上进行。所以，读者可以从文末的代码仓库中，检出`chapter3-1`目录来进行下面的实践学习。

下面我们就来开始对Spring Boot项目配置Druid数据源：

**第一步**：在`pom.xml`中引入druid官方提供的Spring Boot Starter封装。

```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.21</version>
</dependency>
```

**第二步**：在`application.properties`中配置数据库连接信息。

Druid的配置都以`spring.datasource.druid`作为前缀，所以根据之前的配置，稍作修改即可：

```
spring.datasource.druid.url=jdbc:mysql://localhost:3306/test
spring.datasource.druid.username=root
spring.datasource.druid.password=
spring.datasource.druid.driver-class-name=com.mysql.cj.jdbc.Driver
```

**第三步**：配置Druid的连接池。

与Hikari一样，要用好一个数据源，就要对其连接池做好相应的配置，比如下面这样：

```
spring.datasource.druid.initialSize=10
spring.datasource.druid.maxActive=20
spring.datasource.druid.maxWait=60000
spring.datasource.druid.minIdle=1
spring.datasource.druid.timeBetweenEvictionRunsMillis=60000
spring.datasource.druid.minEvictableIdleTimeMillis=300000
spring.datasource.druid.testWhileIdle=true
spring.datasource.druid.testOnBorrow=true
spring.datasource.druid.testOnReturn=false
spring.datasource.druid.poolPreparedStatements=true
spring.datasource.druid.maxOpenPreparedStatements=20
spring.datasource.druid.validationQuery=SELECT 1
spring.datasource.druid.validation-query-timeout=500
spring.datasource.druid.filters=stat
```

关于Druid中各连接池配置的说明可查阅下面的表格：

| 配置                                      | 缺省值             | 说明                                                         |
| :---------------------------------------- | :----------------- | :----------------------------------------------------------- |
| name                                      |                    | 配置这个属性的意义在于，如果存在多个数据源，监控的时候可以通过名字来区分开来。如果没有配置，将会生成一个名字，格式是：”DataSource-“ + System.identityHashCode(this). 另外配置此属性至少在1.0.5版本中是不起作用的，强行设置name会出错。[详情-点此处](http://blog.csdn.net/lanmo555/article/details/41248763)。 |
| url                                       |                    | 连接数据库的url，不同数据库不一样。例如： mysql : jdbc:mysql://10.20.153.104:3306/druid2 oracle : jdbc:oracle:thin:@10.20.149.85:1521:ocnauto |
| username                                  |                    | 连接数据库的用户名                                           |
| password                                  |                    | 连接数据库的密码。如果你不希望密码直接写在配置文件中，可以使用ConfigFilter。[详细看这里](https://github.com/alibaba/druid/wiki/使用ConfigFilter) |
| driverClassName                           | 根据url自动识别    | 这一项可配可不配，如果不配置druid会根据url自动识别dbType，然后选择相应的driverClassName |
| initialSize                               | 0                  | 初始化时建立物理连接的个数。初始化发生在显示调用init方法，或者第一次getConnection时 |
| maxActive                                 | 8                  | 最大连接池数量                                               |
| maxIdle                                   | 8                  | 已经不再使用，配置了也没效果                                 |
| minIdle                                   |                    | 最小连接池数量                                               |
| maxWait                                   |                    | 获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。 |
| poolPreparedStatements                    | false              | 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。 |
| maxPoolPreparedStatementPerConnectionSize | -1                 | 要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100 |
| validationQuery                           |                    | 用来检测连接是否有效的sql，要求是一个查询语句，常用select ‘x’。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会起作用。 |
| validationQueryTimeout                    |                    | 单位：秒，检测连接是否有效的超时时间。底层调用jdbc Statement对象的void setQueryTimeout(int seconds)方法 |
| testOnBorrow                              | true               | 申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。 |
| testOnReturn                              | false              | 归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。 |
| testWhileIdle                             | false              | 建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。 |
| keepAlive                                 | false （1.0.28）   | 连接池中的minIdle数量以内的连接，空闲时间超过minEvictableIdleTimeMillis，则会执行keepAlive操作。 |
| timeBetweenEvictionRunsMillis             | 1分钟（1.0.14）    | 有两个含义： 1) Destroy线程会检测连接的间隔时间，如果连接空闲时间大于等于minEvictableIdleTimeMillis则关闭物理连接。 2) testWhileIdle的判断依据，详细看testWhileIdle属性的说明 |
| numTestsPerEvictionRun                    | 30分钟（1.0.14）   | 不再使用，一个DruidDataSource只支持一个EvictionRun           |
| minEvictableIdleTimeMillis                |                    | 连接保持空闲而不被驱逐的最小时间                             |
| connectionInitSqls                        |                    | 物理连接初始化的时候执行的sql                                |
| exceptionSorter                           | 根据dbType自动识别 | 当数据库抛出一些不可恢复的异常时，抛弃连接                   |
| filters                                   |                    | 属性类型是字符串，通过别名的方式配置扩展插件，常用的插件有： 监控统计用的filter:stat 日志用的filter:log4j 防御sql注入的filter:wall |
| proxyFilters                              |                    | 类型是List<com.alibaba.druid.filter.Filter>，如果同时配置了filters和proxyFilters，是组合关系，并非替换关系 |

到这一步，就已经完成了将Spring Boot的默认数据源HikariCP切换到Druid的所有操作。

## 配置Druid监控

既然用了Druid，那么对于Druid的监控功能怎么能不用一下呢？下面就来再进一步做一些配置，来启用Druid的监控。

**第一步**：在`pom.xml`中引入`spring-boot-starter-actuator`模块

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**第二步**：在`application.properties`中添加Druid的监控配置。

```
spring.datasource.druid.stat-view-servlet.enabled=true
spring.datasource.druid.stat-view-servlet.url-pattern=/druid/*
spring.datasource.druid.stat-view-servlet.reset-enable=true
spring.datasource.druid.stat-view-servlet.login-username=admin
spring.datasource.druid.stat-view-servlet.login-password=admin
```

上面的配置主要用于开启stat监控统计的界面以及监控内容的相关配置，具体释意如下：

- `spring.datasource.druid.stat-view-servlet.url-pattern`：访问地址规则
- `spring.datasource.druid.stat-view-servlet.reset-enable`：是否允许清空统计数据
- `spring.datasource.druid.stat-view-servlet.login-username`：监控页面的登录账户
- `spring.datasource.druid.stat-view-servlet.login-password`：监控页面的登录密码

**第三步**：针对之前实现的`UserService`内容，我们创建一个Controller来通过接口去调用数据访问操作：

```
@Data
@AllArgsConstructor
@RestController
public class UserController {

    private UserService userService;

    @PostMapping("/user")
    public int create(@RequestBody User user) {
        return userService.create(user.getName(), user.getAge());
    }

    @GetMapping("/user/{name}")
    public List<User> getByName(@PathVariable String name) {
        return userService.getByName(name);
    }

    @DeleteMapping("/user/{name}")
    public int deleteByName(@PathVariable String name) {
        return userService.deleteByName(name);
    }

    @GetMapping("/user/count")
    public int getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/user/all")
    public int deleteAllUsers() {
        return userService.deleteAllUsers();
    }

}
```

**第四步**：完成上面所有配置之后，启动应用，访问Druid的监控页面`http://localhost:8080/druid/`，可以看到如下登录页面：

[![img](https://blog.didispace.com/images/pasted-311.png)](https://blog.didispace.com/images/pasted-311.png)

输入上面`spring.datasource.druid.stat-view-servlet.login-username`和`spring.datasource.druid.stat-view-servlet.login-password`配置的登录账户与密码，就能看到如下监控页面：

[![img](https://blog.didispace.com/images/pasted-310.png)](https://blog.didispace.com/images/pasted-310.png)

进入到这边时候，就可以看到对于应用端而言的各种监控数据了。这里讲解几个最为常用的监控页面：

**数据源**：这里可以看到之前我们配置的数据库连接池信息以及当前使用情况的各种指标。

[![img](https://blog.didispace.com/images/pasted-312.png)](https://blog.didispace.com/images/pasted-312.png)

**SQL监控**：该数据源中执行的SQL语句极其统计数据。在这个页面上，我们可以很方便的看到当前这个Spring Boot都执行过哪些SQL，这些SQL的执行频率和执行效率也都可以清晰的看到。如果你这里没看到什么数据？别忘了我们之前创建了一个Controller，用这些接口可以触发UserService对数据库的操作。所以，这里我们可以通过调用接口的方式去触发一些操作，这样SQL监控页面就会产生一些数据：

[![img](https://blog.didispace.com/images/pasted-313.png)](https://blog.didispace.com/images/pasted-313.png)

图中监控项上，执行时间、读取行数、更新行数都通过区间分布的方式表示，将耗时分布成8个区间：

- 0 - 1 耗时0到1毫秒的次数
- 1 - 10 耗时1到10毫秒的次数
- 10 - 100 耗时10到100毫秒的次数
- 100 - 1,000 耗时100到1000毫秒的次数
- 1,000 - 10,000 耗时1到10秒的次数
- 10,000 - 100,000 耗时10到100秒的次数
- 100,000 - 1,000,000 耗时100到1000秒的次数
- 1,000,000 - 耗时1000秒以上的次数

记录耗时区间的发生次数，通过区分分布，可以很方便看出SQL运行的极好、普通和极差的分布。 耗时区分分布提供了“执行+RS时分布”，是将执行时间+ResultSet持有时间合并监控，这个能方便诊断返回行数过多的查询。

**SQL防火墙**：该页面记录了与SQL监控不同维度的监控数据，更多用于对表访问维度、SQL防御维度的统计。

[![img](https://blog.didispace.com/images/pasted-314.png)](https://blog.didispace.com/images/pasted-314.png)

该功能数据记录的统计需要在`spring.datasource.druid.filters`中增加`wall`属性才会进行记录统计，比如这样：

```
spring.datasource.druid.filters=stat,wall
```

**注意**：这里的所有监控信息是对这个应用实例的数据源而言的，而并不是数据库全局层面的，可以视为应用层的监控，不可能作为中间件层的监控。

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter3-3`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)





# Spring Boot 2.x基础教程：使用Spring Data JPA访问MySQL

在数据访问这章的第一篇文章[《Spring中使用JdbcTemplate访问数据库》](http://blog.didispace.com/spring-boot-learning-21-3-1/) 中，我们已经介绍了如何使用Spring Boot中最基本的jdbc模块来实现关系型数据库的数据读写操作。那么结合Web开发一章的内容，我们就可以利用JDBC模块与Web模块的功能，综合着使用来完成一个适用于很多简单应用场景的后端应用了。

然而当我们有一定的开发经验之后，不难发现，在实际开发过程中，对数据库的操作大多可以归结为：“增删改查”。就最为普遍的单表操作而言，除了表和字段不同外，语句几乎都是类似的，开发人员需要写大量类似而枯燥的语句来完成业务逻辑。

为了解决这些大量枯燥的数据操作语句，诞生了非常多的优秀框架，比如：Hibernate。通过整合Hibernate，我们能够以操作Java实体的方式来完成对数据的操作，通过框架的帮助，对Java实体的变更最终将自动地映射到数据库表中。

在Hibernate的帮助下，Java实体映射到数据库表数据完成之后，再进一步解决抽象各个Java实体基本的“增删改查”操作，我们通常会以泛型的方式封装一个模板Dao来进行抽象简化，但是这样依然不是很方便，我们需要针对每个实体编写一个继承自泛型模板Dao的接口，再编写该接口的实现。虽然一些基础的数据访问已经可以得到很好的复用，但是在代码结构上针对每个实体都会有一堆Dao的接口和实现。

由于模板Dao的实现，使得这些具体实体的Dao层已经变的非常“薄”，有一些具体实体的Dao实现可能完全就是对模板Dao的简单代理，并且往往这样的实现类可能会出现在很多实体上。Spring Data JPA的出现正可以让这样一个已经很“薄”的数据访问层变成只是一层接口的编写方式。比如，下面的例子：

```
public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);

    @Query("from User u where u.name=:name")
    User findUser(@Param("name") String name);

}
```

我们只需要通过编写一个继承自`JpaRepository`的接口就能完成数据访问，下面以一个具体实例来体验Spring Data JPA给我们带来的强大功能。

## 使用步骤

由于Spring Data JPA依赖于Hibernate。如果您对Hibernate有一定了解，下面内容可以毫不费力的看懂并上手使用它。如果您还是Hibernate新手，您可以先按如下方式入门，再建议回头学习一下Hibernate以帮助这部分的理解和进一步使用。

#### 工程配置

在`pom.xml`中添加相关依赖，加入以下内容：

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

在`application.xml`中配置：数据库连接信息（如使用嵌入式数据库则不需要）、自动创建表结构的设置，例如使用mysql的情况如下：

```
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.properties.hibernate.hbm2ddl.auto=create-drop
```

`spring.jpa.properties.hibernate.hbm2ddl.auto`是hibernate的配置属性，其主要作用是：自动创建、更新、验证数据库表结构。该参数的几种配置如下：

- `create`：每次加载hibernate时都会删除上一次的生成的表，然后根据你的model类再重新来生成新表，哪怕两次没有任何改变也要这样执行，这就是导致数据库表数据丢失的一个重要原因。
- `create-drop`：每次加载hibernate时根据model类生成表，但是sessionFactory一关闭,表就自动删除。
- `update`：最常用的属性，第一次加载hibernate时根据model类会自动建立起表的结构（前提是先建立好数据库），以后加载hibernate时根据model类自动更新表结构，即使表结构改变了但表中的行仍然存在不会删除以前的行。要注意的是当部署到服务器后，表结构是不会被马上建立起来的，是要等应用第一次运行起来后才会。
- `validate`：每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但是会插入新值。

至此已经完成基础配置，如果您有在Spring下整合使用过它的话，相信你已经感受到Spring Boot的便利之处：JPA的传统配置在`persistence.xml`文件中，但是这里我们不需要。当然，最好在构建项目时候按照之前提过的[最佳实践的工程结构](http://blog.didispace.com/spring-boot-learning-21-1-2/)来组织，这样以确保各种配置都能被框架扫描到。

#### 创建实体

创建一个User实体，包含id（主键）、name（姓名）、age（年龄）属性，通过ORM框架其会被映射到数据库表中，由于配置了`hibernate.hbm2ddl.auto`，在应用启动的时候框架会自动去数据库中创建对应的表。

```
@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Integer age;

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
```

- `@Entity`注解标识了User类是一个持久化的实体
- `@Data`和`@NoArgsConstructor`是Lombok中的注解。用来自动生成各参数的Set、Get函数以及不带参数的构造函数。如果您对Lombok还不了解，可以看看这篇文章：[Java开发神器Lombok的使用与原理](http://blog.didispace.com/java-lombok-how-to-use/)
- `@Id`和`@GeneratedValue`用来标识User对应对应数据库表中的主键

**注意**：除了这些注解之外，还有很多用来精细化配置映射关系的注解，这里不做具体介绍。后续会出专门一篇来介绍常用注解。读者也可以自行阅读Hibernate的文档来学习这些注解的详细使用方法。

#### 创建数据访问接口

下面针对User实体创建对应的`Repository`接口实现对该实体的数据访问，如下代码：

```
public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);

    User findByNameAndAge(String name, Integer age);

    @Query("from User u where u.name=:name")
    User findUser(@Param("name") String name);

}
```

在Spring Data JPA中，只需要编写类似上面这样的接口就可实现数据访问。不再像我们以往编写了接口时候还需要自己编写接口实现类，直接减少了我们的文件清单。

下面对上面的`UserRepository`做一些解释，该接口继承自`JpaRepository`，通过查看`JpaRepository`接口的[API文档](http://docs.spring.io/spring-data/data-jpa/docs/current/api/)，可以看到该接口本身已经实现了创建（save）、更新（save）、删除（delete）、查询（findAll、findOne）等基本操作的函数，因此对于这些基础操作的数据访问就不需要开发者再自己定义。

在我们实际开发中，`JpaRepository`接口定义的接口往往还不够或者性能不够优化，我们需要进一步实现更复杂一些的查询或操作。由于本文重点在Spring Boot中整合spring-data-jpa，在这里先抛砖引玉简单介绍一下spring-data-jpa中让我们兴奋的功能，后续再单独开篇讲一下spring-data-jpa中的常见使用。

在上例中，我们可以看到下面两个函数：

- `User findByName(String name)`
- `User findByNameAndAge(String name, Integer age)`

它们分别实现了按name查询User实体和按name和age查询User实体，可以看到我们这里没有任何类SQL语句就完成了两个条件查询方法。这就是Spring-data-jpa的一大特性：**通过解析方法名创建查询**。

除了通过解析方法名来创建查询外，它也提供通过使用@Query 注解来创建查询，您只需要编写JPQL语句，并通过类似“:name”来映射@Param指定的参数，就像例子中的第三个findUser函数一样。

**Spring Data JPA的能力远不止本文提到的这些，由于本文主要以整合介绍为主，对于Spring Data JPA的使用只是介绍了常见的使用方式。诸如@Modifying操作、分页排序、原生SQL支持以及与Spring MVC的结合使用等等内容就不在本文中详细展开，这里先挖个坑，后续再补文章填坑，如您对这些感兴趣可以关注我博客或简书，同样欢迎大家留言交流想法。**

#### 单元测试

在完成了上面的数据访问接口之后，按照惯例就是编写对应的单元测试来验证编写的内容是否正确。这里就不多做介绍，主要通过数据操作和查询来反复验证操作的正确性。

```
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void test() throws Exception {

        // 创建10条记录
        userRepository.save(new User("AAA", 10));
        userRepository.save(new User("BBB", 20));
        userRepository.save(new User("CCC", 30));
        userRepository.save(new User("DDD", 40));
        userRepository.save(new User("EEE", 50));
        userRepository.save(new User("FFF", 60));
        userRepository.save(new User("GGG", 70));
        userRepository.save(new User("HHH", 80));
        userRepository.save(new User("III", 90));
        userRepository.save(new User("JJJ", 100));

        // 测试findAll, 查询所有记录
        Assert.assertEquals(10, userRepository.findAll().size());

        // 测试findByName, 查询姓名为FFF的User
        Assert.assertEquals(60, userRepository.findByName("FFF").getAge().longValue());

        // 测试findUser, 查询姓名为FFF的User
        Assert.assertEquals(60, userRepository.findUser("FFF").getAge().longValue());

        // 测试findByNameAndAge, 查询姓名为FFF并且年龄为60的User
        Assert.assertEquals("FFF", userRepository.findByNameAndAge("FFF", 60).getName());

        // 测试删除姓名为AAA的User
        userRepository.delete(userRepository.findByName("AAA"));

        // 测试findAll, 查询所有记录, 验证上面的删除是否成功
        Assert.assertEquals(9, userRepository.findAll().size());

    }
}
```

## 拓展阅读：关于Spring Data

Spring Data JPA在Spring家族中实际上是一个二级项目，它隶属于[Spring Data](https://spring.io/projects/spring-data)这个顶级项目。读者可以看一下关于这个项目的介绍，它除了涵盖对关系型数据库的抽象之外，其实还有很多对其他数据存储中间件的实现，比如我们常用的Redis、MongoDB、Elasticsearch等。

如果再找几个项目看一下它们的简单示例，你会发现：不论你是要访问什么数据存储产品，它们的编码方式几乎都是一样的！这就是Spring Data这个项目充满魅力的地方！通过对数据访问操作的抽象来屏蔽细节，用不同子项目的方式去实现细节。让开发者只需要学会使用Spring Data，就能方便快捷的学会对各种数据存储的操作。所以，对于Spring Data，我是强烈推荐Java开发者们可以学、甚至读一下源码的重要框架。虽然，目前来说很多大型互联网公司并不会选择它（性能考量居多，能真正用好它的人不多）作为主要的开发框架，但是其背后的抽象思想是非常值得我们学习的。并且，在做一些非高并发项目的时候，这简直就是一个快捷开发神器，它可以帮助我们少写非常多的代码！



# Spring Boot 2.x基础教程：使用MyBatis访问MySQL



之前我们已经介绍了两种在Spring Boot中访问关系型数据库的方式：

- [使用spring-boot-starter-jdbc](http://blog.didispace.com/spring-boot-learning-21-3-1/)
- [使用spring-boot-starter-data-jpa](http://blog.didispace.com/spring-boot-learning-21-3-4/)

虽然Spring Data JPA在国外广泛流行，但是在国内还是MyBatis的天下。所以，今天这篇我们将具体说说如何在Spring Boot中整合MyBatis完成关系型数据库的增删改查操作。

## 整合MyBatis

**第一步**：新建Spring Boot项目，在`pom.xml`中引入MyBatis的Starter以及MySQL Connector依赖，具体如下：

```
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

关于`mybatis-spring-boot-starter`的版本需要注意：

- `2.1.x`版本适用于：MyBatis 3.5+、Java 8+、Spring Boot 2.1+
- `2.0.x`版本适用于：MyBatis 3.5+、Java 8+、Spring Boot 2.0/2.1
- `1.3.x`版本适用于：MyBatis 3.4+、Java 6+、Spring Boot 1.5

其中，目前还在维护的是`2.1.x`版本和`1.3.x`版本。

**第二步**：同之前介绍的使用jdbc模块和jpa模块连接数据库一样，在`application.properties`中配置mysql的连接配置

```
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

当然，也可以不用默认数据源，如果要使用Druid作为数据库连接池的话，可以参见[《Spring Boot 2.x：使用国产数据库连接池Druid》](http://blog.didispace.com/spring-boot-learning-21-3-3/)一文。

**第三步**：Mysql中创建一张用来测试的表，比如：User表，其中包含id(BIGINT)、age(INT)、name(VARCHAR)字段。

具体创建命令如下：

```
CREATE TABLE `User` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```

**第四步**：创建User表的映射对象User：

```
@Data
@NoArgsConstructor
public class User {

    private Long id;

    private String name;
    private Integer age;

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
```

**第五步**：创建User表的操作接口：UserMapper。在接口中定义两个数据操作，一个插入，一个查询，用于后续单元测试验证。

```
@Mapper
public interface UserMapper {

    @Select("SELECT * FROM USER WHERE NAME = #{name}")
    User findByName(@Param("name") String name);

    @Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
    int insert(@Param("name") String name, @Param("age") Integer age);

}
```

**第六步**：创建Spring Boot主类

```
@SpringBootApplication
public class Chapter35Application {

	public static void main(String[] args) {
		SpringApplication.run(Chapter35Application.class, args);
	}

}
```

**第七步**：创建单元测试。具体测试逻辑如下：

- 插入一条name=AAA，age=20的记录，然后根据name=AAA查询，并判断age是否为20
- 测试结束回滚数据，保证测试单元每次运行的数据环境独立

```
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class Chapter35ApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    @Rollback
    public void test() throws Exception {
        userMapper.insert("AAA", 20);
        User u = userMapper.findByName("AAA");
        Assert.assertEquals(20, u.getAge().intValue());
    }

}
```

## 注解配置说明

下面通过几种不同传参方式来实现前文中实现的插入操作，来学习一下MyBatis中常用的一些注解。

### 使用@Param

在之前的整合示例中我们已经使用了这种最简单的传参方式，如下：

```
@Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
int insert(@Param("name") String name, @Param("age") Integer age);
```

这种方式很好理解，`@Param`中定义的`name`对应了SQL中的`#{name}`，`age`对应了SQL中的`#{age}`。

### 使用Map

如下代码，通过`Map<String, Object>`对象来作为传递参数的容器：

```
@Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name,jdbcType=VARCHAR}, #{age,jdbcType=INTEGER})")
int insertByMap(Map<String, Object> map);
```

对于Insert语句中需要的参数，我们只需要在map中填入同名的内容即可，具体如下面代码所示：

```
Map<String, Object> map = new HashMap<>();
map.put("name", "CCC");
map.put("age", 40);
userMapper.insertByMap(map);
```

### 使用对象

除了Map对象，我们也可直接使用普通的Java对象来作为查询条件的传参，比如我们可以直接使用User对象:

```
@Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
int insertByUser(User user);
```

这样语句中的`#{name}`、`#{age}`就分别对应了User对象中的`name`和`age`属性。

### 增删改查

MyBatis针对不同的数据库操作分别提供了不同的注解来进行配置，在之前的示例中演示了`@Insert`，下面针对User表做一组最基本的增删改查作为示例：

```
public interface UserMapper {

    @Select("SELECT * FROM user WHERE name = #{name}")
    User findByName(@Param("name") String name);

    @Insert("INSERT INTO user(name, age) VALUES(#{name}, #{age})")
    int insert(@Param("name") String name, @Param("age") Integer age);

    @Update("UPDATE user SET age=#{age} WHERE name=#{name}")
    void update(User user);

    @Delete("DELETE FROM user WHERE id =#{id}")
    void delete(Long id);
}
```

在完成了一套增删改查后，不妨我们试试下面的单元测试来验证上面操作的正确性：

```
@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

	@Autowired
	private UserMapper userMapper;

	@Test
	@Rollback
	public void testUserMapper() throws Exception {
		// insert一条数据，并select出来验证
		userMapper.insert("AAA", 20);
		User u = userMapper.findByName("AAA");
		Assert.assertEquals(20, u.getAge().intValue());
		// update一条数据，并select出来验证
		u.setAge(30);
		userMapper.update(u);
		u = userMapper.findByName("AAA");
		Assert.assertEquals(30, u.getAge().intValue());
		// 删除这条数据，并select验证
		userMapper.delete(u.getId());
		u = userMapper.findByName("AAA");
		Assert.assertEquals(null, u);
	}
}
```

### 返回结果绑定

对于增、删、改操作相对变化较小。而对于“查”操作，我们往往需要进行多表关联，汇总计算等操作，那么对于查询的结果往往就不再是简单的实体对象了，往往需要返回一个与数据库实体不同的包装类，那么对于这类情况，就可以通过`@Results`和`@Result`注解来进行绑定，具体如下：

```
@Results({
    @Result(property = "name", column = "name"),
    @Result(property = "age", column = "age")
})
@Select("SELECT name, age FROM user")
List<User> findAll();
```

在上面代码中，@Result中的property属性对应User对象中的成员名，column对应SELECT出的字段名。在该配置中故意没有查出id属性，只对User对应中的name和age对象做了映射配置，这样可以通过下面的单元测试来验证查出的id为null，而其他属性不为null：

```
@Test
@Rollback
public void testUserMapper() throws Exception {
	List<User> userList = userMapper.findAll();
	for(User user : userList) {
		Assert.assertEquals(null, user.getId());
		Assert.assertNotEquals(null, user.getName());
	}
}
```

本文主要介绍几种最为常用的方式，更多其他注解的使用可[参见文档](http://www.mybatis.org/mybatis-3/zh/java-api.html)，下一篇我们将介绍如何使用XML配置SQL的传统使用方式。







# Spring Boot 2.x基础教程：使用 Thymeleaf开发Web页面

通过[本系列教程](http://blog.didispace.com/spring-boot-learning-2x/)的前几章内容（API开发、数据访问）。我们已经具备完成一个涵盖数据存储、提供HTTP接口的完整后端服务了。依托这些技能，我们已经可以配合前端开发人员，一起来完成一些前后端分离的Web项目，或是一些小程序、或者是App之类的应用开发。

对于Web项目来说，前后端分离模式是目前最为流行的，主要得益于前端框架的完善以及前后端分离方案的日渐成熟。这样的实现模式帮助Web类产品的开发团队更好的拆分任务，以及让开发人员更加聚焦在某一端的开发技术之上。所以，在本教程中，优先介绍了如何开发API，而不是开发Web页面。但是，传统模式的Web页面在一个项目中就可以管理，如果开发人员技能本身就可覆盖全栈，那直接采用传统模板引擎方式开发，也是个不错的选择。尤其对于一些老团队，对模板引擎非常熟悉，可以减少非常多的学习成本，直接上手Spring Boot来开发Web应用。

接下来，我们就来具体讲讲在Spring Boot应用中，如何使用Thymeleaf模板引擎开发Web页面类的应用。

## 静态资源访问

在我们开发Web应用的时候，需要引用大量的js、css、图片等静态资源。Spring Boot默认提供静态资源目录位置需置于classpath下，目录名需符合如下规则：

- /static
- /public
- /resources
- /META-INF/resources

举例：我们可以在`src/main/resources/`目录下创建`static`，在该位置放置一个图片文件。启动程序后，尝试访问`http://localhost:8080/D.jpg`。如能显示图片，配置成功。

## 渲染Web页面

在之前的示例中，我们都是通过`@RestController`来处理请求，所以返回的内容为json对象。那么如果需要渲染html页面的时候，要如何实现呢？

### 模板引擎

在动态HTML实现上Spring Boot依然可以完美胜任，并且提供了多种模板引擎的默认配置支持，所以在推荐的模板引擎下，我们可以很快的上手开发动态网站。

Spring Boot提供了自动化配置模块的模板引擎主要有以下几种：

- Thymeleaf
- FreeMarker
- Groovy

当你使用上述模板引擎中的任何一个，它们默认的模板配置路径为：`src/main/resources/templates`。当然也可以修改这个路径，具体如何修改，可在后续各模板引擎的配置属性中查询并修改。

**补充**：Spring Boot从一开始就建议使用模板引擎，避免使用JSP。同时，随着Spring Boot版本的迭代，逐步的淘汰了一些较为古老的模板引擎。

### Thymeleaf

Thymeleaf是本文我们将具体介绍使用的模板引擎。它是一个XML/XHTML/HTML5模板引擎，可用于Web与非Web环境中的应用开发。它是一个开源的Java库，基于Apache License 2.0许可，由Daniel Fernández创建，该作者还是Java加密库Jasypt的作者。

Thymeleaf提供了一个用于整合Spring MVC的可选模块，在应用开发中，你可以使用Thymeleaf来完全代替JSP或其他模板引擎，如Velocity、FreeMarker等。Thymeleaf的主要目标在于提供一种可被浏览器正确显示的、格式良好的模板创建方式，因此也可以用作静态建模。你可以使用它创建经过验证的XML与HTML模板。相对于编写逻辑或代码，开发者只需将标签属性添加到模板中即可。接下来，这些标签属性就会在DOM（文档对象模型）上执行预先制定好的逻辑。

示例模板：

```
<table>
  <thead>
    <tr>
      <th th:text="#{msgs.headers.name}">Name</td>
      <th th:text="#{msgs.headers.price}">Price</td>
    </tr>
  </thead>
  <tbody>
    <tr th:each="prod : ${allProducts}">
      <td th:text="${prod.name}">Oranges</td>
      <td th:text="${#numbers.formatDecimal(prod.price,1,2)}">0.99</td>
    </tr>
  </tbody>
</table>
```

可以看到Thymeleaf主要以属性的方式加入到html标签中，浏览器在解析html时，当检查到没有的属性时候会忽略，所以Thymeleaf的模板可以通过浏览器直接打开展现，这样非常有利于前后端的分离。

## 动手试一下

**第一步**：新建一个Spring Boot应用，在`pom.xml`中加入所需的模板引擎模块，比如使用`thymeleaf`的话，只需要引入下面依赖：

```
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

**第二步**：创建一个Spring MVC的传统Controller，用来处理根路径的请求，将解决渲染到index页面上，具体实现如下

```
@Controller
public class HelloController {

    @GetMapping("/")
    public String index(ModelMap map) {
        map.addAttribute("host", "http://blog.didispace.com");
        return "index";
    }

}
```

简要说明：

- 在渲染到index页面的时候，通过ModelMap，往页面中增加一个`host`参数，其值为`http://blog.didispace.com`
- `return`的值index代表了要使用的模板页面名称，默认情况下，它将对应到`src/main/resources/templates/`目录下的`index.html`模板页面

**第三步**：根据上一步要映射的模板，去模板路径`src/main/resources/templates`下新建模板文件`index.html`，内容如下：

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8" />
    <title></title>
</head>
<body>
<h1 th:text="${host}">Hello World</h1>
</body>
</html>
```

在该页面的body中，包含了一个带有Thymeleaf属性的h1标签，该便签内容将绑定`host`参数的值。

由于Thymeleaf通过属性绑定的特性。该模板页面同其他模板引擎不同，直接通过浏览器打开html页面，它是可以正常运作的，将会直接展现Hello World标题。这有利于开发页面的时候可以在非启动环境下验证应前端样式的正确性。

如果启动程序后，访问`http://localhost:8080/`，上面页面就会展示Controller中host的值：`http://blog.didispace.com`，做到了不破坏HTML自身内容的数据逻辑分离。

更多Thymeleaf的页面语法，可以访问Thymeleaf的官方文档来深入学习使用。

## Thymeleaf的配置参数

如有需要修改默认配置的时候，只需复制下面要修改的属性到`application.properties`中，并修改成需要的值：

```
# Enable template caching.
spring.thymeleaf.cache=true 
# Check that the templates location exists.
spring.thymeleaf.check-template-location=true 
# Content-Type value.
spring.thymeleaf.content-type=text/html 
# Enable MVC Thymeleaf view resolution.
spring.thymeleaf.enabled=true 
# Template encoding.
spring.thymeleaf.encoding=UTF-8 
# Comma-separated list of view names that should be excluded from resolution.
spring.thymeleaf.excluded-view-names= 
# Template mode to be applied to templates. See also StandardTemplateModeHandlers.
spring.thymeleaf.mode=HTML5 
# Prefix that gets prepended to view names when building a URL.
spring.thymeleaf.prefix=classpath:/templates/ 
# Suffix that gets appended to view names when building a URL.
spring.thymeleaf.suffix=.html  spring.thymeleaf.template-resolver-order= # Order of the template resolver in the chain. spring.thymeleaf.view-names= # Comma-separated list of view names that can be resolved.
```

举几个我们常用的配置内容：

**Q：不想每次修改页面都重启**

A：修改`spring.thymeleaf.cache`参数，设置为`false`

**Q：不想使用template目录存放模板文件**

A：修改`spring.thymeleaf.prefix`参数，设置为你想放置模板文件的目录

**Q：不想使用index作为模板文件的扩展名**

A：修改`spring.thymeleaf.suffix`参数，设置为你想用的扩展名

**Q：HTML5的严格校验很烦人**

A：修改`spring.thymeleaf.mode`参数，设置为`LEGACYHTML5`

**更多本系列免费教程连载[「点击进入汇总目录」](http://blog.didispace.com/spring-boot-learning-2x/)**



# Spring Boot 2.x基础教程：实现文件上传

文件上传的功能实现是我们做Web应用时候最为常见的应用场景，比如：实现头像的上传，Excel文件数据的导入等功能，都需要我们先实现文件的上传，然后再做图片的裁剪，excel数据的解析入库等后续操作。

今天通过这篇文章，我们就来一起学习一下如何在Spring Boot中实现文件的上传。

## 动手试试

**第一步**：创建一个基础的Spring Boot项目，如果还不会的话就先看看这篇[《快速入门》](https://blog.didispace.com/spring-boot-learning-21-1-1/)。

**第二步**：在`pom.xml`中引入模版引擎依赖：

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

你也可以选择其他你熟悉的模版引擎，比如：Freemarker。

**第三步**：在`resources`目录下，创建新目录`templates`；在`templates`目录下再创建一个文件上传的页面`upload.html`，内容如下：

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8" />
    <title>文件上传页面</title>
</head>
<body>
<h1>文件上传页面</h1>
<form method="post" action="/upload" enctype="multipart/form-data">
    选择要上传的文件：<input type="file" name="file"><br>
    <hr>
    <input type="submit" value="提交">
</form>
</body>
</html>
```

**第四步**：创建文件上传的处理控制器，命名为UploadController

```
@Controller
@Slf4j
public class UploadController {

    @Value("${file.upload.path}")
    private String path;

    @GetMapping("/")
    public String uploadPage() {
        return "upload";
    }

    @PostMapping("/upload")
    @ResponseBody
    public String create(@RequestPart MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = path + fileName;

        File dest = new File(filePath);
        Files.copy(file.getInputStream(), dest.toPath());
        return "Upload file success : " + dest.getAbsolutePath();
    }

}
```

其中包含这几个重要元素：

1. 成员变量`path`，通过`@Value`注入配置文件中的`file.upload.path`属性。这个配置用来定义文件上传后要保存的目录位置。
2. GET请求，路径`/`，用于显示`upload.html`这个文件上传页面。
3. POST请求。路径`/upload`，用于处理上传的文件，即：保存到`file.upload.path`配置的路径下面。

> 注意：这里主要演示文件上传的主要流程，真实应用还有更多内容要考虑，比如：文件上传后的文件名处理（防止重名）、分布式情况下文件上传后如何共享访问等。更高级的最后，我们后续文章继续讲。

**第五步**：编辑`application.properties`配置文件

```
spring.servlet.multipart.max-file-size=2MB
spring.servlet.multipart.max-request-size=2MB

file.upload.path=/Users/didi/
```

前两个参数用于限制了上传请求和上传文件的大小，而`file.upload.path`是上面我们自己定义的用来保存上传文件的路径。

## 测试验证

**第一步**：启动Spring Boot应用，访问`http://localhost:8080`，可以看到如下的文件上传页面。

[![img](https://blog.didispace.com/images/pasted-378.png)](https://blog.didispace.com/images/pasted-378.png)

**第二步**：选择一个不大于2MB的文件，点击“提交”按钮，完成上传。

如果上传成功，将显示类似下面的页面：

[![img](https://blog.didispace.com/images/pasted-379.png)](https://blog.didispace.com/images/pasted-379.png)

你可以根据打印的文件路径去查看文件是否真的上传了。

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter4-3`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)