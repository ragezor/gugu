<template>
	<view class=" content">
	<view class="bg-img"style="background-image: url(../../../static/bg_me.png)">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">导航栏</block>
	</cu-custom>
	</view>
	
	<view class="cu-timeline">
		<view class="cu-time">昨天</view>
<!-- 		开心 -->
			<view class="cu-item text-red cuIcon-attentionforbidfill">
					<view class="content  shadow-blur bg-red">
						
	<view class="cu-avatar round" style="background-image:url(../../../static/眼红.png)"></view>
						{{dairycontent}}
					</view>
				</view>
				<!--难顶-->
				
				<view class="cu-item text-red cuIcon-attentionforbidfill">
								<view class="content  shadow-blur bg-red">
									
				<view class="cu-avatar round" style="background-image:url(../../../static/难过-1.png)"></view>
									{{dairycontent}}
								</view>
							</view>
		
	
	</view>
	
		<button class="  cuIcon  lg bg-img shadow" style="background-image: url(../../../static/first_newTodo.png)"></button>
		
	</view>
	
	
	
	
</template>

<script>
	
	export default {
		
		data() {
			return {
				dairycontent:'今天做题很爽',
				
			}
		},
		}
</script>

	
<style>
</style>
