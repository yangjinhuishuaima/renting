//通栏轮播
$(document).ready(function(e) {
 $('.advertisingBannerClass').each(function(){
	 tabsBanner($(this).find('li'));
  }); 
  $(".s_ban").css("display","none"); 
});
function tabsBanner(obj){
	var n=0;
	if(obj.length>1){
		if(n == 0){
			obj.eq(n).css('display','none');
		}
		setInterval(function(){
			n++;
			if(n>obj.length-1){
				n=0;
			}
			obj.hide();
			obj.eq(n).css('display','block');
		},2000);
	}
}
$(document).ready(function(e) {
	$('.advertisingClass').each(function(){
		tabsAdvertising($(this).find('a'));
	});
});
function tabsAdvertising(obj){
	var n=0;
	if(obj.length>1){
		if(n == 0){
			obj.eq(n).css('display','none');
		}
		setInterval(function(){
			n++;
			if(n>obj.length-1){
				n=0;
			}
			obj.hide();
			obj.eq(n).css('display','block');
		},2000);
	}
}

$(document).ready(function(e) {
	$('.advertisingCloseClass').each(function(){
		tabsAdvertisingClose($(this).find('a'));
	});
});
function tabsAdvertisingClose(obj){
	var n=0;
	if(obj.length>1){
		if(n == 0){
			obj.eq(n).css('display','none');
		}
		setInterval(function(){
			n++;
			if(n>obj.length-1){
				n=0;
			}
			obj.hide();
			obj.eq(n).css('display','block');
		},2000);
	}
}
  
//对联广告到头部隐藏
$(window).bind("scroll", function () { 
  var sTop = $(window).scrollTop(); 
  var sTop = parseInt(sTop); 
  if (sTop >= 510) { 
	  $(".s_ban").show();
	  
  } 
  else { 
	  $(".s_ban").hide();
  }  
}); 

//滚动条
var linebox=$('.openlist'),oLineList=$('.linear'),oBar=$('.swipe'),oSwipe=$('.swipebox');
var lineHeight=oLineList.outerHeight(),boxHeight=linebox.height();
if(lineHeight>boxHeight){
	oSwipe.show();
}else{
	oSwipe.hide();
}

var advClose=$('.adv-close');
advClose.each(function(index){
	closeAdv(advClose.eq(index));
})

function closeAdv(obj){
	obj.on('click',function(){
		$(this).parent().parent().remove();
	});
}
$(document).ready(function(e) {
  $(".adv-close").click(function(){
	$(this).parent(".s_ban").remove();	
  });
});

oBar.on('mousedown',function(e){
	var oldY=e.clientY;
	var top=parseInt(oBar.css('top'));
	var lineTop=parseInt(oLineList.css('top'));
	$(document).on('mousemove',function(e){
		var disY=e.clientY-oldY;
		var maxH=boxHeight-oBar.height();
		var t=top+disY;
		if(t<0){
			t=0;
		}
		if(t>maxH){
			t=maxH;
		}
		oBar.css('top',t+'px');
		e.cancelBubble = true; 
		var lineDis=boxHeight-lineHeight;		
		var scale=disY/maxH;
		var sliderDis=scale*lineDis;
		var lTop=lineTop+sliderDis;
		if(lTop>0){
			lTop=0;
		}
		if(lTop<lineDis){
			lTop=lineDis;
		}
		oLineList.css('top',lTop+'px');
		oBar.releaseCapture;		
		return false;
	});
	$(document).on('mouseup',function(){
		$(document).off('mousemove');
		$(document).off('mouseup');
	});
});

//标题切换

var tableItem=$('.tabbox .tabItem'),tableList=$('.tabbox .tab-area');

tableItem.each(function(index){	
	var objBar=tableItem.eq(index).children();
	tableList.eq(index).children().eq(0).addClass('current');
	var objList=tableList.eq(index).children();
	tabItem(objBar,'current',objList);	
	
});


function tabItem(objList,curname,tabArea){	
	objList.on('mouseover',function(){			
		objList.removeClass('current');
		$(this).addClass('current');
		var cur=$(this).index();
		tabArea.removeClass('current');
		tabArea.eq(cur).addClass('current');
	});	
}

if(document.getElementById("float")){
  //漂浮广告
  var ggRoll = {  
	  roll : document.getElementById("float"),  
	  speed : 20,  
	  statusX : 1,  
	  statusY : 1,  
	  x : 10,  
	  y : 10,  
	  winW : document.documentElement.clientWidth - document.getElementById("float").offsetWidth,  
	  winH : document.documentElement.clientHeight - document.getElementById("float").offsetHeight,  
	  Go : function(){  
		  this.roll.style.left=this.x+'px';  
		  this.roll.style.top=this.y+'px';  
			 
		  this.x = this.x + (this.statusX? -1: 1)  
		  if(this.x < 0) {this.statusX = 0}  
		  if(this.x > this.winW) {this.statusX = 1}  
			 
		  this.y = this.y + (this.statusY? -1: 1)  
		  if(this.y < 0) {this.statusY = 0}  
		  if(this.y > this.winH) {this.statusY = 1}  
	  }  
  }  
  var interval = setInterval("ggRoll.Go()", ggRoll.speed);  
  ggRoll.roll.onmouseover = function(){clearInterval(interval)};  
  ggRoll.roll.onmouseout = function(){interval = setInterval("ggRoll.Go()", ggRoll.speed)}; 	
}
 

//推荐
	var barItem=$('.tabbar .tabItem td'),sliderBox=$('.sliderbox');
	var showCur=0;
	
	sliderBox.eq(0).addClass('current');
	barItem.on('mouseover',function(){
		barItem.removeClass('current');
		sliderBox.removeClass('current');
		$(this).addClass('current');
		var index=$(this).index();
		sliderBox.eq(index).addClass('current');
	});
	
	sliderBox.each(function(index){
		
		var slider=sliderBox.eq(index).children('.refer').children('ul');
		var leftBtn=sliderBox.eq(index).children('.l');
		var rightBtn=sliderBox.eq(index).children('.r');
		todrag(slider,rightBtn,leftBtn)
		
		
	});
	
	
	function todrag(slider,rightBtn,leftBtn){
		var oW=275;
		var allWidth=slider.children().length*oW;
		var total=slider.children().length;
		if(total<=4){
			rightBtn.addClass('block');
			leftBtn.children().hide();
			rightBtn.children().hide();
		}
		slider.width(allWidth);
		var count=total-4;
		var n=0;
		rightBtn.on('click',function(){	
			if(n>=count){	
				return;
				n=0;
			}
			n++;
			slider.animate({left:-n*oW+'px'});
			leftBtn.addClass('block');
			if(n==count){
				$(this).addClass('block');
				leftBtn.addClass('block');
			}
		});
		leftBtn.on('click',function(){
			if(n<=0){	
				return;
				n=count;
			}
			n--;
			slider.animate({left:-n*oW+'px'});
			rightBtn.removeClass('block');
			if(n==0){
				$(this).removeClass('block');
				rightBtn.removeClass('block');
			}
		});	
	}

//房产快讯banner
var wordBan=$('.word-adv li'),wordPoint=$('.word-adv .position span'),wordAdv=$('.word-adv');
var index=0;
wordBan.eq(0).addClass('current');
wordPoint.eq(0).addClass('current');
wordPoint.on('click',function(){
	var cur=$(this).index();
	index=cur;
	wordBan.removeClass('current');
	wordPoint.removeClass('current');
	$(this).addClass('current');
	wordBan.eq(index).addClass('current');
});
var wordTimer=null;
clearInterval(wordTimer);
 wordTimer=setInterval(auto,3000);
function auto(){
	if(index>=wordBan.length-1){
		index=-1;
	}
	index++;
	wordBan.removeClass('current');
	wordPoint.removeClass('current');
	wordPoint.eq(index).addClass('current');
	wordBan.eq(index).addClass('current');	
}
wordAdv.on('mouseenter',function(){
	clearInterval(wordTimer);
});
wordAdv.on('mouseleave',function(){
	wordTimer=setInterval(auto,3000);
});


//全屏广告5s自动关闭
var fullAdv=$('.adv-bg');
if(fullAdv.length){
	autoClose(fullAdv,5);
}

