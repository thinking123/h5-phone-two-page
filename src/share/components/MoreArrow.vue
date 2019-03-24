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
    position: absolute;
    height: 30*2px;
    width: 30*2px;
    >img{
        width: 100%;
        height: 100%;
    }
}
</style>