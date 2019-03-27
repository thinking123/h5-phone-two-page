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
    import {CHANGE_LOADING_BAR} from "store/mutations";
    import Layout from "@/components/Layout/index";
    import {getOS , isWeiXin ,px2Px , showMsg,getQueryStringParams , navigateTo} from "utils/common";
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

            const {openid,nickname} = getQueryStringParams()
            this.setopenid( openid)
            this.setnickname(nickname)
            if(window.innerHeight < px2Px(667)){
                this.showScroll = true
            }

            // showMsg('loading')
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
            ...mapMutations([CHANGE_LOADING_BAR, 'setLoadingText','setnickname','setopenid']),
            handlePushPage() {

                // createjs.WebAudioPlugin.playEmptySound();
                // this.$router.push({name: 'select'})
                window.location.href = `${window.location.origin}/page2.html`

                navigateTo('page2.html')

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
    /*@import "css/mixin";*/

    .container {
        height: 100%;
        width: 100%;
        position: relative;
        left: 0;

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




</style>
