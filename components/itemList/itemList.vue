<template>
	<view class="cu-list menu-avatar">
		<view v-if="todolist==[]">当前没有设置任务清单</view>
		<view v-else class="cu-item margin-top" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in todolist" :key="index"
		 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
			<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
			<view class="content">
				<view class="text-grey">【{{subjects[item.subjectId-1]}}】</view>
				<view class="text-gray text-sm">
					<text class=" text-red  margin-right-xs">{{item.startTime.split(" ")[1]}}</text>{{learnStyle[item.learnStyleId-1]}}
				</view>
			</view>
			<view>备注:{{item.content}}</view>
			<view class="action">
				<text v-if='item.isCompleted==1' class="cuIcon-roundcheckfill text-green text-shadow margin-right-xs"></text>
				<text v-else-if='item.isCompleted==0 && item.startTime < getDate()' class="cuIcon-roundclosefill text-red text-shadow margin-right-xs"></text>
				<text v-else class="cuIcon-timefill text-blue text-shadow margin-right-xs"></text>
			</view>
			<view class="move" v-if="scroll==today">
				<view class="bg-grey" v-if="item.isCompleted==0" @click="complete(item.id,index)">标记为已完成</view>
				<view class="bg-grey" v-else @click="uncomplete(item.id,index)">撤除标记</view>
				<view class="bg-red" v-on:click="deleteItem(item.id,index)">删除</view>
			</view>
			<view class="move" v-else>
				<view v-if="item.isCompleted==1" class="text-white" style="background-color: #39B54A;">很棒哦！继续努力</view>
				<view v-else class="text-white" style="background-color: #ED1C24;" >为啥没有完成呢？</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['todolist','today','scroll'],
		data() {
			return {
				subjects: ['数学', '英语', '专业课', '政治'],
				learnStyle: ['做题', '背单词', '看书', '看视频'],
				modalName:null,
				listTouchStart: 0,
				listTouchDirection: null,
			}
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
			complete(todoid,index){
				this.todolist[index].isCompleted = 1
				this.$emit("completeTodoItem",todoid)
			},
			uncomplete(todoid,index){
				this.todolist[index].isCompleted = 0
				this.$emit("uncompleteTodoItem",todoid)
			},
			deleteItem(todoid,index){
				this.todolist.splice(index,1)
				this.$emit("deleteTodoItem",todoid)
			},
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
		}
	}
</script>

<style>

</style>
