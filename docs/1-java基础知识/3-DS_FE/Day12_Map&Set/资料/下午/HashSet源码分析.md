HashSet源码分析

```java\
HashSet<String> hashSet = new HashSet<>();
hashSet.add("zs");
hashSet.add("ls");

HashSet<String> hashSet1 = new HashSet<>(hashSet);
System.out.println(hashSet1);
```

```java
class HashSet{
    
    HashMap<E,Object> map;
    static final Object PRESENT = new Object();// 仅仅只是用来填充底层map的value值
    
    public HashSet() {
        map = new HashMap<>();
    }
    
    public HashSet(int initialCapacity) {
        map = new HashMap<>(initialCapacity);
    }
    
    public HashSet(int initialCapacity, float loadFactor) {
        map = new HashMap<>(initialCapacity, loadFactor);
    }
    
    public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }
    
    public HashSet(Collection<? extends E> c) {
        map = new HashMap<>(Math.max(     (c.size()/.75f) + 1  , 16    ));
        addAll(c);
    }
    
    public boolean addAll(Collection<? extends E> c) {
        boolean modified = false;
        for (E e : c)
            if (add(e))
                modified = true;
        return modified;
    }
    
}
```

