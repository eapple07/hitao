// 图片上移事件
$('.m_jx .imgup').each(function(index, ele) {
    $(ele).mousemove(function() {
        $(ele).find('img').css({ 'marginTop': '10px' });
    });
    $(ele).mouseout(function() {
        $(ele).find('img').css({ 'marginTop': '20px' });
    });
});
$(".mjx img").each(function(index, ele) {
    $(ele).mousemove(function() {
        $(ele).css({ 'marginTop': '-10px' });
    });
    $(ele).mouseout(function() {
        $(ele).css({ 'marginTop': 0 });
    });
});
//轮播图
$.ajax({
    url:"data/lbt.json",
    type:"get",
    async:true,
    cache:false,
    success:function(str){
        var arr = eval(str);
        var bg=[];
        var img=[];
        var lbh='';
        var doth='';
        for (var i = 0; i < arr.length; i++) {
           lbh+='<li><img src="" alt="banner"></li>';
           doth+='<li></li>';
           bg.push(arr[i].bg);
           img.push(arr[i].img);
        }
        $('.box').html(lbh);
        $('.dot').html(doth);
        $('.dot li:first').addClass('active');
        $('.box li').each(function(index,ele){
            $(ele).find('img').attr('src',img[index]);
        });
        lbt(bg);
    },
    error:function(xhr){
    	alert(xhr.status);
    }
});
function lbt(x) {
    $('.box li:first').show();
    var $num = 0;
    var bgcolor = x;
    $('.box')[0].timer = setInterval(fnNext, 3000);
    $('.banner_lbt').mouseover(function() {
        $('#banner_prev').show();
        $('#banner_next').show();
        clearInterval($('.box')[0].timer);
    });
    $('.banner_lbt').mouseout(function() {
        $('.box')[0].timer = setInterval(fnNext, 3000);
        $('#banner_prev').hide();
        $('#banner_next').hide();
    });

    $("#banner_next").click(fnNext);
    $("#banner_prev").click(fnPrev);
    $(".dot li").mouseover(function() {
        clearTimeout($(".dot")[0].timer);
        var _this = this;
        $(".dot")[0].timer = setTimeout(function() {
            if ($num !== $(_this).index()) {
                $num = $(_this).index();
                fnChange();
            }
        }, 400);
    });

    function fnNext() {
        $num++;
        if ($num >= $(".box li").length) {
            $num = 0;
        }
        fnChange();
    }

    function fnPrev() {
        $num--;
        if ($num < 0) {
            $num = $(".box li").length - 1;
        }
        fnChange();
    }

    function fnChange() {
        if($num===0){
            $('#banner .bannerbox').css({ 'background': bgcolor[$num]});
        }
        $(".dot li").removeClass("active").eq($num).addClass("active");
        $(".box li").fadeOut().eq($num).fadeIn(function(){
            $('#banner .bannerbox').css({ 'background': bgcolor[$num] });
        });
    }
}
//主页商品加载事件;
$.ajax({
     url:"data/shop.json",
     type:"get",
     async:true,
     cache:false,
     success:function(str){
        var arr=eval(str);
        var oli='';
        for(var i=0;i<arr.length;i++){
         oli+='<li class="qs"><div class="qs_left"><a href="javascript:;" class="qsa"><i class="soldout">抢光了</i><img src="'+arr[i].img+'" alt=""></a></div><div class="qs_right"><h4><img src="'+arr[i].con+'" alt=""><span class="qs_ck">'+arr[i].h4+'</span><em>距结束<span class="m_time">'+arr[i].time+'</span></em></h4><h5>'+arr[i].h5+'</h5><p class="description">'+arr[i].p+'</p><div class="mprice"><strong>￥<span class="mqs_price">'+arr[i].xj+'</span></strong><span class="qs_costprice">'+arr[i].yj+'</span><a href="javascript:;" class="mqs_qg">立即抢购</a></div></div></li>';
        }
        $('.qqtm_shoplist').html(oli);
        for (var i = 0; i < arr.length; i++) {
            ptime(i);
        }
     },
    error:function(xhr){
        alert(xhr.status);
    }
});
//时间函数
function ptime(x){
var ox=$('.m_time')
var time=ox.eq(x).html();
var otime=time.split(":");
var htime=otime[0];
var mtime=otime[1];
var stime=otime[2];
ox[x].timer=setInterval(function(){
    stime--;
    if(stime==-1){
        stime=59;
        mtime--;
        if(mtime==-1){
            mtime=59;
            htime--;
        }if(htime==-1){
            htime=0;
            mtime=0;
            stime=0;
            $(ox[x]).parents('.qs').find('.soldout').show();
            clearInterval(ox[x].timer);
        }
    }
var xtime=otp(htime)+":"+otp(mtime)+":"+otp(stime);

    ox.eq(x).html(xtime);

},1000);
}
function otp (x) {
   return x>=10?x:"0"+x;
}
