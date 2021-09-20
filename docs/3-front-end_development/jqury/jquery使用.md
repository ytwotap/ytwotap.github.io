# jquery使用(一)

为啥要用这个

js框架减少操作；

迅速完成js；

# 安装

安装包：从 [jquery.com](http://jquery.com/download/) 下载 jQuery 库

cdn：Microsoft CDN:

```html
<head> <script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min.js"></script> </head>
```

# 基础写法

简洁写法（与以上写法效果相同）:

$(function(){    // 开始写 jQuery 代码...  });

## 文档就绪事件

您也许已经注意到在我们的实例中的所有 jQuery 函数位于一个 document ready 函数中：

$(document).ready(function(){    // 开始写 jQuery 代码...  });



## [**jQuery 选择器**](https://www.runoob.com/jquery/jquery-selectors.html)

jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。

jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素。 它基于已经存在的 [CSS 选择器](https://www.runoob.com/cssref/css-selectors.html)，除此之外，它还有一些自定义的选择器。

jQuery 中所有选择器都以美元符号开头：$()。

## 元素选择器

jQuery 元素选择器基于元素名选取元素。

在页面中选取所有 <p> 元素:

```js
$("p")
```

## #id 选择器

Query #id 选择器通过 HTML 元素的 id 属性选取指定的元素。

页面中元素的 id 应该是唯一的，所以您要在页面中选取唯一的元素需要通过 #id 选择器。

通过 id 选取元素语法如下：

```
$("#test")
```



## .class 选择器

jQuery 类选择器可以通过指定的 class 查找元素。

语法如下：

```
$(".test")
```

## 独立文件中使用 jQuery 函数

#### 实例

<head> <script src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js"> </script> <script src="my_jquery_functions.js"></script> </head>

## jQuery 事件

jQuery 是为事件处理特别设计的。

## 什么是事件？

页面对不同访问者的响应叫做事件。

事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。

实例：

- 在元素上移动鼠标。
- 选取单选按钮
- 点击元素

在事件中经常使用术语"触发"（或"激发"）例如： "当您按下按键时触发 keypress 事件"。



常见 DOM 事件：

| 鼠标事件                                                     | 键盘事件                                                     | 表单事件                                                  | 文档/窗口事件                                             |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- |
| [click](https://www.runoob.com/jquery/event-click.html)      | [keypress](https://www.runoob.com/jquery/event-keypress.html) | [submit](https://www.runoob.com/jquery/event-submit.html) | [load](https://www.runoob.com/jquery/event-load.html)     |
| [dblclick](https://www.runoob.com/jquery/event-dblclick.html) | [keydown](https://www.runoob.com/jquery/event-keydown.html)  | [change](https://www.runoob.com/jquery/event-change.html) | [resize](https://www.runoob.com/jquery/event-resize.html) |
| [mouseenter](https://www.runoob.com/jquery/event-mouseenter.html) | [keyup](https://www.runoob.com/jquery/event-keyup.html)      | [focus](https://www.runoob.com/jquery/event-focus.html)   | [scroll](https://www.runoob.com/jquery/event-scroll.html) |
| [mouseleave](https://www.runoob.com/jquery/event-mouseleave.html) |                                                              | [blur](https://www.runoob.com/jquery/event-blur.html)     | [unload](https://www.runoob.com/jquery/event-unload.html) |
| [hover](https://www.runoob.com/jquery/event-hover.html)      |                                                              |                                                           |                                                           |