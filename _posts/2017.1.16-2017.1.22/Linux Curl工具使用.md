## Linux Curl工具
curl是一种命令行工具，作用是发出网络请求，然后得到和提取数据，显示在“标准输出”`stdout`上

* 查看网页源码及其保存
```
curl nba.hupu.com 

// 如果要保存网页
curl -o ~/DeskTop/pageCache.html nba.hupu.com
```
* 显示http response
```
curl -i www.sina.com
```

```
// 然后得到
HTTP/1.1 301 Moved Permanently
Server: nginx
Date: Tue, 17 Jan 2017 02:32:43 GMT
Content-Type: text/html
Location: http://www.sina.com.cn/
Expires: Tue, 17 Jan 2017 02:34:43 GMT
Cache-Control: max-age=120
Age: 44
Content-Length: 178
X-Cache: HIT from localhost

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx</center>
</body>
</html>
```
说明这个网站实现了自动跳转，如果是大写的`-I`,则直接显示`HTTP Response`的内容
* 显示通信内容
```
curl -v www.sina.com

// 或者
curl --trace output.txt www.sina.com
curl --trace-ascii output.txt www.sina.com
```
* 模拟User-Agent
```
curl --user-agent "[User Agent]" [URL]

// 注意User Agent数据需要给出，注意木有[]
// Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7
```
* 发送Cookie
```
// 具体的cookie值可以从HTTP  Response Header的'Set-Cookie'中得到

curl --cookie "name=yaha" www.sina.com

// -c保存服务器返回的cookie到文件
// -b可以使用这个文件作为cookie信息，进行新请求
curl -c cookie www.example.com
curl -b cookie www.example.com
```
* 增加头信息
```
curl --header "Content-Type:application/json" www.sina.com
```
* 如果需要用户登录的话，那么使用`user`
```
curl --user name:password example.com
```