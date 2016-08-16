//输入框获得焦点事事件;
$('.control').each(function(index, ele) {
    $(ele).find('input').focus(function() {
        $(ele).css("border", "2px solid #999");
        $(ele).find('.judge').hide();
    });
});
//验证码点击切换函数;
(function() {
    var i = 0;
    var arr = ['images/reg/yzm01.png', 'images/reg/yzm02.png', 'images/reg/yzm03.png'];
    $('.yzm').click(function() {
        i++;
        if (i == 3) i = 0;
        $('.yzm')[0].src = arr[i];
    })
})()
//输入框状态函数
function statephone0() {
    var ost = $('.control').eq(0);
    ost.css("border", "2px solid #ccc");
    ost.find('.judge').hide();
}

function statephone1(x) {
    var ost = $('.control').eq(0);
    ost.css("border", "2px solid #e10482");
    ost.find('.ferror').attr('src', 'images/reg/error.png');
    ost.find('.cerror').css('color', "#e10482");
    ost.find('.cerror').html(x);
    ost.find('.judge').show();
}

function statephone2() {
    var ost = $('.control').eq(0);
    ost.css("border", "2px solid #11cd6e");
    ost.find('.ferror').attr('src', 'images/reg/right.png');
    ost.find('.cerror').css('color', "#11cd6e");
    ost.find('.cerror').html('恭喜,可以注册！');
    ost.find('.judge').show();
}

function statetxm0() {
    var ost = $('.control').eq(1);
    ost.css("border", "2px solid #ccc");
    ost.find('.judge').hide();
}

function statetxm1(x) {
    var ost = $('.control').eq(1);
    ost.css("border", "2px solid #e10482");
    ost.find('.ferror').attr('src', 'images/reg/error.png');
    ost.find('.cerror').css('color', "#e10482");
    ost.find('.cerror').html(x);
    ost.find('.judge').show();
}

function statetxm2() {
    var ost = $('.control').eq(1);
    ost.css("border", "2px solid #11cd6e");
    ost.find('.ferror').attr('src', 'images/reg/right.png');
    ost.find('.cerror').css('color', "#11cd6e");
    ost.find('.cerror').html('恭喜,图形验证码正确！');
    ost.find('.judge').show();
}

function statesms0() {
    var ost = $('.control').eq(2);
    ost.css("border", "2px solid #ccc");
    ost.find('.judge').hide();
}

function statesms1(x) {
    var ost = $('.control').eq(2);
    ost.css("border", "2px solid #e10482");
    ost.find('.ferror').attr('src', 'images/reg/error.png');
    ost.find('.cerror').css('color', "#e10482");
    ost.find('.cerror').html(x);
    ost.find('.judge').show();
}

function statesms2() {
    var ost = $('.control').eq(2);
    ost.css("border", "2px solid #11cd6e");
    ost.find('.ferror').attr('src', 'images/reg/right.png');
    ost.find('.cerror').css('color', "#11cd6e");
    ost.find('.cerror').html('恭喜,短信验证码正确！');
    ost.find('.judge').show();
}
//初始化验证状态码
var pn1 = false;
var pn2 = false;
var pn3 = false;
//第一次验证
function proveOne() {
    //验证用户名
    $('.regone .control').eq(0).find('input').focusout(function() {
        var txtphone = this.value;
        if (txtphone) {
            var reg1 = /^1[3|4|5|7|8]\d{9}$/;
            var t1 = reg1.test(txtphone);
            var xop = true;
            if (t1) {
                var x = localStorage.getItem('ip');
                var aop = [];
                var vtel = [];
                for (var i = 0; i < x; i++) {
                    var ato = localStorage.getItem('htUserName' + i);
                    ato = eval("(" + ato + ")");
                    aop.push(ato);
                }
                var arr = eval(aop);
                for (var i = 0; i < x; i++) {
                    vtel.push(arr[i].tel);
                }
                for (var i = 0; i < x; i++) {
                    if (txtphone == vtel[i]) {
                        xop = false;
                        break;
                    }
                }
                if (!xop) {
                    var st3 = "该手机号已被注册";
                    this.value = '';
                    statephone1(st3);
                    pn1 = false;
                } else {
                    statephone2();
                    pn1 = true;
                    ptwo();
                }
            } else {
                var st2 = "手机号格式错误,请重新输入"
                this.value = '';
                statephone1(st2);
                pn1 = false;
            }
        } else {
            var st1 = "请输入手机号"
            statephone1(st1);
            pn1 = false;
        }
    });
    //验证图形验证码
    $('.regone .control').eq(1).find('input').focusout(function() {
        var txttxm = this.value;
        if (txttxm) {
            var op = false;
            var imsrc = $('.yzm').attr('src');
            var oval = $(this).val();
            if (imsrc == "images/reg/yzm01.png" && oval == 'j5br') op = true;
            if (imsrc == "images/reg/yzm02.png" && oval == '32jt') op = true;
            if (imsrc == "images/reg/yzm03.png" && oval == 'rdpe') op = true;
            if (op) {
                statetxm2();
                pn2 = true;
                ptwo();
            } else {
                var st2 = "图形验证码错误,请重新输入"
                this.value = '';
                statetxm1(st2);
                pn2 = false;
            }
        } else {
            var st1 = "请输入图形验证码";
            statetxm1(st1);
            pn2 = false;
        }
    });
    //验证短信验证码
    $('.regone .control').eq(2).find('input').focusout(function() {
        var txtsms = this.value;
        if (txtsms) {
            if (txtsms == '0000') {
                statesms2();
                pn3 = true;
                ptwo();
            } else {
                var st2 = "短信验证码错误,请重新输入"
                this.value = '';
                statesms1(st2);
                pn3 = false;
            }
        } else {
            var st1 = "请输入短信验证码";
            statesms1(st1);
            pn1 = false;
        }
    });
    if (pn1 && pn2 && pn3) {
        return 1;
    } else {
        return 0;
    }
}
proveOne();
//点击下一步判断是否进入第二次验证
function ptwo(){
if (proveOne()) {
    $('.nextp').find('span').css({ 'background': '#e10482', 'cursor': "pointer", 'color': "#fff" });
    $('.nextp').find('span').click(function() {
        $('.regone').hide();
        $('.regtwo').show();
    });
} else {
    $('.nextp').find('span').css({ 'background': '#ccc', 'cursor': "not-allowed" });
}
}
//第二次验证函数
(function() {
    var op1 = false;
    var op2 = false;
    $('.regtwo .control').eq(0).find('input').focusout(function() {

        if ($(this).val()) {
            $('.regtwo .control').eq(0).css("border", "2px solid #11cd6e");
            $('.regtwo .control').eq(0).find('.ferror').attr('src', 'images/reg/right.png');
            $('.regtwo .control').eq(0).find('.cerror').html("恭喜您 " + $(this).val()).css('color', '#11cd6e');
            $('.regtwo .control').eq(0).find('.judge').show();
            op1 = true;
            xp();
        } else {
            $('.regtwo .control').eq(0).css("border", "2px solid #e10482");
            $('.regtwo .control').eq(0).find('.ferror').attr('src', 'images/reg/error.png');
            $('.regtwo .control').eq(0).find('.cerror').html("请输入昵称").css('color', '#e10482');
            $('.regtwo .control').eq(0).find('.judge').show();
        }
    });
    var pw = $('.regtwo .control').eq(1);
    pw.find('input').each(function() {
        $(this).focusout(function() {
            var txt1 = pw.find('input').eq(0).val();
            var txt2 = pw.find('input').eq(1).val();
            if (txt1 && txt2) {
                var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/;
                var pt1 = reg.test(txt1);
                var pt2 = reg.test(txt2);
                if (txt1 == txt2 && pt1 && pt2) {
                    pw.css("border", "2px solid #11cd6e");
                    pw.find('.ferror').attr('src', 'images/reg/right.png');
                    pw.find('.cerror').html("密码正确").css('color', '#11cd6e');
                    pw.find('.judge').show();
                    op2 = true;
                    xp();
                } else if (txt1 != txt2) {
                    pw.css("border", "2px solid #e10482");
                    pw.find('.ferror').attr('src', 'images/reg/error.png');
                    pw.find('.cerror').html("请确认密码是否一致！").css('color', '#e10482');
                    pw.find('.judge').show();
                } else {
                    pw.css("border", "2px solid #e10482");
                    pw.find('.ferror').attr('src', 'images/reg/error.png');
                    pw.find('.cerror').html("6到20位字符,数字,字母组成").css('color', '#e10482');
                    pw.find('.judge').show();
                }
            } else {
                pw.css("border", "2px solid #e10482");
                pw.find('.ferror').attr('src', 'images/reg/error.png');
                pw.find('.cerror').html("请输入密码").css('color', '#e10482');
                pw.find('.judge').show();
            }
        });
    });
    function xp() {
        var tel = document.getElementById('regphone').value;
        var nickname = $('.regtwo .control').eq(0).find('input').val();
        var password = pw.find('input').val();
          $(".regtwo .opu span").css('cursor', 'pointer');
            $(".regtwo .opu").click(function() {
                var op = $('#agree').is(':checked');
                if (op && op1 && op2) {
                var i = localStorage.getItem('ip') || 0;
                window.localStorage.setItem('htUserName' + (i), "{tel:" + tel + ",pwd:" + password + ",nickname:" + nickname + "}");
                i++;
                window.localStorage.setItem('ip', i);
                window.localStorage.removeItem('ope')
                window.location.href = 'index.html';}
            });
    }
})()
