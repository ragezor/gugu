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
				'gugu1',
				'gugu2-1',
				'gugu2-2',
				'gugu3-1',
				'gugu3-2',
				'gugu3-3',
				'gugu4-1',
				'gugu4-2'
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
					"nickname": state.nickName,
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
