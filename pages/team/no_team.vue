<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom >
		
		<block slot="content">我的小组</block>
	</cu-custom>
	</view>
	<view class=" flex justify-center align-end margin-top">
		<view class="cu-avatar radius xl margin-left bg-white" style="background-image:url(../../../static/me_team.png);"></view>
	     <view>
			 <view class="flex justify-center align-start"><text class="light text-pink">{{team_name}}</text></view>
		 <!-- 头像和上标 -->
		 <view class="flex align-end">
		 <view class="cu-avatar radius lg margin-left bg-white  margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"><view class=' bg-green cu-tag badge cuIcon-check'></view></view>
		 <button class="cu-btn  share-btn cuIcon lg light bg-pink margin-left" open-type="share">
		 		<text class="cuIcon-add text-lg"></text>
		 	</button>
			</view>

		 </view>
	</view> 
<!-- 	<button class="cu-btn block light bg-blue margin-tb-sm lg" >召唤鸽子</button>
 -->	</view>
</template>

<script>
	export default {
		data() {
			return{
				team_name:'还没有小组',
			}
			},
			methods:{
				onShareAppMessage: function(e) {
								let title = '来跟我一起组队吧！这次我绝对不鸽！'
								return {
									title: title,
									path: 'pages/index/team/team'
								}
							}

			}
		}
</script>

<style>

	
</style>
