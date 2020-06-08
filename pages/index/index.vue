<template>
	<view>
		<view class=" bg-img  shadow-blur" style="background-image:url(../../static/bg_first.png)">
			<cu-custom :isBack="true">
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
		<scroll-view scroll-x class="bg-gray margin-top  response cu-steps steps-bottom" :scroll-into-view="'scroll-' + (scroll<3?1:scroll-3)"
		 scroll-with-animation>
			<view class="cu-item padding-lr-xs" :class="index+1 != scroll?'':'text-pink'" v-for="(item,index) in allDays" :key="index"
			 :id="'scroll-' + (index+1)">
				<text class="num" :data-index="index+1" @click="changeIndex(index+1)"></text>
			</view>
		</scroll-view>
		<view class="cuIcon-time text-center" @click="goBack">{{new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}}
			不咕值:{{BGZ}}</view>
		<view class="flex align-center justify-center margin-top">
			<view class="text-yellow text-sm ">常立志更要立长志，来为自己设定一个目标吧！</view>

			<button class="cu-btn cuIcon  lg bg-img shadow" style="background-image: url(../../static/first_newGoal.png)" @tap="showModal"
			 data-target="DialogModal1"></button>
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
		<!-- 	<view class="cu-list menu" :class="['card-menu','margin-bottom']">
			<view class="cu-item margin-top" v-for="item in todolist" style="background-color: #CCE6FF;">
				<view class="content">
					<image src="/static/me_todo.png" class="png" mode="aspectFit"></image>
					<text class="text-green">{{subjects[item.subjectId]}}</text>
					<text class="text-grey">{{learnStyle[item.subjectId][item.learnStyleId]}}</text>
					<text class="text-grey">{{item.content}}</text>
					<text class="text-grey">{{item.startTime}}</text>
				</view>
			</view>
		</view> -->

		<!-- todolist1 -->
		<todolist1 :todolist='todolist' :today='today' :scroll='scroll' @completeTodoItem="completeTodoItem" @uncompleteTodoItem="uncompleteTodoItem"
		 @deleteTodoItem="deleteTodoItem"></todolist1>
		  <!-- todolist2 -->
			<!-- <todolist2 :todolist="todolist"></todolist2> -->

			<view class="flex justify-end margin-top"> <button class="cu-btn cuIcon bg-img shadow xxl" style="background-image: url(../../static/first_newTodo.png)"
				 @tap="showModal" data-target="DialogModal2"></button>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">新建任务</view>
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
	</view>
</template>

<script>
	import todolist2 from '@/components/itemList/itemList1'
	import todolist1 from '@/components/itemList/itemList'
	export default {
		components: {
			todolist2,
			todolist1,
		},
		onLoad() {
			console.info('index onLoad')
			let date = new Date();
			let startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			this.getTodolist(startTime);
		},
		data() {
			return {
				menuArrow: false,
				index: -1,
				todolist: [],
				picker: ['考研', '四六级', '考证', '实习'],
				picker1: ['北京大学', '清华大学', '四川大学', '重庆大学'],
				title: 'Hello',
				words: '再不学习就只有继续当咸鱼咯',
				scroll: 1,
				time: '12:01',
				date: '2020-5-20',
				allDays: 31,
				today: 1,
				modalName: null,
			}
		},
		methods: {
			getTodolist(startTime) {
				console.info('调用todolist/get接口')
				console.info(startTime)
				var _self = this;
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/get?salt=a&startDate=' + startTime, //请求接口
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						console.info(res)
						_self.todolist = res.data.data;
					}
					
				});
				console.info("todolist"+this.todolist)
			},
			completeTodoItem(todoid) {
				console.info(todoid + "标记为已完成")
				var _self = this;
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/complete?salt=a&todoid=' + todoid,
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.success == 'true') {
							let startTime = '2020-6-' + this.scroll
							getTodolist(startTime)
						}
					}
				})
			},
			uncompleteTodoItem(todoid) {
				console.info(todoid + "撤销标记")
				var _self = this;
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/uncomplete?salt=a&todoid=' + todoid,
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.success == 'true') {
							let startTime = '2020-6-' + this.scroll
							getTodolist(startTime)
						}
					}
				})
			},
			deleteTodoItem(todoid) {
				console.info(todoid + "清单删除")
				uni.request({
					url: 'http://localhost:8070/todolist/delete?salt=a&todoid=' + todoid,
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.success == 'true') {
							let startTime = '2020-6-' + this.scroll
							getTodolist(startTime)
						}
					}
				})
			},
			changeIndex(index) {
				this.scroll = index
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
			complete(itemid) {
				console.info(itemid)
			},
			uncomplete(itemid) {
				console.info(itemid)
			},
			deleteItem(itemid) {
				console.info(itemid)
			},
			goBack() {
				this.scroll = this.today
			}
		},
		computed: {
			days() {
				var startDate = new Date();
				this.scroll = this.today = startDate.getDate()
				var d = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
				this.allDays = d.getDate();
				var endDate = Date.parse("2020-12-19");
				var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
				return parseInt(days);
			},
		},
		watch: {
			scroll(newV) {
				// 调用todolist/get接口
				//TODO startTime重新获取
				let startTime = '2020-6-' + newV
				this.getTodolist(startTime);
			}
		},
	}
</script>

<style scoped>
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
