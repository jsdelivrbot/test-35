<template>
  <div class="cal-detail">
    <div class="cal-way">
      <div class="result">
        <p class="result-num">10000002</p>
        <p class="result-text">就算结果</p>
      </div>
      <div class="icon-wrapper"><span class="icon"></span><span class="icon"></span></div>
      <div class="compute">
        <span class="icon icon1">(</span>
        <div class="sum">
          <p class="num">13414124124</p>
          <p class="text">时间取值之和</p>
        </div>
        <span class="icon icon2">%</span>
        <div class="need">
          <p class="num">90</p>
          <p class="text">商品总需人次</p>
        </div>
        <span class="icon icon3">)</span>
        <span class="icon icon4">+</span>
        <div class="result-number">
          <p class="num">10000001</p>
          <p class="text">固定数值</p>
        </div>
      </div>
      <div class="info">
        <p class="info-text">截止该商品最后购买时间 【2017-04-14 15:21:13.934】 网站所有商品的最后100条购买时间取值之和 <span class="how-cal">如何计算？</span></p>
      </div>
    </div>
    <div class="detail-box">
      <div class="detail-top">
        <span class="buy-time">云购时间</span>
        <span class="cal-data">转换数据</span>
        <span class="member">会员</span>
      </div>
      <div class="detail-body show">
        <ul>
          <li class="detail-list">
            <span class="list">1212</span>
            <span class="list">21</span>
            <span class="list list-data">152116924</span>
            <span class="list">12</span>
          </li>
        </ul>
      </div>
      <div class="show-more" @click="showMore" v-show="show"><span class="more-text">展开全部100条数据</span><span class="more-btn"></span></div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../common/js/date.js';
  export default {
    data() {
      return {
        good: {},
        show: true
      }
    },
    created() {
      setDocumentTitle('计算结果');
      this.good=JSON.parse(localStorage.getItem("good"));
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      formatHour(time) {
        let date = new Date(time);
        return formatDate(date, 'hh:mm:ss.mesc');
      }
    },
    methods: {

      showMore: function() {
        this.show = false;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cal-detail
    background: #fff
    .cal-way
      width: 100%
      height: 6.9rem
      margin-bottom: 0.4rem
      padding-top: 0.46rem
      background: #fffbdf
      .result
        width: 5.72rem
        height: 1.6rem
        border: 0.06rem solid #fda263
        border-radius: 0.4rem
        margin: 0 auto
        background: #fff
        text-align: center
        .result-num
          margin-top: 0.1rem
          font-size: 0.7rem
          color: #fda263
        .result-text
          margin-top: 0.08rem
          font-size: 0.48rem
          color: #a1a1a1
      .icon-wrapper
        margin-top: 0.34rem
        text-align: center
        font-size: 0
        .icon
          width: 0.06rem
          height: 0.36rem
          margin: 0 0.04rem
          display: inline-block
          background: #fda263
      .compute
        height: 1.4rem
        line-height: 1.4rem
        margin-top: 0.26rem
        text-align: center
        font-size: 0
        .icon
          color: #fda263
          font-size: 0.7rem
          vertical-align: top
        .icon1
          margin-right: 0.26rem
        .icon2
          margin: 0 0.1rem
          font-size: 0.5rem
        .icon3
          margin-left: 0.28rem
        .icon4
          margin: 0 0.26rem 0 0.3rem
        .sum,.need,.result-number
          display: inline-block
          line-height: 1
          vertical-align: top
          background: #fff
          .num
            margin-top: 0.22rem
            font-size: 0.4rem
            color: #fda263
          .text
            margin-top: 0.18rem
            font-size: 0.36rem
            color: #a1a1a1
        .sum
          width: 3.6rem
          height: 1.4rem
          border: 0.06rem solid #fda263
          border-radius: 0.4rem
        .need
          width: 2.72rem
          height: 1.4rem
          border: 0.06rem solid #fda263
          border-radius: 0.4rem
        .result-number
          width: 2.92rem
          height: 1.4rem
          border: 0.06rem solid #fda263
          border-radius: 0.4rem
      .info
        margin-top: 0.72rem
        padding: 0 0.4rem
        font-size: 0.44rem
        color: #6a6a6a
        .info-text
          line-height: 0.68rem
          .how-cal
            text-decoration: underline
    .detail-box
      .detail-top
        width: 100%
        height: 1.2rem
        line-height: 1.2rem
        background: #f7f7f7
        font-size: 0
        color: #6a6a6a
        .buy-time
          display: inline-block
          width: 6.4rem
          text-indent: 0.56rem
          font-size: 0.44rem
        .cal-data,.member
          width: 3.2rem
          display: inline-block
          text-align: center
          font-size: 0.44rem
      .detail-body
        position: absolute
        width: 100%
        max-width: 640px
        top: 8.5rem
        bottom: 1.84rem
        overflow: hidden
        background: #fff
        .detail-list
          width: 100%
          height: 1.4rem
          line-height: 1.4rem
          border-bottom: 1px solid #acacac
          font-size: 0
          .list
            width: 25%
            height: 100%
            display: inline-block
            border-right: 1px solid #acacac
            font-size: 0.44rem
            color: #252525
            text-align: center
            &:last-child
              border-right: none
          .list-data
            color: #fda263
      .show
        position: static
      .show-more
        width: 100%
        max-width: 640px
        height: 1.84rem
        line-height: 1.84rem
        bottom: 0
        position: absolute
        background: #fffbdf
        font-size: 0.44rem
        color: #252525
        text-align: center
        .more-text
          margin-right: 0.28rem
        .more-btn
          width: 0.3rem
          height: 0.2rem
          margin-top: 0.84rem
          display: inline-block
          background: url("../../assets/more_btn.png") no-repeat
          background-size: cover
          vertical-align: top
</style>
