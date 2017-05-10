## 1. istanbul测试覆盖率
### 1.1. 设置测试覆盖率命令

百分数：
```
istanbul check-coverage --statement 90
```
如果语句覆盖率即`statement`低于90的话，会报错的

如果要针对具体的内容做绝对值门槛，那么就要这样写
```
istanbul check-coverage --branch -3
```

### 1.2 结合测试框架

```
istanbul cover --report html  _mocha -- test/someFile.js -R
```
解读一下：
* `_mocha`指的是在当前进程，即`istanbul`所在进程执行测试，这样才可以捕捉到覆盖率
* `--`后面的参数都会被传入到Mocha来执行
* `--report html`指的是在生成的coverage目录中，覆盖率报告的形式

## 2. should断言库常用API

先说一下使用原理：
在执行
```
const should = require('should')
```
之后，`should`这个方法就被挂载到了`Object.prototype上`

* ok：判断是否为true
```
(result === 2).should.be.ok;
```
* equal：判断是否相符
```
targetImg.src.should.be.equal(srcImg);
({}).toString.call(123).should.not.equal('[object String]');
```
* 类型判断
```
should('abc').be.a.String();
```
* 对象属性
```
this.obj.should.have.property('path');
```

