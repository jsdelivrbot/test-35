<template>
  <div v-title="'积分汇总'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">积分汇总</div>
    </v-back>
    <div class="backD" v-bind:class="{'class-b': isB}"></div>
    <!-- 积分汇总 -->
    <div class="section" >
      <div class="hd">
        <div class="hd-inner">
          <span class="hd-title">积分汇总</span>
          <span class="seniorfranchiseDate"><i>{{findScoreSummaryData.startDate}} 至 {{findScoreSummaryData.endDate}}</i></span>
        </div>
      </div>
      <div class="content">
        <div class="overview-rebate">
          <canvas id="canvas" class="canvas"> </canvas>
        </div>
      </div>
      <div class="integralNum">
        <p class="item">
          <span>&nbsp;{{findScoreSummaryData.notUseRedScore}}&nbsp;</span>
          <span>未消费红积分总额</span>
        </p>
        <p class="item">
          <span>&nbsp;{{findScoreSummaryData.useRedScore}}&nbsp;</span>
          <span>已消费红积分总额</span>
        </p>
      </div>
    </div>

    <div class="integralUseDetailed">
      <ul>
        <li>
          <span><i v-show="senior">一级经纪商</i><i v-show="ones">交易商</i></span>
          <span>已消费红积分</span>
          <span>红积分总额</span>
        </li>
        <li v-for="item in findScoreDetailData">
          <span>
            <i>{{item.name}}</i>
            <i>（{{item.no}}）</i>
          </span>
          <span>{{item.purchaseScoreSum}}</span>
          <span>{{item.specMoneySum}}</span>
        </li>
        <v-empty v-show="emptySta"></v-empty>
      </ul>
      <div class="dropload-down" v-show="down"><div class="dropload-load"><span class="loading"></span>加载中...</div></div>
    </div>

  </div>
</template>

<script>
import echarts from 'common/js/echarts.min.js';
import 'common/js/jquery-1.8.3.min.js';
import 'common/js/laydate.dev.js';
const ERR_OK = 'success';
import empty from 'components/empty/empty';
import back from 'components/back/back';

export default{
  components:{
    'v-empty': empty,
    'v-back': back
  },
  data(){
      return {
          coverShow: false, //背景遮罩状态
          sessionToken: localStorage.getItem("sessionToken"),
          findScoreSummaryData: {},
          findScoreDetailData: [],
          scroll: '',
          pageIndexI: null,
          totalPageI: null,
          senior: false,
          ones: false,
          emptySta: false,
          down: false,
          backSta: false,
          isB: false
      }
  },
  created(){
    
  },
  methods:{
    // 背景遮罩隐藏
    coverHide: function(){
      this.coverShow = false;
    },
    // 返佣总览环状图
      wagonRebate: function(el,totalRedScore,useRedScore,notUseRedScore){

        var option = {
          el: el,
          data: {value:totalRedScore, name: '红积分总额'},
          series:{
            data:[
              {value: useRedScore, name: '已消费红积分', color: '#38aafa', describe:(useRedScore/totalRedScore)*100},
              {value:notUseRedScore, name: '未消费红积分', color: '#ff6600', describe:(notUseRedScore/totalRedScore)*100}
            ]
          },
          r: 130,
          arcwidth: 2,
          percent: true
        }
        this.toolHelper.wagon(option);
      },
      // 返佣总览折线图
      polylineRebate: function(el){
        let polylineRebate = echarts.init(document.getElementById(el));
        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '2%',
                right: '6%',
                bottom: '3%',
                top: '4%',
                containLabel: true
            },
            color: ['#ff6000'],
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['02/25','02/26','02/27','02/28','03/01','03/02','03/03'],
                    axisLabel :{  
                        interval:0,
                    },
                    splitLine: {
                        show: true,
                      lineStyle:{
                        color:"#e1e1e1",
                        type:"solid"
                      }
                     }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'金额',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:[4100, 4000, 6000, 6500, 5000, 5500, 4400],
                    areaStyle: {
                       normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                               offset: 0,
                               color: 'rgba(255, 102, 0, 1)'
                           }, {
                               offset: 1,
                               color: 'rgba(255, 102, 0, 0.01)'
                           }])
                       }
                   },
                   lineStyle: {
                      normal: {
                          type: 'solid',
                          color:"#ff6000",
                          opacity :"1"
                      }
              }
                }
            ]
        };
        polylineRebate.setOption(option);
      },
      findScoreSummary: function(){
        this.$http.get('/api/findScoreSummary',{params:{ sessionToken: this.sessionToken}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.findScoreSummaryData = response.body.data;
            var a = parseFloat(this.findScoreSummaryData.totalRedScore);
            var b = parseFloat(this.findScoreSummaryData.useRedScore);
            var c = parseFloat(this.findScoreSummaryData.notUseRedScore);
            this.wagonRebate('canvas',a,b,c);
          }else{
            
          }   
        }).then((error)=> this.error = error)
      },
      findScoreDetail: function(){
        this.$http.get('/api/findScoreDetail',{params:{ sessionToken: this.sessionToken, pageIndex: this.pageIndexI}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            // this.findScoreDetailData = response.body.data.detailList;
            for(var i = 0; i < response.body.data.detailList.length; i++){
              response.body.data.detailList[i].purchaseScoreSum = this.toolHelper.formatNum(parseInt(response.body.data.detailList[i].purchaseScoreSum))
              response.body.data.detailList[i].specMoneySum = this.toolHelper.formatNum(parseInt(response.body.data.detailList[i].specMoneySum))
              this.findScoreDetailData.push(response.body.data.detailList[i])
            }
            this.pageIndexI = response.body.data.paging.pageIndex;
            this.totalPageI = response.body.data.paging.totalPage;
            if(response.body.data.detailList == '' || response.body.data.detailList == null){
              this.emptySta = true;
            }else{
              this.emptySta = false;
            }
          }else{
            
          }   
        }).then((error)=> this.error = error)
      },
      // menu: function() {
      //   this.scroll = document.body.scrollTop;
      //   if(window.screen.height + this.scroll > document.body.offsetHeight){
      //     this.pageIndex++
      //     if(this.totalPage > this.pageIndex){
      //       this.findScoreDetail(this.pageIndex);
      //     }
      //   }
      // },
      getLoginAccountRole: function(){
        this.$http.get('/api/getLoginAccountRole?',{params:{ sessionToken: this.sessionToken }}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            if(response.body.data.role == 'ROLE_TOP'){
              this.senior = true;
              this.ones = false;
            }else if(response.body.data.role == 'ROLE_FIRST'){
              this.senior = false;
              this.ones = true;
            }
          }else{

          }       
        }).then((error)=> this.error = error)
      }
  },
  mounted() {
    this.backSta = this.toolHelper.isWeiXin();
    this.isB = this.toolHelper.isWeiXin();
    // 返佣总览环状图
      this.findScoreSummary();

      this.findScoreDetail();

      // window.addEventListener('scroll', this.menu);

      this.getLoginAccountRole();

      let sw = true;
      let _this = this;
      let g_pageIndex;
      window.addEventListener('scroll',function(){  
          // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
          // console.log(document.body.scrollTop); // 滚动高度  
          // console.log(document.body.offsetHeight); // 文档高度  
          // 判断是否滚动到底部  
          if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
              // console.log(sw);  
              // 如果开关打开则加载数据 
              _this.pageIndexI++;
              if(sw==true){  
                  // 将开关关闭  
                  sw = false;
                  let asda = _this.pageIndex;
                  if(_this.totalPageI > _this.pageIndexI){
                    _this.down = true;
                    _this.$http.get('/api/findScoreDetail',{params:{ sessionToken: _this.sessionToken, pageIndex: _this.pageIndexI}}).then((response) => { 
                      if(response.body.result == ERR_OK){ 
                        // this.findScoreDetailData = response.body.data.detailList;
                        for(var i = 0; i < response.body.data.detailList.length; i++){
                          response.body.data.detailList[i].purchaseScoreSum = _this.toolHelper.formatNum(parseInt(response.body.data.detailList[i].purchaseScoreSum))
                          response.body.data.detailList[i].specMoneySum = _this.toolHelper.formatNum(parseInt(response.body.data.detailList[i].specMoneySum))
                          _this.findScoreDetailData.push(response.body.data.detailList[i])
                        }
                        _this.pageIndexI = asda;
                        sw = true;
                        _this.down = false;
                      }else{
                        
                      }   
                    }).then((error)=> _this.error = error)
                  } 
              }  
          }
      })
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .backD
    height: 0
    &.class-b
      height: 0.4rem
  .integralUseDetailed
    margin-top: 0.1rem
    padding: 0.12rem
    background-color: #FFF
    li
      position: relative
      width: 100%
      height: 0.65rem
      overflow: hidden
      line-height: 0.65rem
      &::after
        position: absolute
        right: 0
        bottom: 0
        display: block
        content: ''
        width: 100%
        height: 0
        border-bottom: 1px solid #ccc
        transform: scaleY(0.5)
      &:nth-child(1)
        height: 0.5rem
        line-height: 0.5rem
        span
          color: #999999
          font-size: 0.12rem!important
          padding: 0!important
          line-height: 0.5rem!important
      span
        float: left
        width: 33.33%
        height: 100%
        text-align: center
        color: #ff6000
        font-size: 0.14rem
        font-size: 0.15rem
        &:nth-child(2),&:nth-child(3)
          font-family: "黑体"!important
        &:nth-child(1)
          font-size: 0.14rem
          line-height: 0.2rem
          color: #999999
          padding: 0.125rem
          i
            font-style: normal
            &:nth-child(2)
              font-family: "黑体"!important
  .integralNum
    position: relative
    height: 0.58rem
    overflow: hidden
    &::after
      position: absolute
      right: 0
      top: 0
      display: block
      content: ''
      width: 100%
      height: 0
      border-bottom: 1px solid #ccc
      transform: scaleY(0.5)
    .item
      position: relative
      float: left
      width: 50%
      height: 0.58rem
      padding: 0.09rem 0
      &::after
        position: absolute
        right: 0
        top: 0
        display: block
        content: ''
        height: 100%
        border-right: 1px solid #ccc
        transform: scaleX(0.5)
      span
        display: block
        font-size: 0.14rem
        line-height: 0.2rem
        text-align: center
        color: #999999
        &:nth-child(1)
          color: #ff8037
          font-family: "黑体"!important
  .seniorfranchiseDate
    float: right
    i
      font-style: normal;
      color: #999;
  #laydate_box
      right: 10px!important
      left: auto!important
  // 返佣总览
  .overview-rebate
    width: 100%
    height: 2rem
    position: relative
    background-color: #FFF
    overflow: hidden
    .canvas
      position: absolute
      top: 50%
      left: 50%
      transform: translateX(-50%) translateY(-50%) scale(0.5)
  // 返佣汇总详情
  .rebate-details
    p
      position: relative
      width: 100%
      height: 0.5rem
      span
        position: relative
        float: left
        width: 33.33%
        height: 100%
        text-align: center
        line-height: 0.5rem
        color: #666666
        font-size: 0.12rem
        &::after
          position: absolute
          right: 0
          top: 0
          display: block
          content: ''
          width: 0
          height: 100%
          border-right: 1px solid #ccc
          transform: scaleX(0.9) scaleY(0.5)
        &:nth-child(3n)::after
          display: none
      &::after
        position: absolute
        right: 0
        bottom: 0
        display: block
        content: ''
        width: 100%
        height: 0
        border-bottom: 1px solid #ccc
        transform: scaleX(0.9) scaleY(0.5)
      &:nth-last-child(1)::after
        display: none
</style>