(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02f65842"],{"0fac":function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"b",(function(){return r})),n.d(e,"e",(function(){return a})),n.d(e,"f",(function(){return s})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return c}));var o=n("b775");function i(t){return Object(o["a"])({url:"/topic/list",method:"get",params:t})}function r(t){return Object(o["a"])({url:"/topic/create",method:"post",data:t})}function a(t){return Object(o["a"])({url:"/topic/read",method:"get",params:t})}function s(t){return Object(o["a"])({url:"/topic/update",method:"post",data:t})}function l(t){return Object(o["a"])({url:"/topic/delete",method:"post",data:t})}function c(t){return Object(o["a"])({url:"/topic/batch-delete",method:"post",data:t})}},"386c":function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return i}));var o=function(){return"undefined"!==typeof window?window:t},i=function(){var t=o();return t&&t.tinymce?t.tinymce:null}}).call(this,n("66fa"))},"4ef0":function(t,e,n){},6396:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),Math.easeInOutQuad=function(t,e,n,o){return t/=o/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function i(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function a(t,e,n){var a=r(),s=t-a,l=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=l;var r=Math.easeInOutQuad(c,a,s,e);i(r),c<e?o(t):n&&"function"===typeof n&&n()};u()}},aecd:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return a})),n.d(e,"b",(function(){return s})),n.d(e,"e",(function(){return l}));var o=n("b775");function i(t){return Object(o["a"])({url:"/storage/list",method:"get",params:t})}function r(t){return Object(o["a"])({url:"/storage/create",method:"post",data:t})}function a(t){return Object(o["a"])({url:"/storage/update",method:"post",data:t})}function s(t){return Object(o["a"])({url:"/storage/delete",method:"post",data:t})}var l="http://localhost:8083/admin/storage/create"},c40e:function(t,e,n){"use strict";n.d(e,"e",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"f",(function(){return a})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return l})),n.d(e,"d",(function(){return c}));var o=n("b775");function i(t){return Object(o["a"])({url:"/goods/list",method:"get",params:t})}function r(t){return Object(o["a"])({url:"/goods/delete",method:"post",data:t})}function a(t){return Object(o["a"])({url:"/goods/create",method:"post",data:t})}function s(t){return Object(o["a"])({url:"/goods/detail",method:"get",params:{id:t}})}function l(t){return Object(o["a"])({url:"/goods/update",method:"post",data:t})}function c(){return Object(o["a"])({url:"/goods/catAndBrand",method:"get"})}},d31a:function(t,e,n){"use strict";n("4ef0")},fba3:function(t,e,n){"use strict";var o=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],i=function(t){return-1!==o.indexOf(t)},r=function(t,e,n){Object.keys(e).filter(i).forEach((function(o){var i=e[o];"function"===typeof i&&("onInit"===o?i(t,n):n.on(o.substring(2),(function(t){return i(t,n)})))}))},a=function(t,e){var n,o=t.$props.modelEvents?t.$props.modelEvents:null,i=Array.isArray(o)?o.join(" "):o;t.$watch("value",(function(t,o){e&&"string"===typeof t&&t!==n&&t!==o&&(e.setContent(t),n=t)})),e.on(i||"change keyup undo redo",(function(){n=e.getContent(),t.$emit("input",n)}))},s=function(t,e,n){var o=e.$props.value?e.$props.value:"",i=e.$props.initialValue?e.$props.initialValue:"";n.setContent(o||i),e.$listeners.input&&a(e,n),r(t,e.$listeners,n)},l=0,c=function(t){var e=Date.now(),n=Math.floor(1e9*Math.random());return l++,t+"_"+n+l+String(e)},u=function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()},d=function(t){return"undefined"===typeof t||""===t?[]:Array.isArray(t)?t:t.split(" ")},p=function(t,e){return d(t).concat(d(e))},f=function(t,e,n,o){var i=e.createElement("script");i.referrerPolicy="origin",i.type="application/javascript",i.id=t,i.addEventListener("load",o),i.src=n,e.head&&e.head.appendChild(i)},h=function(){return{listeners:[],scriptId:c("tiny-script"),scriptLoaded:!1}},m=function(t,e,n,o){t.scriptLoaded?o():(t.listeners.push(o),e.getElementById(t.scriptId)||f(t.scriptId,e,n,(function(){t.listeners.forEach((function(t){return t()})),t.scriptLoaded=!0})))},g=n("386c"),b={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean},v=function(){return v=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},v.apply(this,arguments)},y=h(),w=function(t,e,n){return t(n||"div",{attrs:{id:e}})},C=function(t,e){return t("textarea",{attrs:{id:e},style:{visibility:"hidden"}})},$=function(t){return function(){var e=v({},t.$props.init,{readonly:t.$props.disabled,selector:"#"+t.elementId,plugins:p(t.$props.init&&t.$props.init.plugins,t.$props.plugins),toolbar:t.$props.toolbar||t.$props.init&&t.$props.init.toolbar,inline:t.inlineEditor,setup:function(e){t.editor=e,e.on("init",(function(n){return s(n,t,e)})),t.$props.init&&"function"===typeof t.$props.init.setup&&t.$props.init.setup(e)}});u(t.element)&&(t.element.style.visibility=""),Object(g["a"])().init(e)}},k={props:b,created:function(){this.elementId=this.$props.id||c("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(g["a"])())$(this)();else if(this.element&&this.element.ownerDocument){var t=this.element.ownerDocument,e=this.$props.cloudChannel?this.$props.cloudChannel:"5",n=this.$props.apiKey?this.$props.apiKey:"no-api-key";m(y,t,"https://cdn.tiny.cloud/1/"+n+"/tinymce/"+e+"/tinymce.min.js",$(this))}},beforeDestroy:function(){null!==Object(g["a"])()&&Object(g["a"])().remove(this.editor)},render:function(t){return this.inlineEditor?w(t,this.elementId,this.$props.tagName):C(t,this.elementId)}};e["a"]=k},fe46:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"topic",staticStyle:{width:"800px","margin-left":"50px"},attrs:{rules:t.rules,model:t.topic,"status-icon":"","label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"专题标题",prop:"title"}},[n("el-input",{model:{value:t.topic.title,callback:function(e){t.$set(t.topic,"title",e)},expression:"topic.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"专题子标题",prop:"subtitle"}},[n("el-input",{model:{value:t.topic.subtitle,callback:function(e){t.$set(t.topic,"subtitle",e)},expression:"topic.subtitle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"专题图片",prop:"picUrl"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.headers,action:t.uploadPath,"show-file-list":!1,"on-success":t.uploadPicUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.topic.picUrl?n("img",{staticClass:"avatar",attrs:{src:t.topic.picUrl}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),n("el-form-item",{attrs:{label:"专题内容",prop:"content"}},[n("editor",{attrs:{init:t.editorInit},model:{value:t.topic.content,callback:function(e){t.$set(t.topic,"content",e)},expression:"topic.content"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"商品低价",prop:"price"}},[n("el-input",{model:{value:t.topic.price,callback:function(e){t.$set(t.topic,"price",e)},expression:"topic.price"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"阅读量",prop:"readCount"}},[n("el-input",{model:{value:t.topic.readCount,callback:function(e){t.$set(t.topic,"readCount",e)},expression:"topic.readCount"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"专题商品",prop:"goods"}},[n("el-button",{staticStyle:{float:"right"},attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.handleCreate()}}},[t._v("创建商品")]),t._v(" "),n("el-table",{attrs:{data:t.goodsList,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"商品ID",prop:"id"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",property:"picUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{attrs:{src:t.row.picUrl,width:"60"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品介绍",prop:"brief"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.handleCancel}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleConfirm}},[t._v("确定")])],1),t._v(" "),n("el-dialog",{attrs:{visible:t.addVisiable,title:"添加商品"},on:{"update:visible":function(e){t.addVisiable=e}}},[n("div",{staticClass:"search"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品编号"},model:{value:t.listQuery.goodsSn,callback:function(e){t.$set(t.listQuery,"goodsSn",e)},expression:"listQuery.goodsSn"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品名称"},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")]),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品ID",prop:"id"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",property:"picUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{attrs:{src:t.row.picUrl,width:"40"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"name"}})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.addVisiable=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.confirmAdd}},[t._v("确定")])],1)])],1)},i=[],r=(n("1bc7"),n("0fac")),a=n("c40e"),s=n("aecd"),l=n("0625"),c=n("fba3"),u=n("333d"),d=n("5f87"),p={name:"TopicEdit",components:{BackToTop:l["a"],Editor:c["a"],Pagination:u["a"]},data:function(){return{uploadPath:s["e"],id:0,topic:{},goodsList:[],addVisiable:!1,list:[],total:0,listLoading:!1,listQuery:{page:1,limit:5,id:void 0,name:void 0,sort:"add_time",order:"desc"},selectedlist:[],rules:{title:[{required:!0,message:"专题标题不能为空",trigger:"blur"}],subtitle:[{required:!0,message:"专题子标题不能为空",trigger:"blur"}],content:[{required:!0,message:"专题内容不能为空",trigger:"blur"}],price:[{required:!0,message:"专题低价不能为空",trigger:"blur"}]},editorInit:{language:"zh_CN",convert_urls:!1,height:500,plugins:["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],toolbar:["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],images_upload_handler:function(t,e,n){var o=new FormData;o.append("file",t.blob()),Object(s["a"])(o).then((function(t){e(t.data.data.url)})).catch((function(){n("上传失败，请重新上传")}))}}}},computed:{headers:function(){return{"X-CskaoyanMarket-Admin-Token":Object(d["a"])()}}},created:function(){null!=this.$route.query.id&&(this.id=this.$route.query.id,this.getTopic())},methods:{getTopic:function(){var t=this;this.listLoading=!0,Object(r["e"])({id:this.id}).then((function(e){t.topic=e.data.data.topic,t.goodsList=e.data.data.goodsList,t.listLoading=!1})).catch((function(){t.topic={},t.goodsList=[],t.listLoading=!1}))},getList:function(){var t=this;this.listLoading=!0,Object(a["e"])(this.listQuery).then((function(e){t.list=e.data.data.list,t.total=e.data.data.total,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSelectionChange:function(t){this.selectedlist=t},uploadPicUrl:function(t){this.topic.picUrl=t.data.url},handleCreate:function(){this.listQuery={page:1,limit:5,id:void 0,name:void 0,sort:"add_time",order:"desc"},this.list=[],this.total=0,this.selectedlist=[],this.addVisiable=!0},confirmAdd:function(){var t=this,e=[],n=[];this.selectedlist.forEach((function(o){var i=o.id,r=!1;t.topic.goods.forEach((function(t){i===t&&(r=!0)})),r||(e.push(i),n.push(o))})),e.length>0&&(this.topic.goods=this.topic.goods.concat(e),this.goodsList=this.goodsList.concat(n)),this.addVisiable=!1},handleDelete:function(t){for(var e=0;e<this.topic.goods.length;e++)t.id===this.topic.goods[e]&&this.topic.goods.splice(e,1);for(var n=0;n<this.goodsList.length;n++)t.id===this.goodsList[n].id&&this.goodsList.splice(n,1)},handleCancel:function(){this.$router.push({path:"/promotion/topic"})},handleConfirm:function(){var t=this;this.$refs["topic"].validate((function(e){e&&Object(r["f"])(t.topic).then((function(e){t.$router.push({path:"/promotion/topic"})})).catch((function(e){t.$notify.error({title:"失败",message:e.data.errmsg})}))}))}}},f=p,h=(n("d31a"),n("cba8")),m=Object(h["a"])(f,o,i,!1,null,null,null);e["default"]=m.exports}}]);