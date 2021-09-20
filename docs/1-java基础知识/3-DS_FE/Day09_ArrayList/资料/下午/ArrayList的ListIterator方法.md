ArrayList的ListIterator方法

```java
        ArrayList<String> list = new ArrayList<>();
        list.add("zs");
        list.add("ls");
        list.add("wu");
        list.add("zl");

     ListIterator<String> iterator1 = list.listIterator( list.size() );
```



```java
class ArrayList{
    
    
    
    public ListIterator<E> listIterator() {
        return new ListItr(0);
    }
    public ListIterator<E> listIterator(int index) {
        if (index < 0 || index > size)
            throw new IndexOutOfBoundsException("Index: "+index);
        return new ListItr(index);
    }
    
    private class ListItr extends Itr implements ListIterator<E> {
         int cursor;       //  下一个遍历
        int lastRet = -1; // 上一个遍历
        int expectedModCount = modCount;
        
        ListItr(int index) {
            super();
            cursor = index;
        }
        
        //          zs          ls        wu        zl
        //                                                 cursor
        // lastRet
        //                                           i
        
        //          zs          ls        wu        zl
        //                                         cursor
        //                                         lastRet
        //                                           i
        
        //          zs          ls        wu        zl
        //                               cursor
        //                               lastRet
        //                                i
        public E previous() {
            checkForComodification();
            int i = cursor - 1;
            if (i < 0)
                throw new NoSuchElementException();
            Object[] elementData = ArrayList.this.elementData;
            if (i >= elementData.length)
                throw new ConcurrentModificationException();
            cursor = i;
            return (E) elementData[lastRet = i];
        }
        
        
        public boolean hasPrevious() {
            return cursor != 0;
        }

      
        
       

        public boolean hasNext() {
            return cursor != size;
        }

        //          zs          ls        wu        zl
        //                               cursor
        //                               lastRet
        //                                i
        
       //          zs          ls        wu        zl
        //                                       cursor
        //                               lastRet
        //                                i
        @SuppressWarnings("unchecked")
        public E next() {
            checkForComodification();
            int i = cursor;
            if (i >= size)
                throw new NoSuchElementException();
            Object[] elementData = ArrayList.this.elementData;
            if (i >= elementData.length)
                throw new ConcurrentModificationException();
            cursor = i + 1;
            return (E) elementData[lastRet = i];
        }

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


      
        public int nextIndex() {
            return cursor;
        }

        public int previousIndex() {
            return cursor - 1;
        }

        //          zs          ls        wu        zl
        //                                       cursor
        //                               lastRet
        //                                i

        public void set(E e) {
            if (lastRet < 0)
                throw new IllegalStateException();
            checkForComodification();

            try {
                ArrayList.this.set(lastRet, e);
            } catch (IndexOutOfBoundsException ex) {
                throw new ConcurrentModificationException();
            }
        }
        
        //          zs          ls        wu        zl
        //                                       cursor
        //                               lastRet
        //                                i

        //          zs          ls        wu        aaa       zl
        //                                                  cursor
        // lastRet
        //                                          i


        public void add(E e) {
            checkForComodification();

            try {
                int i = cursor;
                ArrayList.this.add(i, e);
                cursor = i + 1;
                lastRet = -1;
                expectedModCount = modCount;
            } catch (IndexOutOfBoundsException ex) {
                throw new ConcurrentModificationException();
            }
        }
    }
    
    
}
```

