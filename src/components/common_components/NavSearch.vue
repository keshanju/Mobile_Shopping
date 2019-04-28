<template>
    <div id="app" class="nav_search">
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
    </div>
</template>
<script>
export default {
    name: "NavSearch",
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
    components: {

    },
    methods: {
		search() {
			console.log(this.value);
		},
		search_shows() {
			this.$router.back(-1);
		},
    }
}
</script>
<style lang="less" scoped>

</style>
