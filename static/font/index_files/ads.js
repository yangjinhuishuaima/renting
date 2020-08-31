var xin = true,yin = true;
var step = 1;
var delay = 10;
var $obj;

$(document).ready(function () {
    //广告轮播
    var newsTopInter = setInterval("allTurnAds()", 4000);

    //浮动广告
    $obj = $(".float_ads");
    if($obj.length>0)
    {
        var time = window.setInterval("move()", delay);
        $obj.mouseover(function () {
            clearInterval(time)
        });
        $obj.mouseout(function () {
            time = window.setInterval("move()", delay)
        });
        //关闭浮动广告
        $(".float_ads_close").click(function() {
            $(this).parent().remove();
        })
    }
    //关闭开屏广告
    if($('.adv_kp').length>0)
    {
        $('.close_kp').click(function () {
            $(this).parent().parent().hide();
        });
    }

    //关闭右下角广告
    if($('.close_right_bottom').length>0)
    {
        $('.close_right_bottom').click(function () {
            $(this).parent().remove();
        });
    }


});

//广告轮播
function allTurnAds() {
    $(".ads_tl").each(function () {
        var adIdName=$(this).attr('id');
        if($(this).children('ul').children('li').length>1)
        {
            turnAds(adIdName);
        }

    });
}

function turnAds(idName) {
    var count = $('#' + idName + ' ul li').length - 1;
    var index = $('#' + idName + ' ul li').index($('#' + idName + ' ul .current'));
    if (index == count) {
        index = 0;
    } else {
        index++;
    }
    $('#' + idName + ' ul li').removeClass('current');
    $('#' + idName + ' ul li').eq(index).addClass('current');
    $('#' + idName + ' ol li').removeClass('current');
    $('#' + idName + ' ol li').eq(index).addClass('current');
}

//广告浮动
function move() {
    var left = $obj.offset().left;
    var top = $obj.offset().top;
    var L = T = 0; //左边界和顶部边界
    var R = $(window).width() - $obj.width(); // 右边界
    var B = $(window).height() - $obj.height(); //下边界
    if (left < L) {
        xin = true; // 水平向右移动
    }
    if (left > R) {
        xin = false;
    }
    if (top < T) {
        yin = true;
    }
    if (top > B) {
        yin = false;
    }
    left = left + step * (xin == true ? 1 : -1);
    top = top + step * (yin == true ? 1 : -1);
    // 给div 元素重新定位
    $obj.offset({
        top: top,
        left: left
    })
}