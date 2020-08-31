function advertising(data){
    var path = data.path;
    var advertisingElement = data.callbackParameter.advertising;
    var data = data.data;
    var html = '';
    if(data.length > 0){
        for(var i in data)
        {
            var width = '1200';
            var height = '50';
            var size = data[i].size;
            var showType = data[i].showType;
            var indexof = size.indexOf('*');
            if(indexof != -1){
                width = size.substr(0,indexof);
                height = size.substr(indexof+1);
            }
            if(data[i].advertiseNum >1){
                if(parseInt(i)>0){
                    html += '<a href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')"><img class="margin_l" alt="'+data[i].name+'" src="'+path+data[i].file+'" width="'+width+'" height="'+height+'"><span class="index_ad">广告</span></a>';
                }else{
                    html += '<a href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')"><img alt="'+data[i].name+'" src="'+path+data[i].file+'" width="'+width+'" height="'+height+'"><span class="index_ad">广告</span></a>';
                }
            }else{
                html += '<a href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')"><img alt="'+data[i].name+'" src="'+path+data[i].file+'" width="'+width+'" height="'+height+'"><span class="index_ad">广告</span></a><span class="adv-close">关闭</span>';
            }
            updateAdsViewCount(data[i].id);
        }
        advertisingClass(advertisingElement,showType);
        document.getElementById(advertisingElement).innerHTML = html;
        document.getElementById(advertisingElement).style.display = 'block';
		$(".adv-close").on('click',function(){
			$(this).parent().hide();
		});
    }
}

//首页通栏123456
function advertisingBanner(data){
    var path = data.path;
    var advertisingElement = data.callbackParameter.advertising;
    var data = data.data;
    var html = '';
    if(data.length > 0){
        for(var i in data)
        {
            var width = '1200';
            var height = '50';
            var size = data[i].size;
            var showType = data[i].showType;
            var indexof = size.indexOf('*');
            if(indexof != -1){
                width = size.substr(0,indexof);
                height = size.substr(indexof+1);
            }
            html += '<li><a href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')"><img alt="'+data[i].name+'" src="'+path+data[i].file+'" width="'+width+'" height="'+height+'"><span class="index_ad">广告</span></a></li>';
            updateAdsViewCount(data[i].id);
        }
        advertisingBannerClass(advertisingElement,showType);
        document.getElementById(advertisingElement).innerHTML = html;
        document.getElementById(advertisingElement).style.display = 'block';
    }
}
//pc端首页大轮播图
function advertisingIndex(data){
    var path = data.path;
    var advertisingElement = data.callbackParameter.advertising;
    var data = data.data;
    var html = '';
    for(var i in data){
        var width = '1200';
        var height = '50';
        var size = data[i].size;
        var showType = data[i].showType;
        var indexof = size.indexOf('*');
        if(indexof != -1){
            width = size.substr(0,indexof);
            height = size.substr(indexof+1);
        }
        html += '<li style="background:url('+path+data[i].file+') no-repeat top; background-size:100% 100%;" class=""><a class="banner_img"   href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')" ></a>广告&nbsp;&nbsp;'+data[i].name+'</a></li>';
        updateAdsViewCount(data[i].id);
    }
    document.getElementById(advertisingElement).innerHTML = html;
    document.getElementById(advertisingElement).style.display = 'block';
}

//模板3首页推荐广告，带关闭标签
function advertisingClose(data){
    var path = data.path;
    var advertisingElement = data.callbackParameter.advertising;
    var data = data.data;
    var html = '';
    console.log(data);
    for(var i in data){
        var width = '1200';
        var height = '50';
        var size = data[i].size;
        var showType = data[i].showType;
        var indexof = size.indexOf('*');
        if(indexof != -1){
            width = size.substr(0,indexof);
            height = size.substr(indexof+1);
        }
        if (data[i].type == 3) {
            html += '<a  href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')"><video muted autoplay controls loop src="'+ data[i].file +'" width="'+width+'" height="'+height+'" > </video></a>' +
                '<span class="index_ad" style="top:5px; height: 12px;">广告</span><span class="adv-close" style="top:2px; height: 22px;">关闭</span>'
        } else {
            html += '<a  href="javascript:void(0);"  onclick="updateAdsClickCount('+data[i].id+',\''+data[i].url+'\')"><img src="'+path+data[i].file+'" alt="'+data[i].name+'" width="'+width+'" height="'+height+'"/></a><span class="index_ad">广告</span></a><span class="adv-close">关闭</span>'
        }
        updateAdsViewCount(data[i].id);
    }
    advertisingCloseClass(advertisingElement,showType);
    document.getElementById(advertisingElement).innerHTML = html;
    $("#"+advertisingElement).parent().show();
    $(".adv-close").on('click',function(){
        $(this).parent().hide();
        $(this).parents('div').hide();
    });
}

function advertisingClass(advertisingElement,showType){
    if(showType == 1){ //轮播
        $("#"+advertisingElement).addClass('advertisingClass');
    }
}

function advertisingBannerClass(advertisingElement,showType){
    if(showType == 1){ //轮播
        $("#"+advertisingElement).addClass('advertisingBannerClass');
    }
}

function advertisingCloseClass(advertisingElement,showType){
    if(showType == 1){ //轮播
        $("#"+advertisingElement).addClass('advertisingCloseClass');
    }
}

//ads_advertising
function updateAdsClickCount(id,linkHref){
    var url="/adCount/adClickCount";
    //type 1:浏览量 2.点击量
    var data = {id:id,type:2};
    $.ajax({
        type:'get',
        url:url,
        data:data,
        async:false,
        success:function(data){
            //console.log(data);
        }
    });
    window.open(linkHref);
}

//处理浏览量
function updateAdsViewCount(id){
    var url="/adCount/adClickCount";
    //type 1:浏览量 2.点击量
    var data = {id:id,type:1};
    $.ajax({
        type:'get',
        url:url,
        data:data,
        async:false,
        success:function(data){
            //console.log(data);
        }
    });
}

//indexrec_ads
function updateIndexAdsClickCount(id,linkHref){
    var url="/adCount/adIndexRecClickCount?id="+id;
    var linkHref = linkHref;
    if(linkHref.indexOf("http") == -1){
        linkHref = 'http://'+linkHref;
    }
    var data = {id:id};
    $.ajax({
        type:'get',
        url:url,
        data:data,
        async:false,
        success:function(data){
            //console.log(data);
        }
    });
    //window.location.href=linkHref
    window.open(linkHref);
}

//广告自动关闭
function  autoClose(advArea,second){
	setTimeout(function(){
		advArea.hide();
	},second*1000);
}

