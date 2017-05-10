## 1. 背景
在重构angel.back的过程中，我发现可以用观察者模式来解决。那首先要学一下`EventEmitter`对象。


## 2. 基本用法：一对多实现

### 2.1 怎么添加？

首先你要有一个`emitter`对象。
```
let events = require('events');
let EventEmitter = events.EventEmitter;

class Cat extends EventEmitter {  // 继承一个EventEmitter对象
  constructor(args) {
    super();
    this.name = args.name;
  }
}


let Tom = new Cat({ name: 'Tom' });
```

然后再开始绑定事件

```
Tom.on('sayHi', hello);

function hello(otherName = 'no-one', name2 = 'no-one') {
  console.log(`Hello ${this.name} and ${otherName} and ${name2}!`);  
  // emitter.emit(eventName[, ...args]) args会按顺序被传递给每个绑定的函数
};

setTimeout(() => {
  Tom.emit('sayHi', 'Jerry');  // 
}, 400)
```

### 2.2 怎么移除

有两点记住一下就好:
* 函数要有名字，才能被移除，否则谁知道你指的是哪部分内存空间啦
* remove的是listener，而不是事件
```
var EventEmitter = require('events').EventEmitter;   
var emitter = new EventEmitter();
 
emitter.on('sayHi', sayHi);
 

function sayHi(someone){
  console.log(someone);
}
 
emitter.removeListener('sayHi', sayHi);

emitter.on('sayHi', function(someone) {
    console.log(someone + '这个傻逼');
});
 
emitter.emit('sayHi','Hahah2');

// Hahah2这个傻逼
```

## 3. 多对一的实现

现在有一个场景，我需要完成3个任务，才能开始下一步流程，这个怎么办呢？也就是说，我现在需要一个多对一的场景。

其实原理不难，利用一个变量记住任务的数目，每完成一次就触发一次事件，当最后一次事件触发，该变量达到了3，那么就开始执行后续代码。
```
let times = 3;   // 规定好的加载次数
let done = (function(times,callback){   // 外部依赖控制
  let count = 0;    // 闭包控制私有变量
  let result = {};
  return function(key,value){ 
    result[key] = value;
    count++;
    if(count === times){  // 最后一次执行完了以后，result这个对象就包含了所需的数据，可以开始执行了
      callback(result);
    }
  }
})();

let emitter = new EventEmitter();

emitter.on('finish',done);  // done函数会被执行很多次

// 模板
fs.readFile(template)_path, 'utf-8', function(err, template){
  emitter.emit('finish','template',template);
}); 

// 数据
db.query(sql, function(err, data){
  emitter.emit('finish','data',data);
});

// 数据
db.query(sql, function(err, data){
  emitter.emit('finish','data',data);
});

// 第三个我就不写了，套路都一样
```