import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login.vue')
        },
        {
            path: '/',
            name: 'Index',
            component: () => import('../views/index.vue')
        }

    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    const startActivation = window.sessionStorage.getItem('startActivation');
    if (to.path !== '/login') {
        if (!startActivation) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }

})

export default router
