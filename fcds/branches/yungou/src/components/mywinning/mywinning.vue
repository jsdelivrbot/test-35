<template>
  <div class="mywinning-wrapper">
    <ul class="my-buy-ul">
      <li class="my-buy-list" v-for="item in getWinningRecordData" @click="intoDetail(item.activityId, item.perIssueId, item.partyId)">
        <div class="wrapper" >
          <div class="avatar-wrapper">
            <img src="../../assets/banner_1.jpg" alt="" class="avatart"/>
            <div class="status">已揭晓</div>
          </div>
          <div class="content-wrapper">
            <h2 class="title">（第{{item.issueNo}}期）{{item.activityName}}</h2>
            <p class="join">您已参与<span class="join-num">{{item.userBuyCount}}</span>次</p>
            <p class="winning"> 获得者：<span class="winner">所有将军全认输了CNN</span></p>
            <p class="time">所揭晓时间：{{item.announceTime}}</p>
          </div>
          <span class="next-icon"></span>
        </div>
        <div class="user_adderss">
          <div class="user_adderss_btn">完善收货地址</div>
        </div>
      </li>
    </ul>

<!--     <div class="cover" v-show="hide" @click="close"></div>

    <div class="address-wrapper" v-show="hide">
      <div class="address">
        <span class="close" @click="close"></span>
        <h2 class="title border-bottom-1px">选择收货地址</h2>
        <div class="list-wrapper">
          <ul class="address-list" style="transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
            <li class="address-item border-bottom-1px" v-for="(item,index) in getAddressListData.obj"><span class="no-check " @click="checked(index)" v-bind:class='{checked:index==qwerqwre}'></span>
              <div class="item-content">
                <p class="name-phone" @click="checked(index)">
                  <span class="name">{{item.contactName}}</span>，<span class="phone">{{item.telephone}}</span>
                </p>
                <p class="item-address">
                  {{item.address}}
                </p>
              </div>
              <span class="editor" @click="editor">编辑</span>
            </li>
          </ul>
        </div>
        <div class="add-address border-bottom-1px border-top-1px" @click="addAdderss">
          <span class="add-icon"></span><span class="add-tip" >新增地址</span><span class="next-btn"></span>
        </div>
        <div class="confirm">
          <div class="confirm-text">
            确定
          </div>
        </div>
      </div>
    </div>

    <div class="add-address-wrapper" v-show="address_details">
      <div class="address">
        <span class="close" @click="closes"></span>
        <h2 class="title border-bottom-1px">修改收货地址</h2>
        <div class="list-wrapper">
          <ul class="editor-list">
            <li class="list-item border-bottom-1px">
              <span class="item-tip">收件人：</span>
              <input type="text" class="item-input"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">联系电话：</span>
              <input type="text" class="item-input" v-model="phone"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">选择地区：</span>
              <input type="text" readonly class="item-input addr2" name="input_area" v-model="address"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">详细地址：</span>
              <input type="text" class="item-input"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">邮政编码：</span>
              <input type="text" class="item-input"/>
            </li>
          </ul>
        </div>
        <div class="confirm">
          <div class="confirm-text" @click="sadadas">保存修改</div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  const ERR_OK = 10000;
  import '../../common/js/geoData.js';

  export default {
    data(){
      return{
        getWinningRecordData: null,
        partyId: '001',
        hide: false,
        qwerqwre: 1,
        getAddressListData: [],
        name: null,
        address: '请选择地址',
        postalCode: null,
        provinceGeoName: null,
        cityGeoName: null,
        countyGeoName: null,
        phone: null,
        address_details: false
      }
    },
    created(){
      // this.$nextTick(() => {
      //   var area = new lArea();
      //   area.init({
      //     'trigger': '.addr2',//控件ID
      //     'data': lAreaData//数组格式数据源，可扩展为自定义数据源
      //   });
      // })
    },
    mounted(){
      this.getWinningRecord();
      // console.log(this.a[0])
      // this.getAddressList();
    },
    methods: {
      intoDetail: function (activityId, perIssueId, partyId) {
        this.$router.push({path: '/mywinningdetail',query:{activityId: activityId, perIssueId: perIssueId, partyId:partyId}})
      },
      getWinningRecord: function(){
        this.$http.get('/yyg/getWinningRecord',{params:{ partyId: this.partyId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getWinningRecordData = response.result;
              // this.getWinningRecordData.announceTime = this.timetrans(this.getWinningRecordData.announceTime);
              
              for(var i=0; i<this.getWinningRecordData.length; i++){
                this.getWinningRecordData[i].announceTime = this.timetrans(this.getWinningRecordData[i].announceTime)
              }
            }else{
                alert('加载数据失败！');
            }
            
        }).then((error)=> this.error = error)
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
      adderss_info_btn: function(){
        this.hide = true;
      },
      close: function(){
        this.hide = false;
      },
      checked: function(index){
        this.qwerqwre = index;
      },
      closes: function(){
        this.address_details = false;
      },
      sadadas: function(){
        alert(localStorage.getItem("menuTitle"))
      },
      addAdderss: function(){
        this.address_details = true;
        this.hide = true;
      },
      editor: function(){
        this.address_details = true;
        this.hide = true;
      },
      getAddressList: function(){
        this.$http.get('/yyg/getAddressList',{params:{ token: '1ib0e5foq6an9',postalAddressContactMechId: ''}}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getAddressListData = response.result;

              for(var i=0; i<this.getAddressListData.obj.length; i++){
                if(this.getAddressListData.obj[i].defaultPartyContactMechPurpose){
                  this.qwerqwre = i;
                }
              }
              
            }else{
                alert('加载数据失败！');
            }
            
        }).then((error)=> this.error = error)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .add-address-wrapper
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    max-width: 640px
    min-height: 13.5rem
    background: #fff
    z-index: 999
    transition: all .5s
    opacity: 1
    .address
      position: relative
    .close
      position: absolute
      right: .44rem
      top: .78rem
      width: .66rem
      height: .66rem
      background: url(../../assets/close.png)
      background-repeat: no-repeat
      background-size: cover
      z-index: 2;
    .title
      width: 100%
      height: 2.1rem
      line-height: 2.1rem
      font-size: .6rem
      color: #323232
      text-align: center
      position: relative
      &::after
        position: absolute
        display: block
        content: ""
        width: 100%
        left: 0
        bottom: 0
        border-bottom: 1px solid #d6d6d6
    .list-wrapper
      width: 100%
      .list-item
        width: 100%
        height: 1.74rem
        line-height: 1.74rem
        padding: 0 .44rem 0 .34rem
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        font-size: .52rem
        color: #333
        position: relative
        .item-tip
          -webkit-box-flex: 0
          -ms-flex: 0 0 3.5rem
          flex: 0 0 3.5rem
          width: 3.5rem
        .item-input
          -webkit-box-flex: 1
          -ms-flex: 1
          flex: 1
          outline: none
        &::after
          position: absolute
          display: block
          content: ""
          width: 100%
          left: 0
          bottom: 0
          border-bottom: 1px solid #d6d6d6
    .confirm
      width: 100%
      padding: 0 .44rem 0 .34rem
      .confirm-text
        width: 100%
        height: 1.56rem
        line-height: 1.56rem
        border-radius: .12rem
        margin: .56rem 0
        background: #fda263
        font-size: .64rem
        color: #fff
        text-align: center
        box-sizing: border-box
        &.delete
          background-color: #d6d6d6
          // border: 1px solid #fda263
          color: #fff
  .address-wrapper
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    max-width: 640px
    height: 12.4rem
    background: #fff
    z-index: 999
    transition: all .5s
    opacity: 1
    .address
      position: relative
      .close
        position: absolute
        right: .44rem
        top: .78rem
        width: .66rem
        height: .66rem
        background: url(../../assets/close.png)
        background-repeat: no-repeat
        background-size: cover
        z-index: 2
      .title
        width: 100%
        height: 2.1rem
        line-height: 2.1rem
        font-size: .6rem
        color: #323232
        text-align: center
        position: relative
        &::after
          position: absolute
          display: block
          content: ""
          width: 100%
          left: 0
          bottom: 0
          border-bottom: 1px solid #d6d6d6
      .list-wrapper
        width: 100%
        height: 5.7rem
        overflow: auto
        .address-item
          width: 100%
          padding: .7rem .44rem .6rem .34rem
          position: relative
          font-size: 0
          .no-check
            width: .76rem
            height: .76rem
            display: inline-block
            border: 1px solid #a4a4a4
            border-radius: 50%
            margin-right: .56rem
            vertical-align: top
          .checked
            border: none
            background: url(../../assets/checked.png)
            background-repeat: no-repeat
            background-size: cover
          .item-content
            margin-top: -.22rem
            display: inline-block
            font-size: .52rem
            .item-address
              margin-top: .28rem
              font-size: .48rem
              color: #b1b1b1
          .editor
            float: right
            margin-top: .14rem
            font-size: .52rem
            color: #fda263
          &::after
            position: absolute
            display: block
            content: ""
            width: 100%
            left: 0
            bottom: 0
            border-bottom: 1px solid #d6d6d6
      .add-address
        width: 100%
        height: 2.02rem
        line-height: 2.02rem
        padding: 0 .44rem 0 .34rem
        font-size: 0
        position: relative
        &::before
          position: absolute
          display: block
          content: ""
          width: 100%
          left: 0
          top: 0
          border-top: 1px solid #d6d6d6
        &::after
          position: absolute
          display: block
          content: ""
          width: 100%
          left: 0
          bottom: 0
          border-bottom: 1px solid #d6d6d6
        .add-icon
          width: .72rem
          height: .72rem
          display: inline-block
          background: url(../../assets/add_bg.png)
          background-repeat: no-repeat
          background-size: cover
          vertical-align: top
          margin-top: .65rem
          margin-right: .56rem
        .add-tip
          font-size: .52rem
          color: #323232
        .next-btn
          width: .18rem
          height: .34rem
          display: block
          position: absolute
          right: .44rem
          top: 50%
          margin-top: -.17rem
          background: url(../../assets/next_bg.png)
          background-size: cover
      .confirm
        width: 100%
        padding: 0 .44rem 0 .34rem
        .confirm-text
          width: 100%
          height: 1.56rem
          line-height: 1.56rem
          border-radius: .12rem
          margin-top: .56rem
          background: #fda263
          font-size: .64rem
          color: #fff
          text-align: center
  .mywinning-wrapper
    position: absolute
    width: 100%
    top: 2.8rem
    bottom: 0
    background: #fff
    .my-buy-ul
      // background: #fff
      .my-buy-list
        margin-top: 0.4rem
        background-color: #FFF
      .user_adderss
        height: 1.4rem
        .user_adderss_btn
          color: #fff
          background-color: #ffa25c
          border-radius: 0.5rem
          height: 1rem
          width: 3.6rem
          font-size: 0.48rem
          line-height: 1rem
          text-align: center
          float: right
          margin-top: 0.2rem
          margin-right: 0.4rem
      .wrapper
        padding: 0.56rem 0.32rem
        padding-left: 3.84rem
        // display: flex
        position: relative
        border-bottom: 0.04rem solid #dedede
        font-size: 0
        .avatar-wrapper
          // flex: 0 0 3.12rem
          position: absolute
          left: 0.32rem
          width: 3.12rem
          height: 3.06rem
          border: 0.04rem solid #e5e5e5
          border-radius: 0.12rem
          margin-right: 0.52rem
          vertical-align: top
          .avatart
            width: 100%
            height: 100%
            border-radius: 0.12rem
          .status
            position: absolute
            left: 0
            bottom: 0
            width: 100%
            height: 0.52rem
            line-height: 0.52rem
            background: #cacaca
            border-radius: 0 0 0.12rem 0.12rem
            font-size: 0.36rem
            text-align: center
            color: #fff
        .content-wrapper
          // flex: 1
          vertical-align: top
          .title
            margin-bottom: 0.34rem
            padding-top: 0.1rem
            font-size: 0.52rem
            color: #666
          .join
            margin-bottom: 0.34rem
            font-size: 0.44rem
            color: #999
            .join-num
              height: auto
              line-height: 1
              border-bottom: 0
              font-weight: 500
              color: #fda263
          .winning
            margin-bottom: 0.34rem
            font-size: 0.44rem
            color: #c5bcbc
            .winner
              font-weight: 500
              color: #fda263
          .time
            font-size: 0.44rem
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
</style>
