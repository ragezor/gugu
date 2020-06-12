<template>
	<view class=" content bg-gray">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">意见与反馈</block>
	</cu-custom>
	</view>
	
	<view class="flex justify-between margin-top">
		<view class="text-black text-sm">对不咕单有什么意见？</view>
	
	</view>
	<view class="text-black text-sm margin-top">写给我们吧</view>
	<view class="margin-top">
	        <input name="test" style="border: solid 1px #999999;height: 150px;" type="text" @input="onInput" :value="value" />  
	    </view>
		<view class="margin-top flex justify-center">
			<button class="cu-btn light bg-pink">提交</button>
		</view>
	
	</view>
	  
</template>

<script>
	export default {  
	        name: 'compInput',  
	        behaviors: ['uni://form-field'],
	        methods: {  
	            onInput(e) {  
	                this.$emit('input', e.detail.value)  
	            }  
	        }  
	    }  
</script>

<style>
</style>
