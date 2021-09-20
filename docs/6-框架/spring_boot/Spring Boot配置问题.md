# [Spring Boot静态资源访问和配置全解析](https://blog.csdn.net/u010358168/article/details/81205116)

一、默认静态资源映射规则
二、自定义静态资源映射规则
2.1 自定义静态资源映射类
2.2 在application.properties中进行配置
2.2.1 配置静态资源访问路径
2.2.2 配置静态资源目录
在web开发中，静态资源的访问时必不可少的，比如image、css、js等。SpringBoot对静态资源访问提供了很好的支持，使用其提供的基本默认配置基本可以满足开发需求，同时，又支持开发人员进行自定义配置。

一、默认静态资源映射规则
Spring Boot 默认将 / 所有访问映射到以下目录：**

classpath:/static
classpath:/public
classpath:/resources
classpath:/META-INF/resources
1
2
3
4
接下来，在main/resources下新建static、public和resources三个文件夹，分别放入a.png、b.png和c.png三张图片，如下：

启动项目，分别访问：

http://localhost:8083/a.png
http://localhost:8083/b.png
http://localhost:8083/c.png
1
2
3
发现都能正常访问相应的图片资源。那么说明，Spring Boot 默认会挨个从 public、resources和static 里面找是否存在相应的资源，如果有则直接返回。

二、自定义静态资源映射规则
2.1 自定义静态资源映射类
追溯源码发现，在WebMvcAutoConfiguration类中，有如下代码：

public void addResourceHandlers(ResourceHandlerRegistry registry) {
            if(!this.resourceProperties.isAddMappings()) {
                logger.debug("Default resource handling disabled");
            } else {
                Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
                CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
                if(!registry.hasMappingForPattern("/webjars/**")) {
                    this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{"/webjars/**"}).addResourceLocations(new String[]{"classpath:/META-INF/resources/webjars/"}).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
                }
// 此处做的就是静态资源文件夹映射
                String staticPathPattern = this.mvcProperties.getStaticPathPattern();
                if(!registry.hasMappingForPattern(staticPathPattern)) {
                    this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{staticPathPattern}).addResourceLocations(getResourceLocations(this.resourceProperties.getStaticLocations())).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
                }

            }
        }
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
通过追溯staticPathPattern，在ResourceProperties类中，发现如下常量信息被设置：

private static final String[] CLASSPATH_RESOURCE_LOCATIONS = new String[]{"classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/static/", "classpath:/public/"};
1
2
到此，就可以发现，这就是Spring Boot为我们提供的默认静态资源映射，那么自定义映射规则的话，继承WebMvcConfigurer即可。如下：

@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 将/static/**访问映射到classpath:/mystatic/
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/mystatic/");
    }
}
1
2
3
4
5
6
7
8
在main/resources下新建mystatic文件夹，并放入d.png图片。
启动项目，访问如下链接：
http://localhost:8083/static/d.png
发现，可以正常请求d.png图片。

2.2 在application.properties中进行配置
2.2.1 配置静态资源访问路径
在application.properties中配置如下：

spring.mvc.static-path-pattern=/mystatic/**
1
重启项目，再访问静态资源，需要以mystatic开头，如下：
http://localhost:8083/mystatic/a.png
这样，仍可以访问之前的a b c三张图片。如果按照之前http://localhost:8083/a.png就不能再访问到了。

2.2.2 配置静态资源目录
在application.properties中，增加如下配置：

# 配置静态资源访问前缀
spring.mvc.static-path-pattern=/mystatic/**
# 配置静态资源路径，默认配置失效
spring.resources.static-locations[0]=classpath:/mystatic
spring.resources.static-locations[1]=classpath:/public
1
2
3
4
5
重启项目，访问：
http://localhost:8083/mystatic/a.png
发现可以正常访问，同理，mystatic和static中静态资源都可以正常访问。
但当访问resources和static里静态资源时，就会404报错，访问不到了，这个是因为配置文件中如果进行了静态资源路径的配置，那么默认的配置就失效了。
————————————————
版权声明：本文为CSDN博主「小洋人最happy」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u010358168/article/details/81205116