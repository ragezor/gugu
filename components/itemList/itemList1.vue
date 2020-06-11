<template>
		<uni-swipe-action>
			<uni-swipe-action-item style="margin-bottom:10px" v-for="(item,index) in todolist" :options="item.startTime < getDate() ? (item.isCompleted == 0 ? options3 : options4): (item.isCompleted==0?options1:options2)" :key="item.id" @change="swipeChange"
			 @click="swipeClick($event,index,item.id)">
			 <view class="cont" style="display: flex; flex-direction: row;">
				 <view style="display: flex; flex-direction: column;">
					<text>{{item.startTime.split(" ")[1]}}</text>
					<text class="text-green" v-if="item.isCompleted==1">【{{subjects[item.subjectId-1]}}】| {{learnStyle[item.learnStyleId-1]}} | {{item.content}}</text>
					<text class="text-gray" v-else>【{{subjects[item.subjectId-1]}}】| {{learnStyle[item.learnStyleId-1]}} | {{item.content}}</text>					
				 </view>
			 </view>
			 <view style="display: flex;align-items: center;padding-right: 10px;">
					<text v-if='item.isCompleted==1' class="cuIcon-roundcheckfill text-green text-shadow margin-right-xs"></text>
					<text v-else-if='item.isCompleted==0 && item.startTime < getDate()' class="cuIcon-roundclosefill text-red text-shadow margin-right-xs"></text>
					<text v-else class="cuIcon-timefill text-blue text-shadow margin-right-xs"></text> 				 
			 </view>
			</uni-swipe-action-item>
		</uni-swipe-action>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		props:['todolist'],
		data() {
			return {
				isOpened: false,
				options1: [{
					text: '标记为已完成',
					style: {
						backgroundColor: 'rgb(254,156,1)'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				options2: [{
					text: '撤销完成标记',
					style: {
						backgroundColor: 'rgb(178, 170, 170)'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				options3: [{
					text: '为啥没完成呢?',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				options4: [{
					text: '很棒哦！继续努力',
					style: {
						backgroundColor: '#39B54A'
					}
				}],
				subjects: ['数学', '英语', '专业课','政治'],
				learnStyle:['做题', '背单词', '看书', '看视频'],
					
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.isOpened = true
			})
		},
		methods: {
			getDate(){
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
					
				return `${year}-${month}-${day}`;
			},
			bindClick(e) {
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			setOpened() {
				this.isOpened = !this.isOpened
			},
			change(e) {
				this.isOpened = e
				console.log('返回：', e);
			},
			swipeChange(e) {
				console.log('返回：', e);
			},
			swipeClick(e, index, todoid) {
				let {
					content
				} = e
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: (res) => {
							if (res.confirm) {
								this.todolist.splice(index, 1)
								this.$emit("deleteTodoItem",todoid)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (content.text === '标记为已完成') {
					this.todolist[index].isCompleted = 1
					this.$emit("completeTodoItem",todoid)
					uni.showToast({
						title: `哎吆，不错哦！`,
						icon: 'none'
					})
				} else if (content.text === '撤销完成标记'){
					this.todolist[index].isCompleted = 0
					this.$emit("uncompleteTodoItem",todoid)
				}

			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';

	.cont {
		flex: 1;
		height: 60px;
		line-height: 25px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
</style>
