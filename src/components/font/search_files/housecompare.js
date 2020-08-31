//房源添加对比
function addCompare(id,name,type,houseType1){
        if($('ul.db_info').children().length >=4){
            xalert({
                title : '提示',
                content : '最多选择4个房源',
                time : 2,
            });
            return false
        }
        // 1 ,表示出租  2 表示出售
        var style = type;
        $('dl.title').hide();       
        var n = 0;
        var i = 0;
        if($('ul.db_info').children().length == 0){
            var comm = '<li><input type="checkbox" name="check[]" value="'+id+'" checked><span class="property">'+name+'</span><i onclick="del(this)"></i></li>';  
            // 执行ajax  查询该房源的基本信息
            //searchHouse(id,style,houseType1);
            $('ul.db_info').append(comm);
        }else{
            $('ul.db_info').children().each(function(){
                    if($(this).children().val() != id){
                        ++n;  
                    }
                    ++i;
            });
            if(n == i){
                    var commList = '<li><input type="checkbox" name="check[]" value="'+id+'" checked><span class="property">'+name+'</span><i onclick="del(this)"></i></li>';  
                    // 执行ajax  查询该房源的基本信息
                    //searchHouse(id,style,houseType1);
                    $('ul.db_info').append(commList);
            }
        }
        
        $('div.db_msg').show();
    }
    // 点击叉号移除当前li标签 
    function del(obj){    
        $(obj).parent().remove();
    }
    
    // 房源执行ajax  查询该房源的基本信息
    function searchHouse(houseId,type1,houseType1){

        var crtoken = $('input[name="_token"]').val();
        var url = '/searchInfo/compare';
        $.ajax({
            type : 'POST',
            url : url,
            data : {
                _token : crtoken,
                id : houseId,
                type : type1,
                houseType1 : houseType1
            },
            dataType : 'json',
            success : function(msg){
                
            }
        });
    }
    
    // 房源开始对比
    function startCompare(type){
        var houseType = type;
        var obj = $('ul.db_info').children().find('input[name="check[]"]:checked');
        if(obj.length > 4){
            xalert({
                        title : '提示',
                        content : '最多选择4个房源',
                        time : 2,
                    });
            return false
        }else if(obj.length < 1){
            xalert({
                        title : '提示',
                        content : '至少选择1个房源',
                        time : 2,
                    });
            return false
        }else{
            var houseId = [];
            // 循环获取被选中的房源id
            for(var i=0; i < obj.length; i++){
                houseId[i] = obj[i].value;
            }
            houseId = houseId.join(',');
            window.location = '/compareView/'+houseType+'?houseId='+houseId;
        }
    }

//楼盘对比
    function addBuildCompare(id,name,conn,houseType1) {
        // id:楼盘id name:楼盘名称 conn:数据库(0:二手楼盘,1:新盘) houseType1:住宅类型(1:商铺,2:写字楼,3:住宅)
        $('dl.title').hide();
        var n = 0;
        var i = 0;
        if($('ul.db_info').children().length >=4){
            xalert({
                title : '提示',
                content : '最多选择4个房源',
                time : 2,
            });
            return false
        }
        if ($('ul.db_info').children().length == 0) {
            var comm = '<li><input type="checkbox" name="check[]" value="' + id + '" checked><span class="property">' + name + '</span><i onclick="del(this)"></i></li>';
            // 执行ajax  查询该房源的基本信息
            searchBuild(id, conn, houseType1);
            $('ul.db_info').append(comm);
        }else{
            $('ul.db_info').children().each(function(){
                if($(this).children().val() != id){
                    ++n;
                }
                ++i;
            });
            if(n == i){
                var commList = '<li><input type="checkbox" name="check[]" value="'+id+'" checked><span class="property">'+name+'</span><i onclick="del(this)"></i></li>';
                // 执行ajax  查询该房源的基本信息
                searchBuild(id,conn,houseType1);
                $('ul.db_info').append(commList);
            }
        }

        $('div.db_msg').show();
    }
    // 楼盘执行ajax  查询该房源的基本信息
    function searchBuild(houseId,conn,houseType1){
        $.get("/saveBuildCompare",{id:houseId,conn:conn,type1:houseType1});
    }
    // 楼盘开始对比
    function startBuildCompare(conn){
        var obj = $('ul.db_info').children().find('input[name="check[]"]:checked');
        if(obj.length > 4){
            xalert({
                title : '提示',
                content : '最多选择4个楼盘',
                time : 2,
            });
            return false
        }else if(obj.length < 1){
            xalert({
                title : '提示',
                content : '至少选择1个楼盘',
                time : 2,
            });
            return false
        }else{
            var communityId = [];
            // 循环获取被选中的房源id
            for(var i=0; i < obj.length; i++){
                communityId[i] = obj[i].value;
            }
            communityId = communityId.join(',');
            window.location = '/buildContrast?communityId='+communityId+'&conn='+conn;
        }
    }
      /**
     *   xcy弹出显示页面
     * @param  xcy
     */
    //function xalert(xcy){
    //var ss = '<div style="display: block; opacity: 0.45;" id="lean_overlay"></div>';
    //ss +='<div style="display: block; position: fixed; opacity: 1; z-index: 1001; top: 100px; left: 50%; margin-left: -222.5px;" class="change_tel" id="cd">';
    //ss += '<span class="close xclose" ></span>';
    //ss +='<h2>'+xcy.title+'</h2>';
    //ss += '<div class="change3">';
    //ss += '<p class="p"><i></i>'+xcy.content+'</p>';
    //ss +='</div>';
    //ss +='<div class="submit">';
    //if(xcy.ok){
		//ss +='<a class="btn back_color margin_r determine">确定</a>';
		//ss +='<a class="btn back_color xclose">取消</a>';
		//ss +='</div>';
    //}
    //ss +='</div>';
    //$('#cd').remove();
    //$('#lean_overlay').remove();
    //$('body').append(ss);
    //$('.xclose').bind('click',xhide);
    //if(!xcy.time){
		//xcy.time = 1;
    //}
    //if(xcy.ok){
		//$('.determine').bind('click',function(){
		//	xcy.ok();
		//});
    //}else{
		//if(xcy.url){
		//	setTimeout(function(){GoTo(xcy.url);},xcy.time*1000);
		//}else{
		//	setTimeout(xhide,xcy.time*1000);
		//}
    //}
    //
    //function xhide(){
		//$('#cd').hide();
		//$('#lean_overlay').hide();
    //}
    //function  GoTo(url){
		//location.href= url;
    //}
    //}
//xcy弹出显示页面
function xalert(xcy){
    if(!xcy.title){
        xcy.title = '';
    }
    if(!xcy.state){
        xcy.state = 1;
    }
    var ss = '<div style="display: block; opacity: 0.45;" id="lean_overlay"></div>';
    ss +='<div style="display: block; position: fixed; opacity: 1; z-index: 999999; top: 100px; left: 50%; margin-left: -222.5px;" class="change_tel" id="cd">';
    ss += '<span class="close xclose" ></span>';
    ss +='<h2>'+xcy.title+'</h2>';
    ss += '<div class="change3">';
    if(xcy.state == 2){
        ss += '<p class="p"><i class="error"></i>'+xcy.content+'</p>';
    }else if(xcy.state == 3){
        ss += '<p class="p"><i class="confirm"></i>'+xcy.content+'</p>';
    }else{
        ss += '<p class="p"><i></i>'+xcy.content+'</p>';
    }
    ss +='</div>';
    ss +='<div class="submit">';
    if(xcy.ok){
        ss +='<a class="btn back_color margin_r determine">确定</a>';
        ss +='<a class="btn back_color xclose">取消</a>';
        ss +='</div>';
    }
    ss +='</div>';
    $('#cd').remove();
    $('#lean_overlay').remove();
    $('body').append(ss);
    $('.xclose').bind('click',xhide);
    if(!xcy.time){
        xcy.time = 1;
    }
    if(xcy.ok){
        $('.determine').bind('click',function(){
            xcy.ok();
        });
    }else{
        if(xcy.url){
            setTimeout(function(){GoTo(xcy.url);},xcy.time*1000);
        }else{
            setTimeout(xhide,xcy.time*1000);
        }
    }

    function xhide(){
        $('#cd').hide();
        $('#lean_overlay').hide();
    }
    function  GoTo(url){
        location.href= url;
    }
}

    