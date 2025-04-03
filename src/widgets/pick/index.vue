<template>
    <Popup
        class="pick-popup-container"
        title="拾取"
        :visible="visible"
        @onCancel="onCancel"
    >
        拾取
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
.pick-popup-container {
    width: 350px;
    left: 270px;
    top: 10px;
}
</style>