1.分别键盘输入文件名 和 文件内容，并按照文件名保存相应的内容

```java
package src.day16.homework;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.FileNameMap;
import java.util.Scanner;

/**
 * 类<code>Doc</code>用于：TODO
 *1.分别键盘输入文件名 和 文件内容，并按照文件名保存相应的内容
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo1 {
    private static final Scanner scanner=new Scanner(System.in);
    private static String FileName;
    private static String fileContent;
    private String fileName;
    public static void main(String[] args) {
        //scanner file name;
        System.out.println("print file name");
        FileName=getScanner();
        System.out.println("print the file content");
        //scaner file content;
        fileContent=getScanner();
        //new object
        FileOutputStream out=null;
        try {
            //new object
           out=new FileOutputStream(FileName);
            //write file ;
            out.write(fileContent.getBytes());
            System.out.println("create file is ok！");
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (out!=null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
//        close
    }
    public static String getScanner(){
        //get
        return scanner.nextLine();
    }
}

```



![image-20210628225742163](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628225742163.png)

![image-20210628225835796](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628225835796.png)

2.键盘输入文件名，文件内容，按照输入的文件名，文件内容保存。要求输入内容的时候可以多次追加写入，以一个约定字符串表示结束输出内容，比如当输入end时表示终止内容输入。

```java
package src.day16.homework;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Scanner;

/**
 * 类<code>Doc</code>用于：TODO
 * 2.键盘输入文件名，文件内容，按照输入的文件名，文件内容保存。要求输入内容的时候可以多次追加写入，
 * 以一个约定字符串表示结束输出内容，比如当输入end时表示终止内容输入。
 *
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo2 {
    private static final Scanner scanner = new Scanner(System.in);
    private static String FileName;
    private static String fileContent;
    private String fileName;


    public static void main(String[] args) {
        //scanner file name;
        System.out.println("print file name");
        FileName = getScanner();
        //new object
        FileOutputStream out = null;
        try {
            //new object
            out = new FileOutputStream(FileName);
            /*多次输入*/
            while (true) {
                System.out.println("print the file content");
                //scaner file content;
                fileContent = getScanner();
                //write file ;
                out.write(fileContent.getBytes());
                // 继续输入判断
                System.out.println("Do you want to enter again");
                System.out.print("1 is again, 2 is do't enter. 1/2 :");
                if(Integer.parseInt(getScanner())==2){
                    break;
                }
            }
            System.out.println("you operator is end! ");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
//        close
    }

    public static String getScanner() {
        //get
        return scanner.nextLine();
    }
}
```

![image-20210628230901450](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628230901450.png)

![image-20210628231014344](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628231014344.png)

2.定义一个这样的一个words数组，数组中每个字符串的格式为“词性:单词”

String[] words = {"verb:eat","verb:drink","verb:sleep","verb:play","noun:rice","noun:meat","noun:hand","noun:hair"};

根据单词性质动词verb全部存入verb.txt文件中

根据单词性质名词noun全部存入noun.txt文件中

```java
package src.day16.homework;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 类<code>Doc</code>用于：TODO
 *2.定义一个这样的一个words数组，数组中每个字符串的格式为“词性:单词”
 *
 * String[] words = {"verb:eat","verb:drink","verb:sleep","verb:play","noun:rice","noun:meat","noun:hand","noun:hair"};
 *
 * 根据单词性质动词verb全部存入verb.txt文件中
 *
 * 根据单词性质名词noun全部存入noun.txt文件中
 * @author 12824
 * @version 1.0
 * @date 2021-06-28
 */
public class Demo3 {
    public static void main(String[] args) throws IOException {
        String[] words = {"verb:eat","verb:drink","verb:sleep","verb:play","noun:rice","noun:meat","noun:hand","noun:hair"};
        //new object
        FileOutputStream outVerb=new FileOutputStream("verb.txt");
        FileOutputStream outNoun=new FileOutputStream("noun.txt");

        //遍历 数组
        for (String word:words){
            //判断 数组类型
            if (word.contains("verb")) {
                //write
                outVerb.write(word.substring(5).getBytes());
                outVerb.write("\n".getBytes());
            }else{
                //write noun
                outNoun.write(word.substring(5).getBytes());
                outNoun.write("\n".getBytes());
            }
        }
        //close
        outNoun.close();
        outVerb.close();
    }

}
```

noun.txt

![image-20210628232837395](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628232837395.png)

verb.txt

![image-20210628232857120](../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210628232857120.png)

