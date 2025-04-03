<template>
    <div id="cesiumContainer"></div>
    <div class="widgetsTools">
        <!-- 图层类 -->
        <Layers></Layers>
        <!-- 退出 -->
        <Quit></Quit>
    </div>
    <!-- 微件栏 -->
    <Widgets></Widgets>
</template>

<script setup>
import Layers from "@/views/components/Layers.vue";
import Widgets from "@/views/components/Widgets.vue";
import Quit from "@/views/components/Quit.vue";
import {onMounted} from "vue";

onMounted(() => {
    cgapp.cesium.core.mapInit.createMap("cesiumContainer");
})
</script>

<style scoped>
#cesiumContainer {
    flex: 1;
    width: 100%;
    height: 100%;
    background: transparent;
}

.widgetsTools {
    z-index: 999;
    position: absolute;
    top: 3rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
}

:deep(.btn) {
    margin-bottom: 10px;
    cursor: pointer;


}

</style>