import type { RouteRecordRaw } from 'vue-router'

export const loginRouters: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('pages/login/Login.vue')
  },

  {
    path: '/register',
    component: () => import('pages/login/Register.vue')
  },

  {
    path: '/forget',
    component: () => import('pages/login/Forget.vue')
  }
]

export const publicRoutes:RouteRecordRaw[] = [
  {
    path: '/webview',
    component: () => import('pages/webview/WebView.vue'),
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'IndexPage',
        component: () => import('pages/home/IndexPage.vue')
      },
      {
        path: 'orden',
        name: 'OrdenPage',
        component: () => import('pages/orden/Orden.vue')
      },
      {
        path: 'eqipo',
        name: 'EqipoPage',
        component: () => import('pages/equipo/Equipo.vue')
      },
      {
        path: 'mi',
        name: 'MiPage',
        component: () => import('pages/mi/Mi.vue')
      }
    ]
  },

  ...loginRouters,
  ...publicRoutes,

  {
    path: '/recargar',
    component: () => import('pages/recargar/Recargar.vue')
  },

  {
    path: '/recargarusdt',
    component: () => import('pages/recargar/RecargarUsdt.vue')
  },

  {
    path: '/retirar',
    component: () => import('pages/retirar/Retirar.vue')
  },

  {
    path: '/factura',
    component: () => import('pages/factura/Factura.vue')
  },

  {
    path: '/recargarlog',
    component: () => import('pages/recargarlog/RecargarLog.vue')
  },
  {
    path: '/retirarlog',
    component: () => import('pages/retirarlog/RetirarLog.vue')
  },

  {
    path: '/securitypassword',
    component: () => import('pages/securitypassword/SecurityPassword.vue')
  },

  {
    path: '/cs',
    component: () => import('pages/cs/CS.vue')
  },

  {
    path: '/banco',
    component: () => import('pages/banco/Banco.vue')
  },

  {
    path: '/detalledebienes',
    component: () => import('pages/detalledebienes/GoodsInfo.vue')
  },

  {
    path: '/language',
    component: () => import('pages/language/Language.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
