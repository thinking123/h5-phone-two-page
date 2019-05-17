<template>
    <div class="page">
        <div class="form">
            <icon-input icon="person" :val.sync="name" placeholder="请填写会员名称"/>
            <icon-input-with-button icon="phone" :val.sync="phone" placeholder="请输入手机号"/>
            <icon-input icon="code" :val.sync="code" placeholder="请输入验证码"/>
            <button @click="handleSubmit">
                注册会员
            </button>
        </div>

    </div>

</template>

<script>
    // import Layout from "@/components/Layout/index";
    import IconInput from "@/components/IconInput";
    import IconInputWithButton from "@/components/IconInputWithButton";
    export default {
        name: "App",
        components: {IconInputWithButton, IconInput},
        data(){
            return {
                name:"",
                phone:"",
                code:"",
                isLoading:false
            }
        },
        methods:{
            handleSubmit(){

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "css/variables";

    .page{
        width: 100%;
        height: 100%;
        background-image: url("../share/images/bg.png");
        background-size: contain;
        position: relative;
        .form{
            display: flex;
            flex-direction: column;
            top: 143px;
            left:50%;
            transform: translateX(-50%);
            position: absolute;
            >:not(:first-child){
                margin-top: 26px;
            }
            button{
                margin-top: 148px !important;
                height: 40px;

                border-radius: $radius;
                background-color: $btnColor;
                border: none;
                font-size: 18px;
                color: #FFFFFF;
                text-align: center;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                text-decoration: none;
                overflow: hidden;
                cursor: pointer;
            }
        }

    }
</style>
