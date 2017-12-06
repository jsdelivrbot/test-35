<template>
    <div v-title="'一级考核排名'">
        <v-back v-show="backSta">
          <div slot="title" class="Vtitle">一级考核排名</div>
        </v-back>
        <!-- 商品选择 -->
        <div class="layer border_1px" v-bind:class="{'class-b': isB}">
          <div class="search-left">
            <div class="search" v-bind:class="{ animation: animationState}">
              <input type="text" placeholder="请输入经纪商账号或姓名" v-model="accountNo" @keyup="change">
              <i @click="animation"><img src="../../../assets/search.png" alt=""></i>
            </div>
          </div>
          <span class="left" id='defaultProductId' style="font-weight:500" @click="layerControl"><!-- <i>{{curProductNo}}</i>  --><i v-show="textState">{{curProductName}}</i></span>
          <span class="right" @click="layerControl">选择商品 ></span>
        </div>

        <div class="heig" v-bind:class="{'class-b': isB}"></div>

        <div class="rinkinglist">
          <ul>
            <li>
              <span>一级经纪商</span>
              <span>排名</span>
              <span>已申请</span>
              <span>建议配额</span>
            </li>
            <li v-for="item in findFirstBrokerRankingData">
              <span><i>{{item.name}}</i><i>（{{item.firstBrokerUserNo}}）</i></span>
              <span>{{item.rankingNo}}</span>
              <span>{{item.submitQuantity}}</span>
              <span>{{item.adviceQuantity}}</span>
            </li>
          </ul>
          <v-empty v-show="emptySta"></v-empty>
        </div>

        <div class="stage-cover" v-show="coverShow" @click="coverEvent"></div>

        <div class="layerlist" v-show="layerlist">
          <div class="list_box">
            <div class="list_item">
              <ul class="list_ul">
                <li class="border-bottom-1px" v-for="item in findProductListData" @click="changeProduct(item.productId,item.productNo,item.productName)">
                  <a href="javascript:;">
                    <!-- <span class="list_id">{{item.productNo}}</span>  --><span class="list_name">{{item.productName}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="control" @click="layerControlClose">
              <a href="javascript:;">取消</a>
            </div>
          </div>
        </div>
        
    </div>
</template>

<script>
import echarts from 'common/js/echarts.min.js';
import 'common/js/jquery-1.8.3.min.js';
import 'common/js/laydate.dev.js';
import empty from 'components/empty/empty';
import back from 'components/back/back';

const ERR_OK = 'success';

 export default{
    components:{
      'v-empty': empty,
      'v-back': back
    },
    data() {
        return {
            coverShow: false,
            layerlist: false,
            animationState: false,
            accountNo: null,
            textState: true,
            findProductListData: {},
            sessionToken: localStorage.getItem("sessionToken"),
            curProductNo: null,
            curProductName: null,
            curProductId: null,
            findFirstBrokerRankingData: {},
            emptySta: false,
            backSta: false,
            isB: false
        };
    },
    created() {
      
    },
    methods: {
        coverEvent: function() {
          this.coverShow = false;
          this.layerlist = false;
        },
        changeProduct: function(productId,productNo,productName) {
          this.layerlist = false;
          this.coverShow = false;
          this.curProductId = productId;
          this.curProductNo = productNo;
          this.curProductName = productName;
          this.findFirstBrokerRanking('')
        },
        layerControl: function() {
          this.coverShow = true;
          this.layerlist = true;
        },
        layerControlClose: function(){
          this.coverShow = false;
          this.layerlist = false;
        },
        animation: function(){
          
          if(this.accountNo == null || this.accountNo == ''){
            if(this.animationState){
              this.animationState = false
              this.textState = true
            }else{
              this.animationState = true
              this.textState = false
            }
          }else{
            // alert(this.accountNo)
            this.findFirstBrokerRanking(this.accountNo);
          }
        },
        findProductList: function(){
          this.$http.get('/api/findProductList',{params:{ sessionToken: this.sessionToken}}).then((response) => { 
            if(response.body.result == ERR_OK){ 
              this.findProductListData = response.body.data.productList;
              for(var i =0; i < this.findProductListData.length; i++){
                if(this.findProductListData[i].isCurrent == 'Y'){
                    this.curProductNo = this.findProductListData[i].productNo
                    this.curProductName = this.findProductListData[i].productName
                }
              }
            }else{
              
            }   
          }).then((error)=> this.error = error)
        },
        findFirstBrokerRanking: function(brokerUser){
          this.$http.get('/api/findFirstBrokerRanking',{params:{ sessionToken: this.sessionToken, productId: this.curProductId,brokerUser: brokerUser}}).then((response) => { 
            if(response.body.result == ERR_OK){ 
              this.findFirstBrokerRankingData = response.body.data.rankingDetailList;   
              if(this.findFirstBrokerRankingData == ''){
                this.emptySta = true;
              }else{
                this.emptySta = false;
              }
            }else{
              
            }   
          }).then((error)=> this.error = error)
        },
        change: function(){ 
          if(this.accountNo == ''){
            this.findFirstBrokerRanking('')
          }
        }
    },
    mounted(){

      this.backSta = this.toolHelper.isWeiXin();

      this.isB = this.toolHelper.isWeiXin();

      this.findProductList()

      this.findFirstBrokerRanking('')
    }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rinkinglist
    overflow: hidden
    background-color: #FFF
    li
      position: relative
      overflow: hidden
      width: 100%
      height: 0.65rem
      line-height: 0.65rem
      &::after
        position: absolute
        bottom: 0
        left: 0
        display: block
        content: ''
        width: 100%
        border-bottom: 1px solid #ccc
        transform: scaleY(0.5)
      span
        float: left
        width: 25%
        text-align: center
        color: #ff6000
        &:nth-child(1)
          color: #999
          line-height: 0.18rem
          padding-top: 0.14rem
          i
            font-style: normal
            display: block
      &:nth-child(1)
        height: 0.45rem
        line-height: 0.45rem
        span
          color: #999
          &:nth-child(1)
            line-height: 0.45rem
            padding-top: 0
  .layer
    height: 0.5rem
    background-color: #fff
    font-size: 0.15rem
    padding: 0 0.12rem
    position: fixed
    overflow: hidden
    top: 0
    width: 100%
    max-width: 640px
    border-bottom: 1px solid #e8e8e8
    z-index: 1
    .search-left
      float: left
      .search
        position: relative
        height: 0.35rem
        width: 0.3rem
        border-radius: 0.2rem
        border: 1px solid #ff6000
        margin-top: 0.06rem
        background-color: #f3f3f3
        overflow: hidden
        padding: 0 0.36rem 0 0.04rem
        transition: all 1s ease 0s
        &.animation
          width: 1.75rem
          transition: all 1s ease 0s
        input
          width: 100%
          height: 100%
          background-color: transparent
          border: none
          outline: none
          text-align: center
          font-size: 0.12rem
        i
          position: absolute
          top: 0.015rem
          right: 0.02rem
          width: 0.3rem
          height: 0.3rem
          img
            width: 100%
            height: 100%
    .right
      position: absolute
      top: 0
      right: 0.12rem
      height: 0.5rem
      line-height: 0.5rem
      font-size: 0.13rem
      color: #54b9ff
      background-color: #FFF
    .left
      float: left
      height: 0.5rem
      line-height: 0.5rem
      margin-left: 0.2rem
      i
        font-style: normal
  .layerlist
    position: fixed
    bottom: 0
    left: 50%
    font-size: 0.15rem
    width: 100%
    max-width: 640px
    transform: translateX(-50%)
    -webkit-transform: translateX(-50%)
    z-index: 1000000000
    .control
      width: 94%
      height: 0.48rem
      margin: 0.1rem 3%
      border-radius: 0.05rem
      text-align: center
      line-height: 0.48rem
      background-color: #fff
      a
        color: #666666
    .list_item
      width: 94%
      margin: 0.1rem 3%
      border-radius: 0.05rem
      background-color: #fff
      padding: 0 0.2rem
      li
        position: relative
        width: 100%
        height: 0.5rem
        text-align: center
        line-height: 0.5rem
        &::after
          position: absolute
          bottom: 0
          left: 0
          display: block
          content: ''
          width: 100%
          height: 1px
          background-color: #ccc
          transform: scaleY(0.5)
          -webkit-transform: scaleY(0.5)
        &:nth-last-child(1)::after
          display: none
  .hd-analysis
    float: right
    i
      font-style: normal
      font-size: 0.12rem
      color: #54b9ff
  .pacjage-statistics
    overflow: hidden
    .statistics-hd
      overflow: hidden
      height: 0.54rem
      padding: 0 0.12rem
      &.width25
        margin-top: 0.17rem
        span
          width: 25%
          b
            display: block
            line-height: 0.2rem
          i
            display: block
            line-height: 0.2rem
            font-style: normal
            font-size: 0.12rem
      .statistics-hd-inner
        position: relative
        width: 100%
        height: 100%
        &::after
          position: absolute
          bottom: 0
          left: 0
          display: block
          content: ''
          width: 100%
          height: 1px
          background-color: #ccc
          transform: scaleY(0.5)
          -webkit-transform: scaleY(0.5)
      span
        float: left
        width: 50%
        height: 100%
        text-align: center
        line-height: 0.54rem
        b
          color: #ff6000
          font-size: 0.18rem
  .sell-info
    padding: 0.15rem 0.4rem
    li
      position: relative
      height: 0.4rem
      line-height: 0.4rem
      margin-top: 0.15rem
      padding-left: 1rem
      text-align: center
      input
        width: 100%
        outline: none
      span
        position: absolute
        top: 0
        left: 0
        font-size: 0.14rem
        color: #333
      &::after
        position: absolute
        bottom: 0
        left: 0
        display: block
        content: ''
        width: 100%
        height: 1px
        background-color: #ff6000
        transform: scaleY(0.5)
        -webkit-transform: scaleY(0.5)
    .submit
      width: 100%
      height: 0.42rem
      margin: 0.3rem auto
      background-color: #ff6000
      border-radius: 0.3rem
      text-align: center
      color: #fff
      line-height: 0.42rem
      font-size: 0.15rem      
</style>