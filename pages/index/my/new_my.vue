<template>
	<view class=" content">
		<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
		
		<cu-custom :isBack="flase">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>

		
			
			<view class="flex justify-around align-end ">
			
				<view class="cu-avatar xl round margin-top margin-tb-xl" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);">
				
				</view>
				
		        <view class="gaol">
				<view class="text-white text-lg">{{name}}</view>
				<view class="text-white text-sm  margin-top">{{goal}}</view>
				<view class="block"></view>
				</view>
				
				
		</view>
		
		
		</view>
		
	<!-- 	<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<button class=" cu-btn bg-img text-white"style="background-image: url(../../../static/me_todo.png)">123</button>
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view> -->
			
<view class="cu-list grid col-3 no-border ">
			<view >
				<button class=" cu-btn bg-img lg text-white"style="background-image: url(../../../static/me_todo.png)"></button>
				<view class="text-grey">计划清单</text></view>
			

				</view>
				<view>
					<button class=" cu-btn bg-img xxl  text-white"style="background-image: url(../../../static/me_diary.png)">1</button>
					<view class="text-grey">心情日记</text></view>
					</view>
					<view>
						<button class=" cu-btn bg-img xxl  text-white"style="background-image: url(../../../static/me_summary.png)"></button>
						<view class="text-grey">每周总结</text></view>
						</view>
						<view>
							<button class=" cu-btn bg-img xxl  text-white"style="background-image: url(../../../static/me_team.png)"></button>
							<view class="text-grey">我的小组</text></view>
							</view>
							<view>
								<button class=" cu-btn bg-img xxl  text-white"style="background-image: url(../../../static/me_gugu.png)"></button>
								<view class="text-grey">我的成就</text></view>
								</view>
								<view>
									<button class=" cu-btn bg-img xxl  text-white"style="background-image: url(../../../static/me_set.png)"></button>
									<view class="text-grey">我的设置</text></view>
									</view>	
		</view>
		
		
		
	
		 <view class="bg-img bg-mask flex align-center margin-top " style="background-image: url(../../../static/c77af190c04ac7be99a65e631ae72e9e.jpg);height: 414upx; border-radius：30px;">
		 	<view class="padding-xl text-white">
		 		<view class="padding-xs text-xxl text-bold">
		 			我咕了
		 		</view>
		 		<view class="padding-xs text-lg">
		 			也熟了
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
		 				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
		 			</view>
		 			<view class="action" @click="NavChange" data-cur="component">
		 				<view class='cuIcon-cu-image'>
		 					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
		 				</view>
		 				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
		 			</view>
		 			
		 		</view>
		 	</view>
		 

		
		

		

		 
		 
		
	
		
		
		</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	
	export default {
		components: {uniGrid,uniGridItem},
		data() {
			return {
				PageCur: 'basics',
				        gridCol: 3,
						gridBorder: false,			
				name:'从不水鸭儿',
				goal:'立志考上东北大学软件学院学硕',
				space:'&#12288;'
				
			}
		},
		methods: {
			NavChange: function(e) {
							this.PageCur = e.currentTarget.dataset.cur
						}
			
		}
	}
</script>

<style>
#btn1{
	background-size: cover;
}
.block{
	height: 30px;
}
.text-grey{
	font-size: 13px;
}
.box{
	height: 75px;
}
</style>
