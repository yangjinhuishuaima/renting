<template>
    <div>
        <!--添加-->
        <el-dialog width="50%"  title="添加" :visible="dialogVisible">
            <el-form :model="ad_photo" :rules="rules" ref="rulefrom"  label-width="100px" class="demo-ruleForm">
                <!--<el-form-item label="封面：" prop="ad_photo.adphoto">-->
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
                <!--<el-form-item>-->
                    <!--<el-upload-->
                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                        <!--list-type="picture-card"-->
                        <!--:on-preview="handlePictureCardPreview"-->
                        <!--:on-remove="handleRemove">-->
                        <!--<i class="el-icon-plus"></i>-->
                    <!--</el-upload>-->
                    <!--<el-dialog :visible.sync="dialogVisible1">-->
                        <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                    <!--</el-dialog>-->
                <!--</el-form-item>-->
                <el-form-item prop="ad_photo.adphoto">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture"
                        ref="upload"
                        :multiple="false"
                        :limit="1"
                        :http-request="httpRequest">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">添加</el-button>
                    <el-button @click="restFrom()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--添加按钮-->
        <el-button style="float: left" type="success" @click="show()">添加</el-button>
        <el-table style="text-align: center" :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true"  border>
            <el-table-column prop="adid"  label="编号"></el-table-column>
            <el-table-column label="封面图">
                <template slot-scope="scope">
                    <img :src="scope.row.adphoto" style="width: 40px;height: 40px;vertical-align: middle;">
                </template>
            </el-table-column>
            <el-table-column prop="phototype" label="类型"></el-table-column>
        </el-table>
        <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "BAdphoto",
        data(){
            return {
                dialogImageUrl: '',
                dialogVisible1: false,
                manager:JSON.parse(sessionStorage.getItem("manager")),
                dialogVisible:false,
                list:[],
                // 默认显示第几页
                currentPage: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 1,
                // 个数选择器（可修改）
                pageSizes: [3, 6, 9, 12],
                // 默认每页显示的条数（可修改）
                PageSize: 3,
                drawer:false,
                chapter:false,
                direction: 'rtl',//设置默认
                details:[],
                chapters:[],
                fd:{},
                ad_photo:{
                    adphoto:"",//图片
                    phototype:null//类型
                },
                multiple:"false",//是否支持多选文件
                rules:{
                    adphoto:[
                        {required: true, message: '请上传图片'}
                    ],
                    phototype:[
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ]
                }

            }
        },created:function(){
            this.queryList();
        },methods:{
            // 每页显示的条数
            handleSizeChange (val) {
                // 改变每页显示的条数
                this.PageSize = val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
            },
            // 显示第几页
            handleCurrentChange (val) {
                // 改变默认的页数
                this.currentPage = val
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible1 = true;
            },
            show: function () {
                    this.dialogVisible = true
                    // this.ad_photo = {}
            },
            //文件上传
            httpRequest(param){
                let fd = new FormData()// FormData 对象
                fd.append('file', param.file)// 文件对象图片
                // fd.append('file',1)
                fd.append("phototype",1);//类型
                // fd.append("mgstate",1);//用户标示
                // fd.append("mgname",1);//用户账号
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                console.log(fd)
                //上传 一般上传图片用 $axios2
                this.$axios.post("adphoto/insertadphoto",fd).then(response=>{
                    if(response.data===1){
                        this.dialogVisible=false;
                        this.ad_photo={};
                        this.queryList();
                    }
                })
            },
            submitForm:function(){
                this.$refs.upload.submit();
                this.queryList();
                this.dialogVisible=false
            },
            restFrom:function(){
                this.dialogVisible=false;
                this.ad_photo={};
                this.queryList();
            },
            queryList:function () {
                this.$axios.post("adphoto/find").then(resp=>{
                    this.totalCount = resp.length
                    this.handleCurrentChange(1)
                    this.list=resp
                })
            },
            querydetails:function (row) {
                this.drawer=true;
                this.direction= 'btt',
                    this.$axios.post("backstage/programinfo/programinfoAll",
                        {"currentPage":this.currentPage,"pageSize":this.pagesize,"pid":row.pid}).then(resp=>{
                        this.details=resp.data.list;
                    })
            },
            //章节目录
            querychapters:function(row){
                this.chapter=true;
                this.direction= 'rtl'
                this.$axios.post("backstage/chapterinfo/chapterinfoQuery",
                    {"currentPage":this.currentPage,"pageSize":this.pagesize,"pid":row.pid}).then(resp=>{
                    console.log(resp.data.list);
                    this.total=resp.data.total;
                    this.chapters=resp.data.list;
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            changeStatus:function (val, row) {
                this.$axios.post("backstage/programinfo/updateppstatus"
                    ,{"pstatus":row.pstatus,"pid":row.pid}).then(response=>{
                    if(response.data==1){
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
