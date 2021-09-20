# 使用MyBatis访问MySQL

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

本系列教程[《Spring Boot 2.x基础教程》点击直达！](http://blog.didispace.com/spring-boot-learning-2x/)。学习过程中如遇困难，建议加入[Spring技术交流群](https://blog.didispace.com/join-group-spring/index.html)，参与交流与讨论，更好的学习与进步！

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter3-5`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)