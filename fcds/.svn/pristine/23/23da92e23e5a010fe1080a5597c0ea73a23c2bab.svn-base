
 <template>
   <div id="center">
     <div class="center" :style="{backgroundImage: 'url(' + img + ')'}">
       <div class="center-text-wrapper"></div>

       <div class="center-menu-wrapper">
         <div class="menu" @click="introduce">
           <span class="icon icon1"></span>
           <p class="text">活动介绍</p>
         </div>
         <div class="menu" @click="announced">
           <span class="icon icon2"></span>
           <p class="text">最新揭晓</p>
         </div>
         <div class="menu" @click="mine">
           <span class="icon icon3"></span>
           <p class="text">我的云购</p>
         </div>
       </div>

       <div class="type-wrapper">
         <div class="type-left">
           <span class="type-item type-item1" v-bind:class="{active: soon}" @click="selectItem1">即将揭晓</span>
           <span class="type-item type-item3" v-bind:class="{active: newest}" @click="selectItem2">最新</span>
           <span class="type-item type-item4" v-bind:class="{active: value}" @click="selectItem3">价值</span>
         </div>
         <div class="type-right" @click="classification">
           {{classificationText}}
           <div class="classify-wrapper" v-show="classification_active">
             <ul>
               <li class="classify-list border-bottom-1px" @click="change(item.activityTypeId, item.activityTypeName)" v-for="item in getActivityTypeData">{{item.activityTypeName}}</li>
             </ul>
           </div>
         </div>
       </div>
       <div class="goods-wrapper">
         <ul class="goods-ul">

           <li class="good-list border-bottom-1px" v-for="item in getActivityData" v-show="item.activityId">
             <div class="pic-wrapper" @click="details(item.activityId, item.perIssueId)">
               <img src="../../assets/timg.jpeg" alt="" class="min-pic"/>
             </div>
             <div class="content-wrapper">
               <h2 class="title" @click="details(item.activityId, item.perIssueId)">（第{{item.issueNo}}期）{{item.activityName}}</h2>
               <span class="price">价值：￥{{item.perIssuePrice}}</span>
               <div class="progress-wrapper">
                   <div class="bar"><span class="bar-inner" v-bind:style="{ width: item.prop }"></span></div>
                   <ul class="progress_info" @click="details(item.activityId, item.perIssueId)">
                     <li>
                       <p>{{item.havaPartCount}}</p>
                       <p>已参与</p>
                     </li>
                     <li>
                       <p>{{item.amount}}</p>
                       <p>总需人次</p>
                     </li>
                     <li>
                       <p>{{item.surplus}}</p>
                       <p>剩余</p>
                     </li>
                   </ul>
               </div>
               <div class="shop-cart" @click="pay(item.issueNo, item.activityName, item.surplus, item.activityId, item.price)" v-show=" item.status == payStatus">{{item.status}}</div>
             </div>
           </li>

         </ul>
       </div>
     </div>

     <div class="pay" v-show="hide">
       <div class="hd">
         <div class="left"><img src="../../assets/timg.jpeg" alt=""></div>
         <div class="right">
           <p>(第{{issueNo}}期) {{activityName}}</p>
           <p>￥{{price*amount}}</p>
         </div>
       </div>
       <div class="shop-num">
         <span class="tip">购买数量 {{amount}}</span> 
         <div class="num-widget">
           <span class="decrease" @click="decrease">-</span>
           <input type="number" v-model="amount" class="num-input">
           <span class="add" @click="add">+</span>
         </div> 
         <span class="residue">剩余：{{issueNo}}</span>
       </div>
       <div class="pays"><a href="javascript:;" class="pay-btn" @click="paySubmit">购买</a></div>
       <div class="close" @click="close">X</div>
     </div>
     
     <div class="cover" v-show="hide" @click="close"></div>

   </div>

 </template>

 <script>
 const ERR_OK = 10000;

   export default {
     data(){
       return{
         soon: true,
         newest: false,
         value: false,
         classification_active: false,
         proportion: 0.3,
         amount: 1,
         hide: false,
         classificationText: '全部活动',
         order: null,
         activityTypeId: null,
         payStatus: 'IN_PROGRESS',
         issueNo: null,
         activityName: null,
         price: 0,
         partyId: 1,
         activityId: null,
         surplus: null,
         getActivityData: [],
         getActivityTypeData: [],
         img: require('../../assets/center_bg.jpg')
       }
     },
     created (){
       setDocumentTitle('团购中心');
     },
     mounted(){
        this.getActivity();
        this.getActivityType();
     },
     methods:{
       selectItem1: function(){
         this.soon = true;
         this.newest = false;
         this.value = false;
         this.order = "prepare";
         this.getActivity();
       },
       selectItem2: function(){
         this.soon = false;
         this.newest = true;
         this.value = false;
         this.order = "newest";
         this.getActivity();
       },
       selectItem3: function(){
         this.soon = false;
         this.newest = false;
         this.value = true;
         this.order = "cost";
         this.getActivity();
       },
       classification: function(){
         if(this.classification_active == true){
           this.classification_active = false;
         }else{
           this.classification_active = true;
         }
       },
       change: function(activityTypeId, activityTypeName){
         this.activityTypeId = activityTypeId;
         this.classificationText = activityTypeName;
         this.getActivity();
       },
       bar: function(){
         // let width = this.proportion*100+'%';
         // $(".bar-inner").css("width", width)
       },
       pay: function(issueNo, activityName, surplus, activityId, price){
         this.hide = true;
         this.price = price;
         this.issueNo = issueNo;
         this.activityName = activityName;
         this.surplus = surplus;
         this.activityId = activityId;
         this.amount = 1;
       },
       close: function(){
         this.hide = false;
       },
       decrease: function(){
         if(this.amount > 1){
           this.amount--;
         }else{
           this.amount = 1;
         }
       },
       add: function(){    
         if(this.surplus > this.amount){
           this.amount++
         }else{
           this.amount = 100;
         }
       },
       paySubmit: function(){
          this.buyLuckNumber();
       },
       details: function(activityId, perIssueId){
         this.$router.push({ path: '/details',query:{activityId: activityId, perIssueId: perIssueId}})
       },
       introduce: function(){
          this.$router.push({ path: '/activeintro'})
       },
       announced: function(){
          this.$router.push({ path: '/newpublish'})
       },
       mine: function(){
          this.$router.push({ path: '/mybuy'})
       },
       getActivity: function(){
          this.$http.get('/yyg/getActivity',{params:{ order: this.order, activityTypeId: this.activityTypeId }}).then((response) => { 
              response = response.body
              if(response.status == ERR_OK){ 
                this.getActivityData = response.result;
              }else{
                  alert('加载数据失败！');
              }
              
          }).then((error)=> this.error = error)
       },
       getActivityType: function(){
          this.$http.get('/yyg/getActivityType').then((response) => { 
              response = response.body
              if(response.status == ERR_OK){ 
                this.getActivityTypeData = response.result;
              }else{
                  alert('加载数据失败！');
              }
              
          }).then((error)=> this.error = error)
       },
       buyLuckNumber: function(){
          this.$http.get('/yyg/buyLuckNumber', {params:{ activityId: this.activityId, issueNo: this.issueNo, partyId: this.partyId, amount: this.amount }}).then((response) => { 
              this.load1 = false;
              response = response.body
              if(response.status == ERR_OK){ 
                // this.getActivityTypeData = response.result;
                alert("支付成功")
              }else{
                  alert('支付失败');
              }
              
          }).then((error)=> this.error = error)
       }
     }
   };
 </script>

 <style lang="stylus" rel="stylesheet/stylus">
   @import "../../common/stylus/mixin.styl";
   .cover
     position: fixed
     top: 0
     left: 0
     width: 100%
     height: 100%
     background-color: rgba(0, 0, 0, 0.3)
     z-index: 999
   .pay
     position: fixed
     bottom: 0
     left: 0
     width: 100%
     height: 6.12rem
     z-index: 9999
     background-color: #FFF
     padding: .56rem .4rem 0
     .close
       position: absolute
       right: .56rem
       top: .76rem
       font-size: .52rem
       color: #5f5f5f
     .pays
       padding: .24rem .4rem
       .pay-btn
         width: 100%
         height: 1.4rem
         line-height: 1.4rem
         display: block
         border-radius: .12rem
         background: #fda263
         font-size: .64rem
         color: #fff
         text-align: center
     .shop-num
       width: 100%
       height: 1.6rem
       line-height: 1.2rem
       padding-bottom: .4rem
       font-size: 0
       color: #333
       .tip
         font-size: .52rem
       .residue
         float: right
         margin-right: 0.4rem
         font-size: .52rem
       .num-widget
         display: inline-block
         width: 4.4rem
         height: 1.2rem
         border: .04rem solid #999
         border-radius: .06rem
         float: right
         font-size: .52rem
         .decrease
           width: 1.20rem
           height: 100%
           line-height: 1.12rem
           display: inline-block
           text-align: center
           vertical-align: top
           font-weight: 700
         .num-input
           width: 1.46rem
           line-height: 1.12rem
           border-left: .04rem solid #999
           border-right: .04rem solid #999
           text-align: center
           vertical-align: top
         .add
           width: 1.20rem
           height: 100%
           line-height: 1.12rem
           display: inline-block
           text-align: center
           vertical-align: top
           font-weight: 700
     .hd
       width: 100%
       height: 1.8rem
       overflow: hidden
       .left
         float: left
         img
           width: 1.8rem
           height: 1.72rem
       .right
         float: left
         margin: .1rem 0 0 .5rem
         p
           &:nth-child(1)
             font-size: 0.52rem
             color: #5f5f5f
             margin-bottom: .3rem
           &:nth-child(2)
             font-size: 0.6rem
             color: #fda263
   .center
     background: no-repeat
     background-size: 100%
     background-color: #fdb06a
     padding: 0 0.4rem
     padding-top: 1.1rem
     .center-text-wrapper
       width: 8.24rem
       height: 1.4rem
       background: url("../../assets/center_text_bg.png") no-repeat
       background-size: 100% 100%
       margin: 0 auto 0.7rem
     .center-menu-wrapper
       width: 100%
       height: 3.14rem
       border-radius: 0.12rem
       margin-bottom: 0.32rem
       display: flex
       background: #fff
       .menu
         flex: 1
         .icon
           display: block
           width: 1.46rem
           height: 1.46rem
           margin: 0.52rem auto 0.32rem
           &.icon1
             background: url("../../assets/menu_icon1.png") no-repeat
             background-size: 100% 100%
           &.icon2
             background: url("../../assets/menu_icon2.png") no-repeat
             background-size: 100% 100%
           &.icon3
             background: url("../../assets/menu_icon3.png") no-repeat
             background-size: 100% 100%
         .text
           font-size: 0.4rem
           color: #353535
           text-align: center
     .type-wrapper
       width: 100%
       max-width: 640px
       height: 1.94rem
       line-height: 1.9rem
       border-top: 0.04rem solid #dedede
       border-bottom: 0.04rem solid #dedede
       border-radius: 0.12rem 0.12rem 0 0
       background: #fff
       font-size: 0
       color: #9b9b9b
       display: flex
       .type-left
         height: 1.8rem
         display: inline-block
         font-size: 0
         flex: 1
         .type-item
           padding-bottom: 0.32rem
           border-bottom: 0.08rem solid transparent
           font-size: 0.56rem
           &.active
             color: #fda263
             border-bottom-color: #fda263
         .type-item1
           margin-left: 0.8rem
         .type-item2
           margin-left: 0.8rem
         .type-item3
           margin-left: 1.36rem
         .type-item4
           margin-left: 1.2rem
       .type-right
         width: 3.06rem
         flex: 0 0 3.06rem
         border-left: 0.04rem solid #dedede
         position: relative
         font-size: 0.56rem
         text-align: center
         .classify-wrapper
           padding: 0 0.38rem
           position: absolute
           z-index: 2
           left: -1rem
           top: 1.72rem
           border-radius: 0.12rem
           background: #343434
           &:before
             content: ''
             width: 0px
             height: 0px
             display: inline-block
             position: absolute
             top: -0.4rem
             right: 0.96rem
             border-width: 0.22rem 0.15rem
             border-style: solid dashed dashed dashed
             border-color: transparent transparent #343434 transparent
           .classify-list
             width: 2.9rem
             height: 1.48rem
             line-height: 1.48rem
             border-bottom-1px(rgba(255, 255, 255, 0.2))
             text-align: center

     .goods-wrapper
       width: 100%
       max-width: 640px
       .goods-ul
         padding: 0 0.3rem 0 0.1rem
         background: #fff
         .good-list
           padding: 0.44rem 0.26rem 0.52rem
           display: flex
           border-bottom-1px(#dedede)
           background: #fff
           font-size: 0
           .pic-wrapper
             flex: 0 0 3.12rem
             width: 3.12rem
             height: 3.06rem
             border-radius: 0.12rem
             border: 2px solid #e5e5e5
             display: inline-block
             .min-pic
               width: 100%
               height: 100%
               border-radius: 0.06rem
           .content-wrapper
             flex: 1
             display: inline-block
             margin-left: 0.4rem
             position: relative
             vertical-align: top
             overflow: hidden
             .title
               width: 100%
               display: block
               margin-bottom: 0.22rem
               padding-top: 0.08rem
               font-size: 0.52rem
               color: #666
               text-overflow: ellipsis
               overflow: hidden
               white-space: nowrap
             .price
               margin-bottom: 0.32rem
               display: block
               font-size: 0.44rem
               color: #999
             .progress-wrapper
               width: 5.9rem
               .progress_info
                 font-size: 0.4rem
                 width: 100%
                 margin-top: 0.32rem
                 overflow: hidden
                 li
                   float: left
                   width: 33.33%
                   text-align: center
                   color: #adadad
                   p
                     line-height: 0.8rem
                     font-size: 0.48rem
                   p:nth-child(1)
                     font-size: 0.56rem
                   &:nth-child(1)
                     p:nth-child(1)
                       color: #fda263
                   &:nth-child(2)
                     p:nth-child(1)
                       color: #b6b6b6
                   &:nth-child(3)
                     p:nth-child(1)
                       color: #34b1ff
               .bar
                 position: relative
                 width: 5.88rem
                 height: 0.22rem
                 background-color: #e7e7e7
                 border-radius: 0.11rem
                 overflow: hidden
                 .bar-inner
                   position: absolute
                   top: 0
                   left: 0
                   height: 100%
                   background-color: #fda263
                   transition: all 1s ease 1s 
             .shop-cart
               width: 1.46rem
               height: 1.46rem
               position: absolute
               right: 0
               bottom: 0
               background: url("../../assets/shop_cart_bg.png") no-repeat
               background-size: cover

     .type-detail
       position: fixed
       top: 1.8rem
       bottom: 0
       width: 100%
       max-width: 640px
       background: rgba(0, 0, 0, 0.4)
       .type-list
         display: flex
         font-size: 0
         background: #fff
         box-shadow: 0 0.35rem 0.7rem rgba(0, 0, 0, 0.3)
         .list-item
           flex: 1
           width: 33.33%
           line-height: 1.8rem
           display: inline-block
           border-bottom: 0.04rem solid #dedede
           border-right: 1px solid #dedede
           font-size: 0.56rem
           color: #666
           text-align: center
           &:nth-child(3n)
             border-right: none
           &.active
             color: #d7bb6f
             font-weight: 500
       .down-up
         width: 0.56rem
         height: 0.38rem
         display: block
         position: absolute
         top: -0.38rem
         right: 1.12rem
         background: url("../../assets/up_bg.png") no-repeat
         background-size: cover

     .layer
       position: fixed
       width: 100%
       max-width: 640px
       height: 100%
       bottom: 0
       left: 0
       z-index: 50
       opacity: 1
       background: rgba(0, 0, 0, 0.5)
       transition: all 0.5s
       &.fade-enter-active, &.fade-leave
         opacity: 1
         background: rgba(0, 0, 0, 0.5)
       &.fade-enter, &.fade-leave-active
         opacity: 0
         background: rgba(0, 0, 0, 0)
 </style>
