# Typehandler类型处理器



输入输出映射过程中的类型转换

 

查询：varchar → **String → Integer[]**

插入：**Integer[] → String** → varchar

 

String ←→ Integer[]

## 1.1  TypeHandler接口

![image-20210916200029203](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/image-20210916200029203.png)

![image-20210916200018988](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/image-20210916200018988.png)







## 1.2  输入映射

 ![image-20210916200049459](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/image-20210916200049459.png)

## 1.3  输出映射

 ![image-20210916200059298](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/image-20210916200059298.png)

## 1.4  配置

 

 ![image-20210916200106169](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/image-20210916200106169.png)





# 补充

## MyBatis自定义类型处理器 TypeHandler

> https://blog.csdn.net/lmb55/article/details/90380309

在项目开发中经常会遇到一个问题：

当我们在javabean中自定义了枚举类型或者其它某个类型，但是在数据库中存储时往往需要转换成数据库对应的类型，并且在从数据库中取出来时也需要将数据库类型转换为javabean中的对应类型。比如：javabean中字段类型为Date，数据库中存储的是varchar类型；javabean中字段类型是Enum，数据库中存储的是String或者Integer。
因为有大量类似数据的转换，手动转换类型进行存储和查询已经过于麻烦。MyBatis为我们提供了解决办法：TypeHandler类型处理器。

类型处理器 TypeHandler

MyBatis 中的 TypeHandler 类型处理器用于 JavaType 与 JdbcType 之间的转换，用于 PreparedStatement 设置参数值和从 ResultSet 或 CallableStatement 中取出一个值。MyBatis 内置了大部分基本类型的类型处理器，所以对于基本类型可以直接处理，当我们需要处理其他类型的时候就需要自定义类型处理器。

MyBatis 内置的 TypeHandler

在 MyBatis 的 TypeHandlerRegistry 类型中，可以看到内置的类型处理器。内置处理器比较多，这里整理常见的一些。
BooleanTypeHandler：用于 java 类型 boolean，jdbc 类型 bit、boolean
ByteTypeHandler：用于 java 类型 byte，jdbc 类型 TINYINT
ShortTypeHandler：用于 java 类型 short，jdbc 类型 SMALLINT
IntegerTypeHandler：用于 INTEGER 类型
LongTypeHandler：用于 long 类型
FloatTypeHandler：用于 FLOAT 类型
DoubleTypeHandler：用于 double 类型
StringTypeHandler：用于 java 类型 string，jdbc 类型 CHAR、VARCHAR
ArrayTypeHandler：用于 jdbc 类型 ARRAY
BigDecimalTypeHandler：用于 java 类型 BigDecimal，jdbc 类型 REAL、DECIMAL、NUMERIC
DateTypeHandler：用于 java 类型 Date，jdbc 类型 TIMESTAMP
DateOnlyTypeHandler：用于 java 类型 Date，jdbc 类型 DATE
TimeOnlyTypeHandler：用于 java 类型 Date，jdbc 类型 TIME
对于常见的 Enum 类型，内置了 EnumTypeHandler 进行 Enum 名称的转换和 EnumOrdinalTypeHandler 进行 Enum 序数的转换。这两个类型处理器没有在 TypeHandlerRegistry 中注册，如果需要使用必须手动配置。

自定义 TypeHandler

自定义类型处理器是通过实现 org.apache.ibatis.type.TypeHandler 接口实现的。这个接口定义了类型处理器的基本功能，接口定义如下所示。

![在这里插入图片描述](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/20190520184430201-16317942767632.png)

其中 setParameter 方法用于把 java 对象设置到 PreparedStatement 的参数中，getResult 方法用于从 ResultSet（根据列名或者索引位置获取） 或 CallableStatement（根据存储过程获取） 中取出数据转换为 java 对象。

实际开发中，我们可以继承 org.apache.ibatis.type.BaseTypeHandler 类型来实现自定义类型处理器。这个类型是抽象类型，实现了 TypeHandler 的方法进行通用流程的封装，做了异常处理，并定义了几个类似的抽象方法，如下所示。继承 BaseTypeHandler 类型可以极大地降低开发难度。
![在这里插入图片描述](Typehandler%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8.assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xtYjU1,size_16,color_FFFFFF,t_70.png)

