<template>
    <div class="page">
        <div class="search-input">
            <search-input placeholder="请输入姓名或手机号" @search="handleSubmit" :val.sync="search"/>
            <button class="search-button" @click="handleSubmit">
                搜索
            </button>
        </div>
        <div class="table-wrap">
            <div class="table-header">
                <div>
                    姓名
                </div>
                <div>
                    手机号
                </div>
                <div>
                    注册时间
                </div>
                <div>
                    是否会员
                </div>
            </div>
            <div class="table-body" v-on:scroll="handleScroll">
                <div class="table-row" v-for="row in list">
                    <div>
                        {{row.userName }}
                    </div>
                    <div>
                        {{row.userPhone }}
                    </div>
                    <div>
                        {{row.createTime }}
                    </div>
                    <div>
                        {{row.isMember == "1" ? "是" : "否" }}
                    </div>
                </div>
            </div>
        </div>
        <div class="isloading" v-if="isLoading">
            正在加载...
        </div>


    </div>

</template>

<script>
    // import Layout from "@/components/Layout/index";
    import IconInput from "@/components/IconInput";
    import IconInputWithButton from "@/components/IconInputWithButton";
    import SearchInput from "@/components/SearchInput";
    import {showMsg } from "@/utils/common";
    import {search} from "./http";
    import LoadingBar from "@/components/LoadingBar";

    export default {
        name: "App",
        components: {LoadingBar, SearchInput, IconInputWithButton, IconInput},
        data() {
            return {
                search: "",
                isLoading: false,
                list: [],
                "pageNum": 1,
                "pages": 0,
                "total": 0
            }
        },
        methods: {
            handleSubmit() {
                if (!this.search || this.search.trim().length == 0) {
                    showMsg("输入要查找的内容")
                    return
                }
                this.list = []
                this.pageNum = 1
                this.pages = 0
                this.total = 0
                this.getData(this.pageNum)
            },

            async getData(curNum) {
                try {
                    const {list, pageNum, pages, total} = await search(this.search, curNum)
                    this.list = list
                    this.pageNum = pageNum
                    this.pages = pages
                    this.total = total

                } catch (e) {
                    showMsg(e)
                }finally {
                    this.isLoading = false
                }
            },
            handleScroll(e) {
                const element = e.target;
                if (element.scrollTop == (element.scrollHeight - element.offsetHeight)) {
                    console.log('loading')
                    if (!this.isLoading && this.pageNum < this.pages) {
                        this.isLoading = true
                        getData(this.pageNum + 1)
                    }
                }
            }
        },
        mounted() {
            // for (let i = 0; i < 3; i++) {
            //     const v = {
            //         userName: "pos : " + i,
            //         userPhone: "userPhone",
            //         createTime: "createTime",
            //         isMember: i % 3 == 0 ? "1" : "0",
            //
            //     }
            //
            //     this.list.push(v)
            // }


            // window.addEventListener('scroll' , e =>{
            //     if(window.scrollTop + window.style.he)
            // })
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
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .isloading{
            position: absolute;
            bottom: 2px;
            left:50%;
            transform: translateX(-50%);
        }
        .search-input {
            margin-top: 17px;
            margin-left: 15px;

            display: flex;
            flex-direction: row;

            .search-button {
                margin-left: 15px;
                height: 28px;
                width: 60px;
                border-radius: 28px;
                align-self: center;
                background-color: $btnColor;
                border: none;
                font-size: 16px;
                color: #FFFFFF;
                text-align: center;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                text-decoration: none;
                overflow: hidden;
                cursor: pointer;
            }
        }

        .table-wrap {
            flex: 1;
            width: 100%;
            margin-top: 18px;
            margin-bottom: 2px;
            display: flex;
            flex-direction: column;

            .table-header {
                display: flex;
                flex-direction: row;
                background-color: white;
                height: 30px;

                font-size: 14px;

                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                > :nth-child(1) {
                    flex: 1;
                }

                > :nth-child(2) {
                    flex: 1;
                }

                > :nth-child(3) {
                    flex: 1.5;
                }

                > :nth-child(4) {
                    flex: 1;
                }
            }

            .table-body {
                flex: 1;
                overflow: auto;

                .table-row {
                    display: flex;
                    flex-direction: row;
                    height: 30px;

                    font-size: 14px;

                    > div {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    > :nth-child(1) {
                        flex: 1;
                    }

                    > :nth-child(2) {
                        flex: 1;
                    }

                    > :nth-child(3) {
                        flex: 1.5;
                    }

                    > :nth-child(4) {
                        flex: 1;
                    }
                }
            }


        }

    }
</style>
