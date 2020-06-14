<template>
	<view class=" content">
		<view class="bg-img" style="background-image: url(static/bg_me.png)">
			<cu-custom :isBack="flase">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
	

			<view class="flex justify-around align-end ">
				<view v-if="hasLogin" class="cu-avatar xl round margin-top margin-tb-xl" :style="[{backgroundImage:`url(${avatarUrl})`}]"></view>
				<view v-else class="cu-avatar xl round margin-top margin-tb-xl" style="background-image:url(static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"></view>
				<view class="gaol">
					<view v-if="hasLogin" class="text-white text-lg">{{nickName}}</view>
					<button v-else class="cu-btn bg-white lg shadow text-bold" @click="login">Login</button>
					<view class="text-white text-sm  margin-top">{{userinfo['motto']==null?'':userinfo['motto']}}</view>
					<view style="height: 30px;"></view>
				</view>

			</view>


		</view>

		<!-- 	<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<button class=" cu-btn bg-img text-white"style="background-image: url(../../../static/me_todo.png)">123</button>
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view> -->

		<view class="cu-list grid col-2 no-border margin-top">
			<!-- <view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_todo.png)" @click="toIndex"></button>
				<view class="text-grey">学习任务</text></view>
			</view> -->
			<view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_diary.png)" @click="toDiary"></button>
				<view class="text-grey">心情</text></view>
			</view>
			<view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_summary.png)" @click="toSummary"></button>
				<view class="text-grey">每周总结</text></view>
			</view>
		<!-- 	<view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_team.png)" @click="toTeam"></button>
				<view class="text-grey">我的小组</text></view>
			</view> -->
			<view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_gugu.png)" @click="toAchieve"></button>
				<view class="text-grey">我的成就</text></view>
			</view>
			<view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_set.png)" @click="toSettings"></button>
				<view class="text-grey">我的设置</text></view>
			</view>
		</view>

		<view id="gugu" class="bg-img bg-mask flex align-center margin-top" style="background-image: url(static/c77af190c04ac7be99a65e631ae72e9e.jpg);height: 414upx;">
			<view class="padding-xl text-white">
				<view class="padding-xs text-xxl text-bold">
					我咕了
				</view>
				<view class="padding-xs text-lg">
					也熟了
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import { mapState } from "vuex"
	export default {
		onShow() {
			console.info(this.hasLogin)
		},
		components: {					
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				PageCur: 'basics',
				gridCol: 3,
				gridBorder: false,
				name: '从不水鸭儿',
				goal: '立志考上东北大学软件学院学硕',
				space: '&#12288;',
			}
		},
		computed:mapState({
			hasLogin: state => state.hasLogin,
			userinfo: state => state.userinfo,
			nickName: state => state.userinfo['nickname'],
			avatarUrl: state => state.avatarUrl
		}),
		methods: {
			login(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			toIndex(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			toDiary(){
				uni.navigateTo({
					url:"/pages/diary/diary"
				})
			},
			toSummary(){
				uni.navigateTo({
					url:"/pages/summary/summary"
				})
			},
			toTeam(){
				uni.switchTab({
					url:"/pages/team/team"
				})
			},
			toAchieve(){
				uni.navigateTo({
					url:"/pages/achieve/achieve"
				})
			},
			toSettings(){
				uni.navigateTo({
					url:"/pages/settings/settings"
				})
			}
		}
	}
</script>

<style>
	#btn1 {
		background-size: cover;
	}
	
	.block {
		height: 30px;
	}
	
	.text-grey {
		font-size: 13px;
	}
	
	.box {
		height: 75px;
	}
	
	#gugu {
	
		margin: 50px 0px 0px 0px;
	
	}
</style>
