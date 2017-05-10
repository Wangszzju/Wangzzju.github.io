## 1 更优雅地写分支结构
秘诀就是多使用：&&／||／三目运算符。

例如`&&`
```
if(typeof cb === 'function') {
    cb();
}
```
分分钟三行变成一行
```
typeof cb === 'function' && cb();
```