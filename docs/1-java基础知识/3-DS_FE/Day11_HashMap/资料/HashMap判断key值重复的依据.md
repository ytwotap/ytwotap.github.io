HashMap判断key值重复的依据

```java
        HashMap<User, String> map = new HashMap<>();
        map.put(new User("zs", 18), "18");
        map.put(new User("zs", 18), "18");
        System.out.println(map);
```

```java
class HashMap{
    
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
    
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
    
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
        
        
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        
        // n 是底层数组长度,   2的幂值
        // i = (n - 1) & hash 
        // hash和数组长度取模的下标 ----> i
        // p 就是 取模之后数组的对应下标位置
        if ((p = tab[i = (n - 1) & hash]) == null)
            // 如果这个要散列的下标位置, 从来没有存储过元素, 直接存储
            tab[i] = newNode(hash, key, value, null);
        else {
            // 如果这个要散列的下标位置, 已经存储过元素
            // 并且存储的元素是 p
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                // 重复, e和此时存储的key重复的结点
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
            
            if (e != null) { //e就是重复的结点
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    // 用新的value值覆盖旧的重复key的value
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
    
   Node<K,V> newNode(int hash, K key, V value, Node<K,V> next) {
        return new Node<>(hash, key, value, next);
    }
    
     static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;
     }
}

```

