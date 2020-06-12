<template>
	<view class=" content">
		<view class="bg-img" style="background-image: url(../../../static/bg_me.png)">
			<cu-custom :isBack="true">
				<!-- <block slot="backText">返回</block> -->
				<block slot="content">我的小组</block>
			</cu-custom>
		</view>
		<view class=" flex justify-center align-end margin-top">
			<view class="cu-avatar radius xl margin-left bg-white" style="background-image:url(../../../static/me_team.png);"></view>
			<view>
				<view class="flex justify-center align-start"><text class="light text-pink">{{team_name}}</text></view>
				<!-- 头像和上标 -->
				<view class="cu-avatar radius sm margin-left bg-white  margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);">
					<view class=' bg-green cu-tag badge cuIcon-check'></view>
				</view>
				<view class="cu-avatar radius sm margin-left bg-white margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);">
					<view class=' bg-red cu-tag badge cuIcon-close'></view>
				</view>
				<view class="cu-avatar radius sm margin-left bg-white margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"></view>
			</view>
		</view>
		<button class="cu-btn block light bg-blue margin-tb-sm lg">召唤鸽子</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		onShow() {
			this.getMembers();
			this.getGugu();
		},
		data() {
			return {
				team_name: '小程序我们已经鸽了',
				members:[],
				gugu:{},
				team:{},
				feetAmount: 0
			}
		},
		computed:{
			...mapState({
				userinfo: state => state.userinfo
			}),
		},
		methods: {
			getMembers(){
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/get_members?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if(res.data.success){
							_this.members = res.data.data
						}
					}
				})
			},
			getGugu(){
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/gugu/get?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if(res.data.success){
							_this.gugu = res.data.data
						}
					}
				})
			},
			getTeamMemberGugu(userid){
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/gugu/getTeamMemberGugu?teamId=${this.userinfo['teamId']}&userId=${userid}`,
					success: (res) => {
						if(res.data.success){
							_this.gugu = res.data.data
						}
					}
				})
			},
			feed(guguid){
				var _this = this;
				uni.reLaunch({
					url: `https://www.doaho.work:8080/gugu/feed?salt=${this.userinfo['salt']}&guguid=${guguid}&amount=${this.feetAmount}`,
					success: (res) => {
						if(res.data.success){
							console.info(res.data.message)
						}
					}
				})
			},
			creatTeam(){
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/create_team?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if(res.data.success){
							_this.team = res.data.data
						}
					}
				})
			},
			quitTeam(){
				var _this = this;
				uni.reLaunch({
					url:`https://www.doaho.work:8080/team/quit_team?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if(res.data.success){
							console.info(res.data.message)
							_this.team = {}
							_this.members = []
						}
					}
				})
			}
		}
	}
</script>

<style>


</style>
