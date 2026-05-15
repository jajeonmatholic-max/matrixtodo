if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Unregister all existing service workers first
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister()
      }
    })

    // Register fresh service worker
    setTimeout(() => {
      navigator.serviceWorker.register('/matrixtodo/sw.js?v=' + Date.now(), { scope: '/matrixtodo/' })
        .then(reg => {
          // Check for updates immediately and every 5 seconds
          reg.update()
          setInterval(() => {reg.update()}, 5000)
        })
    }, 500)
  })
}