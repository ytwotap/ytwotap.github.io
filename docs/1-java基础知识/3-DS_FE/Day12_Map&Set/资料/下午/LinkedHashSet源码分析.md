LinkedHashSet源码分析

```java
    LinkedHashSet<String> set = new LinkedHashSet<>();
        set.add("zs");
```

```java
class LinkedHashSet {
   
 
    public LinkedHashSet() {
        super(16, .75f, true);
    }
}


class HashSet{
    
    HashMap m;
    HashSet(int initialCapacity, float loadFactor, boolean dummy) {
        map = new LinkedHashMap<>(initialCapacity, loadFactor);
    }

    
}
```

