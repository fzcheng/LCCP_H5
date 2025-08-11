<template>
  <BackWrap :title="title">
    <q-page class="column">
      <iframe
        :src="url"
        frameborder="0"
        allowpaymentrequest
        allowfullscreen
        allow="accelerometer *; ambient-light-sensor *; payment: *; otp-credentials: *; autoplay *; camera *; clipboard-read *; clipboard-write *; display-capture *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; magnetometer *; microphone *; midi *; picture-in-picture *; usb *; vr *; wake-lock *; xr-spatial-tracking *; window-management *; web-share *; storage-access: *; serial: *; screen-wake-lock: *; publickey-credentials-get: *;publickey-credentials-create: *; local-fonts: *; idle-detection: *; identity-credentials-get: *; hid: *; document-domain: *; deferred-fetch-minimal: *; deferred-fetch: *; cross-origin-isolated: *; compute-pressure: *; browsing-topics: *; bluetooth: *; autoplay: *; attribution-reporting: *; ambient-light-sensor: *; accelerometer: *;Permissions-Policy: *;"
        sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation allow-top-navigation-by-user-activation allow-downloads-without-user-activation"
        style="border: none; outline: none; height: calc(100vh - 45px)"
        class="flex-1 block full-width q-pa-none q-ma-none"
      ></iframe>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = decodeURI((route.query.titleWebView ?? '') as string)
const url = route.query.urlWebView ? decodeURIComponent(route.query.urlWebView as string) : ''
</script>
