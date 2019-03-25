<template>
    <layout>
        <div class="container"    :class="{'show-scroll':showScroll}">
            <div class="wrap">
                <img :src="bg" class="img"/>
                <img :src="`${base}${page}footer.png`"
                     class="footer"/>
                <div class="page-wrap"  ref="wrap">
                    <div class="content-wrap">
                        <img :src="`${base}${page}title.png`"
                             class="title"/>
                        <img :src="`${base}${page}border.png`"
                             class="border"/>

                        <img :src="`${base}${page}icon-title.png`"
                             class="icon-title"/>
                        <div class="btn-wrap">
                            <div>
                                <music-btn class="music-btn row1 music-btn1" text="Do"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="do"/>
                                <music-btn class="music-btn row1 music-btn2" text="Re"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="re"/>
                                <music-btn class="music-btn row1 music-btn3" text="Mi"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="mi"/>
                                <music-btn class="music-btn row1 music-btn4" text="Fa"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="fa"/>
                            </div>
                            <div>
                                <music-btn class="music-btn row2 music-btn5" text="Sol"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="sol"/>
                                <music-btn class="music-btn row2 music-btn6" text="La"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="la"/>
                                <music-btn class="music-btn row2 music-btn7" text="Xi"
                                           @touchingend="handleTouchingEnd"
                                           @touching="handleTouching" musicKey="xi"/>
                            </div>
                        </div>

                        <div class="record-btn-wrap">

                            <start-recording-bar class="start-recording-bar" v-if="isRecording"/>
                            <img :src="startBtn"
                                 class="record-btn"
                                 @click="handleRecord"/>
                        </div>


                        <div class="yp-wrap">
                            <img :src="yp"
                                 class="yp"/>
                            <img :src="downIcon"
                                 :class="{ 'taped1':icon1Taped }"
                                 class="icon icon1 "/>
                            <img :src="downIcon"
                                 :class="{ 'taped2':icon2Taped }"
                                 :style="{animationName: (icon2Taped ? 'taped2' : '')}"
                                 class="icon icon2 "/>
                            <img :src="downIcon"
                                 :class="{ 'taped3':icon3Taped }"
                                 :style="{animationName:icon3Taped ? 'taped3' : ''}"
                                 class="icon icon3 "/>
                            <img :src="downIcon"
                                 :class="{ 'taped4':icon4Taped }"
                                 :style="{animationName:icon4Taped ? 'taped4' : ''}"
                                 class="icon icon4 "/>
                            <img :src="downIcon"
                                 :class="{ 'taped5':icon5Taped }"
                                 :style="{animationName:icon5Taped ? 'taped5' : ''}"
                                 class="icon icon5 "/>

                            <img :src="upIcon"
                                 :class="{ 'taped6':icon6Taped }"
                                 :style="{animationName:icon6Taped ? 'taped6' : ''}"
                                 class="icon icon6 "/>
                            <img :src="upIcon"
                                 :class="{ 'taped7':icon7Taped }"
                                 :style="{animationName:icon7Taped ? 'taped7' : ''}"
                                 class="icon icon7 "/>

                        </div>

                        <img :src="pauseBtn"
                             class="stop-btn"
                             v-if="isPlaying"
                             @click="handlePlay"/>
                        <img :src="stopBtn"
                             class="stop-btn"
                             v-else
                             @click="handlePlay"/>


                    </div>

                    <img :src="shareBtn"
                         class="music-person-btn"
                         @click="handleMusicPerson"/>
                </div>

            </div>
        </div>
    </layout>
</template>

<script>
    import Layout from "@/components/Layout/index";
    import {mapGetters, mapMutations} from 'vuex'
    import MusicBtn from "./components/MusicBtn";
    import StartRecordingBar from "./components/StartRecordingBar";
    import {getSignInfo} from "utils/http";
    import {showMsg, getOS, isWeiXin , px2Px,ratioPx} from "utils/common";
    import {initShare} from "utils/wx-config";
    import {CHANGE_LOADING_BAR} from "store/mutations";

    const page = 'rhythm-select-'

    const recordMaxTime = 10

    export default {
        name: "App",
        components: {Layout, StartRecordingBar, MusicBtn},
        computed: {
            ...mapGetters(['base',
                'headimgurl',
                'nickname',
                'openid',
                'do',
                're',
                'mi',
                'fa',
                'sol',
                'la',
                'xi',
            ]),

            style1() {
                return {animationName: this.icon1Taped ? 'taped1' : ''}
            },
            bg() {
                return `${this.base}${page}bg.png`
            },
            startBtn() {
                const btn = this.isRecording ? 'end-record-btn' : 'start-record-btn1'
                return `${this.base}${page}${btn}.png`
            },
            endBtn() {
                return `${this.base}${page}end-record-btn.png`
            },
            pauseBtn() {
                return `${this.base}${page}pause-btn.png`
            },
            stopBtn() {
                return `${this.base}${page}stop-btn.png`
            },
            yp() {
                return `${this.base}${page}yp.png`
            },
            downIcon() {
                return `${this.base}${page}down-icon.png`
            },
            upIcon() {
                return `${this.base}${page}up-icon.png`
            },
            shareBtn() {
                return `${this.base}${page}to-share-btn.png`
            }
        },
        data() {
            return {
                url: this.base,
                isPlaying: false,
                isPlayingAudio: false,

                isRecording: false,
                isRecorded: false,
                //最大录音时间 10s
                remainTime: recordMaxTime,
                //是否点击了音乐按钮
                isPressMusicBtn: false,
                tempFilePath: null,
                icon1Taped: false,
                icon2Taped: false,
                icon3Taped: false,
                icon4Taped: false,
                icon5Taped: false,
                icon6Taped: false,
                icon7Taped: false,

                timeline: [],
                preKey: '',
                page: page,

                isSmall:false,
                isIOS:false,
                showScroll:false
            }
        },
        mounted() {

            if(window.innerHeight < px2Px(667)){
                this.showScroll = true
            }

            const link = window.location.href.split('#')[0]
            const imgUrl = `${this.base}music-journey-bg.png`



            const that = this
            if (isWeiXin()) {
                document.addEventListener("WeixinJSBridgeReady", function (e) {
                    console.log('WeixinJSBridgeReady init')

                    that.$sound.load()
                }, false);
            } else {
                that.$sound.load()
            }

        },
        methods: {
            ...mapMutations([CHANGE_LOADING_BAR, 'setLoadingText', 'settimeline']),

            handleClick() {
                this.playMusic('do')
            },
            async handleRecord(e) {
                if (this.isRecording) {
                    await this.stopRecord()
                } else {
                    this.stopaudio()
                    await this.stopPlayRecord()
                    this.startRecord()
                }
            },
            stopaudio() {
                console.log('stopaudio')
                this.$sound.stop()
            },
            handlePlay(e) {
                if (!this.hadRecord()) {
                    this.showModal('请先去录制')
                    return
                }

                if (this.isPlaying) {
                    this.stopPlayRecord()
                } else {
                    this.stopaudio()
                    this.startPlayRecord()
                }
            },
            handleMusicPerson(e) {
                if (!this.hadRecord()) {
                    this.showModal('请先去录制')
                    return
                }


                this.settimeline(this.timeline)


                try{
                    const t = JSON.stringify(this.timeline)
                    // console.log('this.headimgurl' , this.headimgurl)
                    localStorage.setItem('timeline' , t)
                    localStorage.setItem('name' , this.nickname)
                    // localStorage.setItem('head' , this.headimgurl)
                    localStorage.setItem('openid' , this.openid)
                }catch (e) {
                    console.error('保存缓存失败' , e)
                }


                // const r = window.location.href.split('#')[0] + '#/share'
                //
                // console.log('replace index' , r)
                // window.location.push({
                //     name:'share'
                // })

                this.$router.push({
                    name: 'share'
                })
            },
            handleTouchingEnd(e) {
                console.log('handleTouchingEnd' , e)
                const key = e
                switch (key) {
                    case 'do':
                        this.icon1Taped = false

                        break
                    case 're':
                        this.icon2Taped = false
                        break
                    case 'mi':
                        this.icon3Taped = false
                        break
                    case 'fa':
                        this.icon4Taped = false
                        break
                    case 'sol':
                        this.icon5Taped = false
                        break
                    case 'la':
                        this.icon6Taped = false
                        break
                    case 'xi':
                        this.icon7Taped = false
                        break
                }



                // this.stopaudio()
            },
            handleTouching(e, notPlay = false) {
                const key = e


                if (this.isRecording) {
                    this.timeline.push({
                        key: key,
                        time: (this.getTime() - this.startTime)
                    })

                    console.log('lenght', this.timeline.length)
                }
                const timeout = 250
                console.log('handleTouching' , e)
                switch (key) {
                    case 'do':
                        this.icon1Taped = true

                        this.isPlaying && setTimeout(() => {
                            this.icon1Taped = false

                        }, timeout)
                        break
                    case 're':
                        this.icon2Taped = true
                        this.isPlaying && setTimeout(() => {
                            this.icon2Taped = false
                        }, timeout)
                        break
                    case 'mi':
                        this.icon3Taped = true
                        this.isPlaying && setTimeout(() => {
                            this.icon3Taped = false
                        }, timeout)
                        break
                    case 'fa':
                        this.icon4Taped = true
                        this.isPlaying && setTimeout(() => {
                            this.icon4Taped = false
                        }, timeout)
                        break
                    case 'sol':
                        this.icon5Taped = true
                        this.isPlaying && setTimeout(() => {
                            this.icon5Taped = false
                        }, timeout)
                        break
                    case 'la':
                        this.icon6Taped = true
                        this.isPlaying && setTimeout(() => {
                            this.icon6Taped = false
                        }, timeout)
                        break
                    case 'xi':
                        this.isPlaying && setTimeout(() => {
                            this.icon7Taped = false
                        }, timeout)
                        this.icon7Taped = true
                        break
                }
                this.isPressMusicBtn = true
                this.playMusic(key)

            },
            startPlayRecord() {
                this.isPlaying = true
                this.startTime = this.getTime()
                this.cloneTimeline = [...this.timeline]
                let endTime = this.cloneTimeline.pop()
                console.log('timeline len :', this.cloneTimeline.length)
                this.playRecordTime = setInterval(() => {
                    const offTime = this.getTime() - this.startTime

                    if (offTime + 50 > endTime.time) {
                        if (this.playRecordTime) {
                            clearInterval(this.playRecordTime)
                            this.playRecordTime = null
                        }
                        console.log('timeline len endh offtime')
                        //end
                        this.isPlaying = false
                    }
                    if (!this.isPlaying) {
                        if (this.playRecordTime) {
                            clearInterval(this.playRecordTime)
                            this.playRecordTime = null
                        }
                        console.log('stop play music in timeline')
                        return
                    }
                    if (this.cloneTimeline.length > 0) {
                        const cur = this.cloneTimeline[0]
                        // console.log('offTime', offTime, cur)
                        if (cur.time > offTime - 30 && cur.time < offTime + 30) {
                            this.handleTouching(cur.key)
                            // this.preKey = cur.key
                            this.cloneTimeline.shift()
                            console.log('get key', cur.key)
                        }
                    } else {
                        console.log('timeline len end', this.cloneTimeline.length)
                    }
                }, 20)
            },
            stopPlayRecord() {
                this.isPlaying = false
                clearInterval(this.playRecordTime)
            },
            getTime() {
                const d = new Date()
                const t = d.getTime();
                return t
            },
            hadRecord() {
                return this.isRecorded
            },
            async startRecord() {
                console.log('开始录音')
                this.startTime = this.getTime()
                this.timeline = []
                this.isPlaying = false
                this.isPlayingAudio = false
                this.isRecording = true
                this.isPressMusicBtn = false
                this.tempFilePath = null
                this.remainTime = recordMaxTime
                this.isRecorded = false

                this.time = setInterval(() => {
                    const remain = --this.remainTime
                    console.log('remain', remain)
                    this.remainTime = remain

                    if (remain <= 0) {
                        this.stopRecord()
                    }
                }, 1000)
            },
            async stopRecord() {

                console.log('stopRecord')
                if (this.time) {
                    clearInterval(this.time)
                    this.time = null
                }

                this.timeline.push({
                    key: 'end',
                    time: (this.getTime() - this.startTime)
                })
                // const tempFilePath = await wx_stopRecord()
                const tempFilePath = 'tempFilePath'
                this.isRecording = false
                this.tempFilePath = tempFilePath
                this.isRecorded = this.isPressMusicBtn
            },
            async playMusic(key) {
                this.$sound.play(key)
            },
            showModal(msg, title = '') {
                showMsg(msg)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "css/variables";
    .to-share {
        z-index: 10000;
        position: fixed;
        top: 32px;
        right: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        width: 64px;
        height: 64px;
        border-radius: 64px;
        border: 0;
        margin: 0;
    }

    .container {
        height: 100%;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;

        &.show-scroll{
            overflow-y: auto;
        }

    }
    .wrap{
        height: 100%;
        width: 100%;
        position: absolute;
        margin: 0;
        padding: 0;
        left:0;
        top:0;
    }

    .show-scroll > .wrap{
        height: 667px;
        width: 100%;
        position: relative;
    }

    .container.is-ios{
        overflow-y: auto;

        height: 100%;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;
    }
    .container.is-ios > .wrap{
        height: px(667);
        width: 100%;
        position: absolute;
        margin: 0;
        padding: 0;
        left:0;
        top:0;
    }
    /*.container > view {*/
    /*background-color: yellow;*/
    /*}*/
    .img {
        height: 100%;
        width: 100%;
    }


    /*
    H :90 px
    iconH:56 px

    top:442
    */
    .icon {
        position: relative;
        height: px(454-426);
        width: 10px;
        transition: transform 0.25s ease-in-out;
        margin: 0 px(5);
    }


    $step: 2;
    $start: 441-426;
    .icon1 {
        top: px($start);
        margin-left: px(130-84);

    }


    .icon2 {
        top: px($start - $step);
    }

    .icon3 {
        top: px($start - $step * 2);
    }

    .icon4 {
        top: px($start - $step * 3);
    }

    .icon5 {
        top: px($start - $step * 4);
    }

    .icon6 {
        top: px($start);
    }

    .icon7 {
        top: px($start - $step);
    }

    .down-icon-taped {
        /*animation: taped 0.3s ease-in  alternate;*/
        /*animation-name: taped1;*/

    }


    $offset: 10;
    .taped1 {
        top: px($start + $offset);
    }

    @keyframes taped1 {
        0% {
            top: px($start);
        }
        100% {
            top: px($start + $offset);
        }
    }

    .taped2 {
        top: px($start - $step + $offset);
    }

    @keyframes taped2 {
        0% {
            top: 65.82%;
        }
        100% {
            top: 64.82%;
        }
    }

    .taped3 {
        top: px($start - $step * 2 + $offset);
    }

    @keyframes taped3 {
        0% {
            top: 65.37%;
        }
        100% {
            top: 64.37%;
        }
    }

    .taped4 {
        top: px($start - $step * 3 + $offset);
    }

    @keyframes taped4 {
        0% {
            top: 64.92%;
        }
        100% {
            top: 63.92%;
        }
    }

    .taped5 {
        top: px($start - $step * 4 + $offset);
    }

    @keyframes taped5 {
        0% {
            top: 64.67%;
        }
        100% {
            top: 63.67%;
        }
    }

    .taped6 {
        top: px($start - $offset);
    }

    @keyframes taped6 {
        0% {
            top: 65.82%;
        }
        100% {
            top: 66.82%;
        }
    }

    .taped7 {
        top: px($start - $step - $offset);
    }

    @keyframes taped7 {
        0% {
            top: 65.37%;
        }
        100% {
            top: 66.37%;
        }
    }

    .yp-wrap.music {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .btn-middle {
        position: absolute;
        height: 5.1%;
        width: 208px;
    }


    .save-btn {
        top: 75.26%;
        left: 386px;
    }


    .re-record-btn {
        position: absolute;
        height: 3.75%;
        width: 184px;
        top: 47.38%;
        left: 280px;
    }

    .music {
        position: absolute;
        top: 66.27%;
        height: 7.95%;
        width: 394px;
        left: 50%;
        transform: translateX(-50%);
    }


    .select-bar {
        position: absolute;
        height: 6px;
        width: 148px;
        top: 38.23%;
        background-color: white;
    }


    .dev {
        position: absolute;
        width: 146px;
        height: 3.6%;
        top: 38.98%;
        /*background-color: gold;*/
    }

    .dev1 {
        left: 136px;
    }

    .dev2 {
        left: 300px;
    }

    .dev3 {
        left: 460px;
    }

    .upload-my-music {
        position: absolute;
        height: 7.2%;
        width: 336px;
        top: 82.91%;
        left: 206px;
    }


    .music-btn {
        /*z-index: 100;*/
        /*position: absolute;*/
        /*height: 7.8%;*/
        width: 48px;
        height: 100%;
        /*background-size: 100% 100%;*/
        /*background-repeat: no-repeat;*/
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*font-weight: bold;*/
        /*color: #0094FF;*/
        /*font-size: 50px;*/
    }


    /*.music-btn1 {*/
    /*left: 160px;*/
    /*}*/

    /*.music-btn5 {*/
    /*left: 216px;*/
    /*}*/

    /*.music-btn2 {*/
    /*left: 270px;*/
    /*}*/

    /*.music-btn6 {*/
    /*left: 324px;*/
    /*}*/

    /*.music-btn3 {*/
    /*left: 380px;*/
    /*}*/

    /*.music-btn7 {*/
    /*left: 436px;*/
    /*}*/

    /*.music-btn4, .music-btn8 {*/
    /*left: 490px;*/
    /*}*/


    .page-wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        width: px(334-41);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;

        &.small{
            top:0;
            transform: translate(-50%, 0);
        }
        /*border: 1px solid yellow;*/
        .content-wrap {
            @include posRel(41, 64, 334, 567, 0);
            display: flex;
            flex-direction: column;
            align-items: center;


            $top: 64;

            .title {
                @include posRel(71, 64, 312, 206);

            }

            .border {
                position: absolute;
                top: px(163-64);
                @include getSize(71, 163, 334, 567);
                width: 100%;
            }

            .icon-title {
                @include posRel(89, 215, 285, 246, 8);
            }

            .btn-wrap {
                @include posRel(0, 260, 374, 374, 260-247);
                width: 100%;

                display: flex;
                flex-direction: column;

                > div {
                    /*flex: 1;*/
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }

                &:first-child {
                    margin-bottom: 8px;
                }
            }

            .record-btn-wrap {
                @include posRel(137, 385, 242, 422, 385-374);

                .record-btn {
                    width: 100%;
                    height: 100%;
                }

                .start-recording-bar {
                    position: absolute;
                    /*height: 7.2%;*/
                    /*width: 336px;*/
                    top: 50%;
                    transform: translateY(-50%);
                    left: px(152-137);
                }
            }

            .yp-wrap {
                @include posRel(84, 426, 292, 473, 426-422);
                /*border: 1px solid red;*/

                display: flex;
                flex-direction: row;
                align-items: flex-start;

                .yp {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            }


            .stop-btn {
                @include posRel(136, 485, 239, 521, 485-473);
            }


        }

        .music-person-btn {
            @include posRel(88, 566, 284, 621, 569-563);

        }
    }

    .footer {
        @include posCenterLeft(50, 636, 327, 658);
        top: auto;
        bottom: px(667-658);

    }

    .is-ios  .footer{

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