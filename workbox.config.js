// workbox.config.js
module.exports = {
  // Precache files from the frontend folder so URLs are like /assets/...
  globDirectory: "./frontend",
  globPatterns: [
    "**/*.{html,js,css,svg,png,jpg,jpeg,ico,json}"
  ],
  // Write the generated SW to the project root so it can be served at /sw.js
  swDest: "sw.js",
  // If a navigation request occurs while offline, serve the app shell
  navigateFallback: '/home.html',
  // Exclude dev artifacts (paths relative to the frontend folder are fine)
  globIgnores: [
    "../backend/**",
    "../database/**",
    "../node_modules/**",
    "../workbox-*.js",
    "../workbox-*.js.map",
    "../server.js"
  ],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
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