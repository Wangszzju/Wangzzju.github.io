## 1. 背景
一直没有好好研究过log4js的用法，甚至分不清debug和info……直到上周，在测试环境遇到了一个bug，又不能调试，苦于找不出问题，于是开始查看测试环境日志，最后发现是输入的变量名之后误多打了一个特殊字符。可见日志模块还是很有用的啊！

## 2. 入门实践

首先，讲解一下，日志模块需要解决的问题有三个：
* 我是谁？——哦不，单条日志的输出内容样式
* 我从哪里来？——哦不，日志的分级／分类
* 我到哪里去？——哦不，日志的输出位置及文件格式

先从简单的开始，日志的分级和分类

### 2.1 分级和分类

先来看一个最简单的Demo：

```
let log4js = require('log4js');
let logger = log4js.getLogger();
logger.debug('Time:',new Date());
```

这样在控制台就会输出一条

```
[2017-03-05 12:24:12.567] [DEBUG] [default] - Time: 2017-03-05T04:24:12.566Z
```

那么要怎么分级和分类呢？

首先来谈分级。

所谓日志的级别，就是某一条日志，它所输出的信息的权重程度。比如上面这一条日志，它的级别就是`DEBUG`。它是这样设置的：

```
logger.debug('Time:',new Date());
```

然后我们来看看分类。
它可以这样设置：

```
let logger = log4js.getLogger('test');
logger.debug('OK');
```

这样修改一下以后，再输出

```
[2017-03-05 12:31:36.385] [DEBUG] test - OK
```

那么，如果我可以在这个分类里加上模块名的画，那就可以更加准确地定位问题所在了啊。对吧

### 2.2 输出位置和格式

现在我们要用到一个叫appender的东西了。先来看log4js默认的配置。

```
defaultConfig = {
  appenders: [{
    type: "console"
  }]
}
```

type是你输出的位置，console指的是输出到控制台。好，那么我们来修改修改。

```
let log4js = require('log4js');
log4js.configure({
  appenders:[{
    type:'dateFile',   // 按日志－日期的格式输出
    filename:'demo.log',
    pattern:'-yyyy-MM-dd',   // 时间格式
    alwaysIncludePattern:true, // 选了true就会总是跟上日期
    category:'test'   // 这就是前面的分类
  },{
    type:'dateFile',
    filename:'demo1.log',
    pattern:'-yyyy-MM-dd',
    alwaysIncludePattern:false,   // 选false的话，今天的日志会被标成demo.log，到了午夜，就会变成demo.log-2017-xxx之类的格式
    category:'explore'  // 分类为explore的日志将会输出到demo1.log当中
  }]
});
let logger = log4js.getLogger('explore');
logger.debug('Time:',new Date());
```

如果你要系统一点地来搞分类，那么我建议你这样做

```
log4js.configure({
  appenders: [{           // 注意这是第一个对象
    type: 'logLevelFilter',   // 这个必须选
    level: 'DEBUG',    // 确定当前分级，不过，这里指的是最低级别，比如ERROR也会输出到
    category: 'category1',  //  确定分类，支持接收一个数组。
    appender: {    // 确定输出格式
      type: 'file',
      filename: 'default.log'
    }
  }]
})
```

### 2.3 输出样式Layout

这个不太常用，因此我就展示一下例子：

```
log4js.configure({
  appenders:[{
    type:'console',
    layout:{
      type: 'pattern',
      pattern:'[%r] [%[%5.5p%]] - %m%n'
    }
  }]
})
let logger = log4js.getLogger();
logger.debug('Time:',new Date());
```

在控制台里面得到：

```
[12:57:45] [DEBUG] - Time: 2017-03-05T04:57:45.487Z
```

更多内容可以去看官方的[文档](https://github.com/nomiddlename/log4js-node/wiki/Layouts)

### 2.4 其他

其他还有一些`backups`备份／`replaceConsole`替换控制台输出，可以尝试用一下。

