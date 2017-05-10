## 1. 使用方法以及Promise化
在开始之前，有必要讲讲怎么使用`node redis`。

* 使用`Client`并配置
```
let redis = require('redis');
let rClient = redis.createClient({
    host:'127.0.0.1',
    port:6379
});

```

## 2.常用方法
其实，仔细想想，数据库操作嘛，无非就是：增｜删｜改｜查 而已。

### 2.1 增set

```
rClient.set('cl.queue.1','dachui:iadhd.jpg',(err, reply) => {
    if(err) console.log(err);
    console.log(reply);
});
```
### 2.2 删 del

删除一个key
```
client.del('frameworks', function(err, reply) {
    console.log(reply);
});
```


### 2.3 查get & exists

* 获取已存在的key的value
```
rClient.get('framework', function(err, reply) {
    console.log(reply);
});
```
* 检测一个key是否存在
```
rClient.exists('framework', function(err, reply) {
    if(reply === 1)console.log(reply);
    else {
        console.log('Sorry the key doesn't exist);
    }
});
```

### 2.4 改 getset

```
rClient.getset('framework','', function(err, reply) {
  // 
});
```


## 3. 将方法Promise 化
当然，你可以使用Promise化的redisClient，比如这样
```

const redis = require('redis');
global.Promise = require('bluebird')
Promise.promisifyall(redis.RedisClient.protoType);
let rClient = redis.createClient({
    host:'127.0.0.1',
    port:6379
});
```
### 3.1 原理
bluebird的Promise对象的`promisifyall`，会接受一个对象`obj`，`obj`对象中的所有异步方法，都会生成一个Promise版本的方法，一般会有个`Async`后缀。

### 3.2 API的改变
这样的话，代码就好看了：
* 清除和检测
```
  const testQueueKey = 'cl.canvas.queue.2';
  //清除key
  yield rClient.delAsync(testQueueKey);

  // 检测是否存在
  let existence = yield rClient.existsAsync(testQueueKey);
  
  existence.should.be.equal(0);

```
* 设置 & 修改
```
yield rClient.setAsync(redisKey, '');
yield rClient.getsetAsync(redisKey, '');
```
* 追加队列
```
yield client.appendAsync('test1', '1');
```