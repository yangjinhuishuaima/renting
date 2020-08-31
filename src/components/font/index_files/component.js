/*
* @author: guolihua
* @email: a375666572@163.com
* @desc: 广告显示通用组件
* 适合位置：任意位置
* 引入方式 splier 轮播/单播  plie 堆叠
* <div
*       class="(splier|plie)-ad-component"
*       imgs="{"imgurl",...}"
*       data-imgw="1200px"
*       data-imgh="70px"
*       data-width="100px"
*       data-height="100px"
 *      data-arrow="none|always
 *      data-indicator="none|always"
 *      data-autoplay="none|always"
 *      ">
 * <div>
*/

$(function () {
    var _SplierObj = $('.splier-ad-component'),_PlieObj = $('.plie-ad-component');
    if (_SplierObj.length > 0) {
        _SplierObj.each(function () {
            var _this = $(this);
            // 获取splier元素
            var _SplierObjImgsObj = $.parseJSON(_this.attr('imgs')),
                _SplierWidth = _this.attr('data-width') || "1200px",
                _SplierHeight = _this.attr('data-height') || "70px",
                _sImgWidth = _this.attr('data-imgw') || "1200px",
                _sImgHeight = _this.attr('data-imgh') || "70px",
                _SplierAutoPlay = _this.attr('data-autoplay') || 'true',
                _SplierArrow = _this.attr('data-arrow') || 'none',
                _SplierIndicator = _this.attr('data-indicator') || 'none',
                _SplierId = "carouselComponent" + _this.attr('id');
            // 获取图片资源
            var _SplierCreateDiv = document.createElement("div");
            _SplierCreateDiv.setAttribute("class", "layui-carousel");
            _SplierCreateDiv.setAttribute("id", _SplierId);
            _SplierCreateDiv.style.margin = "0 auto";
            _SplierCreateDiv.style.width = _SplierWidth;
            _SplierCreateDiv.style.height = _SplierHeight;

            //子元素
            var _SplierCreateChildDiv = document.createElement("div");
            _SplierCreateChildDiv.setAttribute("carousel-item", " ");

            //图片元素
            $.each(_SplierObjImgsObj, function (k, v) {
                _tmpDiv = document.createElement("div");
                _tmpA = document.createElement("a");
                if (v.url != '') {
                    _tmpA.setAttribute("href", "javascript:void(0);");
                    _tmpA.setAttribute("target", '_blank');
                } else {
                    _tmpA = document.createElement("p");
                }
                //增加左侧小标签 与图片平级
                _tmpSpan = document.createElement("span");
                _tmpSpanText = document.createTextNode("广告");
                _tmpSpan.setAttribute("class", "index3_ad");
                _tmpSpan.style.position = "absolute";
                _tmpSpan.style.top = "3px";
                _tmpSpan.style.left = "5px";
                _tmpSpan.style.color = "#ededed";
                _tmpSpan.style.opacity = "0.8";
                _tmpSpan.style.fontSize = "12px";
                _tmpSpan.append(_tmpSpanText);
                //a标签绑定上报事件
                _tmpA.addEventListener('click', function (e) {
                    e.preventDefault()
                    updateAdsClickCount(v.id, v.url)
                    return false
                });
                _tmpImgEl = document.createElement("img");
                _tmpImgEl.setAttribute("src", v.img);
                _tmpImgEl.style.width = _sImgWidth;
                _tmpImgEl.style.height = _sImgHeight;
                _tmpA.append(_tmpImgEl);
                _tmpDiv.append(_tmpA);
                _tmpDiv.append(_tmpSpan);
                _SplierCreateChildDiv.append(_tmpDiv);
            });

            // 追加轮播图节点
            _SplierCreateDiv.append(_SplierCreateChildDiv);
            _this.append(_SplierCreateDiv);
            layuiFunc(_SplierId, _SplierWidth, _SplierHeight, _SplierAutoPlay, _SplierArrow, _SplierIndicator);
        });
    }

    if (_PlieObj.length > 0) {
        _PlieObj.each(function () {
            var _this = $(this);
            var _PlieObjImgsObj = $.parseJSON(_this.attr('imgs')),
                _PlieWidth = _this.attr('data-width') || "1200px",
                _pImgWidth = _this.attr('data-imgw') || "1200px",
                _pImgHeight = _this.attr('data-imgh') || "70px";

            if (!_PlieObjImgsObj) return;

            _this.css('display', 'block');
            _this.css('margin', 'auto');
            _this.css('width', _PlieWidth);

            $.each(_PlieObjImgsObj, function (k, v) {
                _tmpDiv = document.createElement("div");
                _tmpDiv.style.position = "relative";
                _tmpA = document.createElement("a");
                _tmpA.setAttribute("href", "javascript:void(0);");
                //增加左侧小标签 与图片平级
                _tmpSpan = document.createElement("span");
                _tmpSpanText = document.createTextNode("广告");
                _tmpSpan.setAttribute("class", "index3_ad");
                _tmpSpan.style.position = "absolute";
                _tmpSpan.style.top = "12px";
                _tmpSpan.style.left = "5px";
                _tmpSpan.style.color = "#ededed";
                _tmpSpan.style.opacity = "0.8";
                _tmpSpan.style.fontSize = "12px";
                _tmpSpan.append(_tmpSpanText);
                //a标签绑定上报事件
                _tmpA.addEventListener('click', function (e) {
                    e.preventDefault()
                    updateAdsClickCount(v.id, v.url)
                    return false
                });
                _tmpA.setAttribute("target", '_blank');
                _tmpImgEl = document.createElement("img");
                _tmpImgEl.setAttribute("src", v.img);
                _tmpImgEl.style.width = _pImgWidth;
                _tmpImgEl.style.height = _pImgHeight;
                _tmpImgEl.style.marginTop = "5px";
                _tmpA.append(_tmpImgEl);
                _tmpDiv.append(_tmpA);
                _tmpDiv.append(_tmpSpan);
                _this.append(_tmpDiv);
            });
        });
    }
});

var layuiFunc = function (_SplierId, _SplierWidth, _SplierHeight, _SplierAutoPlay, _SplierArrow, _SplierIndicator) {
    layui.use('carousel', function(){
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#'+_SplierId
            ,width: _SplierWidth
            ,height: _SplierHeight
            ,autoplay: _SplierAutoPlay
            ,arrow: _SplierArrow
            ,indicator: _SplierIndicator
        });
    });
};

//ads_advertising
function updateAdsClickCount(id,linkHref){
    var _baseUrl = "https://admin.sofang.com/"
    // var _baseUrl = "http://192.168.1.27:8090/"
    var url="api/ad/click";
    // api/ad/click
    //type 1:浏览量 2.点击量
    var cityId = $.cookie("cityNum")
    var data = {ad_id:id,city_id:cityId||1,platform:1};
    $.ajax({
        type:'get',
        url:_baseUrl + url,
        data:data,
        async:false,
        success:function(data){
            //console.log(data);
        }
    });
    if (linkHref !== '') {
        window.open(linkHref);
    }
}