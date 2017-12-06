<template>
  <div id="seniorfranchise" v-title="'已交加盟费'">
      <v-back v-show="backSta">
        <div slot="title" class="Vtitle">已交加盟费</div>
      </v-back>
      <div class="backD" v-bind:class="{'class-b': isB}"></div>
      <div class="section">
          <div class="hd">
            <div class="hd-inner">
                <span class="hd-title">高级经纪商</span>
                <span class="seniorfranchiseDate"><i><!-- 更新日期2017年01月 --></i></span>
            </div>
          </div>
          <div class="content">
            <ul>
              <li class="first">
                <div class="inner">
                  <div class="item"><p>最后交款日</p></div>
                  <div class="item">高级经纪商</div>
                  <div class="item">已交总计</div>
                </div>
              </li>
              <li>
                <div class="inner">
                  <div class="item"><p>&nbsp;{{topBrokerUserFranchise.payDateMax}}&nbsp;</p></div>
                  <div class="item">&nbsp;{{topBrokerUserFranchise.brokerUserName}}(<b>{{topBrokerUserFranchise.brokerUserNo}}</b>)&nbsp;</div>
                  <div class="item extras">&nbsp;<b>{{topBrokerUserFranchise.payAmountSum}}</b>万&nbsp;</div>
                </div>
              </li>
            </ul>
          </div>
      </div>

      <div class="section">
          <div class="hd">
            <div class="hd-inner">
                <span class="hd-title">一级经纪商</span>
                <span class="seniorfranchiseStatistics">已交总计：<i><b>{{payAmountTotal}}</b>万</i></span>
                <span class="seniorfranchiseStatistics">人数总计：<i><b>{{brokerTotal}}</b>人</i></span>
            </div>
          </div>
          <div class="content">
            <ul>
              <li class="first">
                <div class="inner">
                  <div class="item"><p>最后交款日</p></div>
                  <div class="item">一级经纪商</div>
                  <div class="item">已交总计</div>
                </div>
              </li>
              <li v-for="item in oneFranchiseTotalList">
                <div class="inner">
                  <div class="item"><p>&nbsp;{{item.payDateMax}}&nbsp;</p></div>
                  <div class="item">&nbsp;{{item.brokerUserName}}(<b>{{item.brokerUserNo}}</b>)&nbsp;</div>
                  <div class="item extras">&nbsp;<b>{{item.payAmountSum}}</b>万&nbsp;</div>
                </div>
              </li>
              <v-empty v-show="emptySta"></v-empty>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
import empty from 'components/empty/empty';
const ERR_OK = 'success';
import back from 'components/back/back';

  export default{
    components:{
      'v-empty': empty,
      'v-back': back
    },
    data(){
      return{
        topBrokerUserFranchise: {},
        oneFranchiseTotalList: [],
        sessionToken: localStorage.getItem("sessionToken"),
        scroll: '',
        totalPage: null,
        pageIndex: null,
        payAmountTotal: null,
        brokerTotal: null,
        emptySta: false,
        backSta: false,
        isB: false
      }
    },
    created() {
	   
    },
    methods: {
      getFranchiseTotalByBroker: function(pageIndex){
        this.$http.get('/api/getFranchiseTotalByBroker',{params:{ sessionToken: this.sessionToken,pageIndex:pageIndex}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.payAmountTotal = this.toolHelper.fmoney(response.body.data.payAmountTotal/10000);
            this.brokerTotal = response.body.data.brokerTotal;
            this.topBrokerUserFranchise = response.body.data.topBrokerUserFranchise;
            this.topBrokerUserFranchise.payAmountSum = this.toolHelper.fmoney(this.topBrokerUserFranchise.payAmountSum/10000);
            this.totalPage = response.body.data.paging.totalPage;
            this.pageIndex = response.body.data.paging.pageIndex;
            var myDate = new Date(this.topBrokerUserFranchise.payDateMax);
            
            if(this.topBrokerUserFranchise.payDateMax == null){
              this.topBrokerUserFranchise.payDateMax = '--';
            }else{
              this.topBrokerUserFranchise.payDateMax = this.formatDate(myDate);
            }
            // this.oneFranchiseTotalList = response.body.data.oneFranchiseTotalList;
            for (var i = 0; i < response.body.data.oneFranchiseTotalList.length; i++) {
              response.body.data.oneFranchiseTotalList[i].payAmountSum = this.toolHelper.fmoney((response.body.data.oneFranchiseTotalList[i].payAmountSum)/10000);
              this.oneFranchiseTotalList.push(response.body.data.oneFranchiseTotalList[i])
            }

            for(var i =0 ; i < this.oneFranchiseTotalList.length; i++){
              
              if(this.oneFranchiseTotalList[i].payDateMax > 100000){
                var d = new Date(this.oneFranchiseTotalList[i].payDateMax);
                this.oneFranchiseTotalList[i].payDateMax = this.formatDate(d);
              }     
              // this.oneFranchiseTotalList[i].payAmountSum = this.toolHelper.formatNum(parseInt(this.oneFranchiseTotalList[i].payAmountSum/10000))
            }
            if(response.body.data.oneFranchiseTotalList == '' || response.body.data.oneFranchiseTotalList == null){
              this.emptySta = true;
            }else{
              this.emptySta = false;
            }
          }else{
            alert(response.body.message)
          }   
        }).then((error)=> this.error = error)
      },
      formatDate: function(now){
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        return month+"-"+date;
      },
      menu: function() {
        this.scroll = document.body.scrollTop;
        if(window.screen.height + this.scroll > document.body.offsetHeight){
          this.pageIndex++
          if(this.totalPage > this.pageIndex){
            this.getFranchiseTotalByBroker(this.pageIndex);
          }
        }
      }
    },
    mounted(){
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();
      this.getFranchiseTotalByBroker(0);
      window.addEventListener('scroll', this.menu);
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #seniorfranchise
    .seniorfranchiseDate
      float: right
      i
        font-style: normal
        color: #999999
    li
      width: 100%
      height: 0.65rem
      padding: 0 0.12rem
      &.first
        height: 0.45rem
        .inner
          height: 0.45rem
          line-height: 0.45rem
          .item
            height: 0.45rem
            line-height: 0.45rem
      .inner
        position: relative
        width: 100%
        height: 0.65rem
        &::after
          display: block
          position: absolute
          content: ''
          bottom: 0
          left: 0
          width: 100%
          height: 1px
          background-color: #d0d0d0
          transform: scaleY(0.5)
          -webkit-transform: scaleY(0.5)
        .item
          width: 33.33%
          position: relative
          float: left
          height: 0.65rem
          text-align: center
          font-size: 0.14rem
          line-height: 0.65rem
          &.extras
            color: #ff6000
          b
            font-family: "黑体"!important
    .seniorfranchiseStatistics
      float: right
      color: #999999
      margin-right: 0.1rem
      overflow: hidden
      i
        font-style: normal
        color: #ff6000
</style>
