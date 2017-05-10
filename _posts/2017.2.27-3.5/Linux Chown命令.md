## 1. 命令格式

```
chown [选项参数]  [所有者]:[群组] 具体文件／目录
```

## 2. 常用参数

* `-R`：处理指定目录和子目录下的所有文件
* `-v`：显示详细的处理信息

## 3. 一个案例
> 改变特定文件目录下所有文件的所有者，但是不改群组。

改变之前是这样的：
```
┌─[xxx] - [~/Desktop/chown] - [xxxx]
└─[$] <> ll
total 0
-rw-r--r--  1 root  mail     0B  2 19 14:54 1.txt
-rw-r--r--  1 root  mail     0B  2 19 14:55 2.txt
-rw-r--r--  1 root  mail     0B  2 19 14:54 chown.txt
```

然后
```
cd ..  // 移动到上一级
```
再接着

```
sudo chown -R -v dachui:  chown
```
再且回去，执行`ll`命令：
```
-rw-r--r--  1 dachui  mail     0B  2 19 14:54 1.txt
-rw-r--r--  1 dachui  mail     0B  2 19 14:55 2.txt
-rw-r--r--  1 dachui  mail     0B  2 19 14:54 chown.txt
```
发现所有者确实已经改了



