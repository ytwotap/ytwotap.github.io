# spring boot api 部分 



l:link:https://blog.didispace.com/spring-boot-learning-2x/







# Spring Boot 2.x基础教程：构建RESTful API与单元测试

首先，回顾并详细说明一下在[快速入门](http://blog.didispace.com/spring-boot-learning-21-1-1/)中使用的`@Controller`、`@RestController`、`@RequestMapping`注解。如果您对Spring MVC不熟悉并且还没有尝试过快速入门案例，建议先看一下[快速入门](http://blog.didispace.com/spring-boot-learning-21-1-1/)的内容。

- `@Controller`：修饰class，用来创建处理http请求的对象
- `@RestController`：Spring4之后加入的注解，原来在`@Controller`中返回json需要`@ResponseBody`来配合，如果直接用`@RestController`替代`@Controller`就不需要再配置`@ResponseBody`，默认返回json格式
- `@RequestMapping`：配置url映射。现在更多的也会直接用以Http Method直接关联的映射注解来定义，比如：`GetMapping`、`PostMapping`、`DeleteMapping`、`PutMapping`等

下面我们通过使用Spring MVC来实现一组对User对象操作的RESTful API，配合注释详细说明在Spring MVC中如何映射HTTP请求、如何传参、如何编写单元测试。

**RESTful API具体设计如下：**

[![img](http://blog.didispace.com/content/images/posts/springbootrestfulapi-1.png)](http://blog.didispace.com/content/images/posts/springbootrestfulapi-1.png)

## 定义User实体

```
@Data
public class User {

    private Long id;
    private String name;
    private Integer age;

}
```

注意：相比[1.x版本教程](http://blog.didispace.com/springbootrestfulapi/)中自定义set和get函数的方式，这里使用`@Data`注解可以实现在编译器自动添加set和get函数的效果。该注解是lombok提供的，只需要在pom中引入加入下面的依赖就可以支持：

```
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

## 实现对User对象的操作接口

```
@RestController
@RequestMapping(value = "/users")     // 通过这里配置使下面的映射都在/users下
public class UserController {

    // 创建线程安全的Map，模拟users信息的存储
    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>());

    /**
     * 处理"/users/"的GET请求，用来获取用户列表
     *
     * @return
     */
    @GetMapping("/")
    public List<User> getUserList() {
        // 还可以通过@RequestParam从页面中传递参数来进行查询条件或者翻页信息的传递
        List<User> r = new ArrayList<User>(users.values());
        return r;
    }

    /**
     * 处理"/users/"的POST请求，用来创建User
     *
     * @param user
     * @return
     */
    @PostMapping("/")
    public String postUser(@RequestBody User user) {
        // @RequestBody注解用来绑定通过http请求中application/json类型上传的数据
        users.put(user.getId(), user);
        return "success";
    }

    /**
     * 处理"/users/{id}"的GET请求，用来获取url中id值的User信息
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        // url中的id可通过@PathVariable绑定到函数的参数中
        return users.get(id);
    }

    /**
     * 处理"/users/{id}"的PUT请求，用来更新User信息
     *
     * @param id
     * @param user
     * @return
     */
    @PutMapping("/{id}")
    public String putUser(@PathVariable Long id, @RequestBody User user) {
        User u = users.get(id);
        u.setName(user.getName());
        u.setAge(user.getAge());
        users.put(id, u);
        return "success";
    }

    /**
     * 处理"/users/{id}"的DELETE请求，用来删除User
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        users.remove(id);
        return "success";
    }

}
```

> 这里相较[1.x版本教程](http://blog.didispace.com/springbootrestfulapi/)中，用更细化的`@GetMapping`、`@PostMapping`等系列注解替换了以前的`@RequestMaping`注解；另外，还使用`@RequestBody`替换了`@ModelAttribute`的参数绑定。

# [springboot](https://www.cnblogs.com/fnlingnzb-learner/p/12068505.html)编写单元测试

介绍：https://www.cnblogs.com/fnlingnzb-learner/p/12068505.html

SpringBoot 测试支持由两个模块提供：

- **spring-boot-test** 包含核心项目
- **spring-boot-test-autoconfigure** 支持测试的自动配置

通常我们只要引入 `spring-boot-starter-test` 依赖就行，它包含了一些常用的模块 Junit、Spring Test、AssertJ、Hamcrest、Mockito 等。

SpringBoot 使用了 Junit4 作为单元测试框架，所以注解与 Junit4 是一致的。

| 注解                                     | 作用                                                   |
| ---------------------------------------- | ------------------------------------------------------ |
| @Test(excepted==xx.class,timeout=毫秒数) | 修饰一个方法为测试方法，excepted参数可以忽略某些异常类 |
| @Before                                  | 在每一个测试方法被运行前执行一次                       |
| @BeforeClass                             | 在所有测试方法执行前执行                               |
| @After                                   | 在每一个测试方法运行后执行一次                         |
| @AfterClass                              | 在所有测试方法执行后执行                               |
| @Ignore                                  | 修饰的类或方法会被测试运行器忽略                       |
| @RunWith                                 | 更改测试运行器                                         |



## @SpringBootTest

SpringBoot提供了一个 **@SpringBootTest** 注解用于测试 SpringBoot 应用，它可以用作标准 spring-test **@ContextConfiguration** 注释的替代方法，其原理是通过 SpringApplication 在测试中创建ApplicationContext。

```
1 @RunWith(SpringRunner.class)
2 @SpringBootTest
3 public class ApplicationTest {
4 }
```



该注解提供了两个属性用于配置：

- webEnvironment

  ：指定Web应用环境，它可以是以下值

  - MOCK：提供一个模拟的 Servlet 环境，内置的 Servlet 容器没有启动，配合可以与@AutoConfigureMockMvc 结合使用，用于基于 MockMvc 的应用程序测试。
  - RANDOM_PORT：加载一个 EmbeddedWebApplicationContext 并提供一个真正嵌入式的 Servlet 环境，随机端口。
  - DEFINED_PORT：加载一个 EmbeddedWebApplicationContext 并提供一个真正嵌入式的 Servlet 环境，默认端口 8080 或由配置文件指定。
  - NONE：使用 SpringApplication 加载 ApplicationContext，但不提供任何 servlet 环境。

- **classes**：指定应用启动类，通常情况下无需设置，因为 SpringBoot 会自动搜索，直到找到 @SpringBootApplication 或 @SpringBootConfiguration 注解。

## 目录

新建的项目，一般会有test包和test类，结构如下：

![img](https://img-blog.csdn.net/20180202175623620?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2VpeGluXzM5ODAwMTQ0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

如果没有，我们自己创建一个，由于一个项目中我们会写很多很多测试类，而测试类上面是需要以下几个注解的，每建一个类都去补注解，太麻烦，我们就在这个类中加上注解，其他测试类直接继承这个类就好了：

 

```java
package com.alibaba;

import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringRunner.class)
@SpringBootTest
//由于是Web项目，Junit需要模拟ServletContext，因此我们需要给我们的测试类加上@WebAppConfiguration。
@WebAppConfiguration
public class TmallApplicationTests {
@Before
public void init() {
    System.out.println("开始测试-----------------");
}
 
@After
public void after() {
    System.out.println("测试结束-----------------");
}
```
}

————————————————
版权声明：本文为CSDN博主「IT云清」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_39800144/article/details/79241620

## 实例

下面针对该Controller编写测试用例验证正确性，具体如下。当然也可以通过浏览器插件等进行请求提交验证。 

```java
@RunWith(SpringRunner.class)
@SpringBootTest
/*
 * 1、mockMvc.perform执行一个请求。
 * 2、MockMvcRequestBuilders.get("XXX")构造一个请求。
 * 3、ResultActions.param添加请求传值
 * 4、ResultActions.accept(MediaType.TEXT_HTML_VALUE))设置返回类型
 * 5、ResultActions.andExpect添加执行完成后的断言。
 * 6、ResultActions.andDo添加一个结果处理器，表示要对结果做点什么事情
 *   比如此处使用MockMvcResultHandlers.print()输出整个响应结果信息。
 * 7、ResultActions.andReturn表示执行完成后返回相应的结果。
 */
public class Chapter21ApplicationTests {

    private MockMvc mvc;

    @Before
    public void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(new UserController()).build();
    }

    @Test
    public void testUserController() throws Exception {
        // 测试UserController
        RequestBuilder request;

        // 1、get查一下user列表，应该为空
        request = get("/users/");
        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("[]")));

        // 2、post提交一个user
        request = post("/users/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":1,\"name\":\"测试大师\",\"age\":20}");
        mvc.perform(request)
                .andExpect(content().string(equalTo("success")));

        // 3、get获取user列表，应该有刚才插入的数据
        request = get("/users/");
        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("[{\"id\":1,\"name\":\"测试大师\",\"age\":20}]")));

        // 4、put修改id为1的user
        request = put("/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"测试终极大师\",\"age\":30}");
        mvc.perform(request)
                .andExpect(content().string(equalTo("success")));

        // 5、get一个id为1的user
        request = get("/users/1");
        mvc.perform(request)
                .andExpect(content().string(equalTo("{\"id\":1,\"name\":\"测试终极大师\",\"age\":30}")));

        // 6、del删除id为1的user
        request = delete("/users/1");
        mvc.perform(request)
                .andExpect(content().string(equalTo("success")));

        // 7、get查一下user列表，应该为空
        request = get("/users/");
        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("[]")));

    }

}
```

对MockMvc不熟悉的读者，可能会碰到一些函数不存在而报错。必须引入下面这些静态函数的引用：

```
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
```

> 这里相较[1.x版本教程](http://blog.didispace.com/springbootrestfulapi/)中，主要有两个地方不同。测试类采用`@RunWith(SpringRunner.class)`和`@SpringBootTest`修饰启动；另外，由于POST和PUT接口的参数采用`@RequestBody`注解，所以提交的会是一个json字符串，而不是之前的参数形式，这里在定义请求的时候使用`contentType(MediaType.APPLICATION_JSON)`指定提交内容为json格式，使用`content`传入要提交的json字符串。如果用@ModelAttribute的话就得用`param`方法添加参数，具体可以看[1.x版本的教程](http://blog.didispace.com/springbootrestfulapi/)。





至此，我们通过引入web模块（没有做其他的任何配置），就可以轻松利用Spring MVC的功能，以非常简洁的代码完成了对User对象的RESTful API的创建以及单元测试的编写。其中同时介绍了Spring MVC中最为常用的几个核心注解：`@RestController`,`RequestMapping`以及一些参数绑定的注解：`@PathVariable`,`@RequestBody`等。 并且 使用了 单元test test文档

## 代码示例

本文的相关例子可以查看下面仓库中的`chapter2-1`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)

## 补充

### 什么是Mock

在面向对象的程序设计中，模拟对象（英语：mock object）是以可控的方式模拟真实对象行为的假对象。在编程过程中，通常通过模拟一些输入数据，来验证程序是否达到预期结果。

### 为什么使用Mock对象

使用模拟对象，可以模拟复杂的、真实的对象行为。如果在单元测试中无法使用真实对象，可采用模拟对象进行替代。

在以下情况可以采用模拟对象来替代真实对象：

- 真实对象的行为是不确定的（例如，当前的时间或温度）；
- 真实对象很难搭建起来；
- 真实对象的行为很难触发（例如，网络错误）；
- 真实对象速度很慢（例如，一个完整的数据库，在测试之前可能需要初始化）；
- 真实的对象是用户界面，或包括用户界面在内；
- 真实的对象使用了回调机制；
- 真实对象可能还不存在；
- 真实对象可能包含不能用作测试（而不是为实际工作）的信息和方法。

**使用Mockito一般分三个步骤：1、模拟测试类所需的外部依赖；2、执行测试代码；3、判断执行结果是否达到预期；**



### MockMvc

MockMvc是由spring-test包提供，实现了对Http请求的模拟，能够直接使用网络的形式，转换到Controller的调用，使得测试速度快、不依赖网络环境。同时提供了一套验证的工具，结果的验证十分方便。

接口MockMvcBuilder，提供一个唯一的build方法，用来构造MockMvc。主要有两个实现：StandaloneMockMvcBuilder和DefaultMockMvcBuilder，分别对应两种测试方式，即独立安装和集成Web环境测试（并不会集成真正的web环境，而是通过相应的Mock API进行模拟测试，无须启动服务器）。MockMvcBuilders提供了对应的创建方法standaloneSetup方法和webAppContextSetup方法，在使用时直接调用即可。



### SpringBoot中使用

**第一步：jar包引入**。创建SpringBoot项目中默认引入的spring-boot-starter-test间接引入了spring-test，因此无需再额外引入jar包。

```text
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

第二步：创建HelloWorldController类，并提供hello方法作为待测试的业务接口。

```text
@RestController
public class HelloWorldController {
    @RequestMapping
    public String hello(String name){
        return "Hello " + name + "!";
    }
}
```

**第三步：编写测试类**。实例化MockMvc有两种形式，一种是使用StandaloneMockMvcBuilder，另外一种是使用DefaultMockMvcBuilder。测试类及初始化MockMvc初始化：

```java
//SpringBoot1.4版本之前用的是SpringJUnit4ClassRunner.class
@RunWith(SpringRunner.class)
//SpringBoot1.4版本之前用的是@SpringApplicationConfiguration(classes = Application.class)
@SpringBootTest
//测试环境使用，用来表示测试环境使用的ApplicationContext将是WebApplicationContext类型的
@WebAppConfiguration
public class HelloWorldTest {
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Before
    public void setup() {
        // 实例化方式一
        mockMvc = MockMvcBuilders.standaloneSetup(new HelloWorldController()).build();
        // 实例化方式二
//        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
```

单元测试方法：

```text
@Test
public void testHello() throws Exception {
    /*
     * 1、mockMvc.perform执行一个请求。
     * 2、MockMvcRequestBuilders.get("XXX")构造一个请求。
     * 3、ResultActions.param添加请求传值
     * 4、ResultActions.accept(MediaType.TEXT_HTML_VALUE))设置返回类型
     * 5、ResultActions.andExpect添加执行完成后的断言。
     * 6、ResultActions.andDo添加一个结果处理器，表示要对结果做点什么事情
     *   比如此处使用MockMvcResultHandlers.print()输出整个响应结果信息。
     * 7、ResultActions.andReturn表示执行完成后返回相应的结果。
     */
    mockMvc.perform(MockMvcRequestBuilders
            .get("/hello")
            // 设置返回值类型为utf-8，否则默认为ISO-8859-1
            .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
            .param("name", "Tom"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().string("Hello Tom!"))
            .andDo(MockMvcResultHandlers.print());
}
```

测试结果打印：

```text
FlashMap:
       Attributes = null
MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json;charset=UTF-8", Content-Length:"10"]
     Content type = application/json;charset=UTF-8
             Body = Hello Tom!
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
2019-04-02 21:34:27.954  INFO 6937 --- [       Thread-2] o.s.s.concurrent.ThreadPoolTaskExecutor  : Shutting down ExecutorService 'applicationTaskExecutor'
```

整个过程如下：

1. 准备测试环境
2. 通过MockMvc执行请求
3. 添加验证断言
4. 添加结果处理器
5. 得到MvcResult进行自定义断言/进行下一步的异步请求
6. 卸载测试环境

注意事项：如果使用DefaultMockMvcBuilder进行MockMvc实例化时需在SpringBoot启动类上添加组件扫描的package的指定，否则会出现404。如：

```text
@ComponentScan(basePackages = "com.secbro2")
```



### 相关API

RequestBuilder提供了一个方法buildRequest(ServletContext servletContext)用于构建MockHttpServletRequest；其主要有两个子类MockHttpServletRequestBuilder和MockMultipartHttpServletRequestBuilder（如文件上传使用）。

MockMvcRequestBuilders提供get、post等多种方法用来实例化RequestBuilder。

ResultActions，MockMvc.perform(RequestBuilder requestBuilder)的返回值，提供三种能力：andExpect，添加断言判断结果是否达到预期；andDo，添加结果处理器，比如示例中的打印；andReturn，返回验证成功后的MvcResult，用于自定义验证/下一步的异步处理。



### 一些常用的测试

1.测试普通控制器

```text
mockMvc.perform(get("/user/{id}", 1)) //执行请求  
            .andExpect(model().attributeExists("user")) //验证存储模型数据  
            .andExpect(view().name("user/view")) //验证viewName  
            .andExpect(forwardedUrl("/WEB-INF/jsp/user/view.jsp"))//验证视图渲染时forward到的jsp  
            .andExpect(status().isOk())//验证状态码  
            .andDo(print()); //输出MvcResult到控制台
```

2.得到MvcResult自定义验证

```text
MvcResult result = mockMvc.perform(get("/user/{id}", 1))//执行请求  
        .andReturn(); //返回MvcResult  
Assert.assertNotNull(result.getModelAndView().getModel().get("user")); //自定义断言
```

3.验证请求参数绑定到模型数据及Flash属性

```text
mockMvc.perform(post("/user").param("name", "zhang")) //执行传递参数的POST请求(也可以post("/user?name=zhang"))  
            .andExpect(handler().handlerType(UserController.class)) //验证执行的控制器类型  
            .andExpect(handler().methodName("create")) //验证执行的控制器方法名  
            .andExpect(model().hasNoErrors()) //验证页面没有错误  
            .andExpect(flash().attributeExists("success")) //验证存在flash属性  
            .andExpect(view().name("redirect:/user")); //验证视图
```

4.文件上传

```text
byte[] bytes = new byte[] {1, 2};  
mockMvc.perform(fileUpload("/user/{id}/icon", 1L).file("icon", bytes)) //执行文件上传  
        .andExpect(model().attribute("icon", bytes)) //验证属性相等性  
        .andExpect(view().name("success")); //验证视图
```

5.JSON请求/响应验证

```text
String requestBody = "{\"id\":1, \"name\":\"zhang\"}";  
    mockMvc.perform(post("/user")  
            .contentType(MediaType.APPLICATION_JSON).content(requestBody)  
            .accept(MediaType.APPLICATION_JSON)) //执行请求  
            .andExpect(content().contentType(MediaType.APPLICATION_JSON)) //验证响应contentType  
            .andExpect(jsonPath("$.id").value(1)); //使用Json path验证JSON 请参考http://goessner.net/articles/JsonPath/  
    String errorBody = "{id:1, name:zhang}";  
    MvcResult result = mockMvc.perform(post("/user")  
            .contentType(MediaType.APPLICATION_JSON).content(errorBody)  
            .accept(MediaType.APPLICATION_JSON)) //执行请求  
            .andExpect(status().isBadRequest()) //400错误请求  
            .andReturn();  
    Assert.assertTrue(HttpMessageNotReadableException.class.isAssignableFrom(result.getResolvedException().getClass()));//错误的请求内容体
```

6.异步测试

```text
//Callable  
    MvcResult result = mockMvc.perform(get("/user/async1?id=1&name=zhang")) //执行请求  
            .andExpect(request().asyncStarted())  
            .andExpect(request().asyncResult(CoreMatchers.instanceOf(User.class))) //默认会等10秒超时  
            .andReturn();  
    mockMvc.perform(asyncDispatch(result))  
            .andExpect(status().isOk())  
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))  
            .andExpect(jsonPath("$.id").value(1));
```

7.全局配置

```text
mockMvc = webAppContextSetup(wac)  
            .defaultRequest(get("/user/1").requestAttr("default", true)) //默认请求 如果其是Mergeable类型的，会自动合并的哦mockMvc.perform中的RequestBuilder  
            .alwaysDo(print())  //默认每次执行请求后都做的动作  
            .alwaysExpect(request().attribute("default", true)) //默认每次执行后进行验证的断言  
            .build();  
    mockMvc.perform(get("/user/1"))  
            .andExpect(model().attributeExists("user"));
```







# Swagger2

swagger:https://en.wikipedia.org/wiki/Swagger_(software)

随着前后端分离架构和微服务架构的流行，我们使用Spring Boot来构建RESTful API项目的场景越来越多。通常我们的一个RESTful API就有可能要服务于多个不同的开发人员或开发团队：IOS开发、Android开发、Web开发甚至其他的后端服务等。为了减少与其他团队平时开发期间的频繁沟通成本，传统做法就是创建一份RESTful API文档来记录所有接口细节，然而这样的做法有以下几个问题：

- 由于接口众多，并且细节复杂（需要考虑不同的HTTP请求类型、HTTP头部信息、HTTP请求内容等），高质量地创建这份文档本身就是件非常吃力的事，下游的抱怨声不绝于耳。
- 随着时间推移，不断修改接口实现的时候都必须同步修改接口文档，而文档与代码又处于两个不同的媒介，除非有严格的管理机制，不然很容易导致不一致现象。

为了解决上面这样的问题，本文将介绍RESTful API的重磅好伙伴Swagger2，它可以轻松的整合到Spring Boot中，并与Spring MVC程序配合组织出强大RESTful API文档。它既可以减少我们创建文档的工作量，同时说明内容又整合入实现代码中，让维护文档和修改代码整合为一体，可以让我们在修改代码逻辑的同时方便的修改文档说明。另外Swagger2也提供了强大的页面测试功能来调试每个RESTful API。具体效果如下图所示：

[![img](http://img.didispace.com/Frp7Fhk44jt5NzkRM5qxJqoXMWiS)](http://img.didispace.com/Frp7Fhk44jt5NzkRM5qxJqoXMWiS)

下面来具体介绍，在Spring Boot中使用我们自己实现的starter来整合Swagger。该整合项目的Github：https://github.com/SpringForAll/spring-boot-starter-swagger。如果您觉得它好用，欢迎Star支持我们！

## 准备工作

首先，我们需要一个Spring Boot实现的RESTful API工程，若您没有做过这类内容，建议先阅读上一篇教程：
[Spring Boot 2.x基础教程：构建RESTful API与单元测试](http://blog.didispace.com/spring-boot-learning-21-2-1/)构建一个。或者也可以直接使用上一篇教程中的样例作为基础，即下面仓库中的`chapter2-1`工程：

- Github：https://github.com/dyc87112/SpringBoot-Learning/tree/2.x
- Gitee：https://gitee.com/didispace/SpringBoot-Learning/tree/2.x



## 整合Swagger2

下面，我们以上面仓库中的`chapter2-1`工程进行整合改造。

**第一步**：添加swagger-spring-boot-starter依赖

在`pom.xml`中加入依赖，具体如下：

```
<dependency>
    <groupId>com.spring4all</groupId>
    <artifactId>swagger-spring-boot-starter</artifactId>
    <version>1.9.0.RELEASE</version>
</dependency>
```

**第二步**：应用主类中添加`@EnableSwagger2Doc`注解，具体如下

```
@EnableSwagger2Doc
@SpringBootApplication
public class Chapter22Application {

    public static void main(String[] args) {
        SpringApplication.run(Chapter22Application.class, args);
    }

}
```

**第三步**：`application.properties`中配置文档相关内容，比如

```
swagger.title=spring-boot-starter-swagger
swagger.description=Starter for swagger 2.x
swagger.version=1.4.0.RELEASE
swagger.license=Apache License, Version 2.0
swagger.licenseUrl=https://www.apache.org/licenses/LICENSE-2.0.html
swagger.termsOfServiceUrl=https://github.com/dyc87112/spring-boot-starter-swagger
swagger.contact.name=didi
swagger.contact.url=http://blog.didispace.com
swagger.contact.email=dyc87112@qq.com
swagger.base-package=com.didispace
swagger.base-path=/**
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

**第四步**：启动应用，访问：`http://localhost:8080/swagger-ui.html`，就可以看到如下的接口文档页面：

[![img](http://img.didispace.com/Frp7Fhk44jt5NzkRM5qxJqoXMWiS)](http://img.didispace.com/Frp7Fhk44jt5NzkRM5qxJqoXMWiS)

## 添加文档内容

在整合完Swagger之后，在`http://localhost:8080/swagger-ui.html`页面中可以看到，关于各个接口的描述还都是英文或遵循代码定义的名称产生的。这些内容对用户并不友好，所以我们需要自己增加一些说明来丰富文档内容。如下所示，我们通过`@Api`，`@ApiOperation`注解来给API增加说明、通过`@ApiImplicitParam`、`@ApiModel`、`@ApiModelProperty`注解来给参数增加说明。

比如下面的例子：

```
@Api(tags = "用户管理")
@RestController
@RequestMapping(value = "/users")     // 通过这里配置使下面的映射都在/users下
public class UserController {

    // 创建线程安全的Map，模拟users信息的存储
    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<>());

    @GetMapping("/")
    @ApiOperation(value = "获取用户列表")
    public List<User> getUserList() {
        List<User> r = new ArrayList<>(users.values());
        return r;
    }

    @PostMapping("/")
    @ApiOperation(value = "创建用户", notes = "根据User对象创建用户")
    public String postUser(@RequestBody User user) {
        users.put(user.getId(), user);
        return "success";
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "获取用户详细信息", notes = "根据url的id来获取用户详细信息")
    public User getUser(@PathVariable Long id) {
        return users.get(id);
    }

    @PutMapping("/{id}")
    @ApiImplicitParam(paramType = "path", dataType = "Long", name = "id", value = "用户编号", required = true, example = "1")
    @ApiOperation(value = "更新用户详细信息", notes = "根据url的id来指定更新对象，并根据传过来的user信息来更新用户详细信息")
    public String putUser(@PathVariable Long id, @RequestBody User user) {
        User u = users.get(id);
        u.setName(user.getName());
        u.setAge(user.getAge());
        users.put(id, u);
        return "success";
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "删除用户", notes = "根据url的id来指定删除对象")
    public String deleteUser(@PathVariable Long id) {
        users.remove(id);
        return "success";
    }

}

@Data
@ApiModel(description="用户实体")
public class User {

    @ApiModelProperty("用户编号")
    private Long id;
    @ApiModelProperty("用户姓名")
    private String name;
    @ApiModelProperty("用户年龄")
    private Integer age;

}
```

完成上述代码添加后，启动Spring Boot程序，访问：`http://localhost:8080/swagger-ui.html`，就能看到下面这样带中文说明的文档了（其中标出了各个注解与文档元素的对应关系以供参考）：

[![img](http://img.didispace.com/FoxwzIgdkIIx6Z5_U8DZq5MqVQf_)](http://img.didispace.com/FoxwzIgdkIIx6Z5_U8DZq5MqVQf_)

[![img](http://img.didispace.com/Fjc9yvgYhnQCrM9-2VaQiGwK0v6M)](http://img.didispace.com/Fjc9yvgYhnQCrM9-2VaQiGwK0v6M)

## API文档访问与调试

在上图请求的页面中，我们看到user的Value是个输入框？是的，Swagger除了查看接口功能外，还提供了调试测试功能，我们可以点击上图中右侧的Model Schema（黄色区域：它指明了User的数据结构），此时Value中就有了user对象的模板，我们只需要稍适修改，点击下方`“Try it out！”`按钮，即可完成了一次请求调用！

此时，你也可以通过几个GET请求来验证之前的POST请求是否正确。

相比为这些接口编写文档的工作，我们增加的配置内容是非常少而且精简的，对于原有代码的侵入也在忍受范围之内。因此，在构建RESTful API的同时，加入Swagger来对API文档进行管理，是个不错的选择。

## 代码示例

本文的完整工程可以查看下面仓库中的`chapter2-2`目录：

- Github：[https://github.com/dyc87112/SpringBoot-Learning/](https://github.com/dyc87112/SpringBoot-Learning/tree/master/2.x)
- Gitee：[https://gitee.com/didispace/SpringBoot-Learning/](https://gitee.com/didispace/SpringBoot-Learning/tree/master/2.x)





## 其他参考

如果您不想使用我们封装的starter，而是想要整合原始的Swagger，那么也可以参考1.x版本的教程：[Spring Boot中使用Swagger2构建强大的RESTful API文档](https://blog.didispace.com/springbootswagger2/)。







# Spring Boot 2.x基础教程：JSR-303实现请求参数校验





 请求参数的校验是很多新手开发非常容易犯错，或存在较多改进点的常见场景。比较常见的问题主要表现在以下几个方面：

- 仅依靠前端框架解决参数校验，缺失服务端的校验。这种情况常见于需要同时开发前后端的时候，虽然程序的正常使用不会有问题，但是开发者忽略了非正常操作。比如绕过前端程序，直接模拟客户端请求，这时候就会突然在前端预设的各种限制，直击各种数据访问接口，使得我们的系统存在安全隐患。
- 大量地使用`if/else`语句嵌套实现，校验逻辑晦涩难通，不利于长期维护。

所以，针对上面的问题，建议服务端开发在实现接口的时候，对于请求参数必须要有服务端校验以保障数据安全与稳定的系统运行。同时，对于参数的校验实现需要足够优雅，要满足逻辑易读、易维护的基本特点。

接下来，我们就在本篇教程中详细说说，如何优雅地实现Spring Boot服务端的请求参数校验。

## JSR-303

在开始动手实践之前，我们先了解一下接下来我们将使用的一项标准规范：JSR-303

**什么是JSR？**

JSR是Java Specification Requests的缩写，意思是Java 规范提案。是指向JCP(Java Community Process)提出新增一个标准化技术规范的正式请求。任何人都可以提交JSR，以向Java平台增添新的API和服务。JSR已成为Java界的一个重要标准。

**JSR-303定义的是什么标准？**

JSR-303 是JAVA EE 6 中的一项子规范，叫做Bean Validation，Hibernate Validator 是 Bean Validation 的参考实现 . Hibernate Validator 提供了 JSR 303 规范中所有内置 constraint 的实现，除此之外还有一些附加的 constraint。

**Bean Validation中内置的constraint**

[![img](http://img.didispace.com/Fugzgq1zvxjKur4qdm_N-xV5twMj)](http://img.didispace.com/Fugzgq1zvxjKur4qdm_N-xV5twMj)

**Hibernate Validator附加的constraint**

[![img](http://img.didispace.com/FnNRRGx1eWbniJFHQz2m-pUIEWKa)](http://img.didispace.com/FnNRRGx1eWbniJFHQz2m-pUIEWKa)

在JSR-303的标准之下，我们可以通过上面这些注解，优雅的定义各个请求参数的校验。更多关于JSR的内容可以参与官方文档或参考资料中的引文[1]。

## 动手实践

已经了解了JSR-303之后，接下来我们就来尝试一下，基于此规范如何实现参数的校验！

### 准备工作

读者可以拿任何一个使用Spring Boot 2.x构建的提供RESTful API的项目作为基础。也可以使用[Spring Boot 2.x基础教程：使用Swagger2构建强大的API文档](http://blog.didispace.com/spring-boot-learning-21-2-2/)中构建的实验工程作为基础，您可以通过下面仓库中的`chapter2-2`目录取得：

- Github：https://github.com/dyc87112/SpringBoot-Learning/tree/2.x
- Gitee：https://gitee.com/didispace/SpringBoot-Learning/tree/2.x

当然，您也可以根据前文再构建一个作为复习，也是完全没有问题的。

### 快速入门

我们先来做一个简单的例子，比如：定义字段不能为`Null`。只需要两步

**第一步**：在要校验的字段上添加上`@NotNull`注解，具体如下：

```
@Data
@ApiModel(description="用户实体")
public class User {

    @ApiModelProperty("用户编号")
    private Long id;

    @NotNull
    @ApiModelProperty("用户姓名")
    private String name;

    @NotNull
    @ApiModelProperty("用户年龄")
    private Integer age;

}
```

**第二步**：在需要校验的参数实体前添加`@Valid`注解，具体如下：

```
@PostMapping("/")
@ApiOperation(value = "创建用户", notes = "根据User对象创建用户")
public String postUser(@Valid @RequestBody User user) {
    users.put(user.getId(), user);
    return "success";
}
```

完成上面配置之后，启动应用，并用POST请求访问`localhost:8080/users/`接口，body使用一个空对象，`{}`。你可以用Postman等测试工具发起，也可以使用curl发起，比如这样：

```
curl -X POST \
  http://localhost:8080/users/ \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 72745d04-caa5-44a1-be84-ba9c115f4dfb' \
  -H 'cache-control: no-cache' \
  -d '{
    
}'
```

不出意外，你可以得到如下结果：

```
{
    "timestamp": "2019-10-05T05:45:19.221+0000",
    "status": 400,
    "error": "Bad Request",
    "errors": [
        {
            "codes": [
                "NotNull.user.age",
                "NotNull.age",
                "NotNull.java.lang.Integer",
                "NotNull"
            ],
            "arguments": [
                {
                    "codes": [
                        "user.age",
                        "age"
                    ],
                    "arguments": null,
                    "defaultMessage": "age",
                    "code": "age"
                }
            ],
            "defaultMessage": "不能为null",
            "objectName": "user",
            "field": "age",
            "rejectedValue": null,
            "bindingFailure": false,
            "code": "NotNull"
        },
        {
            "codes": [
                "NotNull.user.name",
                "NotNull.name",
                "NotNull.java.lang.String",
                "NotNull"
            ],
            "arguments": [
                {
                    "codes": [
                        "user.name",
                        "name"
                    ],
                    "arguments": null,
                    "defaultMessage": "name",
                    "code": "name"
                }
            ],
            "defaultMessage": "不能为null",
            "objectName": "user",
            "field": "name",
            "rejectedValue": null,
            "bindingFailure": false,
            "code": "NotNull"
        }
    ],
    "message": "Validation failed for object='user'. Error count: 2",
    "path": "/users/"
}
```

其中返回内容的各参数含义如下：

- `timestamp`：请求时间
- `status`：HTTP返回的状态码，这里返回400，即：请求无效、错误的请求，通常参数校验不通过均为400
- `error`：HTTP返回的错误描述，这里对应的就是400状态的错误描述：Bad Request
- `errors`：具体错误原因，是一个数组类型；因为错误校验可能存在多个字段的错误，比如这里因为定义了两个参数不能为`Null`，所以存在两条错误记录信息
- `message`：概要错误消息，返回内容中很容易可以知道，这里的错误原因是对user对象的校验失败，其中错误数量为`2`，而具体的错误信息就定义在上面的`errors`数组中
- `path`：请求路径

请求的调用端在拿到这个规范化的错误信息之后，就可以方便的解析并作出对应的措施以完成自己的业务逻辑了。

### 尝试一些其他校验

在完成了上面的例子之后，我们还可以增加一些校验规则，比如：校验字符串的长度、校验数字的大小、校验字符串格式是否为邮箱等。下面我们就来定义一些复杂的校验定义，比如：

```
@Data
@ApiModel(description="用户实体")
public class User {

    @ApiModelProperty("用户编号")
    private Long id;

    @NotNull
    @Size(min = 2, max = 5)
    @ApiModelProperty("用户姓名")
    private String name;

    @NotNull
    @Max(100)
    @Min(10)
    @ApiModelProperty("用户年龄")
    private Integer age;

    @NotNull
    @Email
    @ApiModelProperty("用户邮箱")
    private String email;

}
```

发起一个可以出发`name`、`age`、`email`都校验不通过的请求，比如下面这样：

```
curl -X POST \
  http://localhost:8080/users/ \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 114db0f0-bdce-4ba5-baf6-01e5104a68a3' \
  -H 'cache-control: no-cache' \
  -d '{
    "name": "abcdefg",
    "age": 8,
    "email": "aaaa"
}'
```

我们将得到如下的错误返回：

```
{
    "timestamp": "2019-10-05T06:24:30.518+0000",
    "status": 400,
    "error": "Bad Request",
    "errors": [
        {
            "codes": [
                "Size.user.name",
                "Size.name",
                "Size.java.lang.String",
                "Size"
            ],
            "arguments": [
                {
                    "codes": [
                        "user.name",
                        "name"
                    ],
                    "arguments": null,
                    "defaultMessage": "name",
                    "code": "name"
                },
                5,
                2
            ],
            "defaultMessage": "个数必须在2和5之间",
            "objectName": "user",
            "field": "name",
            "rejectedValue": "abcdefg",
            "bindingFailure": false,
            "code": "Size"
        },
        {
            "codes": [
                "Min.user.age",
                "Min.age",
                "Min.java.lang.Integer",
                "Min"
            ],
            "arguments": [
                {
                    "codes": [
                        "user.age",
                        "age"
                    ],
                    "arguments": null,
                    "defaultMessage": "age",
                    "code": "age"
                },
                10
            ],
            "defaultMessage": "最小不能小于10",
            "objectName": "user",
            "field": "age",
            "rejectedValue": 8,
            "bindingFailure": false,
            "code": "Min"
        },
        {
            "codes": [
                "Email.user.email",
                "Email.email",
                "Email.java.lang.String",
                "Email"
            ],
            "arguments": [
                {
                    "codes": [
                        "user.email",
                        "email"
                    ],
                    "arguments": null,
                    "defaultMessage": "email",
                    "code": "email"
                },
                [],
                {
                    "defaultMessage": ".*",
                    "codes": [
                        ".*"
                    ],
                    "arguments": null
                }
            ],
            "defaultMessage": "不是一个合法的电子邮件地址",
            "objectName": "user",
            "field": "email",
            "rejectedValue": "aaaa",
            "bindingFailure": false,
            "code": "Email"
        }
    ],
    "message": "Validation failed for object='user'. Error count: 3",
    "path": "/users/"
}
```

从`errors`数组中的各个错误明细中，知道各个字段的`defaultMessage`，可以看到很清晰的错误描述。

### Swagger文档中的体现

可能有读者会问了，我的接口中是定了这么多。上一篇教程中，不是还教了如何自动生成文档么，那么对于参数的校验逻辑该如何描述呢？

这里要分两种情况，Swagger自身对JSR-303有一定的支持，但是支持的并那么完善，并没有覆盖所有的注解的。

比如，上面我们使用的注解是可以自动生成的，启动上面我们的实验工程，然后访问`http://localhost:8080/swagger-ui.html`，在`Models`不是，我们可以看到如下图所示的内容：

[![img](http://img.didispace.com/FjCx_hTf40k4A5EqtZPsi6wR69xq)](http://img.didispace.com/FjCx_hTf40k4A5EqtZPsi6wR69xq)

其中：`name`和`age`字段相比上一篇教程中的文档描述，多了一些关于校验相关的说明；而`email`字段则没有体现相关校验说明。目前，Swagger共支持以下几个注解：`@NotNull`、`@Max`、`@Min`、`@Size`、`@Pattern`。在实际开发过程中，我们需要分情况来处理，对于Swagger支自动生成的可以利用原生支持来产生，如果有部分字段无法产生，则可以在`@ApiModelProperty`注解的描述中他，添加相应的校验说明，以便于使用方查看。

### 番外：也许你会有这些疑问

**当请求参数校验出现错误信息的时候，错误格式可以修改吗？**

答案是肯定的。这里的错误信息实际上由Spring Boot的异常处理机制统一组织并返回的，我们将在后面的教程中详细介绍，Spring Boot是如何统一处理异常返回以及我们该如何定时异常返回。

**`spring-boot-starter-validation`是必须的吗？**

有读者之前问过，看到很多教程都写了还要引入`spring-boot-starter-validation`依赖，这个依赖到底是否需要？（本篇中并没有引入）

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

其实，只需要仔细看一下`spring-boot-starter-validation`依赖主要是为了引入了什么，再根据当前自己使用的Spring Boot版本来判断即可。实际上，`spring-boot-starter-validation`依赖主要是为了引入下面这个依赖：

```
<dependency>
   <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.0.14.Final</version>
    <scope>compile</scope>
</dependency>
```

我们可以看看当前工程的依赖中是否有它，就可以判断是否还需要额外引入。在Spring Boot 2.1版本中，该依然其实已经包含在了`spring-boot-starter-web`依赖中，并不需要额外引入，所以您在本文中找不到这一步。

























# 补充

## 错误

##### 错误：异常：java.lang.NoClassDefFoundError: javax/validation/constraints/Min

**原因：** 使用springboot2.3.1.RELEASE 没有自动引入 validation对应的包

**解决方案：** 引入 validation 包

```bash
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-validation</artifactId>
 </dependency>
```