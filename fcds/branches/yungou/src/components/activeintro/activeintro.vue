<template>
  <div class="activeintro">
    <div class="activeintro-wrapper">
      <div class="content-wrapper">
        <div class="content">
          <p class="text">1.活动结束前实名认证，即可获得当天收入2倍的奖励映票。</p>
          <p class="text"> 2.当天奖励映票=2倍*5月20日全天正常收益映票。</p>
          <p class="text">3.奖励映票与整月翻倍活动互相独立，互不影响。</p>
          <p class="text">例：主播在活动当天获得10000映票，那么在“5.20”活动中，即可获得10000*2=20000奖励映票，在“lanzi送福利”活动中，20000映票照常计算奖励。</p>
        </div>
      </div>
      <div class="intro-text">本活动最终解析权归自然e家所有！</div>
    </div>
  </div>
</template>

<script>
  export default{
    created() {
      setDocumentTitle('活动介绍');
      this.$nextTick(() => {
          $('.activeintro').css({'height':$(window).height()})
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .activeintro
    background: #fcb16a url("../../assets/active_bg.jpg") no-repeat
    background-size: contain
    .activeintro-wrapper
      width: 100%
      height: 100%
      padding: 0.6rem 0 2rem
      .content-wrapper
        width: 100%
        height: 100%
        padding: 0 0.4rem
        .content
          height: 100%
          padding: 0.44rem 0.48rem 0.44rem 0.68rem
          border-radius: 0.12rem
          background: #fff
          .text
            line-height: 1.08rem
            font-size: 0.44rem
            color: #7a7a7a
      .intro-text
        width: 100%
        height: 2rem
        line-height: 2rem
        position: absolute
        bottom: 0
        font-size: 0.48rem
        color: #d36700
        text-align: center
</style>
