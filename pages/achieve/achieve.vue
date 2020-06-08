<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">我的成就</block>
	</cu-custom>
	</view>
	<!-- <view class="justify-around align-end">
			<button class="cu-btn    bg-img shadow" style="background-image: url(../../../static/me_gugu.png)"@tap="showModal" data-target="DialogModal1"></button>
	<view class="cuIcon-home"></view>
	</view> -->
	<view class="flex solid-bottom padding justify-around align-end">
			<button class="cu-btn    bg-img shadow" style="background-image: url(../../../static/me_gugu.png)"@tap="showModal" data-target="DialogModal1"></button>
			<view class="cuIcon-home text-xsl light text-pink ">
			
				<view class="text-black">鸽子体重:{{weight}}g</view>
				<view class="text-black">剩余鸽粮:{{gugu_food}}</view>
			
			</view>
			
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					Modal 内容。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>

	</view>
	
</template>

<script>
	export default {
		
		
		data() {
			return {
				modalName: null,
				weight:100,
				gugu_food:50,
				
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			
		
		},
		}
</script>

<style>
</style>
