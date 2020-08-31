var setNewsInter = '';
$(document).ready(function () {
    //异步加载图片
    $("img.lazy").lazyload({ effect: "fadeIn",threshold :600});
    /** 设定轮播图箭头 **/
    var searchCatList = $('.search .topnav li');
    var pointHtml = '';
    var pointOffset = new Array();
    pointOffset[1] = "65px";
    pointOffset[2] = "137px";
    pointOffset[3] = "203px";
    pointOffset[4] = "268px";
    pointOffset[5] = "343px";
    for (i = 0; i < searchCatList.length; i++) {
        var catId = $(searchCatList[i]).attr('id').replace('home', '');
        if (i == 0) {
            pointHtml += '<div class="searchjt" id="searchjtId' + catId + '" style="display: block;"></div>';
            var actionUrl = $(searchCatList[i]).attr('value');
            $('#search_Submit').attr('action', actionUrl);
        } else {
            pointHtml += '<div class="searchjt" id="searchjtId' + catId + '" style="margin-left: ' + pointOffset[i] + '; display: none;"></div>';
        }

    }
    $('.buildname').before(pointHtml);

    /***  搜索提交  start  ***/
    /*$('.ss').click(function () {
        var val = $(this).prev('input').val();
        var id = $('.search li.current').attr('id').replace('home', '');
        //var id = $(this).parents('div.search_txt').attr('id').replace('con_home_', '');
        $('#search_Intro').val(val);
        var obj = {};
        obj.val = val;
        obj.name = 'search' + id;
        lastSearch(obj);
        var elements = $('#search_Intro');
        if ($.trim(elements.val()) == '') {
            elements.remove();
        }

        //如果是资讯跳转的路由改变一下
        if (id == 7) {
            var action = $('#search_Submit').attr('action');
            if ($('.mai').find('li').length > 0) {
                var positionId = $('.mai').find('li').eq(0).find('a').eq(0).attr('positionId');
            } else {
                return false;
            }
            action = action.replace('{positionId}', positionId);
            $('#search_Submit').attr('action', action);
        }

        $('#search_Submit').submit();
    });*/

    /** 搜索框清空 **/
    $('.search .topnav li').mousemove(function () {
        $('.buildname').val('');
        $('.js-searchlist').hide();
    });

    /** 资讯中的轮播图 **/
    setNewsInter = setInterval(turnNews, 4000);
    $('.scrollImg .newsImgData li').mousemove(function () {
        clearInterval(setNewsInter);
    });

    $('.scrollImg .newsImgData li').mouseleave(function () {
        setNewsInter = setInterval(turnNews, 4000);
    });

    /** 点击资讯小点切换图片 **/
    $('.scrollTag li').click(function () {
        clearInterval(setNewsInter);
        var index = $(this).index();
        $('.newsImgData li').removeClass('current');
        $('.scrollTag li').removeClass('current');
        $(this).addClass('current');
        $('.newsImgData li').eq(index).addClass('current');
        setNewsInter = setInterval(turnNews, 4000);
    });

    /** 搜房新房 **/
    $('.xftj .catHead li').mouseover(function () {
        $('.xftj .catHead li').removeClass('current');
        $(this).addClass('current');
        var index = $(this).index();
        $('.xftj .catInfo').removeClass('current');
        $('.xftj .catInfo').eq(index).addClass('current');

    });
    /** 商业地产 **/
    $('.sydc .rightInfo .catHead li').mouseover(function () {
        $('.sydc .rightInfo .catHead li').removeClass('current');
        $(this).addClass('current');
        var index = $(this).index();
        $('.sydc .rightInfo .catInfo').removeClass('current');
        $('.sydc .rightInfo .catInfo').eq(index).addClass('current');

    });
    /** 报备滚动 **/
    if($('.baobei ul').outerHeight()>$('.baobei').outerHeight())
    {
        setInterval('autoScroll(".baobei")',2000);
    }

});

/** 报备滚动 **/
function autoScroll(obj){
    $(obj).find('ul').animate({
        marginTop: '-31px'
    },1000,function(){
        $(this).css({marginTop : "0px"});
        var li  =$(".baobei ul").children().first().clone();
        $(".baobei ul li:last").after(li);
        $(".baobei ul li:first").remove();
    });
}

/**资讯广告轮播**/
function turnNews() {
    var count = $('.scrollImg .newsImgData li').length - 1;
    var index = $('.scrollImg .newsImgData li').index($('.scrollImg .newsImgData .current'));
    if (index == count) {
        index = 0;
    } else {
        index++;
    }
    $('.scrollImg .newsImgData li').removeClass('current');
    $('.scrollImg .newsImgData li').eq(index).addClass('current');

    $('.scrollTag li').removeClass('current');
    $('.scrollTag li').eq(index).addClass('current');
    var text = $('.scrollImg .newsImgData li').eq(index).attr('data');
    $('.scrollPop h5').text(text);
}

function setContentTab(name, id) {
    $('.search .topnav li').removeClass('current');
    $('#' + name + id).addClass('current');
    $('.searchjt').hide();
    $('#searchjtId' + id).show();
    var searchPlaceholder = new Array();
    searchPlaceholder[1] = '请输入关键字（楼盘名或地点）';
    searchPlaceholder[2] = '请输入关键字（楼盘名或地点）';
    searchPlaceholder[3] = '请输入关键字（楼盘名或地点）';
    searchPlaceholder[4] = '请输入关键字（楼盘名或地点）';
    searchPlaceholder[5] = '请输入关键字（楼盘名或地点）';
    searchPlaceholder[6] = '请输入关键字（楼盘名或地点）';
    searchPlaceholder[7] = '请输入关键字';
    searchPlaceholder[8] = '请输入关键字（风格或功能）';
    var actionUrl = $('#' + name + id).attr('value');
    $('#search_Submit').attr('action', actionUrl);
    $('.buildname').attr('placeholder', searchPlaceholder[id]);
}


$(function(){
    var currentIndex = 0;
    /** 新房推广 **/
    $('.template3 .sliderbox:first').addClass('current');
    $('.template3 .tabItem td').mousemove(function () {
        setRecommendIndex($(this).index());
        clearInterval(interval);
    });
    $('.template3 .tabItem td').mouseout(function () {
        interval = setInterval(scrollRecommentIndex, 3000);
    });
    var setRecommendIndex = function(index) {
        $('.tabbar .tabItem td').removeClass('current');
        $('.tabbar .tabItem td').eq(index).addClass('current');
        $('.template3 .sliderbox').removeClass('current');
        $('.template3 .sliderbox').eq(index).addClass('current');
    };
    var scrollRecommentIndex = function() {
        setRecommendIndex(currentIndex++);
        if (currentIndex >= $('.template3 .sliderbox').length) {
            currentIndex = 0;
        }
    };
    var interval = setInterval(scrollRecommentIndex, 3000);
});
