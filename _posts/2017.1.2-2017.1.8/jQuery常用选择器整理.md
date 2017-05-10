## 1. 背景
最近jQuery用的很多，但是做遍历／选择时都写都乱七八糟的。。

于是，有必要整理一下。

## 2. 取父/子/相邻/

这几个选择器基本是同理的，所以就展示一个。
* children()

* parent()与parents()：区别在于后者会返回祖先元素，而前者返回父级元素

* prev()与next()：前后相邻元素，调用者是个jQuery对象，返回一个jQuery对象
```
  <li>Does the UL contain an LI?</li>
  <li>American Jay Zhou === Korver?</li>
  <li>Come on Boy~~~</li>
```
此时
```
$($("li")[1]).prev().text();  // "Does the UL contain an LI?"
```

* last()与first()

## 3. 批处理

### 3.1 each()

* each()：遍历一个jQuery对象，为每个匹配元素执行一个函数  

还是继续参考三个`li`的模版，现在我们增加一个
```
  <li>Does the UL contain an LI?</li>
  <li>American Jay Zhou === Korver?</li>
  <li>Come on Boy~~~</li>
  <li>Ya-ha~EyesShield 21！！！~</li>
```
那么就这样执行
```
let k = [];
$( "li" ).each(function( index ) {
  if(index === 2) return false;
  k[index] = $(this).text('统一处理') ;
});
```
这样k就是一个包含了**两个**jQuery对象的数组（废话，text()的返回值是新的jQuery对象）,`each`方法的回调函数的参数是循环次数index。并且通过`return false`可以结束这个each循环。

**注意：原数组已经完全变了**


### 3.2 map()
* map()
```
$('li').map(function() {
      return this.innerText;
    }).get()
```
得到了一个新的数组
```
["Does the UL contain an LI?", "American Jay Zhou === Korver?", "Come on Boy~~~", "Ya-ha~EyesShield 21！！！~"]
```
由此可见，`map`和`each`的区别主要在于：`map`需要`return`特定的值，并且通过`get`来转换为真正的数组，返回的s新数组；`each`则是改变了原来的数组，并且返回它。



## 4.  过滤

### 4.1 filter()

* 接收的参数可以是选择器／function(index)／DOMelement／jQuery对象。

例如，还是使用上面的4个li的模版
```
$('li').filter(':even').css('color', 'red');
```
这样就把`li`节点中，序号为偶数的节点，给标红了。

那如果你要传入一个函数的话，记得使用`this`去使用当前节点。例如，我们现在把前面的代码修改一下
```
<li>Does the UL contain an LI?</li>
<li>American <span style="color:#0dd">Jay</span> <span style="color: #af9">Zhou</span> === Korver?</li>
<li>Come <span style="color:red">on</span> Boy~~~</li>
<li>Ya-ha~EyesShield 21！！！~</li>
```
然后再筛选，试图将第三行的字符变大一点。
```
$('li').filter(function(index) {
  return $('span', this).length == 1;
}).css('font-size', '20px');
```
什么！你问我为什么第二行不会变大？废话，它的`$('span', this).length`是2啊！

当然，其实让第三行变大很简单的，你只要参考数组的`filter`方法在接受高阶函数时的返回条件
```
$('li').filter(function(index) {
  return index === 2;  // 从0开始的
}).css('font-size', '20px');
```

### 4.2 not()
* not()：用法和`filter()`相同，只是它的功能是移除后返回

### 4.3 slice()
* slice()，类似`Array`对象的`slice`方法

```
$('li').slice(1,3).text('我们被改变了');
```
会发现第二行／第三行的文字变化了

### 4.4 is()

* 返回值是个`Boolean`值

比如我可以判断target是不是个`li`
```
$('ul').click( (event) => {
   let target = $(event.target);
   if(target.is('li')){
     target.css('background-color','#ddd');  
   };
});
```
### 4.4 has()

```
<!DOCTYPE html>
<html>
<head>
  <style>
  .full { border: 1px solid red; }
</style>
  <script src="http://code.jquery.com/jquery-latest.js"></script>
</head>
<body>
 
<ul><li>Does the UL contain an LI?</li></ul>
 
<script>
  $("ul").append("<li>" + ($("ul").has("li").length ? "Yes" : "No") + "</li>");
  $("ul").has("li").addClass("full");
</script>
 
</body>
</html>
```
以上代码中，`$("ul").has("li")`会返回一个jQuery对象，它的成员都是DOM原生对象，它的含义是：
> 拥有`li`子节点的`ul`节点


## 5. 查找

* find()：这就不细讲了，其实不是很难
```
dpItem.parent().find('.active');
```
在`dpItem`的父元素中找到class名为`active`的节点


