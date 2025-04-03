<template>
    <Popup
        class="draw-popup-container"
        title="绘制"
        :visible="visible"
        @onCancel="onCancel"
    >
        绘制
    </Popup>
</template>

<script setup>
import Popup from "@/components/Popup.vue";
import {ref} from "vue";

const visible = ref(true);

const onCancel = () => {
    visible.value = false
}

</script>

<style scoped>
.draw-popup-container {
    width: 350px;
    left: 270px;
    top: 10px;
}
</style>