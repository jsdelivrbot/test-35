<template>
  <div class="record">
    <div class="record-box">
      <ul>
        <li class="record-list" @click="showBuyLayer(item.partyId, item.total)" v-for="item in getParticipateData">
          <div class="avatar-wrapper">
            <img src="31" alt="" class="avatar"/>
          </div>
          <div class="info-box">
            <p class="name-num"><span class="name">哈哈</span>云购了<span class="num">{{item.total}}</span>人次
            </p>
            <p class="time">{{2016 | formatDate}}</p>
          </div>
          <span class="next-icon"></span>
        </li>
      </ul>

      <!--死数据-->
      <div class="buy-layer" v-show="buyLayer">
        <div class="content-wrapper">
          <div class="top border-bottom-1px">
            <span class="name">所有将军全认</span>
            <span class="text">云购了 <span class="num">{{total}}</span> 人次</span>
            <span class="close-icon" @click="hideBuyLayer"></span>
          </div>
          <div class="num-wrapper">
            <ul class="num-ul">
              <li class="num-list" v-for="item in getLuckNosData">{{item.luckNo}}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../common/js/date.js';
  const ERR_OK = 10000;

  export default {
    data() {
      return {
        buyLayer: false,
        activityId: this.$route.query.activityId,
        perIssueId: this.$route.query.perIssueId,
        getParticipateData: null,
        partyId: null,
        getLuckNosData: null,
        total: null
      }
    },
    created() {
      setDocumentTitle('参与记录');
      this.good = JSON.parse(localStorage.getItem("good"));
    },
    mounted(){
      this.getParticipate();
    },
    methods: {
      showBuyLayer: function (partyId, total) {
        this.buyLayer = true;
        this.partyId = partyId;
        this.total = total;
        this.getLuckNos();
      },
      hideBuyLayer: function () {
        this.buyLayer = false;
      },
      getParticipate: function(){
        this.$http.get('/yyg/getParticipate', {params:{ activityId: this.activityId, perIssueId: this.perIssueId}}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getParticipateData = response.result;
            }else{

            }
            
        }).then((error)=> this.error = error)
      },
      getLuckNos: function(){
        this.$http.get('/yyg/getLuckNos', {params:{ activityId: this.activityId, perIssueId: this.perIssueId, partyId: this.partyId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getLuckNosData = response.result;
            }else{

            }
            
        }).then((error)=> this.error = error)
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss.mesc');
      }
    },
    computed: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .record
    .record-box
      background: #fff
      .record-list
        display: flex
        position: relative
        padding: 0.3rem 0.48rem
        border-bottom: 0.04rem solid #efeff4
        .avatar-wrapper
          width: 1.72rem
          height: 1.72rem
          border: 0.06rem solid #f1f1f1
          border-radius: 50%
          flex: 0 0 1.72rem
          .avatar
            width: 100%
            height: 100%
            border-radius: 50%
        .info-box
          flex: 1
          margin-top: 0.3rem
          margin-left: 0.54rem
          .name-num
            margin-bottom: 0.3rem
            font-size: 0.48rem
            color: #666
            .name
              margin-right: 0.4rem
              font-weight: 500
              color: #fda263
            .num
              margin: 0 0.16rem
              color: #fda263
          .time
            font-size: 0.48rem
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
      .buy-layer
        width 100%
        height: 100%
        max-width: 640px
        position: fixed
        top: 0
        left: 50%
        transform: translateX(-50%)
        background: rgba(0, 0, 0, .5)
        .content-wrapper
          width: 9.4rem
          border-radius: 0.16rem
          position: absolute
          left: 50%
          top: 50%
          transform: translateY(-50%)
          margin-left: -4.7rem
          background: #fff
          .top
            height: 1.48rem
            line-height: 1.48rem
            position: relative
            font-size: 0
            text-indent: 0.68rem
            border-bottom-1px(#dedede)
            .name
              font-size: 0.48rem
              color: #fda263
            .text
              margin-left 0.4rem
              font-size: 0.48rem
              color: #666
              .num
                color: #fda263
            .close-icon
              width: 0.28rem
              height: 0.28rem
              display: block
              position: absolute
              right: 0.5rem
              top: 0.6rem
              background: url("../../assets/close.png") no-repeat
              background-size: 100% 100%
        .num-wrapper
          height: 5.6rem
          padding: 0.56rem 0.34rem 0rem 0.34rem
          overflow-y: auto
          .num-ul
            width: 100%
            font-size: 0
            .num-list
              width: 33.3%
              margin-bottom: 0.54rem
              text-align: center
              display: inline-block
              font-size: 0.48rem
              color: #666

</style>
