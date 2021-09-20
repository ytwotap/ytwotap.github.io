# JWT(Json Web Token) 详解 与 java 实战

## 1.Json Web Token认识

用户认证是计算机安全领域一个永恒的热点话题，然而你会发现，开发者很少讨论有关Json Web Token的话题，其实使用Json Web Token集成到API身份验证机制中是容易，本文给大家普及基础知识。

`Json Web Token (简称JWT)`, **是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准**（(RFC 7519)。该token被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。**JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，该token也可直接被用于认证，也可被加密。**

## 2 传统的session认证

我们知道，http协议本身是一种无状态的协议，而这就意味着如果用户向我们的应用提供了用户名和密码来进行用户认证，那么下一次请求时，用户还要再一次进行用户认证才行，因为根据http协议，我们并不能知道是哪个用户发出的请求，所以为了让我们的应用能识别是哪个用户发出的请求，我们只能在服务器存储一份用户登录的信息，这份登录信息会在响应时传递给浏览器，告诉其保存为cookie，以便下次请求时发送给我们的应用，这样我们的应用就能识别请求来自哪个用户了，这就是传统的基于session认证。传统的session认证方式对于单机单端应用非常方便。

但是这种`基于session的认证使应用本身很难得到扩展`，随着手机、电视等多种客户端（多端）的出现，`独立的服务器已无法承载更多的用户`，而这时候基于session认证应用的问题就会暴露出来。

**session 缺点：**

- **数据以纯文本形式存储在服务器上**
  即使数据通常不存储在公用文件夹中，但是任何具有访问权限的人都可以读取到session会话文件的内容。
- **文件读写请求**
  每次会话开始和数据被修改时，服务器都需要更新会话文件，这些文件读写都要消耗资源。每当应用程序发送会话cookie时也是如此。如果你的应用用户量比较大，将会导致服务器响应速度变慢，当然你也可以使用redis基于内存来存储session或者加大硬件配置，但随着认证用户的增多，服务端的开销会明显增大，这都不是最终解决办法。
- **分布式应用**
  由于session文件默认存储在文件系统中，因此对于多台服务器分布式负载均衡、集群方式架构的高可用应用就显得有点力不从心了，你可能要考虑session会话同步的问题了。

我们`急需一种机制，每个请求中，可以在请求header头或者url中带上一串密钥，这个密钥就是通行证，而这个密钥的合法性和有效性有服务端来控制`，那么我们的服务端`只需鉴定这个密钥是不是授权的真实密钥`，无需保存session文件信息，这个密钥就是token，翻译过来叫**令牌**。

## 3 基于token的鉴权机制

### 概念

`基于token的鉴权机制类似于http协议也是无状态的，``它不需要在服务端去保留用户的认证信息或者会话信息`。这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利。

`JSON Web Signature`是一种加密机制，旨在保护具有对token内容唯一的数字签名的数据，以便我们能够确定token的数据是否已被篡改。

JWT的使用比单个API密钥有许多**优点：**

- API密钥只是随机字符串，而JWT则包含可在一个时间范围或域内描述用户身份，授权数据和令牌有效性的信息和元数据
- Oauth2兼容
- JWT数据可以被检查
- JWT有失效控制

**流程上是这样的：**

- **用户使用用户名密码来请求服务器**
- **服务器进行验证用户的信息**
- **服务器通过验证发送给用户一个token**
- **客户端存储token，并在每次请求时附送上这个token值**
- **服务端验证token值，并返回数据**

这个token必须要在每次请求时传递给服务端，它应该保存在请求头里， 另外`，服务端要支持CORS(跨来源资源共享)策略`，一般我们在服务端这么做就可以了`Access-Control-Allow-Origin: *`。

JWT结构

一个JWT应该像这样：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0MTY5MjkxMDksImp0aSI6ImFhN2Y4ZDBhOTVjIiwic2NvcGVzIjpbInJlcG8iLCJwdWJsaWNfcmVwbyJdfQ.XCEwpBGvOLma4TCoh36FU7XhUbcskygS81HE1uHLf0E
```

看起来，只是随机字符连接在一起的字符串，与API密钥没有太大的区别。 但是，如果仔细观察，你会发现实际上有3个字符串，以点号`.`字符分隔。

### 组成

**JWT由三部分构成。**第一部分我们称它为头部（header)，第二部分我们称其为载荷（payload, 类似于飞机上承载的物品)，第三部分是签证（signature)。

#### **header**

jwt的头部承载两部分信息：

- 声明类型，这里是jwt
- 声明加密的算法 通常直接使用 HMAC SHA256

完整的头部就像下面这样的JSON：

```
 {

'typ': 'JWT',

'alg': 'HS256'

}
```



然后将头部进行base64加密（该加密是可以对称解密的),构成了第一部分:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```

#### **playload**

载荷就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分:

- 标准中注册的声明
- 公共的声明
- 私有的声明

标准中注册的声明 (建议但不强制使用) ：

`iss`: jwt签发者

`sub`: jwt所面向的用户

`aud`: 接收jwt的一方

`exp`: jwt的过期时间，这个过期时间必须要大于签发时间

`nbf`: 定义在什么时间之前，该jwt都是不可用的.

`iat`: jwt的签发时间

`jti`: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

公共的声明 ：

公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密。

私有的声明 ：

私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。

定义一个payload:

```
 {

"sub": "1234567890",

"name": "John Doe",

"admin": true

}
```



然后将其进行base64加密，得到Jwt的第二部分:

```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
```

#### **signature签名**

jwt的第三部分是一个签证信息，这个签证信息由三部分组成：

- header (base64后的)
- payload (base64后的)
- secret

这个部分需要base64加密后的header和base64加密后的payload使用.连接组成的字符串，然后通过header中声明的加密方式进行加盐secret组合加密，然后就构成了jwt的第三部分。

```javascript
 // javascript

var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);

var signature = HMACSHA256(encodedString, 'secret'); // TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```



将这三部分用.连接成一个完整的字符串,构成了最终的jwt:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

注意：secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret就是用来进行jwt的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了。

 

## 4.**java jwt 实战:**

从JWT官网支持的类库来看，jjwt是Java支持的算法中最全的，推荐使用，网址如下。

> [https://github.com/jwtk/jjwt](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fjwtk%2Fjjwt)

下面来看看如何使用jjwt来实现JWT token的生成与解密，主要用到sha512算法来演示。

### **1、导入jjwt的maven包。**

```xml
 <dependency>

<groupId>io.jsonwebtoken</groupId>

<artifactId>jjwt</artifactId>

<version>0.9.0</version>

</dependency>
```

注意：JJWT依赖Jackson 2.x，低版本将报错。

### **2、建立一个JWTTest测试类。**

### **3、创建密钥；**

这里使用sha512算法，所以需要一个密钥。

```javA
 Key KEY = new SecretKeySpec("javastack".getBytes(),

SignatureAlgorithm.HS512.getJcaName());
```

这样就生成了一个固定的密钥：javastack

### **4、生成JWT token。**

核心代码如下：

```java
 Map<String, Object> stringObjectMap = new HashMap<>();

stringObjectMap.put("type", "1");

String payload = "{\"user_id\":\"1341137\", \"expire_time\":\"2018-01-01 0:00:00\"}";

String compactJws = Jwts.builder().setHeader(stringObjectMap)

.setPayload(payload).signWith(SignatureAlgorithm.HS512, KEY).compact();

 

System.out.println("jwt key:" + new String(KEY.getEncoded()));

System.out.println("jwt payload:" + payload);

System.out.println("jwt encoded:" + compactJws);
```



注意：header可以不用设置，claims不能和payload同时设置。

输出结果：

```java
 jwt key:javastack

jwt payload:{"user_id":"1341137", "expire_time":"2018-01-01 0:00:00"}

jwt encoded:eyJ0eXBlIjoiMSIsImFsZyI6IkhTNTEyIn0.eyJ1c2VyX2lkIjoiMTM0MTEzNyIsICJleHBpcmVfdGltZSI6IjIwMTgtMDEtMDEgMDowMDowMCJ9.cnyXRnwczgNcNYqV6TUY2MaMfk6vujsZltC8Q51l40dwYJg516oZcV4VDKOypPT8fD7AE63PIhfdm2ALVrfv5A
```

**5、解密JWT token内容。**

核心代码如下：

```java
 Jws<Claims> claimsJws = Jwts.parser().setSigningKey(KEY).parseClaimsJws(compactJws);

JwsHeader header = claimsJws.getHeader();

Claims body = claimsJws.getBody();

System.out.println("jwt header:" + header);

System.out.println("jwt body:" + body);

System.out.println("jwt body user-id:" + body.get("user_id", String.class));
```



输出结果：

```java
 jwt header:{type=1, alg=HS512}

jwt body:{user_id=1341137, expire_time=2018-01-01 0:00:00}

jwt body user-id:1341137
```

再用密文去JWT官网的调试器解密一下，看是否成功。



解密成功，其他算法使用逻辑一样，这样我们可以使用JWT来实现不同服务之间数据的安全传递。

