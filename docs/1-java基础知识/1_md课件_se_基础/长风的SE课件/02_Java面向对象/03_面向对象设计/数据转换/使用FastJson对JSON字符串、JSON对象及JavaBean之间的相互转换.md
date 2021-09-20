# 使用FastJson对JSON字符串、JSON对象及JavaBean之间的相互转换

link:https://blog.csdn.net/xuforeverlove/article/details/80842148



成果：

```java
   @Test
    public  TransResult jsonToJsonBean(String s) {
//       String s="{\"from\":\"en\",\"to\":\"zh\",\"trans_result\":[{\"src\":\"groupId\",\"dst\":\"\\u7ec4ID\"}]}";

       JSONObject jsonObject = JSON.parseObject(s);
        String from= jsonObject.getString("from");

        transResult.setFrom(from);
        String to=jsonObject.getString("to");
        transResult.setTo(to);
       String trans_result=jsonObject.getString("trans_result");
//        System.out.println(trans_result);
        JSONArray jsonArray = JSON.parseArray(trans_result);
        String res= jsonArray.getString(0);
        jsonObject=JSON.parseObject(res);
        String dst=jsonObject.getString("dst");
        transResult.setDst(dst);
        String src=jsonObject.getString("src");
        transResult.setSrc(src);
        return transResult;
//        System.out.println(dst);
//        return transResult.toString();
          }
```

api：[JsonArray](https://docs.oracle.com/javaee/7/api/javax/json/JsonArray.html)

[JsonObject](https://docs.oracle.com/javaee/7/api/javax/json/JsonObject.html)

maven依赖包：

<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>

一、FastJson是用于java后台处理json格式数据的一个工具包，包括“序列化”和“反序列化”两部分，它具备如下特征：

    （1）速度最快，测试表明，fastjson具有极快的性能，超越任其他的java json parser。
    （2）功能强大，完全支持java bean、集合、Map、日期、Enum，支持范型，支持自省。
    （3）无依赖，能够直接运行在Java SE 5.0以上版本

二、FastJson对于json格式字符串的解析主要用到了一下三个类：

    （1）JSON：fastJson的解析器，用于JSON格式字符串与JSON对象及javaBean之间的转换。
    （2）JSONObject：fastJson提供的json对象。
    （3）JSONArray：fastJson提供json数组对象。

 


三、测试所需的实体类

package com.xxx.controller;

import java.io.Serializable;
public class Data implements Serializable {
    private static final long serialVersionUID = -6957361951748382519L;
    private String id;
    private String suborderNo;
    private String organUnitType;
    private String action;
    private String parent;
    private String organUnitFullName;
    private Long ordinal;
    get、set方法省略。。。
}
package com.xxx.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Error implements Serializable {

    private static final long serialVersionUID = -432908543160176349L;
     
    private String code;
    private String message;
    private String success;
    private List<Data> data = new ArrayList<>();
  get、set方法省略。。。
}


四、JSON格式字符串、JSON对象及JavaBean之间的相互转换

    4.1) JAVA对象转JSON字符串
    
    //java对象转json字符串
    public static void beanTojson() {
        Data data = new Data();
        data.setAction("add");
        data.setId("1");
        data.setOrdinal(8L);
        data.setOrganUnitFullName("testJSON");
        data.setParent("0");
        data.setSuborderNo("58961");
     
        String s = JSON.toJSONString(data);
        System.out.println("toJsonString()方法：s=" + s);
        //输出结果{"action":"add","id":"1","ordinal":8,"organUnitFullName":"testJSON","parent":"0","suborderNo":"58961"}
    }
    4.2)  A. JSON字符串转JSON对象
    
    //json字符串转json对象
    public static void jsonToJsonBean() {
        String s ="{\"action\":\"add\",\"id\":\"1\",\"ordinal\":8,\"organUnitFullName\":\"testJSON\",\"parent\":\"0\",\"suborderNo\":\"58961\"}";
     
        JSONObject jsonObject = JSON.parseObject(s);
        String action = jsonObject.getString("action");
        String id = jsonObject.getString("id");
        System.out.println("action ="+action);//add
        System.out.println("id ="+id);//1
        System.out.println("jsonObject ="+jsonObject);
        //action =add
        //id =1
        //jsonObject ={"parent":"0","organUnitFullName":"testJSON","action":"add","id":"1","suborderNo":"58961","ordinal":8}
    }
        B. 复杂JSON格式字符串与JSONObject之间的转换

 public static void jsonToBean() {
        String str ="{\"meta\":{\"code\":\"0\",\"message\":\"同步成功!\"},\"data\":{\"orderno\":\"U_2018062790915774\",\"suborderno\":\"SUB_2018062797348039\",\"type\":\"organunit\",\"result\":{\"organunit\":{\"totalCount\":2,\"successCount\":0,\"failCount\":2,\"errors\":[{\"code\":\"UUM70004\",\"message\":\"组织单元名称不能为空\",\"data\":{\"id\":\"254\",\"suborderNo\":\"SUB_2018062797348039\",\"organUnitType\":\"部门\",\"action\":\"add\",\"parent\":\"10000\",\"ordinal\":0,\"organUnitFullName\":\"组织单元全称\"},\"success\":false},{\"code\":\"UUM70004\",\"message\":\"组织单元名称不能为空\",\"data\":{\"id\":\"255\",\"suborderNo\":\"SUB_2018062797348039\",\"organUnitType\":\"部门\",\"action\":\"add\",\"parent\":\"10000\",\"ordinal\":0,\"organUnitFullName\":\"组织单元全称\"},\"success\":false}]},\"role\":{\"totalCount\":0,\"successCount\":0,\"failCount\":0,\"errors\":[]},\"user\":{\"totalCount\":0,\"successCount\":0,\"failCount\":0,\"errors\":[]}}}}";
        JSONObject jsonObject = JSON.parseObject(str);
        JSONObject data = jsonObject.getJSONObject("data");
        JSONObject result = data.getJSONObject("result");

        String organunit1 = result.getString("organunit");
        System.out.println(organunit1);
        JSONObject organunit = result.getJSONObject("organunit");
     
        JSONArray errors2 = organunit.getJSONArray("errors");
     
        List<Error> error = JSON.parseObject(errors2.toJSONString(), new TypeReference<List<Error>>() {
        });
    }
   4.3) A. JSON字符串转JAVA简单对象

    //json字符串转java简单对象
    public static void jsonStrToJavaBean() {
        String s ="{\"action\":\"add\",\"id\":\"1\",\"ordinal\":8,\"organUnitFullName\":\"testJSON\",\"parent\":\"0\",\"suborderNo\":\"58961\"}";
        Data data = JSON.parseObject(s, Data.class);
        System.out.println("data对象"+data.toString());
        System.out.println("action="+data.getAction()+"---id="+data.getId());
        //data对象Data{id='1', suborderNo='58961', organUnitType='null', action='add', parent='0', organUnitFullName='testJSON', ordinal=8}
        //action=add---id=1
        /**
         * 另一种方式转对象
         */
        Data dd = JSON.parseObject(s, new TypeReference<Data>() {});
        System.out.println("另一种方式获取data对象"+dd.toString());
        System.out.println("另一种方式获取="+dd.getAction()+"---id="+dd.getId());
        //另一种方式获取data对象Data{id='1', suborderNo='58961', organUnitType='null', action='add', parent='0', organUnitFullName='testJSON', ordinal=8}
        //另一种方式获取=add---id=1
    }
       B. JSON字符串  数组类型与JAVA对象的转换

测试json字符串

{"errors":[{"code":"UUM70004","message":"组织单元名称不能为空","data":{"id":"254","suborderNo":"SUB_2018062797348039","organUnitType":"部门","action":"add","parent":"10000","ordinal":0,"organUnitFullName":"组织单元全称"},"success":false},{"code":"UUM70004","message":"组织单元名称不能为空","data":{"id":"255","suborderNo":"SUB_2018062797348039","organUnitType":"部门","action":"add","parent":"10000","ordinal":0,"organUnitFullName":"组织单元全称"},"success":false}]}
//json字符串--数组型与JSONArray对象之间的转换
    public static void jsonStrToJSONArray() {
        String str = "{\"errors\":[{\"code\":\"UUM70004\",\"message\":\"组织单元名称不能为空\",\"data\":{\"id\":\"254\",\"suborderNo\":\"SUB_2018062797348039\",\"organUnitType\":\"部门\",\"action\":\"add\",\"parent\":\"10000\",\"ordinal\":0,\"organUnitFullName\":\"组织单元全称\"},\"success\":false},{\"code\":\"UUM70004\",\"message\":\"组织单元名称不能为空\",\"data\":{\"id\":\"255\",\"suborderNo\":\"SUB_2018062797348039\",\"organUnitType\":\"部门\",\"action\":\"add\",\"parent\":\"10000\",\"ordinal\":0,\"organUnitFullName\":\"组织单元全称\"},\"success\":false}]}";
        JSONObject jsonObject = JSON.parseObject(str);
        JSONArray error = jsonObject.getJSONArray("errors");
        List<Error> errors = JSON.parseObject(error.toJSONString(), new TypeReference<List<Error>>() {
        });
        for (Error e: errors) {
            //Error的属性
            System.out.println("Error属性="+e.getSuccess());
            System.out.println("Error属性="+e.getCode());
            System.out.println("Error属性="+e.getMessage());
            //Error集合属性
            List<Data> datas = e.getData();
            for (Data d: datas) {
                System.out.println("data对象属性="+d.getId());
                System.out.println("data对象属性="+d.getAction());
                System.out.println("data对象属性="+d.getSuborderNo());
            }
        }
        //Error属性=false
        //Error属性=UUM70004
        //Error属性=组织单元名称不能为空
        //data对象属性=254
        //data对象属性=add
        //data对象属性=SUB_2018062797348039

        //Error属性=false
        //Error属性=UUM70004
        //Error属性=组织单元名称不能为空
        //data对象属性=255
        //data对象属性=add
        //data对象属性=SUB_2018062797348039
    }
        C. JSON字符串  第二种方法-->数组类型与JAVA对象的转换

   //第二种方法：json字符串--数组型与JSONArray对象之间的转换
    @Test
    public void jsonStrToJSONArray2() {
        String str = "{\"errors\":[{\"code\":\"UUM70004\",\"message\":\"组织单元名称不能为空\",\"data\":{\"id\":\"254\",\"suborderNo\":\"SUB_2018062797348039\",\"organUnitType\":\"部门\",\"action\":\"add\",\"parent\":\"10000\",\"ordinal\":0,\"organUnitFullName\":\"组织单元全称\"},\"success\":false},{\"code\":\"UUM70004\",\"message\":\"组织单元名称不能为空\",\"data\":{\"id\":\"255\",\"suborderNo\":\"SUB_2018062797348039\",\"organUnitType\":\"部门\",\"action\":\"add\",\"parent\":\"10000\",\"ordinal\":0,\"organUnitFullName\":\"组织单元全称\"},\"success\":false}]}";
        //获取jsonobject对象
        JSONObject jsonObject = JSON.parseObject(str);
        //把对象转换成jsonArray数组
        JSONArray error = jsonObject.getJSONArray("errors");
        //error==>[{"code":"UUM70004","message":"组织单元名称不能为空","data":{"id":"254","suborderNo":"SUB_2018062797348039","organUnitType":"部门","action":"add","parent":"10000","ordinal":0,"organUnitFullName":"组织单元全称"},"success":false},{"code":"UUM70004","message":"组织单元名称不能为空","data":{"id":"255","suborderNo":"SUB_2018062797348039","organUnitType":"部门","action":"add","parent":"10000","ordinal":0,"organUnitFullName":"组织单元全称"},"success":false}]
        //将数组转换成字符串
        String jsonString = JSONObject.toJSONString(error);//将array数组转换成字符串
        //将字符串转成list集合
        List<Error>  errors = JSONObject.parseArray(jsonString, Error.class);//把字符串转换成集合
        for (Error e: errors) {
            //Error的属性
            System.out.println("另一种数组转换Error属性="+e.getSuccess());
            System.out.println("另一种数组转换Error属性="+e.getCode());
            System.out.println("另一种数组转换Error属性="+e.getMessage());
            //Error集合属性
            List<Data> datas = e.getData();
            for (Data d: datas) {
                System.out.println("另一种数组转换data对象属性="+d.getId());
                System.out.println("另一种数组转换data对象属性="+d.getAction());
                System.out.println("另一种数组转换data对象属性="+d.getSuborderNo());
            }
        }
        //另一种数组转换Error属性=false
        //另一种数组转换Error属性=UUM70004
        //另一种数组转换Error属性=组织单元名称不能为空
        //另一种数组转换data对象属性=254
        //另一种数组转换data对象属性=add
        //另一种数组转换data对象属性=SUB_2018062797348039

        //另一种数组转换Error属性=false
        //另一种数组转换Error属性=UUM70004
        //另一种数组转换Error属性=组织单元名称不能为空
        //另一种数组转换data对象属性=255
        //另一种数组转换data对象属性=add
        //另一种数组转换data对象属性=SUB_2018062797348039
    }
  4.4)  JAVA对象转JSON对象

    //javabean转json对象
    public static void jsonBenToJsonObject() {
        Data data = new Data();
        data.setAction("add");
        data.setId("1");
        data.setOrdinal(8L);
        data.setOrganUnitFullName("testJSON");
        data.setParent("0");
        data.setSuborderNo("58961");
        JSONObject jsonObj = (JSONObject) JSON.toJSON(data);
        JSON json = (JSON) JSON.toJSON(data);
        System.out.println("jsonObj"+jsonObj);
        System.out.println("json对象"+json);
        //jsonObj{"parent":"0","organUnitFullName":"testJSON","action":"add","id":"1","suborderNo":"58961","ordinal":8}
        //json对象{"parent":"0","organUnitFullName":"testJSON","action":"add","id":"1","suborderNo":"58961","ordinal":8}
    }
五、后记

（1）对于JSON对象与JSON格式字符串的转换可以直接用 toJSONString()这个方法。
（2）javaBean与JSON格式字符串之间的转换要用到：JSON.toJSONString(obj);
（3）javaBean与json对象间的转换使用：JSON.toJSON(obj)，然后使用强制类型转换，JSONObject或者JSONArray。
