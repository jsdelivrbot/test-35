<template>
	<div>
		<div class="v-search-box">
			<div class="v-search" v-bind:class="{ animation: animationState}">
				<input type="text" :placeholder="placeholder" v-model="val" @keyup="changes"> 
				<i @click="animation"><img src="../../assets/search.png" alt=""></i>
			</div>
		</div>
	</div>
</template>

<script>

 export default{
	data:function () {
		return {
		    val: null,
		    animationState: true
		}
	},
	props:['placeholder'],
	methods: {
		animation: function(){

		  if(this.val == null || this.val == ''){
		    if(this.animationState){
		      this.animationState = false
		    }else{
		      this.animationState = true
		    }
		  }else{
		    this.$emit('search', this.val);
		  }

		},
		changes: function(){
			if(this.val == ''){
			  this.$emit('changes', this.val);
			}
		}
	},
	computed: {
		
	}
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.v-search 
		width: 0.3rem
		position: relative
		height: 0.35rem
		border-radius: 0.2rem
		border: 1px solid #ff6000
		margin-top: 0.06rem
		background-color: #f3f3f3
		overflow: hidden
		padding: 0 0.36rem 0 0.04rem
		transition: all 1s ease 0s
		-webkit-transition: all 1s ease 0s
		&.animation
			width: 1.75rem
			transition: all 1s ease 0s
			-webkit-transition: all 1s ease 0s
		i
			position: absolute
			top: 0.015rem
			right: 0.02rem
			width: 0.3rem
			height: 0.3rem
			img
				width: 100%
				heigth: 100%
		input
			width: 100%
			height: 100%
			background-color: transparent
			border: none
			outline: none
			text-align: center
</style>