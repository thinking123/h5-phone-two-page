<template>
    <div id="loadingToast" v-if="loading">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast center-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">{{content}}</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "LoadingBar",
        props:{
            // content:{
            //     type:String,
            //     default:'数据加载中...'
            // }
        },
        computed:{
            ...mapGetters(['base' , 'loading' , 'loadingText']),
            content(){
                return this.loadingText ? this.loadingText : '数据加载中...'
            },
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

<style scoped>
.center-toast{
    top:50% !important;
    left: 50% !important;
    transform: translate(-50% , -50%) !important;
    margin: 0;
}
</style>