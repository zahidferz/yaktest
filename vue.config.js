// const appConfig = require('./src/app.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const plugins = process.env.RUN_ANALYZER ? [new BundleAnalyzerPlugin()] : []
module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'Taxes',
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    plugins,
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  pwa: {
    name: 'Taxes',
    themeColor: '#6D31FF',
    backgroundColor: '#6D31FF',
    msTileColor: '#6D31FF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'favicon-32x32.svg',
      favicon16: 'favicon-16x16.svg',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    manifestOptions: {
      background_color: '#6D31FF',
      icons: [
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    ...(process.env.API_BASE_URL // Proxy API endpoints to the production base URL.
      ? {
          proxy: {
            '/api': {
              target: process.env.API_BASE_URL,
            },
          },
        } // Proxy API endpoints a local mock API.
      : {
          before: require('./tests/mock-api'),
        }),
    // CI env variable should be set in CD/CI pipeline to avoid issues with custom /etc/hosts
    host: process.env.CI ? 'localhost' : 'dev.local',
  },
}
