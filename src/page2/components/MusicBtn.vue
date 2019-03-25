<template>
    <div class="music-btn"
    >
        <img :src="`${base}${page}${key}.png`"
             @touchstart="touchstart"
             @touchend="touchend"/>
    </div>

</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    const page = 'rhythm-select-'
    export default {

        name: "MusicBtn",
        props: {
            text: String,
            musicKey: String,
        },
        computed: {
            ...mapGetters(['base']),
            key(){
                return this.text.charAt(0).toUpperCase() +  this.text.slice(1);
            }
        },
        data(){
            return {
                page:page
            }
        },
        methods: {
            touchstart(e) {

                // this.setData({
                //     pressing: true
                // })
                // createjs.WebAudioPlugin.playEmptySound();
                console.log('touchstart')
                this.pressing = true
                this.$emit('touching', this.musicKey)
                // this.time = setInterval(() => {
                //     // console.log('开始按钮')
                //     this.$emit('touching', this.musicKey)
                // }, 300)

                // console.log('开始按钮')


                //禁止长按弹出菜单
                // e.preventDefault()
            },
            touchend(e) {
                console.log('touchend')
                this.$emit('touchingend', this.musicKey)

                // this.setData({
                //     pressing: false
                // })
                this.pressing = false
                // clearInterval(this.time)
                // this.time = null
                // console.log('结束按钮')
            }
        },
        mounted(){
            document.body.addEventListener('touchend' , this.handleEnd)
        },
        beforeDestroy(){
            // clearInterval(this.time)
            // this.time = null
            document.body.removeEventListener('touchend' , this.handleEnd)
            // console.log('beforeDestroy press')
        }

    }
</script>

<style scoped lang="scss">



    @font-face {
        font-family: 'MusicFont1';
        src: url('https://cdnpepsi.ysmine.com/music-font.ttf');
    }
    .music-btn {
        /*pointer-events: none;*/
        /*user-select: none;*/
        /*z-index: 100;*/
        /*font-family: MusicFont1 !important;*/
        /*position: absolute;*/
        /*height: 7.8%;*/
        width: 48px;
        /*background-image: url("./btn-wrap.png");*/
        /*background-size: 100% 100%;*/
        /*background-repeat: no-repeat;*/
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #0094FF;
        font-size: 25px;

        margin: 0 2px;
        >img{
            width: 100%;
            height: 100%;
        }
    }
</style>
