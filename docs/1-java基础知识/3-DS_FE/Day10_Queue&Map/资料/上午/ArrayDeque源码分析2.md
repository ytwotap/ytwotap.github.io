ArrayDeque源码分析2

```java
//        ArrayDeque(int numElements)
//        构造一个初始容量能够容纳指定数量的元素的空数组双端队列。

        ArrayDeque<String> deque = new ArrayDeque<>(10);

```

```java
class ArrayDeque{
    
      private static final int MIN_INITIAL_CAPACITY = 8;
    
    public ArrayDeque(int numElements) {
        allocateElements(numElements);
    }
    
    private void allocateElements(int numElements) {
        
        // initialCapacity = 8
        int initialCapacity = MIN_INITIAL_CAPACITY;
   
        //  10 >= 8 : 真
        if (numElements >= initialCapacity) {
            
            // initialCapacity = 10
            initialCapacity = numElements;
            
            //initialCapacity:  1010
            
            
            // initialCapacity >>>  1     0101
            // |=                         1010
            //                            1111
            initialCapacity |= (initialCapacity >>>  1);
            
            
            // initialCapacity >>>  2     0011
            //                            1111
            //                            1111
            
            initialCapacity |= (initialCapacity >>>  2);
            
            // initialCapacity >>>  4     0000
            //                            1111
            //                            1111
            
            initialCapacity |= (initialCapacity >>>  4);
            initialCapacity |= (initialCapacity >>>  8);
            initialCapacity |= (initialCapacity >>> 16);
            
            // initialCapacity = 1111
            
            // initialCapacity = 10000 = 16
            initialCapacity++;

            // Too many elements, must back off
            if (initialCapacity < 0) 
                // Good luck allocating 2 ^ 30 elements
                initialCapacity >>>= 1;
        }
        
        // 
        elements = new Object[initialCapacity];
    }
    
    
    
    //                                     16
     private void allocateElements(int numElements) {
        
        // initialCapacity = 8
        int initialCapacity = MIN_INITIAL_CAPACITY;
   
        //  16 >= 8 : 真
        if (numElements >= initialCapacity) {
            
            // initialCapacity = 16
            initialCapacity = numElements;
            
            //initialCapacity:  10000
            
            
            // initialCapacity >>>  1     01000
            // |=                         10000
            //                            11000
            initialCapacity |= (initialCapacity >>>  1);
            
            
            // initialCapacity >>>  2     00110
            //                            11000
            //                            11110
            
            initialCapacity |= (initialCapacity >>>  2);
            
            // initialCapacity >>>  4     00001
            //                            11110
            //                            11111
            
            initialCapacity |= (initialCapacity >>>  4);
            initialCapacity |= (initialCapacity >>>  8);
            initialCapacity |= (initialCapacity >>> 16);
            
            // initialCapacity = 11111
            
            // initialCapacity = 100000 = 32
            initialCapacity++;

            // Too many elements, must back off
            if (initialCapacity < 0) 
                // Good luck allocating 2 ^ 30 elements
                initialCapacity >>>= 1;
        }
        
        // 
        elements = new Object[initialCapacity];
    }
}
```

