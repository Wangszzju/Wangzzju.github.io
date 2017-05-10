## 1. 背景
由于要制作图片后台工具，因此要使用redis。

## 2. 安装
下载和解压
```
$ wget http://download.redis.io/releases/redis-3.2.5.tar.gz
$ tar xzf redis-3.2.5.tar.gz
$ cd redis-3.2.5
$ make
```
命令行解读：
* wget是一个Linux下开发的开放源代码的软件，其语法为`wegt [参数列表] URL`
  * -c : 断点续传，`-t`为重试次数，`-t 100` 为重试100次
  * -i : 批量下载，例如现在有一个每一行都是个URL的txt文件，`wget -i download.txt`
  * 密码和认证：参数分别是`–http-user=USER设置HTTP用户`和`–http-passwd=PASS设置HTTP密码`

* tar 命令是一个解压工具
* make 是编译，必须要在当前目录下执行，执行规则被放在MakeFile文件中


## 3. 配置
在redis的目录下面找到redis.conf（比如我是放在了/usr/local下面），由于配置文件特别多，挑几个使用得比较多的说说

### 3.1 基础
* `daemonize no` ,默认redis不在后台运行，如果需要的话，改成yes——准确地说，其实这叫[守护进程](https://zh.wikipedia.org/wiki/%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B)

* `bind 127.0.0.1`，指定redis只接受来自于该IP地址的请求，如果不进行设置，那么将处理所有请求，由于我这里是dev环境，所以最好设置为`127.0.0.1`
* `timeout 0`,客户端超时时间，如果客户端在这段时间内没有发出指令，那么关闭连接，设置为`0`是把这个设置关了的意思
### 3.2 Snapshoot

* 以什么样的条件同步到数据文件rdb？这里设置了三个条件，比如下面的900秒内有1个key无限被改变
```
save 900 1
save 300 10
save 60 10000
```
毕竟不可能时刻更新的，否则数据量一大就是作死。

* 存到本地数据库时（持久化到rdb文件）时要不要压缩？`rdbcompression yes`，默认是yes，顺便说一句，默认的dbfilename的配置是`dbfilename dump.rdb`
* 工作目录`dir ./` 默认为当前目录，至于为什么目录和文件名要分开配置？解释见[这里](http://yijiebuyi.com/blog/bc2b3d3e010bf87ba55267f95ab3aa71.html)

### 3.3 其他：
* 防止重复尝试密码：`requirepass foobared`，设置客户端链接后进行任何其他制定前需要使用的密码
* 主从服务：`slaveof <masterip> <masterport>`，制定master服务器的IP地址以及端口（此时本机必须要是slav服务）

