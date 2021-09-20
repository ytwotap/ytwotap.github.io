# 使用Swagger2构建强大的API文档

来源:https://blog.didispace.com/spring-boot-learning-21-2-2/

## 为啥需要swagger:

- 由于接口众多，并且细节复杂（需要考虑不同的HTTP请求类型、HTTP头部信息、HTTP请求内容等），高质量地创建这份文档本身就是件非常吃力的事，下游的抱怨声不绝于耳。
- 随着时间推移，不断修改接口实现的时候都必须同步修改接口文档，而文档与代码又处于两个不同的媒介，除非有严格的管理机制，不然很容易导致不一致现象。

[RESTful API](https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2)的重磅好伙伴Swagger2，它可以轻松的整合到Spring Boot中，并与Spring MVC程序配合组织出强大RESTful API文档。它既可以减少我们创建文档的工作量，同时说明内容又整合入实现代码中，让维护文档和修改代码整合为一体，可以让我们在修改代码逻辑的同时方便的修改文档说明。另外Swagger2也提供了强大的页面测试功能来调试每个RESTful API。

### what is restful api:

需要注意的是，REST是设计风格而**不是**标准。REST通常基于[HTTP](https://zh.wikipedia.org/wiki/HTTP)、[URI](https://zh.wikipedia.org/wiki/URI)、[XML](https://zh.wikipedia.org/wiki/XML)以及[HTML](https://zh.wikipedia.org/wiki/HTML)这些现有的广泛流行的协议和标准。

- 资源是由URI来指定。
- 对资源的操作包括获取、创建、修改和删除，这些操作正好对应HTTP协议提供的GET、POST、PUT和DELETE方法。
- 通过操作资源的表现形式来操作资源。
- 资源的表现形式则是XML或者HTML，取决于读者是机器还是人、是消费Web服务的客户软件还是Web浏览器。当然也可以是任何其他的格式，例如JSON。

#### ex:

**RESTful API具体设计如下：**

![img](http://blog.didispace.com/content/images/posts/springbootrestfulapi-1.png)

## 实现swagger配置

**第一步**：添加swagger-spring-boot-starter依赖

```xml
<!--使用Swagger2构建强大的API文档-->
<dependency>
    <groupId>com.spring4all</groupId>
    <artifactId>swagger-spring-boot-starter</artifactId>
    <version>1.9.0.RELEASE</version>
</dependency>
```

**第二步**：应用主类中添加`@EnableSwagger2Doc`注解，具体如下

![image-20210717175933643](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210717175933.png)

**第三步**：`application.properties`中配置文档相关内容，比如

```properties
#配置swagger
swagger:
  title: spring-boot-starter-swagger
  description: use swagger and start swagger 2.x
  version: 1.9.0.RELEASE
  license: ....
  license-url: www.xxx.com
  terms-of-service-url: test
  contact:
    name: yt
    email: 5469@google.com
    url: www.ytwotap.com
  base-package:
  base-path: /**
```

各参数配置含义如下：

- `swagger.title`：标题
- `swagger.description`：描述
- `swagger.version`：版本
- `swagger.license`：许可证
- `swagger.licenseUrl`：许可证URL
- `swagger.termsOfServiceUrl`：服务条款URL
- `swagger.contact.name`：维护人
- `swagger.contact.url`：维护人URL
- `swagger.contact.email`：维护人email
- `swagger.base-package`：swagger扫描的基础包，默认：全扫描
- `swagger.base-path`：需要处理的基础URL规则，默认：/**

更多配置说明可见官方说明：https://github.com/SpringForAll/spring-boot-starter-swagger

**第四步**：启动应用，访问：`http://localhost:8080/swagger-ui.html`，就可以看到如下的接口文档页面

![image-20210717192004427](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210717192004.png)

> 异常：java.lang.NoClassDefFoundError: javax/validation/constraints/Min
>
> **原因：** 使用springboot2.3.1.RELEASE 没有自动引入 validation对应的包
>
> **解决方案：** 引入 validation 包
>
> ```xml
> <dependency>
> 	<groupId>org.springframework.boot</groupId>
> 	<artifactId>spring-boot-starter-validation</artifactId>
>  </dependency>
> ```

## 添加文档内容

在整合完Swagger之后，在`http://localhost:8080/swagger-ui.html`页面中可以看到，关于各个接口的描述还都是英文或遵循代码定义的名称产生的。这些内容对用户并不友好，所以我们需要自己增加一些说明来丰富文档内容。如下所示，我们

**通过`@Api`，`@ApiOperation`注解来给API增加说明、**

**通过`@ApiImplicitParam`、`@ApiModel`、`@ApiModelProperty`注解来给参数增加说明。**

例子:

```java
package com.example.accessingdatamysql.web;


import com.example.accessingdatamysql.pojo.TransResult;
import com.example.accessingdatamysql.pojo.Word;
import com.example.accessingdatamysql.sever.QueryServer;
import com.example.accessingdatamysql.sever.WordServer;
import com.example.accessingdatamysql.util.ParsingJson;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-05-25
 */
@Api(tags = "得到传输的单词")
@RestController
public class FindAWordController {
    @Autowired
    QueryServer queryServer;
    @Autowired
    WordServer wordServer;
    @Autowired
    ParsingJson parsingJson;
    @Autowired
    TransResult transResult;

    /*request tanslate contrller*/
    @GetMapping(value = "/getAWord")
    @ApiOperation(value = "从参数word中获取单词")
    public String getAWord(@RequestParam String word){

        queryServer.setQuery(word);
        /*find word*/
        Word isInDatabaseWord = wordServer.getWordByWord(word);
        /*database有word*/
        if(isInDatabaseWord!=null){
            System.out.println(isInDatabaseWord.getMeaning());
            return isInDatabaseWord.getMeaning();
        }else {
            String answer = queryServer.useBaiDuApi();
            System.out.println(answer);
            transResult = parsingJson.jsonToJsonBean(answer);
            if (transResult != null) {
                /*存储word*/
                wordServer.addResult(transResult);
            } else {
                System.out.println("--------存储失败--------");
            }
            System.out.println(transResult.getDst());
            return transResult.getDst();
        }
    }
    /*test*/
    @GetMapping(value="/test")
    @ApiOperation(value = "返回hello,这是请求test")
    public  String getHello(){
        return "test hello!";
    }
}
```

![image-20210717200558893](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210717200558.png)

```java
@Data
@ApiModel(description = "用户实体")
public class UserTest {
    @ApiModelProperty("用户id")
    private Long id;
    @ApiModelProperty("用户name")
    private String name;
    @ApiModelProperty("用户age")
    private Integer age;
}
```

![image-20210717200516679](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210717200516.png)

## API文档访问与调试

在上图请求的页面中，我们看到user的Value是个输入框？是的，Swagger除了查看接口功能外，还提供了调试测试功能，我们可以点击上图中右侧的Model Schema（黄色区域：它指明了User的数据结构），此时Value中就有了user对象的模板，我们只需要稍适修改，点击下方`“Try it out！”`按钮，即可完成了一次请求调用！

此时，你也可以通过几个GET请求来验证之前的POST请求是否正确。

相比为这些接口编写文档的工作，我们增加的配置内容是非常少而且精简的，对于原有代码的侵入也在忍受范围之内。因此，在构建RESTful API的同时，加入Swagger来对API文档进行管理，是个不错的选择。

![image-20210717200901944](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/pugin-picture20210717200902.png)

代码实例:

chrome 插件服务器段的实现:https://github.com/ytwotap/my-extension-chrome-mysql-window

