<template>
	<view class="content" style="flex: auto;">
		<view class="bg-img" style="background-image: url(../../../static/bg_me.png);">
			<cu-custom :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">选择心情</block>
			</cu-custom>
		</view>
		<uni-grid :column="5" :highlight="true" @change="change" >
			<uni-grid-item v-for="(item, index) in moods" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;">
					<view style="margin: 10px;">
						<image :src="`../../../static/${item}.png`" class="image" mode="widthFix" />
					</view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<uni-popup ref="popupDialog">
			<uni-popup-dialog mode="input" :title="moods[selectIndex-1]" placeholder="请输入日记内容" @confirm="dialogConfirm" >
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				content:'123',
				selectIndex: '',
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
			change(e) {
				this.selectIndex = e.detail.index+1
				this.toggleMessage()
			},
			toggleMessage() {
				this.$refs.popupDialog.open()
			},
			dialogConfirm(done,value) {
				console.log('点击确认');
				console.info(this.selectIndex)
				this.content = value;
				// 需要执行 done 才能关闭对话框
				this.addDiary()
				done()
			},
			addDiary(){
				const requestTask = uni.request({
				    url: 'https://www.doaho.work:8080/diary/add?salt=a', //仅为示例，并非真实接口地址。
				    method: 'POST',
					data: {
				        'moodId': this.selectIndex,
				        'content': this.content
				    },
				    success: function(res) {
				        console.log(res);
						uni.navigateBack({
							delta:1
						})
				    }
				});
			}
		}
	}
</script>

<style>

</style>
