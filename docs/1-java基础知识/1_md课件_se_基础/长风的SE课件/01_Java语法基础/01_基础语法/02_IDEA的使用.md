# ②IDEA的使用

[TOC]

---



## 1. 基础使用

### 1.1 IDEA创建project

> IDEA创建project

- File--->New--->Project或者Create New Project
- 选择JDK版本（8）无需选择模板，直接下一步
- 给project起名
  - 工程名一般具有“见名知意”的作用
  - 全部英文小写，不要搞中文
  - 单词之间用下划线或者横杠连接
  - 直接修改location，不要对着name改
  - location里可以直接写目录，如果目录不存在，会自动创建
  - 创建project的同时默认创建一个module
  - 工程的命名并不强制格式，根据公司和leader的安排起名即可
- 其他设置，无需修改，默认即可
- 创建完成，可以选择在当前窗口打开project，还是在新窗口



> 注意事项

- IDEA中的工程不是一个独立的概念，新建一个project的实质是创建了一个独立的module
- 这个module的名字和project的名字相同



### 1.2 IDEA创建module

> IDEA创建module

- 在一个工程的基础上创建module
- File--->New--->Module
- 选择JDK版本（8）无需选择模板，直接下一步
- 给module起名
  - 模块名一般具有“见名知意”的作用
  - 全部英文小写，不要搞中文
  - 单词之间用下划线或者横杠连接
  - 直接修改root，其他部分会跟着改
- 这里的路径非常有讲究
  - 如果你希望第二个module和第一个module是同级关系
    - 目录路径上要同级
  - 如果你希望第二个module在第一个module下面
    - 目录路径上要体现上下级
  - 总之，目录路径要体现模块之间的关系
- 点击finish，完成创建



> 注意事项

- 在JavaSE阶段，没有必要创建多module的project，建议仅创建project
  - 到了项目阶段，再学习多module的创建不迟
- 每个project用独立的窗口打开，而不是堆在一个窗口中
  - 这样更简洁，每个project都不会互相影响





### 1.3 project和module的关系

> 总得来说，project是概念上的顶层结构，module是IDEA的基础结构

- 在IDEA中project是最顶级的结构单元，一个project可以有多个module
- 主流的大型项目结构基本都是多module的，这类项目一般是按功能划分模块，模块之间彼此可以相互依赖



> 实际会存在以下的关系

- 当为单**module**项目的时候，这个单独的**module**实际上就是一个**project**；
- 当为多**module**项目的时候，多个模块处于同一个**project**之中，此时彼此之间具有互相依赖的关联关系



> 可以把project视为一个工作空间（类似eclipse的workspace）
>
> project并不是一个真实存在的物理结构，只是逻辑上的最高层概念

- 比方说，对于一个学生管理系统的工程（student-manage）
- 创建一个工程（project）叫做student-manage
- 这个工程本身只是一个壳子，实际上创建一个module叫做student-manage
- 可以在这个壳子下面，继续创建新的module



### 1.4 IDEA的src目录

- 英文单词“source”的缩写，这个缩写以后经常看到，也要经常使用，需要记住
- 基础课程阶段，我们的所有的代码都是写在src目录下
- 也只有写在src目录下的代码，才可以执行



### 1.5 导入IDEA项目

> 对于已有的IDEA工程（例如老师每天传的代码）可以直接用IDEA打开，而不是逐个文件的看代码

- File--->Open--->然后选择目标工程
- 可打开的IDEA工程是有特殊图标的，如下

<img src="../../../课件附属图片/IDEA工程名.png" alt="image-20210506072047363" style="zoom:50%;" />



---



## 2. 必要设置

> IDEA是一个非常棒的集成开发环境，为了提高IDEA的使用效率，有必要对默认设置做出一些修改

- 可以积累自己的IDEA使用经验，积累自己的习惯，工具都是越使用越顺手
- 这里给出一些我的使用习惯，仅作为作为参考



### 2.2 去掉代码提示的大小写限制

> 默认情况下，IDEA的代码提示功能会严格区分大小写
>
> 例如：输入Sys，IDEA会联想出类System，相反输入sys则不行
>
> 这显然是不方便的，可以去掉这个区分大小写的联想

- 按照顺序操作：

**File**---->**Settings**----->**Editor** ----->**General**-----> **Code Completion**------>**Match Case**去掉勾





### 2.3 修改IDEA内存大小

> IDEA默认的内存配置是比较小的，如果电脑的性能不错，可以考虑多给IDEA一些配置
>
> 实测后可以提升一些流畅度，也不会影响操作系统整体性能，建议修改
>
> 当然，不改也没多大影响，软件运行是否流畅，最终还要看电脑自己的配置

**Help**----->**Edit Custom VM Options**

- 把下面代码框中的代码完全替换到文件中即可

- 16G内存建议的配置：

```
# custom IntelliJ IDEA VM options

-Xms1024m
-Xmx2048m
-XX:ReservedCodeCacheSize=500m
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-ea
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-Djdk.http.auth.tunneling.disabledSchemes=""
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
```



### 2.4 将IDEA所有编码改成UTF-8，避免出现中文乱码

> 乱码问题是一个很头疼的问题，建议将IDEA的编码格式都修改成UTF-8
>
> 尤其是很多同学之前使用过eclipse，默认编码都是GBK，转移代码的时候经常会中文乱码

- 百度IDEA编码改成UTF-8
- 建议都修改一下



### 2.5 其他

- 不要给IDEA装很多乱七八糟的插件，包括中文插件，阿里巴巴规范插件等等
- 装了过多的或者不适配的插件可能会导致变卡，软件崩溃等



---



## 3. 必要插件

> IDEA是可以装插件的，推荐一些特别好用的插件
>
> 在IDEA的设置（setting）里Plugins---->Marketplace下搜索

- Translation

搜索 “Translation” 下载安装重启IDEA，在IDEA代码文件中使用快捷键**CTRL+SHIFT+Y**可以选词翻译

- Maven Helper （开发必备）
  - 管理Maven依赖，排查依赖冲突的神器
  - 等学到maven使用后，再装不迟
- Jrebel
  - 热部署插件
  - 这个插件用来给EE项目部署很好用，等学到EE再装



---



## 4. 快捷键

> IDEA快捷键非常多，但是常用和实用的并不会特别多，下面是我常用的快捷键
>
> 大家也可以自己进行快捷键的积累

| 快捷键                | 效果介绍                                                     |
| --------------------- | ------------------------------------------------------------ |
| Alt + Enter           | 快速修复光标位置的错误，光标放在的位置不同提示的结果也不同 `（必备）` |
| Ctrl + Alt + L        | 格式化代码，强迫症必备，建议每写几行代码下意识的按一下该快捷键`（必备）` |
| Ctrl + Y              | 删除光标所在行 或 删除选中的行 `（必备）`                    |
| Ctrl + D              | 复制光标所在行 或 复制选择内容，并把复制内容插入光标位置下面`（必备）` |
| Ctrl + W              | 递进式选择代码块，会逐步选装某行代码、结构体，方法直至整个类 |
| Ctrl + O              | 选择可重写的方法                                             |
| Ctrl + /              | 注释光标所在行代码，会根据当前不同文件类型使用不同的注释符号 `（必备）` |
| Ctrl + Shift + /      | 多行注释`（必备）`                                           |
| Alt + Insert          | 代码自动生成，比如构造方法，get/set方法等等`（必备）`        |
| Ctrl + Alt + 左方向键 | 回到上一个光标所在位置 `（Debug模式必备）`                   |
| Ctrl + Alt + 右方向键 | 前进到上一个光标的位置 `（Debug模式必备）`                   |
| Ctrl + Shift + Z      | 取消撤销 `（必备）`                                          |
| Ctrl + Alt + V        | 快速补全变量                                                 |
| F2                    | 跳转到下一个高亮错误 或 警告位置 `（必备）`                  |
| F1                    | 快速执行main方法（**需要按照下述方法修改**）                 |
| ...                   | ...                                                          |

- 可以将run context configuration改成F1，快速执行main方法

<img src="../../../课件附属图片/IDEA快捷键设置.png" alt="image-20210124224417675" style="zoom:50%;" />



---



## 5. 好用的Windows软件推荐

> Windows作为世界上占有率最高的系统，涌现了一大批好用的软件，简单的推荐一些



### 5.1 Snipaste

>  Snipaste是一款优秀的截图、贴图功能的软件，无广告无弹窗
>
> 使用这个软件后建议屏蔽掉微信和QQ自带的截图功能
>
> 并将其快捷键清除掉，其自带的快捷键是F1，建议改为Alt+A

- 下载地址：https://www.snipaste.com/
- 贴图效果：

<img src="../../../课件附属图片/snipaste截图效果.png" alt="image-20210219092717833" style="zoom: 50%;" />



### 5.2 Wox+Everything

> 使用Wox+Everything可视化实现快速全局搜索功能
>
> 配合插件还可以实现翻译，win指令等功能
>
> 快捷键alt+空格

- 下载地址：
  - Everything：https://www.voidtools.com/zh-cn/
  - Wox:  [https://github.com/Woxlauncher/Wox/releases/tag/v1.3.524](https://github.com/Wox-launcher/Wox/releases/tag/v1.3.524) (GitHub开源)

- 使用效果：

<img src="../../../课件附属图片/wox+everything效果图.png" alt="img" style="zoom:67%;" />



### 5.3 有道云词典

> win端比较靠谱的翻译软件，也可以使用网页版百度翻译等

- 使用效果：

<img src="../../../课件附属图片/有道云词典.png" alt="image-20210219095615582" style="zoom: 50%;" />



> 注意事项

- 该软件偶现bug：占用系统的剪切板，导致无法进行复制粘贴操作
- 碰到上面情况，直接重启有道云词典软件即可解决





### 5.4 IDM下载器

> IDM是Win端最好用的下载器，没有之一
>
> 特别擅长下载那些资源网络较少的文件



- 下载方式

> 链接：https://pan.baidu.com/s/1eAxOxPDAZF6fryK9ALNxNA 
>提取码：ih2g 






### 5.5 Bandicam录屏软件

> 不必介绍，我用的就是这款

- 下载链接：https://pan.baidu.com/s/1Vq563s5FoSOsagfNcBpY-A 
  - 提取码：273o 



### 5.6 火绒安全软件

> 自带弹窗拦截一系列小工具

