var token = "5413";
var user_id = "5413";
var username = "5413";
var cards = "5413";
var hisd="5413";
var statu="5413";
var timestamp="5413";
var detail;
// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","./js/main.js");// 在这里引入了a.js
// document.body.appendChild(new_element);
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
function startgame(){//获得牌，提交给127.0.0.1:8000
   token=localStorage.getItem("token1");
   var pokes=new Array();
   $.ajax({
           url: "https://api.shisanshui.rtxux.xyz/game/open",
            beforeSend: function(xhr) {
					   xhr.setRequestHeader("X-Auth-Token",token);
			},
           type: "post",
           success: function (data) {            
               console.log(data);
               console.log(token);
               var game_id=data.data.id;
               cards=data.data.card;
               console.log(cards);
               var dic={"$2": 0, "0": "$2", "$3": 1, "1": "$3", "$4": 2, "2": "$4", "$5": 3, "3": "$5", "$6": 4, "4": "$6", "$7": 5, "5": "$7", "$8": 6, "6": "$8", "$9": 7, "7": "$9", "$10": 8, "8": "$10", "$J": 9, "9": "$J", "$Q": 10, "10": "$Q", "$K": 11, "11": "$K", "$A": 12, "12": "$A", "&2": 13, "13": "&2", "&3": 14, "14": "&3", "&4": 15, "15": "&4", "&5": 16, "16": "&5", "&6": 17, "17": "&6", "&7": 18, "18": "&7", "&8": 19, "19": "&8", "&9": 20, "20": "&9", "&10": 21, "21": "&10", "&J": 22, "22": "&J", "&Q": 23, "23": "&Q", "&K": 24, "24": "&K", "&A": 25, "25": "&A", "*2": 26, "26": "*2", "*3": 27, "27": "*3", "*4": 28, "28": "*4", "*5": 29, "29": "*5", "*6": 30, "30": "*6", "*7": 31, "31": "*7", "*8": 32, "32": "*8", "*9": 33, "33": "*9", "*10": 34, "34": "*10", "*J": 35, "35": "*J", "*Q": 36, "36": "*Q", "*K": 37, "37": "*K", "*A": 38, "38": "*A", "#2": 39, "39": "#2", "#3": 40, "40": "#3", "#4": 41, "41": "#4", "#5": 42, "42": "#5", "#6": 43, "43": "#6", "#7": 44, "44": "#7", "#8": 45, "45": "#8", "#9": 46, "46": "#9", "#10": 47, "47": "#10", "#J": 48, "48": "#J", "#Q": 49, "49": "#Q", "#K": 50, "50": "#K", "#A": 51, "51": "#A"};

               var strs = new Array(); //定义一数组
               strs = cards.split(" "); //字符分
               // console.log(waves)
               var waves=new Array();
               for (var num =0; num<strs.length; num++) {
                  waves.push(dic[strs[num]]);
               }
               console.log(waves);
               waves=optimize_hand(waves);
               // console.log(waves);
               var submitCard=new Array();
               var qian='',zhong='',hou='';
               qian=dic[String(waves[0][0])]+' '+dic[String(waves[0][1])]+' '+dic[String(waves[0][2])];
               zhong=dic[String(waves[1][0])]+' '+dic[String(waves[1][1])]+' '+dic[String(waves[1][2])]+' '+dic[String(waves[1][3])]+' '+dic[String(waves[1][4])];
               hou=dic[String(waves[2][0])]+' '+dic[String(waves[2][1])]+' '+dic[String(waves[2][2])]+' '+dic[String(waves[2][3])]+' '+dic[String(waves[2][4])];
               submitCard.push(qian);
               submitCard.push(zhong);
               submitCard.push(hou);
               console.log(submitCard);
			   play(submitCard,game_id);
               //window.location.href = '游戏界面.html'
           },
           error: function (res) {
               alert("获取牌失败！");
           }
       });
	
	 
    }
	
function play(submitCard,game_id){//出牌
    // token=localStorage.getItem("token1");
    alert(submitCard);
    console.log(token)
    console.log(JSON.stringify({
       "card":submitCard,
       'id':game_id,
    }));
   $.ajax({
           url: "https://api.shisanshui.rtxux.xyz/game/submit",
           data: 
           JSON.stringify({
               "id":game_id,
               "card":submitCard,
           }),
           beforeSend: function(xhr) {
               xhr.setRequestHeader("X-Auth-Token",token,"Content-Type","application/json");
               },
           contentType: "application/json;charset=UTF-8",
           type: "post",
           crossDomain: true,
           success: function (data) {
               console.log(data);
               alert("出牌成功");
           },
           error: function (res) {
               console.log(res);
               alert("出牌失败");
           }
       });
}

function lookhistory(){//历史详情
    token=localStorage.getItem("token1");
    var history_data = ($('#history_form').serializeJson());
    if (history_data.username == undefined) {
        alert("战局id不能为空");
        return;
    }

    $.ajax({
        url: "https://api.shisanshui.rtxux.xyz/history/"+String(history_data.username),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Auth-Token",token);
        },
        type: "get",
        contentType: "application/json;charset-UTF-8",
        success: function (result) { //todo

            console.log(status);
            console.log(result);
            console.log(token);
            console.log(detail);
            statu=data.status;
            hisd=result.data.id;
            cards=result.data.card; timestamp=result.data.timestamp;
            alert(hisd);
            alert(timestamp);
        },
        error: function (res) {
            // $("#login_form").reset();
            console.log(res)
            console.log("https://api.shisanshui.rtxux.xyz/history/"+String(history_data.username));
            alert("查找失败");
        }
    });

}

function lookrank(){
    // token=localStorage.getItem("token1");
    // var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
    //     httpRequest.open('GET', 'https://api.shisanshui.rtxux.xyz/rank');//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    //     httpRequest.send();//第三步：发送请求  将请求参数写在URL中
    //     /**
    //      * 获取数据后的处理程序
    //      */
    //     httpRequest.onreadystatechange = function () {
    //         console.log('1');
    //         if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    //             // var json = httpRequest.responseText;//获取到json字符串，还需解析
    //             // console.log(json);
    //         }
        // };
    // $.ajax({
    //         url: "https://api.shisanshui.rtxux.xyz/rank/rank.json",
    //         // beforeSend: function(xhr) {
    //         //     xhr.setRequestHeader("X-Auth-Token",token);
    //         // },
 
    //         type: "GET",
    //         success: function (result) {
                
    //             console.log(result);
    //             alert("success");
    //             window.location.href = '排行榜.html'
    //         },
    //         error: function (res) {
    //             alert("查看排行失败");
    //         }
    //     });
    }