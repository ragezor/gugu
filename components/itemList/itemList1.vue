<template>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in todolist" :options="item.iscompleted==0?options1:options2" :key="item.id" @change="swipeChange"
			 @click="swipeClick($event,index)">
				<text class="cont text-green" v-if="item.iscompleted==1">【{{subjects[item.subjectId]}}】| {{learnStyle[item.subjectId][item.learnStyleId]}} | {{item.content}}</text>
				<text class="cont text-gray" v-else>【{{subjects[item.subjectId]}}】| {{learnStyle[item.subjectId][item.learnStyleId]}} | {{item.content}}</text>
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
					text: '撤销标记',
					style: {
						backgroundColor: 'rgb(178, 170, 170)'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				// todolist: [{
				// 	"id":1,
				// 		"startTime": "2020-5-21 20:00:00",
				// 		"endTime": "2020-5-31 23:30:00",
				// 		"content": "tesst",
				// 		"subjectId": "3",
				// 		"learnStyleId": "2",
				// 		"iscompleted":"0"
				// 	},
				// 	{
				// 		"id":2,
				// 		"startTime": "2020-5-21 20:00:00",
				// 		"endTime": "2020-5-21 22:00:00",
				// 		"content": "tesst",
				// 		"subjectId": "3",
				// 		"learnStyleId": "2",
				// 		"iscompleted":"0"
				// 	},
				// 	{
				// 		"id":3,
				// 		"startTime": "2020-5-21 20:00:00",
				// 		"endTime": "2020-5-21 22:00:00",
				// 		"content": "tesst",
				// 		"subjectId": "3",
				// 		"learnStyleId": "2",
				// 		"iscompleted":"1"
				// 	}
				// ],
				subjects: ['数学', '英语', '政治', '专业课'],
				learnStyle: [
					['做题', '看书', '看视频'],
					['做题', '背单词', '看书', '看视频'],
					['做题', '看书', '看视频'],
					['做题', '看书', '看视频']
				],
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.isOpened = true
			})
		},
		methods: {
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
			swipeClick(e, index) {
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
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (content.text === '添加') {
					if (this.swipeList.length < 10) {
						this.swipeList.push({
							id: new Date().getTime(),
							options: [{
								text: '置顶'
							}, {
								text: '标记为已读',
								style: {
									backgroundColor: 'rgb(254,156,1)'
								}
							}, {
								text: '删除',
								style: {
									backgroundColor: 'rgb(255,58,49)'
								}
							}],
							content: '新增'
						})
						uni.showToast({
							title: `添加了一条数据`,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: `最多添加十条数据`,
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: `点击了${e.content.text}按钮`,
						icon: 'none'
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';

	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
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
