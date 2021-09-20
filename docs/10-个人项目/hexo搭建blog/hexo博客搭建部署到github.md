





# 准备工具

## 1.node 安装

## 2.git hub 注册

## 3.Git工具

下载地址：

> Git官网下载：https://git-scm.com/
>
> 国内镜像下载：https://npm.taobao.org/mirrors/git-for-windows/v2.22.0.windows.1/Git-2.22.0-64-bit.exe
>
> 国内其他版本下载：https://npm.taobao.org/mirrors/git-for-windows/

建议使用国内镜像下载，速度最快！

下载后请自行安装

## 4.hexo-script安装脚本

1.git bash打开任意文件目录 输入命令

curl -O https://cdn.jsdelivr.net/gh/kjhuanhao/hexo-script@master/install.sh

2.或者对应网址下载

https://github.com/kjhuanhao/hexo-script/releases







## 5.一键安装hexo博客

自动完成全部安装过程并生成博客文件

### hexo_win的使用

您需要在存放install.sh脚本的目录中,右键打开git bash运行以下命令:

```
source install.sh hexo_win
```

安装完成,如图:

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LluplfJDETDQ1wIHNxR%2F-LlupnWqOZVWU6iL3uK9%2F5.png?alt=media&token=30690ad9-b4fb-4240-ad96-1ea7686d888c)

完成图

当您看到出现`Please run hexo s to check it out!`的提示,证明您已经安装成功,此时你可以运行hexo s 然后查看你的博客

```
cd hexobloghexo s
```

注意:要先cd到hexoblog目录哦!执行以上命令即可

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LluplfJDETDQ1wIHNxR%2F-LluqmWs7L0rHAJhJkR-%2F6.png?alt=media&token=88e71510-22da-4c59-bd41-1d7bb2909436)

本地预览

可以看到出现了一段地址:[http://localhost:4000](http://localhost:4000/)

> 在浏览器访问:[http://localhost:4000 ](http://localhost:4000/),你就可以在本地预览了,浏览情况如图:

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LluplfJDETDQ1wIHNxR%2F-LlurN1aku8F_ZGR35Av%2F7.png?alt=media&token=c9b96207-b162-43de-839b-1837d1241566)

## 6.一键生成SSH秘钥

部署hexo博客的必要之物

### git_ssh的使用

您需要在存放install.sh脚本的目录中,右键打开git bash运行以下命令:

```
./install.sh git_ssh
```

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LlyrhN541A0nwXokcle%2F-Llysn3EaGuJyGT8TerP%2F33.png?alt=media&token=444ef29f-36ca-44f6-b935-92d8f0883dfe)

可以看到会有四条可执行命令,输入对应数字可以执行对应的命令

> 1)Key
>
> 2)SSH
>
> 3)Verify-github
>
> 4)Verify-coding

> 1)Key 执行1后可以一键生成秘钥

如果你的电脑已经存在秘钥,程序将会自动退出

> 2)SSH 执行2后可以查看你电脑中已生成的秘钥]

> 3)Verify-github 执行3后可以检查秘钥是否配置github成功

> 4)Verify-coding 执行4后可以检查秘钥是否配置coding成功

> 生成秘钥后别忘记将秘钥添加到账号里,否则秘钥不会配置成功

------

## 7一键部署hexo博客

一键上传到你的github或者coding

## up.sh的使用

在这之前你需要确认你已经**配置了SSH秘钥,** 如果没有, 具体操作可以看一键生成SSH秘钥教程, 它在上一篇.

您需要在存放install.sh脚本的目录中,右键打开git bash运行以下命令:

```
source install.sh deploy
```

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LlurwQcZHGhMvMGz358%2F-LlutGTSONJsGgLT-HB3%2F8.png?alt=media&token=6b16f0f3-aaa4-4083-960c-e41031408d1a)

下载up.sh

你需要将up.sh复制到hexoblog文件,也就是复制到你的博客根目录下

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LluvTLNmEKB-I1ZDiSA%2F-LluzdSM_MrB7O9qCs1Z%2F9.png?alt=media&token=bce8b33c-c6ec-4242-80fb-a0ac97e99d1a)

然后在存放up.sh脚本的目录中,右键打开git bash运行以下命令:

```
source up.sh
```

之后即可自动部署到你的github或者coding上

如果上传失败你需要检查是否安装的是最新版本的[hexo-script] ,或者在根目录配置了deploy信息.

如果你不会配置,可以看下面的教程:

# [**部署博客必要的配置**](https://hexoscript.github.io/using/#/?id=部署博客必要的配置)

首先你需要打开根目录配置文件_config.yml

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LluvTLNmEKB-I1ZDiSA%2F-LluxHhrwiYvRhAnlHXs%2F11.png?alt=media&token=e5ccc9e5-a30f-4a56-86de-4bced0dae279)

> 找到deploy,它一般在最后一行,按照以下的格式修改即可

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LlpfTEtpw-XHjloYx-t%2F-LluvTLNmEKB-I1ZDiSA%2F-LluyCdpQ92nd8tuqn9Z%2F22.png?alt=media&token=05f14980-032b-4997-b2b2-9bb31c28332d)

你只需要修改repo后面的信息即可

```
deploy:  type: git  repo: 这里填你的仓库地址,建议使用SSH地址,它是以git开头的  branch: master
```

在1.3版本的[heox-script]后你无需自己安装上传插件,但如果报出了not found git的错误证明上传插件没有安装成功,你需要执行以下命令

```
cnpm install hexo-deployer-git --save或者是npm install hexo-deployer-git --
```