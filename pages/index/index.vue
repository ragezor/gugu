<template>
	<view class=" content">
		<view class=" bg-img  shadow-blur" style="background-image:url(../../static/bg_first.png)">
		<cu-custom  :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">不咕单</block>
		</cu-custom>
		
		<view class="flex justify-end   text-xl  solid-bottom padding ">
			
		
			<view class="con1"><text class="text-white  text-bold">距离考研还有
			<text class="text-red text-xxl ">{{days}}</text>
			天！</text></view>
			
		</view>
		
		<view class="flex  justify-center solid-bottom text-white text-shadow">
			{{words}}
			</view>
		</view>
		
		<scroll-view scroll-x class="bg-gray margin-top  response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
		 scroll-with-animation>
			<view class="cu-item padding-lr-xs" :class="index>scroll?'':'text-pink'" v-for="(item,index) in 10" :key="index" :id="'scroll-' + index">
				  <text class="num" :data-index="index + 1"></text>
			</view>
		</scroll-view>
		<view class="action flex justify-around">
			<button class="cu-btn light bg-pink shadow" @tap="GobackSteps">上一天</button>
			<button class="cu-btn light bg-pink shadow" @tap="ScrollSteps">下一天</button>
		</view>
		<view class="flex align-center justify-center margin-top">
		<view  class="text-yellow text-sm ">常立志更要立长志，来为自己设定一个目标吧！</view>
		
<button class="cu-btn cuIcon  lg bg-img shadow" style="background-image: url(../../static/first_newGoal.png)"@tap="showModal" data-target="DialogModal1"></button>		
</view>

<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">先给自己定一个小目标</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="col-3">
					<view class="cu-form-group margin-top">
						<view class="title">你要干啥</view>
						<picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker">
								{{index>-1?picker[index]:'考研'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">目标院校</view>
						<picker @change="PickerChange" :value="index" :range="picker1">
							<view class="picker">
								{{index>-1?picker1[index]:'北京大学'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="flex justify-between ">
						<view class="title">详细说说吧</view>
						<input placeholder="我要上北大!" name="input"></input>
						</view>
					</view>
					
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-grey text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="hideModal">确定</button>

					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
		<view class="cu-item margin-top" :class="menuArrow?'arrow':''">
				<view class="content">
					<image src="/static/me_todo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">计算机网络tcp</text>
				</view>
				</view>
				<view class="cu-item margin-top" :class="menuArrow?'arrow':''">
						<view class="content">
							<image src="/static/me_todo.png" class="png" mode="aspectFit"></image>
							<text class="text-grey">高数5页</text>
						</view>
						</view>
				</view>
				<view class="flex justify-end margin-top">				<button class="cu-btn cuIcon bg-img shadow xxl" style="background-image: url(../../static/first_newTodo.png)" @tap="showModal" data-target="DialogModal2"></button>
</view>
<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">先给自己定一个小目标</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="col-3">
					
					
					<view class="cu-form-group">
						<view class="flex justify-between ">
						<view class="title">任务</view>
						<input placeholder="我要打十个!" name="input"></input>
						</view>
					</view>
					
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-grey text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="hideModal">确定</button>

					</view>
				</view>
			</view>
		</view>
		
	

		


		<view>
				<basics v-if="PageCur=='basics'"></basics>
				<components v-if="PageCur=='component'"></components>
				<plugin v-if="PageCur=='plugin'"></plugin>
				<view class="cu-bar tabbar bg-white shadow foot">
					<view class="action" @click="NavChange" data-cur="basics">
						<view class='cuIcon-cu-image'>
							<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
						</view>
						<view :class="PageCur=='basics'?'text-pink':'text-gray'">首页</view>
					</view>
					<view class="action" @click="NavChange" data-cur="component">
						<view class='cuIcon-cu-image'>
							<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
						</view>
						<view :class=" PageCur=='component'?'text-pink':'text-gray' ">  我的</view>
					</view>
					
				</view>
			</view>
		
		
		
	
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
				menuArrow: false,							
				index: -1,
				picker: ['考研', '四六级', '考证', '实习'],
				picker1: ['北京大学', '清华大学', '四川大学', '重庆大学'],
				modalName: null,
				title: 'Hello',
				days:'20',
				words:'再不学习就只有继续当咸鱼咯',
				scroll: 0,
				PageCur: 'basics',
				time: '12:01',
				date: '2020-5-20',
				listTouchStart: 0,
				listTouchDirection: null,

				
				
			}
		},
		onLoad() {

		},
		methods: {
			ListTouchStart(e) {
							this.listTouchStart = e.touches[0].pageX
						},
						// ListTouch计算方向，
						ListTouchMove(e) {
							this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
						},
						// ListTouch计算滚动
						ListTouchEnd(e) {
							if (this.listTouchDirection == 'left') {
								this.modalName = e.currentTarget.dataset.target
							} else {
								this.modalName = null
							}
							this.listTouchDirection = null
						},
		GobackSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll - 1				
			},
	
			
         ScrollSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll + 1				
			},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		PickerChange(e) {
			this.index = e.detail.value
		},
		TimeChange(e) {
			this.time = e.detail.value
		},
		DateChange(e) {
			this.date = e.detail.value
		},
		NavChange: function(e) {
							this.PageCur = e.currentTarget.dataset.cur
							
						},
		
		},
		
					
	}

</script>

<style>
	.content {
		
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
