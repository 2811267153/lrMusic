<template>
	<div id="player" v-if="Object.keys(data).length !=0">
		<audio ref="audio" autoplay @timeupdate="timeupdate" :src="data[0]" @playing="playing"></audio>
		<div class="progress">
			<div class="progress-bar" :style="{ width: value }"></div>
		</div>
		<div class="song-info">
			<div>
				<img :src="data[1].picUrl" id="img" alt="" srcset="" />
				<div class="item">
					<span>{{ data[1].name }}</span>
					<p>
						<span v-for="item in data[1].song.artists" :key="item.name">{{
							item.name
						}}</span>
					</p>
				</div>
			</div>
			<div class="icons">
				<i class="icon iconfont icon-zuo-02"></i>

				<i v-if="player" class="icon iconfont icon-zanting-01"></i>
				<i v-else class="icon iconfont icon-bofang-02"></i>
				<i class="icon iconfont icon-you-02"></i>
			</div>
			<div class="icons fs">
				<i class="icon iconfont icon-yinliang"></i>
				<i class="icon iconfont icon-yinle-07"></i>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'player',
	data() {
		return {
			data: [],
			duration: '00:00',
			currentTime: '00:00',
			value: '',
			player: true,
      platList: []  //播放列表
		};
	},
	mounted() {
		this.$bus.$on('upData', (data) => {
      this.data = data
      this.$refs.audio.pause()
    });
		document.onkeyup = (event) => {
      // key.preventDefault()
			if (event.code === 'Space') {
        event.preventDefault()
				if (this.player === true) {
					this.$refs.audio.pause();
					this.player = false;
				} else {
					this.player = true;
					this.$refs.audio.play();
				}
			}
		};
	},
	methods: {
		timeupdate() {
			this.currentTime = this.$refs.audio.currentTime;
			this.duration = this.$refs.audio.duration;
			this.value = (this.currentTime / this.duration) * 100 + '%';
			console.log(this.$store.state);
		},
    playing(){
      this.player = true
    }
	},
	computed: {
		addPlayList(){
			return this.$store.state.addToPlay
		}
	},
};
</script>

<style scoped>
/* .warp{
  position: fixed;
  bottom: 0;
} */
#player {
	overflow: auto;
	/* position: relative; */
	z-index: 10;
	width: 100%;
	height: 53px;
	background-color: #fff;
	box-shadow: 0 0px 10px #ccc;
}
.progress {
	position: relative;
	top: 0;
	width: 100%;
	height: 3px;
	border-radius: 10px;
	/* position: relative; */
	background-color: #ff7300;
}
.progress .progress-bar {
	position: absolute;
	width: 25%;
	height: 100%;
	border-radius: 10px;
	background-color: #fff;
}
.song-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	margin-top: 6px 0;
}
#img {
	float: left;
	width: 40px;
	height: 40px;
	vertical-align: top;
	border-radius: 5px;
}
.item {
	vertical-align: top;

	margin-left: 10px;
	display: inline-block;
	vertical-align: top;
}
.item span {
	font-size: 14px;
	vertical-align: top;
}
.item p span {
	font-size: 12px;
}
.icons i{
	margin: 0 10px;
	font-size: 28px;
}
.fs i{
	color: #ccc;
	font-size: 18px;
}
</style>
