import Draw from '@/widgets/draw/index.vue'
import Pick from '@/widgets/pick/index.vue'
import {shallowRef} from "vue";

let widgetList = [
    {
        id: 'drawClass',
        name: '绘制类',
        children: [
            {
                id: "draw",
                parentId: 'drawClass',
                name: "绘制",
                widget: shallowRef(Draw)
            },
            {
                id: "pick",
                parentId: 'drawClass',
                name: "拾取",
                widget: shallowRef(Pick)
            }
        ]
    },
    {
        id: 'mutualClass',
        name: '交互类',
        children: [
            {
                id: "test1",
                parentId: 'mutualClass',
                name: "视频融合",
                widget: shallowRef(Draw)
            },
            {
                id: "test2",
                parentId: 'mutualClass',
                name: "坡度分析",
                widget: shallowRef(Pick)
            }
        ]
    }
]

export default widgetList