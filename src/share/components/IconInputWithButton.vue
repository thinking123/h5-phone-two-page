<template>
    <div class="icon-input">
        <img class="icon" :src="`images/${icon}_icon.png`"/>
        <!--<img class="icon" src="../images/person_icon.png"/>-->
        <input  v-model="inputVal" :placeholder="placeholder" class="content"/>
        <button>
            {{btnText}}
        </button>
    </div>
</template>

<script>
    export default {
        name: "IconInputWithButton",
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
            btnText:{
                type:String,
                default:"验证码"
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
    $size:18px;

    .icon-input{
        width: 276px;
        height: 42px;
        background-color: white;
        border-radius: $radius;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
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

            /*width: 400px;*/
        }

        .content{
            display: inline-block;
            width: 300px;
        }
        ::placeholder{
            color: #E2E0E0;
            font-size: $size;//no rem
            vertical-align: center;
        }


        button{
            position: absolute;
            right: 5px;
            top:50%;
            transform: translateY(-50%);
            height: 34px;
            width: 75px;
            border-radius: 34px;
            background-color: $btnColor;
            border: none;
            font-size: 16px;
            color: #FFFFFF;
            text-align: center;
            transition-duration: 0.4s;
            text-decoration: none;
            overflow: hidden;
            cursor: pointer;
        }
    }
</style>