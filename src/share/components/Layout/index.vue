<template>
    <div class="layout">
        <index-loading-bar/>
        <music-bar class="music-bar"  :class="{'top':!isShare}"/>
        <router-view></router-view>
        <div class="footer" v-if="!isShare">
            邮储银行微工会特别呈现
        </div>
    </div>
</template>

<script>
    import IndexLoadingBar from "../IndexLoadingBar";
    import MusicBar from "../MusicBar";
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: "Layout",
        components: {MusicBar, IndexLoadingBar},
        computed: {
            ...mapGetters(['isShare' ]),
            musUrl(){
                return `${this.url}yz-music.mp3`
            },
            musicIcon(){
                return `${this.url}yz-music-btn.png`
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .layout{
        width: 100%;
        height: 100%;
        position: relative;

        .music-bar{
            position: absolute;
            top:26px;
            left: 333px;
            z-index: 3000;

            &.top{
                top:10px;
                left: 343px;
            }
        }

        .footer{
            position: absolute;
            /*bottom:4.5%;*/
            top:96.7%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3000;
            letter-spacing: 3px;
            white-space: nowrap;
        }
    }
</style>
