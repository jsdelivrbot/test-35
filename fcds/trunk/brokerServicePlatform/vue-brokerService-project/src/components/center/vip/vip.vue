<template>
  <div v-title="'钻石VIP'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">钻石VIP</div>
    </v-back>
    <div class="vipsearch">
      <div class="rolelistTap" v-bind:class="{'class-b': isB}">
        <div class="search-left">
          <div class="search" v-bind:class="{ animation: animationState}">
            <input type="text" placeholder="请输入交易商账号或姓名" v-model="accountNo" @keyup="changes">
            <i @click="animation"><img src="../../../assets/search.png" alt=""></i>
          </div>
        </div>
        <span class="dete-control"></span>
        <span id="demo1" class="curdates">{{curdate}}</span>
      </div>
    </div>

    <div class="searchBackD" v-bind:class="{'class-b': isB}"></div>

    <div class="vipBox">
      <div class="vipItem" v-for="item in getDiamondImportantListData">
        <div class="hd">
          <div class="hd-inner">
            <div class="l">
              <p class="name">{{item.tradeUserName}}<i>VIP{{item.vipLevel}}</i></p>
              <p class="no">{{item.tradeUserNo}}</p>
            </div>
            <div class="r" @click="viptimel(item.tradeUserNo)">抢购时间</div>
          </div>
        </div>
        <div class="md">
          <span>交易额：{{item.tradingVolume}}</span>
          <span>积分消费：{{item.scoreConsume}}</span>
          <span>达标数量：{{item.standardVolume}}</span>
          <span v-if="item.standardVolume > 0">达标月份：{{item.standardMonth}}</span>
          <span>日持仓市值：{{item.stockMarketLower}}</span>
        </div>
        <div class="bd">
          <span>直接推荐人姓名：{{item.referralTradeUserName}}</span>
          <span>交易账号：{{item.referralTradeUserNo}}</span>
          <span>是否成为钻石VIP：{{item.referralUserIsDiamondVip}}</span>
          <span v-if="test(item.referralUserIsDiamondVip)">抢购时间：{{item.referralUserBuyImportantDate}}</span>
          <span v-if="test(item.referralUserIsDiamondVip)">是否已返佣：{{item.isRebateFundToReferralUser}}</span>
          <span v-if="test(item.referralUserIsDiamondVip)">返佣金额：{{item.sumReferralRebateFund}}</span>
        </div>
      </div>
      <v-empty v-show="emptySta"></v-empty>
    </div>

    <div class="stage-cover" v-show="coverShow" @click="coverHide"></div>
    
    <div class="modifyCover viptime" v-show="viptimeShow">
      <ul class="viplist">
        <li v-for="item in buyDateListData">
          <p><b>VIP{{item.level}}</b>抢购时间</p>
          <p>{{item.buyImportantDate}}</p>
        </li>
      </ul>
      <span class="close" @click="close"><img src="../../../assets/close_03.png"></span>
    </div>

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
        getDiamondImportantListData: [],
        diamonVip: false,
        emptySta: false,
        coverShow: false,
        curdate: null,
        viptimeShow: false,
        buyDateListData: [],
        backSta: false,
        isB: false
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
          this.getDiamondImportantList('');
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
          // alert(this.accountNo);
          this.getDiamondImportantList(this.accountNo);
        }
      },
      getDiamondImportantList: function(tradeUser){
        this.$http.get('/api/getDiamondImportantList?',{params:{ sessionToken: this.session_token, tradeUser: tradeUser, month: this.curdate}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            
            if(this.curdate != '' && this.curdate != null){
              
            }else{
              this.curdate = response.body.data.standardMonth;
            }
            this.getDiamondImportantListData = response.body.data.diamondImportantList;
            if(response.body.data.diamondImportantList == '' || response.body.data.diamondImportantList == null){
              this.emptySta = true;
            }else{
              this.emptySta = false;
            }
          }else{
            // this.$refs.timerbtn.stop();
            alert(response.body.message)
          }
          
        }).then((error)=> this.error = error)
      },
      getDiamondVipBuyDate: function(tradeUserNo){
        this.$http.get('/api/getDiamondVipBuyDate?',{params:{ sessionToken: this.session_token, tradeUserNo: tradeUserNo}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.buyDateListData = response.body.data.buyDateList;
            for(var i =0 ; i < this.buyDateListData.length; i++){        
              if(this.buyDateListData[i].buyImportantDate > 100000){
                var d = new Date(this.buyDateListData[i].buyImportantDate);
                this.buyDateListData[i].buyImportantDate = this.formatDate(d);
              }  
            }
          }else{
            // this.$refs.timerbtn.stop();
          }   
        }).then((error)=> this.error = error)
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
      this.getDiamondImportantList('','');
      $("body").addClass('dash');
        var calendar = new datePicker();
      calendar.init({
        'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
        'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'2016-10-1',/*最小日期*/
        'maxDate':nowdate,/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
          var theSelectData=calendar.value;
          _this.curdate = calendar.value;
          _this.getDiamondImportantList('')
        },
        'onClose':function(){/*取消时触发事件*/
        }
      });
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
