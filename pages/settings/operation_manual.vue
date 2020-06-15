<template>
	<view class=" content bg-gray">
		<cu-custom :isBack="true" :bgImage="img.bg_me">
			<block slot="backText">返回</block>
			<block slot="content">操作手册</block>
		</cu-custom>

		<uni-card v-for="item in message" :title="item.title" isShadow ><text class="content-box-text">{{item.content}}</text></uni-card>



	</view>

</template>

<script>
		import Img2Base64 from "@/common/img2Base64.js"
	export default {

		data() {
			return {
				img: Img2Base64,
				message: [{
					"title": "不咕值",
					"content": "不咕值是一个来判断用户每日学习情况的数量值，新用户登陆后，不咕值为0。根据用户每日是否设置的任务数量、任务完成情况以及连续打卡天数、组队情况、小组连续打卡天数等指标，用户每日可以增长相应数量的不咕值，不咕值每日清零，不进行累计。"
				}, 
				{
					"title": "鸽子",
					"content": "每个账号首次登录后，可以领养一只鸽子，鸽子外观默认为初始形象、经验默认值：0g。每个账号仅有一次领养机会。"
				},
				{
					"title": "鸽粮",
					"content": "根据用户每日的不咕值，用户每日可以获取一定数量的鸽粮，鸽粮的使用时间没有限制。"
				},
				{
					title: "鸽子成长周期",
					content: "用户可以使用仓库内的鸽粮，向鸽子进行投食，增长鸽子的经验值。（经验值可以累计）。根据经验值，鸽子将进行等级进化。进化后的鸽子样式会进行改变，可以在成就中查看目前已拥有的鸽子形象，并可以点击更换鸽子形象。"
				}
				
				]
			}
		},
		methods: {}
	}
</script>

<style>
</style>
