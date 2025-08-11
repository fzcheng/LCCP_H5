import { api } from 'src/boot/axios'
import type { Result } from './typings.d'

export const goodsOrderApi = <T = any>(data: any) => {
  return api.get<T, Result<T>>('/api/goods/order', {
    params: data
  })
}

export const goodsBuyorderApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/goods/buyorder', data)
}


export const myBillApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/my/bill')
}


export const myRechargeRecordsApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/my/recharge_records')
}


export const myWithdrawRecordsApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/my/withdraw_records')
}
