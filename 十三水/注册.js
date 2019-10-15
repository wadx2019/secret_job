$(function(){
    $('#login').click(function(){
        $('.input input').val("")
        $('.switch span').removeClass('active');
        $(this).addClass('active');

        $(this).parents('.content').removeClass('signup');
        $(this).parents('.content').addClass('login');

        $('form button').text('LOGIN')

    })

    $('#signup').click(function(){
        $('.input input').val("")
        $('.switch span').removeClass('active');
        $(this).addClass('active');

        $(this).parents('.content').removeClass('login');
        $(this).parents('.content').addClass('signup');

        $('form button').text('SIGNUP');
    })

    $('.input input').on('focus',function(){
        $(this).parent().addClass('focus');
    })

    $('.input input').on('blur',function(){
        if($(this).val() == '')
            $(this).parent().removeClass('focus');
    })

    // $('#login-btn').click(()=> {

    //     let username = $('#username-input').val()
    //     let password = $('#password-input').val()
    //     //console.log(username)
    //     //console.log(password)
    //     $.ajax({
    //         // headers:{
    //         //     contentType: "application/json"
    //         // },
    //         type: "post",
    //         contentType: 'application/json',
    //         data:JSON.stringify({
    //             "username": username,
    //             "password": password
    //         }),
    //         url: "https://api.shisanshui.rtxux.xyz/auth/login/",
    //         success: (data) => {
    //             alert("success")
    //             location.href = "游戏大厅.html" //转网页
    //         },
    //         error: (data) => {
    //             console.log(data)
    //         }
            
    //     })     
    // })
})