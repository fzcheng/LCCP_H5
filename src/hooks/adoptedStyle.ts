import { ref, toRaw, watch } from 'vue'

export type AdoptedStyleItem = {
  isCssInJs: boolean,
  cssStyleSheet?: CSSStyleSheet,
  cssDom?: HTMLStyleElement
}

const adoptedStyleSheets = ref<AdoptedStyleItem[]>([])

watch(adoptedStyleSheets, (val, old) => {
  const cssStyleSheetList = val.filter(item => item.isCssInJs).map(item => item.cssStyleSheet!)
  const cssDomRemoveList = old.filter(item => !item.isCssInJs).filter(item => !val.includes(item)).map(item => item.cssDom)
  const cssDomNewList = val.filter(item => !item.isCssInJs).filter(item => !old.includes(item)).map(item => item.cssDom)
  if ((document as any).adoptedStyleSheets) {
    ;(document as any).adoptedStyleSheets = cssStyleSheetList ?? []
  }
  cssDomRemoveList.forEach(item => item?.remove())
  cssDomNewList.forEach(item => item && document.body.appendChild(item))
})

const createSheet = (rule?: string, index?: number) => {
  try {
    const sheet = new CSSStyleSheet()
    rule && sheet.insertRule(rule, index)
    const temp = {
      insertRule: (rule: string, index?: number) => {
        sheet.insertRule(rule, index)
        return temp
      },
      toSheet: (): AdoptedStyleItem => ({isCssInJs: true, cssStyleSheet: sheet})
    }
    return temp
  } catch (error) {
    const cssDom = document.createElement('style')
    rule && (cssDom.textContent = `${rule}`)
    const temp = {
      insertRule: (rule: string, index?: number) => {
        cssDom.textContent = `${cssDom.textContent}\n${rule}`
        return temp
      },
      toSheet: (): AdoptedStyleItem => ({isCssInJs: false, cssDom })
    }
    return temp
  }
}

export const useAdoptedStyle = () => ({
  addSheet: (sheet: AdoptedStyleItem) => {
    if (adoptedStyleSheets.value.includes(sheet)) return;
    adoptedStyleSheets.value = [...adoptedStyleSheets.value, sheet]
  },
  removeSheet: (sheet: AdoptedStyleItem) => {
    adoptedStyleSheets.value = adoptedStyleSheets.value.filter(item => toRaw(item) !== sheet)
  },
  removeAllSheet: () => {
    adoptedStyleSheets.value = []
  },
  createSheet
})
