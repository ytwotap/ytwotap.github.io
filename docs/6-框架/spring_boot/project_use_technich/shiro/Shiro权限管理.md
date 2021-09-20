# 1   Shiro权限管理

> code:

## 1.1  权限管理的概念

认证：Auth**en**ticate ren

授权：Auth**or**    shou

 

星期天逛游乐场，买一张门票。买了门票，进游乐场，会检票。

进到游乐场之后，游玩项目是免费，有些项目需要额外收费。

 

游乐场的免费项目：要有门票            → 认证

游乐场的收费项目：要有门票，单独再买项目票    → 授权

 

先认证后授权，授权是在认证的基础上做的

## 1.2  权限管理的名词

principal → 登录进去的用户信息

subject → 主体，执行登录的主体 subject.login

credentials → 凭证或凭据，主要是密码

 

## 1.3  权限管理的模型

resources 资源

role 角色

permission 权限

### 1.3.1 基于角色的授权

角色和资源之间的关系，多对多





# 实战

## 1   引入依赖

![image-20210917183635222](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917183635222.png)

## 2	自定义realm

获得认证信息和获得授权信息

![image-20210917183700556](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917183700556.png)

## 3   SecurityManager组件注册

![image-20210917184001414](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917184001414.png)

## 4   ShiroFilterFactoryBean

![image-20210917184132707](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917184132707.png)

# 5   认证代码

![image-20210917184202346](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917184202346.png)

# 6  SessionManager

![image-20210917184216684](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917184216684.png)

# 7   @RequiresPermissions

## 1.1  引入依赖aspectjweaver

![image-20210917184547331](Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917184547331.png)

## 1.1  advisor

<img src="Shiro%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.assets/image-20210917184555352.png" alt="image-20210917184555352" style="zoom:200%;" />

