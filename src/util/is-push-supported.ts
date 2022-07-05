export const isPushSupported = () =>
'Notification' in window &&
'serviceWorker' in navigator &&
'PushManager' in window
