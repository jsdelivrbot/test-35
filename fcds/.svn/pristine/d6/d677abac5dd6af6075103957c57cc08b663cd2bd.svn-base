<template>
  <div v-title="'提货明细'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">提货明细</div>
    </v-back>
    <div class="vipsearch">
      <div class="rolelistTap" v-bind:class="{'class-b': isB}">
        <span class="vipsearch-title">{{curdate}}</span>
        <span class="dete-control" style="display:none"></span>
        <span id="demo1" class="curdates" style="display:none">{{curdate}}</span>
      </div>
    </div>

    <div class="searchBackD" v-bind:class="{'class-b': isB}"></div>

    <div class="vipBox">
      <div class="tradingList">
        <div class="tradingHead">  
          <div class="inner">
            <span>交易商</span>
            <span>商品</span>
            <span>数量</span>
            <span>收盘市值</span>
          </div>
        </div>
        <ul>
          <li v-for="item in showPickupDetailDate">
            <span>
              <b>{{item.name}}</b>
              <i>({{item.tradeUserNo}})</i>
            </span>
            <span>{{item.productNo}}</span>
            <span>{{item.pickupNum}}块</span>
            <span>{{item.closeTotalPrice}}</span>
          </li>
        </ul>
      </div>
      <v-empty v-show="emptySta"></v-empty>
    </div>
    <v-load v-show="loadSta"></v-load>
  </div>
</template>

<script>
import empty from 'components/empty/empty';
const ERR_OK = 'success';
import 'common/js/datePicker.js';
import load from 'components/load/load';
import search from 'components/search/search';
import back from 'components/back/back';

  export default{
    components:{
      'v-empty': empty,
      'v-load': load,
      'search': search,
      'v-back': back
    },
    data() {
     return{
        sessionToken: localStorage.getItem("sessionToken"),
        emptySta: true,
        curdate: this.$route.query.date,
        showPickupDetailDate: {},
        loadSta: false,
        backSta: false,
        isB: false,
        totalPage: null,
        pageIndex: null
      }
    },
    methods: {
      search: function (val) {
        this.userParam = val;
        this.bigInMoney();
      },
      changesKey: function(accountNo){
        this.userParam = null;
        this.bigInMoney();
      },
      showPickupDetail: function(){
        this.loadSta = true;
        this.$http.get('/api/showPickupDetail?',{params:{ sessionToken: this.sessionToken, fdate: this.curdate }}).then((response) => { 
          if(response.body.result == ERR_OK){
            this.loadSta = false
            this.totalPage = response.body.data.paging.totalPage;
            this.pageIndex = response.body.data.paging.pageIndex;
            this.showPickupDetailDate = response.body.data.pickupDetailList;

            if(this.curdate == null || this.curdate == '' ){
              this.curdate = response.body.data.showDate;
            }

            if(this.showPickupDetailDate == ''){
              this.emptySta = true;
            }else{
              this.emptySta = false;
            }

            this.nextshowPickupDetail();

          }else{
            this.tipText = '数据获取失败，请稍后再试！';
            this.tip();
            this.loadSta = false;
          }
        }).then((error)=> this.error = error)
      },
      nextshowPickupDetail: function(){
        var _this = this;
        this.$nextTick(() => {
          let sw = true;
          let g_pageIndex;
          window.addEventListener('scroll',function(){  
              // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
              // console.log(document.body.scrollTop); // 滚动高度  
              // console.log(document.body.offsetHeight); // 文档高度  
              // 判断是否滚动到底部 
              if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
                  
                  // 如果开关打开则加载数据 
                  _this.pageIndex++;
                  if(sw==true){  
                      // 将开关关闭  
                      // alert(1)
                      sw = false;
                      let asda = _this.pageIndex;
                      if(_this.totalPage > _this.pageIndex){
                        _this.down = true;
                        _this.$http.get('/api/showPickupDetail',{params:{ sessionToken: _this.sessionToken, fdate: _this.curdate,
                        pageIndex: _this.pageIndex }}).then((response) => { 
                          if(response.body.result == ERR_OK){ 
                            for (var i = 0; i < response.body.data.pickupDetailList.length; i++) {
                              _this.showPickupDetailDate.push(response.body.data.pickupDetailList[i])
                            }
                            _this.pageIndex = asda;
                            _this.down = false;
                            sw = true ;
                          }else{}   
                        }).then((error)=> _this.error = error)
                      } 
                  }  
              }
          })
        })
      },
      allshowPickup: function(){
        this.curdate = null;
        this.showPickup();
      },
      tip: function(){
        this.create = true;
        var this_ = this;
        clearTimeout(t)
        var t = setTimeout(function (){
            this_.create = false;
        }, 3000);
      }
    },
    created(){
      this.showPickupDetail();
    },
    mounted(){
      var nowdate = this.toolHelper.getNowFormatDate();
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin(); 

      var _this = this;
      $("body").addClass('dash');
        var calendar = new datePicker();
      calendar.init({
        'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'2016-10-1',/*最小日期*/
        'maxDate':nowdate,/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
          var theSelectData=calendar.value;
          _this.curdate = calendar.value;
          _this.showPickupDetail();
        },
        'onClose':function(){/*取消时触发事件*/
        }
      });    

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">  
  .vipsearch-title
    line-height: 0.48rem
    font-size: 0.15rem
    font-weight: bold
  .tradingList
    position: relative
    background-color: #FFF
    margin-top: 0.1rem
    ul
      padding: 0 0.12rem
      li
        position: relative
        display: flex
        height: 0.65rem
        &::after
          content: ''
          display: block
          width: 100%
          position: absolute
          height: 1px
          background-color: #ccc
          bottom: 0
          left: 0
          transform: scaleY(0.5)
        span
          flex: 1
          line-height: 0.65rem
          text-align: center
          font-size: 0.13rem
          color: #999
          i
            font-style: normal
            display: block
          b
            display: block
          &.nameOrNum
            line-height: 0.2rem
            margin-top: 0.12rem
    &::after
      content: ''
      display: block
      width: 100%
      position: absolute
      height: 1px
      background-color: #ccc
      bottom: 0
      left: 0
      transform: scaleY(0.5)
    &::before
      content: ''
      display: block
      width: 100%
      position: absolute
      height: 1px
      background-color: #ccc
      top: 0
      left: 0
      transform: scaleY(0.5)
    .tradingHead
      height: 0.5rem
      line-height: 0.5rem
      padding: 0 0.12rem
      .inner
        position: relative
        display: flex
        span
          flex: 1
          text-align: center
          font-size: 0.14rem
          color: #999
        &::after
          content: ''
          display: block
          width: 100%
          position: absolute
          height: 1px
          background-color: #ccc
          bottom: 0
          left: 0
          transform: scaleY(0.5)
  .viplist
    overflow: hidden
    padding: 0.2rem 0
    li
      width: 50%
      float: left
      text-align: center
      font-size: 0.13rem
      line-height: 0.18rem
      margin: 0.06rem 0
      color: #999999
      p
        b
          color: #ff6000
      p:nth-child(2)
        font-size: 0.14rem
  .viptime
    // min-height: 1.88rem!important
    height: auto!important
  #demo1
    position: absolute
    right: 0
    padding-right: 0.44rem
  .vipBox
    .vipItem
      margin-top: 0.1rem
      background-color: #FFF
      .hd
        width: 100%
        height: 0.5rem
        height: 0.5rem
        padding: 0 0.12rem
        .hd-inner
          position: relative
          width: 100%
          height: 0.5rem
          overflow: hidden
          .r
            float: right
            font-size: 0.13rem
            line-height: 0.5rem
            color: #54b9ff
          .l
            float: left
            margin-top: 0.11rem
            .name
              font-size: 0.15rem
              i
                font-style: normal
                color: #ff6600
                font-size: 0.13rem
                margin-left: 0.05rem
            .no
              font-size: 0.13rem
              color: #999999
              margin-top: 0.03rem
      .bd
        position: relative
        overflow: hidden
        width: 100%
        padding: 0.12rem
        &::after
          position: absolute
          left: 0
          top: 0
          content: ''
          width: 100%
          border-bottom: 1px solid #ccc
          transform: scaleY(0.5) scaleX(0.94)
        span
          float: left
          width: 50%
          font-size: 0.13rem
          color: #999999
          line-height: 0.3rem
      .md
        padding: 0.12rem
        position: relative
        &::after
          position: absolute
          left: 0
          top: 0
          content: ''
          width: 100%
          border-bottom: 1px dashed #ccc
          transform: scaleY(0.5) scaleX(0.94)
        span
          float: left
          width: 50%
          font-size: 0.13rem
          color: #999999
          line-height: 0.3rem
</style>
