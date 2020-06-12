<template>
	<view>
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<!-- <image src='../../static/img/wx_login.png'></image> -->
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: !uni.getStorageSync('userinfo')//默认为true
			};
		},
		methods: {
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						console.info(code)
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.request({
							url: 'https://www.doaho.work:8080/user/login',
							data: {
								code: code,
							},
							method: 'GET',
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								console.info(res)
								if (res.data.success) {
									_this.$store.commit("login",res.data.data)
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											//获取用户信息后向调用信息更新方法
											console.info(infoRes)
											_this.$store.commit('updateUserInfo',infoRes.userInfo)
											// let nickName = infoRes.userInfo.nickName; //昵称
											// let avatarUrl = infoRes.userInfo.avatarUrl; //头像
											// _this.updateUserInfo(); //调用更新信息方法
										}
									});
									uni.hideLoading();
									uni.navigateBack()
								}
							}
						});
					}
				});
			},
		}
	}
</script>



<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
