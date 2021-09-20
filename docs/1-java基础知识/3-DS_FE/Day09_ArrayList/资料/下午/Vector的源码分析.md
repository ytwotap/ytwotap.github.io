Vector的源码分析



```java
//        1, Vector是List接口的一个子实现 (List: jdk1.2  Vector: JDK1.0)
//        2, 描述的数据结构是线性表
//        3, 底层结构是数组
//        4, 底层的默认的初始长度 10 ,  数组扩容机制
//        5, 有序
//        6, 允许重复
//        7, 允许存储null
//        8, Vector线程安全的

        Vector<String> vector = new Vector<>();
```



```java
class Vector{
    
    Object [] elementData;
    int capacityIncrement;
    int elementCount; 
    
    public Vector() {
        this(10);
    }
    public Vector(int initialCapacity) {
        this(initialCapacity, 0);
    }
    //                        10                   0
    public Vector(int initialCapacity, int capacityIncrement) {
        super();
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        this.elementData = new Object[initialCapacity];
        this.capacityIncrement = capacityIncrement;
    }
    
   public synchronized boolean add(E e) {
        modCount++;
       //                       10 + 1                
        ensureCapacityHelper(elementCount + 1);
        elementData[elementCount++] = e;
        return true;
    }

   private void ensureCapacityHelper(int minCapacity) {
        //  11            - 10 > 0
        if (minCapacity - elementData.length > 0)
            grow(minCapacity);
    }

    private void grow(int minCapacity) {
        // oldCapacity = 10
        int oldCapacity = elementData.length;
        // newCapacity = 如果没有增量(增量小于1) 扩为原来的2倍
        //  newCapacity = 如果有增量(增量大于等于1) 扩为原来长度+增量
        int newCapacity = oldCapacity + (
            (capacityIncrement > 0) ? capacityIncrement : oldCapacity);
        
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
    
}
```

