<template>
	<view class=" content bg-gray">
		<cu-custom :isBack="true" bgImage="static/bg_me.png">
			<block slot="backText">返回</block>
			<block slot="content">我的签名</block>
		</cu-custom>
		<view class="margin-top bg-white">
			<input name="test" style="border: solid 1px #999999;height: 80px;" type="text" v-model="userinfo['motto']"
			 placeholder="少年写一个签名吧" />
		</view>
		<!-- 	小程序的submit和其他不一样，参考一下https://uniapp.dcloud.io/component/form -->
	<!-- 	<form @submit="onSubmit">
			<comp-input name="test" v-model="testValue"></comp-input> -->
			<button class="light bg-pink" @click="onSubmit">确认更改</button>
		<!-- </form> -->
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState({
				userinfo: state => state.userinfo
			})
		},
		name: 'compInput',
		behaviors: ['uni://form-field'],
		methods: {
			onSubmit() {
				uni.request({
					url:`https://www.doaho.work:8080/user/update?salt=${this.$store.state.userinfo['salt']}`,
					method:"POST",
					data:{
						"motto":this.userinfo['motto']
					},
					success: (res) => {
						console.info(res.data.message)
						if(res.data.success){
							uni.navigateBack({
								delta:1
							})
						}else{
							uni.showToast({
								title:"更改失败",
								icon:"none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
