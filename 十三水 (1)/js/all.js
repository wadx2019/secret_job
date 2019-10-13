var token = "5413";
var user_id = "5413";
var username = "5413";
var cards = "5413";
var hisd="5413";
var statu="5413";
var timestamp="5413";
var detail;
(function ($) {
   $.fn.serializeJson = function () {
       var serializeObj = {};
       var array = this.serializeArray();
       var str = this.serialize();
       $(array).each(function () {
           if (serializeObj[this.name]) {
               if ($.isArray(serializeObj[this.name]) && this.value != "") {
                   serializeObj[this.name].push(this.value);
               } else {
                   if (this.value != "") {
                       serializeObj[this.name] = [serializeObj[this.name], this.value];
                   }
               }
           } else {
               if (this.value != "") {
                   serializeObj[this.name] = this.value;
               }
           }
       });
       return serializeObj;
   };
})(jQuery);

function register() {
   var reg_data = ($('#reg_form').serializeJson());
   if (reg_data.username == undefined || reg_data.password == undefined) {
       alert("用户名或密码不能为空");
       return;
   }
   $.ajax({
       type: "POST",
       dataType: "json",
       url: "https://api.shisanshui.rtxux.xyz/auth/register",
       data: JSON.stringify(reg_data), //提交的数据
       contentType: "application/json;charset-UTF-8",
       success: function (result) { //todo
           console.log(result); //打印服务端返回的数据(调试用)
           if (result.status == 0) {
               alert("注册成功");
               window.location.href = '登入.html'
           };
       },
       error: function (jqXHR, textStatus, errorThrownt) {
           
           var responseText = jQuery.parseJSON(jqXHR.responseText);
           if (responseText.status == 1001) {
               alert("用户名已被使用");
           };
           if (responseText.status == 1002) {
               alert("学号已绑定");
           };
           if (responseText.status == 1003) {
               alert("教务处认证失败");
           }
       }
   });
}
function begin() {
   var login_data = ($('#login_form').serializeJson());
   if (login_data.username == undefined || login_data.password == undefined) {
       alert("用户名或密码不能为空");
       return;
   }
   $.ajax({
       type: "POST",
       dataType: "json",
       url: "https://api.shisanshui.rtxux.xyz/auth/login",
       data: JSON.stringify(login_data), //提交的数据
       contentType: "application/json;charset-UTF-8",
       success: function (result) { //todo
           console.log(result); //打印服务端返回的数据(调试用)
           if (result.status == 0) {
               token=result.data.token;
               user_id=result.data.user_id;
               username=login_data.username
               console.log(token);
               localStorage.setItem("token1",token);
               localStorage.setItem("user_id1",user_id);
              localStorage.setItem("username1",username);
               alert("登录成功");
               window.location.href = '游戏大厅.html'
           };
       },
       error: function (res) {
           // $("#login_form").reset();
           alert("用户名或密码错误");
       }
   });
}
function logout(){
   token=localStorage.getItem("temp");
   $.ajax({
       type: "POST",
       url: "https://api.shisanshui.rtxux.xyz/auth/logout",
       beforeSend: function(xhr) {
               xhr.setRequestHeader("X-Auth-Token",token);
           },
       success: function (result) { //todo
               console.log(result);
               console.log(token);
               alert("注销成功");
               window.location.href = '点入.html'
           },
       error: function (res) {
           alert("注销失败");
       }
   });
}
function startgame(){
   token=localStorage.getItem("token1");
   $.ajax({
           url: "https://api.shisanshui.rtxux.xyz/game/open",
           beforeSend: function(xhr) {
               xhr.setRequestHeader("X-Auth-Token",token);
           },

           type: "post",
           success: function (data) {
               
               console.log(data);
               console.log(token);
               cards=data.data.card;
               play();
               //window.location.href = '游戏界面.html'
           },
           error: function (res) {
               alert("开始游戏失败");
           }
       });
    }
function play(){
           alert(cards);
           console.log(cards);
           console.log(JSON.stringify({
               "card":cards
           }));
   $.ajax({
           url: "",
           data: 
           JSON.stringify({
               "card":cards
           }),
           contentType: "application/json;charset=UTF-8",
           type: "post",
           crossDomain: true,
           success: function (data) {
               console.log(data);
               alert("出牌成功");
           },
           error: function (res) {
               alert("出牌失败");
           }
       });
}
/*
function lookhistory(){
    token=localStorage.getItem("token1");
    var history_data = ($('#history_form').serializeJson());
    if (history_data.username == undefined) {
        alert("战局id不能为空");
        return;
    }
    $.ajax({
        url: "https://sapi.shisanshui.rtxux.xyz/history",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Auth-Token",token);
        },
        type: "GET",
        dataType: "json",
        //url: "https://sapi.shisanshui.rtxux.xyz/history/{id}",
        
        data: JSON.stringify(history_data), //提交的数据
        contentType: "application/json;charset-UTF-8",
        success: function (data) { //todo
          
            console.log(status);
            console.log(data);
            console.log(token);
            console.log(detail);
            statu=data.status;
            hisd=data.data.id;
            cards=data.data.card; timestamp=data.data.timestamp;
            alert(hisd);
            alert(timestamp);


        },
        error: function (res) {
            // $("#login_form").reset();
            alert("查找失败");
        }
    });
}
function lookrank(){
    token=localStorage.getItem("token1");
    $.ajax({
            url: "https://api.shisanshui.rtxux.xyz/game/rank",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Auth-Token",token);
            },
 
            type: "get",
            success: function (data) {
                
                console.log(data);
                console.log(token);
                cards=data.data.card;
                play();
                //window.location.href = '游戏界面.html'
            },
            error: function (res) {
                alert("查看排行失败");
            }
        });
    }*/