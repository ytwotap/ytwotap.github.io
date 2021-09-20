# Spring Study



[TOC]

[视频](https://www.bilibili.com/video/BV1Sb411s7vP?p=9)



------

# 小技巧

**学习：**

- 官方文档

- 视频 

- 非官方文档

- 搜索关键字图片。

  

  

  



# 需要学习更新延伸知识点！

- [spring](https://www.bilibili.com/video/BV1Sb411s7vP?p=82) ok

  - 最典型的是管理数据库的Connection  ok
  - 学习jdbc ok
  - 学习多线程 ok
  - [java系列](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301178105890) 依赖管理ok
  - junit ok
  - 线程（） ok
  - threadlocal varible ok
  - datasource ok
  - 动态代理 proxy ok

  

- [spring boot](https://www.bilibili.com/video/BV1Et411Y7tQ?from=search&seid=10929547151907157144) 

  - JPA
  - jsp
------


## [jdbc](https://zh.wikipedia.org/wiki/Java%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5)

**Java数据库连接**，（**Java Database Connectivity**，简称**JDBC**）是[Java语言](https://zh.wikipedia.org/wiki/Java语言)中用来规范[客户端](https://zh.wikipedia.org/wiki/客户端)程序如何来访问[数据库](https://zh.wikipedia.org/wiki/数据库)的[应用程序接口](https://zh.wikipedia.org/wiki/应用程序接口)，提供了诸如查询和更新数据库中数据的方法。

在[J2SE](https://zh.wikipedia.org/wiki/J2SE)中，提供了一个称之为JDBC-ODBC桥（JDBC-ODBC Bridge[[2\]](https://zh.wikipedia.org/wiki/Java数据库连接#cite_note-2)）的API。通过[ODBC](https://zh.wikipedia.org/wiki/ODBC)，JDBC-ODBC桥[驱动程序](https://zh.wikipedia.org/wiki/驱动程序)可以访问所有支持ODBC的关系型数据库。与JDBC API不同的是，这个驱动程序并不是由Java代码而是由[机器代码](https://zh.wikipedia.org/wiki/机器语言)（native code）编写，并且不是[开放源代码](https://zh.wikipedia.org/wiki/开放源代码)的[[3\]](https://zh.wikipedia.org/wiki/Java数据库连接#cite_note-3)。



### [jdbc study](https://www.studytonight.com/java/introduction-to-jdbc.php)

![image-20200530102639740](D:\src\Typora记录\spring boot\imge\image-20200530102639740.png)

**Java Database Connectivity(JDBC)** is an **Application Programming Interface(API)** used to connect Java application with Database.

------



### JDBC Driver

JDBC Driver is required to process SQL requests and generate result. The following are the different types of driver available in JDBC.

- **Type-1 Driver** or **JDBC-ODBC bridge**
- **Type-2 Driver** or **Native API Partly Java Driver**
- **Type-3 Driver** or **Network Protocol Driver**
- **Type-4 Driver** or **Thin Driver**

------



### JDBC-ODBC bridge

**Type-1 Driver** act as a bridge between JDBC and other database connectivity mechanism(ODBC). This driver converts JDBC calls into ODBC calls and redirects the request to the ODBC driver.

![JDBC-ODBC bridge](https://www.studytonight.com/java/images/jdbc-driver1.jpg)

**Advantage**

- Easy to use
- Allow easy connectivity to all database supported by the ODBC Driver.

**Disadvantage**

- Slow execution time
- Dependent on ODBC Driver.
- Uses Java Native Interface(JNI) to make ODBC call.

------

### Native API Driver

This type of driver make use of Java Native Interface(JNI) call on database specific native client API. These native client API are usually written in C and C++.

![Native API Driver](https://www.studytonight.com/java/images/jdbc-driver2.jpg)

**Advantage**

- faster as compared to **Type-1 Driver**
- Contains additional features.

**Disadvantage**

- Requires native library
- Increased cost of Application

### Network Protocol Driver

This driver translate the JDBC calls into a database server independent and Middleware server-specific calls. Middleware server further translate JDBC calls into database specific calls.

![Network Protocol Driver](https://www.studytonight.com/java/images/jdbc-driver3.jpg)

**Advantage**

- Does not require any native library to be installed.
- Database Independency.
- Provide facility to switch over from one database to another database.

**Disadvantage**

- Slow due to increase number of network call.

------



### Thin Driver

This is Driver called Pure Java Driver because. This driver interact directly with database. It does not require any native database library, that is why it is also known as Thin Driver.

![Thin Driver](https://www.studytonight.com/java/images/jdbc-driver4.jpg)

**Advantage**

- Does not require any native library.
- Does not require any Middleware server.
- Better Performance than other driver.

**Disadvantage**

- Slow due to increase number of network call.



### DriverManager class

------

In Java, the DriverManager class it an interface between the User and the Driver. This class is used to have a watch on driver which is been used for establishing the connection between a database and a driver. The DriverManager class have a list of Driver class which are registered and are called as `DriverManager.registerDriver()`.

------

| S.No. | Method                                                       | Description                                                  |
| :---- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 1     | public static void registerDriver(Driver driver)             | It is used for Registering the Driver with the Driver Manager. |
| 2     | public static void deregisterDriver(Driver driver)           | It is used for Deregistering the Driver with the Driver Manager. |
| 3     | public static Connection getConnection(String Url)           | It is used for establishing a connection with the given URL. |
| 4     | public static Connection getConnection(String Url, String username, String password) | It is used for establishing the connection with the given URL, username and password. |

### Connection interface

------

In Java, The Connection interface is used for creating the session between the application and the database. This interface contains Statement, PreparedStatement and DatabaseMetaData. The connection objects are used in Statement and the DatabaseMetaData. commit(), rollback() etc.. are some of the methods of Connection Interface.

------

| S.No. | Method                                                       | Description                                                  |
| :---- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 1     | public Statement createStatement()                           | It is used for creating an object of statement for executing the SQL queries. |
| 2     | public Statement createStatement(intresultSetType,intresultSetConcurrency) | It is used for creating objects for the ResultSet from the given type and concurrency. |
| 3     | public void setAutoCommit(boolean status)                    | It is used for setting the commit status. By default, it is always true. |
| 4     | public void commit()                                         | It is used to save the changes which have been commit or rollback permanent |
| 5     | public void rollback()                                       | It is used to delete the changes which have been commit or rollback permanent |
| 6     | public void close()                                          | It is used to delete the changes which have been commit or rollback permanent |



### Statement interface

------

In Java, The Statement interface is used for executing queries using the database. This interface is a factory of ResultSet. It is used to get the Object of ResultSet.

------

| S.No. | Method                                   | Description                                     |
| :---- | :--------------------------------------- | :---------------------------------------------- |
| 1     | public ResultSetexecuteQuery(String sql) | It is used for executing the SELECT query       |
| 2     | public intexecuteUpdate(String sql)      | It is used for executing any specified query    |
| 3     | public boolean execute(String sql)       | It is used when multiple results are required.  |
| 4     | public int[] executeBatch()              | It is used for executing the batch of commands. |

### ResultSet interface

------

In Java, the ResultSet Interface is used for maintaining the pointer to a row of a table. In starting the pointer is before the first row. The object can be moved forward as well as backward direction using TYPE_SCROLL_INSENSITIVE or TYPE_SCROLL_SENSITIVE in createStatement(int,int).

------

| S.No. | Method                                    | Description                                                  |
| :---- | :---------------------------------------- | :----------------------------------------------------------- |
| 1     | public boolean next()                     | It is used for moving the cursor to the next position from the current position. |
| 2     | public boolean previous()                 | It is used for moving the cursor to the previous position from the current position. |
| 3     | public boolean first()                    | It is used for moving the cursor to the first position from the current position. |
| 4     | public booleanlast()                      | It is used for moving the cursor to the Last position from the current position. |
| 5     | public booleanabsolute(int row)           | It is used for moving the cursor to the specified position from the current position. |
| 6     | public booleanrelative(int row)           | It is used for moving the cursor to the relative row number from the current position. |
| 7     | public intgetInt(intcolumnIndex)          | It is used to get the data from the specified position.      |
| 8     | public intgetInt(String columnName)       | It is used to get the data from the specified column name of the current row. |
| 9     | public StringgetString(intcolumnIndex)    | It is used to get the data from the specified column name of the current row in form of an integer. |
| 10    | public StringgetString(StringcolumnIndex) | It is used to get the data from the specified column name of the current row in form of string. |

------

### PreparedStatement interface

------

In Java, The PreparedStatement interface is a subinterface of Statement. It is mainly used for the parameterized queries. A question mark (?) is passed for the values. The values to this question marks will be set by the PreparedStatement.

**Example: “insert into student values(?, ?, ?, ?)”;**



| S.No. | Method                                             | Description                                                  |
| :---- | :------------------------------------------------- | :----------------------------------------------------------- |
| 1     | public void setInt(intparamIndex, int value)       | It is used for setting the integer value for the given parameter index. |
| 2     | public void setString(intparamIndex, String value) | It is used for setting the String value for the given parameter index. |
| 3     | public void setFloat(intparamIndex, float value)   | It is used for setting the Float value for the given parameter index. |
| 4     | public void setDouble(intparamIndex, double value) | It is used for setting the Double value for the given parameter index. |
| 5     | public intexecuteUpdate()                          | It is used for executing a query.                            |
| 6     | public ResultSetexecuteQuery()                     | It is used for executing the select query.                   |

------

### ResultSetMetaData Interface

------

In Java, The ResultSetMetaData interface is used to get metadata from the ResultSetobject. Metadata are the data about data.



| S.No. | Method                                                       | Description                                                  |
| :---- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 1     | public intgetColumnCount()throws SQLException                | It is used to get the total number of columns.               |
| 2     | public String getColumnName(int index)throws SQLException    | It is used to get the name of the column of a specified column index. |
| 3     | public StringgetColumnTypeName(int index)throws SQLException | It is used to get the name of the column of a specified index. |
| 4     | public StringgetTableName(int index)throws SQLException      | It is used to get the name of a table from the specified column index |

------



### Transaction Management in JDBC(事务管理)

Transaction represents **a single unit of work**.

The ACID properties describes the transaction management well. ACID stands for Atomicity, Consistency, isolation and durability.

**Atomicity** means either all successful or none.

**Consistency** ensures bringing the database from one consistent state to another consistent state.

**Isolation** ensures that transaction is isolated from other transaction.

**Durability** means once a transaction has been committed, it will remain so, even in the event of errors, power loss etc.

------

#### Advantage of Transaction Mangaement

**fast performance** It makes the performance fast because database is hit at the time of commit.

------

![transaction management in jdbc](https://static.javatpoint.com/images/hibernate/tx.jpg)

In JDBC, **Connection interface** provides methods to manage transaction.

| Method                             | Description                                                  |
| :--------------------------------- | :----------------------------------------------------------- |
| void setAutoCommit(boolean status) | It is true bydefault means each transaction is committed bydefault. |
| void commit()                      | commits the transaction.                                     |
| void rollback()                    | cancels the transaction.                                     |

------



#### Simple example of transaction management in jdbc using Statement

Let's see the simple example of transaction management using Statement.

```java
1. **import** java.sql.*; 
2. **class** FetchRecords{ 
3. **public** **static** **void** main(String args[])**throws** Exception{ 
4. Class.forName("oracle.jdbc.driver.OracleDriver"); 
5. Connection con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","system","oracle"); 
6. con.setAutoCommit(**false**); 
7.  
8. Statement stmt=con.createStatement(); 
9. stmt.executeUpdate("insert into user420 values(190,'abhi',40000)"); 
10. stmt.executeUpdate("insert into user420 values(191,'umesh',50000)"); 
11.  
12. con.commit(); 
13. con.close(); 
14. }} 
```



If you see the table emp400, you will see that 2 records has been added.

#### Example of transaction management in jdbc using PreparedStatement

Let's see the simple example of transaction management using PreparedStatement.

```java
1. **import** java.sql.*; 
2. **import** java.io.*; 
3. **class** TM{ 
4. **public** **static** **void** main(String args[]){ 
5. **try**{ 
6.  
7. Class.forName("oracle.jdbc.driver.OracleDriver"); 
8. Connection con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","system","oracle"); 
9. con.setAutoCommit(**false**); 
10.  
11. PreparedStatement ps=con.prepareStatement("insert into user420 values(?,?,?)"); 
12.  
13. BufferedReader br=**new** BufferedReader(**new** InputStreamReader(System.in)); 
14. **while**(**true**){ 
15.  
16. System.out.println("enter id"); 
17. String s1=br.readLine(); 
18. **int** id=Integer.parseInt(s1); 
19.  
20. System.out.println("enter name"); 
21. String name=br.readLine(); 
22.  
23. System.out.println("enter salary"); 
24. String s3=br.readLine(); 
25. **int** salary=Integer.parseInt(s3); 
26.  
27. ps.setInt(1,id); 
28. ps.setString(2,name); 
29. ps.setInt(3,salary); 
30. ps.executeUpdate(); 
31.  
32. System.out.println("commit/rollback"); 
33. String answer=br.readLine(); 
34. **if**(answer.equals("commit")){ 
35. con.commit(); 
36. } 
37. **if**(answer.equals("rollback")){ 
38. con.rollback(); 
39. } 
40.  
41.  
42. System.out.println("Want to add more records y/n"); 
43. String ans=br.readLine(); 
44. **if**(ans.equals("n")){ 
45. **break**; 
46. } 
47.  
48. } 
49. con.commit(); 
50. System.out.println("record successfully saved"); 
51.  
52. con.close();//before closing connection commit() is called 
53. }**catch**(Exception e){System.out.println(e);} 
54.  
55. }} 
```



It will ask to add more records until you press n. If you press n, transaction is committed.

--------

### sql[事务](https://www.liaoxuefeng.com/wiki/1177760294764384/1179611198786848)





在执行SQL语句的时候，某些业务要求，一系列操作必须全部执行，而不能仅执行一部分。例如，一个转账操作：

```
-- 从id=1的账户给id=2的账户转账100元
-- 第一步：将id=1的A账户余额减去100
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- 第二步：将id=2的B账户余额加上100
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
```

这两条SQL语句必须全部执行，或者，由于某些原因，如果第一条语句成功，第二条语句失败，就必须全部撤销。

这种把多条语句作为一个整体进行操作的功能，被称为数据库*事务*。数据库事务可以确保该事务范围内的所有操作都可以全部成功或者全部失败。如果事务失败，那么效果就和没有执行这些SQL一样，不会对数据库数据有任何改动。

可见，数据库事务具有ACID这4个特性：

- A：Atomic，原子性，将所有SQL作为原子工作单元执行，要么全部执行，要么全部不执行；
- C：Consistent，一致性，事务完成后，所有数据的状态都是一致的，即A账户只要减去了100，B账户则必定加上了100；
- I：Isolation，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其他事务隔离；
- D：Duration，持久性，即事务完成后，对数据库数据的修改被持久化存储。



对于单条SQL语句，数据库系统自动将其作为一个事务执行，这种事务被称为*隐式事务*。

要手动把多条SQL语句作为一个事务执行，使用`BEGIN`开启一个事务，使用`COMMIT`提交一个事务，这种事务被称为*显式事务*，例如，把上述的转账操作作为一个显式事务：

```
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

很显然多条SQL语句要想作为一个事务执行，就必须使用显式事务。

`COMMIT`是指提交事务，即试图把事务内的所有SQL所做的修改永久保存。如果`COMMIT`语句执行失败了，整个事务也会失败。

有些时候，我们希望主动让事务失败，这时，可以用`ROLLBACK`回滚事务，整个事务会失败：

```
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
ROLLBACK;
```

数据库事务是由数据库系统保证的，我们只需要根据业务逻辑使用它就可以。

#### 隔离级别

对于两个并发执行的事务，如果涉及到操作同一条记录的时候，可能会发生问题。因为并发操作会带来数据的不一致性，包括脏读、不可重复读、幻读等。数据库系统提供了隔离级别来让我们有针对性地选择事务的隔离级别，避免数据不一致的问题。

SQL标准定义了4种隔离级别，分别对应可能出现的数据不一致的情况：

| Isolation Level  | 脏读（Dirty Read） | 不可重复读（Non Repeatable Read） | 幻读（Phantom Read） |
| :--------------- | :----------------- | :-------------------------------- | :------------------- |
| Read Uncommitted | Yes                | Yes                               | Yes                  |
| Read Committed   | -                  | Yes                               | Yes                  |
| Repeatable Read  | -                  | -                                 | Yes                  |
| Serializable     | -                  | -                                 | -                    |

我们会依次介绍4种隔离级别的数据一致性问题。

#### 小结

数据库事务具有ACID特性，用来保证多条SQL的全部执行。

实例



## [Maven](https://www.javatpoint.com/maven-tutorial)

----

[指导来源](https://www.javatpoint.com/maven-tutorial)

Maven tutorial provides basic and advanced concepts of **apache maven** technology. Our maven tutorial is developed for beginners and professionals.

#### Understanding the problem without Maven

There are many problems that we face during the project development. They are discussed below:

**1) Adding set of Jars in each project:** In case of struts, spring, hibernate frameworks, we need to add set of jar files in each project. It must include all the dependencies of jars also.

**2) Creating the right project structure:** We must create the right project structure in servlet, struts etc, otherwise it will not be executed.

**3) Building and Deploying the project:** We must have to build and deploy the project so that it may work.



#### What it does?

Maven simplifies the above mentioned problems. It does mainly following tasks.

1. It makes a project easy to build
2. It provides uniform build process (maven project can be shared by all the maven projects)
3. It provides project information (log document, cross referenced sources, mailing list, dependency list, unit test reports etc.)
4. It is easy to migrate for new features of Maven

Apache Maven helps to manage

- Builds
- Documentation
- Reporing
- SCMs
- Releases
- Distribution

#### Maven Repository



A **maven repository** is a directory of packaged JAR file with pom.xml file. Maven searches for dependencies in the repositories. There are 3 types of maven repository:

1. Local Repository
2. Central Repository
3. Remote Repository

Maven searches for the dependencies in the following order:

**Local repository** then **Central repository** then **Remote repository**.

![maven repositories](https://static.javatpoint.com/mavenpages/images/mavenrepository.jpg)

If dependency is not found in these repositories, maven stops processing and throws an error.



#### Maven pom.xml file

------

[next →](https://www.javatpoint.com/maven-example)[prev ←](https://www.javatpoint.com/maven-repository)Maven pom.xml file**POM** is an acronym for **Project Object Model**. The pom.xml file contains information of project and configuration information for the maven to build the project such as dependencies, build directory, source directory, test source directory, plugin, goals etc.Maven reads the pom.xml file, then executes the goal.Before maven 2, it was named as project.xml file. But, since maven 2 (also in maven 3), it is renamed as pom.xml.

#### Elements of maven pom.xml file

For creating the simple pom.xml file, you need to have following elements:

| Element          | Description                                                  |
| :--------------- | :----------------------------------------------------------- |
| **project**      | It is the root element of pom.xml file.                      |
| **modelVersion** | It is the sub element of project. It specifies the modelVersion. It should be set to 4.0.0. |
| **groupId**      | It is the sub element of project. It specifies the id for the project group. |
| **artifactId**   | It is the sub element of project. It specifies the id for the artifact (project). An artifact is something that is either produced or used by a project. Examples of artifacts produced by Maven for a project include: JARs, source and binary distributions, and WARs. |
| **version**      | It is the sub element of project. It specifies the version of the artifact under given group. |

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"   
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0   
http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  
  <modelVersion>4.0.0</modelVersion>  
  <groupId>com.javatpoint.application1</groupId>  
  <artifactId>my-app</artifactId>  
  <version>1</version>  
  
</project>
```



#### Maven pom.xml file with additional elements

Here, we are going to add other elements in pom.xml file such as:

| Element          | Description                                                  |
| :--------------- | :----------------------------------------------------------- |
| **packaging**    | defines packaging type such as jar, war etc.                 |
| **name**         | defines name of the maven project.                           |
| **url**          | defines url of the project.                                  |
| **dependencies** | defines dependencies for this project.                       |
| **dependency**   | defines a dependency. It is used inside dependencies.        |
| **scope**        | defines scope for this maven project. It can be compile, provided, runtime, test and system. |

File: pom.xml

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0"   
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0   
http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  
  <modelVersion>4.0.0</modelVersion>  
  
  <groupId>com.javatpoint.application1</groupId>  
  <artifactId>my-application1</artifactId>  
  <version>1.0</version>  
  <packaging>jar</packaging>  
  
  <name>Maven Quick Start Archetype</name>  
  <url>http://maven.apache.org</url>  
  
  <dependencies>  
    <dependency>  
      <groupId>junit</groupId>  
      <artifactId>junit</artifactId>  
      <version>4.8.2</version>  
      <scope>test</scope>  
    </dependency>  
  </dependencies>  
  
</project>  
```



## [SQL](https://www.javatpoint.com/sql-tutorial)

SQL tutorial provides basic and advanced concepts of SQL. Our SQL tutorial is designed for beginners and professionals.

**SQL** (*Structured Query Language*) is used to perform operations on the records stored in the database such as updating records, deleting records, creating and modifying tables, views, etc.

SQL is just a query language; it is not a database. To perform SQL queries, you need to install any database, for example, Oracle, MySQL, MongoDB, PostGre SQL, SQL Server, DB2, etc.

#### What is SQL

- SQL stands for **Structured Query Language**.
- It is designed for managing data in a relational database management system (RDBMS).
- It is pronounced as S-Q-L or sometime **See-Qwell**.
- SQL is a database language, it is used for database creation, deletion, fetching rows, and modifying rows, etc.
- SQL is based on relational algebra and tuple relational calculus.

All [DBMS](https://www.javatpoint.com/dbms-tutorial) like [MySQL](https://www.javatpoint.com/mysql-tutorial), [Oracle](https://www.javatpoint.com/oracle-tutorial), MS Access, Sybase, Informix, [PostgreSQL](https://www.javatpoint.com/postgresql-tutorial), and [SQL Server](https://www.javatpoint.com/sql-server-tutorial) use SQL as standard database language.



#### Why SQL is required

SQL is required:

- To create new databases, tables and views
- To insert records in a database
- To update records in a database
- To delete records from a database
- To retrieve data from a database



#### What SQL does

- With SQL, we can query our database in several ways, using English-like statements.
- With SQL, a user can access data from a relational database management system.
- It allows the user to describe the data.
- It allows the user to define the data in the database and manipulate it when needed.
- It allows the user to create and drop database and table.
- It allows the user to create a view, stored procedure, function in a database.
- It allows the user to set permission on tables, procedures, and views.



#### SQL Index

------

**SQL Tutorial**

- [Introduction to SQL](https://www.javatpoint.com/sql-tutorial)
- [SQL Syntax](https://www.javatpoint.com/sql-syntax)
- [SQL Data Types](https://www.javatpoint.com/sql-data-types)
- [SQL Operators](https://www.javatpoint.com/sql-operators)

**SQL Database**

- [SQL CREATE Database](https://www.javatpoint.com/sql-create-database)
- [SQL DROP Database](https://www.javatpoint.com/sql-drop-database)
- [SQL RENAME Database](https://www.javatpoint.com/sql-rename-database)
- [SQL SELECT Database](https://www.javatpoint.com/sql-select-database)

**SQL Table**

- [What is Table](https://www.javatpoint.com/sql-table)
- [SQL TABLE Variable](https://www.javatpoint.com/sql-table-variable)
- [SQL CREATE TABLE](https://www.javatpoint.com/sql-create-table)
- [SQL DROP TABLE](https://www.javatpoint.com/sql-drop-table)
- [SQL DELETE TABLE](https://www.javatpoint.com/sql-delete-table)
- [SQL RENAME TABLE](https://www.javatpoint.com/sql-rename-table)
- [SQL TRUNCATE TABLE](https://www.javatpoint.com/sql-truncate-table)
- [SQL COPY TABLE](https://www.javatpoint.com/sql-copy-table)
- [SQL TEMP TABLE](https://www.javatpoint.com/sql-temp-table)
- [SQL ALTER TABLE](https://www.javatpoint.com/sql-alter-table)

**SQL Insert**

- [INSERT Statement](https://www.javatpoint.com/sql-insert)
- [INSERT INTO Values](https://www.javatpoint.com/sql-insert-into-values)
- [INSERT INTO SELECT](https://www.javatpoint.com/sql-insert-into-select)
- [INSERT Multiple Rows](https://www.javatpoint.com/sql-insert-multiple-rows)

**SQL Select**

- [SELECT Statement](https://www.javatpoint.com/sql-select)
- [SQL SELECT UNIQUE](https://www.javatpoint.com/sql-select-unique)
- [SQL SELECT DISTINCT](https://www.javatpoint.com/sql-select-distinct)
- [SQL SELECT COUNT](https://www.javatpoint.com/sql-select-count)
- [SQL SELECT TOP](https://www.javatpoint.com/sql-select-top)
- [SQL SELECT FIRST](https://www.javatpoint.com/sql-select-first)
- [SQL SELECT LAST](https://www.javatpoint.com/sql-select-last)
- [SQL SELECT RANDOM](https://www.javatpoint.com/sql-select-random)
- [SQL SELECT AS](https://www.javatpoint.com/sql-select-as)
- [SQL SELECT IN](https://www.javatpoint.com/sql-select-in)
- [SQL SELECT Multiple](https://www.javatpoint.com/sql-select-from-multiple-tables)
- [SQL SELECT DATE](https://www.javatpoint.com/sql-select-date)
- [SQL SELECT SUM](https://www.javatpoint.com/sql-select-sum)
- [SQL SELECT NULL](https://www.javatpoint.com/sql-select-null)

**SQL Clause**

- [SQL WHERE](https://www.javatpoint.com/sql-where)
- [SQL AND](https://www.javatpoint.com/sql-and)
- [SQL OR](https://www.javatpoint.com/sql-or)
- [SQL WITH](https://www.javatpoint.com/sql-with)
- [SQL AS](https://www.javatpoint.com/sql-select-as)

**SQL Order By**

- [ORDER BY Clause](https://www.javatpoint.com/sql-order-by)
- [ORDER BY ASC](https://www.javatpoint.com/sql-order-by-asc)
- [ORDER BY DESC](https://www.javatpoint.com/sql-order-by-desc)
- [ORDER BY RANDOM](https://www.javatpoint.com/sql-order-by-random)
- [ORDER BY LIMIT](https://www.javatpoint.com/sql-order-by-limit)
- [ORDER BY Multiple Cols](https://www.javatpoint.com/sql-order-by-multiple-columns)

**SQL Update**

- [UPDATE Statement](https://www.javatpoint.com/sql-update)
- [SQL UPDATE JOIN](https://www.javatpoint.com/sql-update-with-join)
- [SQL UPDATE DATE](https://www.javatpoint.com/sql-update-date)

**SQL Delete**

- [DELETE Statement](https://www.javatpoint.com/sql-delete)
- [SQL DELETE TABLE](https://www.javatpoint.com/sql-delete-table)
- [SQL DELETE ROW](https://www.javatpoint.com/sql-delete-row)
- [SQL DELETE All Rows](https://www.javatpoint.com/sql-delete-all-rows)
- [DELETE Duplicate Rows](https://www.javatpoint.com/sql-delete-duplicate-rows)
- [SQL DELETE DATABASE](https://www.javatpoint.com/sql-delete-database)
- [SQL DELETE VIEW](https://www.javatpoint.com/sql-delete-view)
- [SQL DELETE JOIN](https://www.javatpoint.com/sql-delete-join)

**SQL Join**

- [SQL JOIN](https://www.javatpoint.com/sql-join)
- [SQL Outer Join](https://www.javatpoint.com/sql-outer-join)
- [SQL Left Join](https://www.javatpoint.com/sql-left-join)
- [SQL Right Join](https://www.javatpoint.com/sql-right-join)
- [SQL Full Join](https://www.javatpoint.com/sql-full-join)
- [SQL Cross Join](https://www.javatpoint.com/sql-cross-join)

**SQL Keys**

- [Primary Key](https://www.javatpoint.com/sql-primary-key)
- [Foreign Key](https://www.javatpoint.com/sql-foreign-key)
- [Composite Key](https://www.javatpoint.com/sql-composite-key)
- [Unique Key](https://www.javatpoint.com/unique-key-in-sql)
- [Alternate Key](https://www.javatpoint.com/alternate-key-in-sql)

**Difference**

- [SQL vs NoSQL](https://www.javatpoint.com/sql-vs-nosql)

**PL/SQL Tutorial**

- [PL/SQL Tutorial](https://www.javatpoint.com/pl-sql-tutorial)

**Interview**

- [SQL Interview](https://www.javatpoint.com/sql-interview-questions)
- [PL/SQL Interview](https://www.javatpoint.com/pl-sql-interview-questions)

**Quiz**

- [SQL Quiz](https://www.javatpoint.com/sql-quiz)



#### SQL Syntax

SQL follows some unique set of rules and guidelines called syntax. Here, we are providing all the basic SQL syntax.

- **SQL** is not case sensitive. Generally SQL keywords are written in uppercase.
- SQL statements are dependent on text lines. We can place a single SQL statement on one or multiple text lines.
- You can perform most of the action in a database with SQL statements.
- SQL depends on relational algebra and tuple relational calculus.

#### SQL statement

SQL statements are started with any of the SQL commands/keywords like SELECT, INSERT, UPDATE, DELETE, ALTER, DROP etc. and the statement ends with a semicolon (;).

Example of SQL statement:

1. **SELECT** "column_name" **FROM** "table_name"; 

Why semicolon is used after SQL statements:

Semicolon is used to separate SQL statements. It is a standard way to separate SQL statements in a database system in which more than one SQL statements are used in the same call.

In this tutorial, we will use semicolon at the end of each SQL statement.

#### SQL Commands

These are the some important SQL command:

- **SELECT:** it extracts data from a database.
- **UPDATE:** it updates data in database.
- **DELETE:** it deletes data from database.
- **CREATE TABLE:** it creates a new table.
- **ALTER TABLE:** it is used to modify the table.
- **DROP TABLE:** it deletes a table.
- **CREATE DATABASE:** it creates a new database.
- **ALTER DATABASE:** It is used to modify a database.
- **INSERT INTO:** it inserts new data into a database.
- **CREATE INDEX:** it is used to create an index (search key).
- **DROP INDEX:** it deletes an index



#### （precedence）mysql[官方开发文档](https://dev.mysql.com/doc/refman/8.0/en/preface.html)



**官方文档优先参考；**











## [ODBC](https://zh.wikipedia.org/wiki/ODBC)

**ODBC**（**Open Database Connectivity**，开放数据库互连）提供了一种标准的[API](https://zh.wikipedia.org/wiki/应用程序接口)（[应用程序编程接口](https://zh.wikipedia.org/wiki/应用程序编程接口)）方法来访问[数据库管理系统](https://zh.wikipedia.org/wiki/数据库管理系统)（DBMS）。这些API利用[SQL](https://zh.wikipedia.org/wiki/SQL)来完成其大部分任务。ODBC本身也提供了对SQL语言的支持，用户可以直接将SQL语句送给ODBC。ODBC的设计者们努力使它具有最大的独立性和开放性：与具体的编程语言无关，与具体的数据库系统无关，与具体的操作系统无关。









------

## [mysql简洁教程](https://www.liaoxuefeng.com/wiki/1177760294764384/1219071817284064)



-----

## [junit](https://junit.org/junit5/)

junit is 软件 test 框架 。

junit [doc](https://junit.org/junit5/docs/current/user-guide/)

------



## [线程](https://zh.wikipedia.org/wiki/%E7%BA%BF%E7%A8%8B)



**线程**（英语：thread）是[操作系统](https://zh.wikipedia.org/wiki/操作系统)能够进行运算[调度](https://zh.wikipedia.org/wiki/调度)的最小单位。大部分情况下，它被包含在[进程](https://zh.wikipedia.org/wiki/进程)之中，是[进程](https://zh.wikipedia.org/wiki/进程)中的实际运作单位。一条线程指的是[进程](https://zh.wikipedia.org/wiki/进程)中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务。在[Unix System V](https://zh.wikipedia.org/wiki/Unix)及[SunOS](https://zh.wikipedia.org/wiki/SunOS)中也被称为轻量进程（lightweight processes），但轻量进程更多指内核线程（kernel thread），而把用户线程（user thread）称为线程。

线程是独立调度和分派的基本单位。线程可以为操作系统内核调度的内核线程，如[Win32](https://zh.wikipedia.org/wiki/Win32)线程；由用户进程自行调度的用户线程，如Linux平台的POSIX Thread；或者由[内核](https://zh.wikipedia.org/wiki/内核)与用户进程，如[Windows 7](https://zh.wikipedia.org/wiki/Windows_7)的线程，进行混合调度。

同一进程中的多条线程将共享该进程中的全部系统资源，如虚拟地址空间，[文件描述符](https://zh.wikipedia.org/wiki/文件描述符)和[信号处理](https://zh.wikipedia.org/wiki/信号处理)等等。但同一进程中的多个线程有各自的[调用栈](https://zh.wikipedia.org/wiki/调用栈)（call stack），自己的[寄存器环境](https://zh.wikipedia.org/w/index.php?title=寄存器环境&action=edit&redlink=1)（register context），自己的线程本地存储（thread-local storage）。

一个进程可以有很多线程，每条线程并行执行不同的任务。

在多核或多CPU，或支持Hyper-threading的CPU上使用多线程程序设计的好处是显而易见的，即提高了程序的执行吞吐率。在单CPU单核的计算机上，使用多线程技术，也可以把进程中负责I/O处理、人机交互而常被阻塞的部分与密集计算的部分分开来执行，编写专门的workhorse线程执行密集计算，从而提高了程序的执行效率。

### 进程

用户下达运行程序的命令后，就会产生进程。同一程序可产生多个进程（一对多关系），以允许同时有多位用户运行同一程序，却不会相冲突。

进程需要一些资源才能完成工作，如[CPU](https://zh.wikipedia.org/wiki/CPU)使用时间、[存储器](https://zh.wikipedia.org/wiki/記憶體)、文件以及[I/O](https://zh.wikipedia.org/wiki/I/O)设备，且为依序逐一进行，也就是每个CPU核心任何时间内仅能运行一项进程。

进程与线程的区别：进程是计算机管理运行程序的一种方式，一个进程下可包含一个或者多个线程。线程可以理解为子进程。

### [Multithreading in java](https://www.javatpoint.com/multithreading-in-java)

**Multithreading in [Java](https://www.javatpoint.com/java-tutorial)** is a process of executing multiple threads simultaneously.

A thread is a lightweight sub-process, the smallest unit of processing. Multiprocessing and multithreading, both are used to achieve multitasking.

However, we use multithreading than multiprocessing because threads use a shared memory area. They don't allocate separate memory area so saves memory, and context-switching between the threads takes less time than process.

Java Multithreading is mostly used in games, animation, etc.

## Java Thread class

Java provides **Thread class** to achieve thread programming. Thread class provides [constructors](https://www.javatpoint.com/java-constructor) and methods to create and perform operations on a thread. Thread class extends [Object class](https://www.javatpoint.com/object-class) and implements Runnable interface.

#### Java Thread Methods

| S.N. | Modifier and Type                      | Method                                                       | Description                                                  |
| :--- | :------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 1)   | void                                   | [start()](https://www.javatpoint.com/java-thread-start-method) | It is used to start the execution of the thread.             |
| 2)   | void                                   | [run()](https://www.javatpoint.com/java-thread-run-method)   | It is used to do an action for a thread.                     |
| 3)   | static void                            | [sleep()](https://www.javatpoint.com/java-thread-sleep-method) | It sleeps a thread for the specified amount of time.         |
| 4)   | static Thread                          | [currentThread()](https://www.javatpoint.com/java-thread-currentthread-method) | It returns a reference to the currently executing thread object. |
| 5)   | void                                   | [join()](https://www.javatpoint.com/java-thread-join-method) | It waits for a thread to die.                                |
| 6)   | int                                    | [getPriority()](https://www.javatpoint.com/java-thread-getpriority-method) | It returns the priority of the thread.                       |
| 7)   | void                                   | [setPriority()](https://www.javatpoint.com/java-thread-setpriority-method) | It changes the priority of the thread.                       |
| 8)   | String                                 | [getName()](https://www.javatpoint.com/java-thread-getname-method) | It returns the name of the thread.                           |
| 9)   | void                                   | [setName()](https://www.javatpoint.com/java-thread-setname-method) | It changes the name of the thread.                           |
| 10)  | long                                   | [getId()](https://www.javatpoint.com/java-thread-getid-method) | It returns the id of the thread.                             |
| 11)  | boolean                                | [isAlive()](https://www.javatpoint.com/java-thread-isalive-method) | It tests if the thread is alive.                             |
| 12)  | static void                            | [yield()](https://www.javatpoint.com/java-thread-yield-method) | It causes the currently executing thread object to pause and allow other threads to execute temporarily. |
| 13)  | void                                   | [suspend()](https://www.javatpoint.com/java-thread-suspend-method) | It is used to suspend the thread.                            |
| 14)  | void                                   | [resume()](https://www.javatpoint.com/java-thread-resume-method) | It is used to resume the suspended thread.                   |
| 15)  | void                                   | [stop()](https://www.javatpoint.com/java-thread-stop-method) | It is used to stop the thread.                               |
| 16)  | void                                   | [destroy()](https://www.javatpoint.com/java-thread-destroy-method) | It is used to destroy the thread group and all of its subgroups. |
| 17)  | boolean                                | [isDaemon()](https://www.javatpoint.com/java-thread-isdaemon-method) | It tests if the thread is a daemon thread.                   |
| 18)  | void                                   | [setDaemon()](https://www.javatpoint.com/java-thread-setdaemon-method) | It marks the thread as daemon or user thread.                |
| 19)  | void                                   | [interrupt()](https://www.javatpoint.com/java-thread-interrupt-method) | It interrupts the thread.                                    |
| 20)  | boolean                                | [isinterrupted()](https://www.javatpoint.com/java-thread-isinterrupted-method) | It tests whether the thread has been interrupted.            |
| 21)  | static boolean                         | [interrupted()](https://www.javatpoint.com/java-thread-interrupted-method) | It tests whether the current thread has been interrupted.    |
| 22)  | static int                             | [activeCount()](https://www.javatpoint.com/java-thread-activecount-method) | It returns the number of active threads in the current thread's thread group. |
| 23)  | void                                   | [checkAccess()](https://www.javatpoint.com/java-thread-checkaccess-method) | It determines if the currently running thread has permission to modify the thread. |
| 24)  | static boolean                         | [holdLock()](https://www.javatpoint.com/java-thread-holdlock-method) | It returns true if and only if the current thread holds the monitor lock on the specified object. |
| 25)  | static void                            | [dumpStack()](https://www.javatpoint.com/java-thread-dumpstack-method) | It is used to print a stack trace of the current thread to the standard error stream. |
| 26)  | StackTraceElement[]                    | [getStackTrace()](https://www.javatpoint.com/java-thread-getstacktrace-method) | It returns an array of stack trace elements representing the stack dump of the thread. |
| 27)  | static int                             | [enumerate()](https://www.javatpoint.com/java-thread-enumerate-method) | It is used to copy every active thread's thread group and its subgroup into the specified array. |
| 28)  | Thread.State                           | [getState()](https://www.javatpoint.com/java-thread-getstate-method) | It is used to return the state of the thread.                |
| 29)  | ThreadGroup                            | [getThreadGroup()](https://www.javatpoint.com/java-thread-getthreadgroup-method) | It is used to return the thread group to which this thread belongs |
| 30)  | String                                 | [toString()](https://www.javatpoint.com/java-thread-tostring-method) | It is used to return a string representation of this thread, including the thread's name, priority, and thread group. |
| 31)  | void                                   | [notify()](https://www.javatpoint.com/java-thread-notify-method) | It is used to give the notification for only one thread which is waiting for a particular object. |
| 32)  | void                                   | [notifyAll()](https://www.javatpoint.com/java-thread-notifyall-method) | It is used to give the notification to all waiting threads of a particular object. |
| 33)  | void                                   | [setContextClassLoader()](https://www.javatpoint.com/java-thread-setcontextclassloader-method) | It sets the context ClassLoader for the Thread.              |
| 34)  | ClassLoader                            | [getContextClassLoader()](https://www.javatpoint.com/java-thread-getcontextclassloader-method) | It returns the context ClassLoader for the thread.           |
| 35)  | static Thread.UncaughtExceptionHandler | [getDefaultUncaughtExceptionHandler()](https://www.javatpoint.com/java-thread-getdefaultuncaughtexceptionhandler-method) | It returns the default handler invoked when a thread abruptly terminates due to an uncaught exception. |
| 36)  | static void                            | [setDefaultUncaughtExceptionHandler()](https://www.javatpoint.com/java-thread-setdefaultuncaughtexceptionhandler-method) | It sets the default handler invoked when a thread abruptly terminates due to an uncaught exception. |

#### Advantages of Java Multithreading

1) It **doesn't block the user** because threads are independent and you can perform multiple operations at the same time.

2) You **can perform many operations together, so it saves time**.

3) Threads are **independent**, so it doesn't affect other threads if an exception occurs in a single thread.



A thread can be in one of the five states. According to sun, there is only 4 states in **thread life cycle in java** new, runnable, non-runnable and terminated. There is no running state.

But for better understanding the threads, we are explaining it in the 5 states.

The life cycle of the thread in java is controlled by JVM. The java thread states are as follows:

1. New
2. Runnable
3. Running
4. Non-Runnable (Blocked)
5. Terminated



![Java thread life cycle](https://static.javatpoint.com/images/thread-life-cycle.png)

#### How to create thread

There are two ways to create a thread:

1. By extending Thread class
2. By implementing Runnable interface.



## Java ThreadLocal class

Java ThreadLocal class provides thread-local variables. It enables you to create variables that can only be read and write by the same thread. If two threads are executing the same code and that code has a reference to a ThreadLocal variable then the two threads can't see the local variable of each other.

#### 3.1ThreadLocal原理总结

1. 每个Thread维护着一个ThreadLocalMap的引用
2. ThreadLocalMap是ThreadLocal的内部类，用Entry来进行存储
3. 调用ThreadLocal的set()方法时，实际上就是往ThreadLocalMap设置值，key是ThreadLocal对象，值是传递进来的对象
4. 调用ThreadLocal的get()方法时，实际上就是往ThreadLocalMap获取值，key是ThreadLocal对象
5. **ThreadLocal本身并不存储值**，它只是**作为一个key来让线程从ThreadLocalMap获取value**。

正因为这个原理，所以ThreadLocal能够实现“数据隔离”，获取当前线程的局部变量值，不受其他线程影响～

#### 四、避免内存泄露

我们来看一下ThreadLocal的对象关系引用图：



![img](https://user-gold-cdn.xitu.io/2018/4/3/162896ab1a1d1e2e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



ThreadLocal内存泄漏的根源是：**由于ThreadLocalMap的生命周期跟Thread一样长，如果没有手动删除对应key就会导致内存泄漏，而不是因为弱引用**。

想要避免内存泄露就要**手动remove()掉**！



## [Java ThreadLocal methods](https://www.javatpoint.com/java-threadlocal-class)

| Modifier and Type | Method                                                       | Description                                                  |
| :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| T                 | [get()](https://www.javatpoint.com/java-threadlocal-get-method) | This method returns the value in the current thread's copy of this thread-local variable. |
| void              | [set()](https://www.javatpoint.com/java-threadlocal-set-method) | This method sets the current thread's copy of this thread-local variable to the specified value. |
| void              | [remove()](https://www.javatpoint.com/java-threadlocal-remove-method) | This method removes the current thread's value for this thread-local variable. |
| protected T       | [initialValue()](https://www.javatpoint.com/java-threadlocal-initialvalue-method) | This method returns the current thread's initial value for this thread-local variable. |

----



## datasource and management

[link](https://www.javatpoint.com/q/5604/what-is-datasource-and-drivermanager-in-jdbc?)

DataSource and the DriverManager are the two basic ways to connect to a database. The DriverManager is older facility, DataSource is newer. It is recommended to use the new DataSource facility to connect to databases and other resources. DataSource facility has several advantages over DriverManager facility. Using DataSource increases portability. The DataSource enables connection pooling and distributed transactions, the DriverManager does not allow such techniques.

the diff could be like.....

1.DriverManager.

hampers the application performance as the connections are created/closed in java classes.
does not support connection pooling.

2.DataSource

improves application performance as connections are not created/closed within a class, they are managed by the application server and can be fetched while at runtime.
it provides a facility creating a pool of connections
helpful for enterprise applications

----





#### [Data Source与数据库连接池简介 JDBC简介（八）](https://www.cnblogs.com/noteless/p/10319296.html)



#### 连接池

**既然每次使用时都重新建立与数据库之间的连接，会产生较大的系统开销**

**是否可以事先创建一些连接备用，当需要时，从这些连接中选择一个提供出去；当连接使用完毕后，并不是真正的关闭，而是将这些数据状态还原，然后继续等待下一个人使用？**

比如滑雪场会租赁雪具滑雪服等，如果你不是资深玩家，你没有必要浪费钱买，即使你不差钱，每次去滑雪场都不能轻装上阵，每次都要携带很多装备，也是一件麻烦事。

这种没必要的花费或者麻烦其实都是一种开销。

连接池的核心与租用的理念有类似的点，重复使用可以提高连接的利用率，减少开销（当然连接池的使用并不需要你花费一笔租金）

连接的持有是消耗空间的，但是现在绝大多数场景下，磁盘空间并没有那么金贵，我们更关心的是性能，所以**空间换取时间**，连接池的逻辑被广泛应用。

#### 数据源

DriverManager只是建立与数据库之间的连接，如何才能将连接池的概念应用其中？

**一种很自然的方式就是提供一个薄层的封装，建立一个中间层，这个中间层将DriverManager生成的连接，组织到连接池中，然后从池中提供连接。**

[![image_5c4aa662_951](https://img2018.cnblogs.com/blog/897393/201901/897393-20190125140250877-1394767455.png)](https://img2018.cnblogs.com/blog/897393/201901/897393-20190125140250476-31357459.png)

 

**Data Source就是DriverManager的一种替代角色，对外呈现就类似于一个DriverManager，拥有对外提供连接的能力**

直接使用DriverManager，驱动程序与管理器是“服务者---管理者”的形式，借助于管理者才能提供服务。

Data Source将驱动程序的概念淡化了，突出驱动程序能够提供的服务与能力，将驱动程序提供的服务与能力抽象为Data Source数据源这一角色。

[![image_5c4aa662_6e5d](https://img2018.cnblogs.com/blog/897393/201901/897393-20190125140251439-673993707.png)](https://img2018.cnblogs.com/blog/897393/201901/897393-20190125140251236-665240055.png)

**DataSource中获取的连接来自于连接池中，而池中的连接根本也还是从DriverManager获取而来**

有了数据源这一中间层，就可以实现连接池和分布式事务的管理。

**对外呈现DataSource就是类似于DriverManager的一个存在。**

 

**DataSource的形式是JNDI （Java Naming Directory Interface）**

DataSource是JNDI资源的一种，那么到底什么是JNDI呢

此处不过多解释，可以简单认为JNDI是类似这样一个东西：

一个哈希表，类型为<String，Object>

JNDI的两个最主要操作：bind和lookup。bind操作负责往哈希表里存对象，lookup则根据这个键值字符串往外取对象。

开发人员可以使用键值——也就是一个字符串名称——来获取某个对象。

**简言之就是可以给一个对象命名，然后可以通过名称找到这个对象。**

**数据源的概念在应用程序与数据库连接之间插入了一个中间层，进而可以实现连接池以及事务管理，并且以JNDI的形式，也能够以非常方便的形式使用。**

**DataSource是作为DriverManager的替代品而推出的，DataSource 对象是获取连接的首选方法。**



----

## [proxy](https://www.javatpoint.com/proxy-pattern)

Simply, proxy means an object representing another object.

According to GoF, a Proxy Pattern **"provides the control for accessing the original object".**

So, we can perform many operations like hiding the information of original object, on demand loading etc.

Proxy pattern is also known as **Surrogate or Placeholder.**











-----

## -------------------SPIRNGBOOT----------------

-------------











## JPA

jpa[文档](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RELEASE/reference/html/#project)

![JDBC JPA Spring Data  ](https://image.slidesharecdn.com/jdbc-151016065340-lva1-app6892/95/jdbc-jpa-spring-data-1-638.jpg?cb=1444978663)







---

## jsp

### JSP 简介

### 什么是Java Server Pages?

JSP全称Java Server Pages，是一种动态网页开发技术。它使用JSP标签在HTML网页中插入Java代码。标签通常以<%开头以%>结束。

JSP是一种Java servlet，主要用于实现Java web应用程序的用户界面部分。网页开发者们通过结合HTML代码、XHTML代码、XML元素以及嵌入JSP操作和命令来编写JSP。

JSP通过网页表单获取用户输入数据、访问数据库及其他数据源，然后动态地创建网页。

JSP标签有多种功能，比如访问数据库、记录用户选择信息、访问JavaBeans组件等，还可以在不同的网页中传递控制信息和共享信息。



------

### 为什么使用JSP？

JSP程序与CGI程序有着相似的功能，但和CGI程序相比，JSP程序有如下优势：

- 性能更加优越，因为JSP可以直接在HTML网页中动态嵌入元素而不需要单独引用CGI文件。
- 服务器调用的是已经编译好的JSP文件，而不像CGI/Perl那样必须先载入解释器和目标脚本。
- JSP 基于Java Servlet API，因此，JSP拥有各种强大的企业级Java API，包括JDBC，JNDI，EJB，JAXP等等。
- JSP页面可以与处理业务逻辑的 Servlet 一起使用，这种模式被Java servlet 模板引擎所支持。

最后，JSP是Java EE不可或缺的一部分，是一个完整的企业级应用平台。这意味着JSP可以用最简单的方式来实现最复杂的应用。

------

### JSP的优势

以下列出了使用JSP带来的其他好处：

- 与ASP相比：JSP有两大优势。首先，动态部分用Java编写，而不是VB或其他MS专用语言，所以更加强大与易用。第二点就是JSP易于移植到非MS平台上。
- 与纯 Servlet 相比：JSP可以很方便的编写或者修改HTML网页而不用去面对大量的println语句。
- 与SSI相比：SSI无法使用表单数据、无法进行数据库链接。
- 与JavaScript相比：虽然JavaScript可以在客户端动态生成HTML，但是很难与服务器交互，因此不能提供复杂的服务，比如访问数据库和图像处理等等。
- 与静态HTML相比：静态HTML不包含动态信息。







-----



# Spring 框架





## 耦合

如何解决耦合:

​	耦合的来源 :

​		程序间的耦合

​		方法间的耦合

​	解耦思路:

​		第一步:使用[反射](https://blog.csdn.net/luoweifu/article/details/10721543)来创建对象

​		第二步:读取配置文件来获取呀创建对象的全限定类名

# java编码规范

[阿里巴巴规范](https://github.com/alibaba/p3c)可以看看







# Spring关键词



## 三层结构：持久层 业务层 表现层

应用程序架构可以分为三个层次：表现层、业务层、持久层。

![img](https://images2018.cnblogs.com/other/1053079/201808/1053079-20180810192431202-1771031022.png)

- 表现层：（顶层）表现层负责用户界面的显示，并且负责帮助用户向业务层提交业务逻辑处理请求，通常还负责将业务层发来的处理结果显示到界面中。
- 业务层：（中间层）业务层负责处理业务逻辑，它可以根据不同的业务来调用不同的代码来处理。
- 持久层：（底层）持久层负责向一个或多个数据库中读取或写入数据。通常用来给业务层的业务逻辑处理提供数据。这个层次通常必须包括业务实体模型。

----



## SpringMVC的四个基本注解annotation（控制层，业务层，持久层） -- @Component、@Repository @Service、@Controller







1、@Autowired与@Resource都可以用来装配bean. 都可以写在字段上,或写在setter方法上。 
2、@Autowired默认按类型装配（这个注解是属业spring的），默认情况下必须要求依赖对象必须存在，如果要允许null 值，可以设置它的required属性为false，如：@Autowired(required=false) ，如果我们想使用名称装配可以结合@Qualifier注解进行使用，如下： 

Java代码 ![收藏代码](http://bhdweb.iteye.com/images/icon_star.png)

1. @Autowired() @Qualifier("baseDao")   
2. **private** BaseDao baseDao;  

 3、@Resource（这个注解属于J2EE的），默认安照名称进行装配，名称可以通过name属性进行指定， 
如果没有指定name属性，当注解写在字段上时，默认取字段名进行按照名称查找，如果注解写在setter方法上默认取属性名进行装配。 当找不到与名称匹配的bean时才按照类型进行装配。但是需要注意的是，如果name属性一旦指定，就只会按照名称进行装配。

Java代码 ![收藏代码](http://bhdweb.iteye.com/images/icon_star.png)

1. @Resource(name="baseDao")   
2. **private** BaseDao baseDao;  

 
我喜欢用 @Resource注解在字段上，且这个注解是属于J2EE的，减少了与spring的耦合。最重要的这样代码看起就比较优雅。





SpringMVC中四个基本注解：


[@Component、@Repository  @Service、@Controller](http://hi.baidu.com/huahua035/item/57746f2510e342d10e37f9f2)

 

看字面含义，很容易却别出其中三个：

***\**\*@Controller\*\*  控制层，就是我们的action层\****

***\**\*@Service\*\*    业务逻辑层，就是我们的service或者manager层\****

***\**\*@Repository\*\* 持久层，就是我们常说的DAO层\****

 

***\*而\*\*@Component\*\* （字面意思就是组件），它在你确定不了事哪一个层的时候使用。\****

 

***\*其实，这四个注解的效果都是一样的，[spring](http://lib.csdn.net/base/javaee)都会把它们当做需要注入的Bean加载在上下文中；\****

***\*但是在项目中，却建议你严格按照除Componen的其余三个注解的含义使用在项目中。这对分层结构的web[架构](http://lib.csdn.net/base/architecture)很有好处！！\****

 

示例：

***\*1. 控制层\****

@Controller // 注释为controller
@RequestMapping("/login")
public class LoginAction {
 

 ***\*（1）假如，有两个类来实现一个接口，会出现冲突的问题。写了参数，它就不冲突了，\****

 ***\*repository(value="a")。
\****

***\*（2）假如你要控制反转，\*\*用@resource(name="a")\*\*\*\*就可以了 。\*\**\***


 @Autowired    
 @Qualifier("userService") //注释指定注入 Bean 
 private IUserService userService;



 

 。。。。。。 其他略 。。。。。。

}

 

***\*2. 业务逻辑层\****

@Service("userService")
public class UserServiceImpl implements IUserService {

  @Autowired
  @Qualifier("userDao")
  private IUserDao userDao; 

 

 

 。。。。。。 其他略 。。。。。。

}

 

***\*3. 持久层\****

@Repository("userDao")
public class UserDaoImpl implements IUserDao {
 private static Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);
 private DataSource dataSource; 
  private JdbcTemplate template; 
   
  @Autowired 
  public UserDaoImpl(DataSource dataSource){ 
    this.dataSource= dataSource; 
    template = new JdbcTemplate(this.dataSource); 
  }

 

 。。。。。。 其他略 。。。。。。

}

 

当没有注释dao层的时候，javaweb是找不到的，会报500错误，例如找不到bean类等等的错误，如下：

 这个注解是把这个类注入到spring容器中去 

![img](https://img-blog.csdn.net/20170324235810969?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzY0MTE4NzQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



   hibernate的缓存，他只是用于数据输入输出过程的缓冲 。



   在hibernate中，有表关联的时候....才会有控制session关闭的情况，当前端访问一次url，它就得到一个session。

   另外，在springmvc中，比如你在前端没有这个参数，它也能传进去....但是是自动赋值为null，你取不了值~假如你输出的话是null

![img](https://img-blog.csdn.net/20170325000812013?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzY0MTE4NzQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

---







## [mvc](https://zh.wikipedia.org/wiki/MVC):

- 控制器（Controller）- 负责转发请求，对请求进行处理。
- 视图（View） - 界面设计人员进行图形界面设计。
- 模型（Model） - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。

![img](https://upload.wikimedia.org/wikipedia/commons/f/f0/ModelViewControllerDiagramZh.png)

[工厂模式：](https://juejin.im/entry/58f5e080b123db2fa2b3c4c6)简单工厂模式	工厂方法模式	抽象工厂模式

### spring mvc 使用

[link](https://www.jianshu.com/p/91a2d0a1e45a)

---



## MVC与三层架构的区别

- MVC与三层架构并不等同，三层架构的三个层次并不与MVC对应
- 如果要MVC与三层架构做对比的话，MVC就像一个中间件，它囊括了三层架构中业务层的大部分功能，但也涉及表现层（View视图负责数据的显示）和持久层（持久层中的实体类与Model模型，但Model比实体类要多出数据库交互的功能）
- MVC中Model基本相当于业务层+持久层

## bean

计算机语言中，含义是可重用组件。





## 工厂模式解耦

![image-20200527171231466](D:\src\Typora记录\spring boot\imge\image-20200527171231466.png)



## Spring Ioc

ioc就是减少耦合 



## Spring bean

### 1.创建bean 的三种方式

<img src="D:\src\Typora记录\spring boot\imge\image-20200527181108315.png" alt="image-20200527181108315" style="zoom:200%;" />

### 2.bean对象的作用范围

![image-20200527181806035](D:\src\Typora记录\spring boot\imge\image-20200527181806035.png)

gobal-session

![image-20200527181728943](D:\src\Typora记录\spring boot\imge\image-20200527181728943.png)



### 3.bean对象的生命周期



 ![image-20200527182405951](D:\src\Typora记录\spring boot\imge\image-20200527182405951.png)

## Spring依赖注入

![image-20200527191532697](D:\src\Typora记录\spring boot\imge\image-20200527191532697.png)

#### **构造函数注入**

![image-20200527191432245](D:\src\Typora记录\spring boot\imge\image-20200527191432245.png)

构造函数注入实例：

```xml
<!--配置Runner -->
    <bean id="runner" class="org.apache.commons.dbutils.QueryRunner" scope="prototype">
        <!--注入数据源-->
        <constructor-arg name="ds" ref="dataSource"></constructor-arg>
    </bean>
```



#### set方法注入（更常用）

![image-20200527191759397](D:\src\Typora记录\spring boot\imge\image-20200527191759397.png)

set注入实例

```xml
 <!--配置Dao-->
    <bean id="accountDao" class="com.heima.Dao.IAccountDaoImpl">
        <!--注入源-->
        <property name="runner" ref="runner"></property>
    </bean>

    <bean id="accountService" class="com.heima.service.AccountServiceImpl">
        <!--注入源-->
        <property name="accountDao" ref="accountDao"></property>
    </bean>
```

## 

## spring整合junit配置

![image-20200529191350832](D:\src\Typora记录\spring boot\imge\image-20200529191350832.png)

 后面有用学。。。

https://www.bilibili.com/video/BV1Sb411s7vP?p=46





## 第3天

 2020年5月29日19:17:06 完成第二天的内容 开始第3天的内容





2020年5月29日19:17:39 开始第3天内容

![image-20200530095421096](D:\src\Typora记录\spring boot\imge\image-20200530095421096.png)



## [动态代理写法：](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/reflect/Proxy.html#newProxyInstance(java.lang.ClassLoader,java.lang.Class%5B%5D,java.lang.reflect.InvocationHandler))

![image-20200601092314977](D:\src\Typora记录\database\image-20200601092314977.png)

![image-20200601092347417](D:\src\Typora记录\database\image-20200601092347417.png)



代码：

![image-20200601092441545](D:\src\Typora记录\database\image-20200601092441545.png)

![image-20200601092802854](D:\src\Typora记录\database\image-20200601092802854.png)

dynamic proxy advantage：

​	降低耦合

​	代码简介 

​	逻辑清晰 

​	减少重复代码

​	维护方便

disadvantage:

​	xml配置麻烦；

​	

----

## [AOP](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)

通俗易懂的讲解：

link：https://www.jianshu.com/p/994027425b44



![img](https:////upload-images.jianshu.io/upload_images/7896890-34e6864b15c793ec.png?imageMogr2/auto-orient/strip|imageView2/2/w/773/format/webp)

### Spring AOP 简介

如果说 IoC 是 Spring 的核心，那么面向切面编程就是 Spring 最为重要的功能之一了，在数据库事务中切面编程被广泛使用。

#### AOP 即 Aspect Oriented Program 面向切面编程

首先，在面向切面编程的思想里面，把功能分为核心业务功能，和周边功能。

- **所谓的核心业务**，比如登陆，增加数据，删除数据都叫核心业务
- **所谓的周边功能**，比如性能统计，日志，事务管理等等

周边功能在 Spring 的面向切面编程AOP思想里，即被定义为切面

在面向切面编程AOP的思想里面，核心业务功能和切面功能分别独立进行开发，然后把切面功能和核心业务功能 "编织" 在一起，这就叫AOP

#### AOP 的目的

AOP能够将那些与业务无关，**却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来**，便于**减少系统的重复代码**，**降低模块间的耦合度**，并**有利于未来的可拓展性和可维护性**。

#### AOP 当中的概念：

- 切入点（Pointcut）
   在哪些类，哪些方法上切入（**where**）
- 通知（Advice）
   在方法执行的什么实际（**when:**方法前/方法后/方法前后）做什么（**what:**增强的功能）
- 切面（Aspect）
   切面 = 切入点 + 通知，通俗点就是：**在什么时机，什么地方，做什么增强！**
- 织入（Weaving）
   把切面加入到对象，并创建出代理对象的过程。（由 Spring 来完成）

#### 一个例子

为了更好的说明 AOP 的概念，我们来举一个实际中的例子来说明：

![img](https:////upload-images.jianshu.io/upload_images/7896890-8225b1537175bd8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/440/format/webp)

在上面的例子中，包租婆的核心业务就是签合同，收房租，那么这就够了，灰色框起来的部分都是重复且边缘的事，交给中介商就好了，这就是 **AOP 的一个思想：让关注点代码与业务代码分离！**

#### 实际的代码

我们来实际的用代码感受一下

1.在 Package【pojo】下新建一个【Landlord】类（我百度翻译的包租婆的英文）：



```java
package pojo;

import org.springframework.stereotype.Component;

@Component("landlord")
public class Landlord {

    public void service() {
        // 仅仅只是实现了核心的业务功能
        System.out.println("签合同");
        System.out.println("收房租");
    }
}
```

2.在 Package【aspect】下新建一个中介商【Broker】类（我还是用的翻译...）：



```java
package aspect;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
class Broker {

    @Before("execution(* pojo.Landlord.service())")
    public void before(){
        System.out.println("带租客看房");
        System.out.println("谈价格");
    }

    @After("execution(* pojo.Landlord.service())")
    public void after(){
        System.out.println("交钥匙");
    }
}
```

3.在 applicationContext.xml 中配置自动注入，并告诉 Spring IoC 容器去哪里扫描这两个 Bean：



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <context:component-scan base-package="aspect" />
    <context:component-scan base-package="pojo" />

    <aop:aspectj-autoproxy/>
</beans>
```

4.在 Package【test】下编写测试代码：



```java
package test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.Landlord;

public class TestSpring {

    public static void main(String[] args) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");
        Landlord landlord = (Landlord) context.getBean("landlord", Landlord.class);
        landlord.service();

    }
}
```

5.执行看到效果：

![img](https:////upload-images.jianshu.io/upload_images/7896890-a7dc802dcfd2f1a2.png?imageMogr2/auto-orient/strip|imageView2/2/w/537/format/webp)

这个例子使用了一些注解，现在看不懂没有关系，但我们可以从上面可以看到，我们在 Landlord 的 service() 方法中仅仅实现了核心的业务代码，其余的关注点功能是根据我们设置的切面**自动补全**的。

------

### 使用注解来开发 Spring AOP

使用注解的方式已经逐渐成为了主流，所以我们利用上面的例子来说明如何用注解来开发 Spring AOP

#### 第一步：选择连接点

Spring 是方法级别的 AOP 框架，我们主要也是以某个类额某个方法作为连接点，另一种说法就是：**选择哪一个类的哪一方法用以增强功能。**



```java
    ....
    public void service() {
        // 仅仅只是实现了核心的业务功能
        System.out.println("签合同");
        System.out.println("收房租");
    }
    ....
```

我们在这里就选择上述 Landlord 类中的 service() 方法作为连接点。

#### 第二步：创建切面

选择好了连接点就可以创建切面了，我们可以把切面理解为一个拦截器，当程序运行到连接点的时候，被拦截下来，在开头加入了初始化的方法，在结尾也加入了销毁的方法而已，在 Spring 中只要使用 `@Aspect` 注解一个类，那么 Spring IoC 容器就会认为这是一个切面了：



```java
package aspect;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
class Broker {

    @Before("execution(* pojo.Landlord.service())")
    public void before(){
        System.out.println("带租客看房");
        System.out.println("谈价格");
    }

    @After("execution(* pojo.Landlord.service())")
    public void after(){
        System.out.println("交钥匙");
    }
}
```

- **注意：** 被定义为切面的类仍然是一个 Bean ，需要 `@Component` 注解标注

代码部分中在方法上面的注解看名字也能猜出个大概，下面来列举一下 Spring 中的 AspectJ 注解：

| 注解              | 说明                                                         |
| :---------------- | :----------------------------------------------------------- |
| `@Before`         | 前置通知，在连接点方法前调用                                 |
| `@Around`         | 环绕通知，它将覆盖原有方法，但是允许你通过反射调用原有方法，后面会讲 |
| `@After`          | 后置通知，在连接点方法后调用                                 |
| `@AfterReturning` | 返回通知，在连接点方法执行并正常返回后调用，要求连接点方法在执行过程中没有发生异常 |
| `@AfterThrowing`  | 异常通知，当连接点方法异常时调用                             |

有了上表，我们就知道 before() 方法是连接点方法调用前调用的方法，而 after() 方法则相反，这些注解中间使用了定义切点的正则式，也就是告诉 Spring AOP 需要拦截什么对象的什么方法，下面讲到。

#### 第三步：定义切点

在上面的注解中定义了 execution 的正则表达式，Spring 通过这个正则表达式判断具体要拦截的是哪一个类的哪一个方法：



```java
execution(* pojo.Landlord.service())
```

依次对这个表达式作出分析：

- execution：代表执行方法的时候会触发
- `*` ：代表任意返回类型的方法
- pojo.Landlord：代表类的全限定名
- service()：被拦截的方法名称

通过上面的表达式，Spring 就会知道应该拦截 pojo.Lnadlord 类下的 service() 方法。上面的演示类还好，如果多出都需要写这样的表达式难免会有些复杂，我们可以通过使用 `@Pointcut` 注解来定义一个切点来避免这样的麻烦：



```java
package aspect;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
class Broker {

    @Pointcut("execution(* pojo.Landlord.service())")
    public void lService() {
    }

    @Before("lService()")
    public void before() {
        System.out.println("带租客看房");
        System.out.println("谈价格");
    }

    @After("lService()")
    public void after() {
        System.out.println("交钥匙");
    }
}
```

#### 第四步：测试 AOP

编写测试代码，但是我这里因为 JDK 版本不兼容出现了 BUG....（尴尬...）

这就告诉我们：环境配置很重要...不然莫名其妙的 BUG 让你崩溃...

#### 环绕通知

我们来探讨一下环绕通知，这是 Spring AOP 中最强大的通知，因为它集成了前置通知和后置通知，它保留了连接点原有的方法的功能，所以它及强大又灵活，让我们来看看：



```java
package aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
class Broker {

//  注释掉之前的 @Before 和 @After 注解以及对应的方法
//  @Before("execution(* pojo.Landlord.service())")
//  public void before() {
//      System.out.println("带租客看房");
//      System.out.println("谈价格");
//  }
//
//  @After("execution(* pojo.Landlord.service())")
//  public void after() {
//      System.out.println("交钥匙");
//  }

    //  使用 @Around 注解来同时完成前置和后置通知
    @Around("execution(* pojo.Landlord.service())")
    public void around(ProceedingJoinPoint joinPoint) {
        System.out.println("带租客看房");
        System.out.println("谈价格");

        try {
            joinPoint.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }

        System.out.println("交钥匙");
    }
}
```

运行测试代码，结果仍然正确：

![img](https:////upload-images.jianshu.io/upload_images/7896890-176d8956fd7ee8fa.png?imageMogr2/auto-orient/strip|imageView2/2/w/460/format/webp)

------

### 使用 XML 配置开发 Spring AOP

注解是很强大的东西，但基于 XML 的开发我们仍然需要了解，我们先来了解一下 AOP 中可以配置的元素：

| AOP 配置元素          | 用途                             | 备注                       |
| :-------------------- | :------------------------------- | :------------------------- |
| `aop:advisor`         | 定义 AOP 的通知其                | 一种很古老的方式，很少使用 |
| `aop:aspect`          | 定义一个切面                     | ——                         |
| `aop:before`          | 定义前置通知                     | ——                         |
| `aop:after`           | 定义后置通知                     | ——                         |
| `aop:around`          | 定义环绕通知                     | ——                         |
| `aop:after-returning` | 定义返回通知                     | ——                         |
| `aop:after-throwing`  | 定义异常通知                     | ——                         |
| `aop:config`          | 顶层的 AOP 配置元素              | AOP 的配置是以它为开始的   |
| `aop:declare-parents` | 给通知引入新的额外接口，增强功能 | ——                         |
| `aop:pointcut`        | 定义切点                         | ——                         |

有了之前通过注解来编写的经验，并且有了上面的表，我们将上面的例子改写成 XML 配置很容易（去掉所有的注解）：



```xml
<!-- 装配 Bean-->
<bean name="landlord" class="pojo.Landlord"/>
<bean id="broker" class="aspect.Broker"/>

<!-- 配置AOP -->
<aop:config>
    <!-- where：在哪些地方（包.类.方法）做增加 -->
    <aop:pointcut id="landlordPoint"
                  expression="execution(* pojo.Landlord.service())"/>
    <!-- what:做什么增强 -->
    <aop:aspect id="logAspect" ref="broker">
        <!-- when:在什么时机（方法前/后/前后） -->
        <aop:around pointcut-ref="landlordPoint" method="around"/>
    </aop:aspect>
</aop:config>
```

运行测试程序，看到正确结果：



作者：我没有三颗心脏
链接：https://www.jianshu.com/p/994027425b44
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。







-----

### 黑马视频理解aop笔记

aop：aspect oriented pragraming  （"面向切面编程")

![image-20200601093923898](D:\src\Typora记录\database\image-20200601093923898.png)

![image-20200601094222460](D:\src\Typora记录\database\img\image-20200601094222460.png)

![image-20200601094317511](D:\src\Typora记录\database\img\image-20200601094317511.png)





----



## jdbc template

link:https://www.javatpoint.com/spring-JdbcTemplate-tutorial



![image-20200602181431050](D:\src\Typora记录\database\img\image-20200602181431050.png)

Spring JdbcTemplate Tutorial

1. [Spring JDBC Template](https://www.javatpoint.com/spring-JdbcTemplate-tutorial#)
2. [Understanding the need for Spring JDBC Template](https://www.javatpoint.com/spring-JdbcTemplate-tutorial#)
3. [Advantage of Spring JDBC Template](https://www.javatpoint.com/spring-JdbcTemplate-tutorial#)
4. [JDBC Template classes](https://www.javatpoint.com/spring-JdbcTemplate-tutorial#)
5. [Example of JdbcTemplate class](https://www.javatpoint.com/spring-JdbcTemplate-tutorial#)

Spring **JdbcTemplate** is a powerful mechanism to connect to the database and execute SQL queries. It internally uses JDBC api, but eliminates a lot of problems of JDBC API.

### Problems of JDBC API

The problems of JDBC API are as follows:

- We need to write a lot of code before and after executing the query, such as creating connection, statement, closing resultset, connection etc.
- We need to perform exception handling code on the database logic.
- We need to handle transaction.
- Repetition of all these codes from one to another database logic is a time consuming task.

### Advantage of Spring JdbcTemplate

Spring JdbcTemplate eliminates all the above mentioned problems of JDBC API. It provides you methods to write the queries directly, so it saves a lot of work and time.

------

### Spring Jdbc Approaches

Spring framework provides following approaches for JDBC database access:

- JdbcTemplate
- NamedParameterJdbcTemplate
- SimpleJdbcTemplate
- SimpleJdbcInsert and SimpleJdbcCall

------

### JdbcTemplate class

It is the central class in the Spring JDBC support classes. It takes care of creation and release of resources such as creating and closing of connection object etc. So it will not lead to any problem if you forget to close the connection.

It handles the exception and provides the informative exception messages by the help of excepion classes defined in the **org.springframework.dao** package.

We can perform all the database operations by the help of JdbcTemplate class such as insertion, updation, deletion and retrieval of the data from the database.

Let's see the methods of spring JdbcTemplate class.

| No.  | Method                                                       | Description                                                  |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 1)   | public int update(String query)                              | is used to insert, update and delete records.                |
| 2)   | public int update(String query,Object... args)               | is used to insert, update and delete records using PreparedStatement using given arguments. |
| 3)   | public void execute(String query)                            | is used to execute DDL query.                                |
| 4)   | public T execute(String sql, PreparedStatementCallback action) | executes the query by using PreparedStatement callback.      |
| 5)   | public T query(String sql, ResultSetExtractor rse)           | is used to fetch records using ResultSetExtractor.           |
| 6)   | public List query(String sql, RowMapper rse)                 | is used to fetch records using RowMapper                     |





------





# spring boot关键词

视频：哔哩哔哩视频

文档：[java point spring boot](https://www.javatpoint.com/spring-boot-tutorial)

-------

## What is spring boot

Spring Boot is a project that is built on the top of the Spring Framework. It provides an easier and faster way to set up, configure, and run both simple and web-based applications.

It is a Spring module that provides the **RAD (\*Rapid Application Development\*)** feature to the Spring Framework. It is used to create a stand-alone Spring-based application that you can just run because it needs minimal Spring configuration.

![What is Spring Boot](https://static.javatpoint.com/springboot/images/what-is-spring-boot.png)



In short, Spring Boot is the combination of **Spring Framework** and **Embedded Servers**.

In Spring Boot, there is no requirement for XML configuration (deployment descriptor). It uses convention over configuration software design paradigm that means it decreases the effort of the developer.

We can use Spring **STS IDE** or **Spring Initializr** to develop Spring Boot Java applications.









