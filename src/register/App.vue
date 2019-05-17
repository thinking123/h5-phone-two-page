<template>
    <div class="page">
        <div class="form">
            <icon-input icon="person" :val.sync="name" placeholder="请填写会员名称"/>
            <icon-input-with-button icon="phone" :val.sync="phone" placeholder="请输入手机号" @emitcode="handleEmitCode"/>
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
    import {showMsg} from "@/utils/common";
    import {register, getCode} from "./http";

    export default {
        name: "App",
        components: {IconInputWithButton, IconInput},
        data() {
            return {
                name: "",
                phone: "",
                code: "",
                isLoading: false,
                returnCode: ""
            }
        },
        methods: {
            async handleSubmit() {
                console.log('handleSubmit', this.name)
                if (this.validSubmit()) {
                    try {
                        await register(
                            this.name ,
                            this.phone,
                            this.code
                        )

                        showMsg("注册成功")
                    }catch (e) {
                        showMsg(e)
                    }
                }
            },
            validSubmit() {
                if (!this.name || this.name.trim().length == 0) {
                    showMsg("输入会员名称")
                    return false
                }

                const pReg = /^[1][0-9]{10}$/;
                if (!this.phone || !pReg.test(this.phone.trim())) {
                    showMsg("输入正确手机号")
                    return false
                }

                if (!this.code || this.code.trim().length == 0) {
                    showMsg("输入正确验证码")
                    return false
                }

                return true
            },
            async handleEmitCode() {
                console.log("handleEmitCode")
                try {
                    const pReg = /^[1][0-9]{10}$/;
                    if (!this.phone || !pReg.test(this.phone.trim())) {
                        showMsg("输入正确手机号")
                        return false
                    }
                    const code = await getCode(this.phone)
                    console.log('code', code)
                } catch (e) {
                    showMsg(e)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "css/variables";

    .page {
        width: 100%;
        height: 100%;
        background-image: url("../share/images/bg.png");
        background-size: contain;
        position: relative;

        .form {
            display: flex;
            flex-direction: column;
            top: 143px;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;

            > :not(:first-child) {
                margin-top: 26px;
            }

            button {
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
