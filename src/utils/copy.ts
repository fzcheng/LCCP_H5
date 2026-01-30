import copy from 'copy-to-clipboard'
import { isIOS, isIOS13 } from 'mobile-device-detect'
import { copyToClipboard } from 'quasar'
import { Notify } from 'quasar'

export const copyText = async (text: string) => {
  if ( isIOS || isIOS13) {
    return await copyToClipboard(text)
  }
  try {
    copy(text)
  } catch (error) {
    return await copyToClipboard(text)
  }

}

export const copyTextNotify = async (text: string,t: Function) => {
  await copyText(text)
  Notify.create({
    type: 'positive',
    message: t('submitTIps14')
  })
}
