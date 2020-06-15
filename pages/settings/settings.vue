<template>
	<view class=" content">

		<cu-custom :isBack="true" :bgImage="img.bg_me">
			<block slot="backText">返回</block>
			<block slot="content">我的设置</block>
		</cu-custom>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">设置目标</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group margin-top">
<!-- 
					<picker @change="PickerChange1" :value="index1" :range="picker1">
						<view class="picker">
							{{index1>-1?picker1[index1]:'你要干啥'}}
						</view>
					</picker> -->
					<view class="cu-form-group example-body">
						<uni-combox label="目标院校" labelWidth="80px" placeholder="请填写目标院校" v-model="userinfo['target']"  emptyTips="Fighting!"></uni-combox>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal" @click="updateTarget">确定</button>

					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">几点提醒呀</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">时间选择</view>
					<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
						<view class="picker">
							{{time}}
						</view>
					</picker>
				</view>

				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal_submit">确定</button>
					</view>
				</view>
			</view>
		</view>


		<view class="cu-modal" :class="modalName=='DialogModal3'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">改个昵称吧</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">昵称</view>
					<input type="text" v-model="userinfo['nickname']" />
				</view>

				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal_submit" @click="updateName">确定</button>
					</view>
				</view>
			</view>
		</view>
		<uni-list style="background-color: #f4f5f6;">
			<uni-list-item title="昵称" :show-badge="true" :badge-text="userinfo['nickname']" @click="showModal3" :data-target="DialogModal3"></uni-list-item>
			<uni-list-item title="我的目标" @click="showModal" :data-target="DialogModal1" :rightText="userinfo['target']"></uni-list-item>
			<uni-list-item title="我的签名" @click="to('/pages/settings/signature')" :rightText="userinfo['motto']"></text></uni-list-item>
			<!-- <uni-list-item :show-switch="true" title="每日提醒" @switchChange="switchChange" /> -->
			<!-- <uni-list-item title="其他设置"></uni-list-item> -->
			<uni-list-item title="操作手册" @click="to('/pages/settings/operation_manual')"></uni-list-item>
			<uni-list-item title="意见与反馈" @click="to('/pages/settings/back')"></uni-list-item>
			<button v-if="hasLogin" class="margin cu-btn bg-grey lg" @click="quit">退出登录</button>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
		import Img2Base64 from "@/common/img2Base64.js"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				img: Img2Base64,
				name: 'compInput',
				behaviors: ['uni://form-field'],
				time: '7:00',
				modalName: null,
				index1: -1,
				index2: -1,
				index3: -1,
				picker2: ['清华大学', '北京大学', '中国科学技术大学', '复旦大学', '中国人民大学', '上海交通大学', '南京大学', '同济大学', '浙江大学', '南开大学'],
				picker1: ['考研', '日常'],
				testValue: 'Hello',
			}
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo,
				hasLogin: state => state.hasLogin
			})
		},
		methods: {
			updateTarget(){
				uni.request({
					url:`https://www.doaho.work:8080/user/update?salt=${this.userinfo['salt']}`,
					method:"POST",
					data:{
						"target": this.userinfo['target']
					},
					success: (res) => {
						console.info(res.data.message)
					}
				})
			},
			quit() {
				this.$store.commit('logout')
				uni.navigateBack({
					delta:1
				})
			},
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				})
			},
			updateName() {
				uni.request({
					url: `https://www.doaho.work:8080/user/update?salt=${this.userinfo['salt']}`,
					method: "POST",
					data: {
						"nickname": this.userinfo['nickname']
					},
					success: (res) => {
						console.info(res.data.message)
					}
				})
			},
			to(name) {
				console.log('跳转');
				uni.navigateTo({
					url: name
				});
			},
			onInput(e) {
				this.$emit('input', e.detail.value)
			},
			showModal(e) {
				this.modalName = "DialogModal1"
			},
			showModal2(e) {
				this.modalName = "DialogModal2"
			},
			showModal3(e) {
				this.modalName = "DialogModal3"
			},
			hideModal(e) {
				this.modalName = null
			},
			PickerChange1(e) {
				this.index1 = e.detail.value
			},
			PickerChange2(e) {
				this.index2 = e.detail.value
			},
			PickerChange3(e) {
				this.index3 = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			hideModal_submit(e) {
				console.log(12)
				this.modalName = null
			},

		}

	}
</script>

<style>
</style>
