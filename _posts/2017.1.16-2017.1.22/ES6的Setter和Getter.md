## 1.get 

### 1.1示例

当查找某个对象属性时，该对象属性将会与被调用函数绑定。
> 这么难懂的东西，不给一个示例谁看得懂啊

```
var log = ['test'];
var obj = {

// 注意函数必须不带参数
  get latest () {
    if (log.length == 0) return 'No content';
    return log[log.length - 1]
  }
}
console.log (obj.latest); 
// 'test'
```
很意外对不对？

本来按照我们对函数的理解，应该是`obj.latest()`才能得到执行结果。

所以`get`关键字的作用是：

> 不通过使用明确的方法*调用*而显示内部变量的状态

### 1.2 返回计算属性名
如果要返回一个计算之后的**属性名**，也是可以的。

```
var expr = "foo";

var obj = {
  get [expr+'yaha']() { return "bar"; }
};
// []内的内容可以是一个表达式

console.log(obj.fooyaha); // "bar"

```

### 1.3 定义的方法
* 使用`defineProperty`方法，接收三个参数，分别是对象／属性名／函数
```
var o = { a:0 }

Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });

console.log(o.b) // Runs the getter, which yields a + 1 (which is 1)
```
## 2. Setter
一个实例
```
let lang = {
    lanMap:[],
    set current(name){
        this.lanMap.push(name);
    }
}
```
然后执行
```
lang.lanMap = "EN";
lang.lanMap = "FA";
lang.lanMap = "CN";
coonsole.log(lang.lanMap); //["EN", "FA", "CN"]
```

## 3.合用实例
```
(function () {
    var o = {
        a : 7,
        get b(){return this.a +1;},//通过 get,set的 b,c方法间接性修改 a 属性
        set c(x){this.a = x/2}
    };
    console.log(o.a);
    console.log(o.b);
    o.c = 50;
    console.log(o.a);
})();
//7
//8
//25
```