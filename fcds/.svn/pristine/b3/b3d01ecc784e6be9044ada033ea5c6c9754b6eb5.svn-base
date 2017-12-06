<template>
  <div v-title="'达成比例详情'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">达成比例详情</div>
    </v-back>
    <div class="vipsearch">
      <div class="rolelistTap" v-bind:class="{'class-b': isB}">
        <span style="line-height: 0.48rem;font-weight: bold">达成比例详情</span>
        <div class="search-left" style="float: right">
          <div class="search" v-bind:class="{ animation: animationState}">
            <input type="text" placeholder="请输入交易商账号或姓名" v-model="accountNo" @keyup="changes">
            <i @click="animation"><img src="../../../assets/search.png" alt=""></i>
          </div>
        </div>
        <span class="dete-control" style="display: none"></span>
        <span id="demo1" class="curdates" style="display:none">{{curdate}}</span>
      </div>
    </div>

    <div class="searchBackD" v-bind:class="{'class-b': isB}"></div>

    <div class="vipBox">
      <div class="vipItem" v-for="item in showTradeUserPickupReachRateDetailData">
        <div class="hd">
          <div class="hd-inner">
            <div class="l" style="margin:0;line-height: 0.5rem; font-size: 0.16rem">
              <!-- <p class="name">{{item.tradeUserName}}<i>VIP{{item.vipLevel}}</i></p>
              <p class="no">{{item.tradeUserNo}}</p> -->
              {{item.name}} <span style="font-size: 0.12rem;color:#999">({{item.tradeUserNo}})</span>
            </div>
          </div>
        </div>
        <div class="bd take">
          <span>手机号：{{item.phone}}</span>
          <span>达成比例：{{item.pickupReachRate}}%</span>
          <span>16日持仓市值：{{toolHelper.formatNum(Math.round(item.stockMarket))}}</span>
          <span>提货市值：{{toolHelper.formatNum(Math.round(item.totalPrice))}}</span>
        </div>
      </div>
      <v-empty v-show="emptySta"></v-empty>
    </div>

    <div class="stage-cover" v-show="coverShow" @click="coverHide"></div>

  </div>
</template>

<script>
import empty from 'components/empty/empty';
const ERR_OK = 'success';
import 'common/js/datePicker.js';
import back from 'components/back/back';

  export default{
    components:{
      'v-empty': empty,
      'v-back': back
    },
    data() {
     return{
        accountNo: null,
        session_token: localStorage.getItem("sessionToken"),
        animationState: true,
        showTradeUserPickupReachRateDetailData: [],
        diamonVip: false,
        emptySta: false,
        coverShow: false,
        curdate: null,
        viptimeShow: false,
        buyDateListData: [],
        backSta: false,
        isB: false,
        totalPage: null,
        pageIndex: null,
        tradeUser: null
      }
    },
    methods: {
      test: function(sta){
        if(sta == '是'){
          return true;
        }else{
          return false;
        }
      },
      changes: function(){
        if(this.accountNo == ''){
          this.tradeUser = '';
          this.showTradeUserPickupReachRateDetail();
        }
      },
      animation: function(){

        if(this.accountNo == null || this.accountNo == ''){
          if(this.animationState){
            this.animationState = false
          }else{
            this.animationState = true
          }
        }else{
          this.tradeUser = this.accountNo;
          this.showTradeUserPickupReachRateDetail();
        }
      },
      showTradeUserPickupReachRateDetail: function(){
        this.$http.get('/api/showTradeUserPickupReachRateDetail?',{params:{ sessionToken: this.session_token, tradeUser: this.tradeUser}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            
            this.showTradeUserPickupReachRateDetailData = response.body.data.detailList;
            this.totalPage = response.body.data.paging.totalPage;
            this.pageIndex = response.body.data.paging.pageIndex;

            for(var i=0; i < this.showTradeUserPickupReachRateDetailData.length; i++){
              
              if(this.showTradeUserPickupReachRateDetailData[i].pickupReachRate > 1){
                this.showTradeUserPickupReachRateDetailData[i].pickupReachRate = 100;
              }else if(this.showTradeUserPickupReachRateDetailData[i].pickupReachRate < 0){
                this.showTradeUserPickupReachRateDetailData[i].pickupReachRate = 0;
              }else{
                this.showTradeUserPickupReachRateDetailData[i].pickupReachRate = this.showTradeUserPickupReachRateDetailData[i].pickupReachRate * 1000/10;
              }
            }

            if(response.body.data.detailList == '' || response.body.data.detailList == null){
              this.emptySta = true;
            }else{
              this.emptySta = false;
            }

            
            setTimeout(() => {
              this.nextshowTradeUserPickupReachRateDetail();
            }, 1000)

          }else{
            // this.$refs.timerbtn.stop();
            alert(response.body.message)
          }
          
        }).then((error)=> this.error = error)
      },
      nextshowTradeUserPickupReachRateDetail: function(){
        var _this = this;
        let sw = true;
        let g_pageIndex;
        window.addEventListener('scroll',function(){  
            // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
            // console.log(document.body.scrollTop); // 滚动高度  
            // console.log(document.body.offsetHeight); // 文档高度  
            // 判断是否滚动到底部 
            if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
                // console.log(sw);
                // 如果开关打开则加载数据 

                _this.pageIndex++;
                if(sw==true){  
                  
                    // 将开关关闭  
                    sw = false;
                    let asda = _this.pageIndex;
                    if(_this.totalPage > _this.pageIndex){
                      _this.down = true;
                      _this.$http.get('/api/showTradeUserPickupReachRateDetail',{params:{ sessionToken: _this.session_token, tradeUser: _this.tradeUser, pageIndex: _this.pageIndex }}).then((response) => { 
                        if(response.body.result == ERR_OK){ 
                          for (var i = 0; i < response.body.data.detailList.length; i++) {

                            if(response.body.data.detailList[i].pickupReachRate > 1){
                              response.body.data.detailList[i].pickupReachRate = 100;
                            }else if(response.body.data.detailList[i].pickupReachRate < 0){
                              response.body.data.detailList[i].pickupReachRate = 0;
                            }else{
                              response.body.data.detailList[i].pickupReachRate = response.body.data.detailList[i].pickupReachRate * 1000/10;
                            }

                            _this.showTradeUserPickupReachRateDetailData.push(response.body.data.detailList[i])
                          }
                          _this.pageIndex = asda;
                          _this.down = false;
                          sw = true ;
                        }else{}   
                      }).then((error)=> _this.error = error)
                    } 
                }  
            }
        })
      },
      coverHide: function(){
        this.coverShow = false;
        this.viptimeShow = false;
        this.buyDateListData = [];
      },
      close: function(){
        this.coverShow = false;
        this.viptimeShow = false;
        this.buyDateListData = [];
      },
      viptimel: function(tradeUserNo){
        this.coverShow = true;
        this.viptimeShow = true;
        this.getDiamondVipBuyDate(tradeUserNo);
      },
      formatDate: function(now){
        var year=now.getFullYear();
        var month=now.getMonth()+1; 
        var date=now.getDate();
        if(month<10 && date<10){
          return year+"-0"+month+"-0"+date;
        }

        if(month<10 && date>10){
          return year+"-0"+month+"-"+date;
        }
        
        if(month>10 && date<10){
          return year+"-"+month+"-0"+date;
        }

        if(month>10 && date>10){
          return year+"-"+month+"-"+date;
        }
      },
    },
    mounted(){
      var nowdate = this.toolHelper.getNowFormatDate();
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();
      var _this = this;
      this.showTradeUserPickupReachRateDetail('');
      $("body").addClass('dash');
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .viplist
    overflow: hidden
    padding: 0.2rem 0
    li
      width: 50%
      float: left
      text-align: center
      font-size: 0.13rem
      line-height: 0.18rem
      margin: 0.06rem 0
      color: #999999
      p
        b
          color: #ff6000
      p:nth-child(2)
        font-size: 0.14rem
  .viptime
    // min-height: 1.88rem!important
    height: auto!important
  #demo1,#demo2
    position: absolute
    right: 0
    padding-right: 0.44rem
  .vipBox
    .vipItem
      margin-top: 0.1rem
      background-color: #FFF
      .hd
        width: 100%
        height: 0.5rem
        height: 0.5rem
        padding: 0 0.12rem
        .hd-inner
          position: relative
          width: 100%
          height: 0.5rem
          overflow: hidden
          .r
            float: right
            font-size: 0.13rem
            line-height: 0.5rem
            color: #54b9ff
          .l
            float: left
            margin-top: 0.11rem
            .name
              font-size: 0.15rem
              i
                font-style: normal
                color: #ff6600
                font-size: 0.13rem
                margin-left: 0.05rem
            .no
              font-size: 0.13rem
              color: #999999
              margin-top: 0.03rem
      .bd
        position: relative
        overflow: hidden
        width: 100%
        padding: 0.12rem
        &.take span
          line-height: 0.4rem
        &::after
          position: absolute
          left: 0
          top: 0
          content: ''
          width: 100%
          border-bottom: 1px solid #ccc
          transform: scaleY(0.5) scaleX(0.94)
          -webkit-transform: scaleY(0.5) scaleX(0.94)
        span
          float: left
          width: 50%
          font-size: 0.13rem
          color: #999999
          line-height: 0.3rem
      .md
        padding: 0.12rem
        position: relative
        &::after
          position: absolute
          left: 0
          top: 0
          content: ''
          width: 100%
          border-bottom: 1px dashed #ccc
          transform: scaleY(0.5) scaleX(0.94)
          -webkit-transform: scaleY(0.5) scaleX(0.94)
        span
          float: left
          width: 50%
          font-size: 0.13rem
          color: #999999
          line-height: 0.3rem
  .vipsearch
    background-color: #FFF
    .rolelistTap
      position: relative
      width: 100%
      max-width: 640px
      height:0.48rem
      padding: 0 0.12rem
      position: fixed
      top: 0
      left: 50%
      transform: translateX(-50%)
      -webkit-transform: translateX(-50%)
      background-color: #fff
      z-index: 1
      &::before
        content: ''
        display: block
        width: 100%
        position: absolute
        height: 1px
        background-color: #ccc
        bottom: 0
        left: 0
        transform:scaleY(0.5)
        -webkit-transform:scaleY(0.5)
      .dete-control
        position: relative
        float: right 
        display: block
        width: 0.22rem
        height: 0.22rem
        background: url(../../../assets/date_03.png) 0 0 no-repeat
        background-size: 100%
        -webkit-background-size: 100%
        margin-top: 0.1rem
      .curdates
        float: right
        color: #999999
        font-size: 0.12rem
        padding-right: 0.1rem
        line-height: 0.48rem
      .search-left
        float: left
        .search
          position: relative
          height: 0.35rem
          width: 0.3rem
          border-radius: 0.2rem
          border: 1px solid #ff6000
          margin-top: 0.06rem
          background-color: #f3f3f3
          overflow: hidden
          padding: 0 0.36rem 0 0.04rem
          transition: all 1s ease 0s
          -webkit-transition: all 1s ease 0s
          &.animation
            width: 1.75rem
            transition: all 1s ease 0s
            -webkit-transition: all 1s ease 0s
          input
            width: 100%
            height: 100%
            background-color: transparent
            border: none
            outline: none
            text-align: center
          i
            position: absolute
            top: 0.015rem
            right: 0.02rem
            width: 0.3rem
            height: 0.3rem
            img
              width: 100%
              height: 100%
</style>
