import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue');
const BootPage = () => import('../pages/BootPage.vue');
const Download = () => import('../pages/Download.vue');

const routes = [
    { 
        path: '/home', 
        name: 'Home',
        component: Home,
        props: true,
    },
    { 
        path: '/', 
        name: 'BootPage',
        component: BootPage,
        props: true,
    },
    { 
        path: '/download', 
        name: 'Download',
        component: Download,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router