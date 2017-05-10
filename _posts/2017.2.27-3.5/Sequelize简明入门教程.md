## 1. 背景

最近感觉要依赖于烈哥和帅军的数据接口去获得数据，有时候会出现接口数据字段不够的情况。因此，以后希望可以自己去写（2016.3.6开始这周，再搞这个事情）。

此外，鉴于业务场景中，暂时用不到删除操作，本章暂时不讲这个。



## 2. 实践

[配置教程](https://segmentfault.com/q/1010000004078668?_ea=496690)在此。
### 2.1 引入和配置

在安装好`sequelize`这个`npm`模块后。
```
// 先写好配置
var config = {
  database: 'test', // 使用哪个数据库
  username: 'www', // 用户名
  password: 'www', // 口令
  host: 'localhost', // 主机名
  port: 3306 // 端口号，MySQL默认3306
};

// 生成一个sequelize实例
let sequelize = new Sequelize(config.database,config.username,config.password,{
  host:config.host,
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:30000  // 线程最大的连接时间，如果30秒内某个线程没有连接，就释放这个线程。
  }
});
```

解释一下各个参数:
* `host`：主机名
* `dialect`：规定使用哪种dialect，`sequelize`默认的`dialect`是`mysql`。
> dialect：在标准SQL语句的基础上，进行的拓展。
* `pool`：线程池的配置，用于缓冲。

当然，注意，也有这种写法

```
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

* `@`后面跟的是主机名host
* `postgres`是你用的数据库服务器名，如果你用的是mysql就改成`mysql`，这一点和`mongodb`是同理的。

### 2.2 定义Model

我现在需要在数据中定义一个Model。
```
let Pet = sequelize.define('pet',{ // 传入pet默认为pets
  id:{
    type:Sequelize.STRING(50),
    primaryKey:true  // 标明主键
    unique: true  // 标明是否唯一，有重复就报错
  },
  name:{
    type:Sequelize.STRING(100), // 数据类型
    field:'name'   // 指定存储在表中的键名称
    //  // 没有指定 field，表中键名称则与对象键名相同，为 name（这里我设置成一样了）
  }
  gender:{
    type: Sequelize.BOOLEAN,
    allowNull: false    // 不允许值为null
    defaultValue: true   // 通过这个方法设置默认值
  }
  birth:Sequelize.STRING(10),
  createdAt:Sequelize.BIGINT,
  updatedAt:Sequelize.BIGINT,
  version:Sequelize.BIGINT
},{
  timestamps:false,    // 关闭自动添加timestamps的功能，默认为true
  freezeTableName: false  // 如果为true，则表名和model名一致，否则添加为复数
});
```

> 对于Model，你甚至还可以定义：
> * get 和 set对象
> * 建立索引index
> * 常用的validate验证
> 
> 另外，还有，对于配置:
> * 强制定义`tableName: 'my_very_custom_table_name'`


但是，有model，不等于你有了一个表，因为不是对应的
### 2.3 使用Model
你有两种方法去创建这个表。

* 第一种是用`Model.sync`创建表，让模型和表结构同步，不过风险甚多，慎用啊

```
let pet = Pet.sync({force:false});
// pet是个Promise对象
// 默认情况force为false，如果改成true，那么存在的表会被销毁，然后再创建。

```

* 第二种直接插入数据，自然就有了

```
// 生成Model实例
let pet = Pet.create({
  id:'g' + now,
  name:'Gaffey',
  gender:false,
  birth:'2007-10-20',
  createdAt:now,
  updatedAt:now,
  version:0
}).then(function(p){
  console.log('createdd' + JSON.stringify(p)+'\n')
}).catch(function(err){
  console.log('failed' + err);
});
```

### 2.4 查找数据

* 用where来作条件判断

```
// 查找名为markdown的
  where:{
    name:'markdown'
  },
// 查找名为Gaffey或者markdown的
  where:{
    name:{
      $or:['markdown','Gaffey']
    }
  }
// 查找名字为name，且生日为2011-11-29或生日为2012-10-22的
  where:{
    name:'markdown'
    $or:{
       birth:['2011-11-29','2012-10-22']
     }
  }
```


* 用limit和offset来限制返回结果

```
Pet.findAll({
  where:{},
  limit:30,  // 限制返回30个
  offset:1   // 跳过查找结果的第一个
}
```

* 用order和group来进行分组和排序

```
Pet.findAll({
  where:{},
  order:'name'  // 根据name字段来排序
}
```

* 用attributes来控制你要返回哪些字段

```
Pet.findAll({
  where:{}
  attributes:['id','name','birth']  // 返回的数据中只会包含这三个字段
}

```

还有个很有趣的应用，快速查找某一列的最大值，最小值，不过只能返回这个值，而不能返回这个数据.

```
Pet.min('createdAt').then(p=>{
  console.log(p);  // 快速查找最小值1488505899714
})
```

### 2.5 关联操作
SQL和NoSQL之间，有个很大的不同，就是SQL是基于关系型数据库的，他可以从这个Model中的某个值，去查到另外一个Model里面的值，先给一个参考案例。

```
// 准备工作
var User = sequelize.define('user', { name: Sequelize.STRING })
  , Task = sequelize.define('task', { name: Sequelize.STRING })
  , Tool = sequelize.define('tool', { name: Sequelize.STRING })

Task.belongsTo(User)

// 多对多的关系，一个人可能有多种任务，对吧
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })

sequelize.sync().then(function() {
  // this is where we continue ...
})
```

接下来我们看看两种关系
* 多对一

```

Task.findAll({ include: [ User ] }).then(function(tasks) {
  console.log(JSON.stringify(tasks))

  /*
    [{
      "name": "A Task",
      "id": 1,
      "createdAt": "2013-03-20T20:31:40.000Z",
      "updatedAt": "2013-03-20T20:31:40.000Z",
      "userId": 1,
      "user": {   // 注意到没有，这个user是单数，说明在这个Model里面，任务－人是多对一关系
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z"
      }
    }]
  */
})
```

* 反过来，一对多

```
User.findAll({ include: [ Task ] }).then(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "tasks": [{   // 注意到是复数
        "name": "A Task",
        "id": 1,
        "createdAt": "2013-03-20T20:31:40.000Z",
        "updatedAt": "2013-03-20T20:31:40.000Z",
        "userId": 1
      }]
    }]
  */
})
```

**重点来了**～介绍下`include`的用法

```
User.findAll({
  include: [{        // 注意到是个数组
    model: Tool,   // 引入的model
    as: 'Instruments',   // 变量名
    where: { name: { $like: '%ooth%' } }   // 对Tool进行筛选，$like表示近似匹配
    // 你甚至还可以指定Tool模块返回的字段
  }]
}).then(function(users) {
    console.log(JSON.stringify(users))
})
```

### 2.6 修改

目前有两种方式来实现修改，一种是修改－保存，另一种是直接`update`

```
// way 1
task.title = 'a very different title now'
task.save().then(function() {})
 
// way 2
task.update({
  title: 'a very different title now'
}).then(function() {})
```

## 3. 后续问题
还有很多的概念需要理解：
1. 模型和表的关系（各种一对多，多对多等等关联介绍）
2. instance实例是个什么概念，和Model的关系是什么
3. Sequelize对象是啥

最后，奉上参考资料:
1. [标准SQL和Sequelize对比](https://segmentfault.com/a/1190000003987871)
2. [Sequelize官方文档](http://docs.sequelizejs.com/en/v3/docs/models-usage/)