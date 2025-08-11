export type Result<T = any> = {
  code: number
  message: string
  data: T
}
