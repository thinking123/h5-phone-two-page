<template>
    <div class="loading-bar">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>

</template>

<script>
    export default {
        name: "StartRecordingBar"
    }
</script>

<style scoped>
    .loading-bar {
        width: 32px;
        height: 28px;
        display: flex;
        flex-direction: row;
        margin: auto;
        z-index: 1122;

        /*width: 16px;*/
        /*height: 15px;*/
        /*display: block;*/
        /*display: flex;*/
        /*flex-direction: row;*/
        /*margin: auto;*/
        /*z-index: 2;*/

    }

    .bar {
        margin-left:1px;
        margin-right:1px;
        width: 4px;
        height: 28px;
        animation-name: loading;
        background-color: white;
        animation-duration: 0.3s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;

    }

    .bar:nth-child(3) {
        animation-delay: 0.3s;
    }

    .bar:nth-child(2) {
        animation-delay: 0.15s;
    }

    .bar:nth-child(4) {
        animation-delay: 0.15s;
    }

    @keyframes loading {
        0% {
            margin-top: 0px;
            height: 28px;
        }
        15% {
            margin-top: 2px;
            height: 24px;
            margin-bottom: 2px;
        }
        30% {
            margin-top: 4px;
            height: 20px;
            margin-bottom: 4px;
        }
        45% {
            margin-top: 6px;
            height: 16px;
            margin-bottom: 6px;
        }
        60% {
            margin-top: 8px;
            height: 12px;
            margin-bottom: 8px;
        }
        75% {
            margin-top: 10px;
            height: 8px;
            margin-bottom: 10px;
        }
        90% {
            margin-top: 12px;
            height: 4px;
            margin-bottom: 12px;
        }
        100% {
            margin-top: 14px;
            height: 0px;
            margin-bottom: 14px;
        }
    }

</style>
