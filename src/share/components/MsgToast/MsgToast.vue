<template>
    <transition name="msg-toast">
        <div class="msg-toast-wrap"  v-show="visible">
            <div  class="msg-toast">
                <!--<i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>-->
                <span class="msg-toast-text">{{ message }}</span>
            </div>
        </div>

    </transition>
</template>

<style lang="scss">

    .msg-toast-wrap{
        position: fixed;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
    }
    .msg-toast{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 80%;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        z-index: 1000;
        /*transition: opacity .3s linear;*/
        padding: 10px;
        .msg-toast-text{
            font-size: 14px;
            display: block;
            text-align: center;
        }
    }

    .msg-toast-enter,  .msg-toast-leave-to {
        opacity: 0
    }

    .msg-toast-enter-active, .msg-toast-leave-active {
        transition: opacity .3s linear;
    }
</style>

<script>
    export default {
        props: {
            message: String,
            className: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'middle'
            },
            iconClass: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                visible: false
            };
        },

        computed: {
            customClass() {
                var classes = [];
                switch (this.position) {
                    case 'top':
                        classes.push('is-placetop');
                        break;
                    case 'bottom':
                        classes.push('is-placebottom');
                        break;
                    default:
                        classes.push('is-placemiddle');
                }
                classes.push(this.className);

                return classes.join(' ');
            }
        }
    };
</script>