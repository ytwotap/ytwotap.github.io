# 跨域(CORS)

doc:https://zh.wikipedia.org/wiki/%E8%B7%A8%E4%BE%86%E6%BA%90%E8%B3%87%E6%BA%90%E5%85%B1%E4%BA%AB#%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86

## 1.跨域是啥

**跨域资源共享**（英语：Cross-origin resource sharing，缩写：CORS），用于让网页的受限资源能够被其他[域名](https://zh.wikipedia.org/wiki/域名)的页面访问的一种机制。[[1\]](https://zh.wikipedia.org/wiki/跨來源資源共享#cite_note-mozhacks_cors2-1)

通过该机制，页面能够自由地使用不同源（英语：cross-origin）的图片、样式、脚本、iframes以及视频。[[2\]](https://zh.wikipedia.org/wiki/跨來源資源共享#cite_note-2)一些跨**域**的请求（特别是Ajax）常常会被同源策略（英语：Same-origin policy）所禁止的。跨源资源共享定义了一种方式，为的是浏览器和服务器之间能互相确认是否足够安全以至于能使用跨源请求（英语：cross-origin requests）。[[3\]](https://zh.wikipedia.org/wiki/跨來源資源共享#cite_note-nczonline1-3)比起纯粹的同源请求，这将更为自由和功能性的（functionality ），但比纯粹的跨源请求更为安全。

跨域资源共享是一份浏览器技术的规范，提供了 Web 服务从不同网域传来[沙盒](https://zh.wikipedia.org/wiki/沙盒_(電腦安全))脚本的方法，以避开浏览器的[同源策略](https://zh.wikipedia.org/wiki/同源策略)[[4\]](https://zh.wikipedia.org/wiki/跨來源資源共享#cite_note-mozhacks_cors-4)。





通俗来说,跨域就是 baidu.com->taobao.com会出现无法访问了的问题,一般会出现在`ajax`请求中.在js html a标签等访问不会出现这种问题.

![image-20210824204250719](%E8%B7%A8%E5%9F%9F(CORS).assets/image-20210824204250719.png)

![image-20210824204632333](%E8%B7%A8%E5%9F%9F(CORS).assets/image-20210824204632333.png)



## 2 如何解决跨域不能访问问题

设置hear,允许访问 

```java
res.header("Access-Control-Allow-Origin","*");
```

![image-20210824204645802](%E8%B7%A8%E5%9F%9F(CORS).assets/image-20210824204645802.png)



## 3.工作原理

跨域资源共享标准描述了，新的HTTP头部在浏览器有权限的时候，应该以如何的形式发送请求到远程URLs。虽然服务器会有一些校验和认证，但是浏览器有责任去支持这些头部以及增加相关的限制。

对于能够修改数据的Ajax和HTTP请求方法（特别是 `GET` 以外的 HTTP 请求，或者搭配某些 MIME 类型的 `POST` 请求），浏览器必须首先使用 `OPTIONS` 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨源请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。[[5\]](https://zh.wikipedia.org/wiki/跨來源資源共享#cite_note-5)