# Thymeleaf基本知识

[Thymeleaf](http://www.thymeleaf.org/)是一款用于渲染XML、XHTML、HTML5内容的模板引擎。 它也可以轻易 的与Spring MVC等Web框架进行集成作为Web应用的模板引擎， hymeleaf最大的 特点是通过HTML的标签属性渲染标签内容 。

Thymeleaf在web界面引用是需加入引用链接：

> &lt;html xmlns="http:\/\/www.w3.org\/1999\/xhtml" **xmlns:th="http:\/\/www .thymeleaf.org"**&gt;&lt;\/html&gt;

## 1.Thymeleaf表达式语句

* \#{...}：用户获取国际化配置文件内容 
* ${...}：变量表达式，用户获取对象的值 
* \*{...}：属性选择表达式，一般与th:with配合使用，用户简化表达式内容 
* @{...}：链接表达式，由thymeleaf模板引擎负责解析应用的ContextPath
* 算术运算
* * 基本运算：+，-，\*，／，%（取余）
* 布尔运算

* * 基本运算：and，or
  * 布尔否定运算：!，not
* 条件运算

  * 比较运算：&gt;，&lt;，&gt;=，&lt;=，==，!=（gt，lt，ge，le，eq，ne）
  * if-then：（if）?（then）
  * if-then-else：（if）？（then）：（else）
  * Default：（value）?:（default value）

## 2.常用基本标签

1. th:text标签：用来输出显示文本内容，例如获取用户的姓名：&lt;p th:text="${user.name}"&gt;&lt;/p&gt; 
2. th:value标签：用来显示文本框的值，例如&lt;input name="username" th:value="${user.name}" /&gt; 
3. th:href标签：用来处理url，支持绝对路径和相对路径，例如访问用户详情的 url：  
   &lt;a th:href="@{/users/{id}/show\(id=${user.id}\)}"&gt;&lt;/a&gt;。

   * 注意：@{/users}是Context的相对路径，thymeleaf在渲染时会自动添加 当前web应用的context名称。若context名称为app，则路径为 \/app\/users。

4. th:if,th:unless判断标签：例如下列标签只有满足th:if中的条件是才会显示，&lt;p th:if="${user.name != null}" th:text="${ user.name }"&gt;&lt;/p&gt;；th:unless正好相反，当表达式的条件不成立时，才会显示其内容。

5. th:switch/th:case标签：多项选择判断标签

6. th:each标签：循环标签，用来列表数据进行循环取值。例如列表页对用户信息进行遍历取值：

   ```
   <table> 
       <tr>
          <th>username</th>
       </tr>
       <tr th:each="user,userIndex:${users}">
           <td th:text="${user.name}"></td>
       </tr>
   </table>
   ```

注意：当使用th:each="user,userIndex:${users}"时，若没有指定状态变量， thymeleaf会默认生成“循环变量名+Stat",即”userStat“。

其中状态变量有以下属性：

* index:当前迭代对象的index,默认为0 
* count: 当前迭代对象的index,默认为1 
* size:被迭代对象的大小 
* current:当前迭代变量 
* even/odd:布尔值，当前循环是否是偶数\/奇数\(从0开始计算\) 
* first:布尔值，当前循环是否是第一个 
* last:布尔值，当前循环是否是最后一个

## 3.Thymeleaf表达式对象

Thymeleaf 提供了一系列表达式对象，可以通过“\#”直接访问。

* 基本表达式对象
* * \#ctx：上下文对象
* * \#vars：上下文变量

* 内置表达式对象

  * \#strings:字符串操作对象，常用的方法有 ${\#strings.equals\(param1,param2\)}、${\#string.isEmpty\(param1\)}
  * \#dates:日期操作对象，常用方法${\#dates.format\(param1,"yyyy-MM-dd"\)}
  * \#lists:集合操作对象，常用方法${\#lists.isEmpty\(param1\)}、${\#lists.contains\(list, param1\)}、${\#lists.size\(param1\)}
  * \#numbers:数字操作对象，常用方法${\#number.formatDecimal\(num,3,2\)}

## 

## 



