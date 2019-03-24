<template>
    <layout>
        <div class="container"  :class="{'show-scroll':showScroll}">
            <div class="content">
                <img :src="bg" class="img"/>
                <div class="how-to-play" @click="handleShowPlay"/>
                <div class="start-my-music-journey"
                     @click="handlePushPage" />
                <how-to-play-dialog :visible.sync="showHowtoplay"/>

            </div>
        </div>
    </layout>
</template>

<script>
    import {CHANGE_LOADING_BAR} from "./store";
    import Layout from "@/components/Layout/index";
    import {getOS , isWeiXin ,px2Px} from "utils/common";
    import HowToPlayDialog from "./components/HowToPlayDialog/HowToPlayDialog";
    import {mapGetters , mapMutations} from 'vuex'
    const page = 'music-journey-'
    export default {
        name: "App",
        components: {HowToPlayDialog, Layout},
        computed: {
            ...mapGetters(['base' , 'showVideo' , 'openid','headimgurl' , 'nickname']),
            bg() {
                return `${this.base}${page}bg.png`
            }
        },
        data() {
            return {
                showHowtoplay: false,
                showScroll:false
            }
        },

        mounted() {

            if(window.innerHeight < px2Px(667)){
                this.showScroll = true
            }
            // const link = window.location.href.split('#')[0]
            // const imgUrl = `${this.base}music-journey-bg.png`
            //
            // // initShare(link , imgUrl)
            //
            // const that = this
            // if(isWeiXin()){
            //     document.addEventListener("WeixinJSBridgeReady", function (e) {
            //         console.log('WeixinJSBridgeReady init')
            //
            //         that.$sound.load()
            //     }, false);
            // }else{
            //     that.$sound.load()
            // }
        },
        methods: {
            ...mapMutations([CHANGE_LOADING_BAR, 'setLoadingText']),
            async init() {
                try {
                    console.log('headimgurl' , this.headimgurl)
                    // this.CHANGE_LOADING_BAR(true)
                    await this.$music.init()
                } catch (e) {
                    console.log('login error ', e)
                }finally {
                    // this.CHANGE_LOADING_BAR(false)
                }
            },
            touchstart(){
                // createjs.HTMLAudioPlugin.playEmptySound();
            },
            handlePushPage() {

                // createjs.WebAudioPlugin.playEmptySound();
                this.$router.push({name: 'select'})
            },
            handleShowPlay() {
                this.showHowtoplay = true
                console.log("show how to play")
            },
            handleChange() {
                console.log('handleChange')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "css/mixin";

    /*page{*/
    /*height: 100%;*/
    /*width: 100%;*/
    /*}*/

    .video-container{
        position: fixed;
        height: 100%;
        width: 100%;
    }
    .play-video{

        height: 100%;
        width: 100%;
    }
    .video-cs{
        z-index: 100;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    .container {
        height: 100%;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;
        overflow: hidden;

        &.show-scroll{
            overflow-y: auto;
        }
    }

    .content{
        height: 100%;
        width: 100%;
        position: relative;
    }
    .show-scroll > .content{
        height: 667px;
        width: 100%;
        position: relative;
    }

    .img {
        height: 100%;
        width: 100%;
    }

    .how-to-play {
        position: absolute;
        top: 2.4%;
        left: 338px;
        height: 14.09%;
        width: 64px;
        /*border: 1px solid yellow;*/
    }

    .start-my-music-journey {
        position: absolute;
        top: 75.41%;
        left: 50%;
        transform: translateX(-50%);
        height: 9.3%;
        width: 476px;
        /*border: 1px solid yellow;*/
    }

    .skip-button{
        z-index: 10000;
        position: fixed;
        top:32px;
        right:32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        width: 64px;
        height: 64px;
        border-radius: 64px;
        border: 0;
        margin: 0;
        background-color: white;
    }

    .more-arrow{
        position: fixed;
        bottom: 0;
        left:50%;
        transform: translateX(-50%);
        animation: more-arrow 3s linear infinite;
        opacity: 0;
        z-index: 1000;
    }
    @keyframes  more-arrow{
        0%{
            bottom: 0;
            opacity: 0;
        }
        10%{
            bottom: 0;
            opacity: 1;
        }
        90%{
            bottom: 30px;
        }
        100%{
            bottom: 30px;
            opacity: 0;
        }
    }
</style>
