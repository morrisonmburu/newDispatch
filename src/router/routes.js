
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: {
      requiresAuth: true,
      is_user: true
    }
  },
  {
    path: '/scheduler',
    component: () => import('layouts/Schedule/MainPage.vue'),
    children: [
      { path: '', component: () => import('pages/Calender.vue') }
    ],
    meta: {
      requiresAuth: true,
      is_user: true
    }
  },
  {
    path: '/login',
    component: () => import('layouts/login/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  // {
  //   path: '/calender',
  //   component: () => import('layouts/Schedule/MainPage.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Scheduler.vue') }
  //   ]
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
