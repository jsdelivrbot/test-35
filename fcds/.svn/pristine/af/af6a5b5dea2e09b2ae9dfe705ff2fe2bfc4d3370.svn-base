<template>
  <div>
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">首次登陆</div>
    </v-back>
    <div class="backD" v-bind:class="{'class-b': isB}"></div>
    <div class="firstLogin">
      <ul>
        <li><span>经纪商账号：</span><input type="tel" placeholder="请输入账号" v-model="brokerUserNo"></li>
        <li><span>结算账号：</span><input type="tel" placeholder="请输入结算账号" v-model="tradeUserNo" @keyup='accountNoChange'></li>
        <li><span>手机号码：</span>{{phone}}</li>
        <li><span>验证码：</span><input type="tel" placeholder="请输验证码" v-model="identifyCode"><timer-btn ref="timerbtn" class="btn btn-default" v-on:run="sendCode" v-show="verification"></timer-btn></li>
      </ul>
      <div class="determine-box">
        <div class="determine" @click="determine">确 认</div>
      </div>
    </div>
    <p class="tips" v-show="create"><span>{{tipText}}</span></p>
  </div>
</template>

<script>
import 'common/js/jquery-1.8.3.min.js';
import timerBtn from 'components/login/timerBtn/timerBtn';
import back from 'components/back/back';

const ERR_OK = 'success';

  export default{
    data() {
	     return{
        brokerUserNo: null,
        identifyCode: null,
        phone: null,
        verification: false,
        tradeUserNo: null,
        tipText: null,
        create: false,
        backSta: false,
        isB: false
       }
    },
    components: {
       'timer-btn': timerBtn,
       'v-back': back
     },
    methods:{
      tip: function(){
        this.create = true;
        var this_ = this;
        clearTimeout(t)
        var t = setTimeout(function (){
            this_.create = false;
        }, 3000);
      },
      determine: function(){
        if(this.brokerUserNo != '' && this.tradeUserNo != '' && this.identifyCode != '' && this.brokerUserNo != null && this.tradeUserNo != null && this.identifyCode != null){
          this.$http.get('/api/firstLand?',{params:{ phone: this.phone, brokerUserNo: this.brokerUserNo, identifyCode: this.identifyCode, tradeUserNo: this.tradeUserNo }}).then((response) => { 
            if(response.body.result == ERR_OK){ 
              this.$router.push({ path: '/setPassword',query: { brokerUserNo: this.brokerUserNo, tempToken: response.body.data.tempToken } });
              this.tipText = '成功!'
              this.tip();
            }else{
              this.tipText = response.body.message;
              this.tip();
            }  
          }).then((error)=> this.error = error)
        }else{
          this.tipText = '请输入完整的信息！';
          this.tip();
        }
        
      },
      accountNoChange: function(){

        var length = this.tradeUserNo.length;
        if (length > 10) {
            this.tradeUserNo = this.tradeUserNo.substring(0, 10);
        }
        if (length == 10) {
            this.$http.get('/api/getPhoneNum?',{params:{ brokerUserNo: this.brokerUserNo, tradeUserNo: this.tradeUserNo }}).then((response) => { 
              if(response.body.result == ERR_OK){ 
                this.tipText = '获取手机号码成功！'
                this.tip();
                this.phone = response.body.data.phone;
                this.verification = true;
              }else{
                // this.$refs.timerbtn.stop();
                this.verification = false;
                this.tipText = response.body.message;
                this.tip();
              }
              
            }).then((error)=> this.error = error)
        }

      },
      sendCode:function(){
        this.$refs.timerbtn.start()
        // this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
        this.$http.get('/api/getIdentifyCode?',{params:{ phone: this.phone,brokerUserNo: this.brokerUserNo, tradeUserNo: this.tradeUserNo }}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.tipText = '获取验证码成功！';
            this.tip();
          }else{
            this.tipText = response.body.message;
            this.tip();
          }
          
        }).then((error)=> this.error = error)
      }
    },
    mounted(){
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .firstLogin
    background-color: #FFF
    width: 100%
    padding: 0.3rem
    li
      position: relative
      width: 100%
      height: 0.3rem
      margin-top: 0.2rem
      line-height: 0.3rem
      padding: 0 0 0 0.95rem
      font-size: 0.15rem
      input[type='tel']
        width: 100%
        outline: none
      &::after
        position: absolute
        bottom: 0
        left: 0
        display: block
        content: ''
        width: 100%
        border-bottom: 1px solid #ff6000
        transform: scaleY(0.5)
      &:nth-child(3)::after
        display: none
      &:nth-child(4)
        padding: 0 0 0 0.65rem
        input[type='tel']
          width: 50%
        .btn
          float: right
      span
        position: absolute
        top: 0
        left: 0
        line-height: 0.3rem
        font-size: 0.15rem
    .determine
      height: 0.42rem
      width: 2.26rem
      background-color: #ff6000
      margin: 0.3rem auto 0 auto
      border-radius: 0.3rem
      text-align: center
      color: #fff
      font-size: 0.15rem
      line-height: 0.42rem
</style>
