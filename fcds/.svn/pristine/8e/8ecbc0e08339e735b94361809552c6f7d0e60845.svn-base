<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block" @click="select(-1)" :class="{'active': selectType === -1}">全部</span>
      <span class="block" @click="select(0)" :class="{'active': selectType === 0}">好评<span
        class="count">({{positive.length}})</span></span>
      <span class="block" @click="select(1)" :class="{'active': selectType === 1}">中评<span
        class="count">({{medium.length}})</span></span>
      <span class="block" @click="select(2)" :class="{'active': selectType === 2}">差评<span
        class="count">({{negative.length}})</span></span>
    </div>
  </div>
</template>

<script>
  const ALL = -1;
  const POSITIVE = 0;
  const MEDIUM = 1;
  const NEGATIVE = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default: function () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      medium() {
        return this.ratings.filter((rating) => {
          return rating.rateType === MEDIUM;
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType == NEGATIVE;
        })
      }
    },
    methods: {
      select: function (type) {
        this.$emit('select', type);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratingselect
    .rating-type
      padding: 0.42rem
      display: flex
      background: #fff
      .block
        flex: 1
        padding: 0.12rem 0 0.14rem 0
        font-size: 0.52rem
        color: #333
        text-align: center
      .active
        border-radius: 0.02rem
        background: #d7bb6f
        color: #fff
</style>
