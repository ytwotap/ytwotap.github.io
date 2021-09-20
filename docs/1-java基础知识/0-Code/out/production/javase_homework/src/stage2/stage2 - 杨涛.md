```java
package src.stage2;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-18
 */

import org.junit.Test;

import java.awt.*;
import java.util.Scanner;

/**
 * 类<code>Doc</code>用于：TODO
 * <p>
 * > 需求1
 * <p>
 * - 在一阶段的基础上，提取出方法，简化main方法
 * - 至少要提取出一个方法
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-18
 */
public class Demo2{
    public static void main(String[] args) {
        Menu menu = new Menu();
        while (Menu.isStart==1){
            /*开始页面开始*/
            menu.getStartPage();
            /*get print NUmber*/
            String data= menu.getData();;
            menu.chooseNumber(Integer.parseInt(data));

        }

    }
}
 class Menu {
    static int isStart = 1;//1启动 0关闭
    /*注意 scanner  最好全局 ，不是 提前关闭scanner会导致 system.in 中 static final in 被释放。 第二次使用scanner出现问题*/
    Scanner scanner;
    //student info
    int EndCount = 0;
    static final int max_number = 3;
    String[] student = new String[max_number];

    /*start*/
    @Test
    public void start() {
        while (isStart == 1) {
            /*开始页面开始*/
            getStartPage();
            /*get print NUmber*/
            chooseNumber(Integer.parseInt(getData()));
        }
    }

    /**
     * get print data
     *
     * @return string , this print
     */
    public String getData() {
        String number = null;
        //get data
        scanner = new Scanner(System.in);
        if (scanner.hasNext()) {
            /*接受*/
            number = scanner.next();
        }
//        scanner.close();
        return number;
    }

    /**
     * 选择 输入的选项
     *
     * @param number
     */
    public void chooseNumber(int number) {
        switch (number) {
            case 0:
                System.out.println("print is error,please print 1-6");
                break;
            case 1:
                printAllStudentInfo();
                break;
            case 2:
                //get student name ;
                //add
                /*print boolean*/
                System.out.println("please print this student name");
                System.out.println("add:"+addStudent(getData()));
                break;
            case 3:
                System.out.println("you want delete student name?");
                deleteStudent(getData());
                break;
            case 4:
                System.out.println("please print you want to find  student name");
                String inarrStudent=getData();
                System.out.println("print you now update name to ?");
                String updateStudent=getData();
                updateSutdent(inarrStudent,updateStudent);
                break;
            case 5:
                System.out.println("you want to find student number's name?");
                System.out.println(getStudentName(getData()));
                break;
            case 6:
                System.out.println("确认退出吗（1/2）");
                Integer getConfirm =Integer.parseInt( getData());
                if (getConfirm == 1) {
                    isStart = 0;
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
    public void getStartPage() {
        System.out.println("-----------------王道Java学生管理系统-----------------");
        System.out.println("                   1.学生列表                        ");
        System.out.println("                   2.增加学生                        ");
        System.out.println("                   3.删除学生                        ");
        System.out.println("                   4.修改学生                        ");
        System.out.println("                   5.查询学生                        ");
        System.out.println("                   6.退出系统                        ");
        System.out.print("请选择功能（1-6）：");
    }

    /*to String all student info
     * return void
     * */
    public void printAllStudentInfo() {
        System.out.println("-----------------------");
        //count number
        int count = 0;
        for (String st1 : this.student) {
            /*null */
            if(EndCount==0){
                System.out.println("null");
                break;
            }
            //for number is < endcount ;
            if (count < EndCount) {
                System.out.println("student "+count+":"+st1);
                count++;
            } else {
                //exit the loop;
                break;
            }
            //count <=endcount
        }
        System.out.println("-----------------------");
    }

    /**
     * add a student information
     */
    public boolean addStudent(String studentName) {
        //judge is no null！
        if (EndCount >= max_number) {
            //add false
            return false;
        }
        /*ADD*/
        this.student[this.EndCount] = studentName;
        //++
        EndCount++;
        return true;
        //add student
        //return true
    }

    /*delete */
    public boolean deleteStudent(String name) {
        /*is null?*/
        if (EndCount == 0) {
            /*return false and sout */
            System.out.println("delete can't success,because String [] is null ");
            return false;
            //else
        } else {
            //find name in string[];
            //count number
            int count = 0;
            //for
            for (String st1 : this.student) {
                //for number is < endcount ;
                if (count < EndCount) {
                    //find return true;
                    //find
                    if (name.equals(st1)) {
                        //delect and forward.
                        // move student to this delete number.
                        if ((EndCount - 1) == count) { //end ,and string [] not null;
                            this.student[count] = null;
                        } else {
                            //forward all element  after count;
                            for (int i = 0; EndCount - count - 1 > i; i++) {
                                this.student[count + i] = this.student[count + i + 1];
                            }
                        }
                        /*element coun --*/
                        EndCount--;
                        System.out.println("delete ok！return true");
                        return true;
                    }
                    count++;
                } else{
                    break;
                }

            }
            // not find ; return false and sout not find this name in string [];
            System.out.println("not find this student name in string[] .return false");
            return false;
        }
    }

    /*update*/
    public boolean updateSutdent(String name,String updateName){
        /*is null?*/
        if(EndCount!=0){
            /*no ,find name*/
            int count=0;
                for(String st:this.student){
                    /*find , update and return true*/
                    if (count<EndCount){
                        if(st.equals(name)){
                            this.student[count]=updateName;
                            return true;
                        }else{
                            //++
                            count++;
                        }
                    }else{
                        /*no find ,return false and sout */
                        System.out.println("no find string name,and update is false");
                        return false;
                    }

                }
        }
        System.out.println("string[] is null; and update is false");
        return false;
    }
    /*get student info*/

    /**
     *
     * @param name print get string name
     * @return int, this string name subscript; -1 is not find
     */
    public int getStudentName(String name){
        /*loop all */
        /*is null?*/
        if(this.EndCount!=0){
            /*no ,find name*/
            int count=0;
            for(String st:this.student){
                /*find , update and return true*/
                if (count<EndCount){
                    if(st.equals(name)){
                        return count;
                    }else{
                        //++
                        count++;
                    }
                }
            }
        }

        /*no find , */
        return -1;
    }
}
```

![image-20210703224426980](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210703224426980.png)

![image-20210703224439038](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210703224439038.png)

