# jpa

jpa系列教程(感觉可以主要参考):https://www.javacodegeeks.com/2015/04/jpa%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.html#setup

blaeldung参考：https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa

官方文档：https://spring.io/projects/spring-data-jpa

new jpa 中文介绍：https://segmentfault.com/a/1190000037755804



# 1 .简介

首先了解Spring Date JPA是什么?

**SpringData**：其实SpringData就是Spring提供了一个操作数据的框架。而SpringData JPA只是SpringData框架下的一个基于JPA标准操作数据的模块。
**SpringData JPA**：基于JPA的标准数据进行操作。简化操作持久层的代码。只需要编写接口就可以。

JPA是Spring Data下的子项目,JPA是Java Persistence API的简称，中文名为Java持久层API，是JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中

你可以理解为JPA和Mybatis是起相同作用的,都是持久层的框架,但是由于现在Mybatis的广泛应用,现在了解和使用JPA的人较少.

使用的过程中,也发现其一些优势.



### 作用

后端持久化



> link:https://www.jianshu.com/p/06ddff441003

### 架构图

![img](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210720111707.webp)

## **JPA和Hibernate的关系:**

***JPA 是 hibernate 的一个抽象（就像JDBC和JDBC驱动的关系）：\***

- JPA 是规范：JPA 本质上就是一种  ORM 规范，不是ORM 框架 —— 因为 JPA 并未提供 ORM 实现，它只是制订了一些规范，提供了一些编程的 API 接口，但具体实现则由 ORM 厂商提供实现
- Hibernate 是实现：Hibernate 除了作为 ORM 框架之外，它也是一种 JPA 实现
- 从功能上来说， JPA 是 Hibernate 功能的一个子集

## **JPA 的优势：**

- 标准化:  提供相同的 API，这保证了基于JPA 开发的企业应用能够经过少量的修改就能够在不同的 JPA 框架下运行。
- 简单易用，集成方便:  JPA 的主要目标之一就是提供更加简单的编程模型，在 JPA 框架下创建实体和创建 Java  类一样简单，只需要使用 javax.persistence.Entity 进行注释；JPA 的框架和接口也都非常简单。
- 可媲美JDBC的查询能力:  JPA的查询语言是面向对象的，JPA定义了独特的JPQL，而且能够支持批量更新和修改、JOIN、GROUP BY、HAVING 等通常只有 SQL 才能够提供的高级查询特性，甚至还能够支持子查询。
- 支持面向对象的高级特性: JPA 中能够支持面向对象的高级特性，如类之间的继承、多态和类之间的复杂关系，最大限度的使用面向对象的模型



## **JPA 主要 3 技术(掌握)**

- ORM  映射元数据：JPA 支持 XML 和  JDK 5.0 注解两种元数据的形式，元数据描述对象和表之间的映射关系，框架据此将实体对象持久化到数据库表中。
- JPA 的 API：用来操作实体对象，执行CRUD操作，框架在后台完成所有的事情，开发者从繁琐的 JDBC和 SQL代码中解脱出来。
- 查询语言（JPQL）：这是持久化操作中很重要的一个方面，通过面向对象而非面向数据库的查询语言查询数据，避免程序和具体的  SQL 紧密耦合

# 2. **JPA 持久化对象开发步骤:**

#### 2.1 导入 HIBERNATE JPA 实现（配置 POM 文件）



```xml
    <dependencies>
        <!--配置 HIBERNATE JPA 实现包 -->
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-entitymanager</artifactId>
            <version>5.2.12.Final</version>
        </dependency>
    </dependencies>
```

#### 2.2  创建 persistence.xml, 在这个文件中配置持久化单元

**注意：persistence.xml 放置于 类路径下的 META-INF 目录下，persistence.xml 文件名称固定**

![img](https:////upload-images.jianshu.io/upload_images/9327494-5a3443f69f441273.png?imageMogr2/auto-orient/strip|imageView2/2/w/404/format/webp)





- 需要配置连接数据库信息
- 需要指定 JPA 使用哪个持久化的框架以及配置该框架的基本属性
- 需要指定持久化的实体类



```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence" version="2.1">
    <!--persistence-unit 定义持久化单元：
        name 属性：定义持久化单元名称
        transaction-type 属性：定义事务类型，此处为本地事务 RESOURCE_LOCAL-->
    <persistence-unit name="helloJpa" transaction-type="RESOURCE_LOCAL">
       <!-- provider 配置 实现 JPA 的 ORM 持久化框架-->
        <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
       <!-- properties 定义连接数据库信息-->
        <properties>
            <!-- jpa中连接数据库 -->
            <property name="javax.persistence.jdbc.driver" value="oracle.jdbc.OracleDriver" />
            <property name="javax.persistence.jdbc.url" value="jdbc:oracle:thin:@192.168.0.112:1521:XE" />
            <property name="javax.persistence.jdbc.user" value="ZHANGJIAN" />
            <property name="javax.persistence.jdbc.password" value="zhangjian"></property>

            <!-- jpa中配置hibernate基本属性 -->
            <property name="hibernate.show_sql" value="true" />
            <property name="hibernate.format_sql" value="true" />
          <!--  <property name="hibernate.hbm2ddl.auto" value="update" />-->
            <property name="hibernate.dialect" value="org.hibernate.dialect.Oracle10gDialect" />
        </properties>
    </persistence-unit>
</persistence>
```

#### 2.3 创建持久化实体类



```kotlin
package org.zj.jpa.demo.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by ZhangJian on 2018/1/17.
 */
@Entity
@Table(name = "t_order")
public class OrderEntity {
    @Id
    @SequenceGenerator(name="seq_name",sequenceName = "order_seq",allocationSize = 1)
    @GeneratedValue(generator = "seq_name")
    private Long id;
    private String description;
    private BigDecimal totalMoney;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createOrderTime;
    private Integer state;
```

#### 2.4 测试



```swift
package org.zj.jpa.demo.test;

import org.zj.jpa.demo.entity.OrderEntity;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

/**
 * Created by ZhangJian on 2018/1/17.
 */
public class App {
    public static void main(String[] args) {

        // 创建 EntityManagerFactory 对象 类似于 Hibernate 中 sessionFactory 对象
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("helloJpa");
        // 创建 EntityManager 对象 类似于 Hibernate 中的 Session 对象
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        // 开启事务
        entityManager.getTransaction().begin();

        // 持久化实体操作
        OrderEntity order =  new OrderEntity();
        order.setCreateOrderTime(new Timestamp(new Date().getTime()));
        order.setDescription("田鸡又肚子疼");
        order.setState(1);
        order.setTotalMoney(new BigDecimal(2000));

        entityManager.persist(order);


        // 提交事务
        entityManager.getTransaction().commit();
        entityManager.close();
        entityManagerFactory.close();

    }
}
```

#### 3.注解元数据介绍



```dart
/**
 * Entity 注解： 定义该类为持久化类
 *      name 属性：定义数据库中的表名 跟 该持久化类进行关联，可以不配，默认关联的以实体类的类名对应的表。
 * Table 注解： 如果数据库中没有表，使用该注解，定义自动创建表的时候的表名
 *
 * ID 注解 ： 定义标识属性
 * GeneratedValue 注解： 描述主键的生成的策略
 *          JPA  使用 GenerationType 该枚举类型定义了 4 种 生成策略：
 *              AUTO: 底层是否支持自增长或者序列
 *              IDENTITY：必须 数据库支持 自增长策略。 mysql
 *              SEQUENCE：支持序列的数据库，oracle ：HIBERNATE_SEQ
 *              TABLE: hibernate 自动创建一个 Table 来保存主键值。
 *
 * SequenceGenerator 注解：定义创建序列的规则
 *
 *
 * Column 注解： 定义对应的表的字段的名称，约束的规则(定义长度，唯一....),该注解可以不配，不配默认使用实体属性名称作为表的列名称
 *
 *
 * Temporal 注解：定义表中日期的列采用具体的日期类型。
 *      JPA 使用 TemporalType 该枚举类型 定义了 3z 中 数据库日期类型：
 *          date：带年月日
 *          time：带时分秒
 *          TIMESTAMP：带年月日时分秒后面的更加精确的时间
 *
 * Transient 注解：指定修饰的属性，不作为表中的列。忽略该属性
 *@ManyToOne和@OneToMany 注解@ManyToOne和@OneToMany 注解   *link:https://blog.csdn.net/xiaodaiye/article/details/51118870
 */
@Entity
@Table(name = "t_order")
public class OrderModel {

    @Id
    @GeneratedValue(generator = "order_seq")
    @SequenceGenerator(name = "order_seq",sequenceName = "order_seq",allocationSize = 1)
    private Long id;

    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createOrdTime;
    private Integer state;
    private Double totalMoney;

    @Transient
    private  String noCreateColumn;
```

#### 4. JPA 常用 API

- Persistence：JPA 提供的一个获取 EntityManagerFactory 对象的工具类
  Persistence.createEntityManagerFactory("helloJpa")
- EntityManagerFactory JPA 应用中只有一份，通过它创建 EntityManager 对象。
- EntityManager  封装 CRUD 基本操作，管理 实体对象状态，一级缓存。
  ***entityManager.persist(order)：\***没有主键的返回值，该方法的执行也会把一个临时状态的 对象转为受容器管理的 持久化对象。只有在刷新容器或者事务提交的时候，才会发 insert 语句到 数据库。
  ***entityManager.find(OrderModel.class, 1L)：\***返回的是受容器管理的真实的类型的对象，立即加载。
  ***entityManager.getReference(OrderModel.class,1l)：\***返回的是受容器管理的真实的类型的对象，懒加载
  ***更新操作方式1，使用快照更新:\***OrderModel orderModel = entityManager.find(OrderModel.class, 1L);
  orderModel.setDescription("通过快照更新，没有显示的调用 meger方法");
  ***更新操作方式2，meger:\*** 传入参数对象如果是 DO 对象，执行完该方法然后是 DO 对象，但是方法执行后返回的是 PO 对象。merger 更新的 DO 对象会把更新的数据就会覆盖容器中已经存在的要修改的 PO 对象数据。merger 的参数对象是 TO ，就会执行 insert 操作。
  ***entityManager.remove(orderModel):\***删除的参数对象为 PO 对象
  ***entityManager.createQuery("from OrderModel ")：\***创建 Quqery 接口，需要出入 JPQL 语句。
- Quqery 接口 API：
  ***query.getResultList():\***查询记录使用 List 封装。
  ***query.getSingleResult():\*** 查询当行记录
  ***setFirstResult(0):\*** 设置开始下标
  ***setMaxResults(1):\***设置抓取记录条数
  **jpql 带参数的查询支持三种:请看hibernate***





#### 创建数据访问接口



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





# 3 spring boot整合jpa

#### 1.导入jar包

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

#### 2.yml配置文件

```
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mytest
    type: com.alibaba.druid.pool.DruidDataSource
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver //驱动
  jpa:
    hibernate:
      ddl-auto: update //自动更新
    show-sql: true  //日志中显示sql语句
```

这里注意:
`jpa:hibernate:ddl-auto: update`是hibernate的配置属性，其主要作用是：自动创建、更新、验证数据库表结构。该参数的几种配置如下：
1.·create：每次加载hibernate时都会删除上一次的生成的表，然后根据你的model类再重新来生成新表，哪怕两次没有任何改变也要这样执行，这就是导致数据库表数据丢失的一个重要原因。
2.·create-drop：每次加载hibernate时根据model类生成表，但是sessionFactory一关闭,表就自动删除。
3.·update：最常用的属性，第一次加载hibernate时根据model类会自动建立起表的结构（前提是先建立好数据库），以后加载hibernate时根据model类自动更新表结构，即使表结构改变了但表中的行仍然存在不会删除以前的行。要注意的是当部署到服务器后，表结构是不会被马上建立起来的，是要等应用第一次运行起来后才会。
4.·validate：每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但是会插入新值。
**我在初次创建时会设为create,创建好后改为validate.**

相信你已经感受到Spring Boot的便利之处：JPA的传统配置在`persistence.xml`文件中，但是这里我们不需要。当然，最好在构建项目时候按照之前提过的[最佳实践的工程结构](http://blog.didispace.com/spring-boot-learning-21-1-2/)来组织，这样以确保各种配置都能被框架扫描到。

#### 3.实体类

既然上边的参数可以帮助我们自动的去通过实体类来创建维护表,那么实体类该怎么写呢,又是怎么建立与表的映射

简单的创建一个实体类:get/set方法由注解实现

```
@Entity
@Getter
@Setter
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "agee", length = 4)
    private int age;
}
```

创建好实体类并标注好注解后启动主启动类,应该就会在你配置的数据库中自动生成表.

#### 4.创建数据访问接口(Repository接口)

personRepository接口如下,

![image-20210720113456465](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210720113456.png)

若只是简单的对单表进行crud只需要继承JpaRepository接口,传递了两个参数:**1.实体类,2.实体类中主键类型**

```
public interface PersonRepository extends JpaRepository<Person, Long> {
}
```

**在Spring Data JPA中，只需要编写类似上面这样的接口就可实现数据访问。不再像我们以往编写了接口时候还需要自己编写接口实现类，直接减少了我们的文件清单。**

下面对上面的`UserRepository`做一些解释，**该接口继承自`JpaRepository`，通过查看`JpaRepository`接口的[API文档](http://docs.spring.io/spring-data/data-jpa/docs/current/api/)，可以看到该接口本身已经实现了创建（save）、更新（save）、删除（delete）、查询（findAll、findOne）等基本操作的函数，因此对于这些基础操作的数据访问就不需要开发者再自己定义。**



但是当然,我们在工作使用中,不可能只是简单的根据字段查一下就可以了,当你需要传入整个实体类,在根据其中的所有属性进行动态复杂查询,那仅仅继承这个接口就不能满足我们的需求了,

就需要我们再去**继承`JpaSpecificationExecutor<T>`该接口,**泛型内传入实体类,只要简单**实现`toPredicate`方法就可以实现复杂的查询,**

该接口中提供了几个方法:

```
public interface JpaSpecificationExecutor<T> {

    T findOne(Specification<T> spec);

    List<T> findAll(Specification<T> spec);

    Page<T> findAll(Specification<T> spec, Pageable pageable);

    List<T> findAll(Specification<T> spec, Sort sort);

    long count(Specification<T> spec);
}
```

方法中的`Specification`就是需要我们传进去的参数，它是一个接口,也是我们实现复杂查询的关键,其中只有一个方法`toPredicate`

```
public interface Specification<T> {

    Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb);
}
```

其api编写可以参考:
http://blog.csdn.net/dracotianlong/article/details/28445725
http://developer.51cto.com/art/200911/162722.htm

#### 5.Controller

然后我们可以直接**在controller中编写代码**即可(如果业务复杂,当然假如service层也是最好).

简单crud:

```
@RestController
@RequestMapping(value = "person")
public class PerconController {

    @Autowired
    private PersonRepository personRepository;

    @PostMapping(path = "addPerson")
    public void addPerson(Person person) {
        personRepository.save(person);
    }

    @DeleteMapping(path = "deletePerson")
    public void deletePerson(Long id) {
        personRepository.delete(id);
    }
}
```

简单的crud甚至不需要在Repository中写代码,JpaRepository中已有封装好的直接使用即可.

那么我们怎么自己去编写一些简单的代码呢?

我们以根据name查询person为例:
在repository接口中添加如下查询方法：
1.注意方法名一定是findBy+属性名

```
Person findByName(String name);
```

还需要注意根据ID查找的findById是不用自己添加方法的,由接口已经封装,但是源码中返回的是Optional 类型。那么这个时候该如何获得T 实体类类型呢,只需要get()即可,就是`findById(Id).get()` 即返回T类型

2.除了添加findBy这种不用写sql的方法外,还有一种可以自己编写sql的方法:

可以在所添加的方法上通过@Query注解,在value属性上写sql语句来完成对数据库的操作,

带参查询:（1、根据参数位置2、根据Param注解）

```
   /**
     * 查询根据参数位置
     * @param name
     * @return
     */
    @Query(value = "select * from person  where name = ?1",nativeQuery = true)
    Person findPersonByName(String Name);
 
    /**
     * 查询根据Param注解
     * @param name
     * @return
     */
    @Query(value = "select p from person p where p.uname = :name")
    Person findPersonByNameTwo(@Param("name") String name);
```

相信大家也注意到,在@Query中传入了一个属性nativeQuery,

- @Query有nativeQuery=true，表示可执行的原生sql，原生sql指可以直接复制sql语句给参数赋值就能运行
- @Query无nativeQuery=true， 表示不是原生sql，查询语句中的表名则是对应的项目中实体类的类名

**注意:**
对于自定义sql的删改方法,在方法上还要添加`@Transactional/@Modifying`注解,如下所示:

```
@Transactional
@Modifying
@Query(value = "delete from Account where id =?1",nativeQuery = true)
void delAccount(int id);
```

**这里去了解了一下其生成sql的原理:**

其实JPA在这里遵循Convention over configuration（约定大约配置）的原则，遵循spring 以及JPQL定义的方法命名。Spring提供了一套可以通过命名规则进行查询构建的机制。这套机制会把方法名首先过滤一些关键字，比如 find…By, read…By, query…By, count…By 和 get…By 。系统会根据关键字将命名解析成2个子语句，第一个 By 是区分这两个子语句的关键词。这个 By 之前的子语句是查询子语句（指明返回要查询的对象），后面的部分是条件子语句。如果直接就是 findBy… 返回的就是定义Respository时指定的领域对象集合，同时JPQL中也定义了丰富的关键字：and、or、Between等等，下面我们来看一下JPQL中有哪些关键字：

Keyword Sample JPQL snippet

1. And----findByLastnameAndFirstname----where x.lastname = ?1 and
2. Or----findByLastnameOrFirstname----where x.lastname = ?1 or x.firstname = ?2
3. Is,Equals----findByFirstnameIs,findByFirstnameEquals----where x.firstname = ?1
4. Between----findByStartDateBetween----where x.startDate between ?1 and ?2
5. LessThan----findByAgeLessThan----where x.age < ?1
6. LessThanEqual----findByAgeLessThanEqual----where x.age ⇐ ?1
7. GreaterThan----findByAgeGreaterThan----where x.age > ?1
8. GreaterThanEqual----findByAgeGreaterThanEqual----where x.age >= ?1
9. After----findByStartDateAfter----where x.startDate > ?1
10. Before----findByStartDateBefore----where x.startDate < ?1
11. IsNull----findByAgeIsNull----where x.age is null
12. IsNotNull,NotNull----findByAge(Is)NotNull----where x.age not null
13. Like----findByFirstnameLike----where x.firstname like ?1
14. NotLike----findByFirstnameNotLike----where x.firstname not like ?1
15. StartingWith----findByFirstnameStartingWith----where x.firstname like ?1 (parameter bound with appended %)
16. EndingWith----findByFirstnameEndingWith----where x.firstname like ?1 (parameter bound with prepended %)
17. Containing----findByFirstnameContaining----where x.firstname like ?1 (parameter bound wrapped in %)
18. OrderBy----findByAgeOrderByLastnameDesc----where x.age = ?1 order by x.lastname desc
19. Not----findByLastnameNot----where x.lastname <> ?1
20. In----findByAgeIn(Collection ages)----where x.age in ?1
21. NotIn----findByAgeNotIn(Collection age)----where x.age not in ?1
22. TRUE----findByActiveTrue()----where x.active = true
23. FALSE----findByActiveFalse()----where x.active = false
24. IgnoreCase----findByFirstnameIgnoreCase----where UPPER(x.firstame) = UPPER(?1)

复杂crud:
复杂crud的查询是依靠`JpaSpecificationExecutor<T>`接口,以及specification的`toPredicate`方法来添加条件,上文中也基本介绍过,所以在这里就简单贴一下代码,大家根据例子,应该就可以自己写了:

```
    public List<Flow> queryFlows(int pageNo, int pageSize, String status, String userName, Date createTimeStart, Date createTimeEnd) {
        List<Flow> result = null;

        // 构造自定义查询条件
        Specification<Flow> queryCondition = new Specification<Flow>() {
            @Override
            public Predicate toPredicate(Root<Flow> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicateList = new ArrayList<>();
                if (userName != null) {
                    predicateList.add(criteriaBuilder.equal(root.get("currentOperator"), userName));
                }
                if (status != null) {
                    predicateList.add(criteriaBuilder.equal(root.get("status"), status));
                }
                if (createTimeStart != null && createTimeEnd != null) {
                    predicateList.add(criteriaBuilder.between(root.get("createTime"), createTimeStart, createTimeEnd));
                }
                if (orderId!= null) {
                    predicateList.add(criteriaBuilder.like(root.get("orderId"), "%" + orderId+ "%"));}
                return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        // 分页和不分页，这里按起始页和每页展示条数为0时默认为不分页，分页的话按创建时间降序
       
        if (pageNo == 0 && pageSize == 0) {
            result = flowRepository.findAll(queryCondition);
        } else {
            result = flowRepository.findAll(queryCondition, PageRequest.of(pageNo - 1, pageSize, Sort.by(Sort.Direction.DESC, "createTime"))).getContent();
        }
       
        return result;
    }
```

理解了之后其实很简单,上边主要就是两部:1.先将你所需要的条件加到predicate集合中去,例子中也有equal/between/like相等/区间/模糊,基本也是平常使用的几个,添加好条件后2.进行了分页,判断有没有传入分页的参数,所有传了就分页,没传就查全部,分页中有一个getContent(),可以不加,不加的话还会返回页数/总条数等一些分页的参数,加这个方法就只返回list集合.

# 4. **实体关系（Relationships）**

目前为止，除了已经提到过的子类和其父类之间的扩展（extends）关系外，我们还没有介绍任何不同实体间的模型关系。JPA为建模中涉及到的实体/表提供了多种关系：

> - `OneToOne`: 在这种关系中每个实体只含有一个明确的对其它实体的引用；反之亦然。
> - `OneToMany / ManyToOne`: 在这种关系中，一个实体可以有多个子实体，每个子实体只属于一个父实体。
> - `ManyToMany`: 在这种关系中，一种类型的多个实体，可以含有其它类型实体的多个引用。
> - `Embedded`: 在这种关系中，其它实体是和其父实体存储在同一个表中（即，每一个表都有两个实体）。
> - `ElementCollection`: 这种关系类似于OneToMany关系，但不同的是，它的引用实体是Embedded实体。这样我们就可以在简单对象上定义OneToMany关系，而不必定义在另外的表中使用的“普通”Embedded关系。

代码例子：

```java
package com.example.accessingdatamysql.pojo;
/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-05-25
 */

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.ToOne;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;

/**
 * 类<code>Doc</code>用于：TODO
 * word class pojo
 *
 * @author 12824
 * @version 1.0
 * @date 2021-05-25
 */

@Data
@NoArgsConstructor //无参数构造
@ApiModel(description = "单词model")
@Component
@Entity
@Table(name = "t_word")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @ApiModelProperty(name = "auto_id")
    private Long id;
    /*word*/
    @ApiModelProperty("单词")
    @Column(unique = true)
    private String word;
    /*meaning*/
    @ApiModelProperty("翻译")
    private String mean;
    /*voice*/
    @ApiModelProperty("声音")
    private String voice = null;
    /*this word's sentence*/
    @ApiModelProperty("句子")
    private String sentence = null;
/*FetchType.EAGER是其默认值，它表示我们每次加载一个Person时也要同时加载IdCard*/
    @OneToOne(cascade = {CascadeType.ALL},fetch = FetchType.EAGER) //表与表的关系
    @ApiModelProperty("时间相关")
    @JoinColumn(name = "time_id")
    private Time time;/*告诉JPA每个Word含有一个确定的time*/

    @OneToOne(cascade = {CascadeType.ALL}) //表与表的关系
    @ApiModelProperty("记忆相关")
    @JoinColumn(name = "memory_id") /*告诉JPA每个Word含有一个确定的Memory*/
    private Memorys memory;
//    因为“一个”user"可能拥有“多个”Word "。

//    @ApiModelProperty("使用者")
//    @ManyToOne
//    private User user;

}
```

```java
package com.example.accessingdatamysql.pojo;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//database use
//@Entity // This tells Hibernate to make a table out of this class
@Data
@Entity
@Table(name = "t_user")
@Component
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String userName="yt";
    //    password
    private String passWord="123456";
    private String APP_ID="20210523000838775";
    /*所以设置这个关系的加载方式为懒加载（lazy，虽然这就是它的默认值，这里我们还是显式设置这个值）*/
//    @OneToMany(targetEntity = Word.class,mappedBy = "user")
//    private List<Word> words;
    /*userName*/
//    appid
    private String SECURITY_KEY="xo18_JiGcZFnWW2huGLR";



}
```

```java
package com.example.accessingdatamysql.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import javax.validation.constraints.Null;
import java.util.Date;

/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-07-19
 */
@Data
@Entity
@Table(name = "t_time")
@NoArgsConstructor
@Component
public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /*第一次查询时间*/
    @Temporal(TemporalType.DATE)
    private Date firstQuery;
    /*最后查询时间*/
    @Temporal(TemporalType.DATE)
    private Date FinallyQueryTime;
    /*查询总次数*/
    private Integer queriesTotal;
    /*最近记忆时间*/
    @Temporal(TemporalType.DATE)
    private Date recentMemeryTime;
    @OneToOne //表与表的关系
    private Word word;

}
```

```java
package com.example.accessingdatamysql.pojo;

import com.example.accessingdatamysql.util.MemoryEffect;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-07-19
 */

@Entity
@Table(name = "t_memery")
@NoArgsConstructor //无参数构造
@Data //自动set and get
@Component
public class Memorys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /*totalMemoryCount*/
    private Integer totalMemoryCount;
    /*memory effect*/
    private MemoryEffect memoryEffect;
    /*记忆有效次数*/
    private long effectiveTimesOfMemory;
    /*下一个记忆时间*/
    private Date nextMemoryTime;
//    /*所有记忆时间*/
    @OneToMany(targetEntity = AllMemoryTime.class,cascade={CascadeType.ALL},mappedBy = "memory")
    private List<AllMemoryTime> allMemoryTime;
}


```

```java
package com.example.accessingdatamysql.pojo;


import com.example.accessingdatamysql.util.MemoryEffect;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;

/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-07-19
 */
@Data
@Entity
@Table(name = "t_all_memory_time")
@NoArgsConstructor
@Component
public class AllMemoryTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //记忆时间
    @Temporal(TemporalType.DATE)
    private Date rememberTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memory_id")
    private Memorys memory;
    /*记忆效果*/
    private MemoryEffect memoryEffect;
}
```



来源：

https://www.javacodegeeks.com/2015/04/jpa%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.html#setup

## 补充

问题:

# [org.hibernate.MappingException: Could not determine type for: java.util.List, at table: College, for columns: [org.hibernate.mapping.Column(students)\]](https://stackoverflow.com/questions/3774198/org-hibernate-mappingexception-could-not-determine-type-for-java-util-list-at)

[Ask Question](https://stackoverflow.com/questions/ask)

You are using **field access strategy** (determined by @Id annotation). Put any JPA related annotation right above each field instead of getter property

```java
@OneToMany(targetEntity=Student.class, mappedBy="college", fetch=FetchType.EAGER)
private List<Student> students;
```



**get 和 fild只能选一个.** 不能在两边标注.



# 5. JPA-分页查询和常用属性

```java
Pageable pageRequest = PageRequest.of(int page, int size);

```

> page：从第几页开始，第一页是0
> size：每一页查询数量

More Actions![image-20210619171542752](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210619171547.png)

```java
Pageable pageable = all.getPageable();
```

![image-20210619171652080](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210619171652.png)

而Pageable对象并没有判断是否还有下一页的功能







###  Spring Data JPA 的高级用法

实现了**复杂查询**:https://www.cnblogs.com/zyt528/p/10019820.html





# [@Query 使用方法](https://www.cnblogs.com/zj0208/p/6008627.html)

先确定sql 正确 ，在确定jpa如何写；



## 总结

我也是这两天突然在工作中需要用到JPA,平时也都是使用Mybatis,但是找了很多文章资料,基本也是使用起来已经没有问题了,也完成了业务,所以基础的使用看着一篇就够了,大家有问题的话也欢迎多多指正!

