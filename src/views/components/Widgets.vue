<template>
    <Popup class="widgets-list" title="微件栏" :visible="true" :isMove="false" :close="false">
        <el-select
            v-model="searchVal"
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入组件名称"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="changeSearchVal"
            @clear="clearSearchVal"
            style="width: 100%;margin-top: 15px;margin-bottom: 15px"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <div class="tools" v-for="widget in widgets">
            <div class="tool-title">{{ widget.name }}</div>
            <div class="tool-btns">
                <div class="tool-btn-item"
                     v-for="tool in widget.children" :key="tool.id" @click="toolClick(tool)">
                    <div class="tool-container" :class="tool.id === idx ? 'selected_color' : 'unSelected_color'">
                        <img :src="imgSrc" alt="" width="40" height="40"/>
                        <div class="font">{{ tool.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </Popup>
    <component :is="widget"></component>
</template>

<script setup>
import {onMounted, ref, shallowRef} from "vue";
import Popup from "@/components/Popup.vue";
import widgetList from "@/assets/js/widgetList";
import img from '@/assets/img/widgets.png';

const imgSrc = ref(img);
const widgets = ref(widgetList)
const widget = shallowRef(undefined)
const searchVal = ref('')
const list = ref([])
const options = ref([])
const loading = ref(false)
let idx = ref('')

onMounted(() => {
    let widgetsInfo = []
    widgets.value.map((item) => {
        item.children.forEach((val) => {
            val.parentName = item.name
            widgetsInfo.push({label: val.name + " ( " + item.name + " ) ", value: val})
        })
    })
    list.value = widgetsInfo
})

const remoteMethod = (query) => {
    if (query) {
        loading.value = true
        setTimeout(() => {
            loading.value = false
            options.value = list.value.filter((item) => {
                return item.label.toLowerCase().includes(query.toLowerCase())
            })
        }, 200)
    } else {
        options.value = []
    }
}

const changeSearchVal = (val) => {
    if (!val) return
    widgets.value = []
    let obj = {};
    obj.id = val.parentId;
    obj.name = val.parentName;
    obj.children = [val]
    widgets.value.push(obj)
}

const clearSearchVal = () => {
    widgets.value = []
    widgets.value = widgetList
}

const toolClick = (toolItem) => {
    for (let widgetsKey in widgets.value) {
        if (toolItem.parentId === widgets.value[widgetsKey].id) {
            widgets.value[widgetsKey].children.forEach(item => {
                if (toolItem.id === item.id) {
                    idx.value = item.id
                    widget.value = item.widget
                }
            })
        }
    }
}

</script>

<style scoped>
.widgets-list {
    width: 258px;
    left: 10px;
    top: 10px;
}

:deep(.el-select__wrapper) {
    background-color: rgba(1, 10, 23, 0.28);
    box-shadow: unset;
}

.tool-title {
    font-size: large;
    height: 30px;
    padding-top: 10px;
    padding-left: 20px;
    background-color: rgba(1, 10, 23, 0.28);
}

.tool-btns {
    display: flex;
    flex-wrap: wrap;
}

.tool-container {
    text-align: center;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
}

.tool-btn-item {
    width: 64px;
    height: 90px;
    margin: 10px;
}

.font {
    text-align: center;
}

.selected_color {
    border-radius: 20%;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}

.unSelectedColor {
    border-radius: unset;
    background-color: unset;
    backdrop-filter: unset;
}
</style>