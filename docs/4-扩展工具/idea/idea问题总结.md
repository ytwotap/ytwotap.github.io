# idea常见问题总结

## 错误问题

### Maven 加载错误 

- 检查网络问题 --家用网络可能夹杂不出来 Plugins --可以尝试手机网络
- 检查步操作骤问题
- 查看官网文档

## 界面操作

### run==mvnw spring-boot:run

 - idea 上 的run 其实就是 在当前文件夹下运行了 **mvn spring-boot:run** 命		令。来启动 spring boot


## Maven 问题 
#### 依赖[自动导入](https://blog.csdn.net/qq_39445165/article/details/90107515)设置   

### [Maven 修改依赖为国内阿里镜像](https://blog.csdn.net/liangyihuai/article/details/57406870)

   *注意 ：改变setting设置容易造成错误 可以下载完依赖后 改回setting*

### [Idea不识别java文件（类文件显示橙色）](https://blog.csdn.net/EndTheme_Xin/article/details/84189797)或者idea识别不出 spring项目结构，通过重新导入maven 解决



## [视图模式](https://www.jianshu.com/p/7b9554486812)

**视图模式能更好打代码**

![image-20200523175919595](idea%E9%97%AE%E9%A2%98%E6%80%BB%E7%BB%93.assets/image-20200523175919595.png)

![image-20200523175949312](../../6-%E6%A1%86%E6%9E%B6/spring_boot/imge/image-20200523175949312.png)

# [解决error:java:不支持发行版本](https://www.jianshu.com/p/8ff4652fabd0)

# 解决IDEA报错：error:java:不支持发行版本5 

今天在maven项目里面运行的时候，出现error:java:不支持发行版本5报错，原因是项目运行的时候，jdk版本与本地的版本不一致，我的本地jdk版本是12，因此到IDEA--->File--->project structure，检查了一下project和moduels中jdk版本与本地对比，发现不一致，于是修改为jdk12(你修改为与你本地的版本一致即可)，如图：

![img](https:////upload-images.jianshu.io/upload_images/17768830-092e978c4ccc4999.png?imageMogr2/auto-orient/strip|imageView2/2/w/847/format/webp)

图一：在此处修改project对应jdk

![img](https:////upload-images.jianshu.io/upload_images/17768830-e2701c38df2884c7.png?imageMogr2/auto-orient/strip|imageView2/2/w/1005/format/webp)

图二：在此处修改Moduels对应jdk

修改完毕之后到Settings-->Bulid, Execution,Deployment-->java Compiler，Target bytecode version设为本地Java版本。（可以在Default Settings中把Project bytecode version 一劳永逸地配置成本地Java版本），如下图：

![img](https:////upload-images.jianshu.io/upload_images/17768830-db1bf5ee9e030e74.png?imageMogr2/auto-orient/strip|imageView2/2/w/1016/format/webp)

做了上述修改项目和环境对应的jdk版本之后，继续运行maven项目，出现了error:java:不支持发行版本12的报错，说明jdk版本可能被maven项目的配置覆盖了，我在一开始IDEA--->File--->project structure的Moduels设置jdk版本时会出现以下提示Module 'mybatis-generator' is imported from Maven..Any changes made in its configuration may be lost after reimporting,

![img](https:////upload-images.jianshu.io/upload_images/17768830-b98fa8c96400144a.png?imageMogr2/auto-orient/strip|imageView2/2/w/901/format/webp)

那么需要在自己的pom.xml文件指定编译的jdk版本，

<properties>

​    <maven.compiler.source>12</maven.compiler.source>

​    <maven.compiler.target>12</maven.compiler.target>

</properties>

或者（自行转换格式）：

<build>

​      <plugins>

　　　　    <plugin>

​                  <groupId>org.apache.maven.plugins</groupId>

​                   <artifactId>maven-compiler-plugin</artifactId>

​                   <version>3.6.1</version>

​                   <configuration>

​       　          <source>12</source>

​       　          <target>12</target>

​                  </configuration>

　　　　      </plugin>

　　    </plugins>

</build>



![img](https:////upload-images.jianshu.io/upload_images/17768830-552c6894ccff0d04.png?imageMogr2/auto-orient/strip|imageView2/2/w/534/format/webp)



作者：寻水的鱼鱼鱼呀
链接：https://www.jianshu.com/p/8ff4652fabd0
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。