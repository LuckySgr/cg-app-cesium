<template>
    <el-tooltip
        effect="dark"
        content="退出"
        placement="left"
    >
        <div @click="quit" class="btn">
            <el-icon :size="35" color="#326581">
                <SwitchButton/>
            </el-icon>
        </div>
    </el-tooltip>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {SwitchButton} from "@element-plus/icons-vue";

const router = useRouter();

const quit = () => {
    window.sessionStorage.removeItem('startActivation');
    router.push({path: '/index'})
    ElMessage({
        message: '退出成功',
        type: "success"
    })
};
</script>

<style scoped></style>