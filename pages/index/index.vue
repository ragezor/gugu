<template>
	<view>
		<view class=" bg-img  shadow-blur" :style="[{backgroundImage:`url(${imgs.bg_first})`}]">
			<cu-custom>
				<block slot="content"><text class="text-white" style="font-weight: bold;">不咕单</text></block>
			</cu-custom>

			<view class="flex justify-end   text-xl  solid-bottom padding ">


				<view class="con1"><text class="text-white  text-bold">距离考研还有
						<text class="text-red text-xxl ">{{days}}</text>
						天！</text></view>

			</view>

			<view class="flex  justify-center solid-bottom text-white" style="padding: 0 15px;">
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
		<view v-if="userinfo['target']==null" class="flex align-center justify-center margin-top">
			<view class="text-yellow text-sm ">常立志更要立长志，来为自己设定一个目标吧！</view>
			<button class="cu-btn cuIcon  lg bg-img shadow" :style="[{backgroundImage:`url(${imgs.first_newGoal})`}]" @tap="showModal"
			 data-target="DialogModal1"></button>
		</view>
		<view v-else class="flex align-center justify-center margin-top">
			<view class="text-yellow text-sm ">目标: {{userinfo['target']}}</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">先定一个目标院校</view>	
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="col-3">
						<view class="cu-form-group example-body">
							<uni-combox label="目标院校" labelWidth="80px" placeholder="请填写目标院校" v-model="userinfo['target']" emptyTips="GO!GO!GO"></uni-combox>
						</view>
						<!-- <view class="cu-form-group">
							<view class="title">目标院校</view>
							<picker @change="PickerChange" :value="index" :range="picker1">
								<view class="picker">
									{{index>-1?picker1[index]:'北京大学'}}
								</view>
							</picker>
						</view> -->
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-grey text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="hideModal" @click="updateTarget">确定</button>

					</view>
				</view>
			</view>
		</view>
		<!-- <todolist1 :todolist='todolist' :today='today' :scroll='scroll' @completeTodoItem="completeTodoItem"
		 @uncompleteTodoItem="uncompleteTodoItem" @deleteTodoItem="deleteTodoItem"></todolist1> -->
		<!-- 	todolist2 -->
		<todolist2 :todolist="todolist" @completeTodoItem="completeTodoItem" @uncompleteTodoItem="uncompleteTodoItem"
		 @deleteTodoItem="deleteTodoItem"></todolist2>
		<!-- 
		<view class="flex justify-end margin-top"> <button class="cu-btn cuIcon bg-img shadow xxl" style="background-image: url(../../static/first_newTodo.png)"
			 @tap="showModal" data-target="DialogModal2"></button>
		</view> -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">新建任务</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							任务选择
						</view>
						<view class="uni-list-cell-db">
							<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
								<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							日期选择
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							时间选择
						</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
								<view class="uni-input">{{time}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							内容补充
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" style="height: auto;" placeholder="选填" :value="inputClearValue" @input="clearInput" />
						</view>
					</view>
				</view>
				<!-- <view class="padding-xl">
					<view class="col-3">
						<view class="cu-form-group">
							<view class="flex justify-between ">
								
							</view>
						</view>

					</view>
				</view> -->
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-grey text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-pink margin-left" @tap="hideModal" @click="addTodoItem">确定</button>
					</view>
				</view>
			</view>
		</view>

		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" />

	</view>
</template>

<script>
	import todolist2 from '@/components/itemList/itemList1'
	import todolist1 from '@/components/itemList/itemList'
	import fab from '@/components/uni-fab/uni-fab.vue'
	import Img2Base64 from "@/common/img2Base64.js"
	import {
		mapState
	} from 'vuex'

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year;
		} else if (type === 'end') {
			day = day + 7;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			todolist2,
			todolist1,
			fab
		},
		onLoad() {
			var _this = this
			uni.request({
				url: 'https://v1.hitokoto.cn/?c=a&c=b&encode=json',
				success: (res) => {
					_this.words = res.data.hitokoto
				}
			})
		},
		onShow() {
			console.info('index onLoad')
			let date = new Date();
			let startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			this.getTodolist(startTime);
		},
		data() {
			return {
				imgs: Img2Base64,
				inputClearValue: '',
				showClearIcon: false,
				multiArray: [
					['数学', '英语', '政治', '专业课'],
					['做题', '看书', '看视频']
				],
				multiIndex: [0, 0],
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				index: -1,
				todolist: [],
				BGZ: 0,
				picker: ['考研', '四六级', '考证', '实习'],
				//组合框
				picker1: ['北京大学', '清华大学', '四川大学', '重庆大学'],
				title: 'Hello',
				words: '再不学习就只有继续当咸鱼咯',
				scroll: 1,
				scrollTime: '',
				time: '12:01',
				date: getDate({
					format: true
				}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				allDays: 31,
				today: 1,
				modalName: null,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				content: [{
						iconPath: '/static/task_active.png',
						selectedIconPath: '/static/task_active.png',
						text: '添加任务',
						active: false
					},
					{
						iconPath: '/static/diary_active.png',
						selectedIconPath: '/static/diary_active.png',
						text: '心情',
						active: false
					},
					{
						iconPath: '/static/target_active.png',
						selectedIconPath: '/static/target_active.png',
						text: '更改目标',
						active: false
					}
				]
			}
		},
		methods: {
			updateTarget() {
				uni.request({
					url: `https://www.doaho.work:8080/user/update?salt=${this.userinfo['salt']}`,
					method: "POST",
					data: {
						"target": this.userinfo['target']
					},
					success: (res) => {
						console.info(res.data.message)
					}
				})
			},
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['做题', '看书', '看视频']
								break
							case 1:
								this.multiArray[1] = ['做题', '背单词', '看书', '看视频']
								break
							case 2:
								this.multiArray[1] = ['做题', '看书', '看视频']
								break
							case 3:
								this.multiArray[1] = ['做题', '看书', '看视频']
								break
						}
						// this.multiIndex.splice(1, 1, 0)
						break
				}
				this.$forceUpdate()
			},
			trigger(e) {
				if (e.index == 0) {
					this.modalName = 'DialogModal2'
				} else if (e.index == 1) {
					uni.navigateTo({
						url: '../diary/moods/moods'
					})
				} else if (e.index == 2) {
					this.modalName = 'DialogModal1'
				}
			},
			getTodolist(startTime) {
				var _this = this
				console.info('调用todolist/get接口')
				this.todolist = []
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/get?salt=' + this.userinfo['salt'] + '&startDate=' +
						startTime, //请求接口
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						_this.todolist = res.data.data;
						_this.getBGK(startTime)
					}
				});
				console.info("todolist" + this.todolist)
			},
			completeTodoItem(todoid) {
				var _self = this;
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/complete?salt=' + this.userinfo['salt'] + '&todoid=' +
						todoid,
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.success) {
							console.info(res.data)
							_self.getBGK(_self.scrollTime)
						}
					}
				})
			},
			uncompleteTodoItem(todoid) {
				var _self = this;
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/uncomplete?salt=' + this.userinfo['salt'] + '&todoid=' +
						todoid,
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.success) {
							console.info(todoid + "撤销标记")
							_self.getBGK(_self.scrollTime)
						}
					}
				})
			},
			deleteTodoItem(todoid) {
				var _self = this
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/delete?salt=' + this.userinfo['salt'] + '&todoid=' + todoid,
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.success) {
							console.info(todoid + "清单删除")
							_self.getBGK(_self.scrollTime)
						}
					}
				})
			},
			addTodoItem(todoid) {
				console.info("新建任务清单")
				var _this = this;
				uni.request({
					url: 'https://www.doaho.work:8080/todolist/add?salt=' + this.userinfo['salt'],
					method: 'POST',
					data: {
						"startTime": this.date + ' ' + this.time + ':00',
						"content": this.inputClearValue,
						"subjectId": this.multiIndex[0] + 1,
						"learnStyleId": this.multiIndex[0] == 1 ? this.multiIndex[1] + 1 : (this.multiIndex[1] == 0 ? 1 : (this.multiIndex[
							1] + 2))
					},
					success: function(res) {
						if (res.data.success) {
							const date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let day = _this.scroll;
							let startTime = `${year}-${month}-${day}`
							_this.getTodolist(startTime)
							console.info('run here')
							_this.inputClearValue = ''
						}
					}
				})
			},
			getBGK(date) {
				console.info('计算不咕值')
				var _this = this
				uni.request({
					url: `https://www.doaho.work:8080/todolist/calBGZ?salt=${this.userinfo['salt']}&date=${date}&type=0`,
					success: (res) => {
						// TODO
						// if (res.data.success) {
						// 	console.info(todoid + "清单删除")
						// }
						console.info(res.data)
						_this.BGZ = res.data.data == null ? 0 : res.data.data
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
			},
			getWord() {
				var _this = this
				uni.request({
					url: 'https://v1.hitokoto.cn/?c=a&c=i&encode=text',
					success: function(res) {
						console.info(res)
						_this.word = res.data
					}
				})
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
			...mapState({
				userinfo: state => state.userinfo
			}),
		},
		watch: {
			scroll(newV) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let startTime = `${year}-${month}-${newV}`
				this.scrollTime = startTime
				this.getTodolist(startTime);
			},
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
