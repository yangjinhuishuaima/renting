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
$(document).ready(function(e) {
  $(".dd2 a").click(function(){
	if($(this).val()=="街景地图"){
	  $(".dd2 a").removeClass("click");
	  $(this).addClass("click");
	  $(".match").hide();
	  $(".map1").show();	
	}else{
	  $(".dd2 a").removeClass("click");
	  $(this).addClass("click");
	  $(".match").hide();
	  $(".map2").show();
	}
  });
});