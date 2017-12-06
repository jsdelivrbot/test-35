<template>
  <div class="new-publish">
    <div class="new-publish-wrapper">
      <ul class="new-publish-ul">
        <li class="new-publish-list border-bottom-1px">
          <div class="pic-wrapper">
            <img src="../../assets/pic3.jpg" class="pic" alt="">
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第24期）凡萨帝原汁机/机械凡萨帝原汁机/机械...</h2>
            <p class="price-box">
              价值：
              <span class="price">￥6088.00</span>
            </p>
            <p class="publish-text">揭晓倒计时：</p>
            <div class="publish-time">
              <div class="time-box down-time" data-time="2017/7/21 11:27:00">
                <span class="time down-mini"></span>
                <span class="icon">：</span>
                <span class="time down-sec"></span>
                <span class="icon">：</span>
                <span class="time down-ms"></span>
              </div>
            </div>
          </div>
        </li>
        <li class="new-publish-list border-bottom-1px">
          <div class="pic-wrapper">
            <img src="../../assets/pic3.jpg" class="pic" alt="">
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第24期）凡萨帝原汁机/机械凡萨帝原汁机/机械...</h2>
            <p class="price-box">
              价值：
              <span class="price">￥6088.00</span>
            </p>
            <p class="publish-text">揭晓倒计时：</p>
            <div class="publish-time">
              <div class="time-box down-time" data-time="2017/7/22 11:27:00">
                <span class="time down-mini"></span>
                <span class="icon">：</span>
                <span class="time down-sec"></span>
                <span class="icon">：</span>
                <span class="time down-ms"></span>
              </div>
            </div>
          </div>
        </li>
        <li class="new-publish-list border-bottom-1px">
          <div class="pic-wrapper">
            <img src="../../assets/pic3.jpg" class="pic" alt="">
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第24期）凡萨帝原汁机/机械凡萨帝原汁机/机械...</h2>
            <p class="price-box">
              价值：
              <span class="price">￥6088.00</span>
            </p>
            <p class="publish-text">揭晓倒计时：</p>
            <div class="publish-time">
              <div class="time-box down-time" data-time="2017/7/6 13:27:00">
                <span class="time down-mini"></span>
                <span class="icon">：</span>
                <span class="time down-sec"></span>
                <span class="icon">：</span>
                <span class="time down-ms"></span>
              </div>
            </div>
          </div>
        </li>
        <li class="new-publish-list border-bottom-1px">
          <div class="pic-wrapper">
            <img src="../../assets/pic3.jpg" class="pic" alt="">
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第24期）凡萨帝原汁机/机械凡萨帝原汁机/机械...</h2>
            <p class="price-box">
              价值：
              <span class="price">￥6088.00</span>
            </p>
            <p class="publish-text">揭晓倒计时：</p>
            <div class="publish-time">
              <div class="time-box down-time" data-time="2017/7/5 15:20:00">
                <span class="time down-mini"></span>
                <span class="icon">：</span>
                <span class="time down-sec"></span>
                <span class="icon">：</span>
                <span class="time down-ms"></span>
              </div>
            </div>
          </div>
        </li>
        <li class="new-publish-list border-bottom-1px">
          <div class="pic-wrapper">
            <img src="../../assets/pic3.jpg" class="pic" alt="">
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第24期）凡萨帝原汁机/机械凡萨帝原汁机/机械...</h2>
            <p class="price-box">
              价值：
              <span class="price">￥6088.00</span>
            </p>
            <p class="publish-text">揭晓倒计时：</p>
            <div class="publish-time">
              <div class="time-box down-time" data-time="2017/7/5 12:37:00">
                <span class="time down-mini"></span>
                <span class="icon">：</span>
                <span class="time down-sec"></span>
                <span class="icon">：</span>
                <span class="time down-ms"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    created() {
      setDocumentTitle('最新揭晓');
      this.$nextTick(() => {
        this.getTime();
      })
    },
    methods: {
      getTime: function () {
        var _this = this;
        $('.down-time').each(function () {
          var time = $(this).attr('data-time');
          var EndTime = new Date(time);
          var NowTime = new Date();
          var t = EndTime.getTime() - NowTime.getTime();
          var d = 0, h = 0, m = 0, s = 0, ms = 0;
          if (t >= 0) {
            d = Math.floor(t / 1000 / 60 / 60 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
            ms = Math.floor((t/(1000/60))%60);
            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            ms = ms < 10 ? '0' + ms : ms;
            $(this).find('.down-mini').html(m)
            $(this).find('.down-sec').html(s)
            $(this).find('.down-ms').html(ms)
          } else {
            $(this).find('.down-mini').html('00')
            $(this).find('.down-sec').html('00')
            $(this).find('.down-ms').html('00')
          }
        });
        setTimeout(function () {
          _this.getTime();
        }, 1000/60)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .new-publish-wrapper
    width: 100%
    .new-publish-ul
      font-size: 0
      .new-publish-list
        width: 50%
        height: 7.56rem
        display: inline-block
        border-bottom-1px(#dedede)
        background: #fff
        &:nth-child(2n+1)
          border-right: 1px solid #dedede
        .pic-wrapper
          width: 100%
          height: 4.3rem
          .pic
            width: 100%
            height: 100%
        .content-wrapper
          width: 100%
          padding: 0 0.26rem
          .title
            width: 100%
            padding-top 0.06rem
            margin: 0 0 0.26rem
            font-size: 0.44rem
            font-weight: normal
            color: #666
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .price-box
            margin: 0 0 0.16rem 0
            font-size: 0.44rem
            color: #999
            .price
              font-family: Arial
          .publish-text
            margin: 0 0 0.24rem 0
            font-size: 0.44rem
            color: #999
          .publish-time
            width: 100%
            margin: 0 auto
            font-size: 0
            .time-box
              line-height: 0.86rem
              text-align: center
              .icon
                displaly: inline-block
                font-size: 0.6rem
                color: #fda263
                vertical-align: top
              .time
                width: 0.86rem
                height: 0.86rem
                line-height: 0.86rem
                display: inline-block
                border-radius: 0.12rem
                font-size: 0.49rem
                border: 0.04rem solid #fda263
                color: #fda263
                text-align: center
                vertical-align: top
</style>
