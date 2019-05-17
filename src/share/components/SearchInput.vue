<template>
    <div class="icon-input">
        <img class="icon" :src="`images/${icon}_icon.png`"/>
        <div class="line"/>
        <!--<img class="icon" src="../images/person_icon.png"/>-->
        <input :type="type" v-model="inputVal" :placeholder="placeholder"/>
    </div>
</template>

<script>
    export default {
        name: "SearchInput",
        props:{
            icon:{
                type:String,
                default:"search"
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
    $size:15px;
    $textColor:#999999;
    $bgColor:#F7F8FA;
    .icon-input{
        width: 270px;
        height: 37px;
        border-radius: 5px;
        background-color: #F7F8FA;
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon{
            margin-left: 17px;
            height: 27px;
            width: 23px;
            object-fit: contain;
        }

        .line{
            height: 20px;
            width: 1px;
            background-color: $textColor;
            margin: 0 12px;
        }


        input{
            background-color: $bgColor;
            height: 27px;
            border: none;
            font-size: $size;
            color: $textColor;
        }

        ::placeholder{
            color: $textColor;
            font-size: $size;//no rem
            vertical-align: center;
        }
    }
</style>