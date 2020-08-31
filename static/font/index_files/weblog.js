$(function(){


    function setCookie(name, value, domain)
    {
        //var exdate = new Date();
        //exdate.setDate(exdate.getDate() + 3*60*1000);
        //exdate.setTime(exdate.getTime() + 3*60*1000);
        //document.cookie = name + "=" + value + ';expires=' + exdate.toGMTString();
        var cookie = name + "=" + value + ';expires=Fri, 31 Dec 9999 23:59:59 GMT';
        if(domain){
            cookie = cookie + ';domain=' + domain;
        }
        document.cookie = cookie + ';expires=Fri, 31 Dec 9999 23:59:59 GMT';
    }

    function getCookie(name)
    {
        if (document.cookie.length > 0){
            var start = document.cookie.indexOf(name + '=');
            if (start != -1){
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if(end == -1) end = document.cookie.length;
                return document.cookie.substring(start, end);
            }
        }
        return '';
    }


    var cookieName = getCookie('uniqueName');
    //来访时间
    var g_comeTime = Date.parse(new Date());
    if(!cookieName){
        cookieName = $.md5(new Date().getTime() + Math.random() * 1000);
        var domain_start = document.domain.indexOf('.');
        var domain = document.domain.substring(domain_start);
        setCookie('uniqueName', cookieName, domain);
    }
    // 发送请求
    var url = "/log/viewCount";
    var data = {
        url :   window.location.href,
        cookieName : cookieName,
        refer : document.referrer,
        viewBill : $.trim($('input[name=viewBill]').val()),
    };
    $.get(url,data,function(r){});


    ////记录逗留的时间
    //function g_loggerTime(){
    //    var url = "/log/viewStay";
    //    var goTime = Date.parse(new Date());//离开时间
    //    var data = {
    //        viewBill : $.trim($('input[name=viewBill]').val()),
    //        stay :   goTime - g_comeTime,
    //    };
    //    $.get(url,data,function(r){});
    //}
    //window.onbeforeunload = function(){
    //    g_loggerTime();
    //}





});