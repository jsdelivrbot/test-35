<template>
  <div v-title="'入场客户'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">入场客户</div>
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
          <li v-for="item in entranceCustomerData">
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
        emptySta: false,
        curdate: '',
        userParam: null,
        entranceCustomerData: {},
        loadSta: false,
        backSta: false,
        isB: false
      }
    },
    methods: {
      search: function (val) {
        this.userParam = val;
        this.entranceCustomer();
      },
      changesKey: function(val){
        this.userParam = null;
        this.entranceCustomer();
      },
      entranceCustomer: function(){
        this.loadSta = true;
        this.$http.get('/api/entranceCustomer?',{params:{ sessionToken: this.sessionToken, date: this.curdate, userParam: this.userParam }}).then((response) => { 
          if(response.body.result == ERR_OK){
            this.loadSta = false
            this.entranceCustomerData = response.body.data.entranceCustomer;

            for(var i=0; i<this.entranceCustomerData.length; i++){
              if(this.entranceCustomerData[i].phone == '' || this.entranceCustomerData[i].phone == null){
                this.entranceCustomerData[i].phone = '--';
              }
            }

            if(this.curdate == null || this.curdate == '' ){
              this.curdate = response.body.data.showDate;
            }

            if(this.entranceCustomerData == ''){
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

      this.entranceCustomer();

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
          _this.entranceCustomer();
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
</style>
