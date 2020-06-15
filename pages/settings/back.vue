<template>
	<view class="content">
		<cu-custom :isBack="true" :bgImage="img.bg_me">
			<block slot="backText">返回</block>
			<block slot="content">意见与反馈</block>
		</cu-custom>
		<view class="text_input">
			<view class="flex justify-between margin-top">
				<view class="text-black text-sm" id="text1">对不咕单有什么意见？</view>

			</view>
			<view class="text-black text-sm margin-top " id="text2">写给我们吧</view>
			<view class="margin-top">
				<input name="test" style="border: solid 1px #999999;height: 150px;" type="text" v-model="value" />
			</view>
		</view>
		<view class="margin-top flex justify-center">
			<button class="cu-btn light bg-pink" id="btn1" @click="showModal" :data-target="DialogModal">提交</button>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">不咕单</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">谢谢您的建议与意见~ 不咕单一直在路上</view>

				</view>

				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @click="to">确定</button>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import Img2Base64 from "@/common/img2Base64.js"
	export default {
		name: 'compInput',
		behaviors: ['uni://form-field'],
		data() {
			return {
				img: Img2Base64,
				modalName: null,
				value: ''
			}
		},

		methods: {
			onInput(e) {
				this.$emit('input', e.detail.value)
			},
			showModal(e) {
				console.log(123);
				this.modalName = "DialogModal"
			},
			hideModal(e) {
				this.modalName = null
			},
			to() {
				this.modalName = null
				this.value = ""
				uni.showToast({
					title: "提交成功",
					icon: "success"
				})
			},
		}
	}
</script>

<style>
	.text_input {
		margin: 20px 20px 20px 20px;
	}

	#text1 {
		font-size: 14px;
	}

	#text2 {
		font-size: 14px;
	}

	#btn1 {
		width: 200px;
	}
</style>
