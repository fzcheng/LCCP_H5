import type { Router } from "vue-router"

const goTo = (router: Router, title: string, url: string) => {
  router.push({path: '/webview', query: {titleWebView: encodeURI(title), urlWebView: encodeURIComponent(url)}})
}

export  const useWebView = (router: Router,) => {
  return {
    goTo: goTo.bind(null, router)
  }
}
