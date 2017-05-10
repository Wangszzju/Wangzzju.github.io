### 1.不要随便改配置
原先配置是这样的：
```
 withmeServer: {
 key: '483OedYnY945yTfdUd5Rxruf',
 secret: '1rogPFfwMpa3U5cgrjsns99wy2QSx909',
 version: '20161012',
 path: 'http://121.43.197.140:8082'
```
后来考虑到接口地址换了，我把它改成了
```
withmeServer: {
 key: '483OedYnY945yTfdUd5Rxruf',
 secret: '1rogPFfwMpa3U5cgrjsns99wy2QSx909',
 version: '20161012',
 path: 'http://121.43.197.140:8082'
},
hflServer: {
 key: '483OedYnY945yTfdUd5Rxruf',
 secret: '1rogPFfwMpa3U5cgrjsns99wy2QSx909',
 version: '20161012',
 path: 'http://120.26.244.22:8082'
}
```
并且把request模块中的withmeServer改成了hflServer

### 2.在pug中使用条件样式
如果因为某个变量有0和1两种状态，造成某个node的某个类具有两种不同的情况，那么可以使用条件格式，比如说下面这个如果用`if else`来写，起码得20行
```
- var warnHide = (angel.angelStatus === 1 ? 'hide' : '' );
- var heartHide = (angel.angelStatus === 0 ? 'hide' : '' );
- var iconHeartSelect = (angel.angelType === 1 ? 'icon-heart-selected' : '' );

span.J_mainCheck.icon-warning.status-icon(class=`${warnHide}`)
span.icon-heart(class=`${iconHeartSelect}`).J_changeAngelType()(id=`invited${angel.uid}`,data-invited=angel.angelType,class=`${heartHide}`)
```

### 3.根据业务来写代码
既然认证auth和推荐（爱心）是两个功能模块，那就不要把它写在同一个事件绑定下面，不然很丑，不如分开绑定，下面是这一段很丑的代码
```
$('.angel-status').on('click','.J_changeAngelType, .J_changeAuthStatus',(event)=>{
    
}
```

### 4.web.main.less的代码太长
已经超过500行了，再不拆作死啊？

### 5.默认值设定同类型
1. 默认值的设定不能改变类型，如果还没确定，就来一个不会用到的数字
```
// bad
let status = res.data.status || undefined ;

// good
let status = res.data.status || 99 ;
```

### 6.getElementsByTagName返回的是一组节点

在使用getElementsByTagName时，务必使用[]才能获取具体节点
```
// 得到一个body2，这是个HTMLCollection
let body2 = document.getElementsByTagName('body');

// 输出body1得到一个节点
let body1 = document.getElementsByTagName('body')[0];
```

