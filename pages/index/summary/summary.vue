<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">导航栏</block>
	</cu-custom>
	</view>
<!-- 	图片 -->
	<view class="flex justify-center" id="img1">
		<image src="/static/8dbd55afb727c2c1f54c6885cad2babc%20(1).jpg" mode="aspectFit"></image>	
	</view>
	
	<uni-list>
	    <uni-list-item :title="'hi~'+name" :note="starttime+'-'+endtime" :show-arrow="false"></uni-list-item>
<uni-list-item :title="'共完成了'+achieve_time+'目标'" :note="success_words" :show-arrow="false"></uni-list-item>
<uni-list-item :title="'咕咕咕了'+gu_time+'次'" :note="gu_words" :show-arrow="false"></uni-list-item>
<uni-list-item :title="'和小伙伴一起打卡了'+team_time+'次'" :note="team_words" :show-arrow="false"></uni-list-item>
<uni-list-item :title="'心情指数'+stars_time+'颗心'" :note="mood_words" :show-arrow="false"></uni-list-item>
	</uni-list>
	<button class="cu-btn block light bg-blue margin-tb-sm lg" >分享</button>
	    
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	 
	export default {
		components: {uniList,uniListItem},
		
		
		data() {
			return {
				name:'旺仔旺仔旺仔',
				starttime:'5.25',
				endtime:'5.31',
				achieve_time:20,
				success_words:'真是忙碌又充实的一周',
				gu_time:10,
				gu_words:'新一代鸽王就是我',
				team_time:12,
				team_words:'大家都超棒的',
				stars_time:5,
				mood_words:'我就是旺仔旺仔带旺仔',
				
			}
		},
		}
</script>

<style>
	
</style>
