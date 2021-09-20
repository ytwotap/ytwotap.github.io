ArrayList源码分析

```java
 ArrayList<String> list = new ArrayList<>();
        list.add("zs");
        list.add("ls");
        list.add("wu");
```



```java
class ArrayList{
    
    Object[] elementData; // 就是ArrayList底层所维护的数组
    Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
    int size;// 存储了多少个元素
    int DEFAULT_CAPACITY = 10;// 默认初始长度
    int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;// 最多允许存储多少个数据
    
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
    
   public boolean add(E e) {
       //                       0 + 1                     
        ensureCapacityInternal(size + 1);  
       
       // elementData: 长度为10 的空数组
       
        elementData[size++] = e;
        return true;
    }

    //                                         1
   private void ensureCapacityInternal(int minCapacity) {
       
       // 构造方法刚赋过值: 结果为真
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            //   10                       10           1
            minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
        }

       //                     10
        ensureExplicitCapacity(minCapacity);
    }
    
    //                                            10
     private void ensureExplicitCapacity(int minCapacity) {
        modCount++;

        //  10     -      0 > 0    
        if (minCapacity - elementData.length > 0)
            grow(minCapacity);// 扩容方法
    }
    
    //                       10
     private void grow(int minCapacity) {
        // oldCapacity = 0
        int oldCapacity = elementData.length;
         // newCapacity = 1.5倍oldCapacity = 0
        int newCapacity = oldCapacity + (oldCapacity >> 1);
         
         //  0   - 10  < 0
        if (newCapacity - minCapacity < 0)
            // newCapacity = 10
            newCapacity = minCapacity;
         
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
       
         // Arrays.copyOf 从旧数组复制出一个新数组
         // 新数组的长度: newCapacity = 10
         //  elementData: 长度为10的空数组
        elementData = Arrays.copyOf(elementData, newCapacity);
    }

    
    
}
```

