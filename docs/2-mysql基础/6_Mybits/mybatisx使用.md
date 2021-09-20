# mybatisx插件

doc:https://baomidou.com/guide/mybatisx-idea-plugin.html#%E5%8A%9F%E8%83%BD

## 能干啥?

能根据数据库生成相应的代码和sql语句

## 安装:

安装方法：打开 IDEA，进入 File -> Settings -> Plugins -> Browse Repositories，输入 `mybatisx` 搜索并安装。

## 功能:

### **XML跳转**

![跳转](mybatisx%E4%BD%BF%E7%94%A8.assets/mybatisx-jump.gif)

### **生成代码(需先在idea配置Datebase配置数据源)**

![生成代码](mybatisx%E4%BD%BF%E7%94%A8.assets/mybatisx-generate.gif)

### **重置模板**

![生成代码](mybatisx%E4%BD%BF%E7%94%A8.assets/mybatisx-reset-template.gif)

### **JPA提示**

生成新增

![生成新增](mybatisx%E4%BD%BF%E7%94%A8.assets/mybatisx-tip-insert.gif)

生成修改

![生成修改](mybatisx%E4%BD%BF%E7%94%A8.assets/mybatisx-tip-update.gif)

生成删除

![生成删除](mybatisx%E4%BD%BF%E7%94%A8.assets/mybatisx-tip-delete.gif)

### jpa 问题 常见问答(重点,在不适用spring的情况下使用)

**为什么JPA不能使用?**
JPA提示的方式需要根据Mapper找到实体类, 找到实体类有以下五种方式

> 这种方式失败 ,会出现未知错误 .不知道是包问题还是 没有使用spring...

1. ~~继承mybatis-plus的BaseMapper~~

   ~~导入依赖就可以用BaseMapper了~~

   ```xml
      <!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus -->
           <dependency>
               <groupId>com.baomidou</groupId>
               <artifactId>mybatis-plus</artifactId>
               <version>3.4.2</version>
           </dependency>
   ```

   ~~例子:~~

   ```java
   
   public interface TypeDao  extends BaseMapper<Type> {
       List<Type> selectByObject(Type type);
       List<Type> selectAll();
       Type selectById(Integer id);
       Integer addType(Type type);
   
       Integer delectById(Integer id);
   
       Integer updateByObject(Type type);
   
       int deleteByName(@Param("name") String name);
   }
   ```

   

2. **Mapper.xml 文件有 resultMap 标签(这个test 可以,就用这个 )** 

   > ​	主要问题还是生成 resultMap 不好写,就用database生成的mapper.

   ```xml
    <resultMap id="BaseResultMap" type="com.cskaoyan.mall.model.User">
           <id property="id" column="id" jdbcType="INTEGER"/>
           <result property="email" column="email" jdbcType="VARCHAR"/>
           <result property="password" column="password" jdbcType="VARCHAR"/>
           <result property="nickname" column="nickname" jdbcType="VARCHAR"/>
           <result property="recipient" column="recipient" jdbcType="VARCHAR"/>
           <result property="address" column="address" jdbcType="VARCHAR"/>
           <result property="phone" column="phone" jdbcType="VARCHAR"/>
       </resultMap>
   ```

   

3. 在Mapper类上增加注释指定实体类, 例如: `@Entity com.xx.xx.UserModel`

**为什么生成的表名和期望的表名不一致**
JPA提示生成代码, 按照以下规则找到表名

1. 实体类有JPA注解, 例如: `@Table(name="t_user")`
2. 实体类有mybais-plus注解, 例如: `@TableName("t_user")`
3. 实体类有注释: `@TableName com.xx.xx.UserModel`
4. 如果不存在以上规则, 将驼峰转下划线. 例如 UserMode 的表名为: user_model

