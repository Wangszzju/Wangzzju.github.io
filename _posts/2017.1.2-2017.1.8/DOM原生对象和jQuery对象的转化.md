## 1. 背景
最近总是对jQuery的使用感到困惑，比如
```
let starMap = $('.J_star');
```
得到了一个类数组的对象，如果我们
```
starMap[1].className; // 得到了"star J_star"
```
Excuse me！！！  
通过jQuery方法得到的列表，使用[index]操作后，其内部每个成员居然是DOM原生对象……

## 2. 理论

### 2.1 互相转化方法
* jQuery对象－DOM原生
```
let domStar = document.getElementById('J_star');
let jQueryStar = $(domStar);
```
* DOM原生－jQuery对象
```
let jQueryStarList = $('#J_starList');
let domStarList1 = jQueryStarList[0];
let domStarList2 = jQueryStarList.get(0);
```