## 1. 背景Cl工具
由于要理解`CL`工具，因此有必要掌握一下`commander`模块的用法。

> 顺便感慨一下TJ大神真的好牛逼啊啊啊

## 2. 介绍

OK，安装什么的就不细说了，`npm install commander`分分钟搞定。

我们现在先来写一个很简单的命令行程序，输出今天的日期，就可以了。
> 第一个问题就是，如何解析和设置命令行参数呢？

### 2.1 解析

```
#!/usr/bin/env node

let program = require('commander');
program
  .parse(process.argv);
```
先看一下`process.argv`长啥样～

我们用打断点的方式去查看，发现这是一个数组
```
// 解释器
0:"/usr/local/bin/node"  

// 执行的文件
1:"/Users/dachui/Documents/practice/commander-demo/fe.js"
```



然后在控制台里输入`program.parse(process.argv)`，得到一个对象，它长这样:
```
Command {
  commands: [],
  options: [],
  _execs: {},
  _allowUnknownOption: false,
  _args: [],
  _name: 'fe',
  Command: [Function: Command],
  Option: [Function: Option],
  rawArgs: 
   [ '/usr/local/bin/node',
     '/Users/dachui/Documents/practice/commander-demo/fe.js' ],
  args: [] }

```
可以见到，它将命令行参数封装进了一个Commander类。
> 那么，存放命令的地方有了，怎么操作才能放命令呢？
### 2.2 设置命令

```
program
  .option('-d, --date', 'display current date')   
  .parse(process.argv);
```
这时候如果我再去解析，会发现Commander类里多了一个option数组。

![](http://cdn.withme.cn/withme.back.u.95a1a583466818773dd97d71da1af7ca.png)

现在这样就可以实现参数option的设置了！`option()`接收的参数分别为：

*  第一个：'-d, --date' 分别为长短命令
*  第二个：'display current date'是描述信息
*  第三个：回调函数
*  第四个：默认值

然后，我要判断有没有输入`-d`的话，我就可以这样
```
if (program.date) // 如果有输入的话program.date将会为true
```
当然，如果你之前写第一个参数的时候是`.option('-d, --no--date', 'display current date') `，那你不输入`-d`的话，`program.date`将会为`false`。
> 哎呀其实就是倒过来嘛，很好理解哒～

当然，要是你参数输入错了，那肯定报错啊
```
error: unknown option `-b'
```

### 2.3 如何使用参数和回调函数

首先，参数有两种：
* <必选参数>，必须跟参数，否则会报错
* <可选参数>，可以不跟
```
program
  .option('-d, --date [year]', 'display current date',judgeYear)
  .parse(process.argv);
```
还记得`option`方法的第三个参数是回调函数吗？
```
function judgeYear(year){
  if(Number(year) === 2017){
    console.log('2017年到啦！');
  }
  else {
    console.log('今年不是2017');
  }
}
```
然后执行
```
./fe.js -d 2017  // 2017年到啦！
./fe.js -d 2015  // 今年不是2017
```

### 2.4 另一种写法

```
#!/usr/bin/env node --debug-brk
let program = require('commander');

// 注册
program
.command('console <name>')
.description('输出名字')
.action(function(name){
  console.log('输入的名字是：' + name );
});
// 记得要解析
program.parse(process.argv);
```

