<template>
  <div class="my-buy-detail">
    <div class="good-info-wrapper" v-show="getPartyRecordInfoData.status == 'IN_PROGRESS'">
      <div class="good-pic-wrapper">
        <img src="../../assets/banner_1.jpg" class="good-pic" alt="">
        <div class="status">进行中</div>
      </div>
      <div class="content-wrapper">
        <h2 class="title">（第{{getPartyRecordInfoData.issueNo}}期）{{getPartyRecordInfoData.activityName}}</h2>
        <p class="joined-num">您已参与<span class="number">{{getPartyRecordInfoData.userBuyCount}}</span>次</p>
        <div class="bar"><span class="bar-inner" v-bind:style="{ width: getPartyRecordInfoData.prop }"></span></div>
        <div class="people">
          <div class="people-item people-item-left">
            {{getPartyRecordInfoData.havaPartCount}}
            <p class="text">已参与</p>
          </div>
          <div class="people-item people-item-center">
            {{getPartyRecordInfoData.amount}}
            <p class="text">总需人次</p>
          </div>
          <div class="people-item people-item-right">
            {{getPartyRecordInfoData.surplus}}
            <p class="text">剩余</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="my-buy-wrapper" v-show="getPartyRecordInfoData.status != 'IN_PROGRESS'">
      <ul class="my-buy-ul">
        <li class="my-buy-list">
          <div class="wrappers">
            <div class="avatar-wrapper">
              <img src="../../assets/banner_1.jpg" alt="" class="avatart"/>
              <div class="status">已揭晓</div>
            </div>
            <div class="content-wrapper">
              <h2 class="title">（第{{getPartyRecordInfoData.issueNo}}期）{{getPartyRecordInfoData.activityName}}</h2>
              <p class="join">您已参与<span class="join-num">{{getPartyRecordInfoData.userBuyCount}}</span>次</p>
              <p class="winning"> 获得者：<span class="winner">所有将军全认输了CNN</span></p>
              <p class="time">所揭晓时间：{{getPartyRecordInfoData.announceTime}}</p>
              <!-- <span class="next-icon" style="right: 0.18rem"></span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
    

    <div class="join-num">参您总共参与<span class="num">12</span>次</div>

    <div class="join-number-wrapper">
      <p class="time">{{getPartyRecordInfoData.announceTime}}</p>
      <ul class="number-ul">
        <li class="number" v-for="item in luckNosList">{{item.luckNo}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  const ERR_OK = 10000;

  export default{
    data(){
      return{
        activityId: this.$route.query.activityId,
        perIssueId: this.$route.query.perIssueId,
        partyId: this.$route.query.partyId,
        getPartyRecordInfoData: [],
        luckNosList: []
      }
    },
    created() {
      setDocumentTitle('我的云购详情');
    },
    computed: {
      value: function () {
        let value = 0;
        value = 67 / 69;
        return value;
      }
    },
    mounted(){
      this.getPartyRecordInfo();
      this.getLuckNos();
    },
    methods:{
      getPartyRecordInfo: function(){
        this.$http.get('/yyg/getPartyRecordInfo',{params:{ activityId: this.activityId, perIssueId: this.perIssueId, partyId: this.partyId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getPartyRecordInfoData = response.result[0];
              this.getPartyRecordInfoData.announceTime = this.timetrans(this.getPartyRecordInfoData.announceTime)
            }else{
              alert('加载数据失败！');
            }     
        }).then((error)=> this.error = error)
      },
      getLuckNos: function(){
        this.$http.get('/yyg/getLuckNos',{params:{ activityId: this.activityId, perIssueId: this.perIssueId, partyId: this.partyId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.luckNosList = response.result;
            }else{
              alert('加载数据失败！');
            }     
        }).then((error)=> this.error = error)
      },
      timetrans: function(date){
        var date = new Date(date);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .my-buy-detail
    .my-buy-wrapper
      margin-top: 0
  .good-info-wrapper
    display: flex
    padding: 0.4rem 0 0.46rem 0.6rem
    border-bottom: 0.04rem solid #dedede
    background: #fff
    .good-pic-wrapper
      width: 2.82rem
      flex: 0 0 2.82rem
      height: 2.76rem
      margin-right: 0.36rem
      border-radius: 0.12rem
      position: relative
      border: 2px solid #e5e5e5
      .good-pic
        width: 100%
        height: 100%
        border-radius: 0.12rem
      .status
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        height: 0.52rem
        line-height: 0.52rem
        border-radius: 0 0 0.06rem 0.06rem
        background: #ffd0ad
        font-size: 0.36rem
        text-align: center
        color: #fff
    .content-wrapper
      flex: 1
      overflow: hidden
      .title
        margin-top: 0.1rem
        font-size: 0.52rem
        font-weight: normal
        color: #666
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      .joined-num
        margin: 0.22rem 0
        font-size: 0.44rem
        color: #999
        .number
          font-family: "宋体"
          color: #ffa25c
      .total-progress
        width: 5.9rem
        height: 0.22rem
        border-radius: 0.12rem
        margin-bottom: 0.2rem
        position: relative
        background: #e7e7e7
        .prog
          width: 100%
          height: 100%
          border: 0
          border-radius: 0.12rem
          position: absolute
          top: 0
          left: 0
          background: #fda263
          &::-webkit-progress-bar
            border: 0
            border-radius: 0.12rem
            background: #e7e7e7
          &::-webkit-progress-value
            border: 0
            border-radius: 0.12rem
            background: #fda263
          &::-moz-progress-bar
            border: 0
            border-radius: 0.12rem
            background: #e7e7e7

      .people
        width: 5.9rem
        display: flex
      .people-item
        flex: 1
        font-size: 0.44rem
        .text
          margin-top: 0.12rem
          font-size: 0.36rem
          color: #9f9f9f
      .people-item-left
        color: #fda263
      .people-item-center
        color: #999
        text-align: center
      .people-item-right
        color: #34b1ff
        text-align: right

  .join-num
    height: 1.6rem
    line-height: 1.6rem
    background: #fff
    border-bottom: 0.04rem solid #dedede
    font-size: 0.48rem
    color: #999
    text-indent: 0.44rem
    .num
      margin-left: 0.08rem
      color: #ffa25c

  .join-number-wrapper
    padding: 0.44rem 0.5rem 0.12rem
    border-bottom: 0.04rem solid #dedede
    background: #fff
    .time
      margin-bottom: 0.5rem
      font-size: 0.44rem
      font-family: Arial
      color: #9f9f9f
    .number-ul
      font-size: 0
      .number
        display: inline-block
        width: 20%
        margin: 0 0 0.44rem 0
        font-size: 0.44rem
        color: #414141
        text-align: center
</style>
