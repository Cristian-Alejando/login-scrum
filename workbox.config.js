// workbox.config.js
module.exports = {
  // Aqui se buscan los archivos y se traen todos los que terminen en .html, .js, .css, y todos los formatos de imagen 
  globDirectory: "./frontend",
  globPatterns: [
    "**/*.{html,js,css,svg,png,jpg,jpeg,ico,json}"
  ],
  // Despues de generar el service worker, se gurda en la raiz del proyecto como sw.js
  swDest: "sw.js",
  // Si intentas hacer algo que no se guardo en la cache te redirecciona a home.html
  navigateFallback: '/home.html',
  // Mientras buscas archivos, ignora por completo la carpeta backend/, node_modules/ y el archivo server.js
    globIgnores: [
    "../backend/**",
    "../database/**",
    "../node_modules/**",
    "../workbox-*.js",
    "../workbox-*.js.map",
    "../server.js"
  ],
  // Si diferentes usuarios entran con Url distintas, las ignora y las trata como home.html
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  // aqui se usan los tipos de fuentes que usa el navegador, sin el, se usaria uno predeterminado
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts-stylesheets",
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
  ],
};