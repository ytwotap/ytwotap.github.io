HashMap的源码分析1-- 扩容机制

```java
//        1,  HashMap是Map接口一个具体实现
//        2,  HashMap的底层结构是 数组 + 链表 + 红黑树 (红黑树是jdk1.8版本新加的结构)
//        3,  数组的默认初始长度 16,   数组的扩容机制
//        4,  HashMap存储key是无序的
//        5,  HashMap不允许存储重复的key值 , 对于HashMap什么key的重复的定义是什么?
//        6,  HashMap允许存户 null 键
//        7,  HashMap线程不安全

        HashMap<String, String> map = new HashMap<>();
        map.put("zs", "18");
        map.put("ls", "19");
        map.put("wu", "20");
        map.put("zl", "21");
```

```java
class HashMap{
    
    Node<K,V>[] table;// hashmap的底层数组
    
    float loadFactor;// 加载因子
    float DEFAULT_LOAD_FACTOR = 0.75f;
    int threshold;// 阈值 = 加载因子 * 底层数组长度
     public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        // 如果上述添加完成 size 要加一
        // 如果存储元素大于阈值, 那么 要扩容
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
    
    // 假如第二次触发扩容方法: 存储元素是13
    //  假如全部默认的情况下
  
    final Node<K,V>[] resize() {
        // oldTab: 长度为16 的数组
        Node<K,V>[] oldTab = table;
        // oldCap = 16
        int oldCap = (oldTab == null) ? 0 : oldTab.length;
        
        // oldThr = 12
        int oldThr = threshold;
        
        
        int newCap, newThr = 0;
        
        
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }// newCap = 16 <<< 1 = 32
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                // newThr = 12 << 1 = 24
                newThr = oldThr << 1; // double threshold
        }
        else if (oldThr > 0) // initial capacity was placed in threshold
            newCap = oldThr;
        else {               // zero initial threshold signifies using defaults
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        // newCap = 32
        // newThr = 24
        if (newThr == 0) {
            float ft = (float)newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE);
        }
        // threshold = 24
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
        // 创建一个长度为32的数组
            Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        table = newTab;
        if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { // preserve order
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }
    
}
```

