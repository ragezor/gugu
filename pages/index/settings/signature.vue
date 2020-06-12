<template>
	<view class=" content bg-gray">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">我的签名</block>
	</cu-custom>
	</view>
	<view class="margin-top bg-white">  
	        <input name="test" style="border: solid 1px #999999;height: 80px;" type="text" @input="onInput" :value="value" placeholder="少年写一个签名吧"/>  
	    </view> 
	<!-- 	小程序的submit和其他不一样，参考一下https://uniapp.dcloud.io/component/form -->
		 <form @submit="onSubmit">  
		             <comp-input name="test" v-model="testValue"></comp-input>  
		             <button  class="light bg-pink"form-type="submit">确认更改</button>  
		         </form> 
	</view>
</template>

<script>
	export default {  
		data() {  
		            return {  
		                testValue: 'Hello'  
		            }  
		        },  
	        name: 'compInput',  
	        behaviors: ['uni://form-field'],
	        methods: {  
	            onInput(e) {  
	                this.$emit('input', e.detail.value)  
	            }  ,
				 onSubmit(e) {  
				                console.log(e)  
				            }  
	        }  
	    }  
</script>

<style>
</style>
