<template>
    <div class="wrap">
        page1
        <img src="./home-bg.png"/>
        <p>
            sdfsdfsdfsdfsdf
        </p>
    </div>
</template>

<script>
    export default {
        name: "App",
        mounted() {
            // alert('page')
        }
    }
</script>

<style scoped lang="scss">
.wrap{
    border:2px solid yellow;
    >p{
        color:green;
    }

    >img{
        width: 100%;
        height: 100%;
    }
}
</style>