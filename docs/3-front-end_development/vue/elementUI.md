# **elementUIuse**

相关代码:https://github.com/ytwotap/vue/tree/main/element-starter-master

# 1.搭建环境

## 1.install:

```
npm i element-ui -S
```



## 2.使用 vue-cli@3

我们为新版的 vue-cli 准备了相应的 [Element 插件](https://github.com/ElementUI/vue-cli-plugin-element)，你可以用它们快速地搭建一个基于 Element 的项目。

## 3.使用 Starter Kit

我们提供了通用的[项目模板](https://github.com/ElementUI/element-starter)，你可以直接使用。

### yarn安装

Yarn是Facebook最近发布的一款依赖包安装工具。Yarn是一个新的快速安全可信赖的可以替代NPM的依赖管理工具

 

**快速安装**

```
//在NPM 中安装
npm install -g yarn
```

## 

### Start

- Clone or download this repository
- Enter your local directory, and install dependencies:

```bash
yarn
```

### Develop

```bash
# serve with hot reload at localhost:8010
npm run dev
```

### Build

```bash
# build for production with minification
npm run build
```

## 4.引入组件

### 1.完整引入(模板文件已经完整引入了)

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。

### 2.按需引入(参考文档)



## 5.全局配置

在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 `size` 与 `zIndex` 字段。`size` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下：

完整引入 Element：

```js
import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
```

按需引入 Element：

```js
import Vue from 'vue';
import { Button } from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
```

按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000。

## 6.开始使用

至此，一个基于 Vue 和 Element 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。

# 2.组件

布局

导航

小组件

其他:走马灯 分割线等

# 3.[vue cli4 多页面应用](https://www.jianshu.com/p/010ff118743a)



![img](https://upload-images.jianshu.io/upload_images/3136636-63c2c439c8f7b4c2.png?imageMogr2/auto-orient/strip|imageView2/2/w/301/format/webp)





**未完成**

