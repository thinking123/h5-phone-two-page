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

<style scoped lang="scss">
    .loading-bar {
        width: 16px;
        height: 14px;
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
        width: 2px;
        height: 14px;
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
            height: 14px;
        }
        15% {
            margin-top: 1px;
            height: 12px;
            margin-bottom: 1px;
        }
        30% {
            margin-top: 2px;
            height: 10px;
            margin-bottom: 2px;
        }
        45% {
            margin-top: 3px;
            height: 8px;
            margin-bottom: 3px;
        }
        60% {
            margin-top: 4px;
            height: 6px;
            margin-bottom: 4px;
        }
        75% {
            margin-top: 5px;
            height: 4px;
            margin-bottom: 5px;
        }
        90% {
            margin-top: 6px;
            height: 2px;
            margin-bottom: 6px;
        }
        100% {
            margin-top: 7px;
            height: 0px;
            margin-bottom: 7px;
        }
    }

</style>
