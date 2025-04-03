<template>
    <el-tooltip
        effect="dark"
        content="图层树"
        placement="left"
    >
        <div @click="openLayers" class="btn">
            <img :src="imgSrc" alt="" width="35" height="35"/>
        </div>
    </el-tooltip>
    <Layers :visible="visible" @closeLayers="closeLayers"></Layers>
</template>

<script setup>
import {ref} from "vue";
import Layers from '@/widgets/layers/index.vue'
import img from '@/assets/img/menu/layer/layer.png';
import img_active from '@/assets/img/menu/layer/layer_active.png';

const isOpen = ref(false);
const visible = ref(false);
const imgSrc = ref(img);
const openLayers = () => {
    if (isOpen.value) {
        closeDialog()
        return
    }
    imgSrc.value = img_active;
    isOpen.value = true;
    visible.value = true
};

const closeDialog = () => {
    imgSrc.value = img;
    isOpen.value = false;
    visible.value = false
};

const closeLayers = () => {
    closeDialog()
}
</script>

<style lang="scss" scoped>
</style>