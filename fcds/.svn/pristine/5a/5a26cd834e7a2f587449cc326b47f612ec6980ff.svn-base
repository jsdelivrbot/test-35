<template>
  <div class="my-buy-record">
    <div class="tab-wrapper">
      <div class="tab-box clearfloat">
        <div class="tab">
          <div :class="{'active':myBuyBox}" @click="showMyBuy">我的云购记录</div>
        </div>
        <div class="tab">
          <div :class="{'active':myWinningBox}" @click="showMywinning">我的中奖记录</div>
        </div>
      </div>
    </div>
    <div class="my-buy-wrapper" v-show="myBuyBox">
      <mybuy></mybuy>
    </div>
    <div class="my-winning-wrapper" v-show="myWinningBox">
      <mywinning></mywinning>
    </div>
  </div>
</template>

<script>
  import mybuy from '../mybuy/mybuy.vue'
  import mywinning from '../mywinning/mywinning.vue'
  export default {
    data() {
      return {
        myBuyBox: true,
        myWinningBox: false
      }
    },
    created() {
      setDocumentTitle('我的中奖记录');
    },
    methods: {
      showMyBuy: function () {
        this.myWinningBox = false;
        this.myBuyBox = true;
      },
      showMywinning: function () {
        this.myBuyBox = false;
        this.myWinningBox = true;
      }
    },
    components: {
      mybuy,
      mywinning
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .my-buy-record
    width: 100%
    max-width: 640px
    position: absolute
    top: 0
    .tab-wrapper
      width: 100%
      max-width: 640px
      position: fixed
      top: 0
      z-index: 2
      height: 2.54rem
      margin-bottom: 0.26rem
      padding-top: 0.59rem
      background: #fff
      .tab-box
        width: 9.96rem
        height: 1.36rem
        line-height: 1.36rem
        border-radius: 0.1rem
        border: 1px solid #ffa25c
        margin: 0 auto
        font-size: 0.48rem
        color: #2f2f2f
        .tab
          width: 50%
          height: 100%
          float: left
          text-align: center
          a
            display: block
            width: 100%
            height: 100%
            color: #242424
          .active
            width: 100%
            height: 100%
            background: #ffa25c
            color: #fff
    .buy-record
      width: 100%
      background: #fff
      .buy-record-ul
        .buy-record-list
          width: 100%
          height: 2rem
</style>
