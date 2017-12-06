<template>
  <div id="franchiseDetails" v-title="'加盟费明细'">
      <v-back v-show="backSta">
        <div slot="title" class="Vtitle">加盟费明细</div>
      </v-back>
      <div class="backD" v-bind:class="{'class-b': isB}"></div>
      <div class="section">
          <div class="hd">
            <div class="hd-inner">
                <span class="hd-title">加盟费{{date}}</span>
            </div>
          </div>
          <div class="content">
            <div class="details-list">
              <ul>
                <li v-for="item in franchiseDetailsData">
                  <span>
                    <i>{{item.week}}</i>
                    <i>{{item.date}}</i>
                  </span>
                  <span>&nbsp;{{item.tradeUserName}}&nbsp;</span>
                  <span>&nbsp;{{item.rebateAmount}}&nbsp;</span>
                </li>
              </ul>
              <div class="dropload-down" v-show="down"><div class="dropload-load"><span class="loading"></span>加载中...</div></div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
const ERR_OK = 'success';
import back from 'components/back/back';

  export default{
    components:{
      'v-back': back
    },
    data(){
      return{
        sessionToken: localStorage.getItem("sessionToken"),
        date: this.$route.query.date,
        rebateTypeId: 'FRANCHISE_REBATE',
        franchiseDetailsData: [],
        scroll: '',
        totalPage: null,
        pageIndex: null,
        down: false,
        backSta: false,
        isB: false
      }
    },
    created() {

    },
    methods: {
      franchiseDetails: function(pageIndex){
        this.$http.get('/api/findSecondLevelRebateDetail',{params:{ sessionToken: this.sessionToken, rebateTypeId: this.rebateTypeId, month: this.date, pageIndex: pageIndex}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.totalPage = response.body.data.paging.totalPage;
            this.pageIndex = response.body.data.paging.pageIndex;
            for (var i = 0; i < response.body.data.rebateList.length; i++) {
              this.franchiseDetailsData.push(response.body.data.rebateList[i])
            }
          }else{
            
          }   
        }).then((error)=> this.error = error)
      },
      // menu: function() {
      //   this.scroll = document.body.scrollTop;
      //   if(window.screen.height + this.scroll > document.body.offsetHeight){
      //     this.pageIndex++
      //     if(this.totalPage > this.pageIndex){
      //       this.franchiseDetails(this.pageIndex);
      //     }
      //   }
      // }
    },
    mounted(){
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();
      this.franchiseDetails(0);
      // window.addEventListener('scroll', this.menu);
      let sw = true;
      let _this = this;
      let g_pageIndex;
      window.addEventListener('scroll',function(){  
          // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
          // console.log(document.body.scrollTop); // 滚动高度  
          // console.log(document.body.offsetHeight); // 文档高度  
          // 判断是否滚动到底部  
          if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
              // console.log(sw);  
              // 如果开关打开则加载数据 
              _this.pageIndex++;
              if(sw==true){  
                  // 将开关关闭  
                  sw = false;
                  let asda = _this.pageIndex;
                  console.log(_this.pageIndex)
                  if(_this.totalPage > _this.pageIndex){
                    _this.down = true;
                    _this.$http.get('/api/findSecondLevelRebateDetail',{params:{ sessionToken: _this.sessionToken, rebateTypeId: _this.rebateTypeId, month: _this.date, pageIndex: _this.pageIndex}}).then((response) => { 
                      if(response.body.result == ERR_OK){ 
                        for (var i = 0; i < response.body.data.rebateList.length; i++) {
                          _this.franchiseDetailsData.push(response.body.data.rebateList[i])
                        }
                        _this.pageIndex = asda;
                        _this.down = false;
                        sw = true ;
                      }else{
                        
                      }   
                    }).then((error)=> _this.error = error)
                  } 
              }  
          }
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #franchiseDetails
    .details-list
      padding: 0 0.12rem
      li
        position: relative
        width: 100%
        height: 0.65rem
        overflow: hidden
        &::after
         display: block
         position: absolute
         bottom: 0
         left: 0
         content: ''
         width: 100%
         border-bottom: 1px solid #ccc
         transform: scaleY(0.5) 
        span
          float: left
          width: 33.33%
          line-height: 0.65rem
          text-align: center
          font-size: 0.14rem
          color: #333333
          &:nth-child(3)
            color: #ff6000
            font-family: "黑体"!important
          &:nth-child(1)
            padding-top: 0.125rem
            i
              display: block
              font-style: normal
              line-height: 0.2rem
              color: #999999
              &:nth-child(2)
                font-size: 0.12rem
</style>
