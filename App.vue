<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		 	const userinfo = uni.getStorageSync('userinfo')
			console.info(userinfo)
			if(userinfo){
				var _this = this
				this.$store.commit('login',userinfo)
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						//获取用户信息后向调用信息更新方法
						console.info(infoRes.userInfo.avatarUrl)
						_this.$store.commit('updateUserInfo',infoRes.userInfo)
						// let nickName = infoRes.userInfo.nickName; //昵称
						// let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						// _this.updateUserInfo(); //调用更新信息方法
					}
				});
			}
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import './common/uni.css';
	page {
	    background-color: #F4F5F6;
	    height: 100%;
	    font-size: 28rpx;
	    line-height: 1.8;
	}
	
	.uni-header-logo {
	    padding: 30rpx;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    margin-top: 10rpx;
	}
	
	.uni-header-image {
	    width: 100px;
	    height: 100px;
	}
	
	.uni-hello-text {
	    color: #7A7E83;
	}
	
	.uni-hello-addfile {
	    text-align: center;
	    line-height: 300rpx;
	    background: #FFF;
	    padding: 50rpx;
	    margin-top: 10px;
	    font-size: 38rpx;
	    color: #808080;
	}
	
</style>
