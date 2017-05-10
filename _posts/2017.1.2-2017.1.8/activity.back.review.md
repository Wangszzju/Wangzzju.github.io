### 1. 尽量暴露多个方法以测试

例如，对于`tick.js`的返回结果，目前是这样的
```
  return {
    _tick: _tick,
    initRedis: initRedis
  };

```


但是实际上，内部的函数不止这些，最好都可以测试下
```
  return {
    _tick: _tick,
    initRedis: initRedis,
    waitForGc: waitForGc,
    getRedisStr: getRedisStr
  };

```


* 这样可以实现“每次写一个函数就写一段测试”
* 有利于以后排查问题

### 2. 命名应该避开下划线

带有`_`的变量，默认为私有变量，比如在对外暴露的时候
```
  return {
    _tick: _tick,
  };

```
上面这样是不对的：
```
  return {
    tick: _tick,
  };

```
这样在外部使用的时候，就可以写成`mTick.tick()`

### 3. 心跳函数
这次居然只写了启动函数

```
co(function* () {
  yield mTick.initRedis();
  yield imgTool.preload();
  
  // 启动
  mTick._tick();
});

```
然后让它在内部自动执行
```
setTimeout(_tick, _tickTime);
```
实际上最好加上一个`stop`方法。

### 4. 其他
* img-gen-tool层级太深了
* 对模块注入外部变量时可以用这个方式，比如原来是这样的：
```
module.exports = function (logger, config, imgTool, KEY_CAT) {

}
```
你们可以改成这样：
```
module.exports = function (args) {
 let {logger, config, imgTool, KEY_CAT} = args;
}
```

