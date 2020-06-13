<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">我的小组</block>
	</cu-custom>
	</view>
	<view class=" flex justify-around align-end margin-top">
		<view class="cu-avatar radius xl margin-left bg-white" style="background-image:url(../../../static/me_team.png);"></view>
	     <view>
			 <view class="flex justify-center align-start"><text class="light text-pink">{{team_name}}</text></view>
		 <!-- 头像和上标 -->
		 <view class="cu-avatar radius lg margin-left bg-white  margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"><view class=' bg-green cu-tag badge cuIcon-check'></view></view>
		 <view class="cu-avatar radius lg margin-left bg-white margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"><view class=' bg-red cu-tag badge cuIcon-close'></view></view>
		 <view class="cu-avatar radius lg margin-left bg-white margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"></view>
		 </view>
	</view> 
	<button class="cu-btn share-btn block light bg-red margin-tb-sm lg "open-type="share" >召唤鸽子</button>
	<button class="cu-btn  block light bg-red margin-tb-sm lg " @click="showModal3" data-target="DialogModal3">创建队伍</button>
	<button class="cu-btn  block light bg-red margin-tb-sm lg " >加入队伍</button>
	<button class="cu-btn  block light bg-red margin-tb-sm lg " >退出队伍</button>
	
	<view class="flex justify-around margin-top">
		
			<button class="cu-btn  lg  bg-gray bg-img shadow" style="width:150px;height:150px;background-image: url(../../../static/bird/橙鸽子.png)"@click="showModal1" :data-target="DialogModal"><view class=' bg-green cu-tag badge '>{{member_name_1}}</view></button>
	</view>
	<view class="flex justify-around al">
		<button class="cu-btn  lg   bg-gray bg-img shadow" style="width:100px;height:100px;background-image: url(../../../static/bird/橙鸽子.png)" @click="showModal1" :data-target="DialogModal"><view class=' bg-green cu-tag badge '>{{member_name_2}}</view></button>
		<button class="cu-btn  lg   bg-gray bg-img shadow" style="width:100px;height:100px;background-image: url(../../../static/bird/橙鸽子.png)" @click="showModal1" :data-target="DialogModal"><view class=' bg-green cu-tag badge '>{{member_name_3}}</view></button>

	</view>
	<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-sm">你要干啥</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
		<view class="cu-form-group margin-top">
			
			
			<button class="cu-btn lg " @click="showModal2" data-target="DialogModal2">
					<text class="cuIcon-baby">喂养</text>
					
				</button>
				<button class="cu-btn "@click="showModal4" data-target="DialogModal4">
						<text class="cuIcon-calendar">清单</text>
					</button>
					<button class="cu-btn " @click="showModal5" data-target="DialogModal5">
							<text class="cuIcon-text">鸽子信息</text>
						</button>
		</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
	
				</view>
			</view>
		</view>
	</view>
<!-- 	此模态框里的图片对应点击事件进行更新 -->
	<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-sm">喂鸽子多少呢</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
		<view class="cu-form-group margin-top">
			<input name="test" style="border: solid 1px #999999;" type="text" @input="onInput" :value="value" placeholder="50g" />
			
			
			
		</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
	
				</view>
			</view>
		</view>
	</view>
	
	<view class="cu-modal" :class="modalName=='DialogModal3'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-sm">创建个队伍吧</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
		<view class="cu-form-group margin-top">
			<text>队伍名字</text>
			<input name="test" style="border: solid 1px #999999;" type="text" @input="onInput" :value="value" placeholder="我们都爱咕咕咕" />
			
			
			
		</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn  share-btn  line-green text-green" @tap="hideModal" open-type="share">确定</button>
	
				</view>
			</view>
		</view>
	</view>
<!-- 	DialogModal4完成点击鸽子查看别人的清单 更改object数组以更改绑定的数据 -->
	<view class="cu-modal" :class="modalName=='DialogModal4'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-sm">清单信息</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
		<view class=" margin-top">
			<uni-list>
				<view v-for="(value, name) in object">
			<uni-list-item :title="name" :show-badge="true" :badge-text="value"></uni-list-item>
			</view>
			</uni-list>
			
		</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn    line-green text-green" @tap="hideModal" >确定</button>
	
				</view>
			</view>
		</view>
	</view>
<!-- 	DialogModal5完成点击鸽子查看鸽子的信息，包括等级体重， 更改gugu数组以更改绑定的数据 -->
	
	<view class="cu-modal" :class="modalName=='DialogModal5'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-sm">清单信息</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
		<view class=" margin-top">
			<uni-list>
				<view v-for="(value, name) in gugu">
			<uni-list-item :title="name" :show-badge="true" :badge-text="value"></uni-list-item>
			</view>
			</uni-list>
			
		</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn    line-green text-green" @tap="hideModal" >确定</button>
	
				</view>
			</view>
		</view>
	</view>
	
	</view>
</template>

<script>
	// 引入uni-list更是新内容
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	
	export default {
		components: {uniList,uniListItem},
		data() {
			return{
				team_name:'小程序我们已经鸽了',
				modalName: null,
				member_name_1:'霍云杰',
				member_name_2:'咕咕',
				member_name_3:'咕',
				
				// 更新两个数组内容,对应清单完成情况和鸽子情况
				object: {
				      '数学': '完成',
					  '英语': '咕了',
					  '政治': '完成',
					  '专业课': '完成',
				     
				    },
					gugu:{
						'体重':'100g',
						'等级':'1级',
					}
			}
			},
			methods:{
				onShareAppMessage: function(e) {
								let title = '快来一起学习吧！'
								return {
									title: title,
									path: 'pages/index/team/team'
								}
							},
							showModal1(e) {
								this.modalName = "DialogModal1"
							},
							showModal2(e) {
								this.modalName = "DialogModal2"
							},
							showModal3(e) {
								this.modalName = "DialogModal3"
							},
							showModal4(e) {
								this.modalName = "DialogModal4"
							},
							showModal5(e) {
								this.modalName = "DialogModal5"
							},
							hideModal(e) {
								this.modalName = null
							},
							onInput(e) {
							                this.$emit('input', e.detail.value)  
							            }  ,
			
			}
		}
</script>

<style>

	
</style>
