<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">我的成就</block>
	</cu-custom>
	</view>
	<uni-list-item title="昵称" :show-badge="true" :badge-text="username"></uni-list-item>
	<uni-list-item title="我的目标"></uni-list-item>
	<uni-list-item title="我的签名"></uni-list-item>
	<uni-list-item title="每日提醒" :show-badge="true" :badge-text="clock_time"></uni-list-item>
	<uni-list-item title="其他设置"></uni-list-item>
	<view class="margin-top">
		<uni-list-item title="意见反馈 "></uni-list-item>
	</view>
	
	
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		 components: {uniList,uniListItem},
		data() {
			return {
				username:'旺仔',
				clock_time:'7:00',
				
			}
		},
	   
	}
</script>

<style>
</style>
