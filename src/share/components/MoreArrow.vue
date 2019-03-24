<template>
    <div class="more-arrow-wrap">
        <img :src="`${base}rhythm-share-more-arrow.png`">
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: "MoreArrow",
        computed: {
            ...mapGetters(['base']),
        }
    }
</script>

<style scoped lang="scss">
.more-arrow-wrap{
    /*position: absolute;*/
    height: 30px;
    width: 30px;


    position: fixed;
    bottom: 0;
    left:50%;
    transform: translateX(-50%);
    animation: more-arrow 3s linear infinite;
    opacity: 0;
    z-index: 1000;

    >img{
        width: 100%;
        height: 100%;
    }

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