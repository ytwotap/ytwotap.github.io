# Scratches文件介绍

> link:https://m.w3cschool.cn/intellij_idea_doc/intellij_idea_doc-8sif2dpw.html

IntelliJ IDEA 提供了临时编辑器。您可以创建一个文本或一段代码进行搜索或探索。IntelliJ IDEA 提供了两种类型的临时文件：

- Scratch 文件

  scratch 文件功能齐全，如可运行，可调试等。它们需要指定一种语言并具有扩展名。scratch 文件是通过 Ctrl+Shift+Alt+Insert 创建的。

- Scratch 缓冲区

  scratch 缓冲区仅用于纯编辑，因此它们不需要指定语言，也不需要扩展名。scratch 缓冲区默认属于`.txt`类型。此操作没有专门的快捷方式，但您可以按照配置键盘快捷键一节进行配置。scratch 文件在创建5个文件后重新使用。这样做，重用后，内容和语言将重置。



## 创建 scratch 文件



创建一个 scratch 文件

1. 执行以下操作之一：

2. - 在主菜单上选择 文件| 新| 临时文件（File | New | Scratch File）。
   - 按 Ctrl+Shift+Alt+Insert。
   - 按 Ctrl+Shift+A，开始输入 scratch file..，然后选择相应的动作。

3. 从 IntelliJ IDEA 提供的列表中选择未来 scratch 的语言。IntelliJ IDEA 创建一个带有该名称的临时编辑器选项卡 scratch.<extension>。默认名称将是scratch_<number>.<extension>。

4. 键入所需的代码。



## 创建 scratch 缓冲区



要创建 scratch 缓冲区，请按照下列步骤操作：

1. 按 Ctrl+Shift+A 或  search everywhere。

2. 开始输入命令名称:New Scratch Buffer：

   ![IntelliJ IDEA如何创建scratch缓冲区](https://atts.w3cschool.cn/attachments/image/20170928/1506597794542819.png)

   IntelliJ IDEA 创建一个带有该名称的临时编辑器选项卡buffer1。默认名称将是：buffer<number>。

3. 键入所需的代码。



```
请注意，虽然此操作没有键盘快捷方式，您仍然可以按照本节中配置键盘快捷键所述进行配置。您还可以通过重新分配快捷方式，从头文件切换到临时缓冲区，以避免垃圾堆积。
```



## 观察可用的 scratch



要观察可用的 scratch 文件和缓冲区，请执行以下操作之一：

- 选择项目工具窗口中的 Scratches 窗口。
  ![/help/img/idea/2017.2/projectToolWindowViews.png](https://www.jetbrains.com/help/img/idea/2017.2/projectToolWindowViews.png)
- 按 Alt+F1 并选择 Scratches （在 IDE 组件之间导航）。



## 关闭 Scratches



要关闭 scratch 文件或缓冲区，只需单击 “X” 即可。



## 删除 Scratches



要删除 scratch 文件或缓冲区，请按照下列步骤操作：

1. 切换到项目工具窗口的 Scratches 视图。
2. 在 Scratches 伪文件夹下，右键单击要删除的划痕，然后选择在上下文菜单上删除。
3. 确认删除。



## 改变 scratch 的语言



如果要在创建划痕时更改 scratch 语言，则可以通过编辑器的上下文菜单进行操作：

1. 切换到项目工具窗口的 Scratches 视图，并打开以编辑要更改语言的 scratch 文件或缓冲区。
2. 右键单击编辑器背景，然后选择在上下文菜单上更改语言（<当前语言>）。
3. 选择所需的语言。请注意以下事项：在分隔符之前，列出了四个最新的项目。您可以通过键入语言名称来缩小列表。更改语言操作会使扩展名保持同步（如果存在）。



## 重命名，复制和移动 scratches



IntelliJ IDEA 使重新命名 scratch 成为可能 。要重命名 scratch，请按照下列步骤操作：

1. 在项目工具窗口，切换到 Scratches 视图，并选择要重命名的 scratch。
2. 按 Shift+F6。

您也可以通过其他方式执行重命名：

- 在 NavBar：跳转 到NavBar（Alt+Home） - > Rename（Shift+F6）。
- 在 Project tool window | Scratches view ：选择 In | Project | Scratches（Alt+F1）- > Rename（Shift+F6）。
- 从编辑器：Refactor | Rename File。

复制和移动文件操作以相同的方式可用。

请注意，复制 scratch 时，IntelliJ IDEA 包括与文件类型对应的相应扩展名：

1. 在项目工具窗口中，切换到 Scratches 视图，并选择要复制的 scratch。

2. 按 F5。IntelliJ IDEA 会显示以下对话框：

   ![IntelliJ IDEA如何复制和移动scratch文件](https://atts.w3cschool.cn/attachments/image/20170928/1506598405315230.png)

   此对话框显示具有相应扩展名的临时名称。请注意，当你复制一个 scratch 缓冲区，扩展名为.txt：

   ![IntelliJ IDEA如何复制和移动scratch文件](https://atts.w3cschool.cn/attachments/image/20170928/1506598452227717.png)



## 有关 Scratches 的重要注意事项



请注意以下事项：

- 脚本语言中的临时代码是可执行的：可以运行和调试它。
- 支持 scratches 的本地历史记录。
- 可以使用 scratches 执行剪贴板操作。
- 根据您的操作系统，存储 scratches，在 IntelliJ IDEA 主页中，在目录 config/scratches（在 Windows / * NIX 系统上）~ Library->Preferences-><IntelliJ IDEA>XX->scratches（在 macOS 系统上）
- 您可以撤消或重做 scratches 更改。