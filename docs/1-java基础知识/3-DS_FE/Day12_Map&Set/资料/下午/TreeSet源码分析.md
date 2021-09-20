TreeSet源码分析

```java
//        TreeSet()
//        构造一个新的空 set，该 set 根据其元素的自然顺序进行排序。

        TreeSet<String> treeSet = new TreeSet<>();
```

```java
class TreeSet{
    
    NavigableMap<E,Object> m;
    
    public TreeSet() {
        this(new TreeMap<E,Object>());
    }
    
    TreeSet(NavigableMap<E,Object> m) {
        this.m = m;
    }
    
}
```

