<template>
    <div class="pop-box-unique" :class="{ popBoxHide: !visible,isFullscreen:isFullscreen }" ref="box">
        <div class="pop-box-unique-head" @mousedown="mousedown">
            <span>{{ title }}</span>
            <i v-if="fullscreen && !isFullscreen" class="icon-Maximize-1" @click="showFullscreen"></i>
            <i v-if="fullscreen && isFullscreen" class="icon-Maximize-3" @click="showFullscreen"></i>
            <i v-if="close" class="icon-close" @click="onCancel"></i>
        </div>
        <div class="pop-box-body">
            <div v-if="backgroundImageUrl" class="image"
                 :style="{backgroundImage:'url('+backgroundImageUrl+')',height:imageHeight}"></div>
            <slot></slot>
        </div>
        <div class="pop-box-unique-foot">
            <el-button size="small" v-if="confirm" type="primary" @click="onConfirm">{{ confirmVal }}</el-button>
            <el-button size="small" v-if="cancel" @click="onCancel">{{ cancelVal }}</el-button>
        </div>
    </div>
</template>
<script setup>
import {ref, toRefs} from "vue";

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    close: {
        type: Boolean,
        default: true,
    },
    confirm: {
        type: Boolean,
        default: false,
    },
    cancel: {
        type: Boolean,
        default: false,
    },
    title: {
        default: null,
    },
    confirmVal: {
        type: String,
        default: "是",
    },
    cancelVal: {
        type: String,
        default: "否",
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    isMove: {
        type: Boolean,
        default: true,
    },
    fullscreen: {
        type: Boolean,
        default: false,
    },
    isFullscreen: {
        type: Boolean,
        default: false,
    },
    backgroundImageUrl: {
        type: String,
        default: ""
    },
    imageHeight: {
        type: String,
        default: "455px"
    },
});

const {
    visible,
    confirm,
    cancel,
    title,
    confirmVal,
    cancelVal,
    isDisabled,
    isMove,
    fullscreen,
    isFullscreen,
    backgroundImageUrl,
    imageHeight
} = toRefs(props);

const box = ref()

const emits = defineEmits(['onConfirm', 'onCancel'])

const showFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    if (!isFullscreen.value) {
        imageHeight.value = "455px"
    } else {
        imageHeight.value = document.body.clientHeight + "px"
    }
}

const onConfirm = () => {
    if (!isDisabled.value) {
        emits("onConfirm");
    }
}
const onCancel = () => {
    emits("onCancel");
}
const mousedown = (event) => {
    let selectElement = box.value;
    let dom = selectElement;
    let distanceX = event.clientX - selectElement.offsetLeft;
    let distanceY = event.clientY - selectElement.offsetTop;
    if (isMove.value) {
        document.onmousemove = function (ev) {
            let oevent = ev || event;
            selectElement.style.cursor = "move";
            dom.style.left = oevent.clientX - distanceX + "px";
            dom.style.top = oevent.clientY - distanceY + "px";
        };
    }
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        dom.style.cursor = "default";
    };
}
</script>
<style scoped>
.image {
    background-size: cover;
    background-repeat: no-repeat;
}

.pop-box-unique {
    position: fixed;
    z-index: 12;
    top: 512px;
    right: 16px;
    border-radius: 10px;
    overflow: hidden;
    /*min-width: 253px;*/
    background: rgba(1, 10, 23, 0.8);
    color: #ffffff;
    font-size: 14px;
}

.popBoxHide {
    display: none;
}

.pop-box-unique-head {
    position: relative;
    font-size: 16px;
    height: 40px;
    vertical-align: middle;
    justify-items: center;
    line-height: 40px;
    font-weight: bold;
    background: none;
    color: #ffffff;
    text-indent: 20px;
    border-bottom: 1px solid #919499;
}

.pop-box-unique-head .pop-box-unique-close {
    position: absolute;
    top: calc(50% - 9px);
    right: 20px;
    font-size: 15px;
    cursor: pointer;
}

.pop-box-unique-foot {
    text-align: right;
    margin-right: 5px;
}

.pop-box-unique-foot button {
    margin: 10px 5px;
}

.pop-box-unique.isFullscreen {
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: 100%;

}

.pop-box-unique-head i {
    margin-top: 10px;
    position: absolute;
    height: 16px;
    width: 16px;
    background-size: 100%;
}

.icon-Maximize-1 {
    background: url(./img/Maximize-1.png) no-repeat;
    right: 50px;
}

.icon-Maximize-3 {
    background: url(./img/Maximize-3.png) no-repeat;
    right: 50px;
}

.icon-close {
    cursor: pointer;
    background: url(./img/close.png) no-repeat;
    right: 20px;
}


@-webkit-keyframes popIn {
    0% {
        -webkit-transform: scale3d(0, 0, 0);
        transform: scale3d(0.5, 0.5, 0.5);
        opacity: 0;
    }
    50% {
        -webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
        animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 1;
    }
}

@keyframes popIn {
    0% {
        -webkit-transform: scale3d(0, 0, 0);
        transform: scale3d(0.5, 0.5, 0.5);
        opacity: 0;
    }
    50% {
        -webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
        animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 1;
    }
}
</style>
