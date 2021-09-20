# Spring Boot框架model层、dao层、service层、controller层分析设计



## model

model层即数据库实体层，也被称为entity层，pojo层。
一般数据库一张表对应一个实体类，类属性同表字段一一对应。

## dao层

dao层即数据持久层，也被称为mapper层。
dao层的作用为访问数据库，向数据库发送sql语句，完成数据的增删改查任务。

## service层

service层即业务逻辑层。
service层的作用为完成功能设计。
service层调用dao层接口，接收dao层返回的数据，完成项目的基本功能设计。

## controller层

controller层即控制层。
controller层的功能为请求和响应控制。
controller层负责前后端交互，接受前端请求，调用service层，接收service层返回的数据，最后返回具体的页面和数据到客户端。
————————————————

![spring+spring mvc+JdbcTemplate 入门小例子- osc_30db5uqw的个人空间- OSCHINA -  中文开源技术交流社区](https://oscimg.oschina.net/oscnet/80df11abb15674f6ee444f23d20207dbf61.png)

版权声明：本文为CSDN博主「Just_learn_more」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Just_learn_more/article/details/90665009

