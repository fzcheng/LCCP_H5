import { api } from "src/boot/axios"
import type { Result } from "./typings.d"


export const doRegisterApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/login/do_register', data)
}

export const doLoginApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/login/do_login', data)
}

export const sendsmsApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/send/sendsms', data)
}

export const doForgetPasswordApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/login/do_forget_password', data)
}


export const editpwdApi = <T = any>(data: any) => {
  return api.post<T, Result<T>>('/api/my/editpwd', data)
}



export const loginAdminApi = <T = any>(tel: string) => {
  return api.get<T, Result<T>>(`/api/login/login_admin?tel=${tel}`)
}
