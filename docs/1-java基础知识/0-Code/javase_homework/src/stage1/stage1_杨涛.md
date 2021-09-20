```java
package src.stage1;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-18
 */

import org.junit.Test;

import java.util.Scanner;

/**
 * 类<code>Doc</code>用于：TODO
 *
 *该菜单在实现某个功能后会重复出现，除非用户输入6退出该系统
 * 提示：需要使用死循环
 * @author 12824
 * @version 1.0
 * @date 2021-06-18
 */

public class Demo1{
    public static void main(String[] args) {
        Menu menu = new Menu();
        while (Menu.isStart==1){
            /*开始页面开始*/
            menu.getStartPage();
            /*get print NUmber*/
            int data= menu.getData();;
            menu.chooseNumber(data);
        }

    }
}
class Menu {
   static int isStart=1;//1启动 0关闭
    Scanner scanner;
    /*start*/


    /**
     * get print data
     * @return
     */

    public int getData(){
        int number = 0;
        //get data
        scanner=new Scanner(System.in);
        if(scanner.hasNext()){
            /*接受*/
            number=scanner.nextInt();
        }
//        scanner.close();
        return number;
    }

    /**
     * 选择 输入的选项
     * @param number
     */
    public void chooseNumber(int number){
        switch (number){
            case 0:
                System.out.println("print is error,please print 1-6");
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            case 5:

                break;
            case 6:
                System.out.println("确认退出吗（1/2）");
                int data = getData();
                if(data==1){
                    isStart=0;
                    System.out.println("感谢使用本系统！");
                }
                scanner.close();
                break;
            default:
                System.out.println("run switch");
        }
    }

    /**
     * 页面实现。
     */
    @Test
    public void getStartPage(){
            System.out.println("-----------------王道Java学生管理系统-----------------");
            System.out.println("                   1.学生列表                        ");
            System.out.println("                   2.增加学生                        ");
            System.out.println("                   3.删除学生                        ");
            System.out.println("                   4.修改学生                        ");
            System.out.println("                   5.查询学生                        ");
            System.out.println("                   6.退出系统                        ");
            System.out.print("请选择功能（1-6）：");
    }
}
```

![image-20210703175304058](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210703175304058.png)