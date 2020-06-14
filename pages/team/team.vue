<template>
	<view class=" content">
			<cu-custom :isBack="false" bgImage="static/bg_me.png">
				<block slot="content"class="text-white">我的小组</block>
			</cu-custom>
		<view class=" flex justify-around align-end margin-top">
			<view class="cu-avatar radius xl margin-left bg-white" style="background-image:url(static/me_team.png);"></view>
			<view>
				<view v-if="userinfo.teamId==null" class="flex justify-center align-start"><text class="light text-pink">未加入队伍</text></view>
				<view v-else class="flex justify-center align-start"><text class="light text-pink"><text class=" light text-blue">id:</text> {{team['id']}} | <text class=" light text-blue"> 队名 :</text> {{team['name']}}</text></view>
				<!-- 头像和上标 -->
				<!-- <view class="cu-avatar radius lg margin-left bg-white  margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"><view class=' bg-green cu-tag badge cuIcon-check'></view></view> -->
				<!-- <view class="cu-avatar radius lg margin-left bg-white margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"><view class=' bg-red cu-tag badge cuIcon-close'></view></view> -->
				<!-- <view class="cu-avatar radius lg margin-left bg-white margin-top" style="background-image:url(../../../static/D99BF290B33967FFC81E18410C8F6FF3.jpg);"></view> -->
				<view class="cu-avatar radius lg margin-left bg-white margin-top" :style="[{backgroundImage:`url(${userinfo['headPorirait']})`}]"></view>
				<view v-for="(item,index) in members" class="cu-avatar radius lg margin-left bg-white margin-top" :style="[{backgroundImage:`url(${item['headPorirait']})`}]"></view>

			</view>
		</view>
		<button v-if="userinfo.teamId==null" class="cu-btn  block light bg-red margin-tb-sm lg " @click="showModal3" data-target="DialogModal3">创建队伍</button>
		<button v-else class="cu-btn share-btn block light bg-red margin-tb-sm lg" @click="showModal7" data-target="DialogModal6">召唤鸽子</button>
		<button v-if="userinfo.teamId==null" class="cu-btn  block light bg-red margin-tb-sm lg " @click="showModal4">加入队伍</button>
		<button v-else class="cu-btn  block light bg-red margin-tb-sm lg " @click="quitTeam">退出队伍</button>

		<view class="flex justify-around margin-top">
			<button class="cu-btn  lg  bg-gray bg-img shadow" style="width:150px;height:150px;" :style="[{backgroundImage:`url(${guguImg[mygugu['typeid']-1]})`}]"
			 @click="showModal1(-1)" :data-target="DialogModal">
				<view class=' bg-green cu-tag badge '>{{userinfo['nickname']}}</view>
			</button>
		</view>
		<view class="flex justify-around al">
			<button v-for="(item,index) in gugus" class="cu-btn lg bg-gray bg-img shadow" style="width:100px;height:100px;" :style="[{backgroundImage:`url(${guguImg[item['typeid']-1]})`}]"
			 @click="showModal1(index)" :data-target="DialogModal">
				<view class=' bg-green cu-tag badge '>{{members[0]['guguId']==item['id']?members[0]['nickname']:members[1]['nickname']}}</view>
			</button>
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
					<button class="cu-btn ">
						<text class="cuIcon-calendar" @click="getTeamMemberTodoList">清单</text>
					</button>
					<button class="cu-btn ">
						<text class="cuIcon-text" @click="showGugu">鸽子信息</text>
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
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">喂鸽子多少呢</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group margin-top">
					<input name="test" style="border: solid 1px #999999;" type="text" @input="onInput" v-model="feetAmount" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal" @click="feed()">确定</button>
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
					<input name="test" style="border: solid 1px #999999;" type="text" @input="onInput" v-model="team['name']"
					 placeholder="我们都爱咕咕咕" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn  share-btn  line-green text-green" @click="creatTeam">确定</button>

					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal4'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">加入队伍</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group margin-top">
					<text>队伍id</text>
					<input name="test" style="border: solid 1px #999999;" type="text" @input="onInput" v-model="team['id']"
					 placeholder="请输入队伍id" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn  share-btn  line-green text-green" @click="joinTeam">确定</button>
		
					</view>
				</view>
			</view>
		</view>
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
						<view v-for="(item, index) in memberTodoList" :key="index">
							<uni-list-item :title="subjects[item['subjectId']-1]" :show-badge="true" :badge-text="item.isCompleted==1?'完成':'未完成'"></uni-list-item>
						</view>
					</uni-list>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn line-green text-green" @tap="hideModal" >确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal6'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">咕咕信息</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" margin-top">
					<uni-list>
						<view>
							<uni-list-item title="name" :show-badge="true" :badge-text="selectedGugu==-1?mygugu.name:gugus[selectedGugu].name"></uni-list-item>
						</view>
						<view>
							<uni-list-item title="level" :show-badge="true" :badge-text="selectedGugu==-1?mygugu.level:gugus[selectedGugu].level"></uni-list-item>
						</view>
						<view>
							<uni-list-item title="鸽粮" :show-badge="true" :badge-text="selectedGugu==-1?mygugu.food:gugus[selectedGugu].food"></uni-list-item>
						</view>
					</uni-list>
		
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn    line-green text-green" @tap="hideModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal7'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-sm">清单信息</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
			<view class=" margin-top">
				<text class="light text-pink">给队员发送召唤消息，别再咕咕咕啦~~（给非队员的好友发送消息，好友是进不来的哦~ 好友可以通过id加入队伍！） </text>
				
			</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn  line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn  share-btn   line-green text-green" @tap="hideModal" open-type="share">召唤好友</button>
		
					</view>
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
	import {
		mapState
	} from 'vuex'
	export default {
		onShow() {
			if(this.$store.state.userinfo['teamId'] == null){
				this.members=[]
				this.gugus=[]	
			}else{
				this.getTeam();
				this.getMembers();
				this.getTeamMemberGugu();
			}
			if(this.$store.state.hasLogin == false){
				this.mygugu=[]
			}
			this.getGugu();
		},
		data() {
			return {
				subjects: ['数学', '英语', '专业课','政治'],
				learnStyle:['做题', '背单词', '看书', '看视频'],
				team_name: '小程序我们已经鸽了',
				team:{
					"id":'',
					"name":'不孤单'
				},
				members: [],
				mygugu: {},
				gugus: [],
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
			})
		},
		methods: {
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
			showModal5(e) {
				this.modalName = "DialogModal5"
			},
			showModal6(e) {
				this.modalName = "DialogModal6"
			},
			showModal7(e){
				this.modalName = "DialogModal7"
			},
			hideModal(e) {
				this.memberTodoList =[],
				this.modalName = null
			},
			onInput(e) {
				this.$emit('input', e.detail.value)
			},
			getTeam(){
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/get?salt=${this.userinfo['salt']}`,
					success: (res) => {
						console.info(res.data.message)
						if(res.data.success){
							_this.team = res.data.data
						}
					}
				})
			},
			updateTeam(){
				var _this = this;
				uni.request({
					url: `https://www.doaho.work:8080/team/update?salt=${userinfo['salt']}`,
					method:"POST",
					data:{
						"name": _this.team['name']
					},
					success: (res) => {
						console.info(res.data.message)
					}
				})
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
			showGugu(){
				this.showModal6()
				console.info(this.selectedGugu)
			},
			getTeamMemberTodoList() {
				this.showModal5()
				console.info(this.selectedGugu)
				var userid = this.userinfo['id']
				if(this.selectedGugu != -1){
					userid = this.members[0]['guguId']==this.gugus[this.selectedGugu]['id']?this.members[0]['id']:this.members[1]['id']
				}
				
				console.info(userid)
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
				var _food = this.mygugu['food']
				if (this.feetAmount > _food) {
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
								uni.showToast({
									title:res.data.message,
									icon:"none"
								})
							}
						}
					})
					this.hideModal()
				}
				this.feetAmount = 0
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
							_this.getTeam()
							this.hideModal()
							uni.showToast({
								title:'入队成功',
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'队伍不存在',
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
								"name":"不孤单",
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

<style>


</style>
