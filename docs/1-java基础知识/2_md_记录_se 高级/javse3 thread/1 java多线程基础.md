# 1 java多线程基础

学习来源：

廖雪峰：java https://www.liaoxuefeng.com/wiki/1252599548343744/1304521607217185

javaguid:https://github.com/Snailclimb/JavaGuide/blob/master/docs/java/multi-thread/2020%E6%9C%80%E6%96%B0Java%E5%B9%B6%E5%8F%91%E5%9F%BA%E7%A1%80%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95%E9%A2%98%E6%80%BB%E7%BB%93.md

菜鸟教程：https://www.runoob.com/java/java-multithreading.html

segmentfault:https://segmentfault.com/a/1190000025189623

## 1 基础概念

![image-20210429121851843](https://raw.githubusercontent.com/ytwotap/imgCloud/main/typora/java%20_se/image-20210429121851843.png)

### 进程

在计算机中，我们把一个任务称为一个进程，浏览器就是一个进程，视频播放器是另一个进程，类似的，音乐播放器和Word都是进程。

某些进程内部还需要同时执行多个子任务。例如，我们在使用Word时，Word可以让我们一边打字，一边进行拼写检查，同时还可以在后台进行打印，我们把子任务称为线程。

进程和线程的关系就是：一个进程可以包含一个或多个线程，但至少会有一个线程。

```ascii
                        ┌──────────┐
                        │Process   │
                        │┌────────┐│
            ┌──────────┐││ Thread ││┌──────────┐
            │Process   ││└────────┘││Process   │
            │┌────────┐││┌────────┐││┌────────┐│
┌──────────┐││ Thread ││││ Thread ││││ Thread ││
│Process   ││└────────┘││└────────┘││└────────┘│
│┌────────┐││┌────────┐││┌────────┐││┌────────┐│
││ Thread ││││ Thread ││││ Thread ││││ Thread ││
│└────────┘││└────────┘││└────────┘││└────────┘│
└──────────┘└──────────┘└──────────┘└──────────┘
┌──────────────────────────────────────────────┐
│               Operating System               │
└──────────────────────────────────────────────┘
```

操作系统调度的最小任务单位其实不是进程，而是线程。常用的Windows、Linux等操作系统都采用抢占式多任务，如何调度线程完全由操作系统决定，程序自己不能决定什么时候执行，以及执行多长时间。

因为同一个应用程序，既可以有多个进程，也可以有多个线程，因此，实现多任务的方法，有以下几种：

多进程模式（每个进程只有一个线程）：

```ascii
┌──────────┐ ┌──────────┐ ┌──────────┐
│Process   │ │Process   │ │Process   │
│┌────────┐│ │┌────────┐│ │┌────────┐│
││ Thread ││ ││ Thread ││ ││ Thread ││
│└────────┘│ │└────────┘│ │└────────┘│
└──────────┘ └──────────┘ └──────────┘
```

多线程模式（一个进程有多个线程）：

```ascii
┌────────────────────┐
│Process             │
│┌────────┐┌────────┐│
││ Thread ││ Thread ││
│└────────┘└────────┘│
│┌────────┐┌────────┐│
││ Thread ││ Thread ││
│└────────┘└────────┘│
└────────────────────┘
```

多进程＋多线程模式（复杂度最高）：

```ascii
┌──────────┐┌──────────┐┌──────────┐
│Process   ││Process   ││Process   │
│┌────────┐││┌────────┐││┌────────┐│
││ Thread ││││ Thread ││││ Thread ││
│└────────┘││└────────┘││└────────┘│
│┌────────┐││┌────────┐││┌────────┐│
││ Thread ││││ Thread ││││ Thread ││
│└────────┘││└────────┘││└────────┘│
└──────────┘└──────────┘└──────────┘
```

### 进程 vs 线程

进程和线程是包含关系，但是多任务既可以由多进程实现，也可以由单进程内的多线程实现，还可以混合多进程＋多线程。

具体采用哪种方式，要考虑到进程和线程的特点。

和多线程相比，多进程的缺点在于：

- **创建进程比创建线程开销大，尤其是在Windows系统上；**
- **进程间通信比线程间通信要慢，因为线程间通信就是读写同一个变量，速度很快。**

而多进程的优点在于：

多进程稳定性比多线程高，因为在多进程的情况下，一个进程崩溃不会影响其他进程，而在多线程的情况下，任何一个线程崩溃会直接导致整个进程崩溃。

### 多线程

Java语言内置了多线程支持：**一个Java程序实际上是一个JVM进程，JVM进程用一个主线程来执行`main()`方法，在`main()`方法内部，我们又可以启动多个线程。**此外，JVM还有负责垃圾回收的其他工作线程等。

因此，对于大多数Java程序来说，我们说多任务，实际上是说如何使用多线程实现多任务。

和单线程相比，多线程编程的特点在于：多线程经常需要读写共享数据，并且需要同步。例如，播放电影时，就必须由一个线程播放视频，另一个线程播放音频，两个线程需要协调运行，否则画面和声音就不同步。因此，多线程编程的复杂度高，调试更困难。

Java多线程编程的特点又在于：

- 多线程模型是Java程序最基本的并发模型；
- 后续读写网络、数据库、Web开发等都依赖Java多线程模型。





## 2 创建新线程

### 2.1创建方式有哪些？

**继承Thread类、实现Runnable接口、基于Callable和Future接口、Timer是后台线程、线程池。**

### 2.2如何实现？

Java语言内置了多线程支持。当Java程序启动的时候，实际上是启动了一个JVM进程，然后，JVM启动主线程来执行`main()`方法。在`main()`方法中，我们又可以启动其他线程。

要创建一个新线程非常容易，我们需要实例化一个`Thread`实例，然后调用它的`start()`方法：

```java
public class Main {
    public static void main(String[] args) {
        Thread t = new Thread();
        t.start(); // 启动新线程
    }
}
```

#### 2.2.1 继承Thread类

```java
package com.company.Tread_3_interface_runable.Tread_2_extend_thread;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

import com.company.Tread_2_extend_thread.ThreadTest;

/**
 * 类<code>Doc</code>用于：TODO
 *实现Runnable
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

public class implement_runable implements Runnable{
    public static void main(String[] args) {
        implement_runable test=new implement_runable("test");
        Thread test2=new Thread(test);
        test2.start();

    }
    private final String name;
    public implement_runable(String name) {
        this.name=name;
    }

    @Override
    public void run() {
        System.out.println("this is :"+name);
    }
}

```

##### 2.2.1.1Thread 方法

下表列出了Thread类的一些重要方法：

| **序号** |                         **方法描述**                         |
| :------- | :----------------------------------------------------------: |
| 1        | **public void start()** 使该线程开始执行；**Java** 虚拟机调用该线程的 run 方法。 |
| 2        | **public void run()** 如果该线程是使用独立的 Runnable 运行对象构造的，则调用该 Runnable 对象的 run 方法；否则，该方法不执行任何操作并返回。 |
| 3        | **public final void setName(String name)** 改变线程名称，使之与参数 name 相同。 |
| 4        | **public final void setPriority(int priority)**  更改线程的优先级。 |
| 5        | **public final void setDaemon(boolean on)** 将该线程标记为守护线程或用户线程。 |
| 6        | **public final void join(long millisec)** 等待该线程终止的时间最长为 millis 毫秒。 |
| 7        |            **public void interrupt()** 中断线程。            |
| 8        | **public final boolean isAlive()** 测试线程是否处于活动状态。 |

测试线程是否处于活动状态。 上述方法是被Thread对象调用的。下面的方法是Thread类的静态方法。

| **序号** |                         **方法描述**                         |
| :------- | :----------------------------------------------------------: |
| 1        | **public static void yield()** 暂停当前正在执行的线程对象，并执行其他线程。 |
| 2        | **public static void sleep(long millisec)** 在指定的毫秒数内让当前正在执行的线程休眠（暂停执行），此操作受到系统计时器和调度程序精度和准确性的影响。 |
| 3        | **public static boolean holdsLock(Object x)** 当且仅当当前线程在指定的对象上保持监视器锁时，才返回 true。 |
| 4        | **public static Thread currentThread()** 返回对当前正在执行的线程对象的引用。 |
| 5        | **public static void dumpStack()** 将当前线程的堆栈跟踪打印至标准错误流。 |

##### 2.2.2 thread id探究 :

```java
/*set thread name,if you not set id , the thread object will set itself id in auto method*/
//        click.setName("threadClick");
        /*get name*/
        System.out.println(click.getName());
        /*set id
        *在 Thread class 中有如下的写法：
        * -------------------------------
        *  For generating thread ID
        * private static long threadSeqNumber;
        *     private static synchronized long nextThreadID() {
                    return ++threadSeqNumber;
                }
        * -------------------------------
        * 上面的写法实现了thread id的增长；
        */
        System.out.println(click.getId());
```





#### 2.2.2 实现Runnable 接口

```java
package com.company.Tread_3_interface_runable.Tread_2_extend_thread;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

import com.company.Tread_2_extend_thread.ThreadTest;

/**
 * 类<code>Doc</code>用于：TODO
 *实现Runnable
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

public class implement_runable implements Runnable{
    public static void main(String[] args) {
        implement_runable test=new implement_runable("test");
        Thread test2=new Thread(test);
        test2.start();

    }
    private final String name;
    public implement_runable(String name) {
        this.name=name;
    }

    @Override
    public void run() {
        System.out.println("this is :"+name);
    }
}

```

> 注意：runnable接口无start方法，要将实现runnable接口的类给thread class去实现



### 2.3线程的优先级

可以对线程设定优先级，设定优先级的方法是：

```
Thread.setPriority(int n) // 1~10, 默认值5
```

优先级高的线程被操作系统调度的优先级较高，操作系统对高优先级线程可能调度更频繁，但我们决不能通过设置优先级来确保高优先级的线程一定会先执行。

### 2.4 main和thread的区别

```
package com.company.Tread_3_interface_runable.Tread_mainAndThread.Tread_2_extend_thread;/**
 * 类<code>Doc</code>用于：TODO
 *lalmdba语法实现
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

/**
 * 类<code>Doc</code>用于：TODO
 *main方法和thread线程区别
 *main和thread实现的区别
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

public class MandAndThread {
    public static void main(String[] args) {
        System.out.println("main start");
        Thread newThread=new Thread(){
            @Override
            public void run() {
                super.run();
                System.out.println("thread start ");
                System.out.println("thread end");
            }
        };
        newThread.start();
        System.out.println("main end");
    }
}
```

我们用蓝色表示主线程，也就是`main`线程，`main`线程执行的代码有4行，首先打印`main start`，然后创建`Thread`对象，紧接着调用`start()`启动新线程。当`start()`方法被调用时，JVM就创建了一个新线程，我们通过实例变量`t`来表示这个新线程对象，并开始执行。

接着，`main`线程继续执行打印`main end`语句，而`t`线程在`main`线程执行的同时会并发执行，打印`thread run`和`thread end`语句。

当`run()`方法结束时，新线程就结束了。而`main()`方法结束时，主线程也结束了。

我们再来看线程的执行顺序：

1. `main`线程肯定是先打印`main start`，再打印`main end`；
2. `t`线程肯定是先打印`thread run`，再打印`thread end`。

但是，除了可以肯定，`main start`会先打印外，`main end`打印在`thread run`之前、`thread end`之后或者之间，都无法确定。因为从`t`线程开始运行以后，两个线程就开始同时运行了，并且由操作系统调度，程序本身无法确定线程的调度顺序。



## 3 线程生命周期

![Java 多线程编程| 菜鸟教程](https://www.runoob.com/wp-content/uploads/2014/01/java-thread.jpg)

- 新建状态:

  使用 **new** 关键字和 **Thread** 类或其子类建立一个线程对象后，该线程对象就处于新建状态。它保持这个状态直到程序 **start()** 这个线程。

- 就绪状态:

  当线程对象调用了start()方法之后，该线程就进入就绪状态。就绪状态的线程处于就绪队列中，要等待JVM里线程调度器的调度。

- 运行状态:

  如果就绪状态的线程获取 CPU 资源，就可以执行 **run()**，此时线程便处于运行状态。处于运行状态的线程最为复杂，它可以变为阻塞状态、就绪状态和死亡状态。

- 阻塞状态:

  如果一个线程执行了sleep（睡眠）、suspend（挂起）等方法，失去所占用资源之后，该线程就从运行状态进入阻塞状态。在睡眠时间已到或获得设备资源后可以重新进入就绪状态。可以分为三种：

  - 等待阻塞：运行状态中的线程执行 wait() 方法，使线程进入到等待阻塞状态。
  - 同步阻塞：线程在获取 synchronized 同步锁失败(因为同步锁被其他线程占用)。
  - 其他阻塞：通过调用线程的 sleep() 或 join() 发出了 I/O 请求时，线程就会进入到阻塞状态。当sleep() 状态超时，join() 等待线程终止或超时，或者 I/O 处理完毕，线程重新转入就绪状态。

- 死亡状态:

  一个运行状态的线程完成任务或者其他终止条件发生时，该线程就切换到终止状态。



### 3.1等待线程

一个线程还可以等待另一个线程直到其运行结束。例如，`main`线程在启动`t`线程后，可以通过`t.join()`等待`t`线程结束后再继续运行：

```java
package com.company.Tread_4_treadPriority;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

/**
 * 类<code>Doc</code>用于：TODO
 *test线程优先级
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */
public class ThreadPriorityJoin {
    public static void main(String[] args) throws InterruptedException {
        MyTread2 newTread=new MyTread2("yt");
        newTread.start();
        newTread.join(1000);
        /*可以通过`newTread.join()`等待`newTread`线程结束后再继续运行*/
        System.out.println("yt is end?");
    }
}

class MyTread2 extends Thread{
    private  String name;
    MyTread2(String name){
        this.name=name;
    }
    /*重载run方法*/
    @Override
    public void run() {
        super.run();
        for(int i=0;i<100;i++)
        {
            System.out.println("extend Thread is : "+this.name+"this number is: "+i);
        }
    }
}

```

### 3.2 中断线程



如果线程需要执行一个长时间任务，就可能需要能中断线程。中断线程就是其他线程给该线程发一个信号，该线程收到信号后结束执行`run()`方法，使得自身线程能立刻结束运行。

我们举个栗子：假设从网络下载一个100M的文件，如果网速很慢，用户等得不耐烦，就可能在下载过程中点“取消”，这时，程序就需要中断下载线程的执行。

中断一个线程非常简单，只需要在其他线程中对目标线程调用`interrupt()`方法，目标线程需要反复检测自身状态是否是interrupted状态，如果是，就立刻结束运行。

```java
package com.company.Tread_4_treadPriority;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

/**
 * 类<code>Doc</code>用于：TODO
 *中断线程
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */
public class Interrupt {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new MyThread();
        t.start();
        Thread.sleep(1); // 暂停1毫秒
        t.interrupt(); // 中断t线程
        t.join(); // 等待t线程结束
        System.out.println("end");
    }
}

class MyThread extends Thread {
    public void run() {
        int n = 0;
        while (! isInterrupted()) {
            n ++;
            System.out.println(n + " hello!");
        }
    }
}
```

另一个常用的中断线程的方法是设置标志位。我们通常会用一个`running`标志位来标识线程是否应该继续运行，在外部线程中，通过把`HelloThread.running`置为`false`，就可以让线程结束：

```java
// 中断线程
public class Main {
    public static void main(String[] args)  throws InterruptedException {
        HelloThread t = new HelloThread();
        t.start();
        Thread.sleep(1);
        t.running = false; // 标志位置为false
    }
}

class HelloThread extends Thread {
    public volatile boolean running = true;
    public void run() {
        int n = 0;
        while (running) {
            n ++;
            System.out.println(n + " hello!");
        }
        System.out.println("end!");
    }
}

```

注意到`HelloThread`的标志位`boolean running`是一个线程间共享的变量。线程间共享变量需要使用`volatile`关键字标记，确保每个线程都能读取到更新后的变量值。

为什么要对线程间共享的变量用关键字`volatile`声明？这涉及到Java的内存模型。在Java虚拟机中，变量的值保存在主内存中，但是，当线程访问变量时，它会先获取一个副本，并保存在自己的工作内存中。如果线程修改了变量的值，虚拟机会在某个时刻把修改后的值回写到主内存，但是，这个时间是不确定的！

```ascii
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
           Main Memory
│                               │
   ┌───────┐┌───────┐┌───────┐
│  │ var A ││ var B ││ var C │  │
   └───────┘└───────┘└───────┘
│     │ ▲               │ ▲     │
 ─ ─ ─│─│─ ─ ─ ─ ─ ─ ─ ─│─│─ ─ ─
      │ │               │ │
┌ ─ ─ ┼ ┼ ─ ─ ┐   ┌ ─ ─ ┼ ┼ ─ ─ ┐
      ▼ │               ▼ │
│  ┌───────┐  │   │  ┌───────┐  │
   │ var A │         │ var C │
│  └───────┘  │   │  └───────┘  │
   Thread 1          Thread 2
└ ─ ─ ─ ─ ─ ─ ┘   └ ─ ─ ─ ─ ─ ─ ┘
```

这会导致如果一个线程更新了某个变量，另一个线程读取的值可能还是更新前的。例如，主内存的变量`a = true`，线程1执行`a = false`时，它在此刻仅仅是把变量`a`的副本变成了`false`，主内存的变量`a`还是`true`，在JVM把修改后的`a`回写到主内存之前，其他线程读取到的`a`的值仍然是`true`，这就造成了多线程之间共享的变量不一致。

因此，`volatile`关键字的目的是告诉虚拟机：

- 每次访问变量时，总是获取主内存的最新值；
- 每次修改变量后，立刻回写到主内存。

`volatile`关键字解决的是可见性问题：当一个线程修改了某个共享变量的值，其他线程能够立刻看到修改后的值。

如果我们去掉`volatile`关键字，运行上述程序，发现效果和带`volatile`差不多，这是因为在x86的架构下，JVM回写主内存的速度非常快，但是，换成ARM的架构，就会有显著的延迟。

#### 小结

对目标线程调用`interrupt()`方法可以请求中断一个线程，目标线程通过检测`isInterrupted()`标志获取自身是否已中断。如果目标线程处于等待状态，该线程会捕获到`InterruptedException`；

目标线程检测到`isInterrupted()`为`true`或者捕获了`InterruptedException`都应该立刻结束自身线程；

通过标志位判断需要正确使用`volatile`关键字；

`volatile`关键字解决了共享变量在线程间的可见性问题。

### 3.3 守护线程

#### 3.3.4 守护进程定义：

**守护进程(daemon)**是一类在后台运行的特殊进程，用于执行特定的系统任务。很多守护进程在系统引导的时候启动，并且一直运行直到系统关闭。另一些只在需要的时候才启动，完成任务后就自动结束。

#### 3.3.4在java中的守护进程

Java程序入口就是由JVM启动`main`线程，`main`线程又可以启动其他线程。当所有线程都运行结束时，JVM退出，进程结束。

如果有一个线程没有退出，JVM进程就不会退出。所以，必须保证所有线程都能及时结束。

但是有一种线程的目的就是无限循环，例如，一个定时触发任务的线程：

```java
class TimerThread extends Thread {
    @Override
    public void run() {
        while (true) {
            System.out.println(LocalTime.now());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                break;
            }
        }
    }
}
```

#### 3.3.5 小结

守护线程是为其他线程服务的线程；

所有非守护线程都执行完毕后，虚拟机退出；

守护线程不能持有需要关闭的资源（如打开文件等）。

### 3.4 线程同步

当多个线程同时运行时，线程的调度由操作系统决定，程序本身无法决定。因此，任何一个线程都有可能在任何指令处被操作系统暂停，然后在某个时间段后继续执行。

这个时候，有个单线程模型下不存在的问题就来了：如果多个线程同时读写共享变量，会出现数据不一致的问题。

```java
public class Main {
    public static void main(String[] args) throws Exception {
        var add = new AddThread();
        var dec = new DecThread();
        add.start();
        dec.start();
        add.join();
        dec.join();
        System.out.println(Counter.count) ;
    }
}

class Counter {
    public static int count = 0;
}

class AddThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) { Counter.count += 1; }
    }
}

class DecThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) { Counter.count -= 1; }
    }
}

```

两个线程同时对一个`int`变量进行操作，一个加10000次，一个减10000次，最后结果应该是0，但是，每次运行，结果实际上都是不一样的。

这是因为对变量进行读取和写入时，结果要正确，必须保证是原子操作。原子操作是指不能被中断的一个或一系列操作。

例如，对于语句：

```
n = n + 1;
```

看上去是一行语句，实际上对应了3条指令：

```
ILOAD
IADD
ISTORE
```

我们假设`n`的值是`100`，如果两个线程同时执行`n = n + 1`，得到的结果很可能不是`102`，而是`101`，原因在于：

```ascii
┌───────┐    ┌───────┐
│Thread1│    │Thread2│
└───┬───┘    └───┬───┘
    │            │
    │ILOAD (100) │
    │            │ILOAD (100)
    │            │IADD
    │            │ISTORE (101)
    │IADD        │
    │ISTORE (101)│
    ▼            ▼
```

如果线程1在执行`ILOAD`后被操作系统中断，此刻如果线程2被调度执行，它执行`ILOAD`后获取的值仍然是`100`，最终结果被两个线程的`ISTORE`写入后变成了`101`，而不是期待的`102`。

这说明多线程模型下，要保证逻辑正确，对共享变量进行读写时，必须保证一组指令以原子方式执行：即某一个线程执行时，其他线程必须等待：

```ascii
┌───────┐     ┌───────┐
│Thread1│     │Thread2│
└───┬───┘     └───┬───┘
    │             │
    │-- lock --   │
    │ILOAD (100)  │
    │IADD         │
    │ISTORE (101) │
    │-- unlock -- │
    │             │-- lock --
    │             │ILOAD (101)
    │             │IADD
    │             │ISTORE (102)
    │             │-- unlock --
    ▼             ▼
```

通过加锁和解锁的操作，就能保证3条指令总是在一个线程执行期间，不会有其他线程会进入此指令区间。即使在执行期线程被操作系统中断执行，其他线程也会因为无法获得锁导致无法进入此指令区间。只有执行线程将锁释放后，其他线程才有机会获得锁并执行。这种加锁和解锁之间的代码块我们称之为临界区（Critical Section），任何时候临界区最多只有一个线程能执行。

可见，保证一段代码的原子性就是通过加锁和解锁实现的。Java程序使用`synchronized`关键字对一个对象进行加锁：

```
synchronized(lock) {
    n = n + 1;
}
```

`synchronized`保证了代码块在任意时刻最多只有一个线程能执行。我们把上面的代码用`synchronized`改写如下：

```
// 多线程
```

 Run

注意到代码：

```
synchronized(Counter.lock) { // 获取锁
    ...
} // 释放锁
```

它表示用`Counter.lock`实例作为锁，两个线程在执行各自的`synchronized(Counter.lock) { ... }`代码块时，必须先获得锁，才能进入代码块进行。执行结束后，在`synchronized`语句块结束会自动释放锁。这样一来，对`Counter.count`变量进行读写就不可能同时进行。上述代码无论运行多少次，最终结果都是0。

使用`synchronized`解决了多线程同步访问共享变量的正确性问题。但是，它的缺点是带来了性能下降。因为`synchronized`代码块无法并发执行。此外，加锁和解锁需要消耗一定的时间，所以，`synchronized`会降低程序的执行效率。

我们来概括一下如何使用`synchronized`：

1. 找出修改共享变量的线程代码块；
2. 选择一个共享实例作为锁；
3. 使用`synchronized(lockObject) { ... }`。

在使用`synchronized`的时候，不必担心抛出异常。因为无论是否有异常，都会在`synchronized`结束处正确释放锁：

```java
public void add(int m) {
    synchronized (obj) {
        if (m < 0) {
            throw new RuntimeException();
        }
        this.value += m;
    } // 无论有无异常，都会在此释放锁
}
```

我们再来看一个错误使用`synchronized`的例子：

```java
// 多线程
public class Main {
    public static void main(String[] args) throws Exception {
        var add = new AddThread();
        var dec = new DecThread();
        add.start();
        dec.start();
        add.join();
        dec.join();
        System.out.println(Counter.count);
    }
}

class Counter {
    public static final Object lock1 = new Object();
    public static final Object lock2 = new Object();
    public static int count = 0;
}

class AddThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) {
            synchronized(Counter.lock1) {
                Counter.count += 1;
            }
        }
    }
}

class DecThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) {
            synchronized(Counter.lock2) {
                Counter.count -= 1;
            }
        }
    }
}

```



**结果并不是0，这是因为两个线程各自的`synchronized`锁住的*不是同一个对象***！这使得两个线程各自都可以同时获得锁：因为JVM只保证同一个锁在任意时刻只能被一个线程获取，但两个不同的锁在同一时刻可以被两个线程分别获取。

因此，使用`synchronized`的时候，获取到的是哪个锁非常重要。锁对象如果不对，代码逻辑就不对。

我们再看一个例子：

```
// 多线程
public class Main {
    public static void main(String[] args) throws Exception {
        var ts = new Thread[] { new AddStudentThread(), new DecStudentThread(), new AddTeacherThread(), new DecTeacherThread() };
        for (var t : ts) {
            t.start();
        }
        for (var t : ts) {
            t.join();
        }
        System.out.println(Counter.studentCount);
        System.out.println(Counter.teacherCount);
    }
}

class Counter {
    public static final Object lock = new Object();
    public static int studentCount = 0;
    public static int teacherCount = 0;
}

class AddStudentThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) {
            synchronized(Counter.lock) {
                Counter.studentCount += 1;
            }
        }
    }
}

class DecStudentThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) {
            synchronized(Counter.lock) {
                Counter.studentCount -= 1;
            }
        }
    }
}

class AddTeacherThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) {
            synchronized(Counter.lock) {
                Counter.teacherCount += 1;
            }
        }
    }
}

class DecTeacherThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++) {
            synchronized(Counter.lock) {
                Counter.teacherCount -= 1;
            }
        }
    }
}

```

 Run

上述代码的4个线程对两个共享变量分别进行读写操作，但是使用的锁都是`Counter.lock`这一个对象，这就造成了原本可以并发执行的`Counter.studentCount += 1`和`Counter.teacherCount += 1`，现在无法并发执行了，执行效率大大降低。实际上，需要同步的线程可以分成两组：`AddStudentThread`和`DecStudentThread`，`AddTeacherThread`和`DecTeacherThread`，组之间不存在竞争，因此，应该使用两个不同的锁，即：

`AddStudentThread`和`DecStudentThread`使用`lockStudent`锁：

```
synchronized(Counter.lockStudent) {
    ...
}
```

`AddTeacherThread`和`DecTeacherThread`使用`lockTeacher`锁：

```
synchronized(Counter.lockTeacher) {
    ...
}
```

这样才能最大化地提高执行效率。

#### 3.4.1不需要synchronized的操作

JVM规范定义了几种原子操作：

- 基本类型（`long`和`double`除外）赋值，例如：`int n = m`；
- 引用类型赋值，例如：`List<String> list = anotherList`。

`long`和`double`是64位数据，JVM没有明确规定64位赋值操作是不是一个原子操作，不过在x64平台的JVM是把`long`和`double`的赋值作为原子操作实现的。

单条原子操作的语句不需要同步。例如：

```
public void set(int m) {
    synchronized(lock) {
        this.value = m;
    }
}
```

就不需要同步。

对引用也是类似。例如：

```
public void set(String s) {
    this.value = s;
}
```

上述赋值语句并不需要同步。

但是，如果是多行赋值语句，就必须保证是同步操作，例如：

```
class Pair {
    int first;
    int last;
    public void set(int first, int last) {
        synchronized(this) {
            this.first = first;
            this.last = last;
        }
    }
}
```

有些时候，通过一些巧妙的转换，可以把非原子操作变为原子操作。例如，上述代码如果改造成：

```
class Pair {
    int[] pair;
    public void set(int first, int last) {
        int[] ps = new int[] { first, last };
        this.pair = ps;
    }
}
```

就不再需要同步，因为`this.pair = ps`是引用赋值的原子操作。而语句：

```
int[] ps = new int[] { first, last };
```

这里的`ps`是方法内部定义的局部变量，每个线程都会有各自的局部变量，互不影响，并且互不可见，并不需要同步。

#### 3.4.2 小结

多线程同时读写共享变量时，会造成逻辑错误，因此需要通过`synchronized`同步；

同步的本质就是给指定对象加锁，加锁后才能继续执行后续代码；

注意加锁对象必须是同一个实例；

对JVM定义的单个原子操作不需要同步。



### 3.5 同步方法

var的介绍：http://ytwotap.cloud:8081/blog/15

```java
/*var 的使用*/
var name="ytwotap";
var age=10;
var money=3.1415926;
System.out.println(name.getClass());
System.out.println(age);
System.out.println(money);
```

我们知道Java程序依靠`synchronized`对线程进行同步，使用`synchronized`的时候，锁住的是哪个对象非常重要。

让线程自己选择锁对象往往会使得代码逻辑混乱，也不利于封装。更好的方法是把`synchronized`逻辑封装起来。例如，我们编写一个计数器如下：

```java
package com.company.Thread_6_synchronized;/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */

/**
 * 类<code>Doc</code>用于：TODO
 *
 * @author 12824
 * @version 1.0
 * @date 2021-04-29
 */
public class synchonized_2 {
    public static void main(String[] args) throws Exception {
        /*var 的使用*/
        var name="ytwotap";
        var age=10;
        var money=3.1415926;
        System.out.println(name.getClass());
        System.out.println(age);
        System.out.println(money);

        var c1 = new Counter2();
        var c2 = new Counter2();

// 对c1进行操作的线程:
        new Thread(() -> {
            c1.add(10);
        }).start();
        System.out.println(c1.get());
        new Thread(() -> {
            c1.dec(5);
        }).start();
        System.out.println(c1.get());

// 对c2进行操作的线程:
        new Thread(() -> {
            c2.add(11);
        }).start();
        System.out.println(c2.get());

        new Thread(() -> {
            c2.dec(2);
        }).start();
        System.out.println(c2.get());

    }
}

 class Counter2 {
    private int count = 0;

    public void add(int n) {
        synchronized(this) {
            count += n;
        }
    }

    public void dec(int n) {
        synchronized(this) {
            count -= n;
        }
    }

    public int get() {
        return count;
    }
}
```

这样一来，线程调用`add()`、`dec()`方法时，它不必关心同步逻辑，因为`synchronized`代码块在`add()`、`dec()`方法内部。并且，我们注意到，`synchronized`锁住的对象是`this`，即当前实例，这又使得创建多个`Counter`实例的时候，它们之间互不影响，可以并发执行。



现在，对于`Counter`类，多线程可以正确调用。

**如果一个类被设计为允许多线程正确访问，我们就说这个类就是“线程安全”的（thread-safe）**，上**面的`Counter`类就是线程安全的。Java标准库的`java.lang.StringBuffer`也是线程安全的。**

还有一些不变类，例如`String`，`Integer`，`LocalDate`，它们的**所有成员变量都是`final`，多线程同时访问时只能读不能写，这些不变类也是线程安全的。**

最后，**类似`Math`这些只提供静态方法，没有成员变量的类，也是线程安全的。**

除了上述几种少数情况，大部分类，例如`ArrayList`，都是非线程安全的类，我们不能在多线程中修改它们。但是，如果所有线程都只读取，不写入，那么`ArrayList`是可以安全地在线程间共享的。

 没有特殊说明时，**一个类默认是非线程安全的。**

我们再观察`Counter`的代码：

```
public class Counter {
    public void add(int n) {
        synchronized(this) {
            count += n;
        }
    }
    ...
}
```

当我们锁住的是`this`实例时，实际上可以用`synchronized`修饰这个方法。下面两种写法是等价的：

```
public void add(int n) {
    synchronized(this) { // 锁住this
        count += n;
    } // 解锁
}
public synchronized void add(int n) { // 锁住this
    count += n;
} // 解锁
```

因此，用`synchronized`修饰的方法就是同步方法，它表示整个方法都必须用`this`实例加锁。

我们再思考一下，如果对一个静态方法添加`synchronized`修饰符，它锁住的是哪个对象？

```
public synchronized static void test(int n) {
    ...
}
```

对于`static`方法，是没有`this`实例的，因为`static`方法是针对类而不是实例。但是我们注意到任何一个类都有一个由JVM自动创建的`Class`实例，因此，对`static`方法添加`synchronized`，锁住的是该类的`Class`实例。上述`synchronized static`方法实际上相当于：

```
public class Counter {
    public static void test(int n) {
        synchronized(Counter.class) {
            ...
        }
    }
}
```

我们再考察`Counter`的`get()`方法：

```
public class Counter {
    private int count;

    public int get() {
        return count;
    }
    ...
}
```

它没有同步，因为读一个`int`变量不需要同步。

然而，如果我们把代码稍微改一下，返回一个包含两个`int`的对象：

```
public class Counter {
    private int first;
    private int last;

    public Pair get() {
        Pair p = new Pair();
        p.first = first;
        p.last = last;
        return p;
    }
    ...
}
```

就必须要同步了。

#### 3.5.1 小结

**用`synchronized`修饰方法可以把整个方法变为同步代码块，`synchronized`方法加锁对象是`this`；**

**通过合理的设计和数据封装可以让一个类变为“线程安全”；**

**一个类没有特殊说明，默认不是thread-safe；**

**多线程能否安全访问某个非线程安全的实例，需要具体问题具体分析。**

### 3.6 死锁

Java的线程锁是可重入的锁。

什么是可重入的锁？我们还是来看例子：

```
public class Counter {
    private int count = 0;

    public synchronized void add(int n) {
        if (n < 0) {
            dec(-n);
        } else {
            count += n;
        }
    }

    public synchronized void dec(int n) {
        count += n;
    }
}
```

观察`synchronized`修饰的`add()`方法，一旦线程执行到`add()`方法内部，说明它已经获取了当前实例的`this`锁。如果传入的`n < 0`，将在`add()`方法内部调用`dec()`方法。由于`dec()`方法也需要获取`this`锁，现在问题来了：

对同一个线程，能否在获取到锁以后继续获取同一个锁？

答案是肯定的。JVM允许同一个线程重复获取同一个锁，这种能被同一个线程反复获取的锁，就叫做可重入锁。

由于Java的线程锁是可重入锁，所以，获取锁的时候，不但要判断是否是第一次获取，还要记录这是第几次获取。每获取一次锁，记录+1，每退出`synchronized`块，记录-1，减到0的时候，才会真正释放锁。

#### 3.6.1死锁

一个线程可以获取一个锁后，再继续获取另一个锁。例如：

```java
package com.company.Thread_6_synchronized;

import java.util.Date;

public class LockTest {
    public static String obj1 = "obj1";
    public static String obj2 = "obj2";
    public static void main(String[] args) {
        LockA la = new LockA();
        new Thread(la).start();
        LockB lb = new LockB();
        new Thread(lb).start();
    }
}

class LockA implements Runnable{
    public void run() {
        try {
            System.out.println(new Date().toString() + " LockA 开始执行");
            while(true){
                synchronized (LockTest.obj1) {
                    System.out.println(new Date().toString() + " LockA 锁住 obj1");
                    Thread.sleep(3000); // 此处等待是给B能锁住机会
                    synchronized (LockTest.obj2) {
                        System.out.println(new Date().toString() + " LockA 锁住 obj2");
                        Thread.sleep(60 * 1000); // 为测试，占用了就不放
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
class LockB implements Runnable{
    public void run() {
        try {
            System.out.println(new Date().toString() + " LockB 开始执行");
            while(true){
                synchronized (LockTest.obj2) {
                    System.out.println(new Date().toString() + " LockB 锁住 obj2");
                    Thread.sleep(3000); // 此处等待是给A能锁住机会
                    synchronized (LockTest.obj1) {
                        System.out.println(new Date().toString() + " LockB 锁住 obj1");
                        Thread.sleep(60 * 1000); // 为测试，占用了就不放
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

以上代码运行输出结果为：

```java
Tue May 05 10:51:06 CST 2015 LockB 开始执行
Tue May 05 10:51:06 CST 2015 LockA 开始执行
Tue May 05 10:51:06 CST 2015 LockB 锁住 obj2
Tue May 05 10:51:06 CST 2015 LockA 锁住 obj1
```

在获取多个锁的时候，不同线程获取多个不同对象的锁可能导致死锁。对于上述代码，线程1和线程2如果分别执行`add()`和`dec()`方法时：

- 线程1：进入`add()`，获得`lockA`；
- 线程2：进入`dec()`，获得`lockB`。

随后：

- 线程1：准备获得`lockB`，失败，等待中；
- 线程2：准备获得`lockA`，失败，等待中。

此时，两个线程各自持有不同的锁，然后各自试图获取对方手里的锁，造成了双方无限等待下去，这就是死锁。

死锁发生后，没有任何机制能解除死锁，只能强制结束JVM进程。

因此，在编写多线程应用时，要特别注意防止死锁。因为死锁一旦形成，就只能强制结束进程。

那么我们应该如何避免死锁呢？答案是：线程获取锁的顺序要一致。即严格按照先获取`lockA`，再获取`lockB`的顺序，改写`dec()`方法如下：

```
public void dec(int m) {
    synchronized(lockA) { // 获得lockA的锁
        this.value -= m;
        synchronized(lockB) { // 获得lockB的锁
            this.another -= m;
        } // 释放lockB的锁
    } // 释放lockA的锁
}
```

#### 3.6.2 练习

请观察死锁的代码输出，然后修复。

> 明天上午搞定基础多线程部分







