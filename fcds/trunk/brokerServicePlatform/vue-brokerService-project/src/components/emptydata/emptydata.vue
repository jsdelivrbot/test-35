<template>
  <div>

  </div>
</template>

<script>
const ERR_OK = 'success';

 export default{
  data(){
    return {
      sessionToken: localStorage.getItem("sessionToken")
    }
  },
  created(){
    this.getLoginAccountRole();
  },
  methods:{
    getLoginAccountRole: function(sessionToken){
      this.$http.get('/api/getLoginAccountRole',{params:{ sessionToken: this.sessionToken}}).then((response) => { 
        if(response.body.result == ERR_OK){ 
          if(response.body.data.role == 'ROLE_TOP' || response.body.data.role == 'ROLE_FIRST'){
            this.$router.push({ path: '/main/home' });
          }else if(response.body.data.role == 'ROLE_PLACING'){
            this.$router.push({ path: '/packageH' });
          }else{
            this.$router.push({ path: '/recommendBroker' });
          }
        }else{
          // $("#tip").html('<span class="tip_text">'+response.body.message+'</span>')
          localStorage.clear();
          this.$router.push({ path: '/login' });
        }
      }).then((error)=> this.error = error)
    }
  },
  mounted() {

  }
 };

</script>

<style lang="stylus" rel="stylesheet/stylus">
 
</style>