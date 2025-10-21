// Register service worker if supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registrado:', reg.scope);
      // Optionally, send message to SW to skip waiting when updated
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    } catch (err) {
      console.warn('Error registrando ServiceWorker:', err);
    }
  });
} else {
  console.log('ServiceWorker no soportado en este navegador');
}
