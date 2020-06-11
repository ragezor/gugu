import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userinfo: {},
		nickName:'不孤单',
		avatarUrl:''
	},
	mutations: {
		login(state, res) {
			state.hasLogin = true;
			state.userinfo = res;
			uni.setStorageSync('userinfo',res);
		},
		logout(state){
			state.hasLogin = false
			state.userinfo={}
			uni.removeStorage({
				key:'userinfo'
			})
		},
		updateUserInfo(state, userinfo){
			state.nickName = userinfo.nickName
			state.avatarUrl = userinfo.avatarUrl
		}
	}
})

export default store
