# Session作业

1.上课的代码自己动手敲一遍







2.要求关闭浏览器再次打开，依然可以访问到原先session中的数据

login:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/sessionLogin" method="post">
        <input type="text" name="username"><br>
        <input type="password" name="password"><br>
        <input type="submit">
    </form>
</body>
</html>
```

```java
package com.example.session.work7;

import com.example.session.bean.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 *login this file  get user information
 * 封装 session 对象 到 user 中
 * 如何传到另一个对象中???
 * 通过context / session
 * @author 12824
 * @version 1.0
 * @date 2021-08-20
 */
@WebServlet("/sessionLogin")
public class SessionLogin extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //get user object
        final String username = req.getParameter("username");
        final String passwrod = req.getParameter("password");
        final User user = new User();
        user.setPassword(passwrod);
        user.setUsername(username);
        final HttpSession session = req.getSession();
        session.setAttribute("user", user);
        final String id = session.getId();
        getServletContext().setAttribute("JSESSIONID",id);
    }
}

```

```java
package com.example.session.work7;

import com.example.session.bean.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 * get information from session object
 *  get user 对象
 *  如何实现 再次 打开 也能获取??
 *  通过 sessionId 获取 对象 .
 *   那么,向 存储sessionId 到 cooKie 中.
 *   再次打开浏览器访问 cookie中的sessionId就行了 .
 * @author 12824
 * @version 1.0
 * @date 2021-08-20
 */
@WebServlet("/sessionInfo")
public class SessionInfo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //判断有无cookie session id
        final Cookie[] cookies = req.getCookies();
        int mark=0;
        for (Cookie C:
             cookies) {
           if ( C.getName().equals("JSESSIONID")&&C.getValue()!=null){
               mark=1;
               break;
           }
        }
        //无 增加 session id
        if (mark!=1){
            final String sessionId = (String) getServletContext().getAttribute("JSESSIONID");
            final Cookie cookie = new Cookie("JSESSIONID",sessionId);
            resp.addCookie(cookie);
            //刷新
            resp.setHeader("refresh", "0.1;url="+req.getContextPath()+"/sessionInfo");
            return;
        }
        //有
        //getsesion
        final HttpSession session = req.getSession();
        //返回对象.
        final User user = (User) session.getAttribute("user");
        resp.getWriter().println("username:"+user.getUsername());
        resp.getWriter().println("password:"+user.getPassword());
    }
}

```



3.购物车案例先自己思考一下如何去完成，晚上一定要自己花时间思考，明天你才能有更多收货

（提示：可以先自己模拟一些商品信息，填充到list中，来替代从数据库里面获取）

```java
package com.example.session.work7.work2;

import com.example.session.bean.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 * 根据不同的请求 显示商品信息
 * 显示商品详细
 * 通过context / session
 *
 * @author 12824
 * @version 1.0
 * @date 2021-08-20
 */
@WebServlet("/shoppingInfo/*")
public class ShoppingInfo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        /*分析显示各个信息*/
        final String requestURL = req.getRequestURI();
        final int i = requestURL.lastIndexOf("/");
        String substring = requestURL.substring(i + 1);
        CellPone info = null;
        //匹配对象
        if (substring.equals("p50")) {
            /*初始化对象*/
            info = new CellPoneP50();
        } else if (substring.equals("888")) {
            info = new CellPoneM888();
        } else if (substring.equals("iphone12")) {
            info = new CellPoneIpone12();
        } else {
            resp.getWriter().println("请求详细页面响应错误");
            return;
        }
        //发送此时加入购物车信息
        final HttpSession session = req.getSession();
        session.setAttribute("shopping", info);

        resp.setHeader("Content-Type", "text/html;charset=utf-8");
        //得到对象信息

        //输出对象信息
        resp.getWriter().println("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Title</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<div align=\"center\">\n" +
                "    <h2>商品信息</h2>\n" +
                "name:" + info.getName() +
                "    <br>\n" +
                "Color:" + info.getColor() +
                "    <br>\n" +
                "Price:" + info.getPrice() +
                "    <br>\n" +
                "Img:" +
                "    <br>\n" +
                "<img src=\""+info.getImg() +"\">" +
                "    <br>\n" +
                "\n" +
                "    <hr>\n" +
                "    <br>\n" +
                "    <h2>其他选项</h2>\n" +
                "    <a href=\"/index.html\">返回首页</a>\n" +
                "    <a href=\"/addShopping\">加入购物车</a>\n" +
                "    <a href=\"/seeShopping\">查看购物车</a>\n" +
                "</div>\n" +
                "</body>\n" +
                "</html>");
        //输出其他信息
    }
}
```

```java
package com.example.session.work7.work2;

import com.example.session.bean.CellPone;
import com.example.session.bean.ShoppingCar;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 类<code>Doc</code>用于：TODO
 * 购物车显示
 * 通过context / session
 *
 * @author 12824
 * @version 1.0
 * @date 2021-08-20
 */
@WebServlet("/seeShopping")
public class ShoppingCars extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //get session shopping car
        final HttpSession session = req.getSession();
        final ShoppingCar shoppingCar = (ShoppingCar) session.getAttribute("ShoppingCar");
        resp.setHeader("Content-Type","text/html;charset=utf-8");
        if (shoppingCar==null||shoppingCar.getShoppingInfo()==null){

            resp.getWriter().println("商品车为空");
            /*跳转*/

            resp.setHeader("refresh", "2;url="+req.getContextPath()+"/index.html");
        }
        //display all information
        final List<CellPone> shoppingInfo = shoppingCar.getShoppingInfo();

        final Iterator<CellPone> iterator = shoppingInfo.iterator();
        List<String> names = new ArrayList<>();
        for (Iterator<CellPone> it = iterator; it.hasNext(); ) {
            CellPone i = it.next();
            names.add(i.getName());
        }
        //to index
        resp.getWriter().println("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>购物车</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<div align=\"center\">\n" +
                "    <h2>购物车信息</h2>\n"
        );
        for (String s:
             names) {
            resp.getWriter().println("<br>"+s+"<br>"+"<hr>");
        }

        resp.getWriter().println(
                "    <h2>其他选项</h2>\n" +
                "    <a href=\"/index.html\">返回首页</a>\n" +
                "    <a href=\"/addShopping\">加入购物车</a>\n" +
                "    <a href=\"/seeShopping\">查看购物车</a>\n" +
                "</div>\n" +
                "</body>\n" +
                "</html>");


    }
}
```

```java
package com.example.session.work7.work2;

import com.example.session.bean.CellPone;
import com.example.session.bean.ShoppingCar;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 类<code>Doc</code>用于：TODO
 * 加入到购物车
 *
 * @author 12824
 * @version 1.0
 * @date 2021-08-20
 */
@WebServlet("/addShopping")
public class AddShoppingCar extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获得shopping session 信息
        final HttpSession session = req.getSession();
        final CellPone shopping = (CellPone) session.getAttribute("shopping");
        //get list
        ShoppingCar shoppingCar = (ShoppingCar) session.getAttribute("ShoppingCar");
        //gei list judge
        if (shoppingCar == null) {
            shoppingCar = new ShoppingCar();
            final List<CellPone> objects = new ArrayList<>();
            objects.add(shopping);
            shoppingCar.setShoppingInfo(objects);
            //add list ot session
            session.setAttribute("ShoppingCar", shoppingCar);
            /*to index*/
            resp.sendRedirect(getServletContext().getRealPath("index.html"));
        } else {
            //add to car list
            final List<CellPone> objects = shoppingCar.getShoppingInfo();
            objects.add(shopping);
            shoppingCar.setShoppingInfo(objects);
            //add list ot session
            session.setAttribute("ShoppingCar", shoppingCar);
            resp.setHeader("Content-Type", "text/html;charset=utf-8");

            //显示加入商品成功了
            resp.getWriter().println("加入购物车成功,即将跳转回首页");

            /*to index*/
            resp.setHeader("refresh", "2;url=" + req.getContextPath() + "/index.html");
        }
        //to index
    }
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<body>
<div align="center">
    <h2>商品界面</h2>
    <br/>
    <a href="/shoppingInfo/p50">华为p50</a>
    <br>
    <hr>
    <a href="/shoppingInfo/888">小米火龙888</a>
    <br>
    <hr>
        <a href="/shoppingInfo/iphone12">iphone12</a>
    <br>
    <hr>
    <a href="/seeShopping">查看购物车</a>
</div>

</body>
</html>
```

效果:

![image-20210820235035259](Session%E4%BD%9C%E4%B8%9A.assets/image-20210820235035259.png)

![image-20210820235048107](Session%E4%BD%9C%E4%B8%9A.assets/image-20210820235048107.png)

![image-20210820235056223](Session%E4%BD%9C%E4%B8%9A.assets/image-20210820235056223.png)

![image-20210820235401186](Session%E4%BD%9C%E4%B8%9A.assets/image-20210820235401186.png)
