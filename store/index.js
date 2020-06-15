import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userinfo: {},
		nickName: '不孤单',
		avatarUrl: '',
		guguImg:
			[
				'https://s1.ax1x.com/2020/06/13/tjaS6e.png',
				'https://s1.ax1x.com/2020/06/13/tjUxSO.png',
				'https://s1.ax1x.com/2020/06/13/tjUzlD.png',
				'https://s1.ax1x.com/2020/06/13/tjaCmd.png',
				'https://s1.ax1x.com/2020/06/13/tjapOH.png',
				'https://s1.ax1x.com/2020/06/13/tjaP0A.png',
				'https://s1.ax1x.com/2020/06/13/tjaiTI.png',
				'https://s1.ax1x.com/2020/06/13/tjakkt.png'
			]
	},
	mutations: {
		login(state, res) {
			state.hasLogin = true;
			state.userinfo = res;
			uni.setStorageSync('userinfo', res);
		},
		logout(state) {
			state.hasLogin = false
			state.userinfo = {}
			uni.removeStorage({
				key: 'userinfo'
			})
		},
		updateUserInfo(state, userinfo) {
			state.nickName = userinfo.nickName
			state.avatarUrl = userinfo.avatarUrl
			uni.request({
				url: `https://www.doaho.work:8080/user/update?salt=${state.userinfo['salt']}`,
				method: 'POST',
				data: {
					"headPorirait": state.avatarUrl
				},
				success: (res) => {
					if (res.data.success) {
						console.info(res.data.message)
					}
				}
			})
		}
	}
})

export default store
