<template>
    <div class="layout">
        <slot/>
        <loading-bar/>
        <more-arrow/>
    </div>
</template>

<script>
    import LoadingBar from "@/components/LoadingBar";
    import MoreArrow from "@/components/MoreArrow";
    export default {
        name: "Layout",
        components: {MoreArrow, LoadingBar},
    }
</script>

<style scoped>
    .layout{
        width: 100%;
        height: 100%;
        background-color: transparent;
        overflow: hidden;
    }
    #app {
        height: 100%;
        width: 100%;
        background-color: transparent;
    }
</style>
