<template>
    <div class="icon-input">
        <!--<img class="icon" :src="`images/${icon}_icon.png`"/>-->
        <!--<img class="icon" :src="`require(@/assets/img/home/carousel/${item.img_src})`"/>-->
        <!-- <img :src=" require(@/assets/img/home/carousel/${item.img_src}) " />-->
        <img class="icon" :src=" require(`../images/${this.icon}_icon.png`)"/>
        <input :type="type" v-model="inputVal" :placeholder="placeholder"/>
    </div>
</template>

<script>
    export default {
        name: "IconInput",
        props:{
            icon:{
                type:String
            },
            placeholder:{
                type:String,
                default:"请输入"
            },
            type:{
                type:String,
                default:"text"
            },
            val:{
                type:String
            },
        },
        computed:{
            inputVal:{
                set(v) {
                    this.$emit('update:val', v)
                },
                get() {
                    return this.val
                },
                imgSrc(){
                    const url = `../images/${this.icon}_icon.png`
                    const img = require(url)
                    return img
                }
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "css/variables";
    $size:18px;

    .icon-input{
        width: 276px;
        height: 42px;
        background-color: white;
        border-radius: $radius;
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon{
            margin-left: 17px;
            height: 27px;
            width: 23px;
            object-fit: contain;
        }


        input{
            margin-left: 15px;
            height: 27px;
            border: none;
            font-size: $size;
        }

        ::placeholder{
            color: #E2E0E0;
            font-size: $size;//no rem
            vertical-align: center;
        }
    }
</style>