# THYMELEAF  STUDY 

[官网](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#the-good-thymes-virtual-grocery)

[use thymeleaf](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#the-template-engine) 

## Standard Expression Syntax

- Simple expressions:
  - Variable Expressions: `${...}`
  - Selection Variable Expressions: `*{...}`
  - Message Expressions: `#{...}`
  - Link URL Expressions: `@{...}`
  - Fragment Expressions: `~{...}`
- Literals
  - Text literals: `'one text'`, `'Another one!'`,…
  - Number literals: `0`, `34`, `3.0`, `12.3`,…
  - Boolean literals: `true`, `false`
  - Null literal: `null`
  - Literal tokens: `one`, `sometext`, `main`,…
- Text operations:
  - String concatenation: `+`
  - Literal substitutions: `|The name is ${name}|`
- Arithmetic operations:
  - Binary operators: `+`, `-`, `*`, `/`, `%`
  - Minus sign (unary operator): `-`
- Boolean operations:
  - Binary operators: `and`, `or`
  - Boolean negation (unary operator): `!`, `not`
- Comparisons and equality:
  - Comparators: `>`, `<`, `>=`, `<=` (`gt`, `lt`, `ge`, `le`)
  - Equality operators: `==`, `!=` (`eq`, `ne`)
- Conditional operators:
  - If-then: `(if) ? (then)`
  - If-then-else: `(if) ? (then) : (else)`
  - Default: `(value) ?: (defaultvalue)`
- Special tokens:
  - No-Operation: `_`

## 如何使用：

- using the templete engine

  ```java
  templateEngine = new TemplateEngine();
  templateEngine.setTemplateResolver(templateResolver);
  ```

- 



## 关键字：

-----

### [jsp](https://zh.wikipedia.org/wiki/JSP)

**JSP**（全称**J**ava**S**erver **P**ages）是由[Sun Microsystems](https://zh.wikipedia.org/wiki/Sun_Microsystems)公司主导创建的一种动态网页技术标准。JSP部署于网络服务器上，可以响应客户端发送的请求，并根据请求内容动态地生成[HTML](https://zh.wikipedia.org/wiki/HTML)、[XML](https://zh.wikipedia.org/wiki/XML)或其他格式文档的[Web](https://zh.wikipedia.org/wiki/Web)网页，然后返回给请求者。JSP技术以[Java](https://zh.wikipedia.org/wiki/Java)语言作为[脚本语言](https://zh.wikipedia.org/wiki/脚本语言)，为用户的[HTTP](https://zh.wikipedia.org/wiki/HTTP)请求提供服务，并能与服务器上的其它Java程序共同处理复杂的业务需求。

JSP将Java代码和特定变动内容嵌入到静态的页面中，实现以静态页面为模板，动态生成其中的部分内容。JSP引入了被称为“JSP动作”的XML标签，用来调用内建功能。另外，可以创建JSP标签库，然后像使用标准HTML或XML标签一样使用它们。标签库能增强功能和服务器性能，而且不受[跨平台](https://zh.wikipedia.org/wiki/跨平台)问题的限制。JSP文件在运行时会被其编译器转换成更原始的[Servlet](https://zh.wikipedia.org/wiki/Servlet)代码。JSP编译器可以把JSP文件编译成用Java代码写的Servlet，然后再由Java编译器来编译成能快速执行的二进制[机器码](https://zh.wikipedia.org/wiki/機器碼)，也可以直接编译成二进制码。

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/JSPLife.svg/1920px-JSPLife.svg.png)

# [Thymeleaf 常用属性](https://www.cnblogs.com/hjwublog/p/5051732.html)

- [th:action](https://www.cnblogs.com/hjwublog/p/5051732.html#_label0)
- [th:each](https://www.cnblogs.com/hjwublog/p/5051732.html#_label1)
- [th:field](https://www.cnblogs.com/hjwublog/p/5051732.html#_label2)
- [th:href](https://www.cnblogs.com/hjwublog/p/5051732.html#_label3)
- [th:id](https://www.cnblogs.com/hjwublog/p/5051732.html#_label4)
- [th:if](https://www.cnblogs.com/hjwublog/p/5051732.html#_label5)
- [th:include](https://www.cnblogs.com/hjwublog/p/5051732.html#_label6)
- [th:fragment](https://www.cnblogs.com/hjwublog/p/5051732.html#_label7)
- [th:object](https://www.cnblogs.com/hjwublog/p/5051732.html#_label8)
- [th:src](https://www.cnblogs.com/hjwublog/p/5051732.html#_label9)
- [th:replace](https://www.cnblogs.com/hjwublog/p/5051732.html#_label10)
- [th:text](https://www.cnblogs.com/hjwublog/p/5051732.html#_label11)
- [th:value](https://www.cnblogs.com/hjwublog/p/5051732.html#_label12)

# thymeleaf 系统学习章节

## [入门](https://how2j.cn/k/springboot/springboot-thymeleat/1735.html)

```html
//hello.html
<!DOCTYPE HTML>
//1. 声明当前文件是 thymeleaf, 里面可以用th开头的属性
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>hello</title>
    <meta http-equiv="content-type" content="text/html">
</head>
<body>
    3. 把 name 的值显示在当前 p里，用的是th开头的属性: th:text, 而取值用的是 "${name}" 这种写法叫做 ognl，额。。。什么意思呢。。。就是跟EL表达式一样吧。 这样取出来放进p 里，从而替换到 原来p 标签里的 4个字符 "name" .
<p th:text="${name}">name</p>
<p th:text="'hello '+${name}+'!'">hello world</p>
<p th:text="'hello '+${name}+'!'">hello world</p>

</body>
</html>
```

\4. 字符串拼写。 两种方式，一种是用加号，一种是在前后放上 ||, 显然第二种方式可读性更好。
```html
<p th:text="'Hello！ ' + ${name} + '!'" >hello world</p>
<p th:text="|Hello！ ${name}!|" >hello world</p>
```

这两种方式都会得到： hello thymeleaf。

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p th:text="${name}" >name</p>
<p th:text="'Hello！ ' + ${name} + '!'" >hello world</p>
<p th:text="|Hello！ ${name}!|" >hello world</p>
</body>
 
</html>
```



## [url](https://how2j.cn/k/springboot/springboot-url/1736.html)

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>hello</title>
    <meta http-equiv="content-type" content="text/html">
<!--通过 th:href="@{/static/css/style.css}" 和 th:src="@{/static/js/thymeleaf.js}" 引入 css 和 js 文件-->
    <link rel="stylesheet" type="text/css" media="all" href="../static/css/style.css" th:href="@{/css/style.css}"/>
    <script type="text/javascript" src="../static/js/thymeleaf.js" th:src="@{/js/thymeleaf.js}"></script>
<!--    注意 th:src="@{/js/thymeleaf.js} 不能从 static 开始-->
<!--    注意几点：
1. 使用 @这种方式引入，在渲染后的html 里会自动生成 上下文路径，既如图所示的 /thymeleaf 这个路径
2. 如果使用浏览器直接打开当前的 hello.html, 依然可以看到css 和 js 效果，因为如下代码起作用：-->
<!--    3. 在header标签里有这么一段-->
    <script>
        testFunction();
    </script>
</head>
<body>
<p th:text="${name}">name</p>
<p th:text="'hello '+${name}+'!'">hello world</p>
<p th:text="'hello '+${name}+'!'">hello world</p>

</body>
</html>
```

\3. 在header标签里有这么一段：

```html
<script>

  testFunction();

</script>
```


用以表示访问thymeleaf.js里的 testFunction函数

## 表达式

1.显示html

2.获取对象

3.获取对象方法

4.计算

5.*{}方式显示属性



test.html

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>test</title>
    <meta http-equiv="content-type" content="text/html">

</head>
<body>
<!--1. 转义和非转义的html-->
<p th:text="${htmlContent}"></p>
<p th:utext="${htmlContent}"></p>
<!--2. 获取对象属性的两种方式，这里可以直接调用方法了-->
<p th:text="${currentProduct.name}"></p>
<p th:text="${currentProduct.getName()}"></p>
<!--3. 使用 *{} 方式显示当前对象的属性
<div class="showing" th:object="${currentProduct}">
<h2>*{}方式显示属性</h2>
<p th:text="*{name}" ></p>
</div>

4. 算数运算，这里之演示了加法，其他的减法，乘法什么的略过不表-->
<p th:text="${currentProduct.getPrice()+9999}"></p>


<div class="showing" th:object="${currentProduct}">
    <h2>*{}方式显示属性</h2>
    <p th:text="*{id}" ></p>
</div>

</body>
</html>
```

TestController.java

```java
package com.example.thymeleafdemo.control;

import com.example.thymeleafdemo.entity.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
/**
*controller
*/
@Controller
public class TestController {
    @RequestMapping("/test")
    public String test(Model m){
        String htmlContent="<p style='color:red'>红色文字</p>" ;
        Product currentProduct =new Product(5,"product e", 200);

        m.addAttribute("htmlContent", htmlContent);
        m.addAttribute("currentProduct", currentProduct);

        return "test";
    }
}

```

entity

Product.java

```java
package com.example.thymeleafdemo.entity;

import org.springframework.boot.autoconfigure.domain.EntityScan;

/**
 * 实体类
 */

public class Product {
    private int id;
    private String name;
    private int price;

    public Product(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

```



## 包含

include.html

```html
<!--新建一个 include.html 文件，然后里面用 th:fragment 标记代码片段。
footer1 是 不带参数的
footer2 是带参数的
这两种情况也是包含业务经常会用到的做法-->
<html xmlns:th="http://www.thymeleaf.org">
<footer th:fragment="footer1">
    <div>-----</div>

    <p >All Rights Reserved</p>
</footer>
<footer th:fragment="footer2(start,now)">
    <div>-----</div>

    <p th:text="|${start} - ${now} All Rights Reserved|"></p>
</footer>
</html>
```



hello.html

```html
<!--使用的时候就按照如下方式-->
<div th:replace="include::footer1"></div>
<div th:replace="include::footer1"></div>
<!--就达到了包含的效果，其中第二种可以传参。
除了th:replace， 还可以用th:insert, 区别：
th:insert ：保留自己的主标签，保留th:fragment的主标签。
th:replace ：不要自己的主标签，保留th:fragment的主标签。-->
<div th:insert="include::footer1"></div>
<div th:insert="include::footer2(1996,2020)"></div>

```

---



## 条件



```HTML
<div class="class showing">
    <h2>条件判断</h2>
    <p th:if="${testBoolean}" >如果testBoolean 是 true ，本句话就会显示</p>
    <p th:if="${not testBoolean}" >取反 ，所以如果testBoolean 是 true ，本句话就不会显示</p>
    <p th:unless="${testBoolean}" >unless 等同于上一句，所以如果testBoolean 是 true ，本句话就不会显示</p>
    <p th:text="${testBoolean}?'当testBoolean为真的时候，显示本句话，这是用三相表达式做的':''" ></p>
</div>
```

**关于真假判断**

不只是布尔值的 true 和 false, th:if 表达式返回其他值时也会被认为是 true 或 false，规则如下:

boolean 类型并且值是 true, 返回 true
数值类型并且值不是 0, 返回 true
字符类型(Char)并且值不是 0, 返回 true
String 类型并且值不是 "false", "off", "no", 返回 true
不是 boolean, 数值, 字符, String 的其他类型, 返回 true

值是 null, 返回 false



## 遍历

```html
<!--遍历的使用-->
<div class="showing">
    <h2>遍历</h2>

    <table>
        <thead>
        <tr>
            <th>id</th>
            <th>产品名称</th>
            <th>价格</th>
        </tr>
        </thead>
        <tbody>
<!--        遍历 th:each="p: ${ps}-->
        <tr th:each="p: ${ps}">
<!--            invoking method -->
            <td th:text="${p.getId()}"></td>
            <td th:text="${p.getName()}"></td>
            <td th:text="${p.getPrice()}"></td>
        </tr>
        </tbody>

    </table>
```

control.java

```java
//new list<>
        List<Product> ps = new ArrayList<>();
//        add param
        ps.add(new Product(1,"product a", 50));
        ps.add(new Product(2,"product b", 100));
        ps.add(new Product(3,"product c", 150));
        ps.add(new Product(4,"product d", 200));
        ps.add(currentProduct);
        ps.add(new Product(6,"product f", 200));
        ps.add(new Product(7,"product g", 200));
//add to model view
        m.addAttribute("ps", ps);
```

​	