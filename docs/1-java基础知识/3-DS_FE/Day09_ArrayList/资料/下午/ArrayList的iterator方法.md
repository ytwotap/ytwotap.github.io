ArrayList的iterator方法

```java
        ArrayList<String> list = new ArrayList<>();
        list.add("zs");
        list.add("ls");
        list.add("wu");
        list.add("zl");

		//   zs      ls     wu     zl

        Iterator<String> iterator = list.iterator();
```

```java
class ArrayList{
    
    public Iterator<E> iterator() {
        return new Itr();
    }
    private class Itr implements Iterator<E> {
        int cursor;       // 下一次要遍历的位置
        int lastRet = -1; // 刚刚遍历过的元素位置
        int expectedModCount = modCount;
        //          zs         ls        wu        zl
        //         cursor
        //lastRet
        //           i
        
       	//          zs         ls        wu        zl
        //                   cursor
        //        lastRet
        //           i
        
        //          zs         ls        wu        zl
        //                            cursor
        //                  lastRet
        //                     i
        
        
        //          zs        wu        zl
        //                            cursor
        //                  lastRet
        //                     i
        public E next() {
            checkForComodification();
            
            int i = cursor;
            Object[] elementData = ArrayList.this.elementData;
         
            cursor = i + 1;
            return (E) elementData[lastRet = i];
        }
        
             public boolean hasNext() {
            return cursor != size;
        }
        
        //          zs         ls        wu        zl
        //                            cursor
        //                  lastRet
        //                     i
        
        
        //          zs        wu        zl
        //                   cursor
        //lastRet
        //                     i

        public void remove() {
            if (lastRet < 0)
                throw new IllegalStateException();
            checkForComodification();

            try {
                ArrayList.this.remove(lastRet);
                cursor = lastRet;
                lastRet = -1;
                expectedModCount = modCount;
            } catch (IndexOutOfBoundsException ex) {
                throw new ConcurrentModificationException();
            }
        }

      
        final void checkForComodification() {
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
        }
    }

    
}
```

