ArrayDeque源码分析

```java
//        1, ArrayDeque 是Deque接口的一个具体子实现
//        2, ArrayDeque描述的数据结构是:  普通队列,  双端队列,   栈
//        3, 底层是个数组: 循环数组
//        4, 默认的初始容量 16,  扩容机制
//        5, 有序
//        6, 允许存储重复元素
//        7, 不允许存储null
//        8, 线程不安全

        ArrayDeque<String> deque = new ArrayDeque<>();
        deque.offer("zs");
        //....
        deque.offer("ls");
```

```java
class ArrayDeque{
    
    Object[] elements;
    
    public ArrayDeque() {
        elements = new Object[16];
    }
    
    public boolean offer(E e) {
        return offerLast(e);
    }
    public boolean offerLast(E e) {
        addLast(e);
        return true;
    }
    
    public void addLast(E e) {
        if (e == null)
            throw new NullPointerException();
        elements[tail] = e;
        if ( 
            (tail = (tail + 1) & 
             (elements.length - 1)) == head
        )
            doubleCapacity();
    }
    
    private void doubleCapacity() {
        assert head == tail;
        int p = head;
        int n = elements.length;
        int r = n - p;  // 
        int newCapacity = n << 1;
        if (newCapacity < 0)
            throw new IllegalStateException("deque too big");
        Object[] a = new Object[newCapacity];
        System.arraycopy(elements, p, a, 0, r);
        System.arraycopy(elements, 0, a, r, p);
        elements = a;
        head = 0;
        tail = n;
    }
    
}
```

