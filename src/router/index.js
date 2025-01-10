// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/user/authStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      { path: 'chat/:chatId?', name: 'chat', component: () => import('../views/Chat.vue'), props: true },
      { path: 'train', name: 'train', component: () => import('../views/Train.vue') },
    ],
  },
  {
    path: '/Login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'error',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.name === 'login' && isAuthenticated) {
    // 如果用户已经登录并且尝试访问登录页面，重定向到主页
    next({ name: 'chat' });
  } else if (to.name !== 'login' && !isAuthenticated) {
    // 如果用户未登录并且尝试访问非登录页面，重定向到登录页面
    next({ name: 'login' });
  } else {
    // 其他情况正常导航
    next();
  }
});

// 全局解析守卫
router.beforeResolve(async (to, from, next) => {
  // 可以在这里进行一些异步操作，比如获取数据
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 这里可以做一些日志记录或其他操作
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

export default router