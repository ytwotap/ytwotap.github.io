# Mysql 学习使用

## 概况

- mysq[官网开发文档](https://dev.mysql.com/doc/refman/8.0/en/preface.html)

- [mysql官网](https://www.mysql.com/)

- [github java study mysql beanch](https://github.com/Snailclimb/JavaGuide/blob/master/docs/database/MySQL.md)

- [21min搞定mysql]([https://github.com/jaywcjlove/mysql-tutorial/blob/master/21-minutes-MySQL-basic-entry.md#%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8](https://github.com/jaywcjlove/mysql-tutorial/blob/master/21-minutes-MySQL-basic-entry.md#开始使用))

  ​			用于快速上手

- [MySql-版本介绍和服务介绍](https://www.cnblogs.com/tongxiaoda/p/7866325.html)

- [MySQL安装](https://blog.csdn.net/zhouzezhou/article/details/52446608)

MySQL 为关系型数据库(Relational Database Management System)，一个关系型数据库由一个或数个表格组成, 如图所示的一个表格：

[![21分钟MySQL基础入门](https://github.com/jaywcjlove/mysql-tutorial/raw/master/img/data.jpg)](https://github.com/jaywcjlove/mysql-tutorial/blob/master/img/data.jpg)

- `表头(header)`: 每一列的名称;
- `列(col)`: 具有相同数据类型的数据的集合;
- `行(row)`: 每一行用来描述某个人/物的具体信息;
- `值(value)`: 行的具体信息, 每个值必须与该列的数据类型相同;
- `键(key)`: 表中用来识别某个特定的人\物的方法, 键的值在当前列中具有唯一性。

#### mysql数据库名

### 常用命令

启动服务器 net start mysql80

停止服务 net stop mysql80

卸载mysql服务 mysqld -remove

进入mysql root  command: **mysql -h localhost -u root -p**

###  navacat for mysql 插件的使用



## 注意的问题

- mysql启动用管理员账户启动，防止权限不够



# mysql 端口

mysql 默认端口 是 3306

