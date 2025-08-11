export type AsyncUpdateError<Err = any> = {
  isLast: boolean
  error: Err
}

export const generateAsyncUpdate = <T = any>(updateFun: (val: T) => void) => {
  let tagNum = 0
  return async (newVal: () => Promise<T>) => {
    const tag = ++tagNum
    const value = await newVal().catch(error => {
      return Promise.reject({
        isLast: tagNum !== tag,
        error: error
      })
    })
    const isLast = tagNum === tag
    if (isLast) updateFun(value)
    return { isLast, value }
  }
}
