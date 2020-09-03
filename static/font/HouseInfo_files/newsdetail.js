$(function() {
	$("#num2").html($(".pics").length);
    var firstpic = $(".detail_picbot_mid ul li").first().find("img");
    var firstsrc = firstpic.attr("bigimg");
    var firsttxt = firstpic.attr("text");
    $("#pic1").attr("src", firstsrc);
    firstpic.addClass("selectpic");
    $(".miaoshu").text(firsttxt);
    $(".detail_context_pic_top").hover(function() {
        $("#preArrow_A").css("display", "block")
    },
    function() {
        $("#preArrow_A").css("display", "none")
    });
    $(".detail_context_pic_top").hover(function() {
        $("#nextArrow_A").css("display", "block")
    },
    function() {
        $("#nextArrow_A").css("display", "none")
    });
    function preclick() {
        var currrentindex = parseFloat($("#pic1").attr("curindex"));
        if (currrentindex != 0) {
            var curli = $(".detail_picbot_mid ul li").eq(currrentindex);
            var length = $(".detail_picbot_mid ul li").length;
            if (currrentindex <= (length - 4)) {
                $(".detail_picbot_mid ul li").eq(currrentindex + 3).css("display", "none");
                $(".detail_picbot_mid ul li").eq(currrentindex - 1).css("width", "120px").css("display", "block")
            }
            var curnextli = $(".detail_picbot_mid ul li").eq(currrentindex - 1);
            var curnextsrc = curnextli.find("img").attr("bigimg");
            var curnexttxt = curnextli.find("img").attr("text");
            curli.find("img").removeClass("selectpic");
            curnextli.find("img").addClass("selectpic");
            $("#pic1").attr("src", curnextsrc);
            $("#pic1").attr("curindex", currrentindex - 1)
			$("#num1").html(currrentindex);
        } else {
            $(".bodymodal").css("display", "block");
            $(".firsttop").css("display", "block")
        }
    }
    $("#preArrow_B").click(function() {
        preclick()
    });
    $("#preArrow").click(function() {
        preclick()
    });
    $("#nextArrow_B").click(function() {
        nextclick()
    });
    $("#nextArrow").click(function() {
        nextclick()
    });
    
    var bannerBox=$('.detail_context_pic_top'),picList=$('.detail_picbot_mid li'),current=$('#num1'),showPic=$('#pic1');
    picList.on('click',function(){
        var this_img = $(this).find('img');
    	picList.find('img').removeClass('selectpic');
    	var newSrc=$(this).find('img').attr('bigimg');
        this_img.addClass('selectpic');
    	showPic.attr('src',newSrc);
    	var index=$(this).index();
    	current.html(index+1);    	
    	showPic.attr('curindex',index);
    	if (typeof(this_img.attr("video")) == "undefined") {
            $("#community_video").hide();
            $("#community_image").show();
        } else {
            $("#community_video").show();
            $("#community_image").hide();
        }
    });
    
    function nextclick() {
        var currrentindex = parseFloat($("#pic1").attr("curindex"));
        var length = $(".detail_picbot_mid ul li").length;
        if (currrentindex != (length - 1)) {
            var curli = $(".detail_picbot_mid ul li").eq(currrentindex);
            if (currrentindex > 2) {
                $(".detail_picbot_mid ul li").eq(currrentindex - 3).css("display", "none");
                $(".detail_picbot_mid ul li").eq(currrentindex+1).css("width", "120px").css("display", "block")
            }
            var curnextli = $(".detail_picbot_mid ul li").eq(currrentindex + 1);
            var curnextsrc = curnextli.find("img").attr("bigimg");
            var curnexttxt = curnextli.find("img").attr("text");
            curli.find("img").removeClass("selectpic");
            curnextli.find("img").addClass("selectpic");
            $("#pic1").attr("src", curnextsrc);
            $("#pic1").attr("curindex", currrentindex + 1);
            $("#num1").html(currrentindex+2);
        } else {
            $(".bodymodal").css("display", "block");
            $(".endtop").css("display", "block")
        }
    }
    /*$(".detail_picbot_mid ul li").click(function() {
        var currentliindex = $(this).index(".detail_picbot_mid ul li");
        $(".detail_picbot_mid ul li img[class='selectpic']").removeClass("selectpic");
        var currentli = $(".detail_picbot_mid ul li").eq(currentliindex);
        currentli.find("img").addClass("selectpic");
        var bigimgsrc = currentli.find("img").attr("bigimg");
        var curnexttxt = currentli.find("img").attr("text");
        $("#pic1").attr("src", bigimgsrc);
        $("#pic1").attr("curindex", currentliindex);
    });*/
});

//全屏图片
  var fullMask=$('.fullScreen');
  var fullPic=$('.pic_box img');
  var fullPrev=$('.fullScreen .f_left');
  var fullRight=$('.fullScreen .f_right');
  var fullClose=$('.fullScreen .close');
  var sliderPic=$('.s_pic');
  var now=0;
	$('#pic1').click(function(){
		fullMask.show();
		var _index=$(".pics").index();
		now=_index;
		fullPic.attr('src',sliderPic.eq(now).attr('bigimg'));
	});

  fullPrev.on('click',function(){
  	 now--;
  	 if(now<0){
	 	now=sliderPic.length-1;
	 }
	 fullPic.attr('src',sliderPic.eq(now).attr('bigimg'));
  });  
  //right
  fullRight.on('click',function(){
  	now++;
  	if(now>sliderPic.length-1){
	 	now=0;
	}
	fullPic.attr('src',sliderPic.eq(now).attr('bigimg'));
  });  

  //close
	fullClose.on('click',function(){
	  	fullMask.hide();
	});
  
  //esc
  $(document).on('keydown',function(ev){
  	if(ev.keyCode==27){
  		fullMask.hide();
  	}
  });