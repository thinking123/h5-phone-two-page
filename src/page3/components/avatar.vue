<template>
    <div class="avatar-wrap">
        <img class="avatar" :src="headimgurl"/>
        <div class="avatar-name">
            {{nickname}}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "avatar",
        computed: {
            ...mapGetters(['headimgurl','nickname'])
        },
    }
</script>

<style scoped lang="scss">
    .avatar-wrap{
        height: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .avatar{
            width: 25px;
            height: 100%;
            border-radius: 25px;
            /*border:1px solid white;!*no*!*/
        }
        .avatar-name{
            color: white;
            margin-left: 5px;
            font-size: 18px;
            white-space: nowrap;
        }
    }
</style>