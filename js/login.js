//获得焦点事件
$('.control').each(function(index, ele) {
    $(ele).find('input').focus(function() {
        $(ele).css("border", "2px solid #999");
        $(ele).find('.judge').hide();
    });
});
//选项卡切换事件
$('#J_LoginNav li').each(function(index, ele) {
    $(ele).click(function() {
        $(this).addClass('current').siblings().removeClass('current');
        $('.busa').eq(index).show().siblings().hide();
    });
});
//图形验证码点击切换事件
(function() {
    var i = 0;
    var arr = ['images/reg/yzm01.png', 'images/reg/yzm02.png', 'images/reg/yzm03.png'];
    $('.yzm').click(function() {
        i++;
        if (i == 3) i = 0;
        $('.yzm')[0].src = arr[i];
    })
})()
//帐号登录验证函数
function useryz() {
    var logphone = $('#regphone').val();
    var logpwd = $('#regpw').val();
    var x = localStorage.getItem('ip');
    var aop = [];
    for (var i = 0; i < x; i++) {
        var ato = localStorage.getItem('htUserName' + i);
        ato = eval("(" + ato + ")");
        aop.push(ato);
    }
    var arr = eval(aop);
    var vtel = [];
    var vpw = [];
    for (var i = 0; i < x; i++) {
        vtel.push(arr[i].tel);
        vpw.push(arr[i].pwd);
    }
    var telb = false;
    var pwb = false;
    for (var i = 0; i < x; i++) {
        if (logphone == vtel[i]) {
            telb = true;
            if (telb && logpwd == vpw[i]) {
                pwb=true;
            }
        }
    }
    if(!telb){
        $('.ephone').html('用户名不存在');
        $('.ephone').prev()[0].src = 'images/reg/error.png';
        $('.regone .control').eq(0).css('border', '2px solid #e10482');
        $('.ephone').css('color', '#e10482');
        $('.judge').eq(0).show();
        $('.judge').eq(1).hide();
    }else if(!pwb){
        $('.ephone').html('用户名OK');
        $('.ephone').prev()[0].src = 'images/reg/right.png';
        $('.regone .control').eq(0).css('border', '2px solid #11cd6e');
        $('.ephone').css('color', '#11cd6e');
        $('.epwd').html('密码错误 !');
        $('.epwd').prev()[0].src = 'images/reg/error.png';
        $('.regone .control').eq(1).css('border', '2px solid #e10482');
        $('.epwd').css('color', '#e10482');
        $('.judge').eq(0).show();
        $('.judge').eq(1).show();
    }else{
        window.localStorage.setItem('ope',logphone);
        window.location.href='index.html';
    }
}
$('.regone .nextp span').click(function(){
    useryz();
});
//验证码登录验证
$('.regtwo .nextp span').click(function(){
    //用户名验证
    var logphone = $('#regphone2').val();
    var x = localStorage.getItem('ip');
    var aop = [];
    for (var i = 0; i < x; i++) {
        var ato = localStorage.getItem('htUserName' + i);
        ato = eval("(" + ato + ")");
        aop.push(ato);
    }
    var arr = eval(aop);
    var vtel = [];
    for (var i = 0; i < x; i++) {
        vtel.push(arr[i].tel);
    }
    var telb = false;
    for (var i = 0; i < x; i++) {
        if (logphone == vtel[i]) {
            telb = true;
            break;
        }
    }
    if(telb&&logphone){
        statephone0();
    }else if(logphone){
        var str1='用户名不存在'
        statephone1(str1);
        telb = false;
    }else{
        var str2='请输入用户名'
        statephone1(str2);
        telb = false;
    }
    //验证图形码
    var pn2=false;
    var txttxm = $('#regimg2').val();
    if (txttxm) {
        var op = false;
        var imsrc = $('.yzm').attr('src');
        var oval = txttxm;
        if (imsrc == "images/reg/yzm01.png" && oval == 'j5br') op = true;
        if (imsrc == "images/reg/yzm02.png" && oval == '32jt') op = true;
        if (imsrc == "images/reg/yzm03.png" && oval == 'rdpe') op = true;
        if (op) {
            statetxm0();
            pn2 = true;
        } else {
            var st2 = "图形验证码错误,请重新输入"
            statetxm1(st2);
            pn2 = false;
        }
    } else {
        var st1 = "请输入图形验证码";
        statetxm1(st1);
        pn2 = false;
    }
    //验证短信
    var txtsms = $('#regsms2').val();
    var pn3=false;
    if (txtsms) {
        if (txtsms == '0000') {
            statesms0();
            pn3 = true;
        } else {
            var st211 = "短信验证码错误,请重新输入"
            statesms1(st211);
            pn3 = false;
        }
    } else {
        var st111 = "请输入短信验证码";
        statesms1(st111);
        pn3 = false;
    }
    if(telb&&pn2&&pn3){
        window.localStorage.setItem('ope',logphone);
        window.location.href='index.html';
    }
});
//验证状态函数
function statephone0() {
    var ost = $('.regtwo .control').eq(0);
    ost.css("border", "2px solid #ccc");
    ost.find('.judge').hide();
}

function statephone1(x) {
    var ost = $('.regtwo .control').eq(0);
    ost.css("border", "2px solid #e10482");
    ost.find('.ferror').attr('src', 'images/reg/error.png');
    ost.find('.cerror').css('color', "#e10482");
    ost.find('.cerror').html(x);
    ost.find('.judge').show();
}
function statetxm0() {
    var ost = $('.regtwo .control').eq(1);
    ost.css("border", "2px solid #ccc");
    ost.find('.judge').hide();
}

function statetxm1(x) {
    var ost = $('.regtwo .control').eq(1);
    ost.css("border", "2px solid #e10482");
    ost.find('.ferror').attr('src', 'images/reg/error.png');
    ost.find('.cerror').css('color', "#e10482");
    ost.find('.cerror').html(x);
    ost.find('.judge').show();
}
function statesms0() {
    var ost = $('.regtwo .control').eq(2);
    ost.css("border", "2px solid #ccc");
    ost.find('.judge').hide();
}

function statesms1(x) {
    var ost = $('.regtwo .control').eq(2);
    ost.css("border", "2px solid #e10482");
    ost.find('.ferror').attr('src', 'images/reg/error.png');
    ost.find('.cerror').css('color', "#e10482");
    ost.find('.cerror').html(x);
    ost.find('.judge').show();
}

