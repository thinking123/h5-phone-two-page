<template>
    <div class="move-arrow">
        <div class="line1 line"/>
        <div class="line2 line"/>
        <div class="line3 line"/>
    </div>
</template>

<script>
    export default {
        name: "MoveArrow"
    }
</script>

<style scoped lang="scss">
    $offset:50%;
    $speed:2s;
    $delay:0s;
    $fun:ease-out;
.move-arrow{
    width: 15px;
    height: 15px;
    position: absolute;
    .line{
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: white;
    }
    .line1{
        animation:$speed arrows1 $delay $fun infinite;
    }
    .line2{
        width: 21px;
        right: 0;
        transform-origin: bottom right;
        transform: rotate(-45deg);
        animation: $speed arrows2 $delay $fun infinite;
        z-index: 2;
    }
    .line3{
        transform: rotate(-90deg);
        transform-origin: bottom right;

        animation: $speed arrows3 $delay $fun infinite;
    }
}

@keyframes arrows1 {
    0%{
        left:-$offset;
        opacity: 1;
    }
    30%{
        left:-$offset;
        opacity: 1;
    }
    60%{
        left: 0;
        opacity: 1;
    }
    100%{
        left: 0;
        opacity: 0;
    }
}

@keyframes arrows2 {

    0%{
        transform: rotate(-45deg) translateX(-$offset);
        opacity: 1;
    }
    30%{
        transform: rotate(-45deg) translateX(-$offset);
        opacity: 1;
    }
    60%{
        transform: rotate(-45deg) translateX(0);
        opacity: 1;
    }
    100%{
        transform: rotate(-45deg) translateX(0);
        opacity: 0;
    }
}

@keyframes arrows3 {

    0%{
        top:$offset;
        opacity: 1;
    }
    30%{
        top:$offset;
        opacity: 1;
    }
    60%{
        top:0;
        opacity: 1;
    }
    100%{
        top:0;
        opacity: 0;
    }
}

</style>