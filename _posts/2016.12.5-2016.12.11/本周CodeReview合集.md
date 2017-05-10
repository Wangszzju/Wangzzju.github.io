## 1. 验证存在
// res.data如果是undefined，尽管res.data存在，但是res.data.list依然会报错
```
$.get('/i/acti-alt/', {
  type: type,
  activity_type: activity_type,
  angel_uid: angel_uid
}, (res) => {

  // res.data如果是undefined，尽管res.data存在，但是res.data.list依然会报错
  if(res.data && res.data.list){
    log(res.data.list[0]);
  }
  else log(res);

}, 'json');
```


## 2. 触摸事件
* touchend 触摸点离开屏幕
* tap 敲击某个屏幕
 
```
$('#J_toHome').on('tap', () => {
    switchTpl('#J_home');
});
```
这样改，在touchend事件结束后`e.preventDefault();`是为了避免触发click事件（触发click事件，这一现象称为[点击穿透](http://liudong.me/web/touch-defect.html)）
```
$('#J_toHome').on('touchend', () => {
    e.preventDefault();
    switchTpl('#J_home');
});
```


## 3.链式调用  
把
```
activeItem.data('type', chosenType);
activeItem.text(chosenContent);
activeItem.attr('data-type', chosenType);
```
改成
```
activeItem.data('type', chosenType).text(chosenContent).attr('data-type', chosenType);
```

## 4. 灵活运用&& 运算符
```
if (index >= imgMap.length) {
  index = imgMap.length;
  forward = false;
}
else if (index <= 1) {
  index = 1;
  forward = true;
}
```
可以改成
```
function next() {
    bOrder ? index++ : index--;
    index <= 0 && (index = 0, bOrder = true);
    index >= aBtn.length - 1 && (index = aBtn.length - 1, bOrder = false);
    cutover();
}
```

## 5.一些细节
* 尽量用let和const，如果可以，一开始就把值给写好
```
// good
let foo = [];
foo[0] = 1;
let bar = foo;

// bad
let foo[];
let bar = foo;


// 若干代码之后
foo[0] = 1;

```
* 使用对象字面量
```
// bad
const item = new Object();

// good
const item = {};
```
* 尽量用Array.push去添加数组元素
```
// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```