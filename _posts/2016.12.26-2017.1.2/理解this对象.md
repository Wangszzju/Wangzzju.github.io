## 1.核心原语言
先讲一个调用函数的方法：`call`

* 创建一个参数列表argList，参数个数>=1
* 第一个参数作为thisValue
* 开始调用函数，将thisValue的值赋给this，其余参数作为函数的调用参数。

它是这样用的：
```
function hello(thing){
    console.log(this+' say hello '+thing);
}
hello.call('Kyrie Irving','world'); //Kyrie Irving say hello world
```
通常的调用一般会简单一点，是这样的
```
hello('world');
```
不过，看上去好像字符串`'world'`要被赋值给`this`了？

并非如此，我们来看运行情况
```
hello('world');
//[object Window] say hello world
```
这说明，ECMAScript是允许我们在直接调用函数时，省掉`this`

## 2.成员函数的调用。
首先，我们现在有两种将函数作为对象属性的路径，来看看它们有什么不同。
* 直接定义在对象中
```
person1 = {
  name:'Kobe',
  hello:function(thing){
   console.log(this.name+' say hello '+thing);
  }
}
```
* 动态添加
```
function hello (thing){
   console.log(this.name+' say hello '+thing);
  }
  
person2 = {
    name:'Kobe'
}
person2.hello = hello;
```
我们在hello函数内部使用`this.name`以确定谁是调用者。
```
person1.hello('World'); // Kobe say hello World

person2.hello('World'); //Kobe say hello JavaScript


```
好啦，没差啦对不对。  
这时候如果直接在person2那段代码中，这样写会发现：
```
hello('World');
// " say hello World"
```
注意到没有，say之前有个空字符串，那就是`window.name = ""`，此时调用者是window。

**这说明：**
> this的值只有在调用时才会被确定下来，this的确定依赖于谁是调用者，又是以何种方式调用函数的。

呃，好吧，给你举个栗子，这样好懂一点点。

```
let KevinLove = {
	name:'Kevin Love',
    hello:function(thing){
		console.log(this.name+' say hello '+thing);
	}
}

let bind = function(func,thisValue){
	return function(){
		return func.apply(thisValue,arguments);
	}
}

let boundHello = bind(KevinLove.hello,KevinLove);

boundHello('World'); //Kevin Love say hello World
```
上面这个函数，之所以`this`对象是一个叫`KevinLove`的对象，是因为在`bind`函数执行时，它已经将thisValue指定为`KevinLove`了。

顺便说一下，ES5还专门有个叫`bind`的函数。。。

### 3.其他

* jQuery的回调函数在执行时，即其内部调用`call`时，其第一个作为`thisValue`的参数，如下：
```
$(document).ready(function(){
$("button").click(function(){
alert(this);
$("p").hide();
});
});

// [object HTMLButtonElement]
```

最后，保持对以上代码的质疑。