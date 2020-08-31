$(document).ready(function(e) {
  //焦点控制确认按钮
	$('.prc .txt').each(function(index){
		var _index=index;
		$(this).focus(function(){
			switch(_index){
				case 0:
					$('.prc .btn').eq(0).show();
				break;
				case 1:
					$('.prc .btn').eq(0).show();
				break;
				case 2:
					$('.prc .btn').eq(1).show();
				break;
				case 3:
					$('.prc .btn').eq(1).show();
				break;
			}
			
		});
	});
	$('.prc .txt').each(function(index){
		var _index=index;
		$(this).blur(function(){
			if(!$(this).val()){
				switch(_index){
					case 0:
						$('.prc .btn').eq(0).hide();
					break;
					case 1:
						$('.prc .btn').eq(0).hide();
					break;
					case 2:
						$('.prc .btn').eq(1).hide();
					break;
					case 3:
						$('.prc .btn').eq(1).hide();
					break;
				}
			}	
		});
	});
	
	/* 筛选更多条件 下拉菜单 房源 */
	$(".more_screen .term").click(function (event) {
		$(".pt").hide();
		$(".list_tag").hide();
		$(this).find(".list_tag").fadeIn();
		$(document).one("click", function () {//对document绑定一个影藏Div方法
			$(".list_tag").hide();
		});
		event.stopPropagation();//点击 www.it165.net Button阻止事件冒泡到document
	});
	$(".list_tag").click(function (event) {
	        event.stopPropagation();//在Div区域内的点击事件阻止冒泡到document
	});
	$(".list_tag li").click(function(){
	   	$(this).parents().find(".list_tag").hide();	
		$(this).parents(".term").find(".term_title span").html($(this).html());
	});
	
	$("#pt .btn_true").click(function(){
	  	$("#pt").hide();
    });
	
	
	/* 配套下拉 */
	$(".term1").click(function (event) {
		$(".list_tag").hide();
		$("#pt").fadeIn();
		$(document).one("click", function () {//对document绑定一个影藏Div方法
		 	$("#pt").hide();
		});
		event.stopPropagation();//点击 www.it165.net Button阻止事件冒泡到document
	});
	$(".list_tag").click(function (event) {
	        event.stopPropagation();//在Div区域内的点击事件阻止冒泡到document
	});
	$(".list_tag li").click(function(){
	   	$(this).parents().find(".list_tag").hide();	
	});
});
function webcity(name, curr) {
  var num=$(".dd a").length;
  for (i = 1; i <= num; i++) {
	  var menu = document.getElementById(name + i);
	  var cont = document.getElementById("con_" + name + "_" + i);
	  menu.className = i == curr ? "colorR" : "";
	  if (i == curr) {
		  cont.style.display = "block";
	  } else {
		  cont.style.display = "none";
	  }
  }
}
function webMpe(name, curr) {
  var num=5;
  for (i = 1; i <= num; i++) {
	  var menu = document.getElementById(name + i);
	  var cont = document.getElementById("con_" + name + "_" + i);
	  menu.className = i == curr ? "click" : "";
	  if (i == curr) {
		  cont.style.display = "block";
	  } else {
		  cont.style.display = "none";
	  }
  }
}
