$(document).ready(function(e) {
  //city
	var oCity=document.getElementById('city');
	var oBtn=oCity.children[0];
	var oList=oCity.children[1];
	var oN=oBtn.children[0];
	var n=200;
	var timer=null;
	var timer2=null;
	addEvent(oBtn,'mouseover',function(){
		clearTimeout(timer);
		oN.style.color='#F8D347';
		timer=setTimeout(function(){
			oList.style.display='block';
		},500);
	});
	addEvent(oBtn,'mouseout',function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			oList.style.display='none';
			oN.style.color='#fff';
		},200);
	});
	addEvent(oList,'mouseover',function(){
		clearTimeout(timer);
		setTimeout(function(){
			oList.style.display='block';
			oN.style.color='#F8D347';
		},200);
	});
	addEvent(oList,'mouseout',function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			oList.style.display='none';
			oN.style.color='#fff';
		},200);
	});

	function addEvent(obj,sEv,fn){
	    if(obj != null){
            if(obj.addEventListener){
                obj.addEventListener(sEv,fn);
            }else{
                obj.attachEvent('on'+sEv,fn);
            }
        }

	}

	$("#ldd_menu li").mouseover(function(){
	   $(this).find(".a").addClass("click");
	   $("#ldd_menu .nav_select").hide();
	   $(this).find(".nav_select").show();
    });
	$("#ldd_menu li").mouseout(function(){
	   $(this).find(".a").removeClass("click");
	   $(this).find(".nav_select").hide();
    });

	$(".tab_nav a").click(function(){
		$(".tab_nav a").removeClass("click");
		if($(this).text()=="街景地图"){
		  $(this).addClass("click");
		  $(".jj").show();
		  $(".jt").hide();
		}else{
		  $(this).addClass("click");
		  $(".jj").hide();
		  $(".jt").show();
		}
   });

   $(".jt_nav a").click(function(){
	  $(".jt_nav a").removeClass("click");
	  $(this).addClass("click");
	  if($("#zk").parent().css("right")=="-250px"){
		$("#zk").parent().animate({"right":20});
	  }
  });

  $("#zk").click(function(){
	  if($(this).parent().css("right")=="20px"){
		$(this).parent().animate({"right":-250});
	  }else{
		$(this).parent().animate({"right":20});
	  }
  });

  $("#login h2 a").click(function(){
	 $("#login h2 a").removeClass("click");
	 $(this).addClass("click");
	 if($(this).text()=="账号密码登录")	{
		$(".userLogin").show();
		$(".userLogin1").hide();
	 }else{
		$(".userLogin1").show();
		$(".userLogin").hide();
	 }
  });

  $(".top_r .user").hover(function(){
	 $(this).addClass("click");
	 $(this).find("p").show();
  },function(){
	 $(this).removeClass("click");
	 $(this).find("p").hide();
  });

});


