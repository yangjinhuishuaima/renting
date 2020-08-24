<template>
    <div>
        <!--<div id="headler">-->
            <div id="today" v-if="watherInfo.cityInfo" @mousemove="watherSetState()" @mouseout="watherSetState2()">
                {{watherInfo.cityInfo.c5}}&nbsp;&nbsp;&nbsp;
                <span v-if="hour<16 && hour>4">{{watherInfo.f1.day_weather}}</span>
                <span v-else>{{watherInfo.f1.night_weather}}</span>&nbsp;
                &lt;!&ndash;<img v-bind:src="watherInfo.f1.day_weather_pic"
                     style="width: 30px;height: 20px;padding-top: 10px"/>&ndash;&gt;
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
        <!--</div>-->
        <div id="content"></div>
        <div id="floter"></div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                watherInfo: {},
                hour: '',
                watherInfoState: false

            }
        },
        created: function () {
            this.watherShow()
            this.hours()
        },
        methods: {
            'watherShow': function () {
                this.$axios.get('rentings/wather/getWather')
                    .then(response => {
                        if (response.showapi_res_body != null) {
                            console.log(response.showapi_res_body)

                            this.watherInfo = response.showapi_res_body
                        }
                    })
            },
            'hours': function () {
                this.hour = new Date().getHours()

            },
            watherSetState: function () {
                this.watherInfoState = true
            },
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

    #headler {
        width: 100%;
        height: 50px;
        background-color: gray;
    }

    #today {
        width: 300px;
        height: 50px;
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
        /*background-color: rgba(0,0,0,0.2);*/  /*设置透明度*/
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
    .infos{
        margin-left: 40px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: lightskyblue;
    }
</style>
