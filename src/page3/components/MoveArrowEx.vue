<template>
    <canvas id="movecanvas" class="canvas" width="60" height="60">

    </canvas>
</template>

<script>
    import {px2Px} from "utils/common";

    export default {
        name: "MoveArrowEx",
        methods:{
            getLine1(){
                const px = px2Px(21)
                const d = new createjs.Graphics();
                d.setStrokeStyle(2);
                d.beginStroke("yellow");
                d.moveTo(30 , 0)
                d.lineTo(px , 0);
                const line1 = new createjs.Shape(d)
                line1.x = 0;
                line1.y = 0
                return line1
            },
            getLine2(){
                const px = px2Px(21)
                const d = new createjs.Graphics();
                d.setStrokeStyle(2);
                d.beginStroke("yellow");
                d.moveTo(30 , 0)
                d.lineTo(px , 0);
                const line1 = new createjs.Shape(d)
                line1.x = 0;
                line1.y = 0
                line1.rotation = 45
                return line1
            },
            getLine3(){
                const px = px2Px(21)
                const d = new createjs.Graphics();
                d.setStrokeStyle(2);
                d.beginStroke("yellow");
                d.moveTo(30 , 0)
                d.lineTo(px , 0);
                const line1 = new createjs.Shape(d)
                line1.x = 0;
                line1.y = 0
                line1.rotation = 90
                return line1
            },
            init(){

                // alert(px)
                const stage = new createjs.Stage("movecanvas");


                stage.addChild(this.getLine1());
                stage.addChild(this.getLine2());
                stage.addChild(this.getLine3());

                stage.update();
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped lang="scss">
    .canvas{
        position: fixed;

        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 2000;
        border: 1px solid sandybrown;
    }
</style>