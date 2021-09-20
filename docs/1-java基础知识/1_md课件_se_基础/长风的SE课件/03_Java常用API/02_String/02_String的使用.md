# String API

> String是开发中最常见的需要操作的对象，没有之一
>
> String天天见，所以我们要对String的操作至少有个脸熟，大概知道String类能做什么
>
> 以下方法不要求都背住，但是应该能够了解有这些方法，并可以在  实际开发中随着使用而熟记





> String类的判断功能

```java 
//用来比较字符串的内容，注意区分大小写
boolean equals(Object obj)
    
//忽略字符串大小写比较字符串内容，常见用于比较网址URL
boolean equalsIgnoreCase(String str)
    
//判断当前字符串对象是否包含，目标字符串的字符序列，常见用于确定是否有盗链行为
boolean contains(String str)
    
//判断当前字符串对象，是否已目标字符串的字符序列开头
boolean startsWith(String str)
    
//判断当前字符串，是否以目标字符串对象的字符序列结尾，常用于确定文件后缀名格式
boolean endsWith(String str)
    
//判断一个字符串，是不是空字符串
boolean isEmpty()
```





> String类的获取功能

```Java
// 获取当前字符串对象中，包含的字符个数
int length()  
    
//获取字符串对象代表字符序列中，指定位置的字符
char charAt(int index) 
    
//在当前字符串对象中查找指定的字符，如果找到就返回字符，首次出现的位置，如果没找到返回-1
//也可以填字符
int indexOf(int ch) 
    
//指定从当前字符串对象的指定位置开始，查找首次出现的指定字符的位置，(如果没找到返回-1)
//可以填入字符
int indexOf(int ch,int fromIndex) 
    
//查找当前字符串中，目标字符串首次出现的位置(如果包含)，找不到，返回-1
//这里的位置是指目标字符串的第一个字符,在当前字符串对象中的位置
int indexOf(String str)

//指定，从当前字符串对象的指定位置开始,查找首次出现的指定字符串的位置(如果没找到返回-1)
//这里的位置是指目标字符串的第一个字符,在当前字符串对象中的位置
int indexOf(String str,int fromIndex) ，

//返回字符串，该字符串只包含当前字符串中，从指定位置开始(包含指定位置字符)到结束的那部分字符串
String substring(int start) 
    
//返回字符串，只包含当前字符串中，从start位置开始(包含)，到end(不包含)指定的位置的字符串
String substring(int start,int end) 
```





> String类的转换功能

```Java
//获取一个用来表示字符串对象字符序列的，字节数组
byte[] getBytes()
    
//获取的是用来表示字符串对象字符序列的，字符数组
char[] toCharArray() 

//使用指定字符集，将字符编码成字节序列，并将结果存储到一个新的 byte 数组中
getBytes(String charsetName) 

//将字符从此字符串复制到目标字符数组
getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)
    
//把字符数组转换成字符串
static String valueOf(char[] chs)

//把各种基本数据类型和对象转换成字符串
static String valueOf(int i/double...)


//把字符串全部转化为小写
String toLowerCase() 
    
//把字符串全部转换为大写
String toUpperCase()

//字符串拼接，作用等价于 + 实现的字符串拼接
String concat(String str) 
```



> String类的其他功能

- 替换功能

  - ```Java
    // 在新的字符串中，用新(new)字符，替换旧(old)字符
    String replace(char old,char new)
        
    //在新的字符串中，用新的字符串(new), 替换旧(old)字符串
    String replace(String old,String new)
    ```

  - 需要注意的是，替换不是在原对象上替换，而是创建了新的对象

- 去除空格字符

  - ```Java
    //在新的字符串中，去掉开头和结尾的空格字符
    String trim() 
    ```



- 比较功能

  - ```Java
    String类的比较功能
    int compareTo(String str)
    int compareToIgnoreCase(String str)
    ```

  - 详解字符串如何能够比较大小？怎么比较呢？
  
  - 首先要明确字符串是由字符组成的，比较字符串的大小，首先要知道字符的大小如何比较
  
    - 单个字符如何比较大小呢？
      - 单个字符按照字典顺序去比较，实际上比较基于Unicode的编码值
      - 处在字典后面的字符编码值要大，就认为这个字符大
  
  - String类的compareTo()方法在比较时，通过查看源码，不难得出它是这么比较的
  
    - 从左往右逐个比较对应字符，如果出现某单个字符不相同，那么返回它们的编码值之差
      - 例如"bcd"和"abc"比较，直接在第一位b就能够确定，b的编码值比a大1
      - 所以该方法返回1，大于0的数
      - 认为"bcd"比"abc"大
    - 如果逐个字符都相同，则返回它们的长度之差
      - 例如"abc"和"abcd"比较，abc都是相同的，得不出结果
      - 由于"abcd"比"abc"长1位
      - 所以该方法返回-1，小于0的数
      - 认为"abc"比“abcd”小
    - 只有完全相同的字符串，才会返回0，认为它们相等
      - 比如"abc"和"abc"方法就会返回0
      - 认为它两相等



## Comparable接口

> 一个类实现了Comparable接口，就可以对这个类的对象（容器或集合）进行排序
>
> 称之为自然排序，其中的compareTo方法被称为它的自然比较方法~

- 实现此接口的类，其对象数组（array）或对象容器（collection）
  - 就可以通过**Arrays.sort()**或**Collections.sort()**进行自动排序
- 对于实现该接口的A类来说，其对象a1.compareTo(a2)方法返回值
  - 小于0，表示a1对象小于a2，在自然排序中处于前面的位置
  - 大于0，表示a1对象大于a2，在自然排序中处于后面的位置
  - 等于0，表示a1对象等于a2
- 除了compareTo方法，类中还有equals方法判断两个对象是否相等
  - 建议这两个方法同true同0，同false非0，这样从逻辑上更顺畅
    - 比如一个有序集合，compareTo认为不相等，equals方法认为相等，可能导致集合添加元素失败
  - 实际上，所有实现 Comparable 的 Java 核心类都具有与 equals 一致的自然排序
  - 两个方法都用成员变量的取值重写即可



## Comparator接口

> 一个类实现了Comparable接口，往往需要同时重写equals方法，这会增加一些思考量
>
> 并且也不是什么时候都能够去随心所欲的修改源码，或者实现一个接口
>
> 假如仅仅只是做一次比较，那么用匿名内部类或者lambda表达式
>
> 去使用带Comparator比较器的sort方法（Arrays和Conlections中都有该方法）会比较好

- Comparator接口中的compare方法表示一种排序规则，方法会返回一个int值
  - 该sort方法逐个比较容器中的每两个对象
    - 方法返回负数表示排序中，处在前面的位置
    - 方法返回正数表示排序中，处在后面的位置
  - 最终的效果和Comparable接口一样，但是这种方式需要直接改实体类代码，更灵活
- Comparator接口中看起来有两个抽象方法compare和equals
  - 但实际上只需要实现compare就可以了，因为任何类都有默认的equals实现
  - 它仍然是一个功能接口，可以使用lambda表达式

