<template>
	<view class=" content">
		<view class="bg-img" :style="[{backgroundImage:`url(${img.bg_me})`}]">
			<cu-custom :isBack="flase">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
	

			<view class="flex justify-around align-end ">
				<view v-if="hasLogin" class="cu-avatar xl round margin-top margin-tb-xl" :style="[{backgroundImage:`url(${avatarUrl})`}]"></view>
				<view v-else class="cu-avatar xl round margin-top margin-tb-xl" :style="[{backgroundImage:`url(${img.touxiang})`}]"></view>
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

		<view class="cu-list grid col-2 margin-top no-border">
			<!-- <view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_todo.png)" @click="toIndex"></button>
				<view class="text-grey">学习任务</text></view>
			</view> -->
			<view style="padding: 5px 0px;border-bottom: #e3e3e3 0.1px solid; border-right: #e3e3e3 0.1px solid">
				<button class=" cu-btn bg-img lg text-white" :style="[{backgroundImage:`url(${img.me_diary})`}]" @click="toDiary"></button>
				<view class="text-grey">心情</text></view>
			</view>
			<view style="padding: 5px 0px;border-bottom: #e3e3e3 0.1px solid; border-left: #e3e3e3 0.1px solid">
				<button class=" cu-btn bg-img lg text-white" :style="[{backgroundImage:`url(${img.me_summary})`}]" @click="toSummary"></button>
				<view class="text-grey">每周总结</text></view>
			</view>
		<!-- 	<view>
				<button class=" cu-btn bg-img lg text-white" style="background-image: url(static/me_team.png)" @click="toTeam"></button>
				<view class="text-grey">我的小组</text></view>
			</view> -->
			<view style="padding-top: 20px;border-top: #e3e3e3 0.1px solid; border-right: #e3e3e3 0.1px solid">
				<button class=" cu-btn bg-img lg text-white" :style="[{backgroundImage:`url(${img.me_gugu})`}]" @click="toAchieve"></button>
				<view class="text-grey">我的成就</text></view>
			</view>
			<view style="padding-top: 20px;border-top: #e3e3e3 0.1px solid; border-left: #e3e3e3 0.1px solid">
				<button class=" cu-btn bg-img lg text-white" :style="[{backgroundImage:`url(${img.me_set})`}]" @click="toSettings"></button>
				<view class="text-grey">我的设置</text></view>
			</view>
		</view>
		<view class="bg-img bg-mask align-center" style="margin-top: 40px;height: 414upx;" :style="[{backgroundImage:`url(${img.gugutang})`}]">
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
	import Img2Base64 from "@/common/img2Base64.js"
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
				img: Img2Base64,
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
</style>
