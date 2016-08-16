//侧边栏用户中心


$('.oyp').each(function(index, ele) {
    $(ele).parent().mouseover(function() {
        $(this).find('.uc_none').stop().fadeIn(200, function() {
            $(this).stop().animate({ 'right': '37px' }, 200);
        });
    });
    $(ele).parent().mouseout(function() {
        $(this).find('.uc_none').stop().animate({ 'right': '55px' }, 200, function() {
            $(this).stop().fadeOut(200);
        });
    });
});
//导航列表变色
$('.nav_entry').find('li').each(function(index,ele){
    $(this).mouseover(function(){
        $(this).css('background','#e10482');
    });
    $(this).mouseout(function(){
        $(this).css('background','#000');
    });
});
//移动顶部
$('.user_uptop').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 500);
});
//大列表
(function() {
    var num = true;
    $('.nav_classify').click(function() {
        if (num) {
            $('#classify').show();
            pubu(0);
            $(this).find('img').attr('src', 'images/header/X.png').next().html('收起分类');
            num = false;
        } else {
            $('#classify').hide();
            $(this).find('img').attr('src', 'images/header/clssify.png').next().html('查看分类');
            num = true;
        }
    });
})();
$('.sift_l li').each(function(index, ele) {
    $(this).mouseover(function() {
        $(ele).addClass('cur').siblings().removeClass('cur');
    });
});
$(function() {
    $.ajax({
        url: "data/blist.json",
        type: 'get',
        async: true,
        cache: false,
        success: function(str) {
            var arr = eval(str);
            var siftlhtml = '';
            var lsp = [];
            var bg = [];
            for (var i = 0; i < arr.length; i++) {
                siftlhtml += '<li id="tab' + (i + 1) + '"><a href="javascript:;"><em class="xt' + (i + 1) + '"></em><span></span></a></li>';
                lsp.push(arr[i].lsp);
                bg.push(arr[i].bg);
            }
            $('.sift_l').html(siftlhtml);
            $('.sift_l').find('em').each(function(index, ele) {
                $(ele).css({ 'background': "url(" + bg[index][0] + ")" });
            });
            $('.sift_l li').eq(0).addClass('cur').find('em').css({ 'background': "url(" + bg[0][1] + ")" });
            $('.sift_l').find('span').each(function(index, ele) {
                $(ele).html(lsp[index]);
            });
            $('.sift_l li').each(function(index, ele) {
                $(ele).mouseover(function() {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $(this).find('em').css({ 'background': "url(" + bg[index][1] + ")" });
                    $('.sift_r li').eq(index).addClass('active').siblings().removeClass('active');
                    pubu(index);
                });
                $(ele).mouseout(function() {
                    $(this).find('em').css({ 'background': "url(" + bg[index][0] + ")" });
                });
            });
            for (var j = 0; j < arr.length; j++) {
                var rli = $("<li></li>");
                var rsift = $('<div class="siftlist clearfix"></div>');
                var arrd = arr[j].data;
                for (var k = 0; k < arrd.length; k++) {
                    var olist = $('<div class="olist"></div>');
                    var adt = $('<dt></dt>');
                    var ta = $('<a href="javascript:;"></a>');
                    var tah = arrd[k].odt;
                    ta.html(tah);
                    ta.appendTo(adt);
                    adt.appendTo(olist);
                    var dahh = arrd[k].odd;
                    var xadd = $('<dd></dd>');
                    for (var op = 0; op < dahh.length; op++) {
                        var da = $('<a href="javascript:;"></a>');
                        var daop = dahh[op];
                        da.html(daop);
                        xadd.append(da);
                        xadd.appendTo(olist);
                    }
                    rsift.append(olist);
                }
                var xdom = $('<div class="listb clearfix"><a href="javascript"></a></div>');
                rli.append(rsift);
                rli.append(xdom);
                $('.sift_r').append(rli);
            }
            $('.sift_r li:first').addClass('active');
            pubu(0);
        },
        error: function(xhr) {
            alert(xhr.status);
        }
    });
});

function pubu(xp) {
    //瀑布布局
    var lip = $('.sift_r li .siftlist').eq(xp).find('.olist');
    var numArr = [0, 0];
    var x = 0,
        y = 0;
    var lp = 0;
    for (var i = 0; i < lip.length; i++) {
        if (i < 2) {
            y = 0;
            x = 260 * i;
            numArr[i] += $(lip[i]).outerHeight();
        } else {
            var minIndex = calcMin(numArr);
            lp = minIndex;
            y = numArr[minIndex];
            x = 260 * minIndex;
            numArr[minIndex] += $(lip[i]).outerHeight();
        }
        $(lip[i]).css({ 'left': x, 'top': y });
    }
    $('.sift_r li .siftlist').eq(xp).css('height', numArr[lp]);
}

function calcMin(arr) {
    var index = 0;
    var num = arr[index];
    for (var i = 0; i < arr.length; i++) {
        if (num > arr[i]) {
            num = arr[i];
            index = i;
        }
    }
    return index;
}
(function(){
var ow=localStorage.getItem('ip');
var ot=localStorage.getItem('ope');
if(ot){
  $('#ologin').html("欢迎您 "+ot).css('color','#e10482');
    return;
}
if(ow){
    var op=localStorage.getItem('htUserName'+(ow-1));
    op=eval("("+op+")");
    $('#ologin').html("欢迎您 "+op.tel).css('color','#e10482');
    return;
}
})();