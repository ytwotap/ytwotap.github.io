

**1.利用字符流去读取一个文本文件，每次读取一行，并将这行数据逆序，写入新的文本文件当中**

```java
package src.day18_io03.homework.Demo1;

import java.io.*;
import java.util.Arrays;

/**
 * 类<code>Doc</code>用于：TODO
 *1.利用字符流去读取一个文本文件，每次读取一行，并将这行数据逆序，写入新的文本文件当中
 * @author 12824
 * @version 1.0
 * @date 2021-06-29
 */
public class Demo1 {
    public static void main(String[] args) throws IOException {
        //new object
        BufferedReader bufferedReader = new BufferedReader(new FileReader("readline.txt"));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("readline_newReverse.txt"));
        //read a line
        String readline;
        //not null
        //read next line, null is end
        while ((readline=bufferedReader.readLine())!=null) {
            //并将这行数据逆序
            readline=new StringBuffer(readline).reverse().toString();
            //write a new txt file.
            bufferedWriter.write(readline);
                // '/n'
            bufferedWriter.newLine();
        }
        //close
        bufferedWriter.close();
        bufferedReader.close();
    }

}
```

readline.txt 

> ```txt
> will buffer the input from the specified file. Without buffering, each invocation of read() or readLine() could cause bytes to be read from the file, converted into characters, and then returned, which can be very inefficient.
> Programs that use DataInputStreams for textual input can be localized by replacing each DataInputStream with an appropriate BufferedReader.
> Since:
> 
> 1.1
> See Also:
> FileReader, InputStreamReader, java.nio.file.Files.newBufferedReader
> Author:
> Mark Reinhold
> 
> ```

readline_newReverse.txt

> ```txt
> .tneiciffeni yrev eb nac hcihw ,denruter neht dna ,sretcarahc otni detrevnoc ,elif eht morf daer eb ot setyb esuac dluoc )(eniLdaer ro )(daer fo noitacovni hcae ,gnireffub tuohtiW .elif deificeps eht morf tupni eht reffub lliw
> .redaeRdereffuB etairporppa na htiw maertStupnIataD hcae gnicalper yb dezilacol eb nac tupni lautxet rof smaertStupnIataD esu taht smargorP
> :ecniS
> 
> 1.1
> :oslA eeS
> redaeRdereffuBwen.seliF.elif.oin.avaj ,redaeRmaertStupnI ,redaeReliF
> :rohtuA
> dlohnieR kraM
> ```



**2.准备一个文本文件，其中包含英文 ,数字,  中文字符。**
设计一个方法

public static void encodeFile(File encodingFile, File encodedFile);

在这个方法中把encodingFile的内容进行加密，然后保存到encodedFile文件中。

```
加密算法：
数字：
如果不是9的数字，在原来的基础上加1，比如5变成6, 3变成4
如果是9的数字，变成0
字母字符：
如果是非z字符，向右移动一个，比如d变成e, G变成H
如果是z，z->a, Z-A。
字符需要保留大小写
非字母字符
比如',&^ 保留不变，中文也保留不变
```

```java
package src.day18_io03.homework.Demo2;

import java.io.*;
import java.util.Arrays;

/**
 * 类<code>Doc</code>用于：TODO
 *2.准备一个文本文件，其中包含英文 ,数字, 中文字符。 设计一个方法
 *
 * public static void encodeFile(File encodingFile, File encodedFile);
 *
 * 在这个方法中把encodingFile的内容进行加密，然后保存到encodedFile文件中
 *
 * 加密算法：
 * 数字：
 * 如果不是9的数字，在原来的基础上加1，比如5变成6, 3变成4
 * 如果是9的数字，变成0
 * 字母字符：
 * 如果是非z字符，向右移动一个，比如d变成e, G变成H
 * 如果是z，z->a, Z-A。
 * 字符需要保留大小写
 * 非字母字符
 * 比如',&^ 保留不变，中文也保留不变
 * @author 12824
 * @version 1.0
 * @date 2021-06-29
 */
public class Demo2 {
    public static void main(String[] args) throws IOException{
//        新建文件对象
        //new object
        File in = new File("original_file.txt");
        File out = new File("encodedFile.txt");
//        文件加密
        encodeFile(in, out);
    }

    //加密算法实现
    public static void encodeFile(File encodingFile, File encodedFile) throws IOException{
        //读取文件内容
        BufferedReader bufferedReader = new BufferedReader(new FileReader(encodingFile));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(encodedFile));
        //read a line
        String readline;
        //not null
        //read next line, null is end
        while ((readline=bufferedReader.readLine())!=null) {
            //加密运算
            readline=encodeline(readline);
            //write a new txt file.
            //加密存储
            bufferedWriter.write(readline);
            // '/n'
            bufferedWriter.newLine();
        }
        //close
        bufferedWriter.close();
        bufferedReader.close();


    }
    public static String encodeline(String data){
        //转换为byte
        byte[] bytes = data.getBytes();
        int i=0;
        //for 遍历
        for(byte by:bytes) {
            //判断类型 操作 利用编码。
            // number
            if (by>=48&&by<=57){
                //9
                if(by==57){
                    //9+1
                    bytes[i]=48;
                }
                else{
                    bytes[i]= (byte) (by+1);
                }
            }
            //char
            if ((by>=65&&by<=90)||(by>=97&&by<=122)){
                //z Z
                if((by==90)||(by==122)){
                    //z
                    if(by==90){
                        bytes[i]=65;

                    }
                    else{
                        bytes[i]=97;
                    }
                }
                else{
                    bytes[i]= (byte) (by+1);
                }
            }
            //not above , 非 asc II <0 || >127
            i++;
        }
        String s=new String(bytes);
        System.out.println(s);
        //return string
        return s;
    }
}
```

![image-20210629210446820](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210629210446820.png)

![image-20210629210429615](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210629210429615.png)



**3.解密在文件加密中生成的文件(解密刚才加密的文件)。**
设计一个方法

public static void decodeFile(File decodingFile, File decodedFile);

在这个方法中把decodingFile的内容进行解密，然后保存到decodedFile文件中。

```
解密算法：
数字：
如果不是0的数字，在原来的基础上减1，比如6变成5, 4变成3
如果是0的数字，变成9
字母字符：
如果是非a字符，向左移动一个，比如e变成d, H变成G
如果是a，a->z, A-Z。
字符需要保留大小写
非字母字符：
比如',&^ 保留不变，中文也保留不变
```

```java
package src.day18_io03.homework.Demo3;

import java.io.*;

/**
 * 类<code>Doc</code>用于：TODO
 * 3.解密在文件加密中生成的文件(解密刚才加密的文件)。
 * 设计一个方法
 *
 * public static void decodeFile(File decodingFile, File decodedFile);
 *
 * 在这个方法中把decodingFile的内容进行解密，然后保存到decodedFile文件中。
 *
 * 解密算法：
 * 数字：
 * 如果不是0的数字，在原来的基础上减1，比如6变成5, 4变成3
 * 如果是0的数字，变成9
 * 字母字符：
 * 如果是非a字符，向左移动一个，比如e变成d, H变成G
 * 如果是a，a->z, A-Z。
 * 字符需要保留大小写
 * 非字母字符：
 * 比如',&^ 保留不变，中文也保留不变
 * @author 12824
 * @version 1.0
 * @date 2021-06-29
 */
public class Demo3 {
    public static void main(String[] args) throws IOException{
//        新建文件对象
        //new object
        File in = new File("encodedFile.txt");
        File out = new File("decodedFile.txt");
//        文件解密
        decodeFile(in, out);

    }

    /**
     *  //解密算法实现
     * @param encodedFile 加密文件
     * @param decodedFile 解密文件
     * @throws IOException
     */

    public static void decodeFile(File encodedFile, File decodedFile) throws IOException{
        //读取文件内容
        BufferedReader bufferedReader = new BufferedReader(new FileReader(encodedFile));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(decodedFile));
        //read a line
        String readline;
        //not null
        //read next line, null is end
        while ((readline=bufferedReader.readLine())!=null) {
            //加密运算
            readline=decodeline(readline);
            //write a new txt file.
            //加密存储
            bufferedWriter.write(readline);
            // '/n'
            bufferedWriter.newLine();
        }
        //close
        bufferedWriter.close();
        bufferedReader.close();


    }
    public static String encodeline(String data){
        //转换为byte
        byte[] bytes = data.getBytes();
        int i=0;
        //for 遍历
        for(byte by:bytes) {
            //判断类型 操作 利用编码。
            // number
            if (by>=48&&by<=57){
                //9
                if(by==57){
                    //9+1
                    bytes[i]=48;
                }
                else{
                    bytes[i]= (byte) (by+1);
                }
            }
            //char
            if ((by>=65&&by<=90)||(by>=97&&by<=122)){
                //z Z
                if((by==90)||(by==122)){
                    //z
                    if(by==90){
                        bytes[i]=65;

                    }
                    else{
                        bytes[i]=97;
                    }
                }
                else{
                    bytes[i]= (byte) (by+1);
                }
            }
            //not above , 非 asc II <0 || >127
            i++;
        }
        //不能用bytes.tostring 方法 ，没有重写 只能打印地址。
        String s=new String(bytes);
        System.out.println(s);
        //return string
        return s;
    }
    //解密line
    public static String decodeline(String data){
        //转换为byte
        byte[] bytes = data.getBytes();
        int i=0;
        //for 遍历
        for(byte by:bytes) {
            //判断类型 操作 利用编码。
            // number
            if (by>=48&&by<=57){
                //9
                if(by==48){
                    //9+1
                    bytes[i]=57;
                }
                else{
                    bytes[i]= (byte) (by-1);
                }
            }
            //char
            if ((by>=65&&by<=90)||(by>=97&&by<=122)){
                //z Z
                if((by==65)||(by==97)){
                    //z
                    if(by==65){
                        bytes[i]=90;

                    }
                    else{
                        bytes[i]=122;
                    }
                }
                else{
                    bytes[i]= (byte) (by-1);
                }
            }
            //not above , 非 asc II <0 || >127
            i++;
        }
        //不能用bytes.tostring 方法 ，没有重写 只能打印地址。
        String s=new String(bytes);
        System.out.println(s);
        //return string
        return s;
    }


}
```

![image-20210629211727712](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210629211727712.png)

![image-20210629211735185](../../../../../../../../AppData/Roaming/Typora/typora-user-images/image-20210629211735185.png)



**4.写阶段7**





**5.完成阶段7的同学继续写阶段8**



备注:阶段7  阶段8 可以下周交
