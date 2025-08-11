import { api } from "src/boot/axios"
import type { Result } from "./typings.d"


export const indexApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/index/index')
}


export const myIndexApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/my/index')
}

export const teamIndexApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/team/index')
}


export const goodsInfoApi = <T = any>(data: any) => {
  return api.get<T, Result<T>>('/api/goods/info.html', {
    params: data
  })
}
