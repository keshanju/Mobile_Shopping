<template>
	<div id="sech">
		<!-- 搜索区 -->
		<van-row gutter="20" class="row-1">
			<van-col span="4" class="cols">
				<a href="javaScript:void(0);" @click.prevent="search_shows">{{"&lt;"}}</a>
			</van-col>
			<van-col span="16" class="cols">
				<form action="/">
					<van-search class="search" v-model="value" style="height: 40px;border-radius: 25px;backaground-color: #FFF" placeholder="大家在搜索：衣服" @keydown.enter.prevent="search" @keydown.stop="keyboradWatch"/>
				</form>
			</van-col>
			<van-col span="4" class="cols">
				<van-icon
					name="qr"
					class="classfic"
					@click="redirects('/about')"
				/>
			</van-col>
		</van-row>

		<!-- 搜索区域 -->
		<div class="prevshow">
			<div v-show="show_dot">
				<van-row class="row-2">
					<van-col span="5">热门搜索</van-col>
				</van-row>
				<van-row class="row-2 row-content">
					<van-col span="4" offset="2" class="bord">羽绒服</van-col>
					<van-col span="4" offset="1" class="bord">围巾</van-col>
					<van-col span="4" offset="1" class="bord">面膜</van-col>
					<van-col span="4" offset="1" class="bord">护肤</van-col>
				</van-row>

				<van-row class="row-2 row-content">
					<van-col span="4" offset="2" class="bord">大衣</van-col>
					<van-col span="4" offset="1" class="bord">女靴</van-col>
					<van-col span="4" offset="1" class="bord">口红</van-col>
				</van-row>
			</div>

			<div v-show="s_show">
				<div class="val">
					<span>
						{{ value }}
						<van-icon name="search" class="icons" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
	name: "search",
	beforeCreate() {
		this.axios.get("./static/data.json").then(
			res => {
				if (res.status == 200) {
					const data = res.data.home;
					this.broad_cast = data.broad_cast;
				} else {
					this.imageList = this.src;
					this.broad_cast = "暂无消息~~QAQ~";
				}
			},
			err => {
				this.imageList = this.src;
				this.broadcast = "暂无消息~~QAQ~";
			}
		);
	},
	created() {
		console.log(this.show, this.search_show);
	},
	data() {
		return {
			tabarActive: 0,
			value: null,
			active: 0,
			path: "../../static/images/",
			imageList: [],
			active_Title: null,
			days_dot: null,
			disabled: false,
			broad_cast: null,
			show_dot: true,
			s_show: false
		};
	},
	computed: {
		...mapState({
			title: state => state.home.tab.title,
			icon: state => state.home.badge.icon,
			bageTitle: state => state.home.badge.title,
			actives: state => state.active.home.title,
			src: state => state.home.lunbo.src,
			activeTitle: state => state.active.home.activeTitle,
			days: state => state.active.home.days,
			broadcast: state => state.home.broadcast,
			shop_info: state => state.home.shop_info,
			my_info: state => state.home.my_info,
			show: state => state.home.show,
			sshow: state => state.home.sshow
		}),
		...mapGetters(["bc_notshow"])
	},
	methods: {
		search() {
			console.log(this.value);
		},
		search_shows() {
			this.$router.back(-1);
		},
		keyboradWatch() {
			this.value == "" || this.value == null
				? (this.show_dot = true)
				: (this.show_dot = false);
			this.value == "" || this.value == null
				? (this.s_show = false)
				: (this.s_show = true);
		},
		...mapActions(["searchA"]),
		// 瀑布流方法
		loadMore() {
			this.disabled = true;
			setTimeout(() => {
				for (let i = 0; i < 5; i++) {
					this.imageList.push(this.imageList[i]);
					this.active_Title.push(this.active_Title[i]);
					this.days_dot.push(this.days_dot[i]);
				}
				this.disabled = false;
			}, 200);
		},
		redirects(url) {
			this.$router.push(url);
		}
	},
	watch: {},
	directives: {}
};
</script>

<style lang="less" scoped>
@import url("../assets/css/search.less");
</style>

