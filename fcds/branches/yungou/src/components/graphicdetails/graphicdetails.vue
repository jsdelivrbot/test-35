<template>
  <div class="graphic-details">
    <div class="pic-wrapper">
      <img src="http://bonn.qiniudn.com/images/Company/20170620/20170620092344461.jpg" alt="" class="pic">
      <img src="http://bonn.qiniudn.com/images/Company/20170620/20170620092344836.jpg" alt="" class="pic">
      <img src="http://bonn.qiniudn.com/images/Company/20170620/20170620092345290.jpg" alt="" class="pic">
      <img src="http://bonn.qiniudn.com/images/Company/20170620/20170620092346666.jpg" alt="" class="pic">
      <img src="http://bonn.qiniudn.com/images/Company/20170620/20170620092348636.jpg" alt="" class="pic">
      <img src="http://bonn.qiniudn.com/images/Company/20170620/20170620092349154.jpg" alt="" class="pic">
    </div>
  </div>
</template>

<script>
  export default{
    created () {
      setDocumentTitle('图文详情')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pic-wrapper
    width: 100%
    .pic
      width: 100%
      float: left
</style>
