<template>
	<div id="app" class="prograph">
		<!-- 社区消息组件 -->
		<!-- 懒加载  瀑布流-->
		<lazy-component
			class="lazys"
			v-waterfall-lower="loadMore"
			waterfall-disabled="disabled"
			waterfall-offset="300"
		>
			<van-row v-for="(img, index) in imageList" :key="img.id">
				<!-- 头部信息 -->
				<van-row class="col-comm-1">
					<van-col span="2">
						<div class="head">
							<img v-lazy="img" name="adapter" />
						</div>
					</van-col>
					<van-col span="14" class="author">
						<span>热门内容,来自: {{ author[index] }}</span>
					</van-col>
					<!-- 分享 -->
					<van-col span="8" class="share">
						<span @click.stop="pop()">...</span>
					</van-col>
					<!-- 弹出层 -->
					<van-popup
						v-model="show_dot"
						position="bottom"
						:overlay="true"
					>
						<div class="empty">
							<h4 @click="shareT('转发成功 ^_^')">
								{{ shareTitle[0] }}
							</h4>
							<h4 @click="shareT('已送达好友身边 ^_^')">
								{{ shareTitle[1] }}
							</h4>
							<h4 @click="shareT('已取消 ^_^')">
								{{ shareTitle[2] }}
							</h4>
						</div>
					</van-popup>
				</van-row>

				<!-- 内容版块 -->
				<van-col span="16" offset="1" class="lazy-lefts">
					<h4 @click="conTip('获取资源失败了 o(╥﹏╥)o')">
						{{ activeTitle[index] }}
					</h4>
				</van-col>
				<van-col span="6" class="lazy-rights">
					<span>{{ "浏览" + watch[index] + "次" }}</span>
				</van-col>
				<!-- 图片 -->
				<img
					v-lazy="img"
					name="adapter"
					@click="conTip('获取资源失败了 o(╥﹏╥)o')"
				/>

				<van-col span="24" class="lazy-leftp">
					<p @click="conTip('你是不是没流量了 o(╥﹏╥)o')">
						{{ grefContent[index] }}
					</p>
				</van-col>
			</van-row>
		</lazy-component>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Waterfall, Toast } from "vant";
import { component as VueLazyComponent } from "@xunlei/vue-lazy-component";

export default {
	name: "active",
	beforeCreate() {
		this.axios.get("./static/data.json").then(
			res => {
				if (res.status === 200) {
					const data = res.data.home;
					const dataComm = res.data.community;
					this.watch = dataComm.watch;
					switch (this.tabs) {
						case "动态":
							this.active_Title = data.active.tuijian_title;
							this.imageList = data.imageList;
							this.author = dataComm.author;
							this.grefContent = dataComm.grefContent;
							break;
						case "热门":
							this.active_Title = data.active.shishang_title;
							this.imageList = data.shishangImglist;
							this.author = dataComm.author;
							this.grefContent = dataComm.grefContent;
							break;
						case "发现":
							this.active_Title = data.active.meizhuang_title;
							this.imageList = data.meizhuangImglist;
							this.author = dataComm.author;
							this.grefContent = dataComm.grefContent;
							break;
						default:
							break;
					}
				} else {
					this.imageList = this.src;
					this.broad_cast = "暂无消息~~QAQ~";
				}
			},
			() => {
				this.imageList = this.src;
				this.broad_cast = "暂无消息~~QAQ~";
			}
		);
	},
	created() {
		Toast("一起发现更大的世界 ^_^");
	},
	data() {
		return {
			tabarActive: 0,
			value: null,
			active: 0,
			path: "../../static/images/",
			imageList: [],
			active_Title: [],
			watch: null,
			disabled: false,
			broad_cast: null,
			author: [],
			show_dot: false,
			grefContent: null
		};
	},
	props: {
		tabs: {
			type: String,
			required: true,
			default() {
				return {
					tabs: "errTitle"
				};
			}
		}
	},
	components: {
		"lazy-component": VueLazyComponent
	},
	computed: {
		...mapState({
			title: state => state.home.tab.title,
			icon: state => state.home.badge.icon,
			shareTitle: state => state.community.share.title,
			actives: state => state.active.home.title,
			src: state => state.home.lunbo.src,
			activeTitle: state => state.active.home.activeTitle,
			days: state => state.active.home.days,
			broadcast: state => state.home.broadcast,
			shop_info: state => state.home.shop_info,
			my_info: state => state.home.my_info
		}),
		...mapGetters(["bc_notshow"])
	},
	methods: {
		search() {
			console.log(this.value);
		},
		// 瀑布流方法
		loadMore() {
			this.disabled = true;
			setTimeout(() => {
				for (let i = 0; i < 10; i++) {
					this.imageList.push(this.imageList[i]);
					this.author.push(this.author[i]);
					this.active_Title.push(this.active_Title[i]);
					this.watch.push(this.watch[i]);
					this.grefContent.push(this.grefContent[i]);
				}
				this.disabled = false;
			}, 200);
		},
		pop() {
			this.show_dot = true;
		},
		shareT(message) {
			Toast(message);
			this.show_dot = false;
		},
		conTip(message) {
			Toast(message);
		}
	},
	watch: {},
	directives: {
		// 瀑布流
		WaterfallLower: Waterfall("lower")
	}
};
</script>
<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
