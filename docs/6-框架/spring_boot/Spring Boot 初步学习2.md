# Spring Boot 初步学习（二）

### 1.简化部署 打成 jar包

- #### Build an executable JAR

  You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

  If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

  ```
  java -jar build/libs/gs-rest-service-0.1.0.jar
  ```

  If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

  ```
  java -jar target/gs-rest-service-0.1.0.jar
  ```

### 2.构建简单的maven项目

​	https://spring.io/guides/gs/maven/#scratch

maven 是spring的包管理工具 ，导入依赖和生成jar包，管理文件etc.

### 3.[Consuming a RESTful Web Service](https://spring.io/guides/gs/consuming-rest/)

# 2020年4月26日14:39:26  

先暂停学习spring boot ，后面可以结合官方文档和视屏快速学习。 

现在先个人博客搞定他。

# 2020年4月26日20:45:38

mysql使用失败，问题重重啊；

为啥这样。。。大概是不了解spring boot 的正常现象 

花 2天时间 看 spring boot start quirt 文档，看完再说。







# 框架图

**![preview](https://pic2.zhimg.com/v2-7794c89eda1a94daf9a5b4425ec0e380_r.jpg)**



