# Using Spring [Boot](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/using-spring-boot.html#using-boot)



This section goes into more detail about how you should use Spring Boot

# 构建代码

## 使用"default"包

When a class does not include a `package` declaration, it is considered to be in the “default package”. The use of the “default package” is generally discouraged and should be avoided. It can cause particular problems for Spring Boot applications that use the `@ComponentScan`, `@ConfigurationPropertiesScan`, `@EntityScan`, or `@SpringBootApplication` annotations, since every class from every jar is read.



总结:

mvn使用 mvn spring boot:run运行  mvn pakage打包 

构建开发代码 idea ->spring boot -> 依赖.

annotation use = @SpringBootApplication Annotation

