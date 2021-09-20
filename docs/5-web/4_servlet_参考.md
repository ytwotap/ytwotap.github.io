
# servlet学习

## 来源：

环境搭配idea官网文档：https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-ee-application.html#source_code

servlet TUtorial:

https://www.tutorialspoint.com/servlets/index.htm

servlet documet:https://javadoc.io/doc/javax.servlet/javax.servlet-api/latest/index.html

# 环境搭配

官网文档：https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-ee-application.html#source_code

搭配 idea的





# web架构

![img](https://pic3.zhimg.com/v2-69c020936dcbb926164b6e16f37b1b56_b.jpg)

# 1 Servlets Tutorial

Servlets provide a component-based, platform-independent method for building Webbased applications, without the performance limitations of CGI programs. Servlets have access to the entire family of Java APIs, including the JDBC API to access enterprise databases. This tutorial will teach you how to use Java Servlets to develop your web based applications in simple and easy steps.

## Why to Learn Servlet?

Using Servlets, you can collect input from users through web page forms, present records from a database or another source, and create web pages dynamically.

Java Servlets often serve the same purpose as programs implemented using the Common Gateway Interface (CGI). But Servlets offer several advantages in comparison with the CGI.

- Performance is significantly better.
- Servlets execute within the address space of a Web server. It is not necessary to create a separate process to handle each client request.
- Servlets are platform-independent because they are written in Java.
- Java security manager on the server enforces a set of restrictions to protect the resources on a server machine. So servlets are trusted.
- The full functionality of the Java class libraries is available to a servlet. It can communicate with applets, databases, or other software via the sockets and RMI mechanisms that you have seen already.

## Applications of Servlet

- Read the explicit data sent by the clients (browsers). This includes an HTML form on a Web page or it could also come from an applet or a custom HTTP client program.
- Read the implicit HTTP request data sent by the clients (browsers). This includes cookies, media types and compression schemes the browser understands, and so forth.
- Process the data and generate the results. This process may require talking to a database, executing an RMI or CORBA call, invoking a Web service, or computing the response directly.
- Send the explicit data (i.e., the document) to the clients (browsers). This document can be sent in a variety of formats, including text (HTML or XML), binary (GIF images), Excel, etc.
- Send the implicit HTTP response to the clients (browsers). This includes telling the browsers or other clients what type of document is being returned (e.g., HTML), setting cookies and caching parameters, and other such tasks.

## Audience

This tutorial is designed for Java programmers with a need to understand the Java Servlets framework and its APIs. After completing this tutorial you will find yourself at a moderate level of expertise in using Java Servlets from where you can take yourself to next levels.



----

# 2 Servlets - Overview

## 	What are Servlets?

Java Servlets are programs that run on a Web or Application server and act as a middle layer between a requests coming from a Web browser or other HTTP client and databases or applications on the HTTP server.

## Servlets Tasks

Read the explicit data sent by the clients (browsers). This includes an HTML form on a Web page or it could also come from an applet or a custom HTTP client program.

Read the implicit HTTP request data sent by the clients (browsers). This includes cookies, media types and compression schemes the browser understands, and so forth.

Process the data and generate the results. This process may require talking to a database, executing an RMI or CORBA call, invoking a Web service, or computing the response directly.

Send the implicit HTTP response to the clients (browsers). This includes telling the browsers or other clients what type of document is being returned (e.g., HTML), setting cookies and caching parameters, and other such tasks.

## 	Servlets Architecture

![Servlets Architecture](https://www.tutorialspoint.com/servlets/images/servlet-arch.jpg)	Servlets Tasks

## Servlets Tasks

Servlets perform the following major tasks −

- Read the explicit data sent by the clients (browsers). This includes an HTML form on a Web page or it could also come from an applet or a custom HTTP client program.
- Read the implicit HTTP request data sent by the clients (browsers). This includes cookies, media types and compression schemes the browser understands, and so forth.
- Process the data and generate the results. This process may require talking to a database, executing an RMI or CORBA call, invoking a Web service, or computing the response directly.
- Send the explicit data (i.e., the document) to the clients (browsers). This document can be sent in a variety of formats, including text (HTML or XML), binary (GIF images), Excel, etc.
- Send the implicit HTTP response to the clients (browsers). This includes telling the browsers or other clients what type of document is being returned (e.g., HTML), setting cookies and caching parameters, and other such tasks.

## 	Servlets Packages

Java Servlets are Java classes run by a web server that has an interpreter that supports the Java Servlet specification.

Servlets can be created using the **javax.servlet** and **javax.servlet.http** packages, which are a standard part of the Java's enterprise edition, an expanded version of the Java class library that supports large-scale development projects.



#### **HttpServlet**

Provides an abstract class to be subclassed to create an HTTP servlet suitable for a Web site. A subclass of `HttpServlet` must override at least one method, usually one of these:

- `doGet`, if the servlet supports HTTP GET requests
- `doPost`, for HTTP POST requests
- `doPut`, for HTTP PUT requests
- `doDelete`, for HTTP DELETE requests
- `init` and `destroy`, to manage resources that are held for the life of the servlet
- `getServletInfo`, which the servlet uses to provide information about itself



> 为啥有时候idea不行？

```java
public class HelloServlet2 extends HttpServlet {
    /**
     * 在get请求的时候调用
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("get is response");
    }

    /**
     * 在 Post 请求的时候调用。
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post  is response");

    }
}

```

### idea创造servlet

![image-20210317132725178](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210317132725178.png)

### Servlet 类的继承体系

![image-20210317132819948](https://github.com/ytwotap/imgCloud/blob/main/typora/spring/image-20210317132819948.png?raw=true)

![image-20210317132844272](https://github.com/ytwotap/imgCloud/blob/main/typora/spring/image-20210317132844272.png?raw=true)

----

# 3 Servlets - Life Cycle

https://javadoc.io/doc/javax.servlet/javax.servlet-api/latest/index.html

A servlet life cycle can be defined as the entire process from its creation till the destruction. The following are the paths followed by a servlet.

- The servlet is initialized by calling the **init()** method.
- The servlet calls **service()** method to process a client's request.
- The servlet is terminated by calling the **destroy()** method.
- Finally, servlet is garbage collected by the garbage collector of the JVM.

## Architecture Diagram

The following figure depicts a typical servlet life-cycle scenario.

- First the HTTP requests coming to the server are delegated to the servlet container.
- The servlet container loads the servlet before invoking the service() method.
- Then the servlet container handles multiple requests by spawning multiple threads, each thread executing the service() method of a single instance of the servlet.

![Servlet Life Cycle](https://www.tutorialspoint.com/servlets/images/servlet-lifecycle.jpg)



# 4 Servlets - Examples



Servlets are Java classes which service HTTP requests and implement the **javax.servlet.Servlet** interface. Web application developers typically write servlets that extend javax.servlet.http.HttpServlet, an abstract class that implements the Servlet interface and is specially designed to handle HTTP requests.

**@WebServlet**

| `String[]` | `value`The URL patterns of the servlet |
| ---------- | -------------------------------------- |
| `String`   | `name`The name of the servlet          |

https://javadoc.io/doc/javax.servlet/javax.servlet-api/latest/index.html



```java
package com.example.servlet_02_helloworld;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
/**
@WebServlet 这个可以注解web。xml对于servlet的配置
*/
@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World! update application!2 ";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        // Hello
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + message + "</h1>");
        out.println("</body></html>");
    }

    public void destroy() {
    }
}
```



# 

# 5 Servlets - Form Data

You must have come across many situations when you need to pass some information from your browser to web server and ultimately to your backend program. The browser uses two methods to pass this information to web server. These methods are GET Method and POST Method.

## GET Method

The GET method sends the encoded user information appended to the page request. The page and the encoded information are separated by the **?** (question mark) symbol as follows −

```url
http://www.test.com/hello?key1 = value1&key2 = value2
```

 The GET method has size limitation: only 1024 characters can be used in a request string.



This information is passed using QUERY_STRING header and will be accessible through QUERY_STRING environment variable and Servlet handles this type of requests using **doGet()** method.

## POST Method

A generally more reliable method of passing information to a backend program is the POST method. This packages the information in exactly the same way as GET method, but instead of sending it as a text string after a ? (question mark) in the URL it sends it as a separate message. This message comes to the backend program in the form of the standard input which you can parse and use for your processing. Servlet handles this type of requests using **doPost()** method.

## Reading Form Data using Servlet

Servlets handles form data parsing automatically using the following methods depending on the situation −

- **getParameter()** − You call request.getParameter() method to get the value of a form parameter.
- **getParameterValues()** − Call this method if the parameter appears more than once and returns multiple values, for example checkbox.
- **getParameterNames()** − Call this method if you want a complete list of all parameters in the current request.

## GET Method Example using URL

here is a simple URL which will pass two values to HelloForm program using GET method.

**http://localhost:8080/HelloForm?first_name = ZARA&last_name = ALI**

Given below is the **HelloForm.java** servlet program to handle input given by web browser. We are going to use **getParameter()** method which makes it very easy to access passed information −

```
// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

// Extend HttpServlet class
public class HelloForm extends HttpServlet {
 
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      // Set response content type
      response.setContentType("text/html");

      PrintWriter out = response.getWriter();
      String title = "Using GET Method to Read Form Data";
      String docType =
         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";
         
      out.println(docType +
         "<html>\n" +
            "<head><title>" + title + "</title></head>\n" +
            "<body bgcolor = \"#f0f0f0\">\n" +
               "<h1 align = \"center\">" + title + "</h1>\n" +
               "<ul>\n" +
                  "  <li><b>First Name</b>: "
                  + request.getParameter("first_name") + "\n" +
                  "  <li><b>Last Name</b>: "
                  + request.getParameter("last_name") + "\n" +
               "</ul>\n" +
            "</body>" +
         "</html>"
      );
   }
}
```

If everything goes fine, above compilation would produce **HelloForm.class** file. Next you would have to copy this class file in <Tomcat-installationdirectory>/webapps/ROOT/WEB-INF/classes and create following entries in **web.xml** file located in <Tomcat-installation-directory>/webapps/ROOT/WEB-INF/

```
<servlet>
   <servlet-name>HelloForm</servlet-name>
   <servlet-class>HelloForm</servlet-class>
</servlet>

<servlet-mapping>
   <servlet-name>HelloForm</servlet-name>
   <url-pattern>/HelloForm</url-pattern>
</servlet-mapping>
```

Now type *http://localhost:8080/HelloForm?first_name=ZARA&last_name=ALI* in your browser's Location:box and make sure you already started tomcat server, before firing above command in the browser. This would generate following result −

## GET Method Example Using Form



Here is a simple example which passes two values using HTML FORM and submit button. We are going to use same Servlet HelloForm to handle this input.

```
<form action = "../hello-servlet" method = "GET">
    First Name: <input type = "text" name = "first_name">
    <br />
    Last Name: <input type = "text" name = "last_name" />
    <input type = "submit" value = "Submit" />
</form>
```

../hello-servlet : 根目录路径

Keep this HTML in a file Hello.htm and put it in <Tomcat-installationdirectory>/webapps/ROOT directory(使用idea自己决定方案：[idea中Java Web项目的访问路径问题idea中Java Web项目的访问路径问题](https://blog.csdn.net/WinstonLau/article/details/80239271)). When you would access *http://localhost:8080/Hello.htm*, here is the actual output of the above form.

![image-20210328191016262](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210328191016262.png)

Try to enter First Name and Last Name and then click submit button to see the result on your local machine where tomcat is running. Based on the input provided, it will generate similar result as mentioned in the above example.



## POST Method Example Using Form

和get方法差不多

只是调用了doget() 而已;

```java
package com.example.servlet_03_helloform;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 处理 form post handlet
 */
@WebServlet(name = "helloServletPOST", value = "/hello-servletPOST")
public class HelloFormPOST extends HelloServlet{
    //method to hand Get METHOD  request
    // Method to handle GET method request.
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response content type
        response.setContentType("text/html");

        PrintWriter out = response.getWriter();
        String title = "Using POST Method to Read Form Data";
        String docType =
                "<!doctype html public \"-//w3c//dtd html 4.0 " +
                        "transitional//en\">\n";

        out.println(docType +
                        "<html>\n" +
                        "<head><title>" + title + "</title></head>\n" +
                        "<body bgcolor = \"#f0f0f0\">\n" +
                        "<h1 align = \"center\">" + title + "</h1>\n" +
                        "<ul>\n" +
                        "  <li><b>First Name</b>: "
                        + request.getParameter("first_name") + "\n" +
                        "  <li><b>Last Name</b>: "
                        + request.getParameter("last_name") + "\n" +
                        "</ul>\n" +
                        "</body>"+
                "</html>"
        );
    }

    // Method to handle POST method request.
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        doGet(request, response);
    }

}
```



## Passing Checkbox Data to Servlet Program

Checkboxes are used when more than one option is required to be selected.

Here is example HTML code, CheckBox.htm, for a form with two checkboxes

```
<html>
   <body>
      <form action = "CheckBox" method = "POST" target = "_blank">
         <input type = "checkbox" name = "maths" checked = "checked" /> Maths
         <input type = "checkbox" name = "physics"  /> Physics
         <input type = "checkbox" name = "chemistry" checked = "checked" /> 
                                          Chemistry
         <input type = "submit" value = "Select Subject" />
      </form>
   </body>
</html>
```

The result of this code is the following form

 Maths Physics Chemistry 

Given below is the CheckBox.java servlet program to handle input given by web browser for checkbox button.

```
// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

// Extend HttpServlet class
public class CheckBox extends HttpServlet {
 
   // Method to handle GET method request.
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      // Set response content type
      response.setContentType("text/html");

      PrintWriter out = response.getWriter();
      String title = "Reading Checkbox Data";
      String docType =
         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";

      out.println(docType +
         "<html>\n" +
            "<head><title>" + title + "</title></head>\n" +
            "<body bgcolor = \"#f0f0f0\">\n" +
               "<h1 align = \"center\">" + title + "</h1>\n" +
               "<ul>\n" +
                  "  <li><b>Maths Flag : </b>: "
                  + request.getParameter("maths") + "\n" +
                  "  <li><b>Physics Flag: </b>: "
                  + request.getParameter("physics") + "\n" +
                  "  <li><b>Chemistry Flag: </b>: "
                  + request.getParameter("chemistry") + "\n" +
               "</ul>\n" +
            "</body>"
         "</html>"
      );
   }

   // Method to handle POST method request.
   public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      doGet(request, response);
   }
}
```

For the above example, it would display following result −

```
Reading Checkbox Data

Maths Flag : : on
Physics Flag: : null
Chemistry Flag: : on
```

## Reading All Form Parameters

Following is the generic example which uses **getParameterNames()** method of HttpServletRequest to read all the available form parameters. This method returns an Enumeration that contains the parameter names in an unspecified order

Once we have an Enumeration, we can loop down the Enumeration in standard way by, using *hasMoreElements()* method to determine when to stop and using *nextElement()* method to get each parameter name.

```
// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

// Extend HttpServlet class
public class ReadParams extends HttpServlet {
 
   // Method to handle GET method request.
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      // Set response content type
      response.setContentType("text/html");

      PrintWriter out = response.getWriter();
      String title = "Reading All Form Parameters";
      String docType =
         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";

      out.println(docType +
         "<html>\n" +
         "<head><title>" + title + "</title></head>\n" +
         "<body bgcolor = \"#f0f0f0\">\n" +
         "<h1 align = \"center\">" + title + "</h1>\n" +
         "<table width = \"100%\" border = \"1\" align = \"center\">\n" +
         "<tr bgcolor = \"#949494\">\n" +
            "<th>Param Name</th>"
            "<th>Param Value(s)</th>\n"+
         "</tr>\n"
      );

      Enumeration paramNames = request.getParameterNames();

      while(paramNames.hasMoreElements()) {
         String paramName = (String)paramNames.nextElement();
         out.print("<tr><td>" + paramName + "</td>\n<td>");
         String[] paramValues = request.getParameterValues(paramName);

         // Read single valued data
         if (paramValues.length == 1) {
            String paramValue = paramValues[0];
            if (paramValue.length() == 0)
               out.println("<i>No Value</i>");
               else
               out.println(paramValue);
         } else {
            // Read multiple valued data
            out.println("<ul>");

            for(int i = 0; i < paramValues.length; i++) {
               out.println("<li>" + paramValues[i]);
            }
            out.println("</ul>");
         }
      }
      out.println("</tr>\n</table>\n</body></html>");
   }
   
   // Method to handle POST method request.
   public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      doGet(request, response);
   }
}
```

Now, try the above servlet with the following form −

```
<html>
   <body>
      <form action = "ReadParams" method = "POST" target = "_blank">
         <input type = "checkbox" name = "maths" checked = "checked" /> Maths
         <input type = "checkbox" name = "physics"  /> Physics
         <input type = "checkbox" name = "chemistry" checked = "checked" /> Chem
         <input type = "submit" value = "Select Subject" />
      </form>
   </body>
</html>
```

Now calling servlet using the above form would generate the following result −

```
Param NameParam Value(s)
mathson
chemistryon
```

You can try the above servlet to read any other form's data having other objects like text box, radio button or drop down box etc.

# Servlets - Client HTTP Request

api:https://tomcat.apache.org/tomcat-8.0-doc/servletapi/javax/servlet/ServletRequest.html

When a browser requests for a web page, it sends lot of information to the web server which cannot be read directly because this information travel as a part of header of HTTP request. You can check [HTTP Protocol](https://www.tutorialspoint.com/http/index.htm) for more information on this.

Following is the important header information which comes from browser side and you would use very frequently in web programming −

| Sr.No. |                     Header & Description                     |
| ------ | :----------------------------------------------------------: |
| 1      | **Accept**This header specifies the MIME types that the browser or other clients can handle. Values of **image/png** or **image/jpeg** are the two most common possibilities. |
| 2      | **Accept-Charset**This header specifies the character sets the browser can use to display the information. For example ISO-8859-1. |
| 3      | **Accept-Encoding**This header specifies the types of encodings that the browser knows how to handle. Values of **gzip** or **compress** are the two most common possibilities. |
| 4      | **Accept-Language**This header specifies the client's preferred languages in case the servlet can produce results in more than one language. For example en, en-us, ru, etc |
| 5      | **Authorization**This header is used by clients to identify themselves when accessing password-protected Web pages. |
| 6      | **Connection**This header indicates whether the client can handle persistent HTTP connections. Persistent connections permit the client or other browser to retrieve multiple files with a single request. A value of **Keep-Alive** means that persistent connections should be used. |
| 7      | **Content-Length**This header is applicable only to POST requests and gives the size of the POST data in bytes. |
| 8      | **Cookie**This header returns cookies to servers that previously sent them to the browser. |
| 9      | **Host**This header specifies the host and port as given in the original URL. |
| 10     | **If-Modified-Since**This header indicates that the client wants the page only if it has been changed after the specified date. The server sends a code, 304 which means **Not Modified** header if no newer result is available. |
| 11     | **If-Unmodified-Since**This header is the reverse of If-Modified-Since; it specifies that the operation should succeed only if the document is older than the specified date. |
| 12     | **Referer**This header indicates the URL of the referring Web page. For example, if you are at Web page 1 and click on a link to Web page 2, the URL of Web page 1 is included in the Referrer header when the browser requests Web page 2. |
| 13     | **User-Agent**This header identifies the browser or other client making the request and can be used to return different content to different types of browsers. |

## Methods to read HTTP Header

There are following methods which can be used to read HTTP header in your servlet program. These methods are available with *HttpServletRequest* object

| Sr.No. |                     Method & Description                     |
| ------ | :----------------------------------------------------------: |
| 1      | **Cookie[] getCookies()**Returns an array containing all of the Cookie objects the client sent with this request. |
| 2      | **Enumeration getAttributeNames()**Returns an Enumeration containing the names of the attributes available to this request. |
| 3      | **Enumeration getHeaderNames()**Returns an enumeration of all the header names this request contains. |
| 4      | **Enumeration getParameterNames()**Returns an Enumeration of String objects containing the names of the parameters contained in this request |
| 5      | **HttpSession getSession()**Returns the current session associated with this request, or if the request does not have a session, creates one. |
| 6      | **HttpSession getSession(boolean create)**Returns the current HttpSession associated with this request or, if if there is no current session and value of create is true, returns a new session. |
| 7      | **Locale getLocale()**Returns the preferred Locale that the client will accept content in, based on the Accept-Language header. |
| 8      | **Object getAttribute(String name)**Returns the value of the named attribute as an Object, or null if no attribute of the given name exists. |
| 9      | **ServletInputStream getInputStream()**Retrieves the body of the request as binary data using a ServletInputStream. |
| 10     | **String getAuthType()**Returns the name of the authentication scheme used to protect the servlet, for example, "BASIC" or "SSL," or null if the JSP was not protected. |
| 11     | **String getCharacterEncoding()**Returns the name of the character encoding used in the body of this request. |
| 12     | **String getContentType()**Returns the MIME type of the body of the request, or null if the type is not known. |
| 13     | **String getContextPath()**Returns the portion of the request URI that indicates the context of the request. |
| 14     | **String getHeader(String name)**Returns the value of the specified request header as a String. |
| 15     | **String getMethod()**Returns the name of the HTTP method with which this request was made, for example, GET, POST, or PUT. |
| 16     | **String getParameter(String name)**Returns the value of a request parameter as a String, or null if the parameter does not exist. |
| 17     | **String getPathInfo()**Returns any extra path information associated with the URL the client sent when it made this request |
| 18     | **String getProtocol()**Returns the name and version of the protocol the request. |
| 19     | **String getQueryString()**Returns the query string that is contained in the request URL after the path. |
| 20     | **String getRemoteAddr()**Returns the Internet Protocol (IP) address of the client that sent the request. |
| 21     | **String getRemoteHost()**Returns the fully qualified name of the client that sent the request. |
| 22     | **String getRemoteUser()**Returns the login of the user making this request, if the user has been authenticated, or null if the user has not been authenticated. |
| 23     | **String getRequestURI()**Returns the part of this request's URL from the protocol name up to the query string in the first line of the HTTP request. |
| 24     | **String getRequestedSessionId()**Returns the session ID specified by the client. |
| 25     | **String getServletPath()**Returns the part of this request's URL that calls the JSP. |
| 26     | **String[] getParameterValues(String name)**Returns an array of String objects containing all of the values the given request parameter has, or null if the parameter does not exist. |
| 27     | **boolean isSecure()**Returns a Boolean indicating whether this request was made using a secure channel, such as HTTPS. |
| 28     | **int getContentLength()**Returns the length, in bytes, of the request body and made available by the input stream, or -1 if the length is not known. |
| 29     | **int getIntHeader(String name)**Returns the value of the specified request header as an int. |
| 30     | **int getServerPort()**Returns the port number on which this request was received. |

## HTTP Header Request Example

Following is the example which uses **getHeaderNames()** method of HttpServletRequest to read the HTTP header information. This method returns an Enumeration that contains the header information associated with the current HTTP request.

Once we have an Enumeration, we can loop down the Enumeration in the standard manner, using *hasMoreElements()* method to determine when to stop and using *nextElement()* method to get each parameter name

```
// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;
 
// Extend HttpServlet class
public class DisplayHeader extends HttpServlet {
 
   // Method to handle GET method request.
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      // Set response content type
      response.setContentType("text/html");
 
      PrintWriter out = response.getWriter();
      String title = "HTTP Header Request Example";
      String docType =
         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";

      out.println(docType +
         "<html>\n" +
         "<head><title>" + title + "</title></head>\n"+
         "<body bgcolor = \"#f0f0f0\">\n" +
         "<h1 align = \"center\">" + title + "</h1>\n" +
         "<table width = \"100%\" border = \"1\" align = \"center\">\n" +
         "<tr bgcolor = \"#949494\">\n" +
         "<th>Header Name</th><th>Header Value(s)</th>\n"+
         "</tr>\n"
      );
 
      Enumeration headerNames = request.getHeaderNames();
    
      while(headerNames.hasMoreElements()) {
         String paramName = (String)headerNames.nextElement();
         out.print("<tr><td>" + paramName + "</td>\n");
         String paramValue = request.getHeader(paramName);
         out.println("<td> " + paramValue + "</td></tr>\n");
      }
      out.println("</table>\n</body></html>");
   }
   
   // Method to handle POST method request.
   public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

      doGet(request, response);
   }
}
```

Now calling the above servlet would generate the following result −

```
Header NameHeader Value(s)
accept*/*
accept-languageen-us
user-agentMozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; InfoPath.2; MS-RTC LM 8)
accept-encodinggzip, deflate
hostlocalhost:8080
connectionKeep-Alive
cache-controlno-cache
```

# Servlets - Server HTTP Response

| Sr.No. |                     Header & Description                     |
| ------ | :----------------------------------------------------------: |
| 1      | **Allow**This header specifies the request methods (GET, POST, etc.) that the server supports. |
| 2      | **Cache-Control**This header specifies the circumstances in which the response document can safely be cached. It can have values **public**, **private** or **no-cache** etc. Public means document is cacheable, Private means document is for a single user and can only be stored in private (non-shared) caches and nocache means document should never be cached. |
| 3      | **Connection**This header instructs the browser whether to use persistent in HTTP connections or not. A value of **close** instructs the browser not to use persistent HTTP connections and **keepalive** means using persistent connections. |
| 4      | **Content-Disposition**This header lets you request that the browser ask the user to save the response to disk in a file of the given name. |
| 5      | **Content-Encoding**This header specifies the way in which the page was encoded during transmission. |
| 6      | **Content-Language**This header signifies the language in which the document is written. For example en, en-us, ru, etc |
| 7      | **Content-Length**This header indicates the number of bytes in the response. This information is needed only if the browser is using a persistent (keep-alive) HTTP connection. |
| 8      | **Content-Type**This header gives the MIME (Multipurpose Internet Mail Extension) type of the response document. |
| 9      | **Expires**This header specifies the time at which the content should be considered out-of-date and thus no longer be cached. |
| 10     | **Last-Modified**This header indicates when the document was last changed. The client can then cache the document and supply a date by an **If-Modified-Since** request header in later requests. |
| 11     | **Location**This header should be included with all responses that have a status code in the 300s. This notifies the browser of the document address. The browser automatically reconnects to this location and retrieves the new document. |
| 12     | **Refresh** This header specifies how soon the browser should ask for an updated page. You can specify time in number of seconds after which a page would be refreshed. |
| 13     | **Retry-After**This header can be used in conjunction with a 503 (Service Unavailable) response to tell the client how soon it can repeat its request. |
| 14     | **Set-Cookie**This header specifies a cookie associated with the page. |

## Methods to Set HTTP Response Header

 These methods are available with ***HttpServletResponse*** object.

| Sr.No. |                     Method & Description                     |
| ------ | :----------------------------------------------------------: |
| 1      | **String encodeRedirectURL(String url)**Encodes the specified URL for use in the sendRedirect method or, if encoding is not needed, returns the URL unchanged. |
| 2      | **String encodeURL(String url)**Encodes the specified URL by including the session ID in it, or, if encoding is not needed, returns the URL unchanged. |
| 3      | **boolean containsHeader(String name)**Returns a Boolean indicating whether the named response header has already been set. |
| 4      | **boolean isCommitted()**Returns a Boolean indicating if the response has been committed. |
| 5      | **void addCookie(Cookie cookie)**Adds the specified cookie to the response. |
| 6      | **void addDateHeader(String name, long date)**Adds a response header with the given name and date-value. |
| 7      | **void addHeader(String name, String value)**Adds a response header with the given name and value. |
| 8      | **void addIntHeader(String name, int value)**Adds a response header with the given name and integer value. |
| 9      | **void flushBuffer()**Forces any content in the buffer to be written to the client. |
| 10     | **void reset()**Clears any data that exists in the buffer as well as the status code and headers. |
| 11     | **void resetBuffer()**Clears the content of the underlying buffer in the response without clearing headers or status code. |
| 12     | **void sendError(int sc)**Sends an error response to the client using the specified status code and clearing the buffer. |
| 13     | **void sendError(int sc, String msg)**Sends an error response to the client using the specified status. |
| 14     | **void sendRedirect(String location)**Sends a temporary redirect response to the client using the specified redirect location URL. |
| 15     | **void setBufferSize(int size)**Sets the preferred buffer size for the body of the response. |
| 16     | **void setCharacterEncoding(String charset)**Sets the character encoding (MIME charset) of the response being sent to the client, for example, to UTF-8. |
| 17     | **void setContentLength(int len)**Sets the length of the content body in the response In HTTP servlets, this method sets the HTTP Content-Length header. |
| 18     | **void setContentType(String type)**Sets the content type of the response being sent to the client, if the response has not been committed yet. |
| 19     | **void setDateHeader(String name, long date)**Sets a response header with the given name and date-value. |
| 20     | **void setHeader(String name, String value)**Sets a response header with the given name and value. |
| 21     | **void setIntHeader(String name, int value)**Sets a response header with the given name and integer value |
| 22     | **void setLocale(Locale loc)**Sets the locale of the response, if the response has not been committed yet. |
| 23     | **void setStatus(int sc)**Sets the status code for this response |



# Servlets - Http Status Codes

Following is a list of HTTP status codes and associated messages that might be returned from the Web Server −

| Code |            Message            |                                                  Description |
| :--: | :---------------------------: | -----------------------------------------------------------: |
| 100  |           Continue            | Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request |
| 101  |      Switching Protocols      |                                The server switches protocol. |
| 200  |              OK               |                                            The request is OK |
| 201  |            Created            |       The request is complete, and a new resource is created |
| 202  |           Accepted            | The request is accepted for processing, but the processing is not complete. |
| 203  | Non-authoritative Information |                                                              |
| 204  |          No Content           |                                                              |
| 205  |         Reset Content         |                                                              |
| 206  |        Partial Content        |                                                              |
| 300  |       Multiple Choices        | A link list. The user can select a link and go to that location. Maximum five addresses |
| 301  |       Moved Permanently       |                    The requested page has moved to a new url |
| 302  |             Found             |        The requested page has moved temporarily to a new url |
| 303  |           See Other           |        The requested page can be found under a different url |
| 304  |         Not Modified          |                                                              |
| 305  |           Use Proxy           |                                                              |
| 306  |           *Unused*            | This code was used in a previous version. It is no longer used, but the code is reserved |
| 307  |      Temporary Redirect       |       The requested page has moved temporarily to a new url. |
| 400  |          Bad Request          |                    The server did not understand the request |
| 401  |         Unauthorized          |           The requested page needs a username and a password |
| 402  |       Payment Required        |                               *You cannot use this code yet* |
| 403  |           Forbidden           |                    Access is forbidden to the requested page |
| 404  |           Not Found           |                   The server cannot find the requested page. |
| 405  |      Method Not Allowed       |          The method specified in the request is not allowed. |
| 406  |        Not Acceptable         | The server can only generate a response that is not accepted by the client. |
| 407  | Proxy Authentication Required | You must authenticate with a proxy server before this request can be served. |
| 408  |        Request Timeout        | The request took longer than the server was prepared to wait. |
| 409  |           Conflict            |    The request could not be completed because of a conflict. |
| 410  |             Gone              |                   The requested page is no longer available. |
| 411  |        Length Required        | The "Content-Length" is not defined. The server will not accept the request without it. |
| 412  |      Precondition Failed      | The precondition given in the request evaluated to false by the server. |
| 413  |   Request Entity Too Large    | The server will not accept the request, because the request entity is too large. |
| 414  |     Request-url Too Long      | The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information. |
| 415  |    Unsupported Media Type     | The server will not accept the request, because the media type is not supported. |
| 417  |      Expectation Failed       |                                                              |
| 500  |     Internal Server Error     | The request was not completed. The server met an unexpected condition. |
| 501  |        Not Implemented        | The request was not completed. The server did not support the functionality required. |
| 502  |          Bad Gateway          | The request was not completed. The server received an invalid response from the upstream server. |
| 503  |      Service Unavailable      | The request was not completed. The server is temporarily overloading or down. |
| 504  |        Gateway Timeout        |                                   The gateway has timed out. |
| 505  |  HTTP Version Not Supported   |     The server does not support the "http protocol" version. |

## Methods to Set HTTP Status Code

The following methods can be used to set HTTP Status Code in your servlet program. These methods are available with *HttpServletResponse* object.

| Sr.No. |                     Method & Description                     |
| ------ | :----------------------------------------------------------: |
| 1      | **public void setStatus ( int statusCode )**This method sets an arbitrary status code. The setStatus method takes an int (the status code) as an argument. If your response includes a special status code and a document, be sure to call setStatus before actually returning any of the content with the *PrintWriter*. |
| 2      | **public void sendRedirect(String url)**This method generates a 302 response along with a *Location* header giving the URL of the new document |
| 3      | **public void sendError(int code, String message)**This method sends a status code (usually 404) along with a short message that is automatically formatted inside an HTML document and sent to the client. |

## HTTP Status Code Example

Following is the example which would send a 407 error code to the client browser and browser would show you "Need authentication!!!" message.

```java
// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

// Extend HttpServlet class
public class showError extends HttpServlet {
 
   // Method to handle GET method request.
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      // Set error code and reason.
      response.sendError(407, "Need authentication!!!" );
   }
   
   // Method to handle POST method request.
   public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      doGet(request, response);
   }
}
```

Now calling the above servlet would display the following result −

```html
HTTP Status 407 - Need authentication!!!
type Status report
messageNeed authentication!!!
descriptionThe client must first authenticate itself with the proxy (Need authentication!!!).
Apache Tomcat/5.5.29
```

# @annontion

https://www.tutorialspoint.com/servlets/servlets-annotations.htm



----





# Servlet 技术

## a)什么是 Servlet

A servlet is a small Java program that runs within a Web server. Servlets receive and respond to requests from Web clients, usually across HTTP, the HyperText Transfer Protocol.

> https://docs.oracle.com/javaee/7/api/toc.htm

1、Servlet 是 JavaEE 规范之一。规范就是接口 

2、Servlet 就 JavaWeb 三大组件之一。**三大组件分别是：Servlet 程序、Filter 过滤器、Listener 监听器。**           

3、Servlet 是运行在服务器上的一个 java 小程序，它可以接收客户端发送过来的请求，并响应数据给客户端

### b)手动实现 Servlet 程序	

1. 编写一个类去实现servlet接口

2. 实现service方法，处理请求，并响应数据。

3. 到web.xml中去配置servlet程序的访问地址。

   serverlet mnethod

   > This interface defines methods to initialize a servlet, to service requests, and to remove a servlet from the server. These are known as life-cycle methods and are called in the following sequence:
   >
   > 1. The servlet is constructed, then initialized with the `init` method.
   > 2. Any calls from clients to the `service` method are handled.
   > 3. The servlet is taken out of service, then destroyed with the `destroy` method, then garbage collected and finalized.

### 端口号的区别

客户端和服务段的端口号没关系，都已同一套抽象端口

> https://zhuanlan.zhihu.com/p/266360430

### url->servlet地址访问



![image-20210316173211241](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210316173211241.png)

Servlet程序的实例代码：

```java	
package com;
import javax.servlet.*;
import java.io.IOException;

public class HelloServlet implements Servlet{

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    /**
     * service方法是撞门用来处理请求和相应的
     * @param servletRequest
     * @param servletResponse
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("hello servlet 被访问了 ");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}

```





### servlet生命周期

1、执行 Servlet 构造器方法 

2、执行 init 初始化方法 

第一、二步，是在第一次访问，的时候创建 Servlet 程序会调用。 

3、执行 service 方法 第三步，每次访问都会调用。

 4、执行 destroy 销毁方法 第四步，在 web 工程停止的时候调用。





### chrome 查看响应

**f12 查看**

![image-20210316171711042](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210316171711042.png)

### get和post请求分发



test html	

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="http://localhost:4396/hello" method="get">
    <input type="submit">
</form>

</body>
</html>
```

service 函数 处理 get

```java
 @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        HttpServletRequest httpServletRequest= (HttpServletRequest) servletRequest;
        String method=httpServletRequest.getMethod();
        if("GET".equals(method)){
            System.out.println("get请求");
        }
        if("POST".equals(method)){
            System.out.println("post 请求");
        }
        System.out.println("print");
        System.out.println(method);
    }
```

### 开发中使用子类：javax.servlet.GenericServlet and `javax.servlet.http.HttpServlet`.

To implement this interface, you can write a generic servlet that extends `javax.servlet.GenericServlet` or an HTTP servlet that extends `javax.servlet.http.HttpServlet`.





# 2、ServletConfig 

> ServletConfig 类从类名上来看，就知道是 Servlet 程序的配置信息类。
>
> Servlet 程序和 ServletConfig 对象都是由 Tomcat 负责创建，我们负责使用。
>
> Servlet 程序默认是第一次访问的时候创建，ServletConfig 是每个 Servlet 程序创建时，就创建一个对应的 ServletConfig 对 象。

**a)ServletConfig 类的三大作用**

 1、可以获取 Servlet 程序的别名 servlet-name 的值 

2、获取初始化参数 init-param

 3、获取 **ServletContext** 对象

```java
@Override
public void init(ServletConfig servletConfig) throws ServletException {
System.out.println("2 init 初始化方法");
// 1、可以获取 Servlet 程序的别名 servlet-name 的值
System.out.println("HelloServlet 程序的别名是:" + servletConfig.getServletName());
// 2、获取初始化参数 init-param
System.out.println("初始化参数 username 的值是;" + servletConfig.getInitParameter("username"));
System.out.println("初始化参数 url 的值是;" + servletConfig.getInitParameter("url"));
// 3、获取 ServletContext 对象
System.out.println(servletConfig.getServletContext());
}
```





# 3.ServletContext 

### a)什么是 ServletContext? 

1、ServletContext 是一个接口，它表示 Servlet 上下文对象 

2、一个 web 工程，只有一个 ServletContext 对象实例。 

3、ServletContext 对象是一个域对象。

 4、ServletContext 是在 web 工程部署启动的时候创建。在 web 工程停止的时候销

![image-20210318183118987](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210318183118987.png)



### b)ServletContext 类的四个作用

1、获取 web.xml 中配置的上下文参数 context-param 

2、获取当前的工程路径，格式: /工程路径 

3、获取工程部署后在服务器硬盘上的绝对路径 

4、像 Map 一样存取数

# http协议和post协议：

看计算机网络

# MIME 类型说明

MIME 是 HTTP 协议中数据类型。 MIME 的英文全称是"Multipurpose Internet Mail Extensions" 多功能 Internet 邮件扩充服务。MIME 类型的格式是“大类型/小 类型”，并与某一种文件的扩展名相对应

![image-20210330214011416](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330214011416.png)

![image-20210330214019449](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330214019449.png)

![image-20210330214004313](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330214004313.png)

# HttpServletRequest 类

看这个前面的有相同的 ，

![image-20210330214228934](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330214228934.png)

# Web 中的相对路径和绝对路径

![image-20210330214305271](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330214305271.png)





h)web 中 / 斜杠的不同意义

 在 web 中 / 斜杠 是一种绝对路径。

 / 斜杠 如果被浏览器解析，得到的地址是：http://ip:port/ [斜杠]() / 斜杠

 如果被服务器解析，得到的地址是：http://ip:port/工程路径 

1、/servlet1 

2、servletContext.getRealPath(“/”); 

3、request.getRequestDispatcher(“/”); 特殊情况： response.sendRediect(“/”); 把斜杠发送给浏览器解析。得到 http://ip:port/





# 请求重定向

![image-20210330214423547](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/spring/image-20210330214423547.png)