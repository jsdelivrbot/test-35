<template>
  <div class="my-buy-wrapper">
    <ul class="my-buy-ul">
      <li class="my-buy-list" @click="intoDetail(item.activityId, item.perIssueId, item.partyId)" v-for="item in getPartyRecordData">
        <div class="good-info-wrapper" v-show="item.status != 'HAVE_ANNOUNCED'">
          <div class="good-pic-wrapper">
            <img src="../../assets/banner_1.jpg" class="good-pic" alt="">
            <div class="status">进行中</div>
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第{{item.issueNo}}期）{{item.activityName}}</h2>
            <p class="joined-num">您已参与<span class="number">{{item.userBuyCount}}</span>次</p>
            <div class="bar"><span class="bar-inner" v-bind:style="{ width: item.prop }"></span></div>
            <div class="people">
              <div class="people-item people-item-left">
                {{item.havaPartCount}}
                <p class="text">已参与</p>
              </div>
              <div class="people-item people-item-center">
                {{item.amount}}
                <p class="text">总需人次</p>
              </div>
              <div class="people-item people-item-right">
                {{item.surplus}}
                <p class="text">剩余</p>
              </div>
            </div>
          </div>
        </div>
        <span class="next-icon" v-show="item.status != 'HAVE_ANNOUNCED'"></span>

        <div class="wrappers" v-show="item.status == 'HAVE_ANNOUNCED'">
          <div class="avatar-wrapper">
            <img src="../../assets/banner_1.jpg" alt="" class="avatart"/>
            <div class="status">已揭晓</div>
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第{{item.issueNo}}期）{{item.activityName}}</h2>
            <p class="join">您已参与<span class="join-num">{{item.userBuyCount}}</span>次</p>
            <p class="winning"> 获得者：<span class="winner">所有将军全认输了CNN</span></p>
            <p class="time">所揭晓时间：{{item.announceTime}}</p>
            <span class="next-icon" style="right: 0.18rem"></span>
          </div>
        </div>

      </li>
      
     <!--  <li class="my-buy-list">
        
        <div class="wrappers">
          <div class="avatar-wrapper">
            <img src="../../assets/banner_1.jpg" alt="" class="avatart"/>
            <div class="status">已揭晓</div>
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第24323期）苹果6s</h2>
            <p class="join">已参与<span class="join-num">4</span>人次</p>
            <p class="winning"> 获得者：<span class="winner">所有将军全认输了CNN</span></p>
            <p class="time">所揭晓时间：2016-03-29 15:21:24</p>
            <span class="next-icon"></span>
          </div>
        </div>

      </li> -->
    </ul>
  </div>
</template>

<script>
  const ERR_OK = 10000;
  export default {
    data(){
      return{
        getPartyRecordData: null,
        partyId: '001'
      }
    },
    created() {
      setDocumentTitle('我的云购记录');
    },
    mounted(){
      this.getPartyRecord();
    },
    methods: {
      intoDetail: function (activityId, perIssueId, partyId) {
        this.$router.push({name: 'mybuydetail', query:{activityId: activityId, perIssueId: perIssueId, partyId:partyId}});
      },
      getPartyRecord: function(){
        this.$http.get('/yyg/getPartyRecord',{params:{ partyId: this.partyId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getPartyRecordData = response.result;
              
              for(var i=0; i<this.getPartyRecordData.length; i++){
                this.getPartyRecordData[i].announceTime = this.timetrans(this.getPartyRecordData[i].announceTime)
              }
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
    },
    computed: {
      value: function () {
        let value = 0;
        value = 67 / 69;
        return value;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .bar
    position: relative
    width: 5.88rem
    height: 0.22rem
    background-color: #e7e7e7
    border-radius: 0.11rem
    overflow: hidden
    margin: 0.2rem 0
    .bar-inner
      position: absolute
      top: 0
      left: 0
      height: 100%
      background-color: #fda263
      transition: all 1s ease 1s 
  .wrappers
    // padding: 0.56rem 0.32rem
    width:100%
    display: flex
    position: relative
    // border-bottom: 0.04rem solid #dedede
    font-size: 0
  .my-buy-wrapper
    width: 100%
    margin-top: 2.8rem
    background: #fff
    .my-buy-ul
      background: #fff
      .my-buy-list
        padding: 0.56rem 0.32rem
        display: flex
        position: relative
        border-bottom: 0.04rem solid #dedede
        font-size: 0
        .good-info-wrapper
          width: 100%
          padding: 0 1rem 0 0
          border-bottom: 0
          .good-pic-wrapper
            width: 3.12rem
            flex: 0 0 3.12rem
            height: 3.06rem
            border-width: 0.04rem
            margin-right: 0.52rem
          .title
            height: auto
            margin-top: 0
            padding: 0.1rem 0 0 0
            line-height: 1
          .status
            background: #ffa25c
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
        .avatar-wrapper
          flex: 0 0 3.12rem
          width: 3.12rem
          height: 3.06rem
          border: 0.04rem solid #e5e5e5
          border-radius: 0.12rem
          margin-right: 0.52rem
          position: relative
          vertical-align: top
          .avatart
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
            border-radius: 0 0 0.12rem 0.12rem
            background: #cacaca
            font-size: 0.36rem
            text-align: center
            color: #fff
            &.being
              background: #ffd0ad
        .content-wrapper
          flex: 1
          vertical-align: top
          .title
            margin-bottom: 0.34rem
            padding-top: 0.1rem
            font-size: 0.52rem
            color: #666
          .join
            margin-bottom: 0.34rem
            font-size: 0.44rem
            color: #999
            .join-num
              height: auto
              line-height: 1
              font-weight: 500
              border-bottom: 0
              color: #fda263
          .winning
            margin-bottom: 0.34rem
            font-size: 0.44rem
            color: #c5bcbc
            .winner
              font-weight: 500
              color: #fda263
          .time
            font-size: 0.44rem
            color: #c5bcbc
        .next-icon
          width 0.18rem
          height: 0.34rem
          display: block
          position: absolute
          right: 0.5rem
          top: 50%
          margin-top: -0.17rem
          background: url("../../assets/next_bg.png") no-repeat
          background-size: 100% 100%
</style>
