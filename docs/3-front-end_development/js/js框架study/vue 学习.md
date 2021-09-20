# vue 学习

**官方文档**：https://cn.vuejs.org/

## 学习目标 

知道是啥 如何用就行 。

## 学习方法

看官方文档 最简单 

笔记只是 做 一些 重要的 操作 和索引。



## vue 是啥

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。



如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看[对比其它框架](https://cn.vuejs.org/v2/guide/comparison.html)。

> 注意：semantic ui是 css框架 
>
> vue 对应jqury

### [React](https://cn.vuejs.org/v2/guide/comparison.html#React)

React 和 Vue 有许多相似之处，它们都有：

- 使用 Virtual DOM
- 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

由于有着众多的相似处，我们会用更多的时间在这一块进行比较。这里我们不只保证技术内容的准确性，同时也兼顾了平衡的考量。我们需要承认 React 比 Vue 更好的地方，比如更丰富的生态系统。

下列部分章节会略微有些过时，因为最近 React 16+ 的发布，我们计划在不久的将来和 React 社区一起重写这部分内容



## 特点 

1. reactive
2. composable
3. have a console

## vue or node js



link：https://www.geeksforgeeks.org/node-js-vs-vue-js/

| Node.js                                                      | Vue.js                                                       |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Node.js is a cross-platform and open-source back-end framework that executes JavaScript code on the server-side. | Vue.js is a structural, open-source JavaScript framework that is used for building UIs and single-page applications. |
| The learning curve of Node.js is High [71500 stars on GitHub (as of July 2020)]. | The learning curve of Vue.js is comparatively Low.           |
| Support Model–view–controller (MVC) framework.               | Support Model-View-ViewModel(MVVM) pattern.                  |
| Written in C/C++.                                            | Written in Javascript and Typescript..                       |
| It allows you to run JavaScript code on the server-side and Handles requests from the browser. | It is used to build single-page, client-side applications.   |
| Real-time data streaming is handled easily.                  | Real-time data streaming is not handled by VueJS.            |
| It is fast and lightweight which makes it usable for writing micro-services. | It is faster than any other UI framework and setting-up to an existing project is easy. |
| It runs on chromes v8 engine and uses an event-driven, non-blocking I/O model. | It uses JavaScript run-time ‘Node.js’ to compile and run.    |
| No DOM (Document Object Model) is Used.                      | Virtual DOM (Document Object Model) is Used.                 |
| Being single-threaded handles requests easy and fast.        | Axios library is used to handle AJAX requests.               |
| Apps using Node.js: LinkedIn, Uber, Netflix, PayPal, Trello, Capital One, Yahoo, Mozilla, etc | Apps using Vue.js: Google, Apple, Nintendo, Behance, Oval Money, Trivago, Font Awesome, Gitlab, etc. |
| `if(gfg) { console.log("Geeks for Geeks"); } `               | `<h1 v-if="gfg">Geeks for Geeks</h1>`                        |





# Hello world in webstorm

use webstorm create vue doc:https://www.jetbrains.com/help/webstorm/vue-js.html#ws_vue_create_new_app

### Before you start﻿

1. Make sure you have [Node.js](http://nodejs.org/) on your computer.
2. Make sure the *Vue.js* bundled plugin is enabled on the **Settings/Preferences | Plugins** page, see [Managing plugins](https://www.jetbrains.com/help/webstorm/managing-plugins.html) for details.

### Create an application﻿

1. Click **Create New Project** on the **Welcome** screen or select **File | New | Project** from the main menu. The [Create New Project Dialog](https://www.jetbrains.com/help/webstorm/create-new-project-dialog.html) opens.

2. In the left-hand pane, choose **Vue.js**.

3. In the right-hand pane:

   1. Specify the path to the folder where the project-related files will be stored.

   2. In the **Node Interpreter** field, specify the Node.js interpreter to use. Select a configured interpreter from the list or choose **Add** to configure a new one.

   3. From the **Vue CLI** list, select **npx --package @vue/cli vue**.

      Alternatively, for npm version 5.1 and earlier, install the `@vue/cli` package yourself by running `npm install --g @vue/cli` in the **Terminal** Alt+F12. When creating an application, select the folder where the `@vue/cli` package is stored.

   4. To bootstrap your application with [babel](https://babeljs.io/docs/en/) and [ESLint](https://eslint.org/), select the **Use the default project setup** checkbox.

4. When you click **Create**, WebStorm generates a Vue.js-specific project with all the required configuration files and downloads the necessary dependencies. You can view the progress in the **Run** tool window.



**or**

> Install Vue.js in an empty project﻿
>
> 1. Open the empty project where you will use *Vue.js*.
>
> 2. In the embedded **Terminal** (Alt+F12), type:
>
>    `npm install vue`
>
> > ### 
> >
> > 
> >
> > Alternatively, follow the [Vue.js installation instructions](https://vuejs.org/v2/guide/installation.html#NPM).

### message and get id

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

</head>
<body>

<div id="app">
    {{ message }}
</div>
<!--
注意 id ="app-2 “ 与 id ="app-2"不同 区分空格
且 带空格vue 获取不到 id值
-->

<div id="app-2 ">
<span v-bind:title="message">
    鼠标悬停 查看值
</span>
</div>
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>




<script type="text/javascript">

var app= new Vue({
    el: '#app',/*获取 id 通过 #  ,插入 文本值 */
    data: {   /*获取 message*/
        message: 'Hello World!  '
    }
})

var app2=new Vue({
    el:'#app-2',
    data:{
        message: '加载时间'+new Date().toLocaleDateString()
    }
})
</script>
</body>

</html>
```



### 循环：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

</head>
<body>
<div id="app3">
<!-- test if 语句     -->
    <p v-if="seen"> new , you can see me.</p>
</div>

<!--
v-for 注意命名规则
-->

<div id="app-4">
    <ol>
        <li v-for="moha in mohas">
            {{
                moha.text
            }}

        </li>
    </ol>
</div>
<script type="text/javascript">
    var app3=new Vue({
        el: '#app3',  //获取id 不要忘记#
        data:{
            seen:false  //true 将 显示文本
        }
    })


    var app4=new Vue({
        el: '#app-4',  //获取id 不要忘记#
        data:{
            mohas:[
                {text: '"+1s"'},
                {text: "苟利国家生死 "},
                {text: "搞个大新闻"},
                {text: '香港记者跑得快'}
            ]  //true 将 显示文本
        }
    })
</script>
</body>
</html>
```

### v-on:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

</head>
<!--
实现 处理 用户输入

-->

<body>
<div id="app-5">
    <h1>
        {{message}}
    </h1>
    <button v-on:click="reverseMessage">反转消息</button>
</div>

<!--
我们可以用 v-on 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法
-->

<script type="text/javascript">
    var app5=new Vue({
      el:'#app-5',
      data:{
          message: '莫哈'
      }  ,
        methods:{
          reverseMessage:function () {
              this.message=this.message.split('').reverse().join('')
          }
        }
    })
</script>
</body>
</html>
```

> 为了让用户和你的应用进行交互，我们可以用 `v-on` 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法：





### [组件化应用构建](https://cn.vuejs.org/v2/guide/#组件化应用构建)

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![Component Tree](https://cn.vuejs.org/images/components.png)

一个组件本质上是一个拥有预定义选项的一个 Vue 实例。在 Vue 中注册组件很简单：

```
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})

var app = new Vue(...)
```

现在你可以用它构建另一个组件模板：

```
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```

但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷。我们应该能从父作用域将数据传到子组件才对。让我们来修改一下组件的定义，使之能够接受一个 [prop](https://cn.vuejs.org/v2/guide/components.html#通过-Prop-向子组件传递数据)：

```
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义 attribute。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

现在，我们可以使用 `v-bind` 指令将待办项传到循环输出的每个组件中：

```
<div id="app-7">
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```

1. 蔬菜
2. 奶酪
3. 随便其它什么人吃的东西

# wait

... 后面用到在说