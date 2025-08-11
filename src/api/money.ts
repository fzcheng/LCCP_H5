import { api } from 'src/boot/axios'
import type { Result } from './typings.d'

export const moneyRechargeApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/money/recharge')
}


export const rechargeDoBeforeApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/money/recharge_do_before', data)
}


export const moneyRechargeUsdtApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/money/recharge_usdt')
}

export const moneyWithdrawApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/money/withdraw')
}

export const moneyBankApi = <T = any>() => {
  return api.get<T, Result<T>>('/api/money/bank')
}


export const moneyBankPostApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/money/bank', data)
}


export const moneyWithdrawDoApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/money/withdraw_do', data)
}
