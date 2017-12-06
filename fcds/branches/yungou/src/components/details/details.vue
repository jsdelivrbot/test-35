<template>
  <div class="detail">
    <div class="detail-top">
      <div class="detail-box">
        <div id="fixed">
          <div class="period-wrapper">
            <ul class="period-ul clearfloat" v-drag>
              <li class="period-list" v-for="item in getIssueNoByActivityIdData" @click="changePerIssueId(item.activityId, item.perIssueId)" v-bind:class="{ curr: item.perIssueId == perIssueId}">第{{item.issueNo}}期</li>
            </ul>
          </div>

          <div class="being-publish" v-show="getDetailsData.status == 'WAIT_ANNOUNCED'">
            <div class="publish-time">
              <div class="time-box" data-time="2017/7/30 15:20:00">
                <span class="time" id="min"></span>
                <span class="icon">：</span>
                <span class="time" id="s"></span>
                <span class="icon">：</span>
                <span class="time" id="ms"></span>
              </div>
            </div>
            <div class="tip">已满员 , 揭晓结果即将公布</div>
          </div>

          <div class="publish" v-show="getDetailsData.status == 'HAVE_ANNOUNCED'">
            <div class="winning">
              <div class="content">
                <div class="avatar-wrapper">
                  <img src="../../assets/timg.jpeg" alt="" class="avatar"/>
                </div>
                <div class="info-wrapper">
                  <h2 class="username">{{getActivityOverInfoData.partyId}}</h2>
                  <p class="joinnum">本期参与：<span class="num">{{getActivityOverInfoData.count}}</span>人次</p>
                  <p class="lotterytime">揭晓时间：{{getActivityOverInfoData.announceTime | formatDate1}}</p>
                </div>
              </div>
              <div class="winning-number clearfloat">
                <span class="good-luck">幸运云购码：<span class="luck-number">{{getActivityOverInfoData.luckNo}}</span></span>
                <span class="show-detail" @click="calDetail">计算详情<span class="next-btn"></span></span>
              </div>
              <span class="winning-icon"></span>
            </div>
          </div>

          <div class="content">

            <div class="swiper-container">
              <swiper :options="swiperOption" ref="mySwiperA">  
                <!-- 这部分放你要渲染的那些内容 -->  
                <swiper-slide v-for="item in getDetailsData.photos">
                  <img :src="item" alt="" class="bannde-pic"/>
                  <!-- <img src="../../assets/timg.jpeg" alt="" class="bannde-pic"/> -->
                </swiper-slide>  
                <!-- 这是轮播的小圆点 -->  
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>

            <div class="content-wrapper border-bottom-1px">
              <h2 class="title">（第{{getDetailsData.issueNo}}期）{{getDetailsData.activityName}}</h2>
              <span class="price">价值：￥{{getDetailsData.perIssuePrice}}</span>
              <!-- <div class="progress-wrapper">
                <prog :good="good"></prog>
              </div> -->
            </div>
            <div class="record-wrapper">
              <div class="record border-bottom-1px" @click="showRecord">参与记录<span class="next-btn"></span></div>
              <div class="record border-bottom-1px" @click="intoGraphicDetails">商品详情<span class="next-btn"></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="fix-wrapper" v-show="getDetailsData.status == 'IN_PROGRESS'">
      <div class="add-shop">
        <span class="btn shop-btn" @click="pay">立即参与积分团购</span>
      </div>
    </div>
    <!-- <div class="fix-wrapper" v-show="conduct">
      <div class="next-period">
        第{{nextPeriod}}期正在进行中
      </div>
    </div> -->
    <!-- <div class="to-top">
      <img src="../../assets/to_top.png" alt="" class="top-bg"/>
    </div> -->

    <!-- <next :good="good" :showNext="showNext" @hideNext="hideNext" @hideLayer="hideLayer"></next> -->

    <transition name="fade">
      <div class="next-wrapper" v-show="showLayer"></div>
    </transition>
    
    <div class="pay" v-show="hide">
      <div class="hd">
        <div class="left"><img src="../../assets/timg.jpeg" alt=""></div>
        <div class="right">
          <p>(第{{getDetailsData.issueNo}}期) {{getDetailsData.activityName}}</p>
          <p>￥{{getDetailsData.price*amount}}</p>
        </div>
      </div>
      <div class="shop-num">
        <span class="tip">购买数量 {{amount}}</span> 
        <div class="num-widget">
          <span class="decrease" @click="decrease">-</span>
          <input type="number" v-model="amount" class="num-input">
          <span class="add" @click="add">+</span>
        </div> 
        <span class="residue">剩余：{{getDetailsData.surplus}}</span>
      </div>
      <div class="pays"><a href="javascript:;" class="pay-btn" @click="paySubmit">购买</a></div>
      <div class="close" @click="close">X</div>
    </div>
  
    <div class="cover" v-show="hide" @click="close"></div>

  </div>
</template>

<script>
  // import prog from '../../components/progress/progress.vue';
  import {formatDate} from '../../common/js/date.js';
  import '../../../static/js/swiper-3.4.2.jquery.min.js';
  // import next from '../../components/next/next.vue';
  import { swiper, swiperSlide } from 'vue-awesome-swiper' 

  const ALL = -1;
  const POSITIVE = 0;
  const MEDIUM = 1;
  const NEGATIVE = 2;
  const ERR_OK = 10000;

  export default {
    props: {},
    data() {
      return {
        firstIn: true,
        good: {},
        goods: [],
        indexs: 0,
        tabType: 0,
        selectType: ALL,
        showLayer: false,
        showNext: false,
        winning: -1,
        no: true,
        getIssueNoByActivityIdList: [],
        activityId: this.$route.query.activityId,
        perIssueId: this.$route.query.perIssueId,
        getDetailsData: {},
        getIssueNoByActivityIdData: [],
        swiperOption: {
            autoplay: 3000,
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            pagination : '.swiper-pagination',
            paginationClickable :true,
            mousewheelControl : true,
            observeParents:true,
            loop: true,
            onTransitionStart(swiper){
              
            }
        },
        Announced: false,
        pending: false,
        getActivityOverInfoData: [],
        conduct: false,
        hide: false,
        amount: 1,
        partyId: 1,
        nowTime: 1499097600000,
        issueNo: null
      }
    },
    computed: {  
      // swiper() {  
      //   return this.$refs.mySwiper.swiper;  
      // }  
    },
    created () {
      setDocumentTitle('商品详情');
      // this._init();

      this.getIssueNoByActivityId();

      this.getDetails();

      this.getActivityOverInfo();

    },
    mounted() {
       // alert(this.$route.query.a)
      var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: '.swiper-pagination'
      });
      fnTimeCountDown(this.good.lotteryTime, ljl.obj());
      var fixedHeight = $("#fixed").height();

      $(window).scroll(function (event) {
        if ($(this).scrollTop() > fixedHeight) {
          $(".tab-wrapper").css({'opacity': '0'});
          $(".tab-wrapper2").css({'display': 'flex', 'opacity': '1'});
        } else {
          $(".tab-wrapper").css({'opacity': '1'});
          $(".tab-wrapper2").css({'display': 'none', 'opacity': '0'});
        }
      });
    },
    methods: {
      changePerIssueId: function(activityId, perIssueId){
        this.activityId = activityId;
        this.perIssueId = perIssueId;
        this.getDetails();
        this.getActivityOverInfo();
      },
      getTime: function () {//倒计时
        var _this = this;
        _this.nowTime = _this.nowTime + 100;
        var a;
        // console.log(this.nowTime)
        $('.time-box').each(function () {
          // var time = $(this).attr('data-time');

          var time = _this.timetrans(_this.getActivityOverInfoData.announceTime);
          // var time = _this.timetrans(1499743800000);

          var EndTime = new Date(time);
          var NowTime = new Date();
          // console.log(NowTime)
          var t = EndTime.getTime() - NowTime.getTime();
          // var t = _this.getActivityOverInfoData.announceTime;
          var d = 0, h = 0, m = 0, s = 0, ms=0;
          if (t >= 0) {
            d = Math.floor(t / 1000 / 60 / 60 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
            ms = parseInt(Math.floor(t % 1000)/10);
            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            $(this).find('#min').html(m);
            // $(this).find('#min').html(m);
            $(this).find('#s').html(s);
            $(this).find('#ms').html(ms);
            // console.log(s)
            // $(this).find('.down-sec2').html(s);
            return;
          } else {
            $(this).find('#min').html('00');
            $(this).find('#s').html('00');
            $(this).find('#ms').html('00');
            // this.updateActivityDetailStatus();
            
            if(_this.getActivityOverInfoData.status == 'WAIT_ANNOUNCED'){
              _this.updateActivityDetailStatus();
              console.log(1)
            }

            return;        
          }
        });
        a = setTimeout(function () {
          _this.getTime();
        }, 100)

        if(new Date(this.timetrans(this.getActivityOverInfoData.announceTime)) - new Date() < 0){ 
          clearTimeout(a);
        }
      },
      intoGraphicDetails: function () {
        this.$router.push({path: '/graphicdetails'})
      },
      _init: function () {
        this.goods = JSON.parse(localStorage.getItem("goods"));
        this.indexs = parseInt(localStorage.getItem("index"));
        this.good = this.goods[this.indexs];
        for (let i = 0; i < this.good.buyHistory.length; i++) {
          if (this.good.winningNumber === this.good.buyHistory[i].buyNum) {
            this.winning = this.good.buyHistory[i];
          }
        }
      },
      selectPeriod: function (index) {
        this.indexs = parseInt(index);
        localStorage.setItem('index', this.indexs);
        this.good = this.goods[index];
        for (let i = 0; i < this.good.buyHistory.length; i++) {
          if (this.good.winningNumber === this.good.buyHistory[i].buyNum) {
            this.winning = this.good.buyHistory[i];
          }
        }
      },
      selectTab: function (type) {
        this.tabType = type;
      },
      select: function (type) {
        this.selectType = type;
      },
      needShow: function (type) {
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      },
      showNextBox: function () {
        this.showLayer = true;
        this.showNext = true;
      },
      hideNext: function () {
        this.showNext = false;
      },
      hideLayer: function () {
        this.showLayer = false;
      },
      showRecord: function () {
        // localStorage.setItem('good', JSON.stringify(this.good));
        // this.$router.push({name: 'record'});
        this.$router.push({ path: '/record',query:{activityId: this.activityId, perIssueId: this.perIssueId}})
      },
      calDetail: function () {
        // localStorage.setItem('good', JSON.stringify(this.good));
        this.$router.push({name: 'caldetail'});
      },
      getLocalTime: function(nS){
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "/").replace(/日/g, " ");
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
      },
      close: function(){
        this.hide = false;
      },
      decrease: function(){
        if(this.amount > 1){
          this.amount--;
        }else{
          this.amount = 1;
        }
      },
      add: function(){
        if(this.getDetailsData.purchaseTimes > this.amount){
          this.amount++
        }else{
          this.amount = this.getDetailsData.purchaseTimes;
          alert("每人仅限购买"+this.getDetailsData.purchaseTimes+"次")
        }
      },
      pay: function(){
        this.hide = true;
      },
      paySubmit: function(){
        this.buyLuckNumber();
      },
      getDetails: function(){
        this.$http.get('/yyg/getDetails',{params:{activityId: this.activityId, perIssueId: this.perIssueId}}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getDetailsData = response.result;
              this.issueNo = this.getDetailsData.issueNo;
            }else{
                alert('加载数据失败！');
            }
            
        }).then((error)=> this.error = error)
      },
      getIssueNoByActivityId: function(){
        this.$http.get('/yyg/getIssueNoByActivityId',{params:{activityId: this.activityId}}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getIssueNoByActivityIdData = response.result;
            }else{
                // alert('加载数据失败！');
            }
            
        }).then((error)=> this.error = error)
      },
      buyLuckNumber: function(){
         this.$http.get('/yyg/buyLuckNumber', {params:{ activityId: this.activityId, issueNo: this.issueNo, partyId: this.partyId, amount: this.amount }}).then((response) => { 
             response = response.body
             if(response.status == ERR_OK){ 
               // this.getActivityTypeData = response.result;
               alert("支付成功")
             }else{
                 alert('支付失败');
             }
             
         }).then((error)=> this.error = error)
      },
      getActivityOverInfo: function(){
        this.$http.get('/yyg/getActivityOverInfo', {params:{ activityId: this.activityId, perIssueId: this.perIssueId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getActivityOverInfoData = response.result[0];
              if(this.getActivityOverInfoData.status == 'WAIT_ANNOUNCED'){
                this.getTime();
              }
            }else{

            }
            
        }).then((error)=> this.error = error)
      },
      updateActivityDetailStatus: function(){
        this.$http.get('/yyg/updateActivityDetailStatus', {params:{ perIssueId: this.perIssueId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getDetails();
              this.getActivityOverInfo();
            }else{

            }
            
        }).then((error)=> this.error = error)
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      formatDate1(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss.mesc');
      }
    },
    // components: {
    //   prog,
    //   next
    // },
    computed: {
      nextPeriod: function () {
        return this.good.period + 1;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../static/css/swiper-3.4.2.min.css";
  @import "../../common/stylus/mixin.styl";
  .detail
    .detail-top
      width: 100%
      max-width: 640px
      margin-bottom: 0.48rem
      .detail-box
        #fixed
          .period-wrapper
            width: 100%
            height: 1.52rem
            line-height: 1.52rem
            position: relative
            border-bottom: 0.04rem solid #dedede
            overflow: hidden
            background: #f7f7f7
            .period-ul
              height: 1.52rem
              width: auto
              white-space: nowrap
              position: absolute
              left: 0
              top: 0
              font-size: 0
              z-index: 40
              .period-list
                width: 3.64rem
                height: 100%
                border-right: 0.04rem solid #dedede
                display: inline-block
                font-size: 0.56rem
                color: #535353
                text-align: center
                &.curr
                  font-weight: 500
                  color: #fda263
                &:last-child
                  border-right: none
          .publish
            width: 100%
            height: 5.6rem
            margin-bottom: 0.4rem
            padding-top: 0.45rem
            background: #fff
            .winning
              width: 12rem
              height: 4.7rem
              border: 0.06rem solid #fda263
              border-radius: 0.12rem
              margin: 0 auto
              padding: 0.48rem 0.3rem 0.4rem 0.48rem
              position: relative
              background: #fffdfb
              .content
                display: flex
                border-bottom: 1px solid #d8d8d8
                padding-bottom: 0.48rem
                background: #fffdfb
                .avatar-wrapper
                  flex: 0 0 2.46rem
                  width: 2.46rem
                  height: 2.46rem
                  border-radius: 50%
                  vertical-align: top
                  .avatar
                    width: 100%
                    height: 100%
                    border-radius: 50%
                .info-wrapper
                  flex: 1
                  margin-left: 0.48rem
                  font-size: 0.48rem
                  color: #999
                  .username
                    margin-bottom: 0.44rem
                    font-size: 0.64rem
                    color: #fda263
                  .joinnum
                    margin-bottom: 0.36rem
                    .num
                      color: #fda263
              .winning-number
                margin-top: 0.3rem
                font-size: 0.48rem
                color: #999
                .good-luck
                  float: left
                  .luck-number
                    color: #fda263
                .show-detail
                  float: right
                  padding-right: 0.64rem
                  position: relative
                  .next-btn
                    width: 0.18rem
                    height: 0.34rem
                    display: block
                    position: absolute
                    right: 0.16rem
                    top: 0.1rem
                    background: url("../../assets/next_bg.png") no-repeat
                    background-size: cover
              .winning-icon
                width: 2rem
                height: 2.04rem
                display: block
                position: absolute
                left: 0
                top: 0
                border-radius: 0.06rem 0 0 0
                background: url("../../assets/winning.png") no-repeat
                background-size: cover
          .being-publish
            width: 100%
            height: 5.24rem
            margin-bottom: 0.4rem
            padding-top: 1.2rem
            position: relative
            background: #fff
            .publish-time
              width: 12rem
              height: 3.48rem
              border: 0.06rem solid #fda263
              border-radius: 0.12rem
              margin: 0 auto
              font-size: 0
              .time-box
                margin-top: 0.9rem
                text-align: center
                line-height: 1.96rem
                .icon
                  displaly: inline-block
                  font-size: 0.6rem
                  color: #fda263
                  vertical-align: top
                .time
                  width: 3.3rem
                  height: 1.96rem
                  line-height: 1.96rem
                  display: inline-block
                  border-radius: 0.12rem
                  font-size: 1.55rem
                  background: #fda263
                  color: #fff
                  text-align: center
                  vertical-align: top
            .tip
              position: absolute
              top: 0.68rem
              left: 50%
              margin-left: -4.72rem
              width: 9.44rem
              height: 0.96rem
              line-height: 0.96rem
              background: #fffbe7
              border: 1px solid #daba6f
              border-radius: 0.04rem
              font-size: 0.6rem
              font-weight: 500
              color: #fda263
              text-align: center
          .content
            .swiper-container
              width: 100%
              height: 8.76rem
              margin-bottom: 0.4rem
              border-bottom: 0.04rem solid #dedede
              .swiper-pagination
                .swiper-pagination-bullet-active
                  background: #fda263
              .bannde-pic
                width: 100%
                height: 8.72rem
            .content-wrapper
              width: 100%
              padding: 0.64rem 1rem 0.48rem 0.5rem
              margin-bottom: 0.4rem
              display: inline-block
              vertical-align: top
              overflow: hidden
              background: #fff
              border-bottom-1px(#dedede)
              .title
                width: 100%
                display: block
                margin-bottom: 0.22rem
                padding-top: 0.08rem
                font-size: 0.52rem
                color: #666
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
              .price
                margin-bottom: 0.32rem
                display: block
                font-size: 0.48rem
                color: #999
              .progress-wrapper
                width: 100%
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
            .record-wrapper
              .record
                width: 100%
                height: 1.64rem
                line-height: 1.64rem
                padding-left: 0.42rem
                background: #fff
                border-bottom-1px(#dedede)
                font-size: 0.48rem
                color: #999
                .next-btn
                  width: 0.18rem
                  height: 0.34rem
                  display: block
                  position: absolute
                  right: 0.5rem
                  top: 0.64rem
                  background: url("../../assets/next_bg.png") no-repeat
                  background-size: cover
          .title-wrapper
            .title
              width: 80%
              margin: 0 auto
              padding: 1rem 0
              display: flex
              .line
                flex: 1
                position: relative
                top: -6px
                border-bottom: 1px solid #cecece
              .text
                padding: 0 0.3rem
                font-size: 0.48rem
                color: #2d2d2d
    .tab-wrapper2
      top: 0
      display: flex
      width: 100%
      max-width: 640px
      height: 1.8rem
      line-height: 1.8rem
      position: fixed
      z-index: 2
      display: none
      background: #fff
      font-size: 0.56rem
      color: #727272
      border-bottom: 1px solid #dedede
      .tab-item
        flex: 1
        text-align: center
        &.active
          height: 1.8rem
          color: #fda263
          border-bottom: 0.08rem solid #fda263
    .details-box
      width: 100%
      max-width: 640px
      .tab-wrapper
        top: 0
        display: flex
        width: 100%
        max-width: 640px
        height: 1.8rem
        line-height: 1.8rem
        background: #fff
        font-size: 0.56rem
        color: #727272
        border-bottom: 1px solid #dedede
        .tab-item
          flex: 1
          text-align: center
          &.active
            height: 1.8rem
            color: #fda263
            border-bottom: 0.08rem solid #fda263
      .ratings-box
        width: 100%
        .detail-wrapper
          .description
            .pic
              width: 100%
              float: left
        .ratings-wrapper
          .ratings
            .rating-item
              padding: 0.52rem 0.6rem 0.64rem
              border-bottom-1px(#d6d6d6)
              background: #fff
            .user-wrapper
              height: 1.26rem
              line-height: 1.26rem
              margin-bottom: 0.6rem
              font-size: 0
              .avatar
                width: 1.26rem
                height: 1.26rem
                border-radius: 50%
                vertical-align: top
              .name
                margin-left: 0.7rem
                font-size: 0.52rem
                color: #333
                vertical-align: top
            .text
              line-height: 0.72rem
              margin-bottom: 0.4rem
              font-size: 0.52rem
              color: #333
            .time
              font-size: 0.46rem
              color: #888
            .pic
              .pic-item
                width: 2.96rem
                height: 2.96rem
                margin: 0.5rem 0.26rem 0 0
                float: left
                .img
                  width: 100%
                  height: 100%
    .to-top
      width: 1.76rem
      height: 1.76rem
      border-radius: 50%
      position: fixed
      right: 0.56rem
      bottom: 5.9rem
      border: 1px solid #d7c17b
      background: #fff
      z-index: 2
      display: none
      .top-bg
        width: 1.76rem
        height: 1.76rem
        border-radius: 50%
        background-size: cover
    .fix-wrapper
      width: 100%
      height: 2rem
      .next-period
        width: 100%
        max-width: 640px
        height: 2rem
        line-height: 2rem
        position: fixed
        bottom: 0
        background: #efebe2
        font-size: 0.64rem
        text-align: center
        color: #5c5c5c
        z-index: 60
      .add-shop
        width: 100%
        max-width: 640px
        height: 2rem
        line-height: 2rem
        display: flex
        position: fixed
        bottom: 0
        z-index: 10
        .btn
          flex: 1
          width: 50%
          font-size: 0.64rem
          text-align: center
          &.add-btn
            background: #efebe2
            color: #5c5c5c
          &.shop-btn
            background: #efebe2
            color: #5c5c5c
    .next-wrapper
      position: fixed
      width: 100%
      height: 100%
      left: 0
      bottom: 0
      z-index: 50
      opacity: 1
      background: rgba(0, 0, 0, 0.5)
      transition: all 0.5s
      &.fade-enter-active, &.fade-leave
        opacity: 1
        background: rgba(0, 0, 0, 0.5)
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(0, 0, 0, 0)
</style>
