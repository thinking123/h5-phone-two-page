<template>
    <layout>
        <div class="container" ref="rhythmShare"  :class="{'show-scroll':showScroll}">
            <div class="wrap" v-show="!showPreview">

                <avatar class="avatar" v-if="!isFromShare"/>
                <img :src="bg" class="img"/>


                <img :src="`${base}rhythm-share6-content.png`"
                     v-if="rand == 6"
                     class="img6-content"/>
                <img :src="`${base}rhythm-share6-text.png`"
                     v-if="rand == 6"
                     class="img6-text"/>

                <move-arrow class="arrow"/>

                <img :src="textIcon1"
                     ref="icon1"
                     class="icon-tip"
                     v-if="showIcon1"
                     :class="[`text${rand}-icon1`]"/>
                <img :src="textIcon2"
                     v-if="showIcon2 && rand != 2"
                     class="icon-tip"
                     ref="icon2"
                     :class="[`text${rand}-icon2`]"/>

                <img :src="textIcon1"
                     class="icon-tip"
                     v-if="showIcon1 && rand != 6 && rand != 1  && rand != 2"
                     ref="icon3"
                     :class="[`text${rand}-icon3`]"/>
                <img :src="textIcon2"
                     class="icon-tip"
                     v-if="showIcon2 && rand != 6 && rand != 1 && rand != 2 && rand != 5"
                     ref="icon4"
                     :class="[`text${rand}-icon4`]"/>
                <!--<share-music-playing-bar class="share-music-playing-bar" v-if="isPlaying"/>-->

                <icon3 class="icon3-com" v-if="rand == 3"/>

                <img :src="`${baseUrl}pause-btn.png`"
                     @click="handlePlay"
                     :class="{'btm6':rand == 6 }"
                     class="pause-btn btm img-btn btm6" v-if="isPlaying"/>
                <img :src="`${baseUrl}play-btn.png`"
                     @click="handlePlay"
                     :class="{'btm6':rand == 6 }"
                     class="pause-btn btm  img-btn btm6" v-else/>
                <img :src="`${baseUrl}download-btn.png`"
                     v-if="!isFromShare"
                     @click="handleDownloadImage"
                     :class="{'btm6':rand == 6 }"
                     class="download-btn btm  img-btn btm6"/>
                <img :src="`${baseUrl}try-play-btn.png`"
                     v-if="isFromShare"
                     :class="{'btm6':rand == 6 }"
                     @click="handleGoToHome"
                     class="try-play-btn btm btm6"/>
                <img :src="`${baseUrl}qr-code.jpg`"
                     class="qr-code btm btm6"/>
            </div>


            <div id="preview" class="preview"
                 @click="handlePreview" v-show="showPreview">


            </div>


        </div>
    </layout>

</template>

<script>

    import {showMsg, getRandomInt, isWeiXin,px2Px } from "utils/common";
    import {mapGetters, mapMutations} from 'vuex'
    import {CHANGE_LOADING_BAR} from "store/mutations";
    import {getSignInfo, uploadRecord, getAvater} from "utils/http";
    import {initShare} from "utils/wx-config";
    import MoveArrow from "./components/MoveArrow";
    import Avatar from "./components/avatar";
    import Icon3 from "./components/Icon3";
    import Layout from "@/components/Layout/index";

    const page = 'rhythm-share-'
    export default {
        name: "rhythm-share",
        components: {Layout, Icon3, Avatar, MoveArrow},
        computed: {
            ...mapGetters(['base', 'headimgurl', 'nickname', 'openid', 'timeline']),
            baseUrl() {
                console.log('url', `${this.base}${page}`)
                return `${this.base}${page}`
            },
            playingIcon() {
                return `${this.base}${page}playing.png`
            },
            playIcon() {
                return `${this.base}${page}play.png`
            },
            textIcon1() {
                return `${this.base}${page}text${this.rand}-icon1.png`
            },
            textIcon2() {
                if (this.rand == 5) {
                    return `${this.base}${page}text${this.rand}-icon1.png`
                }
                return `${this.base}${page}text${this.rand}-icon2.png`
            },
            showIcon1() {
                return this.rand != 3
            },
            showIcon2() {

                return this.rand == 1 || this.rand == 4 || this.rand == 5 || this.rand == 6
            }
        },
        data() {
            return {
                url: this.base,
                isPlaying: false,
                shareBg: '',
                bg: '',
                rand: 1,
                isFromShare: false,
                recordId: '',
                imgStr: '',
                isSaveImage: false,
                showPreview: false,
                recordurl: '',
                isIOS:false,
                showScroll:false
                // page:page

            }
        },
        mounted(option) {

            if(window.innerHeight < px2Px(667)){
                this.showScroll = true
            }

            const u = navigator.userAgent;
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            this.isIOS = isIOS
            const that = this
            if (isWeiXin()) {
                document.addEventListener("WeixinJSBridgeReady", function (e) {
                    console.log('WeixinJSBridgeReady init')
                    that.$sound.load()
                }, false);
            } else {
                that.$sound.load()
            }


            this.init()
        },
        methods: {
            async getWeChatUserHeadImg(picurl) {

                return new Promise((res, rej) => {
                    try {
                        let img = new Image()
                        let canvas = document.createElement('CANVAS')
                        let ctx = canvas.getContext('2d')
                        img.crossOrigin = 'Anonymous'
                        img.onload = function () {
                            console.log('getWeChatUserHeadImg')
                            canvas.height = img.height
                            canvas.width = img.width
                            ctx.drawImage(img, 0, 0)
                            var dataURL = canvas.toDataURL('image/png')
                            console.log('dataURL', dataURL)
                            canvas = null

                            const resImg = new Image()
                            resImg.src = dataURL

                            res(resImg)
                        }
                        img.src = picurl
                    } catch (e) {
                        rej(e)
                    }

                })

            },
            handlePreview() {
                console.log('handlePreview')
                this.showPreview = false
            },
            downLoadImage() {
                console.log('downLoadImage')
                loadImage(this.headimgurl, img => {
                    console.log('downLoadImage img', img)
                    this.imgStr = img
                })
            },
            ...mapMutations([CHANGE_LOADING_BAR, 'setLoadingText', 'settimeline', 'setheadimgurl', 'setnickname', 'setopenid']),
            async init() {
                try {
                    let {id, rand} = this.$route.query

                    this.isFromShare = !!rand
                    this.rand = this.isFromShare ? rand : getRandomInt(1, 6)

                    // this.rand = 6

                    this.bg = `${this.base}${page}bg${this.rand}.png`
                    this.shareBg = `${this.base}${page}bg${this.rand}.png`

                    this.drawImage = `${this.base}${page}draw${this.rand}.png`

                    if (!this.isFromShare && (!this.timeline || this.timeline.length == 0)) {
                        try {
                            console.log('从缓存拿数据')
                            const t = JSON.parse(localStorage.getItem('timeline'))
                            console.log(t)
                            this.settimeline(t)
                            const name = localStorage.getItem('name')
                            console.log(name)
                            this.setnickname(name)
                            // const head = localStorage.getItem('head')
                            // console.log(head)
                            // this.setheadimgurl(head)

                            const openid = localStorage.getItem('openid')
                            console.log(openid)
                            this.setopenid(openid)
                        } catch (e) {
                            console.error('获取缓存失败', e)
                        }

                    }
// return
                    this.CHANGE_LOADING_BAR(true)
                    this.setLoadingText('设置分享...')

                    if (this.isFromShare) {
                        //从分享进来，从服务器拿分享的录音视频链接
                        let {musicUrl, userHead, userName} = await getAvater(id)

                        console.log('origin : ', musicUrl, userHead)
                        const base64 = 'data:image/jpg;base64,'
                        let head = base64 + userHead
                        // musicUrl = musicUrl.substring(1, musicUrl.length-1)
                        console.log('head', head)
                        this.setheadimgurl(head)
                        this.setnickname(userName)
                        const t = JSON.parse(musicUrl)


                        console.log('json', t)

                        this.settimeline(t)


                    } else {
                        const timeline = JSON.stringify(this.timeline)
                        console.log('start uplaod' , timeline , this.openid)
                        const res = await uploadRecord(this.openid, timeline)
                        console.log('return upload', res)
                        id = res.id

                        const base64 = 'data:image/jpg;base64,'
                        let head = res.userHead
                        head = base64 + res.userHead

                        this.setnickname(res.userName)
                        this.setheadimgurl(head)
                    }

                    let link = window.location.href.split('?')[0]
                    //分享link强制?#模式，否则android会截断?后的query
                    link = link.replace('#', '?#')
                    link = `${link}?id=${id}&rand=${this.rand}`

                    const imgUrl = this.shareBg

                    await initShare(link, imgUrl)

                } catch (e) {
                    console.log('error ', e)
                } finally {
                    this.CHANGE_LOADING_BAR(false)



                }
            },
            getTime() {
                const d = new Date()
                const t = d.getTime();
                // console.log('time' , t)
                return t
            },
            stopPlayRecord() {
                this.isPlaying = false
                clearInterval(this.playRecordTime)
            },
            async playMusic(key) {
                this.$sound.play(key)
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
                            this.playMusic(cur.key)
                            // this.preKey = cur.key
                            this.cloneTimeline.shift()
                            console.log('get key', cur.key)
                        }
                    } else {
                        console.log('timeline len end', this.cloneTimeline.length)
                    }
                }, 20)
            },
            stopaudio() {
                if (this.isPlayingAudio && this.curAudio) {
                    this.curAudio.pause();
                    this.curAudio.currentTime = 0;
                    this.isPlayingAudio = false
                    this.curAudio = null
                }

            },
            handlePlay(e) {
                console.log('handlePlay')
                if (this.isPlaying) {
                    console.log('this.tempFilePath stopPlayRecord')
                    this.stopPlayRecord()
                    // wx_stopPlayRecord(this.tempFilePath)
                } else {
                    this.stopaudio()
                    this.startPlayRecord()
                    console.log('this.tempFilePath startPlayRecord')
                }
            },

            async getOrignImage(src) {
                return new Promise((res, rej) => {
                    const img = new Image()
                    img.onload = () => {
                        res(img)
                    }
                    img.src = src
                })

            },
            async getImage(url) {
                return new Promise((res, rej) => {
                    loadImage(url, img => {
                        if (img.type === 'error') {
                            console.log('error img loadImage', url)
                            rej('error img')
                        } else {
                            res(img)

                        }
                    }, {
                        crossOrigin: "Anonymous"
                    })

                })


            },
            handleDownloadImage() {
                console.log('screenShot')
                try {
                    // this.isSaveImage = true
                    // this.$nextTick(() => {
                    //     this.screenShot()
                    // })
                    this.screenShot()
                } catch (e) {
                    console.log('screenShot', e)
                } finally {
                    // this.isSaveImage = false
                }

            },
            setupCanvas(w, h) {
                if(this.isIOS){
                    const  can = document.createElement("canvas");
                    can.width = w;
                    can.height = h;

                    // can.style.width = w + "px";
                    // can.style.height = h + "px";
                    return can
                }
                const PIXEL_RATIO = (function () {
                    const ctx = document.createElement("canvas").getContext("2d"),
                        dpr = window.devicePixelRatio || 1,
                        bsr = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;

                    return dpr / bsr;
                })();

                const ratio = PIXEL_RATIO;
                const can = document.createElement("canvas");
                // if(this.isIOS){
                //     can.width = w;
                //     can.height = h;
                //     // can.style.width = w + "px";
                //     // can.style.height = h + "px";
                //     return can
                // }
                can.width = w * ratio;
                can.height = h * ratio;
                can.style.width = w + "px";
                can.style.height = h + "px";
                can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
                return can;

            },
            async screenShot() {

                const that = this
                function rem(p) {
                    // if(that.isIOS){
                    //     return p
                    // }
                    const pxTorem = window.innerWidth / 10
                    const px = 37.5
                    return pxTorem * p / px
                }

                try {

                    let w , h
                    w = rem(375) , h = rem(667)

                    // if(this.isIOS){
                    //     w = window.innerWidth
                    //     h = window.innerHeight
                    // }
                    console.log('w ' , w , ' h ' , h)
                    const canvas = this.setupCanvas(w, h)
                    const ctx = canvas.getContext('2d')

                    const bg = await this.getImage(this.drawImage)
                    console.log(this.drawImage , 'bg' , bg)
                    ctx.drawImage(bg, 0, 0, w, h)


                    console.log('drawImage beginPath')
                    ctx.save()
                    ctx.beginPath();
                    ctx.arc(rem(43) + rem(25) / 2,
                        rem(30) + rem(25) / 2,
                        rem(25) / 2, 0,
                        Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    const head = await this.getOrignImage(this.headimgurl)
                    if(!this.headimgurl){
                        console.log('not head img')
                    }
                    console.log('head' , head)
                    ctx.drawImage(head,
                        rem(43),
                        rem(30),
                        rem(25),
                        rem(25))

                    ctx.restore();

                    ctx.save()
                    ctx.fillStyle = 'white'
                    ctx.textBaseline = 'middle'
                    ctx.font = `${rem(18)}px -apple-system-font, Helvetica Neue, sans-serif`;
                    ctx.fillText(this.nickname, rem(72), rem(45))
                    ctx.restore();

                    // let qr = `${this.baseUrl}qr-code.png`
                    // qr = await this.getImage(qr)
                    //
                    // const top = 556/667 * window.innerHeight
                    // ctx.drawImage(qr ,
                    //     rem(278),
                    //     top ,
                    //     rem(62) ,
                    //     rem(62))



                    this.showPreview = true
                    // setTimeout(()=>{
                    //
                    // } , 200)
                    this.$nextTick(() => {

                        const res = canvas.toDataURL('image/png')
                        console.log('res' , res)
                        const img = new Image()

                        img.src = res
                        this.isSaveImage = false
                        // img.width = window.innerWidth
                        // img.height = window.innerHeight
                        img.style.height = '100%';
                        img.style.width = '100%';
                        const preview = document.getElementById('preview')

                        while (preview.firstChild) {
                            preview.removeChild(preview.firstChild);
                        }

                        console.log('preview' , preview)
                        preview.append(img)
                    })


                } catch (e) {
                    console.error(e)
                } finally {
                    this.isSaveImage = false
                }

            },
            handleGoToHome() {
                // if(!this.isFromShare){
                //     this.$router.back()
                // }
                window.location.replace(window.location.origin)
                // window.location.href = 'http://bsxyzqy.ysmine.com/login/api/login/htmllogin'
                // this.$router.replace({name:'video'})
                // const r = window.location.origin
                // // const r = window.location.href.replace(/#[/].*/ , '#/video')
                // console.log('goto r' , r)
                // // alert(r)
                // window.location.href = r
            }
        },
        beforeRouteEnter(to, from, next) {
            next()
        },
        beforeRouteUpdate(to, from, next) {
            next()
        },
        async beforeRouteLeave(to, from, next) {

            try {
                // createjs.Sound.removeAllSounds();
                console.log('cleanr sounds')
                clearInterval(this.playRecordTime)
                this.playRecordTime = null


            } catch (e) {
                console.error('beforeRouteLeave', e)
            } finally {
                if(to.fullPath && to.fullPath.indexOf('video') > -1){
                    next({name:'select' , redirect:true})
                }else{
                    next()
                }
            }


        }
    }
</script>

<style scoped lang="scss">


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


    .show-scroll > .preview{
        position: absolute;
        width: 100%;
        height: 667px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
    }
    .preview {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
    }

    .avatar {
        position: absolute;
        top: 30px;
        left: 43px;
    }

    .canvas {
        display: none;
    }

    .container {
        height: 100%;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        &.show-scroll{
            overflow-y: auto;
        }
        /*>div{*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*}*/
    }

    .wrap{
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .show-scroll > .wrap{
        height: 667px;
        width: 100%;
        position: relative;
    }
    .img {
        height: 100%;
        width: 100%;
    }


    .btn-middle {
        position: absolute;
        height: 8.25%;
        width: 322px;
    }


    .btn-share {
        top: 75.56%;
        left: 214px;
        background-color: transparent;
        margin: 0;
        padding: 0;
        outline: 0;
    }

    .btn-register {
        top: 83.51%;
        left: 214px;
        border: 1px solid skyblue;
    }

    .share-music-playing-bar {
        position: absolute;
        left: 670px;
        top: 21.29%;
    }


    .btm {
        position: absolute;
        bottom: 6.6%;
        z-index: 100;
    }

    .btm6 {
        position: fixed;
        bottom: 2% !important;
        z-index: 100;
    }

    .img-btn {

        width: 36px;
        height: 36px;
        border-radius: 36px;
        overflow: hidden;
    }

    .pause-btn {
        left: 36px;
    }

    .download-btn {
        left: 82px;
    }

    .try-play-btn {
        left: 127px;

        width: 95px;
        height: 36px;
        border-radius: 95px;
        overflow: hidden;
    }

    .qr-code {
        right: 33px;
        width: 62px;
        height: 62px;
    }

    .qr-code.qr-btm6 {
        position: absolute;
        bottom: 0 !important;
        z-index: 100;
    }

    .arrow {

        top: 16px;
        right: 16px;

    }

    $speed: 3s;
    $speed6: $speed * 2;
    $speed4: 12s;
    $delay4: 0s;
    $speed3: 3s;
    .text1-icon1 {
        position: absolute;
        z-index: 100;
        top: 16.64%;
        height: 15.74%;
        width: 256px;
        left: 40px;
    }

    .text1-icon2 {
        position: absolute;
        z-index: 100;
        top: 16.64%;
        height: 15.74%;
        width: 256px;
        left: 46px;
        animation: text1-icon2 $speed linear infinite alternate;
    }

    @keyframes text1-icon2 {
        0% {
            left: 34px;
        }
        100% {
            left: 46px;
        }
    }

    .text2-icon1 {
        position: absolute;
        z-index: 100;
        top: 34.78%;
        height: 23px;
        width: 23px;
        left: 40px;
        animation: text2-icon1 $speed3 linear 0s infinite;
    }

    @keyframes text2-icon1 {
        0% {

        }
        100% {
            transform: rotate(360deg);
        }
    }

    .icon3-com {
        position: absolute;
        z-index: 100;
        top: 31.03%;
        left: 132px;
    }

    .text4-icon1 {
        position: absolute;
        z-index: 100;
        top: 80.51%;
        height: 25px;
        width: 25px;
        right: 190px;
        animation: text4-icon1 $speed4 linear 0s infinite;
    }

    @keyframes text4-icon1 {
        0% {
            right: 190px;
        }
        22.5% {
            right: 315px;
        }
        90% {
            opacity: 1;
            right: 315px;
        }
        100% {
            opacity: 0;
            right: 315px;
        }
    }

    .text4-icon2 {
        position: absolute;
        z-index: 100;
        top: 80.51%;
        height: 25px;
        width: 25px;
        right: 160px;
        animation: text4-icon2 $speed4 linear 0s infinite;
    }

    @keyframes text4-icon2 {
        0% {
            right: 160px;
        }
        22.5% {
            right: 160px;
        }
        45% {
            right: 285px;
        }
        90% {
            opacity: 1;
            right: 285px;
        }

        100% {
            opacity: 0;
            right: 285px;
        }
    }

    .text4-icon3 {
        position: absolute;
        z-index: 100;
        top: 80.51%;
        height: 25px;
        width: 25px;
        right: 130px;
        animation: text4-icon3 $speed4 linear infinite;

    }

    @keyframes text4-icon3 {
        0% {
            right: 130px;
        }
        45% {
            right: 130px;
        }
        67.5% {
            right: 255px;
        }
        90% {
            opacity: 1;
            right: 255px;
        }

        100% {
            opacity: 0;
            right: 255px;
        }

    }

    .text4-icon4 {
        position: absolute;
        z-index: 100;
        top: 80.51%;
        height: 25px;
        width: 25px;
        right: 100px;
        animation: text4-icon4 $speed4 linear infinite;
    }

    @keyframes text4-icon4 {

        0% {
            right: 100px;
        }
        67.5% {
            right: 100px;
        }
        90% {
            opacity: 1;
            right: 225px;
        }

        100% {
            opacity: 0;
            right: 225px;
        }
    }

    $speed5: 9s;
    .text5-icon1 {
        position: absolute;
        z-index: 100;
        top: 72.51%;
        height: 1.95%;
        width: 93px;
        left: 40px;
        animation: text5-icon1 $speed5 linear infinite;
    }

    @keyframes text5-icon1 {
        0% {
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .text5-icon2 {
        position: absolute;
        z-index: 100;
        top: 75.56%;
        height: 2.55%;
        width: 122px;
        left: 40px;
        animation: text5-icon2 $speed5 linear infinite;
    }

    @keyframes text5-icon2 {
        0% {
            opacity: 0;
        }
        30% {
            opacity: 0;
        }
        60% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .text5-icon3 {
        position: absolute;
        z-index: 100;
        top: 79.91%;
        height: 3.45%;
        width: 162px;
        left: 40px;
        animation: text5-icon3 $speed5 linear infinite;
    }

    @keyframes text5-icon3 {
        0% {
            opacity: 0;
        }
        60% {
            opacity: 0;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .text6-icon1 {
        position: absolute;
        z-index: 100;
        top: 30.88%;
        height: 13.34%;
        width: 148px;
        left: 0;
        animation: text6-icon1 $speed6 linear infinite;
    }

    @keyframes text6-icon1 {
        from {
            left: 0;
        }
        to {
            left: 150%;
        }
    }

    .text6-icon2 {
        position: absolute;
        z-index: 100;
        top: 50.97%;
        height: 13.34%;
        width: 153px;
        right: 0;
        animation: text6-icon2 $speed6 linear infinite;
    }

    @keyframes text6-icon2 {
        from {
            right: 0;
        }
        to {
            right: 150%;
        }
    }

    .con6 {
        background-color: #0072BE;
    }

    .img6 {
        height: px(667);
    }


    .img6-content {
        height: px(539-88);
        width: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 13.19%;
    }

    .img6-text {
        position: absolute;
        bottom: 2%;
        height: 142px;
        left: px(255);
        width: px(272-255);
    }


    .icon-tip{
        position: absolute;
    }
</style>
