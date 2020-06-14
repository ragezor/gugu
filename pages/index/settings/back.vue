<template>
	<view class=" content bg-gray">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">意见与反馈</block>
	</cu-custom>
	</view>
	<view class="text_input">
	<view class="flex justify-between margin-top">
		<view class="text-black text-sm" id="text1">对不咕单有什么意见？</view>
	
	</view>
	<view class="text-black text-sm margin-top "id="text2">写给我们吧</view>
	<view class="margin-top">
	        <input name="test" style="border: solid 1px #999999;height: 150px;" type="text" @input="onInput" :value="value" />  
	    </view>
		</view>
		<view class="margin-top flex justify-center">
			<button class="cu-btn light bg-pink" id="btn1" @click="showModal" :data-target="DialogModal">提交</button>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">几点提醒呀</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
			<view class="cu-form-group">
					<view class="title">谢您的建议与意见~ 不咕单一直在路上</view>
					
				</view>
			
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left"@click="to('/pages/index/settings/settings')">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	
	</view>
	  
</template>

<script>
	export default {  
	        name: 'compInput',  
	        behaviors: ['uni://form-field'],
			data(){
				return{
					modalName:null
				}
			},
			
	        methods: {  
	            onInput(e) {  
	                this.$emit('input', e.detail.value)  
	            }  ,
				showModal(e) {
					console.log(123);
					this.modalName = "DialogModal"
				},
				hideModal(e) {
					this.modalName = null
				},
				to(name){
					this.modalName = null
					console.log('关闭')
					console.log('跳转');
					uni.navigateTo({
						
						url:name
					});
				},
	        }  
	    }  
</script>

<style>
	.text_input{
		margin : 20px 20px 20px 20px;
	}
	#text1{
		font-size: 14px;
	}
	#text2{
		font-size: 14px;
	}
	#btn1{
		width: 200px;
	}
</style>
