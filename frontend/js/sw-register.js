// Que hace: Primero, pregunta si el navegador del usuario (como Chrome, Firefox, o un navegador viejo como Internet Explorer) siquiera sabe qué es un "Service Worker".
// Si el navegador es muy viejo y no lo soporta, el script se detiene y avisa en la consola, evitando que la página se rompa.
if ('serviceWorker' in navigator) {
  // Una vez que sabe que el navegador es compatible, este comando espera a que la página web se haya cargado por completo
  window.addEventListener('load', async () => {
    // Esta es la línea más importante. Le dice al navegador: "Ve a la raíz del sitio, busca el archivo llamado /sw.js (el cerebro que Workbox generó) e instálalo
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registrado:', reg.scope);
      // A veces, cuando actualizas tu app, hay un sw.js nuevo listo para tomar el control, pero se queda "esperando" por seguridad.
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    } catch (err) {
      console.warn('Error registrando ServiceWorker:', err);
    }
  });
} else {
  console.log('ServiceWorker no soportado en este navegador');
}
