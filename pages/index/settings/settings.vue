<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">我的设置</block>
	</cu-custom>
	
	<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-sm">先给自己定个小目标</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
		<view class="cu-form-group margin-top">
			
			<picker @change="PickerChange1" :value="index1" :range="picker1">
				<view class="picker">
					{{index1>-1?picker1[index1]:'你要干啥'}}
				</view>
			</picker>
			<picker @change="PickerChange2" :value="index2" :range="picker2">
				<view class="picker">
					{{index2>-1?picker2[index2]:'目标院校'}}
				</view>
			</picker>
			
			<input name="test" style="border: solid 1px #999999;" type="text" @input="onInput" :value="value" placeholder="详细说说" />
			
		</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
	
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
			<input type="text" v-model="username" />
		</view>
		
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="hideModal_submit">确定</button>
	
				</view>
			</view>
		</view>
	</view>
	<uni-list>		
	    <uni-list-item title="昵称" :show-badge="true" :badge-text="username" @click="showModal3" :data-target="DialogModal3"></uni-list-item>
		 <uni-list-item title="我的目标" @click="showModal" :data-target="DialogModal1" ></uni-list-item>
		  <uni-list-item title="我的签名" @click="to('/pages/index/settings/signature')" ></uni-list-item>
		  <uni-list-item title="每日提醒" :show-badge="true" :badge-text="time"@click="showModal2" :data-target="DialogModal2"></uni-list-item>
		   <uni-list-item title="其他设置"></uni-list-item>
		   <uni-list-item title="意见与反馈" @click="to('/pages/index/settings/back')"></uni-list-item>
	</uni-list>
	
	</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		 components: {uniList,uniListItem},
		data() {
			return {
				name: 'compInput',  
				        behaviors: ['uni://form-field'],
				username:'旺仔',
				time:'7:00',
				modalName: null,
				index1: -1,
				index2: -1,
				index3: -1,
				picker2: ['清华大学', '北京大学', '中国科学技术大学','复旦大学','中国人民大学','上海交通大学','南京大学','同济大学','浙江大学','南开大学'],
				picker1:['考研','日常'],
				testValue: 'Hello'  ,
				
				
				
			}
		},
		methods:{
			to(name){
				console.log('跳转');
				uni.navigateTo({
					
					url:name
				});
			},
			
			 onInput(e) {  
			                 this.$emit('input', e.detail.value)  
			             }  ,
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
