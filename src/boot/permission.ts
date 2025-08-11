import { defineBoot } from '#q-app/wrappers'
import { loginRouters, publicRoutes } from 'src/router/routes'
import { useUserStore } from 'src/stores/user'
import { RouteRecordName } from 'vue-router'

const loginRoutesPath = loginRouters.map(item => item.path)

// 拦截白名单
const whiteList: string[] = [...publicRoutes.map(item => item.path)]
const whiteListName: RouteRecordName[] = []

const defaultRoutePath = '/'

export default defineBoot(({ app, router }) => {
  router.beforeEach((to, from, next) => {
    const useStore = useUserStore()

    if (whiteList.includes(to.path) || whiteListName.includes(to.name ?? '')) {
      next()
    } else {
      if (useStore.isLogin) {
        if (!loginRoutesPath.includes(to.path)) return next()
        if (!to.query.tel) return next({ path: defaultRoutePath, query: to.query })
        useStore.logout()
        return next()
      } else {
        // 没有token进登录页面
        if (loginRoutesPath.includes(to.path)) {
          next()
        } else {
          next({ path: loginRoutesPath[0], query: to.query })
        }
      }
    }
  })
})
