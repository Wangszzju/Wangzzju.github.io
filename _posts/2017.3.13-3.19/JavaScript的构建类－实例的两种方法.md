## 1. 简介

一般的OOP语言都会有以下两个区分：
* 类
* 实例
但JS在ES6的class出现以前，并没有这个概念，都是用prototype来实现的。

## 2. 构造函数法创建对象

### 2.1 基础用法
先上一个案例:

```
'use strict';    // 不写的话，一旦忘记写new，那么this会被自动绑定为window;   

// Constructor
function Student(name){
  this.name = name;
  this.hello = function(){
    console.log('Hello' + this.name );
  }
}

// Instance
let xiaoming = new Student('xiaoming');
let xiaohong = new Student('xiaohong');

xiaoming.constructor.name; // "Student"
```

这内部的原理是什么呢？
* 首先，新创建一个对象，将this对象指向这个新对象
* 赋予this各种属性和方法  
* 返回this对象 
> 因此xiaoming和xiaohong的hello显然是不同的函数。

```
// 注意:
xiaohong.hello === xiaoming.hello; // false，浪费内存啊
```

### 2.2 prototype
修改一下代码
```
function Student(name){
  this.name = name;
}

Student.prototype.hello = function (){
  console.log('Hello' + this.name );
}
```

## 3. 对象的继承

传统的OOP语言都基于Class，继承的本质是扩展一个已经有的Class。因为它们严格区分类和实例，继承实际上是类型的拓展。

开心吧？但是JS使用的是原型继承哈哈哈哈哈……拓展？呵呵哒。

不信？那我们试试看咯。
```
function PrimaryStudent(props){
  Student.call(this, props);
  this.grade = props.grade || 1;
  this.intro = function(){
    console.log('Hey I\'m a Primary Student');
  }
}
```

你想要的原型链是这样的：
```
new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null
```

但是实际上是这样的：
```
new PrimaryStudent() ----> PrimaryStudent.prototype ---->  Object.prototype ----> null
```


好，现在让你看看，怎么改过来

```
function PrimaryStudent(props){
  Student.call(this, props); // 把PrimaryStudent中的this传递到Student中去
  this.grade = props.grade || 1;
  this.intro = function(){
    console.log('Hey I\'m a Primary Student');
  }
};

function F(){

};

F.prototype = Student.prototype;

PrimaryStudent.prototype = new F();   // 注意，PrimaryStudent是个构造函数，它才可以用prototype属性

PrimaryStudent.prototype.constructor = PrimaryStudent; // 不改的话就是F了

PrimaryStudent.prototype.intro = function(){
  console.log('I\'m a primary student');
};

```
总结一下这个奇怪的继承方式：
* 定义新的构造函数，并且在内部调用那个“被继承者”的函数，注意绑定this
* 建立中间构造函数F，将其`prototype`和被继承者函数的`prototype`指向同一个
* 利用`new F()`生成一个实例，将新构造函数的`prototype`指向这个F，而`prototype.constructor`修改回新构造函数
* 在新构造函数上定义各种方法。

事实上已经有相关方法对此进行封装了。
```
var events = require('events');
 
// 创建自定义对象
let Cat = function (methods) {
    this.methods = methods;
}
 
// 继承events.EventEmitter
util.inherits(Cat, events.EventEmitter);

let Tom = new Cat('Tom')
```

## 4. ES6的class

前面那个定义`Student`的代码，就可以这么写了啊。

### 4.1 基础写法

```
class Student {
  constructor(args){  // 构造函数用construtor关键字，后面直接跟函数，不要跟function关键字和函数名了
    this.name = args.name || '名字缺失';
    this.sex = args.sex || '性别数据缺失';
  }
  hello(){    // 直接定义放啊
    console.log('Hey ' + this.name + ' !');
  }
}
```

很简单了对吧～～

但是还有更加惊喜的，继承更简单。

### 4.2 超级简单的继承

```
class PrimaryStudent extends Student {
  constructor(args){
    super(args);
    this.grade = args.grade;
  }
  intro(){
    console.log('I\'m a primary student in ' + this.grade);
  }

}
```
