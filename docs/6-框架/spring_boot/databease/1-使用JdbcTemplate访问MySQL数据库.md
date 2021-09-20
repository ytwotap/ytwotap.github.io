# 使用JdbcTemplate访问MySQL数据库

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

```
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
        List<User> users = jdbcTemplate.query("select NAME, AGE from USER where NAME = ?", (resultSet, i) -> {
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

本系列教程[《Spring Boot 2.x基础教程》点击直达！](http://blog.didispace.com/spring-boot-learning-2x/)。学习过程中如遇困难，建议加入[Spring技术交流群](https://blog.didispace.com/join-group-spring/index.html)，参与交流与讨论，更好的学习与进步！

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter3-1`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)