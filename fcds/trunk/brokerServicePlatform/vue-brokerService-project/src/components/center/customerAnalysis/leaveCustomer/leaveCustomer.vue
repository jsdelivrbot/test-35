<template>
  <div v-title="'离场客户'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">离场客户</div>
    </v-back>
    <div class="vipsearch">
      <div class="rolelistTap" v-bind:class="{'class-b': isB}">

        <search style="float: left"
                v-on:search="search" 
                v-on:changes="changesKey" 
                placeholder="请输入交易商账号或姓名">    
        </search>

        <span class="dete-control"></span>
        <span id="demo1" class="curdates">{{curdate}}</span>
      </div>
    </div>

    <div class="searchBackD" v-bind:class="{'class-b': isB}"></div>

    <div class="vipBox">
      <div class="tradingList">
        <div class="tradingHead">  
          <div class="inner">
            <span>交易商</span>
            <span>手机号码</span>
          </div>
        </div>
        <ul>
          <li v-for="item in departureCustomerData">
            <span class="nameOrNum">
              <b>{{item.name}}</b>
              <i>（{{item.tradeUserNo}}）</i>
            </span>
            <span>{{item.phone}}</span>
          </li>
        </ul>
      </div>
      <v-empty v-show="emptySta"></v-empty>
    </div>
    <v-load v-show="loadSta"></v-load>
  </div>
</template>

<script>
import empty from 'components/empty/empty';
const ERR_OK = 'success';
import 'common/js/datePicker.js';
import load from 'components/load/load';
import search from 'components/search/search';
import back from 'components/back/back';

  export default{
    components:{
      'v-empty': empty,
      'v-load': load,
      'search': search,
      'v-back': back
    },
    data() {
     return{
        accountNo: null,
        sessionToken: localStorage.getItem("sessionToken"),
        animationState: true,
        emptySta: true,
        curdate: "",
        userParam: null,
        departureCustomerData: {},
        loadSta: false,
        backSta: false,
        isB: false
      }
    },
    methods: {
      search: function (val) {
        this.userParam = val;
        this.departureCustomer();
      },
      changesKey: function(val){
        this.userParam = null;
        this.departureCustomer();
      },
      departureCustomer: function(){
        this.loadSta = true;
        this.$http.get('/api/departureCustomer?',{params:{ sessionToken: this.sessionToken, date: this.curdate, userParam: this.userParam }}).then((response) => { 
          if(response.body.result == ERR_OK){
            this.loadSta = false
            this.departureCustomerData = response.body.data.departureCustomer;

            for(var i=0; i<this.departureCustomerData.length; i++){
              if(this.departureCustomerData[i].phone == '' || this.departureCustomerData[i].phone == null){
                this.departureCustomerData[i].phone = '--';
              }
            }

            if(this.curdate == null || this.curdate == '' ){
              this.curdate = response.body.data.showDate;
            }

            if(this.departureCustomerData == ''){
              this.emptySta = true;
            }else{
              this.emptySta = false;
            }

          }
        }).then((error)=> this.error = error)
      }
    },
    mounted(){
      var nowdate = this.toolHelper.getNowFormatDate();
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();

      this.departureCustomer();

      var _this = this;
      $("body").addClass('dash');
        var calendar = new datePicker();
      calendar.init({
        'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'2016-10-1',/*最小日期*/
        'maxDate':nowdate,/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
          var theSelectData=calendar.value;
          _this.curdate = calendar.value;
          _this.departureCustomer();
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
  #demo1
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
      .dete-control
        position: relative
        float: right 
        display: block
        width: 0.22rem
        height: 0.22rem
        background: url(../../../../assets/date_03.png) 0 0 no-repeat
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
          &.animation
            width: 1.75rem
            transition: all 1s ease 0s
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
