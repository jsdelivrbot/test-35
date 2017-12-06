<template>
  <div v-show="showNext">
    <transition name="fold">
      <div class="next" v-show="showNum">
        <div class="next-container">
          <div class="next-content border-bottom-1px">
            <div class="top">
              <div class="pic-wrapper">
                <img :src="good.minPic" alt="" class="min-pic"/>
              </div>
              <div class="content-wrapper">
                <h2 class="title">(第{{good.issueNo}}期){{good.activityResp.activityName}}</h2>
                <span class="price-wrapper">￥<span class="price">{{good.activityResp.price*value}}.00</span></span>
              </div>
              <span class="close" @click.stop="hideNext">X</span>
            </div>
            <div class="shop-num">
              <span class="tip">购买数量 {{value}}</span>
              <div class="num-widget"><span class="decrease" @click="decrease">-</span><input type="number"
                                                                                              :value="value"
                                                                                              @input="value = $event.target.value"
                                                                                              class="num-input" id="num"
                                                                                              readonly/><span
                class="add" @click="addNum">+</span></div>
              <span class="residue">剩余：{{good.activityResp.surplus}}</span>
            </div>
          </div>
          <div class="pay">
            <a href="javascript:;" class="pay-btn" @click="pay(good.activityResp.activityId, good.issueNo, value)">购买(￥{{good.activityResp.price*value}})</a>
            <!-- <a href="javascript:;" class="pay-btn" @click.stop="showAddress">下一步</a> -->
          </div>
        </div>
      </div>
    </transition>
    <transition name="opacity">
      <div class="address-wrapper" v-show="addressShow">
        <div class="address">
          <span class="close" @click.stop="closeAddress"></span>
          <h2 class="title border-bottom-1px">选择收货地址</h2>
          <div class="list-wrapper" ref="addressList">
            <ul class="address-list">
              <li class="address-item border-bottom-1px" v-for="(item,index) in address">
                <span class="no-check" :class="{'checked': item.defaultPartyContactMechPurpose}"
                      @click.stop="checkAddress($event,index)"></span>
                <div class="item-content">
                  <p class="name-phone"><span class="name">{{item.contactName}}</span>，<span class="phone">{{item.mobile}}</span>
                  </p>
                  <p class="item-address">{{item.address}}</p>
                  <div class="postalCode" v-show="hidden">{{item.postalCode}}</div>
                  <div class="provinceGeoName" v-show="hidden">{{item.provinceGeoName}}</div>
                  <div class="cityGeoName" v-show="hidden">{{item.cityGeoName}}</div>
                  <div class="countyGeoName" v-show="hidden">{{item.countyGeoName}}</div>
                </div>
                <span class="editor" @click.stop.prevent="editor($event,index)">编辑</span>
              </li>
            </ul>
          </div>
          <div class="add-address border-bottom-1px border-top-1px" @click.stop="addAddress">
            <span class="add-icon"></span>
            <span class="add-tip">新增地址</span>
            <span class="next-btn"></span>
          </div>
          <div class="confirm">
            <div class="confirm-text" @click.stop="shopping">微信支付(￥{{totalPrices}})</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="opacity1">
      <div class="add-address-wrapper" v-show="addAddressShow">
        <div class="address">
          <span class="close" @click.stop="closeAddAddress"></span>
          <h2 class="title border-bottom-1px">新增收货地址</h2>
          <div class="list-wrapper">
            <ul class="editor-list">
              <li class="list-item border-bottom-1px">
                <span class="item-tip">收件人：</span>
                <input type="text" placeholder="姓名" class="item-input"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">联系电话：</span>
                <input type="text" placeholder="手机或者固话" class="item-input"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">选择地区：</span>
                <input id="addr1" type="text" readonly class="item-input" name="input_area" placeholder="城市选择"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">详细地址：</span>
                <input type="text" placeholder="街道门牌信息" class="item-input"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">邮政编码：</span>
                <input type="text" placeholder="请输入邮政编码" class="item-input"/>
              </li>
            </ul>
          </div>
          <div class="confirm">
            <div class="confirm-text" @click.stop="confirmAdd">保存</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="opacity2">
      <div class="add-address-wrapper" v-show="editorAddressShow">
        <div class="address">
          <span class="close" @click.stop="closeEditorAddress"></span>
          <h2 class="title border-bottom-1px">修改收货地址</h2>
          <div class="list-wrapper">
            <ul class="editor-list">
              <li class="list-item border-bottom-1px">
                <span class="item-tip">收件人：</span>
                <input type="text" :value="name" class="item-input"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">联系电话：</span>
                <input type="text" class="item-input" v-model="phone"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">选择地区：</span>
                <input type="text" readonly class="item-input addr2" name="input_area"
                       :value="provinceGeoName +' '+ cityGeoName + ' ' + countyGeoName"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">详细地址：</span>
                <input type="text" :value="address" class="item-input"/>
              </li>
              <li class="list-item border-bottom-1px">
                <span class="item-tip">邮政编码：</span>
                <input type="text" :value="postalCode" class="item-input"/>
              </li>
            </ul>
          </div>
          <div class="confirm">
            <div class="confirm-text" @click.stop="confirmEditor">保存修改</div>
          </div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  const RESULT = 'success';
  export default {
    props: {
      good: {
        type: Object
      },
      showNext: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        value: 1,
        address: [],
        addressShow: false,
        addAddressShow: false,
        showNum: true,
        editorAddressShow: false,
        name: '',
        phone: -1,
        address: '',
        postalCode: '',
        provinceGeoName: '',
        cityGeoName: '',
        countyGeoName: '',
        hidden: false
      }
    },
    created(){
      this._getData();
      // this.$nextTick(() => {
      //   var area = new lArea();
      //   area.init({
      //     'trigger': '.addr2',//控件ID
      //     'data': lAreaData//数组格式数据源，可扩展为自定义数据源
      //   });

      //   var area = new lArea();
      //   area.init({
      //     'trigger': '#addr1',//控件ID
      //     'data': lAreaData//数组格式数据源，可扩展为自定义数据源
      //   });
      // })
    },
    methods: {
      pay: function(activityId, issueNo, amount){
        alert(activityId +"--"+ issueNo +"--"+ amount);
        this.$http.get('/yyg/buyLuckNumber',{params:{activityId: activityId, issueNo: issueNo, partyId: 1, amount: amount}}).then((response) => {
            response = response.body;
            this.$emit('hideNext');
            this.$emit('hideLayer');
            if (response.status == 10000) {
              alert("支付成功");
            }
        });
      },
      shopping: function () {
        alert('开始调接口支付');
        this.$emit('hideNext');
        this.$emit('hideLayer');
      },
      confirmEditor: function () {
        this._getData();
        this.editorAddressShow = false;
        this.addressShow = true;
      },
      closeEditorAddress: function () {
        this._getData();
        this.editorAddressShow = false;
        this.addressShow = true;
      },
      editor: function (event, index) {
        if (!event._constructed) {
          return;
        }
        this.addressShow = false;
        this.editorAddressShow = true;

        let editor = event.currentTarget;
        let curEditor = editor.parentNode;
        this.name = $('.name').eq(index).html();
        this.phone = $('.phone').eq(index).html();
        this.address = $('.item-address').eq(index).html();
        this.postalCode = $('.postalCode').eq(index).html();
        this.provinceGeoName = $('.provinceGeoName').eq(index).html();
        this.cityGeoName = $('.cityGeoName').eq(index).html();
        this.countyGeoName = $('.countyGeoName').eq(index).html();
      },
      confirmAdd: function () {
        this.addAddressShow = false;
        this.addressShow = true;
        this.$nextTick(() => {
          this._initScroll();
        });
      },
      closeAddAddress: function () {
        this.addAddressShow = false;
        this.addressShow = true;
        this.$nextTick(() => {
          this._initScroll();
        });
      },
      addAddress: function () {
        this.addAddressShow = true;
        this.addressShow = false;

      },
      checkAddress: function (event, index) {
        let check = event.currentTarget;
        let curaddList = check.parentNode;
        let addUl = curaddList.parentNode;
        for (let i = 0; i < addUl.childNodes.length; i++) {
          addUl.childNodes[i].firstChild.className = 'no-check';
        }
        check.className += ' checked';
      },
      closeAddress: function () {
        this.addressShow = false;
        this.showNum = true;
//        this.$emit('showNextBoxs');
      },
      _initScroll: function () {
        if (!this.addressList) {
          this.addressList = new BScroll(this.$refs.addressList, {
            click: true,
            probeType: 3
          })
        } else {
          this.addressList.refresh();
        }
      },
      showAddress: function () {
        this.showNum = false;
        this.addressShow = true;
        this.$nextTick(() => {
          this._initScroll();
        });
      },
      addNum: function () {

        if (this.value < this.good.activityResp.surplus) {
          this.value++;
        }
        return this.value;
        
      },
      decrease: function () {
        if (this.value > 1) {
          this.value--;
        }
        return this.value;
      },
      hideNext: function () {
        this.value = 1;
        this.$emit('hideNext');
        this.$emit('hideLayer');
      },
      _getData: function () {
        this.$http.get('/api/yun.json').then((response) => {
          response = response.body;
//          if (response.result === RESULT) {
          this.address = response.lists;
//          }
        })
      }
    },
    computed: {
      residue: function () {
        let residue = 0;
        residue = this.good.totalPeople - this.good.joinPeople;
        return residue;
      },
      totalPrices: function () {
        let total = 0;
        total = this.good.price * this.value;
        return total;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .address-wrapper
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    max-width: 640px
    height: 12.4rem
    background: #fff
    z-index: 70
    transition: all 0.5s
    opacity: 1
    &.opacity-enter, &.opacity-leave-active
      opacity: 0
    .address
      position: relative
      .close
        position: absolute
        right: 0.44rem
        top: 0.78rem
        width: 0.66rem
        height: 0.66rem
        background: url('../../assets/close.png')
        background-repeat: no-repeat
        background-size: cover
        z-index: 2
      .title
        width: 100%
        height: 2.1rem
        line-height: 2.1rem
        font-size: 0.6rem
        color: #323232
        text-align: center
        border-bottom-1px(#d6d6d6)
      .list-wrapper
        width: 100%
        height: 5.7rem
        overflow: hidden
        .address-list
          .address-item
            width: 100%
            padding: 0.7rem 0.44rem 0.6rem 0.34rem
            border-bottom-1px(#d6d6d6)
            font-size: 0
            .no-check
              width: 0.76rem
              height: 0.76rem
              display: inline-block
              border: 1px solid #a4a4a4
              border-radius: 50%
              margin-right: 0.56rem
              vertical-align: top
            .checked
              border: none
              background: url('../../assets/checked.png')
              background-repeat: no-repeat
              background-size: cover
            .item-content
              margin-top: -0.22rem
              display: inline-block
              font-size: 0.52rem
              .item-address
                margin-top: 0.28rem
                font-size: 0.48rem
                color: #b1b1b1
            .editor
              float: right
              margin-top: 0.14rem
              font-size: 0.52rem
              color: #fda263
      .add-address
        width: 100%
        height: 2.02rem
        line-height: 2.02rem
        padding: 0 0.44rem 0 0.34rem
        font-size: 0
        border-bottom-1px(#d6d6d6)
        border-top-1px(#d6d6d6)
        .add-icon
          width: 0.72rem
          height: 0.72rem
          display: inline-block
          background: url('../../assets/add_bg.png')
          background-repeat: no-repeat
          background-size: cover
          vertical-align: top
          margin-top: 0.65rem
          margin-right: 0.56rem
        .add-tip
          font-size: 0.52rem
          color: #323232
          vertiacl-align: top
        .next-btn
          width: 0.18rem
          height: 0.34rem
          display: block
          position: absolute
          right: 0.44rem
          top: 50%
          margin-top: -0.17rem
          background: url("../../assets/next_bg.png") no-repeat
          background-size: cover
      .confirm
        width: 100%
        padding: 0 0.44rem 0 0.34rem
        .confirm-text
          width: 100%
          height: 1.56rem
          line-height: 1.56rem
          border-radius: 0.12rem
          margin-top: 0.56rem
          background: #fda263
          font-size: 0.64rem
          color: #fff
          text-align: center

  .add-address-wrapper
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    max-width: 640px
    height: 13.5rem
    background: #fff
    z-index: 60
    transition: all 0.5s
    opacity: 1
    &.opacity1-enter, &.opacity1-leave-active
      opacity: 0
    &.opacity2-enter, &.opacity2-leave-active
      opacity: 0
    .address
      position: relative
    .close
      position: absolute
      right: 0.44rem
      top: 0.78rem
      width: 0.66rem
      height: 0.66rem
      background: url('../../assets/close.png')
      background-repeat: no-repeat
      background-size: cover
      z-index: 2
    .title
      width: 100%
      height: 2.1rem
      line-height: 2.1rem
      font-size: 0.6rem
      color: #323232
      text-align: center
      border-bottom-1px(#d6d6d6)
    .list-wrapper
      width: 100%
      .editor-list
        .list-item
          width: 100%
          height: 1.74rem
          line-height: 1.74rem
          padding: 0 0.44rem 0 0.34rem
          display: flex
          font-size: 0.52rem
          color: #333
          border-bottom-1px(#d6d6d6)
          .item-tip
            flex: 0 0 3.5rem
            width: 3.5rem
          .item-input
            flex: 1
            outline: none
    .confirm
      width: 100%
      padding: 0 0.44rem 0 0.34rem
      .confirm-text
        width: 100%
        height: 1.56rem
        line-height: 1.56rem
        border-radius: 0.12rem
        margin-top: 0.56rem
        background: #fda263
        font-size: 0.64rem
        color: #fff
        text-align: center

  .next
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    max-width: 640px
    height: 100%
    z-index: 60
    transition: all 0.5s
    &.fold-enter-active, &.fold-leave
      opacity: 1
    &.fold-enter, &.fold-leave-active
      opacity: 0
    .next-container
      width: 100%
      height: 6.12rem
      position: absolute
      bottom: 0
      background: #fff
      .next-content
        width: 100%
        padding: 0.56rem 0.4rem 0
        border-bottom-1px(#d6d6d6)
        .top
          margin-bottom: 0.28rem
          font-size: 0
          .pic-wrapper
            width: 1.8rem
            height: 1.72rem
            display: inline-block
            vertical-align: top
            .min-pic
              width: 100%
              height: 100%
          .content-wrapper
            display: inline-block
            margin: 0.1rem 0 0 0.5rem
            vertical-align: top
            .title
              margin-bottom: 0.3rem
              font-size: 0.52rem
              color: #5f5f5f
            .price-wrapper
              font-size: 0.6rem
              color: #fda263
              .price
                font-size: 0.8rem
          .close
            position: absolute
            right: 0.56rem
            top: 0.76rem
            font-size: 0.52rem
            color: #5f5f5f
        .shop-num
          width: 100%
          height: 1.6rem
          line-height: 1.2rem
          padding-bottom: 0.4rem
          font-size: 0
          color: #333
          .tip, .residue
            font-size: 0.52rem
          .residue
            float: right
            margin-right: 0.4rem
          .num-widget
            display: inline-block
            width: 4.4rem
            height: 1.2rem
            border: 0.04rem solid #999
            border-radius: 0.06rem
            float: right
            font-size: 0.52rem
            .decrease
              width: 1.42rem
              height: 100%
              line-height: 1.12rem
              display: inline-block
              text-align: center
              vertical-align: top
              font-weight: 700
            .num-input
              width: 1.48rem
              line-height: 1.12rem
              border-left: 0.04rem solid #999
              border-right: 0.04rem solid #999
              text-align: center
              vertical-align: top
            .add
              width: 1.42rem
              height: 100%
              line-height: 1.12rem
              display: inline-block
              text-align: center
              vertical-align: top
              font-weight: 700
      .pay
        padding: 0.24rem 0.4rem
        .pay-btn
          width: 100%
          height: 1.4rem
          line-height: 1.4rem
          display: block
          border-radius: 0.12rem
          background: #fda263
          font-size: 0.64rem
          color #fff
          text-align: center
</style>
