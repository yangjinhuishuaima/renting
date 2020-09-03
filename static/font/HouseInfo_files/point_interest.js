var pointerType;
// 传入用于关注标签的 class name
window.point_interest_time = 0;
function point_interest(obj){
	pointerType = arguments[1];
	
	//var interest = document.getElementsByClassName(obj);
	var interest=getByClass(document,obj);
	for(i=0; i < interest.length ; i++ ){
		(function(){
			var p = i;
			interest[p].onclick = function(ev){
				ev.preventDefault();
				send_interest_info(this);
			}
		})();
	}
}
//
function getByClass(obj,sName){
	if(obj.getElementsByClassName){//支持即为true，不支持是undefined，即为false。
		return obj.getElementsByClassName(sName);
	}else{
		var arr=[];
		var allChild=document.getElementsByTagName('*');	 
		for(var i=0;i<allChild.length;i++){
			var obj=allChild[i];
			var str=obj.className
			var arrName=str.split(' ');
		
			for(var j=0;j<arrName.length;j++){
				if(arrName[j]==sName){
					arr.push(obj);
				}
			}	
		}
		return arr;	
	}	
}

/**
* obj 的 value 中的数据 用逗号隔开  
* 楼盘或房源:id , 对应关联表类型: 1(房源出租) 2(房源出售) 3(楼盘), 物业类型: 1商铺 2写字楼 3住宅 , 是否新盘: 1新盘 0 二手房
*/
function send_interest_info(obj){
	window.point_interest_time++;
	if(window.point_interest_time%2 == 0)return ;

	var n = obj.getAttribute('value').split(',');
	if(pointerType == 'esfIndex'){
		var cont = obj;
	}else{
		var cont = obj.parentNode.childNodes[1];
	}
	if(pointerType == 'xcy'){
		cont = obj.childNodes[1];
	}
	var token = $('#token').val();
	var url = '/point_interest';
	$.ajax({
		type:'get',
		url:url,
		data:{
			//_token:token,
			id:n[0],
			tabId:n[1],
			type:n[2],
			isNew:n[3]
		},
		dataType:'json',
		success:function(data){
			if(data == 1){
				alert('关注成功');
				if(pointerType == 'home'){
					$(cont).addClass('click');
					return false;
				}
				console.log($(cont));
				// cont.textContent = '已关注';
				$(cont).parent().find('span').eq(0).text('已关注');
				$(cont).parent().parent().addClass('follow');
			}
			if(data == 2){
				alert('取消关注成功');
				if(pointerType == 'home'){
					$(cont).removeClass('click');
					return false;
				}
                                if(pointerType == 'reload'){
                                    window.location.reload();
                                    return false;
                                }
				// cont.textContent = '关注';
				$(cont).parent().parent().removeClass('follow');
				$(cont).parent().find('span').eq(0).text('关注');
			}
			if(data == 0){
				var href = $('.top_r').find('a').eq(0).attr("href");
				window.location.href = href;
			}
			if(data == 3){
				alert('您不是普通用户，不能对此进行关注');
			}
			window.point_interest_time--;
		}
	});

}
