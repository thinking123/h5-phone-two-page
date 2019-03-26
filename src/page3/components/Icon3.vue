<template>
    <div class="icon3">
        <div class="item1">
            生活在苦
        </div>
        <div class="item2">
            +
        </div>
        <div class="item3">
            也要
        </div>
        <div class="item4">
            +
        </div>
        <div class="item5">
            对酒当歌的
        </div>
        <div class="item6">
            +
        </div>
        <div class="item7">
            音乐诗人
        </div>
    </div>
</template>

<script>
    export default {
        name: "Icon3"
    }
</script>

<style scoped lang="scss">
.icon3{
    $speed:2s;

    &>div{
        /*animation-direction: alternate;*/
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: $speed * 7;
        opacity: 0;
        margin-bottom: 6px;
        color: white;
        font-size: 18px;
        line-height: 100%;
    }

    .item1{
        animation-name: item1;
    }
    .item2{
        animation-name: item2;
    }
    .item3{
        animation-name: item3;
    }
    .item4{
        animation-name: item4;
    }
    .item5{
        animation-name: item5;
    }
    .item6{
        animation-name: item6;
    }
    .item7{
        animation-name: item7;
    }
    @keyframes item1 {
        0%{
            opacity: 0;
        }
        13%{
            opacity: 1;
        }
        91%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes item2 {
        0%{
            opacity: 0;
        }
        13%{
            opacity: 0;
        }
        26%{
            opacity: 1;
        }
        91%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes item3 {
        0%{
            opacity: 0;
        }
        26%{
            opacity: 0;
        }
        39%{
            opacity: 1;
        }
        91%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes item4 {
        0%{
            opacity: 0;
        }
        39%{
            opacity: 0;
        }
        52%{
            opacity: 1;
        }
        91%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes item5 {
        0%{
            opacity: 0;
        }
        52%{
            opacity: 0;
        }
        65%{
            opacity: 1;
        }
        91%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes item6 {
        0% {
            opacity: 0;
        }
        65% {
            opacity: 0;
        }
        78% {
            opacity: 1;
        }
        91% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes item7 {
        0%{
            opacity: 0;
        }
        78%{
            opacity: 0;
        }
        91%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
}

</style>