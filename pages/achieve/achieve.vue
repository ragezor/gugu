<template>
	<view class=" content">
		<cu-custom :isBack="true" bgImage="static/bg_me.png">
			<block slot="backText">返回</block>
			<block slot="content">我的成就</block>
		</cu-custom>
		<!-- <view class="justify-around align-end">
			<button class="cu-btn    bg-img shadow" style="background-image: url(../../../static/me_gugu.png)"@tap="showModal" data-target="DialogModal1"></button>
	<view class="cuIcon-home"></view>
	</view> -->
		<view class="flex solid-bottom padding justify-around align-end">
			<!-- <button class="cu-btn bg-img shadow" style="background-image: url(../../../static/gugu4-1.png)" @tap="showModal" data-target="DialogModal1"></button> -->
			<image :src="`${guguImg[gugu.typeid-1]}`" style="width: 50px;height:50px"></image>
			<view class="cuIcon-home text-xsl light text-pink">
				<view class="text-black">经验值: {{gugu['weight']==null?0:gugu['weight']}}</view>
				<view class="text-black">剩余鸽粮: {{gugu['food']==null?0:gugu['food']}}</view>
			</view>
		</view>
		<uni-grid :column="2" :highlight="true" @change="change" >
			<uni-grid-item v-for="(item, index) in shows" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #ffffff;">
					<view style="margin: 40px;">
						<image :src="`${item}`" class="image" mode="widthFix" />
					</view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<!-- <view class="cu-bar bg-white justify-end">
					<view class="content">更换鸽子</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view> -->
				<view class="padding-xl">
					确定要更换咕咕吗?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal" @click='changeGugu'>确定</button>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		onShow() {
			this.getGugu();
		},
		data() {
			return {
				limits:[],
				gugu: {},
				selectIndex: 0,
				modalName:'',
				shows:[]
			}
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo,
				guguImg: state => state.guguImg
			}),
		},
		methods: {
			changeGugu(){
				this.gugu['typeid'] = this.selectIndex;
				uni.request({
					url: `https://www.doaho.work:8080/gugu/update?salt=${this.userinfo['salt']}`,
					method:"POST",
					data:{
						"typeid": this.selectIndex
					},
					success: (res) => {
						if(res.data.success){
							console.info(res.data.message)
						}
					}
				})
			},
			change(e) {
				this.modalName = 'DialogModal';
				this.selectIndex = e.detail.index+1
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			getGugu() {
				console.info('getgugu')
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/gugu/get?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if (res.data.success) {
							_this.gugu = res.data.data
							switch(_this.gugu['level']){	
								case 1:
									_this.shows = _this.guguImg.slice(0,1)
									break;
								case 2:
									_this.shows = _this.guguImg.slice(0,3)
									break;
								case 3:
									_this.shows = _this.guguImg.slice(0,6)
									break;
								case 4:
									_this.shows = _this.guguImg
									break;
							}
						}
					}
				})
			},

		},
	}
</script>

<style>
</style>
