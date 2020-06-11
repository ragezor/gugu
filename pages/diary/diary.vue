<template>
	<view class=" content">
		<view class="bg-img" style="background-image: url(../../../static/bg_me.png);">
			<cu-custom :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">心情日记</block>
			</cu-custom>
		</view>

		<view class="cu-timeline">
			<view class="cu-time">昨天</view>
			<view class="cu-item text-red" v-for="(item,index) in diarys">
				<view class="content shadow-blur bg-red">
					<view class="cu-avatar round" :style="[{backgroundImage:'url(../../../static/'+ (moods[item.moodId-1]) +'.png)'}]"></view>
					<text style="margin-left: 5px;">{{item.created}}</text>
					<text class="cuIcon-close" style="position: absolute; top: 5px; right: 7px;" @click="deleteDiary(index,item.id)"></text>
					<view style="margin-left: 20px;">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
		<button class="cu-btn cuIcon lg bg-img shadow" style="background-image: url(../../../static/first_newTodo.png)"
		 @click="toMood"></button>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import mood from '@/pages/'
	import { mapState } from "vuex"
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniGrid,
			uniGridItem
		},
		onLoad() {
			this.getDiarys()
		},
		onShow() {
			this.getDiarys()
		},
		computed:mapState({
			userinfo: state => state.userinfo,
		}),
		data() {
			return {
				message: '',
				msgType: '',
				diarys: [],
				moods: [
					"闭嘴",
					"超级开心",
					"大哭",
					"呆住",
					"害怕-1",
					"开心",
					"口罩",
					"哭泣",
					"酷-1",
					"懵B",
					"迷茫",
					"面无表情",
					"魔鬼",
					"难过",
					"难过-1",
					"呕吐",
					"呕吐-1",
					"亲吻-2",
					"生病",
					"生气",
					"受伤",
					"思考",
					"天使",
					"吐舌",
					"笑哭",
					"斜眼",
					"眼红",
					"晕",
					"震惊-1",
					"中毒"
				]
			}
		},
		methods: {
			deleteDiary(index,diaryid){
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							this.diarys.splice(index, 1)
							uni.request({
								url:"https://www.doaho.work:8080/diary/delete?salt="+this.$store.state.userinfo['salt']+'&diaryid='+diaryid,
								success: (res) => {
									if(res.data.success){
										console.info(res.data.message)
									}								
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			toMood(){
				uni.navigateTo({
					url:"./moods/moods",
					
				})
			},
			getDiarys(){
				var _self = this;
				uni.request({
					url: 'https://www.doaho.work:8080/diary/get?salt='+ this.userinfo['salt'], //请求接口
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						console.info(res)
						_self.diarys = res.data.data;
					}
				
				});
			}
		}
	}
</script>


<style>
</style>
