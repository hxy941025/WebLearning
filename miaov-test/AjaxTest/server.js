var http=require("http")
var querystring=require("querystring")


var server=http.createServer(function(req,res){
        var reqBody='';
        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量
        req.on('data',function (data) {
            reqBody += data;
        });
        req.on('end',function () {//用于数据接收完成后再获取
            var UserInfo = querystring.parse(reqBody);
            res.statusCode=200;
            res.sendDate=false;
            res.setHeader("Content-Type","text/plain");
            res.setHeader("Access-Control-Allow-Origin","http://localhost:63342");
            console.log(UserInfo);
            if(UserInfo.User === 'hxy' && UserInfo.Password === '123'){
                res.write("success");
            }else {
                res.write("登录失败")
            }
            res.end();
        })


});
server.listen(7777,"localhost",function(){
    console.log("开始监听...");
});
