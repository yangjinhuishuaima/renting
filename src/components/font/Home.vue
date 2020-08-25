<template>
    <div v-if="watherInfo.cityInfo">
        <div id="header">
            <!--天气-->
            <div id="watherContent">
                <div id="today" @mousemove="watherSetState()" @mouseout="watherSetState2()">
                    {{watherInfo.cityInfo.c5}}&nbsp;&nbsp;&nbsp;
                    <span v-if="hour<16 && hour>4">{{watherInfo.f1.day_weather}}</span>
                    <span v-else>{{watherInfo.f1.night_weather}}</span>&nbsp;
                    <!--<img v-bind:src="watherInfo.f1.day_weather_pic"
                         style="width: 30px;height: 20px;padding-top: 10px"/>-->
                    {{watherInfo.f1.day_air_temperature}}℃~{{watherInfo.f1.night_air_temperature}}℃
                </div>

            </div>
        </div>
        <div id="watherInfo" v-show="watherInfoState">
            <div style="width: 400px;border-bottom: 1px dotted gainsboro;font-family: Georgia;
            color: lightskyblue;font-size: 20px;padding-top: 20px">
                &nbsp;&nbsp;&nbsp;&nbsp;{{watherInfo.cityInfo.c5}}
            </div>
            <div style="width:400px;height:230px;border-bottom: 1px dotted gainsboro;">
                <div class="wat">
                    今天
                    <img class="wimg" v-bind:src="watherInfo.f1.day_weather_pic"/>
                    {{watherInfo.f1.day_weather}}<br>
                    {{watherInfo.f1.day_air_temperature}}℃~{{watherInfo.f1.night_air_temperature}}℃
                </div>
                <div class="wat">
                    明天
                    <img class="wimg" v-bind:src="watherInfo.f2.day_weather_pic"/>
                    {{watherInfo.f2.day_weather}}<br>
                    {{watherInfo.f2.day_air_temperature}}℃~{{watherInfo.f2.night_air_temperature}}℃
                </div>
                <div class="wat">
                    后天
                    <img class="wimg" v-bind:src="watherInfo.f3.day_weather_pic"/>
                    {{watherInfo.f3.day_weather}}<br>
                    {{watherInfo.f3.day_air_temperature}}℃~{{watherInfo.f3.night_air_temperature}}℃
                </div>
            </div>
            <div class="infos">
                详细信息：<br><br>
                白天：{{watherInfo.f1.day_air_temperature}}℃ &nbsp;&nbsp;{{watherInfo.f1.day_weather}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                夜间：{{watherInfo.f1.night_air_temperature}}℃ &nbsp;&nbsp;{{watherInfo.f1.night_weather}}<br/>
                降水概率：{{watherInfo.f1.jiangshui}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                紫外线：{{watherInfo.f1.ziwaixian}}<br>
                日出日落：{{watherInfo.f1.sun_begin_end}}
            </div>
        </div>
        <div id="adverInfo">
            <swiper :options="swiperOption">
                <!--<swiper-slide><img src="https://fulishoukaijinxiputi.fang.com/" class="simg"></swiper-slide>-->
                <swiper-slide><img src="https://rentins-1302959334.cos.ap-nanjing.myqcloud.com/guanggao/BigShow/LunBo10.jpg" /></swiper-slide>
                <swiper-slide><img src="https://rentins-1302959334.cos.ap-nanjing.myqcloud.com/guanggao/BigShow/72631598340781381.jpg" /></swiper-slide>
                <!--<swiper-slide><img src="../../assets/LunBo02.jpg" class="simg"></swiper-slide>
                <swiper-slide><img src="../../assets/LunBo03.jpg" class="simg"></swiper-slide>
                <swiper-slide><img src="../../assets/LunBo04.jpg" class="simg"></swiper-slide>-->
            </swiper>

            <div class="swiper-scrollbar"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                /*储存天气信息数据*/
                watherInfo: {},
                /*时间*/
                hour: '',
                //天气详情是否显示
                watherInfoState: false,

                swiperOption: {//swiper3
                    autoplay: 3000,
                    speed: 1000,
                    effect: 'slide',
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable:true,

                    },
                    prevButton:'.swiper-button-prev',//上一张
                    nextButton:'.swiper-button-next',//下一张
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }

            }
        },
        created: function () {
            this.watherShow()
            this.hours()
        },
        methods: {
            /*获取天气信息*/
            'watherShow': function () {
                this.$axios.get('wather/getWather')
                    .then(response => {
                        if (response.showapi_res_body != null) {
                            this.watherInfo = response.showapi_res_body
                        }

                    }).catch(error => console.log(error))
            },
            /*赋值*/
            'hours': function () {
                this.hour = new Date().getHours()

            },
            /*悬浮状态*/
            watherSetState: function () {
                this.watherInfoState = true
            },
            /*鼠标离开状态*/
            watherSetState2: function () {
                this.watherInfoState = false
            },
            /**/
        },

    }
</script>

<style scoped>
    * {
        margin: 0 auto;
        padding: 0;
    }

    #header {
        width: 100%;
        height: 50px;
        background-color: gray;
    }

    /*Start天气*/
    #watherContent {
        margin-left: 1000px;
    }

    #today {
        padding-top: 8px;
        width: 300px;
        height: 40px;
        background-color: gray;
        color: floralwhite;
        font-family: Gabriola;
        line-height: 50px;
        text-align: center;
    }

    #watherInfo {
        position: absolute;
        top: 58px;
        left: 1100px;
        z-index: 99;
        width: 400px;
        height: 400px;
        background-color: gray;
        background-color: rgba(0, 0, 0, 0.6); /*设置透明度*/
    }

    .wat {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: lightskyblue;
        text-align: center;
        float: left;
        margin-top: 20px;
        width: 110px;
        height: 200px;
        margin-left: 17px;

    }

    .wimg {
        width: 90px;
        height: 90px;
    }

    .infos {
        margin-left: 40px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: lightskyblue;
    }

    /*END天气*/

    /*轮播广告*/

    #adverInfo {
        /*position: relative;*/
        width: 100%;
        height: auto;
/*        background-color: darkcyan;*/
    }

    .simg {
        width: 1536px;
        height: 300px;
    }
    #dd{
        position: relative;
    }

</style>
