<template>
  <div v-title="'修改密码'">
    <v-back v-show="backSta">
      <div slot="title" class="Vtitle">修改密码</div>
    </v-back>
    <div class="backD" v-bind:class="{'class-b': isB}"></div>
    <div class="modifyPassword">
      <ul>
        <li><span>旧密码：</span><input type="password" placeholder="请输入旧密码" v-model="loginPasswordOld"></li>
        <li><span>新密码：</span><input type="password" placeholder="请输入新密码" v-model="loginPassword"></li>
        <li><span>确认密码：</span><input type="password" placeholder="请再次输入新密码" v-model="checkLoginPassword"></li>
      </ul>
      <div class="determine-box">
        <div class="determine" @click="determineModifyPassword">确 认</div>
      </div>
    </div>

    <p class="tips" v-show="create"><span>{{tipText}}</span></p>
  </div>
</template>

<script>
const ERR_OK = 'success';
import back from 'components/back/back';

  export default{
    components:{
      'v-back': back
    },
    data() {
	     return{
        loginPasswordOld: null,
        loginPassword: null,
        checkLoginPassword: null,
        sessionToken: localStorage.getItem("sessionToken"),
        tipText: null,
        create: false,
        backSta: false,
        isB: false
       }
    },
    methods:{
      determineModifyPassword: function(){
        this.updateLoginPassword(this.loginPasswordOld, this.loginPassword, this.checkLoginPassword);
      },
      updateLoginPassword: function(loginPasswordOld, loginPassword, checkLoginPassword){
        this.$http.get('/api/updateLoginPassword',{params:{ sessionToken: this.sessionToken, loginPasswordOld: loginPasswordOld, loginPassword: loginPassword, checkLoginPassword: checkLoginPassword}}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            this.tipText = '密码修改成功！';
            this.tip();
            this.logout();
          }else{
            this.tipText = response.body.message;
            this.tip();
          }
          
        }).then((error)=> this.error = error)
      },
      logout: function(){
        this.$http.get('/api/exitLogin?',{params:{ sessionToken: this.sessionToken }}).then((response) => { 
          if(response.body.result == ERR_OK){ 
            localStorage.clear();
            this.$router.push({ path: '/login' });
          }else{
            this.tipText = response.body.message;
            this.tip();
          }
          
        }).then((error)=> this.error = error)
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
    mounted(){
      this.isB = this.toolHelper.isWeiXin();
      this.backSta = this.toolHelper.isWeiXin();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .modifyPassword
    background-color: #FFF
    width: 100%
    padding: 0.3rem
    li
      position: relative
      width: 100%
      height: 0.3rem
      margin-top: 0.2rem
      line-height: 0.3rem
      padding: 0 0 0 0.85rem
      font-size: 0.15rem
      input[type='password']
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
