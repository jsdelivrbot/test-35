<template>
  <div class="progress">
    <div class="total-progress">
      <progress class="prog" :value="value"></progress>
    </div>
    <div class="people">
      <div class="people-item people-item-left">
        {{good.activityResp.havaPartCount}}
        <p class="text">已参与</p>
      </div>
      <div class="people-item people-item-center">
        {{good.activityResp.amount}}
        <p class="text">总需人次</p>
      </div>
      <div class="people-item people-item-right">
        {{residue}}
        <p class="text">剩余</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      good: {
        type: Object
      }
    },
    data() {
      return {}
    },
    computed: {
      residue: function () {
        let residue = 0;
        // residue = this.good.activityResp.amount - this.good.activityResp.havaPartCount;
        residue = this.good.activityResp.surplus;
        return residue;
      },
      value: function () {
        let value = 0;
        value = this.good.activityResp.havaPartCount / this.good.activityResp.amount;
        return value;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .progress
    width: 100%
    .total-progress
      width: 100%
      height: 0.22rem
      border-radius: 0.12rem
      margin-bottom: 0.22rem
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
      display: flex
      .people-item
        flex: 1
        font-size: 0.48rem
        .text
          margin-top: 0.16rem
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
</style>
