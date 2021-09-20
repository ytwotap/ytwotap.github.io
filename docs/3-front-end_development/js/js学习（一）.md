# js学习（1）

目的：为了 实现单词记录插件

参考：https://yanyd.tk/chrome-extension/#outline_1

webstorm 格式化

ctrl + alt + l



```js
<script>
function myFunction() {
   document.getElementById("demo").innerHTML = "段落被更改。";
}
</script>
```

中间的是在浏览器运行时自动触发。

### 1.实现选择鼠标选择文字识别

```js
//实现选择鼠标选择文字识别
window.getSelection().toString();
```

2.

```json
{
  "name": "分享文字", //插件名字 *
  "version": "1.0",  //插件版本 *
  "manifest_version":2, //清单文件格式的版本,在Chrome18之后,应该都是2 *
  "description": "将选中文字分享到微博", //插件功能描述
  "browser_action": { //插件标识
    "default_icon": "favicon.ico" //显示的插件图标 *
  },
  "content_scripts": [ //在浏览器运行时，需要加入的js或css
    {
      "matches": ["http://*/*"], //哪些http协议支持该插件
      "js": ["select.js"]        //运行插件需要哪些js文件 *
    }
  ]
}
```

### JS函数前面加!、+、-、~符号以及;是什么意思、按位取反

https://blog.csdn.net/hot_cool/article/details/77567166

# JavaScript匿名函数的理解

**js中匿名函数的N种写法**

匿名函数没有实际名字，也没有指针，怎么执行滴？ 
其实大家可以看看小括号的意义就应该可以理解。小括号有返回值，也就是小括号内的函数或者表达式的返回值，所以说小括号内的function返回值等于小括号的返回值，不难理解 (function(){})()可以将没有名字的函数执行了把… 
关于匿名函数写法，很发散~ 
最常见的用法： 

代码如下:


(function() { 
alert('water'); 
})(); 


当然也可以带参数： 

代码如下:

(function(o) { 
alert(o); 
})('water'); 



# in

如果指定的属性在指定的对象或其原型链中，则**`in` 运算符**返回`true`。

## 语法

```
prop in object
```

### 参数



- `prop`

  一个字符串类型或者 symbol 类型的属性名或者数组索引（非symbol类型将会强制转为字符串）。

- `objectName`

  检查它（或其原型链）是否包含具有指定名称的属性的对象。

  # `Selection` 

`Selection` 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的 Selection 对象，请调用 [`window.getSelection()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)。





### *===  值相等并且类型相等*

### querySelectorAll() 

querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 [NodeList](https://www.runoob.com/js/js-htmldom-nodelist.html) 对象。