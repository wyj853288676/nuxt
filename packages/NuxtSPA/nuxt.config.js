import router from "./router";

var config = {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,
    server: {
        port: 8000,
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'demo',
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
        }],
        script: [{
                src: '/js/jquery.min.js'
            },
            {
                src: '/js/plugins.js'
            }
        ],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
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
            src: '~/assets/css/themes.scss',
            lang: 'scss'
        },
        {
            src: '~/assets/css/form.scss',
            lang: 'scss'
        },
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/ant-design',
        '@/plugins/element-ui',
        {
            src: '@/plugins/client/myComponents',
            mode: 'client',
        },
        {
            src: '@/plugins/client/widgets',
            mode: 'client',
        },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],



    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^element-ui/],
        extend: function(config, {
            isDev,
            isClient
        }) {
            var newConfig = Object.assign({}, config, {
                node: {
                    fs: 'empty'
                }
            })
            return newConfig
        }
    },

}

export default config;