<template>
    <div class="wrapper"  v-if="showDialog" @click.stop="handleStop" @touchstart="stoptouch">
        <div class="dialog-mask" id="mask" @click.self="handleMaskClick"/>
        <div class="body" @click.self="handleDialogClick">
            <img :src="bg" class="dialog-bg" />
            <img :src="btn" class="return-btn"
                 @click="handleReturn"
            />
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    const page = 'how-to-play-dialog-'
    export default {
        name: "HowToPlayDialog",
        props:{
            visible:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            handleMaskClick(){
                this.showDialog = false
            },
            handleStop(e){

            },
            handleDialogClick(e) {
                console.log(e)
                this.showDialog = false
            },
            handleReturn(){
                console.log('handleReturn')
                this.showDialog = false
            },
            stoptouch(e){
                // e.preventDefault()
            }
        },
        computed:{
            ...mapGetters(['base']),
            bg(){
                return `${this.base}${page}bg.png`
            },
            btn(){
                return `${this.base}${page}btn.png`
            },
            showDialog: {
                set(v) {
                    this.$emit('update:visible', v)
                },
                get() {
                    return this.visible
                },
            },
        },
    }
</script>

<style scoped lang="scss">
    .wrapper{
        z-index: 1000;
        width: 100%;
        height: 100%;
        left:0;
        right: 0;
        top:0;
        bottom: 0;
        position: fixed;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        /*align-items: center;*/
    }

    .dialog-mask{
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        left:0;
        right: 0;
        top:0;
        bottom: 0;
        background-color: #333333;
        opacity: 0.9;
    }


    .dialog-bg{
        position: absolute;
        z-index: 2;
        top:17.84%;
        height: 49.18%;
        width: 298px;
        left:50%;
        transform: translateX(-50%);

    }
    .return-btn{
        position: absolute;
        z-index: 2;
        top:69.72%;
        height: 7.35%;
        width: 174px;
        left:50%;
        transform: translateX(-50%);
        /*border: 1px solid yellow;*/
    }

</style>
