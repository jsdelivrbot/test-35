<template>
  <div id="franchiseDetails" v-title="'手续费明细'">
      <v-back v-show="backSta">
        <div slot="title" class="Vtitle">手续费明细</div>
      </v-back>
      <div class="backD" v-bind:class="{'class-b': isB}"></div>
      <div class="section">
          <div class="hd">
            <div class="hd-inner">
                <span class="hd-title">手续费{{date}}</span>
            </div>
          </div>
          <div class="content">
            <div class="details-list">
              <ul>
                <li v-for="item in feDetailsData">
                  <span>
                    <i>{{item.week}}</i>
                    <i>{{item.date}}</i>
                  </span>
                  <span>&nbsp;{{item.name}}&nbsp;</span>
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
        rebateTypeId: 'POUNDAGE_REBATE',
        feDetailsData: [],
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
      feDetails: function(pageIndex){
        this.$http.get('/api/findSecondLevelRebateDetail',{params:{ sessionToken: this.sessionToken, rebateTypeId: this.rebateTypeId, month: this.date, pageIndex: pageIndex}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.totalPage = response.body.data.paging.totalPage;
            this.pageIndex = response.body.data.paging.pageIndex;
            for (var i = 0; i < response.body.data.rebateList.length; i++) {
              this.feDetailsData.push(response.body.data.rebateList[i])
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
      //       this.feDetails(this.pageIndex);
      //     }
      //   }
      // }
    },
    mounted(){
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();
      this.feDetails(0);
      // window.addEventListener('scroll', this.menu);
      let sw = true;
      let _this = this;
      let g_pageIndex;
      window.addEventListener('scroll',function(){  
          // 判断是否滚动到底部  
          if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
              // 如果开关打开则加载数据 
              _this.pageIndex++;
              if(sw==true){  
                  // 将开关关闭  
                  sw = false;
                  let asda = _this.pageIndex;
                  if(_this.totalPage > _this.pageIndex){
                    _this.down = true;
                    _this.$http.get('/api/findSecondLevelRebateDetail',{params:{ sessionToken: _this.sessionToken, rebateTypeId: _this.rebateTypeId, month: _this.date, pageIndex: _this.pageIndex}}).then((response) => { 
                      if(response.body.result == ERR_OK){ 
                        for (var i = 0; i < response.body.data.rebateList.length; i++) {
                          _this.feDetailsData.push(response.body.data.rebateList[i])
                        }
                        _this.pageIndex = asda;
                        _this.down = false;
                        sw = true;
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
 
</style>
