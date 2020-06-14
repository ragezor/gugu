<template>
	<view>
		<view class="bg-img" style="background-image: url(../../../static/bg_me.png)">
			<cu-custom :isBack="false">
				<block slot="backText"></block>
				<block slot="content">我的小组</block>
			</cu-custom>
		</view>
		
		<view class="tower-swiper" @touchmove="TowerMove" @touchstart="TowerStart" @touchend="TowerEnd">
			<view class="tower-item" v-for="(item,index) in swiperList" :key="index" :style="[{'--index': item.zIndex+4,'--left':item.mLeft}]" :data-direction="direction">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year;
		} else if (type === 'end') {
			day = day + 7;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	import { mapState } from 'vuex'
	export default {
		onShow() {
			this.TowerSwiper('swiperList');
			if (this.$store.state.userinfo['teamId'] != null) {
				this.getMembers();
				this.getTeamMemberGugu();
			}
			this.getGugu();
		},
		data() {
			return {
				dotStyle: false,
				towerStart: 0,
				direction: '',
				cardCur: 0,
				// swiperList: [{
				// 	id: 0,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				// }, {
				// 	id: 1,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				// }, {
				// 	id: 2,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				// }],
				team_name: '小程序我们已经鸽了',
				members: [],
				mygugu: {},
				gugus: [],
				team: {
					'name':'',
					'id':''
				},
				feetAmount: 0,
				modalName: null,
				selectedGugu: 0,
				memberTodoList: []
			}
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo,
				guguImg: state => state.guguImg
			}),
			swiperList: {
			  get() {
			    var _this = this
			    this.gugus.forEach((item) => {
			    	_this.members.forEach((i) => {
			    		if(i['guguId']==item['id']){
			    			item['userid'] = i['id']
			    			item['username'] = i['nickname']
			    			item['url'] = _this.guguImg[item['typeid']-1]
			    		}
			    	})
			    })
			    return this.gugus
			  },
			  set(val) {
			    this.swiperList = val;
			  }
			}
		},
		methods: {
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper() {
				let list = this.swiperList;
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			onShareAppMessage: function(e) {
				let title = '快来一起学习吧！'
				return {
					title: title,
					path: 'pages/index/team/team'
				}
			},
			showModal1(index) {
				this.selectedGugu = index
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
			hideModal(e) {
				this.modalName = null
			},
			onInput(e) {
				this.$emit('input', e.detail.value)
			},
			getMembers() {
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/get_members?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if (res.data.success) {
							var members = res.data.data
							for (var i = 0; i < members.length; i++) {
								if (members[i]['id'] == _this.userinfo['id']) {
									members.splice(i, 1);
									break;
								}
							}
							console.info('member' + members)
							_this.members = members
						}
					}
				})
			},
			getGugu() {
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/gugu/get?salt=${this.userinfo['salt']}`,
					success: (res) => {
						if (res.data.success) {
							_this.mygugu = res.data.data
							_this.mygugu['url'] = _this.guguImg[_this.mygugu['typeid']-1]
							_this.mygugu['userid'] = _this.userinfo['id']
							_this.mygugu['username'] = _this.userinfo['nickname']
						}
					}
				})
			},
			getTeamMemberGugu(userid) {
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/gugu/getTeamMemberGugu?teamId=${this.userinfo['teamId']}`,
					success: (res) => {
						if (res.data.success) {
							var gugus = res.data.data
							for (var i = 0; i < gugus.length; i++) {
								if (gugus[i]['id'] == _this.userinfo['guguId']) {
									gugus.splice(i, 1);
									break;
								}
							}
							_this.gugus = gugus
						}
					}
				})
			},
			getTeamMemberTodoList() {
				console.info(this.selectedGugu)
				for (var item in this.members) {
					if (this.selectedGugu !== -1 && item['guguId'] == this.gugus[this.selectedGugu]['id']) {
						var userid = item['id']
						break;
					} else {
						var userid = this.userinfo['id']
						break;
					}
				}
				var _this = this
				uni.request({
					url: `https://www.doaho.work:8080/todolist/getTeamMemberTodolist?teamId=${this.userinfo['teamId']}&userId=${userid}&date=${getDate()}`,
					success: (res) => {
						console.info(res.data)
						if (res.data.success) {
							_this.memberTodoList = res.data.data
						}
					}
				})
			},
			feed() {
				if (this.selectedGugu == -1) {
					var gugu = this.mygugu
				} else {
					console.info(this.selectedGugu)
					var gugu = this.gugus[this.selectedGugu]
				}
				//TODO
				var guguid = gugu['id']
				var _feed = this.mygugu['feed']
				if (this.feetAmount > _feed) {
					uni.showToast({
						icon: "none",
						title: "喂食数量大于食物总量"
					})
				} else {
					console.info('喂食' + guguid)
					var _this = this;
					uni.request({
						url: `https://www.doaho.work:8080/gugu/feed?salt=${this.userinfo['salt']}&guguid=${guguid}&amount=${this.feetAmount}`,
						success: (res) => {
							if (res.data.success) {
								console.info(res.data.message)
								_this.getGugu()
								_this.getTeamMemberGugu()
							}
						}
					})
					this.hideModal()
				}
			},
			creatTeam() {
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/create_team?salt=${this.userinfo['salt']}&name=${this.team['name']}`,
					success: (res) => {
						console.info(res.data.message)
						if (res.data.success) {
							_this.team['id'] = res.data.data
							_this.userinfo['teamId'] = res.data.data
							uni.setStorageSync('userinfo',_this.userinfo)
							_this.getMembers()
							_this.getTeamMemberGugu()
							this.hideModal()
						}
					}
				})
			},
			joinTeam(){
				var _this = this
				uni.request({
					url:`https://www.doaho.work:8080/team/join_team?salt=${this.userinfo['salt']}&teamid=${this.team['id']}`,
					success: (res) => {
						console.info(res.data.message)
						if(res.data.success){
							_this.userinfo['teamId'] = _this.team['id']
							uni.setStorageSync('userinfo',_this.userinfo)
							_this.getMembers()
							_this.getTeamMemberGugu()
							this.hideModal()
							uni.showToast({
								title:'入队成功',
								icon:'none'
							})
						}
					}
				})
			},
			quitTeam() {
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/quit_team?salt=${this.userinfo['salt']}`,
					success: (res) => {
						console.info(res.data.message)
						if (res.data.success) {
							_this.team = {
								"name":"",
								"id":""
							}
							_this.members = []
							_this.gugus=[]
							_this.userinfo['teamId']=null
							uni.setStorageSync('userinfo',_this.userinfo)
							uni.showToast({
								title:'退队成功',
								icon:'none'
							})
						}
					}
				})
			}
		}
	}
</script>


<style scoped>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
