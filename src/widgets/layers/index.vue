<template>
    <Popup
        class="layers-popup-container"
        title="图层树"
        :visible="visible"
        @onCancel="onCancel"
    >
        图层树
    </Popup>
</template>

<script setup>
import Popup from "@/components/Popup.vue";
import {toRefs} from "vue";

const props = defineProps({
    visible: Boolean
});
const emits = defineEmits(['closeLayers']);
const {visible} = toRefs(props);


const onCancel = () => {
    emits('closeLayers')
}

</script>

<style scoped>
.layers-popup-container {
    width: 450px;
    right: 80px;
    top: 50px;
}
</style>