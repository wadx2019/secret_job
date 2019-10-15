$(function(){
    var data=new Array();
    token=localStorage.getItem("token1");
		$.ajax({
        url: "https://api.shisanshui.rtxux.xyz/history",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Auth-Token",token);
        },
        type: "get",
        data:"player_id=9&limit=5&page=1",
        contentType: "application/json;charset-UTF-8",
        success: function (result) { //todo
            console.log(result);
            data=result.data;
            renderPage();
        },
        error: function (res) {
            // $("#login_form").reset();

            console.log(res)
            console.log("https://api.shisanshui.rtxux.xyz/history");
            alert("查找失败2");
        }
    });

    function renderPage() {

        data.forEach((item) => {
            $("#rank-table").append(
            "<tr align='center'>" +
                "<td>" + item["id"] + "</td> " +
                "<td>" + item["card"] + "</td> " +
                "<td>" + item["score"] + "</td> " +
                "<td>" + item["timestamp"] + "</td> " +
            "</tr>")
        })
    }
})