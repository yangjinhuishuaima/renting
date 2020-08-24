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
            </div>
        </div>
        <div>
            <div class="block">
                <span class="demonstration">默认 Hover 指示器触发</span>
                <el-carousel height="150px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
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
                watherInfoState: false

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
            }
        }
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
    #watherContent{
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
        width: 400px;
        height: 400px;
        background-color: gray;
        /*background-color: rgba(0,0,0,0.2);*/ /*设置透明度*/
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
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
