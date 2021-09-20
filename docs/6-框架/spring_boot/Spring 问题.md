# [idea热更新](https://how2j.cn/k/springboot/springboot-idea-hot-deploy/1923.html)

**依赖**

```
<dependency>

​    <groupId>org.springframework.boot</groupId>

​    <artifactId>spring-boot-devtools</artifactId>

​    <optional>true</optional> <!-- 这个需要为 true 热部署才有效 -->

</dependency>
```

**更新设置**

项目自动编译

菜单 -> Other Settings -> Default Settings -> Builld, Execution, Deployment -> Compiler
勾选其中的 Build project automatically. 这个选项默认是没有被勾选的。

**automake 选项开启-B**

automake 选项开启比较麻烦，因为它的开启界面默认是不能够被打开的，需要通过快捷键才能打开。。。

设置快捷键办法：
\1. 菜单->File->Settings->左上角的搜索框里输入 Registry
\2. 右边搜索结果出现 Registry... 这么一个功能，然后给这个功能增加一个快捷键 Alt+Shift+M。 用这个快捷键是因为它默认情况下是没有冲突的。
\3. 点击 OK
继续下一步

接着重启 idea, 这样修改 html 就可以马上看到效果了

## **总结**

```
#热部署配置
#0,导入依赖
<dependency>

​    <groupId>org.springframework.boot</groupId>

​    <artifactId>spring-boot-devtools</artifactId>

​    <optional>true</optional> <!-- 这个需要为 true 热部署才有效 -->

</dependency>
#1、CTRL + SHIFT + A --> 查找make project automatically --> 选中
#2、CTRL + SHIFT + A --> 查找Registry --> 找到compiler.automake.allow.when.app.running勾选
#生效
spring.devtools.restart.enabled = true
```



# jpa和jdbc[区别](https://blog.csdn.net/qq_34531925/article/details/77663319)

1. [JDBC](https://blog.csdn.net/qq_34531925/article/details/77663319#t0)
2. [什么是JPA](https://blog.csdn.net/qq_34531925/article/details/77663319#t1)
3. [JPA与hibernate的关系](https://blog.csdn.net/qq_34531925/article/details/77663319#t2)
4. [JPA的供应商](https://blog.csdn.net/qq_34531925/article/details/77663319#t3)



- [JDBC](https://blog.csdn.net/qq_34531925/article/details/77663319#jdbc)
- [什么是JPA](https://blog.csdn.net/qq_34531925/article/details/77663319#什么是jpa)
- [JPA与hibernate的关系](https://blog.csdn.net/qq_34531925/article/details/77663319#jpa与hibernate的关系)
- [JPA的供应商](https://blog.csdn.net/qq_34531925/article/details/77663319#jpa的供应商)



## JDBC

![这里写图片描述](https://img-blog.csdn.net/20150813122545051)

jdbc是一组规范，是接口，由不同的[数据库](http://lib.csdn.net/base/mysql)厂商各自提供相应的实现类，打包成jar包，也就是所谓的数据库驱动。而我们的[Java](http://lib.csdn.net/base/java)应用程序，只需要调用jdbc的接口就可以了。

而JPA是和jdbc类似的东西

## 什么是JPA

### JPA @[Temporal](https://fanlychie.github.io/post/jpa-temporal-annotation.html) 注解

[Java ](http://lib.csdn.net/base/java)Persistence API：用于对象持久化的 API

[java ](http://lib.csdn.net/base/java)EE 5.0 平台标准的 ORM 规范，使得应用程序以统一的方式访问持久层

![这里写图片描述](https://img-blog.csdn.net/20150813123136430)

与JDBC类似，JPA统一了java应用程序访问ORM框架的规范。

以前我们的应用程序直接使用ORM框架，如[hibernate](http://lib.csdn.net/base/javaee)，mybatis。但是不同的框架使用方法不一样，而JPA让我们以同样的方式访问不同的ORM框架。常用的框架是hibernate。

## JPA与hibernate的关系

JPA是一个规范，不是框架

hibernate是JPA的实现

## JPA的供应商



1. hibernate
   JPA的始作俑者就是hibernate的作者
2. OpenJPA
3. TopLink





(function () {(function () {('pre.prettyprint code').each(function () {
var lines = (this).text().split(′\n′).length;var(this).text().split(′\n′).length;varnumbering = $('



').addClass('pre-numbering').hide();
(this).addClass(′has−numbering′).parent().append((this).addClass(′has−numbering′).parent().append(numbering);
for (i = 1; i <= lines; i++) {
numbering.append(numbering.append(('



').text(i));
};
$numbering.fadeIn(1700);
});
});



document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000)

```
    <div id="digg" articleid="47610823">
        <dl id="btnDigg" class="digg digg_disable" onclick="btndigga();">

             <dt>顶</dt>
            <dd>2</dd>
        </dl>


        <dl id="btnBury" class="digg digg_disable" onclick="btnburya();">

              <dt>踩</dt>
            <dd>1</dd>               
        </dl>

    </div>
 <div class="tracking-ad" data-mod="popu_222"><a href="javascript:void(0);" target="_blank">&nbsp;</a>   </div>
<div class="tracking-ad" data-mod="popu_223"> <a href="javascript:void(0);" target="_blank">&nbsp;</a></div>
<script type="text/javascript">
    function btndigga() {
        $(".tracking-ad[data-mod='popu_222'] a").click();
    }
    function btnburya() {
        $(".tracking-ad[data-mod='popu_223'] a").click();
    }
        </script>
12345678910111213141516171819202122232425
```



## [@EntityScan](https://blog.csdn.net/andy_zhang2007/article/details/84099595)搜索jpa entity class  路径

我们通常建议你在其他类之上的根包中定位主应用程序类，`@SpringBootApplication`注解通常放在主类上，它隐式地为某些项定义了一个基本的“搜索包”。例如，如果你正在编写一个JPA应用程序，则使用`@SpringBootApplication`注解类的包来搜索`@Entity`项，使用根包也允许组件扫描只应用于你的项目。

> 如果你不想使用`@SpringBootApplication`，那么`@EnableAutoConfiguration`和`@ComponentScan`注解将定义该行为，因此你也可以使用它。

`@EntityScan`用来扫描和发现指定包及其子包中的`Entity`定义。其用法如下:

``` java
@EntityScan(basePackages ={"com.department.entities","come.employee.entities"})
```



# Thymeleaf](https://zh.wikipedia.org/wiki/Thymeleaf)

**Thymeleaf**是一个[Java](https://zh.wikipedia.org/wiki/Java) [XML](https://zh.wikipedia.org/wiki/XML) / [XHTML](https://zh.wikipedia.org/wiki/XHTML) / [HTML5](https://zh.wikipedia.org/wiki/HTML5) 模板引擎 ，可以在Web（基于[servlet](https://zh.wikipedia.org/wiki/Java_Servlet) ）和非Web环境中工作。 它更适合在基于[MVC](https://zh.wikipedia.org/wiki/MVC)的Web应用程序的视图层提供XHTML / HTML5，但它甚至可以在脱机环境中处理任何XML文件。 它提供完整的[Spring Framework](https://zh.wikipedia.org/wiki/Spring_Framework)。







# 出现spring相关问题总结1

## JDBC连接错误[You must configure either the server or JDBC driver (via the 'serverTimezone' configuration property) to use a more specifc time zone value if you want to utilize time zone support.](https://www.cnblogs.com/EasonJim/p/6906713.html)

在连接字符串后面加上**?serverTimezone=UTC**

其中UTC是统一标准世界时间。

完整的连接字符串示例：**jdbc:mysql://localhost:3306/test?serverTimezone=UTC**

或者还有另一种选择：**jdbc:mysql://127.0.0.1:3306/test****?useUnicode=true&characterEncoding=UTF-8**，这个是解决中文乱码输入问题，当然也可以和上面的一起结合：**jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=UTF-8&\**serverTimezone=UTC\****



## springboot读取application.yml报错解决java.lang.IllegalStateException: Failed to load property source from 'file:/D:/src/java/java%20basics/thymeleafdemo/target/classes/application.yml' (classpath:/application.yml)

### 

springboot项目启动时，读取配置文件出错，错误信息如下：

Failed to load property source from location 'classpath:/application.yml'
......
org.yaml.snakeyaml.error.YAMLException: java.nio.charset.MalformedInputException: Input length = 1
查找资料，原因基本确定为文件编码格式的问题（原yml文件为GBK格式），于是将GBK格式改为UTF-8，改完后发现之前文件中注释的中文乱码了，问题的原因应该是出自于这里，于是将注释全部删除，再启动就正常了。

注：文件格式更改后，看是否有乱码现象，注释也会有影响。
————————————————
版权声明：本文为CSDN博主「w864518106」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/w864518106/article/details/80423285



# 放弃了 spring 个人博客系统没完成 

原因 基础相差太多 看都看不懂。

后面有时间搞