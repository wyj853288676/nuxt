module.exports = {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    middleware: [
    ],


    serverMiddleware: [
        "~/server-middleware/staticData.js",
        "~/server-middleware/global-proxy.js"
    ],


    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/proxy'
    ],
    proxy: {
        "/api/*": {
            target: "http://127.0.0.1:7001",
            pathRewrite: {
                '^/api': ''
            }
        }
    },


    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Newniti',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [{
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: ''
        }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },


    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'element-ui/lib/theme-chalk/index.css',
        {
            src: '~/assets/css/index.scss',
            lang: 'scss'
        },
        {
            src: '~/assets/css/animations.scss',
            lang: 'scss'
        },
        {
            src: '~/assets/css/form.scss',
            lang: 'scss'
        },
    ],


    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/ant-design',
        '@/plugins/element-ui',
    ],


    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,


    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],


    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        // analyze: true, // 使用webpack-bundle-analyzer来可视化包以及如何优化它们

        transpile: [/^element-ui/],
        extend: function (config, {
            isDev,
            isClient
        }) {
            var newConfig = Object.assign({}, config, {
                node: {
                    fs: 'empty'
                }
            })
            return newConfig
        },
    },
    //ignore the starting question (Are you interested in participating? Y/n)
    telemetry: false,


}