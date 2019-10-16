$(function(){
    var data=new Array();
    $.ajax({
            url: "https://api.shisanshui.rtxux.xyz/rank/rank.json",
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader("X-Auth-Token",token);
            // },
    
            type: "GET",
            success: function (result) {
                data=result;
                console.log(data);
                renderPage()
            },
            error: function (res) {
                alert("查看排行失败");
            }
        });
    function renderPage() {
		var i=1;
        data.forEach((item) => {
            $("#rank-table").append(
            "<tr align='center'>" +
				"<td>" + String(i) + "</td> " + 
                "<td>" + item["player_id"] + "</td> " + 
                "<td>" + item["name"] + "</td> " +
                "<td>" + item["score"] + "</td> " +
            "</tr>")
			i++;
        })
    } 
})