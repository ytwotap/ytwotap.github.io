### api 文档工具选择

目前需求:

自动生成文档 且简单好用 .

能不能在线test并不重要.目前来说 .

使用哪个 ??

**smart doc 可以的** 



一、gitbook
github地址：[https://github.com/GitbookIO/...](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2FGitbookIO%2Fgitbook)

开源协议：Apache-2.0 License

Star: 22.9k

开发语言：javascript

用户：50万+

示例地址：[https://www.servicemesher.com...](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.servicemesher.com%2Fenvoy%2Fintro%2Farch_overview%2Fdynamic_configuration.html)

![file](api%20%E6%96%87%E6%A1%A3%E5%B7%A5%E5%85%B7%E9%80%89%E6%8B%A9.assets/bVbO6UJ.jpeg)

GitBook是一款文档编辑工具。它的功能类似金山WPS中的Word或者微软Office中的Word的文档编辑工具。它可以用来写文档、建表格、插图片、生成pdf。当然，以上的功能WPS、Office可能做得更好，但是，GitBook还有更最强大的功能：它可以用文档建立一个网站，让更多人了解你写的书，另外，最最核心的是，他支持Git，也就意味着，它是一个分布式的文档编辑工具。你可以随时随地来编写你的文档，也可以多人共同编写文档，哪怕多人编写同一页文档，它也能记录每个人的内容，然后告诉你他们之间的区别，也能记录你的每一次改动，你可以查看每一次的书写记录和变化，哪怕你将文档都删除了，它也能找回来！这就是它继承Git后的厉害之处！

优点：使用起来非常简单，支持全文搜索，可以跟git完美集成，对代码无任何嵌入性，支持markdown格式的文档编写。

缺点：需要单独维护一个文档项目，如果接口修改了，需要手动去修改这个文档项目，不然可能会出现接口和文档不一致的情况。并且，不支持在线调试功能。

个人建议：如果对外的接口比较少，或者编写之后不会经常变动可以用这个。

二、smartdoc
gitee地址：[https://gitee.com/smart-doc-t...](https://link.segmentfault.com/?url=https%3A%2F%2Fgitee.com%2Fsmart-doc-team%2Fsmart-doc)

开源协议：Apache-2.0 License

Star: 758

开发语言：html、javascript

用户：小米、科大讯飞、1加

示例地址：[https://gitee.com/smart-doc-t...](https://link.segmentfault.com/?url=https%3A%2F%2Fgitee.com%2Fsmart-doc-team%2Fsmart-doc%2Fwikis%2F%E6%96%87%E6%A1%A3%E6%95%88%E6%9E%9C%E5%9B%BE%3Fsort_id%3D1652819)

![file](api%20%E6%96%87%E6%A1%A3%E5%B7%A5%E5%85%B7%E9%80%89%E6%8B%A9.assets/bVbO6UK.jpeg)

smart-doc是一个java restful api文档生成工具，smart-doc颠覆了传统类似swagger这种大量采用注解侵入来生成文档的实现方法。smart-doc完全基于接口源码分析来生成接口文档，完全做到零注解侵入，只需要按照java标准注释的写就能得到一个标准的markdown接口文档。

优点：基于接口源码分析生成接口文档，零注解侵入，支持html、pdf、markdown格式的文件导出。

缺点：需要引入额外的jar包，不支持在线调试

个人建议：如果实时生成文档，但是又不想打一些额外的注解，比如：使用swagger时需要打上@Api、@ApiModel等注解，就可以使用这个。

三、redoc
github地址：[https://github.com/Redocly/redoc](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2FRedocly%2Fredoc)

开源协议：MIT License

Star: 10.7K

开发语言：typescript、javascript

用户：docker、redocly

示例地址：[https://docs.docker.com/engin...](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.docker.com%2Fengine%2Fapi%2Fv1.40%2F)

![file](api%20%E6%96%87%E6%A1%A3%E5%B7%A5%E5%85%B7%E9%80%89%E6%8B%A9.assets/bVbO6UL.jpeg)

redoc自己号称是一个最好的在线文档工具。它支持swagger接口数据，提供了多种生成文档的方式，非常容易部署。使用redoc-cli能够将您的文档捆绑到零依赖的 HTML文件中，响应式三面板设计，具有菜单/滚动同步。

优点：非常方便生成文档，三面板设计

缺点：不支持中文搜索，分为：普通版本 和 付费版本，普通版本不支持在线调试。另外UI交互个人感觉不适合国内大多数程序员的操作习惯。

个人建议：如果想快速搭建一个基于swagger的文档，并且不要求在线调试功能，可以使用这个。

四、knife4j
gitee地址：[https://gitee.com/xiaoym/knife4j](https://link.segmentfault.com/?url=https%3A%2F%2Fgitee.com%2Fxiaoym%2Fknife4j)

开源协议：Apache-2.0 License

Star: 3k

开发语言：java、javascript

用户：未知

示例地址：[http://swagger-bootstrap-ui.x...](https://link.segmentfault.com/?url=http%3A%2F%2Fswagger-bootstrap-ui.xiaominfo.com%2Fdoc.html)

![file](api%20%E6%96%87%E6%A1%A3%E5%B7%A5%E5%85%B7%E9%80%89%E6%8B%A9.assets/bVbO6UM.jpeg)

knife4j是为Java MVC框架集成Swagger生成Api文档的增强解决方案,前身是swagger-bootstrap-ui,取名kni4j是希望她能像一把匕首一样小巧,轻量,并且功能强悍。

优点：基于swagger生成实时在线文档，支持在线调试，全局参数、国际化、访问权限控制等，功能非常强大。

缺点：界面有一点点丑，需要依赖额外的jar包

个人建议：如果公司对ui要求不太高，可以使用这个文档生成工具，比较功能还是比较强大的。

五、yapi
github地址：[https://github.com/YMFE/yapi](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2FYMFE%2Fyapi)

开源协议：Apache-2.0 License

Star: 17.8k

开发语言：javascript

用户：腾讯、阿里、美团、百度、京东等大厂

示例地址：[http://swagger-bootstrap-ui.x...](https://link.segmentfault.com/?url=http%3A%2F%2Fswagger-bootstrap-ui.xiaominfo.com%2Fdoc.html)

![file](api%20%E6%96%87%E6%A1%A3%E5%B7%A5%E5%85%B7%E9%80%89%E6%8B%A9.assets/bVbO6UN.png)

yapi是去哪儿前端团队自主研发并开源的，主要支持以下功能：

可视化接口管理

数据mock

自动化接口测试

数据导入（各种，包括swagger、har、postman、json、命令行）

权限管理

支持本地化部署

支持插件

支持二次开发

优点：功能非常强大，支持权限管理、在线调试、接口自动化测试、插件开发等，BAT等大厂等在使用，说明功能很好。

缺点：在线调试功能需要安装插件，用户体检稍微有点不好，主要是为了解决跨域问题，可能有安全性问题。不过要解决这个问题，可以自己实现一个插件，应该不难。

个人建议：如果不考虑插件安全的安全性问题，这个在线文档工具还是非常好用的，可以说是一个神器，笔者在这里强烈推荐一下。







