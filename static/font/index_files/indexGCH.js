// $(document).ready(function() {
// 	//小广告bannner
//
// 	$('.smallban').each(function(){
// 		tabs($(this).find('a'));
// 	});
// 	function tabs(obj){
// 		var n=0;
// //		obj.eq(0).show();
// 		if(obj.length>1){
// 			setInterval(function(){
// 				n++;
// 				if(n>obj.length-1){
// 					n=0;
// 				}
// 				obj.hide();
// 				obj.eq(n).css('display','block');
// 			},3000);
// 		}
// 	}
//
// 	$("#mai .txt").focus(function(){
// 	   $(this).val("");
// 	});
//
// 	$("#selectStyle").change(function(){
// 		$("#styleSrc").attr("href",$(this).val());
// 	});
//
//
// 	$(".search .txt").focus(function(){
// 		$(this).css("color","#565656");
// 	});
// 	$(".search .txt").blur(function(){
// 		$(this).css("color","#bdbdbd");
// 	});
//
//
// 	$(".nav_list li").mouseover(function(){
// 	 $(this).find(".gz").css("display","block");
// 	});
//
// 	$(".nav_list li").mouseout(function(){
// 	   $(this).find(".gz").css("display","none");
// 	});
//
// 	$("#web").css("width",$(window).width());
// 	$("#web").css("height",$(window).height());
// 	$("#web .prompt").css("margin-top",($(window).height()-300)/2+"px");
// 	$("#web .shut").click(function(){
// 	   $("#web").hide();
// 	   $(".float").show();
//     });
//
// });

/**通用焦点大小图切换构建函数**/
/*
*
* 需要自行设定类/feature_list/feature_tabs/feature_tab/feature_out
* */
var FeatureList = function(fobj,options){
	function feature_slide(nr){
		if(typeof nr == "undefined"){
			nr = visible_idx + 1;
			nr = nr >= total_items ? 0 : nr;
		}
		tabs.removeClass(onclass).addClass(offclass).filter(":eq(" + nr + ")").removeClass(offclass).addClass(onclass);
		output.stop(true, true).filter(":visible").hide();
		output.filter(":eq(" + nr + ")").fadeIn("slow",function(){
			visible_idx = nr;
		});
	}

	fobj = (typeof(fobj) == 'string')?$(fobj):fobj;
	fobj = $(fobj).eq(0);
	if(!fobj || fobj.size() == 0) return;

	//轮询间隔，默认2S
	var options      = options || {};
	var visible_idx  = options.startidx || 0;
	var onclass = options.onclass || "current";
	var offclass = options.offclass || "";
	var speed = options.speed || 10000;
	options.pause_on_act = options.pause_on_act || "click";
	options.interval  = options.interval  || 50000;

	var tabs = fobj.find(".f_tabs span");
	var output = fobj.find(".f_out");
	var total_items = tabs.length;

	//初始设定
	output.hide().eq( visible_idx ).fadeIn("slow");
	tabs.eq( visible_idx ).addClass(onclass);

	if(options.interval > 0){

		var timer = setInterval(function(){
			feature_slide();
		}, options.interval);

		output.mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			clearInterval(timer);
			timer = setInterval(function(){
				feature_slide();
			},options.interval);
		});

		if(options.pause_on_act == "mouseover"){
			tabs.mouseenter(function(){
				clearInterval(timer);
				var idx = tabs.index($(this));
				feature_slide(idx);
			}).mouseleave(function() {
				clearInterval(timer);
				timer = setInterval(function(){
					feature_slide();
				},options.interval);
			});
		}else{
			tabs.click(function(){
				clearInterval(timer);
				var idx = tabs.index($(this));
				feature_slide(idx);
			});
		}
	}
}



// $(function(){
//
// //侧导航
// 	var navBar=document.getElementById('right_nav');
// 	var report=0;
// 	var newHouse=0;
// 	var oldHouse=0;
// 	var office=0;
//
// 	if($('#report').length){
// 		report=$('#report').offset().top-140;
// 	}else{
// 		$('#right_nav li').eq(0).css({'height':0,padding:'0',marginBottom:0,overflow:'hidden'});
// 		report=newHouse;
// 	}
// 	if($('#newHouse').children().length>1||($('#newHouse').length==1&&$('#newHouse').find("script").length<=0)){
// 		newHouse=$('#newHouse').offset().top-140;
// 	}else{
// 		$('#right_nav li').eq(1).css({'height':0,padding:'0',marginBottom:0,overflow:'hidden'});
// 		newHouse=oldHouse;
// 	}
// 	if($('#oldHouse').length){
// 		oldHouse=$('#oldHouse').offset().top-140;
// 	}else{
// 		$('#right_nav li').eq(2).css({'height':0,padding:'0',marginBottom:0,overflow:'hidden'});
// 		oldHouse=office;
// 	}
// 	if($('#office').length){
// 		office=$('#office').offset().top-140;
// 	}else{
// 		$('#right_nav li').eq(3).css({'height':0,padding:'0',marginBottom:0,overflow:'hidden'});
// 		office=bottom;
// 	}
//
// 	var aPic=$('img');
// 	var clientH=document.documentElement.clientHeight;
// 	if($('.bot_more').lenght > 0){
// 		var bottom=$('.bot_more').offset().top-425;
// 		toTop();
// 		$(window).on('scroll',function(){
// 			toTop();
// 		});
// 	}
// 	//回到顶部
// 	var backTop=$('.right_nav .backtop');
// 	backTop.on('click',function(){
// 		var n=$(document).scrollTop();
// 		var timer=setInterval(function(){
// 			n-=110;
// 			$(document).scrollTop(n);
// 			if(n<=0){
// 				clearInterval(timer);
// 			}
// 		},30);
// 	});
//
// 	function getStyle(obj,sClass){
// 		return (obj.currentStyle || getComputedStyle(obj,false))[sClass];
// 	}
// 	function toTop(){
// 		var n=$(document).scrollTop();
// 		if(n>=report && n<newHouse){
// 			$('.right_nav li').removeClass('current');
// 			$('.right_nav li').eq(0).addClass('current');
// 		}else if(n>=newHouse && n<oldHouse){
// 			$('.right_nav li').removeClass('current');
// 			$('.right_nav li').eq(1).addClass('current');
// 		}else if(n>=oldHouse && n<office){
// 			$('.right_nav li').removeClass('current');
// 			$('.right_nav li').eq(2).addClass('current');
// 		}else if(n>=office && n<bottom){
// 			$('.right_nav li').removeClass('current');
// 			$('.right_nav li').eq(3).addClass('current');
// 		}else if(n>=bottom){
// 			$('.right_nav li').removeClass('current');
// 			$('.right_nav li').eq(4).addClass('current');
// 		}
// 		if(n>50){
// 			$(navBar).show();
// 		}else{
// 			$(navBar).hide();
// 		}
// 		//图片延迟加载
// 		for(var i=0;i<aPic.length;i++){
// 			var pic=aPic.eq(i);
// 			if(!pic.attr('src')){
// 				if(pic.attr('data-src')){
// 					if(n+clientH>pic.offset().top-200){
// 						pic.attr('src',pic.attr('data-src'));
// 					}
// 				}
// 			}
// 		}
//
// 	}
//
// });

// function setContentTab(name, curr) {
// 	//搜索历史
// 	// var searchName = 'search';
// 	// checkLastSearch(searchName + curr);
//
//   	// 设置搜索的类型
//   	var goTo = document.getElementById(name+curr).getAttribute('value');
//   	document.getElementById('search_Submit').action =  goTo;
//
//   	// 设置搜索时关键字推荐
//   	// var recommend = document.getElementById('con_' + name + '_' + curr);
//
//   	/**   首页切换搜索 或 地图   start **/
// 	$(".soufang").hover(function(){
// 	   $(this).next().removeClass("click1");
// 	   $(this).addClass("click");
// 	   var goTo = $('#'+name+curr).attr('value');
// 	   document.getElementById('search_Submit').action = goTo;
// 	});
//
// 	$(".map").hover(function(){
// 	   $(this).prev().removeClass("click");
// 	   $(this).addClass("click1");
// 	   var goTo = $('#'+name+curr).attr('mapvalue');
// 	   mapSearch = goTo; // 设置地图搜索跳转url
// 	});
//
// 	$('.searchInput').attr('placeholder',searchPlaceholder[curr]);
// 	hideSearchList();
// 	/**   首页切换搜索 或 地图   end **/
// }

$(document).ready(function() {
	/** 关键字搜索 **/
	var num = -1;
	var searchKeyWords = {keyword:'', tp:'', tp1:'', sr:'', obj:null};
	$('.buildname').on('keyup click', function(ev){
		var obj  = $(this);
		var content = $.trim($(obj).val());
		if(content.length == 0){
			$(obj).next().next().hide();
			return;
		}else{
			$(obj).next().next().show();
		}

		if(ev.keyCode == 40){
			num++;
			navSelectNextWord(obj);
			return false;
		}else if(ev.keyCode == 38){
			num--;
			navSelectLastWord(obj);
			return false;
		}else if( ev.keyCode == 13){
			if($(this).attr('tp') == 'loupan'){  // 如果 是查房价，记录它的上次搜索
				lastSearchPrice($(this));
			}else{
				$(obj).next().click();
			}
			// ev.defaultStop();
		}else if( ev.keyCode == 37 || ev.keyCode == 39){
			return false;
		}else{
			var tp = $('.search li.current').attr('tp');//$(obj).attr('tp');
			var val = $.trim($(obj).val());
			var sr = 1;
			if(tp == 'new'){
				searchKeyWords.tp1 = '';
			}
			else if(tp == 'sale' || tp =='rent'){
				searchKeyWords.tp1 = '3';
			}else if(tp == 'xzl'){
				searchKeyWords.tp1 = '2';
			}else if(tp == 'sp'){
				searchKeyWords.tp1 = '1';
			}else{
				searchKeyWords.tp1 = '*';
			}
			if(tp == 'new' || tp == 'loupan' || tp =='sale'){
				sr = 2;
			}
			//资讯关键字搜素
			// console.log(tp);
			if(tp == 'news'){
				searchKeyWords.keyword = val;
				searchKeyWords.tp = tp;
				searchKeyWords.obj = obj;
				searchNews(val);
				return false;
			}
			//装修关键字搜索
			if(tp == 'decoration'){
				searchKeyWords.keyword = val;
				searchKeyWords.tp = tp;
				searchKeyWords.obj = obj;
				searchDecoration(val);
				return false;
			}
			searchKeyWords.keyword = val;
			searchKeyWords.tp = tp;
			searchKeyWords.sr  = sr;
			searchKeyWords.obj = obj;
			getRecommend(searchKeyWords);
		}


	});
});


function getRecommend(searchKeyWords){
	var token = $('#token').val();
	var url = '/home_search_only';
	$.ajax({
		type:'get',
		url:url,
		data:{
			_token:token,
			keywords:searchKeyWords.keyword,
			tp:searchKeyWords.tp,
			tp1:searchKeyWords.tp1,
			sr:searchKeyWords.sr
		},
		success:function(data){
			//console.log(data);return false;
			if(data == 0) return false;
			data = data.res;
			var dataList = '';
			for( var i in data){
				var comName  = data[i]._source.name ? data[i]._source.name : data[i]._source.communityName;
				if(typeof comName != 'undefined'){
					//dataList += '<li><a class="selectSearch" value="'+ data[i]._source.id +'">'+ comName +'</a></li>';
					if(searchKeyWords.tp == 'new'){
						var type2 = data[i]._source.type2.length>0 ? data[i]._source.type2[0].split('|')[0]:301;
						dataList += '<li><a href="/xinfindex/'+data[i]._source.id+'/'+type2+'.html'+'" target="_blank" value="'+ data[i]._source.id +'">'+ comName +'</a></li>';
					}else{
						dataList += '<li><a class="selectSearch" value="' + data[i]._source.id + '">' + comName + '</a></li>';
					}
				}
			}
			dataList += '';
			searchKeyWords.obj.next().next().html(dataList);
			searchKeyWords.obj.next().next().show();
			// if(searchKeyWords.tp == 'loupan'){    // 如果 是查房价就走这里
			// 	$('.selectSearch').click(selectSearchPrice);
			// }else{
				$('.selectSearch').click(selectSearch);
			// }
		}
	});
}

function selectSearch(){
	var val = $(this).text();
	var id = $('.search li.current').attr('id').replace('home', '');
	$('#search_Intro').val(val);
	var obj = {};
	obj.val = val;
	obj.name = 'search' + id ;
	lastSearch(obj);

	/*if(id == 7){
		var action = $('#search_Submit').attr('action');
		if($('.mai').find('li').length > 0){
			var positionId = $(this).attr('positionId');
		}else{
			return false;
		}
		action = action.replace('{positionId}',positionId);
		$('#search_Submit').attr('action',action);
	}*/
  	$('#search_Submit').submit();
}

function selectSearchPrice(){
	var val = $(this).text();
	var id = $('.search li.current').attr('id').replace('home', '');
	$('input[tp="loupan"]').val(val);
	var obj = {};
	obj.val = val;
	obj.name = 'search' + id ;
	lastSearch(obj);
  	$('#checkprice').submit();
}
// 记录上次搜索的域，按城市区分
var CookieDomain = window.location.href.split('.');
CookieDomain = CookieDomain[0].replace('http://', '') + '.' +CookieDomain[1] + '.' + CookieDomain[2].replace('/', '');
// 异步记录用户上次搜索的关键字
function lastSearch(obj){
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 1440 * 60 * 1000);
	if(obj.val == '') return false;
	document.cookie = obj.name + ' = ' + obj.val + ';domain = '+ CookieDomain + '; expires = '+ expdate.toGMTString() +'; path = /;';
	hideSearchList();
	checkLastSearch(obj.name);
	num = -1;  // 将搜索关键字的指针初始化
}
// lastSearch();

// 检测是否有上次搜索过
function checkLastSearch(searchType){
	var str_start, str_end, val;
	var cookieName = searchType;
	if( (str_start = document.cookie.indexOf( cookieName +'=')) != -1){
		str_start = str_start +  cookieName.length + 1;
		str_end = document.cookie.indexOf(';', str_start);
		if(str_end == -1){
			val = document.cookie.substr(str_start);
		}else{
			val = document.cookie.substr(str_start, (str_end - str_start));
		}
		// $('.search_txt').css('border-radius','5px 5px 0 0');
		lastSearchIn(val);
	}else{
		$('#lastSearch').parent('.mark_l').hide();
		// $('.search_txt').css('border-radius','5px');
	}
}
checkLastSearch('search3');

// 将检测到的关键字放入搜索框下面
function lastSearchIn( str ){
	$('#lastSearch').text(str);
	$('#lastSearch').parent('.mark_l').show();
	$('#lastSearch').click(function(){
		var val = $(this).text();
	});
	$('#lastSearch').show();
}

// 查出搜索的关键字后，可以通过导航键来选择下一个
function navSelectNextWord(obj){

	var mai = obj.next().next().find('li');
	$(mai).css('background-color', '#fff');
	var m   = mai.length;
	if(num >=  m ){
		num = 0;
		$(mai[num]).css('background-color', '#e8e8e8');
		obj.val( $(mai[num]).children('a').text() );

	}else{
		$(mai[num]).css('background-color', '#e8e8e8');
		obj.val( $(mai[num]).children('a').text() );

	}
}
// 查出搜索的关键字后，可以通过导航键来选择上一个
function navSelectLastWord(obj){
	var mai = obj.next().next().find('li');
	$(mai).css('background-color', '#fff');
	var m   = mai.length;
	if(num < 0){
		num = m - 1 ;
		$(mai[num]).css('background-color', '#e8e8e8');
		obj.val( $(mai[num]).children('a').text() );

	}else{
		$(mai[num]).css('background-color', '#e8e8e8');
		obj.val( $(mai[num]).children('a').text() );
	}

}

// 在提交搜索的时候把关键字列表隐藏
function hideSearchList(){
	$('.search_txt ul').hide();
}

//
function lastSearchPrice(price){
	var val = price.val();
  	var id = $('.search li.current').attr('id').replace('home', '');
  	var obj = {};
  	obj.val = val;
  	obj.name = 'search' + id ;
  	lastSearch(obj);
}

window.onclick = function(ev){
	if(!checkParent(ev.target, 'mai')){
		hideSearchList();
	}
}

// 计算出该次事件对象e 的 父元素是否有class 'par'
function checkParent(e, par){
	if(!e.parentNode) return false;
	if(e.parentNode.className && e.parentNode.className.split(' ').indexOf(par) >= 0 ){
		return true;
	}else{
		return checkParent(e.parentNode, par);
	}
}
//搜索文章
function searchNews(val){
	token = $('#token').val();
	var data={_token:token,keyword:val};
	$.ajax({
		type:'post',
		url:'/article/search',
		data:data,
		dataType:'json',
		success:function(data){
			//console.log(data);return false;
			if(data == 0){
				searchKeyWords.obj.next().next().html('');
				searchKeyWords.obj.next().next().hide();
				return false;
			}
			//data = data.res;
			var dataList = '';
			for( var i in data){
				if(typeof data[i].title != 'undefined'){
					dataList += '<li><a href="/article/'+data[i].id+'.html" positionId="'+ data[i].positionId +'" class="selectSearch" value="'+ data[i].id +'">'+ data[i].title +'</a></li>';
				}
			}
			dataList += '';
			searchKeyWords.obj.next().next().html(dataList);
			searchKeyWords.obj.next().next().show();
			//$('.selectSearch').click(selectSearch);
		}
	});
}
//搜索装修
function searchDecoration(val){
	token = $('#token').val();
	var data={_token:token,keyword:val};
	$.ajax({
		type:'post',
		url:'/decoration/search',
		data:data,
		dataType:'json',
		success:function(data){
			//console.log(data);return false;
			if(data == 0){
				searchKeyWords.obj.next().next().html('');
				searchKeyWords.obj.next().next().hide();
				return false;
			}
			//data = data.res;
			var dataList = '';
			for( var i in data){
				if(typeof data[i].title != 'undefined'){
					dataList += '<li><a class="selectSearch" value="'+ data[i].id +'">'+ data[i].title +'</a></li>';
				}
			}
			dataList += '';
			searchKeyWords.obj.next().next().html(dataList);
			searchKeyWords.obj.next().next().show();
			$('.selectSearch').click(selectSearch);
		}
	});
}

