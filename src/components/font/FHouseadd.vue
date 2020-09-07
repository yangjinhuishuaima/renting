<template>
    <!--<el-dialog width="70%"  title="添加" :visible="dialogVisible=true">-->
    <!--<el-tag>发布房源页面</el-tag>-->
    <el-form  :rules="rules" ref="form" :model="house" label-width="150px" >

        <el-form-item label="区域" prop="house.harea">
            <el-select v-model="house.harea" placeholder="请选择">
                <el-option
                    v-for="item in area"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="所属小区" prop="house.hcommunity">
            <el-col :span="8">
                <el-input v-model="house.hcommunity"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="房屋面积/平方米" prop="house.hspace">
            <el-col :span="8">
                <el-input v-model="house.hspace"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="房屋户型-室"  prop="house.htshi">
            <el-col :span="2">
            <el-input v-model="house.htshi"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="房屋户型-厅"  prop="house.hting">
            <el-col :span="2">
        <el-input v-model="house.hting"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="房屋户型-卫" prop="house.htwei">
            <el-col :span="2">
        <el-input v-model="house.htwei"></el-input>
            </el-col>
        </el-form-item>

        <!--<el-form-item label="封面：" prop="house.hphoto">-->
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--ref="upload"-->
        <!--action=""-->
        <!--:auto-upload="false"-->
        <!--:multiple="false"-->
        <!--:limit="1"-->
        <!--:http-request="httpRequest">-->
        <!--<el-button size="small" type="primary">点击上传</el-button>-->
        <!--</el-upload>-->
        <!--</el-form-item>-->

        <el-form-item label="封面：" prop="house.hphoto">
            <el-col :span="6">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"

                :on-remove="handleRemove"
                list-type="picture"
                ref="upload"
                :multiple="false"
                :limit="1"
                :http-request="httpRequest">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-col>
        </el-form-item>

        <el-form-item label="租赁方式" prop="house.hmode">
            <el-select v-model="house.hmode"  placeholder="请选择">
                <el-option label="整租" value=0></el-option>
                <el-option label="合租" value=1></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="结束时间" prop="htime">
            <el-col :span="7">
                <el-date-picker type="date" placeholder="选择日期"
                                format="yyyy-MM-dd"  value-format="yyyy-MM-dd"
                                v-model="house.htime" style="width: 100%;">
                </el-date-picker>
            </el-col>
        </el-form-item>

        <el-form-item label="租金/月/元" prop="house.hprice">
            <el-col :span="2">
                <el-input v-model="house.hprice" @blur="change()"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="付款方式" prop="house.hpaymethod">
            <el-select v-model="house.hpaymethod" placeholder="请选择">
                <el-option
                    v-for="item in paymethod"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                </el-option>
            </el-select>
            <!--<el-select v-model="house.hpaymethod"  placeholder="请选择">-->
                <!--<el-option label="押一付一" value="押一付一"></el-option>-->
                <!--<el-option label="押二付一" value="押二付一"></el-option>-->
                <!--<el-option label="押三付一" value="押三付一"></el-option>-->
            <!--</el-select>-->
        </el-form-item>

        <el-form-item label="房屋标签" prop="house.hlabel">
            <el-col :span="6">
                <el-input v-model="house.hlabel"></el-input>
            </el-col>
        </el-form-item>

        <!--<el-form-item label="开始时间" prop="stime">-->
        <!--<el-col :span="7">-->
            <!--<el-date-picker type="date" placeholder="选择日期"-->
                            <!--format="yyyy-MM-dd"  value-format="yyyy-MM-dd"-->
                            <!--v-model="new Date()"  style="width: 100%;">-->
            <!--</el-date-picker>-->
        <!--</el-col>-->
        <!--</el-form-item>-->

        <el-form-item label="具体地址" prop="house.hadress">
            <el-col :span="8">
                <el-input v-model="house.hadress"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="装修类型" prop="house.htype">
            <el-select v-model="house_mating.htype"  placeholder="请选择">
                <el-option
                    v-for="item in types1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                </el-option>
                <!--<el-option label="精装修" value="精装修"></el-option>-->
                <!--<el-option label="毛坯房" value="毛坯房"></el-option>-->
                <!--<el-option label="简装修" value="简装修"></el-option>-->
            </el-select>
        </el-form-item>

        <el-form-item label="朝向" prop="house_mating.htdirect">
            <el-select v-model="house_mating.htdirect"  placeholder="请选择">
                <el-option
                    v-for="item in direct"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                </el-option>
                <!--<el-option label="东" value="东"></el-option>-->
                <!--<el-option label="南" value="南"></el-option>-->
                <!--<el-option label="西" value="西"></el-option>-->
                <!--<el-option label="北" value="北"></el-option>-->
            </el-select>
        </el-form-item>

        <el-form-item label="床" prop="house_mating.htbed">
            <el-switch v-model="house_mating.htbed"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value=0
                        inactive-text="没有" :inactive-value=1>
            </el-switch>
        </el-form-item>

        <el-form-item label="电视" prop="house_mating.htv">
            <el-switch v-model="house_mating.htv"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                        inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="车位" prop="house_mating.htcar">
            <el-switch v-model="house_mating.htcar"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="宽带" prop="house_mating.htweb">
            <el-switch v-model="house_mating.htweb"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="洗衣机" prop="house_mating.htwashing">
            <el-switch v-model="house_mating.htwashing"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="暖气" prop="house_mating.htheating">
            <el-switch v-model="house_mating.htheating"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="空调" prop="house_mating.htait">
            <el-switch v-model="house_mating.htait"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="冰箱" prop="house_mating.htrfrt">
            <el-switch v-model="house_mating.htrfrt"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="热水器" prop="house_mating.htheater">
            <el-switch v-model="house_mating.htheater"
                       active-color="#13ce66" inactive-color="#ff4949" active-text="有" :active-value="0"
                       inactive-text="没有" :inactive-value="1">
            </el-switch>
        </el-form-item>

        <el-form-item label="总共楼层" prop="house_mating.hfloors">
            <el-col :span="3">
                <el-input v-model="house_mating.hfloors"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="所在楼层" prop="house_mating.hfloor">
            <el-col :span="3">
                <el-input v-model="house_mating.hfloor"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="房东描述" prop="house.udescribe">
            <el-col :span="8">
                <el-input v-model="house.udescribe"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="服务费" prop="service.sprice">
            <el-col :span="8">
                <el-input v-model="service.sprice" :hidden="true"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" name="add" @click="submitForm">添加</el-button>
            <el-button @click="restFrom()">重置</el-button>
        </el-form-item>
    </el-form>

    <!--</el-dialog>-->
</template>
<script scoped>
    import format from "element-ui/src/locale/format";

    export default {
        name: "FHouseadd",
        data() {
            return {
                area: [{
                    value: '二七区',
                    label: '二七区'
                }, {
                    value: '金水区',
                    label: '金水区'
                }, {
                    value: '管城区',
                    label: '管城区'
                }, {
                    value: '中原区',
                    label: '中原区'
                }],
                paymethod:[{
                    label:"押一付一",
                    value:"押一付一"
                },{
                    label:"押二付一",
                    value:"押二付一"
                },{
                    label:"押三付一",
                    value:"押三付一"
                }],
                types1: [{
                    value: '精装修',
                    label: '精装修'
                }, {
                    value: '简装修',
                    label: '简装修'
                }],
                direct:[{
                    value: '东',
                    label: '东'
                }, {
                    value: '南',
                    label: '南'
                }, {
                    value: '西',
                    label: '西'
                }, {
                    value: '北',
                    label: '北'
                }],
                // stime:{},
                manager:JSON.parse(sessionStorage.getItem("manager")),
                house:{stime:new Date()},
                house_mating:{},
                house_photo:{},
                service:{},
                multiple:"false",//是否支持多选文件
                rules:{
                    hphoto:[
                        {required: true, message: '请上传图片'}
                    ],
                    harea:[
                        { required: true, message: '请选择类型', trigger: 'change' }
                     ],
                    hcommunity:[
                        { required: true, message: '请填写小区', trigger: 'blur' }
                    ],
                    hspace:[
                        { required: true, message: '请填写房屋面积', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            //文件上传
            httpRequest(param){
                let fd = new FormData()// FormData 对象
                fd.append('file', param.file)// 文件对象图片
                fd.append('harea',this.house.harea)
                // alert(this.house.harea)
                fd.append('hcommunity',this.house.hcommunity)
                fd.append('htshi',this.house.htshi)
                fd.append('hting',this.house.hting)
                fd.append('htwei',this.house.htwei)
                fd.append('hmode',this.house.hmode)//this.house.hmode
                fd.append('hprice',this.house.hprice)
                fd.append('hspace',this.house.hspace)
                fd.append('hpaymethod',this.house.hpaymethod)//this.house.hpaymethod
                fd.append('hlabel',this.house.hlabel)
                fd.append('htime',this.house.htime)//this.house.htime
                fd.append('hadress',this.house.hadress)
                fd.append('udescribe',this.house.udescribe)
                fd.append("htype",this.house_mating.htype)//类型this.house_mating.htype
                fd.append("htdirect",this.house_mating.htdirect)//this.house_mating.htdirect
                fd.append("htbed",this.house_mating.htbed)
                fd.append("htcar",this.house_mating.htcar)
                fd.append("htweb",this.house_mating.htweb)
                fd.append("htv",this.house_mating.htv)
                fd.append("htwashing",this.house_mating.htwashing)
                fd.append("htheating",this.house_mating.htheating)
                fd.append("htrfrt",this.house_mating.htrfrt)
                fd.append("htait",this.house_mating.htait)
                fd.append("htheater",this.house_mating.htheater)
                fd.append("hfloor",this.house_mating.hfloor)
                fd.append("hfloors",this.house_mating.hfloors)
                fd.append("sprice",this.service.sprice)
                fd.append("hstate",0);//用户标示
                fd.append("aid",1);//用户账号
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                console.log(fd)
                //上传图片
                this.$axios.post("houseShow/insertinto",fd).then(response=>{
                    if(response===1){
                        this.house_photo={}
                        this.house_mating={}
                        this.house={}
                    }
                })
            },
            change:function(){
                this.$axios.post("houseShow/time",this.house.htime).then(response=>{
                    if(response===0){
                        this.$message({
                            showClose: true,
                            message: '请选择大于一天时间',
                            type: 'error'
                    })

                    }else{
                       // alert(response)
                       //  alert(this.house.hprice*0.002)
                       //  alert(this.house.hprice*0.002*response)
                        this.service.sprice=this.house.hprice*0.002*response
                        // this.$axios.post("server/add",{})

                    }
                })

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            submitForm:function(){
                this.$refs.upload.submit();
                // this.queryList();
                // this.dialogVisible=false
            },
            restFrom:function(){
                // this.dialogVisible=false
                this.house_photo={}
                // this.queryList()
            }
        }
    }
</script>
