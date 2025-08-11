import { defineBoot } from '#q-app/wrappers';
import axios, { AxiosHeaders, type AxiosInstance } from 'axios';
import { Notify } from 'quasar';
import { baseApiUrl } from 'src/config/env.config';
import { useUserStore } from 'src/stores/user';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

export default defineBoot(({ app, router }) => {

   // 添加请求拦截器
  api.interceptors.request.use(config => {
    // 拦截/请求自定义返回结果
    if (!config.url) {
      config.adapter = () => {
        return new Promise(resolves => {
          resolves({ data: { status: 200 } } as any)
        })
      }
    }
    const token = useUserStore().token
    const newHeaders = new AxiosHeaders(config.headers)
    if (token) {
      newHeaders.set('token', token)
    }

    config.headers = newHeaders

    return config
  })
  // 添加响应拦截器
  api.interceptors.response.use(response => {
    const data = response.data
    if (data?.code !== 200) {
      const msg = data?.msg || 'System error'
      if (data.code === 300) {
        useUserStore().logout()
        router.replace('/login')
        return Promise.reject(new Error(msg))
      }
      Notify.create({
        message: msg,
        type: 'negative'
      })
      return Promise.reject(new Error(msg))
    }
    return data
  })
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
