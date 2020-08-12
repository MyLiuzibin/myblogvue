<!-- 文章列表 -->
<template>
    <el-row class="sharelistBox">
        <div v-if="this.$route.name=='Share'&&!this.$route.query.keywords" class="shareTitle">
            <div class="ui label" >
                <a  :href="'#/Share?lable='+lable">{{className}}</a>
            </div>
            <ul v-if="sonclassList" class="shareclassTwo" >
                <li v-for="(citem,index) in sonclassList">
                    <a :href="'#/Share?lable='+lable+'&classtwoId='+citem.class_id" :class="citem.class_id==classtwoId?'active':''">{{citem.cate_name}}</a>
                </li>
            </ul>
        </div>
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.createTime,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.createTime,'date')"></span>
            </span>
            <header>
                <h1>
                  <router-link target="_blank" :to="{name:'DetailShare',params:{aid:item.articleId}}">{{item.articleTitle}}</router-link>
<!--                    <a :href="'#/DetailShare?aid='+item.articleId" target="_blank">-->
<!--                        {{item.articleTitle}}-->
<!--                    </a>-->
                </h1>
                <h2>
                    <i class="fa fa-fw fa-user"></i>发表于
                    <i class="fa fa-fw fa-clock-o"></i><span v-html="showInitDate(item.createTime,'newDate')">{{showInitDate(item.createTime,'newDate')}}</span> •
                    <i class="fa fa-fw fa-eye"></i>{{item.articleViews}} 次围观 •
                    <i class="fa fa-fw fa-comments"></i>活捉 {{item.commentsNu}} 条 •
                    <span class="rateBox">
                        <i class="fa fa-fw fa-heart"></i>{{item.loveNu?item.loveNu:0}}点赞 •
                        <i class="fa fa-fw fa-star"></i>{{item.collectNu?item.collectNu:0}}收藏
                    </span>
                </h2>
                <div class="ui label">
                    <a :href="'#/Share?lable='+item.lable">{{item.shareClass}}</a>
                </div>
            </header>
            <div class="article-content">
                <p style="text-indent:2em;">
                    {{item.articleContent}}
                </p>
                <p  style="max-height:300px;overflow:hidden;text-align:center;">
                    <img :src="item.image" alt="" class="maxW">
                </p>
            </div>
            <div class="viewdetail">
              <router-link class="tcolors-bg" target="_blank" :to="{name:'DetailShare',params:{aid:item.articleId}}">阅读全文>></router-link>
<!--                <a  :href="'#/DetailShare?aid='+item.articleId" >-->
<!--                    阅读全文>>-->
<!--                </a>-->
            </div>
        </el-col>
<!--        <el-col class="viewmore">-->
<!--            <a v-show="hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>-->
<!--            <a v-show="!hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>-->
<!--        </el-col>-->
      <el-col class="s-item tcommonBox" >
      <el-col  class="viewmore">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="page">
        </el-pagination>
      </el-col>
      </el-col>
    </el-row>
</template>

<script>
import {ShowArticlesAll,ArtClassData,initDate} from '../utils/server.js'
    export default {
        name:'Share',
        data() { //选项 / 数据
            return {
                artId:0,
                lable:0,
                sendId:'',
                className:'',
                sonclassList:'',//二级分类
                classtwoId:5,
                keywords:'',
                hasMore:true,
                pageNo:1,
                total:null,
                shareClass:[
                    {lable:1,name:'技术分享',detshare:[
                        {lable:5,name:'移动端H5',pid:1},
                        {lable:6,name:'pc端web',pid:1},
                        {lable:7,name:'小程序',pid:1},
                        {lable:8,name:'php',pid:1},
                        {lable:9,name:'nodejs',pid:1},
                        {lable:10,name:'软件',pid:1},
                        {lable:11,name:'其他',pid:1}
                    ]},
                    {lable:2,name:'闲言碎语'},
                    {lable:3,name:'事件簿'},
                    {lable:4,name:'创作集'}
                ],
                queryClass:1,
                articleList:'',
            }
        },

        methods: { //事件处理器
            showInitDate: function(oldDate,full){
                // console.log(oldDate,full);
                return initDate(oldDate,full)
            },
            showSearchShowList:function(){//展示数据
                var that = this;
                //初始化 文章id为0开始
                ShowArticlesAll(that.pageNo,(result)=>{
                  that.articleList=result.list;
                  that.total=result.totalCount;
                })
            },
          page:function (currentPage) {
            var  that = this;
            that.pageNo=currentPage;
            this.showSearchShowList();
          }
            // addMoreFun:function(){//查看更多
            //     this.showSearchShowList(false);
            // },
            // routeChange:function(){
            //     var that = this;
            //     this.showSearchShowList(true);
            // }
        },
        components: { //定义组件

        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange',
           '$store.state.keywords':'routeChange'
         },
        created() { //生命周期函数
            // console.log(this.$route);
            var that = this;
            that.showSearchShowList();
        }
    }
</script>

<style>
/*分享标题*/
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/*文章列表*/
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }


    /*.sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
        background: #48456C;
    }*/
</style>
