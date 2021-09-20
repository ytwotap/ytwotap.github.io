

## 9、 JavaBean

实体类

JavaBean有特定的写法

- 必须要有一个无惨构造
- 属性必须私有化
- 必须有对应的get/set方法

一般用来和数据库的字段做映射 ORM

ORM：对象关系映射

- 表--->类
- 字段--->属性
- 行记录--->对象

| id   | name   | age  | address |
| ---- | ------ | ---- | ------- |
| 1    | 桐人   | 22   | 日本    |
| 2    | 亚丝娜 | 23   | 日本    |
| 3    | 爱丽丝 | 24   | 日本    |

```java
class People{
    private int id;
    private String name;
    private int age;
    private String name;
}

class A{
    new People(1,"桐人",22,"日本");
}
```



- 过滤器
- 文件上传
- 邮件发送
- JDBC复习：如何使用JDBC，JDBC crud,jdbc 事务

