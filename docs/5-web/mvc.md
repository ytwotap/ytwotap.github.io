

## 10、MVC三层架构

什么是MVC：MOdel	view	Controller 模型、视图、控制器

### 10.1 远古架构

![](JavaWeb\16.png)

用户直接访问控制层，控制层可以直接操作数据库

```java
servlet--CRUD-->数据库
弊端：程序臃肿不利于维护		
servlet的代码中：处理请求、响应、视图跳转、处理JDBC、处理业务代码、处理逻辑代码
    
架构：没有什么是加一层解决不了的
```

### 10.2 MVC三层架构

![](JavaWeb\17.png)



Model：

- 业务处理：业务逻辑（Service）
- 数据持久层：CRUD（Dao）

View：

- 展示数据
- 提供链接发起Servlet请求（a，form，img....）

Controller（Servlet）：

- 接受用户的请求：（（req：请求参数）、Session的信息）
- 交给业务层处理响应的代码
- 控制视图的跳转

```java
登录--->接受用户的登录请求--->处理用户的请求（获取用户登录的参数，username，password）--->交给业务层处理登录业务（判断用户名密码是否正确：事务）--->Dao层查询用户名和密码是否正确--->数据库
```

