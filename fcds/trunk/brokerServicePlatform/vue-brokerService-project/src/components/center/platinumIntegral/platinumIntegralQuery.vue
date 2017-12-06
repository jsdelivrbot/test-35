<template>
  <div v-title="'经纪商查询'">
    <div class="vipsearch">
      <div class="rolelistTap">
        <h2>白金积分查询</h2>
        <div class="search-left" id="left">
          <div class="search" v-bind:class="{ animation: animationState}">
            <input type="text" placeholder="请输入经纪商账号或姓名" v-model="accountNo" @keyup="changes">
            <i @click="animation"><img src="../../../assets/search.png" alt=""></i>
          </div>
        </div>
      </div>
    </div>

    <div style="height: 0.48rem"></div>
    
    <div class="pi_tap">
      <div class="left">
        <span v-bind:class="{cur: re_atv}" @click="recharge"><i>充值积分</i></span>
        <span v-bind:class="{cur: cm_atv}" @click="consumption"><i>消费积分</i></span>
      </div>
      <span class="dete-control"></span>
      <span id="PI" class="curdates">{{curdate}}</span>
    </div>

    <div class="vipBox" v-show="re_atv">
      <ul class="rechargeRecordList">
        <li>
          <span>交易商</span>
          <span>充值白金积分</span>
          <span>充值时间</span>
        </li>
        <li v-for="item in rechargeListsData">
          <span>
            <b>{{item.name}}</b>
            <b>（{{item.tradeUserNo}}）</b>
          </span>
          <span>{{item.amount}}</span>
          <span>{{item.rechargeDate}}</span>
        </li>
      </ul>
      <v-empty v-show="emptySta1"></v-empty>
    </div>

    <div class="vipBox" v-show="cm_atv">
      <ul class="rechargeRecordList">
        <li>
          <span>交易商</span>
          <span>消费白金积分</span>
          <span>消费时间</span>
        </li>
        <li v-for="item in consumeListsData">
          <span>
            <b>{{item.name}}</b>
            <b>（{{item.tradeUserNo}}）</b>
          </span>
          <span>{{item.amount}}</span>
          <span>{{item.consumeDate}}</span>
        </li>
      </ul>
      <v-empty v-show="emptySta2"></v-empty>
    </div>

    <div class="stage-cover" v-show="coverShow" @click="coverHide"></div>

  </div>
</template>

<script>
import 'common/js/jquery-1.8.3.min.js';
import empty from 'components/empty/empty';
const ERR_OK = 'success';
import 'common/js/datePicker.js';

  export default{
    components:{
      'v-empty': empty
    },
    data() {
     return{
        accountNo: null,
        session_token: localStorage.getItem("sessionToken"),
        animationState: true,
        emptySta1: false,
        emptySta2: false,
        coverShow: false,
        curdate: null,
        re_atv: true,
        cm_atv: false,
        consumeListsData: [],
        rechargeListsData: []
      }
    },
    methods: {
      recharge: function(){
        this.re_atv = true;
        this.cm_atv = false;
      },
      consumption: function(){
        this.re_atv = false;
        this.cm_atv = true;
      },
      changes: function(){
        if(this.accountNo == ''){
          this.getShowBrokerPlatinumScoreData();
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
          this.getShowBrokerPlatinumScoreData();
        }
      },
      coverHide: function(){
        this.coverShow = false;
      },
      close: function(){
        this.coverShow = false;
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
      getShowBrokerPlatinumScoreData: function(){
        this.$http.post('/api/showBrokerPlatinumScore',{ sessionToken: this.session_token, brokerUser: this.accountNo, date: this.curdate }, {emulateJSON: true}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.consumeListsData = response.body.data.consumeLists;
            this.rechargeListsData = response.body.data.rechargeLists;
            for(var i =0 ; i < this.rechargeListsData.length; i++){        
              if(this.rechargeListsData[i].rechargeDate > 100000){
                var d = new Date(this.rechargeListsData[i].rechargeDate);
                this.rechargeListsData[i].rechargeDate = this.formatDate(d);
                this.rechargeListsData[i].amount = this.toolHelper.fmoney(this.rechargeListsData[i].amount, 2);
              }
            }
            for(var i =0 ; i < this.consumeListsData.length; i++){        
              if(this.consumeListsData[i].consumeDate > 100000){
                var d = new Date(this.consumeListsData[i].consumeDate);
                this.consumeListsData[i].consumeDate = this.formatDate(d);
                this.consumeListsData[i].amount = this.toolHelper.fmoney(this.consumeListsData[i].amount, 2);
              }
            }

            if(this.consumeListsData == ''){
              this.emptySta2 = true
            }else{
              this.emptySta2 = false
            }

            if(this.rechargeListsData == ''){
              this.emptySta1 = true
            }else{
              this.emptySta1 = false
            }

          }else{
            // this.$refs.timerbtn.stop();
          }   
        }).then((error)=> this.error = error)
      }
    },
    mounted(){
      $("body").addClass('dash');
      this.getShowBrokerPlatinumScoreData();
      var _this = this;
      var calendar = new datePicker();
      calendar.init({
        'trigger': '#PI', /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'1900-1-1',/*最小日期*/
        'maxDate':'2100-12-31',/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
          var theSelectData=calendar.value;
          _this.curdate = calendar.value;
          _this.getShowBrokerPlatinumScoreData();
        },
        'onClose':function(){/*取消时触发事件*/
          _this.curdate = null;
          _this.getShowBrokerPlatinumScoreData();
        }
      });

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #left
    float: right
  .rolelistTap h2
    float: left
    line-height: 0.48rem
    font-size: 0.15rem
    font-weight: 500
  .rechargeRecordList
    overflow: hidden
    padding:0 0.12rem
    background-color: #FFF
    margin-top: 0.1rem
    li
      position: relative
      line-height: 0.65rem
      width: 100%
      overflow: hidden
      &:nth-child(1) span:nth-child(1)
        line-height: 0.65rem
        margin-top: 0
      &:nth-last-child(1)::after
        display: none
      &::after
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        height: 1px
        background-color: #ccc
        content: ''
        transform: scaleY(0.5)
      span
        float: left
        width: 33.33%
        text-align: center
        font-size: 0.13rem
        color: #999999
        &:nth-child(1)
          margin-top: 0.1rem
          line-height: 0.22rem
  .pi_tap
    position: relative
    width: 100%
    height: 0.5rem
    background-color: #FFF
    margin-top: 0.1rem
    padding: 0 0.12rem
    &::after
      content: ''
      display: block
      width: 100%
      position: absolute
      height: 1px
      background-color: #ccc
      top: 0
      left: 0
      transform:scaleY(0.5)
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
    .left
      float: left
      width: 50%
      height: 0.5rem
      span
        position: relative
        float: left
        width: 50%
        text-align: center
        line-height: 0.5rem
        font-size: 0.15rem
        color: #999999
        padding: 0 0.1rem
        i
          position: relative
          display: block
          font-style: normal
        &:nth-child(1)::after
          display: block
          content: ''
          width: 1px
          height: 100%
          background-color: #999999
          position: absolute
          right: 0
          top: 0
          transform: scaleY(0.5) scaleX(0.5)
        &.cur
          color: #ff6000
          i::before
            display: block
            content: ''
            width: 100%
            height: 1px
            background-color: #ff6000
            position: absolute
            left: 0
            bottom: 0
            // transform: scaleX(0.9)
    #PI
      position: absolute
      right: 0
      padding-right: 0.44rem
      color: #999
      font-size: 0.12rem
      line-height: 0.48rem
      height: 0.48rem
</style>
