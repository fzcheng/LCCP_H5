import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    const token = localStorage.getItem('token') || ''
    return {
      token
    }
  },

  getters: {
    isLogin: state => !!state.token
  },

  actions: {
    login(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout(){
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
