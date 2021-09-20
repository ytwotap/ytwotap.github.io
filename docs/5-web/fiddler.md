# Fiddler “抓包“最新详细教程

#### Fiddler工具介绍

`Fiddler`是一个通过`代理`的方式来进行抓包工具，运行时会在本地建立一个代理服务，默认地址：127.0.0.1:8888。Fiddler开启之后，配置`本机`代理，再打开IE浏览器，IE的PROXY会自动变成`127.0.0.1:8888`，通过其来抓取IE浏览器与服务器之间的所有HTTP(s)请求，但是`火狐`、`chrome`需要手动设置代理。

> 配置本机代理，IE 的 代理 自动变成 刚刚配置的， 谷歌和火狐则需要 手动 设置 代理。 具体原因：浏览器人家厂商自己设置的。

工具下载： [Fiddler](https://link.juejin.cn/?target=https%3A%2F%2Fwww.telerik.com%2Ffiddler)

#### Fiddler工作原理

`这一步`很重要，只有弄懂了工作原理，才能更好的`展开工作`、`配置环境`。

浏览了好多网页，学习抓包软件教程 ~ `无力吐槽` 。



![img](fiddler.assets/16f8e0477631f3f8tplv-t2oaga2asx-watermark.awebp)



抓包其中涉及三个角色： `客户端` 、 `代理`、 `目标服务器`

- 原本正常访问`网页或App`路径是： 客户端 ---> 目标服务器
- 抓包，其实就加入了一个`代理`，相当于古代的 媒人 ，客户端 ---> `媒人`（代理）-->目标服务器
- 只有这三者产生一定的联系，才能进行拦截/抓取一些东西，客户端先访问`媒人`，媒人把`客户端`的信息记录下来，媒人再去联系`目标服务器`，进而返回给`客户端`。
- 三者如何产生联系来？ 咱接着说。

#### pc端浏览器、window软件 进行抓包

1. 打开`Fiddler`(媒人/代理)，Fiddler其实就是 古代的 “媒人” ，即 `代理`。

   - 寻到 Fiddler options 路径， Tools---> Options, 配置 `Options`,主要配置 `HTTPS`，`Connections` 信息. 第一次配置会出现`安装证书`的请求，一路点击 `是`就对了, 配置完毕一定要记得`重启`Fiddler,否则失效

     ![img](fiddler.assets/16f8e12c29f95725tplv-t2oaga2asx-watermark.awebp)

     

   - Connections 配置，主要是 让手机 或电脑 链接 Fiddler（媒人），默认端口号为：8888

     ![img](fiddler.assets/16f8e179c43e9f17tplv-t2oaga2asx-watermark.awebp)

     

2. Fiddler(媒人)配置完毕，接着配置 `客户端`, 不择手段让 客户端 链接媒人，和媒人产生联系。

   - 打开windows 代理设置，`代理配置路径`，亲们自个百度

   > 配置 windows 代理 ，这步很关键，其他资料没有，是我自己 琢磨的 。



![img](fiddler.assets/16f8e1f4c2610f14tplv-t2oaga2asx-watermark.awebp)



1. 客户端已经和 Fiddler（媒人）产生一定联系了，已经可以抓取 `windows软件` 和 `IE` 了, 不信 上图给您看。

   - IE 抓包。 直接访问IE，Fiddler自动运行且拦截数据

     ![img](fiddler.assets/16f8e280e0ac4370tplv-t2oaga2asx-watermark.awebp)

     

   - 在这解释 下 IE 代理 `自动变成` 配置完的代理 ，打开IE 代理看看

     ![img](fiddler.assets/16f8e2a99f3ec8fetplv-t2oaga2asx-watermark.awebp)

     

   - windows 软件抓包，即 windows微信中 的小程序当然也可以抓取！如果是抓取`小程序`包的，就不用`配置app`的了，直接在电脑抓取即可，`省事`

     ![img](fiddler.assets/16f8e2ff58bfe74btplv-t2oaga2asx-watermark.awebp)

     

2. 接着说 谷歌 和 火狐浏览器的，他们的代理不像IE自动，需要`手动配置`他们的代理，这里 我以 `谷歌`为例。

   - 第一种方式：寻到谷歌 代理配置路径（`路径自己百度`），配置：127.0.0.1:8888

   - 第二种方式：以上是简单做法，这种需要

      

     ```
     翻墙
     ```

      

     下载扩展程序（Proxy SwitchyOmega） ,进行配置

     ![img](fiddler.assets/16f8e34574b5e106tplv-t2oaga2asx-watermark.awebp)

     ![img](fiddler.assets/16f8e360355ec340tplv-t2oaga2asx-watermark.awebp)

     ![img](fiddler.assets/16f8e366b0478d8ctplv-t2oaga2asx-watermark.awebp)

3. 可以进行愉快的抓包了