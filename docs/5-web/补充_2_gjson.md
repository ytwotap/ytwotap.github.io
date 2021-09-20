# gson

> doc:https://github.com/stleary/JSON-java

code:[todo]



## 1.generation

Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Gson can work with arbitrary Java objects including pre-existing objects that you do not have source-code of.

There are a few open-source projects that can convert Java objects to JSON. However, most of them require that you place Java annotations in your classes; something that you can not do if you do not have access to the source-code. Most also do not fully support the use of Java Generics. Gson considers both of these as very important design goals.

### Goals

- Provide simple `toJson()` and `fromJson()` methods to convert Java objects to JSON and vice-versa
- Allow pre-existing unmodifiable objects to be converted to and from JSON
- Extensive support of Java Generics
- Allow custom representations for objects
- Support arbitrarily complex objects (with deep inheritance hierarchies and extensive use of generic types)

### Download

Gradle:

```
dependencies {
  implementation 'com.google.code.gson:gson:2.8.8'
}
```

Maven:

```
<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
  <version>2.8.8</version>
</dependency>
```

[Gson jar downloads](https://maven-badges.herokuapp.com/maven-central/com.google.code.gson/gson) are available from Maven Central.

### Documentation

- [API Javadoc](https://www.javadoc.io/doc/com.google.code.gson/gson): Documentation for the current release
- [User guide](https://github.com/google/gson/blob/master/UserGuide.md): This guide contains examples on how to use Gson in your code.
- [Change log](https://github.com/google/gson/blob/master/CHANGELOG.md): Changes in the recent versions
- [Design document](https://github.com/google/gson/blob/master/GsonDesignDocument.md): This document discusses issues we faced while designing Gson. It also includes a comparison of Gson with other Java libraries that can be used for Json conversion

Please use the 'gson' tag on StackOverflow or the [google-gson Google group](https://groups.google.com/group/google-gson) to discuss Gson or to post questions.

### Related Content Created by Third Parties

- [Gson Tutorial](https://www.studytrails.com/java/json/java-google-json-introduction/) by `StudyTrails`
- [Gson Tutorial Series](https://futurestud.io/tutorials/gson-getting-started-with-java-json-serialization-deserialization) by `Future Studio`
- [Gson API Report](https://abi-laboratory.pro/java/tracker/timeline/gson/)

# Gson空对象支持
作者：
						艾丽斯顿
					Java技术QQ群：227270512 / Linux QQ群：479429477
				
			
			
			
				

				
					
					
					
					
						( adsbygoogle = window.adsbygoogle || []).push({});
						
				

				

				

					
					

					Gson默认生成优化的Json内容，忽略NULL值。 但是GsonBuilder提供的标志使用GsonBuilder.serializeNulls()方法在Json输出中显示NULL值。
参考以下代码实现 - 
```java
GsonBuilder builder = new GsonBuilder(); 
builder.serializeNulls(); 
Gson gson = builder.create();
```
不带serializeNulls的示例调用创建一个名为GsonTester的Java类文件:GsonTester.java - 
```Java
import com.google.gson.Gson;  

public class GsonTester { 
   public static void main(String args[]) { 
      Gson gson = new Gson();  

      Student student = new Student(); 
      student.setRollNo(1);  
      String jsonString = gson.toJson(student); 

      System.out.println(jsonString);  
      student = gson.fromJson(jsonString, Student.class); 
      System.out.println(student); 
   }      
} 
class Student { 
   private int rollNo; 
   private String name;  

   public int getRollNo() { 
      return rollNo; 
   }  
   public void setRollNo(int rollNo) { 
      this.rollNo = rollNo; 
   }  
   public String getName() { 
      return name; 
   }  
   public void setName(String name) { 
      this.name = name; 
   }   
   public String toString() { 
      return "Student[ name = "+name+", roll no: "+rollNo+ "]"; 
   } 
}
```

执行上面示例代码，得到以下结果 - 
{"rollNo": 1} 
Student[ name = null, roll no: 1]//原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/gson/gson_null_support.html

