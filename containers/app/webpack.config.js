// Plugins
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')

// Helpers
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

// Rules
const { CompileReact, CompileSass, IncludeMediaFiles, IncludeTemplateFiles, IgnoreSass } = require('./.webpack/rules');

// ====== CONFIGS
const devConfig = {
    mode: 'development',
    devtool: 'source-map',
}

const prodConfig = {
    mode: 'production',
}

// Create config from environment & shared config
function configure(mode, config, loadStyles = false) {
    const common = merge(mode == "development" ? devConfig : prodConfig, loadStyles ? {
        module: {
            rules: [
                CompileReact(),
                CompileSass(MiniCssExtractPlugin.loader),
                IncludeMediaFiles(),
                IncludeTemplateFiles(),
            ]
        }
    } : {
        module: {
            rules: [
                CompileReact(),
                IgnoreSass(),
                IncludeMediaFiles(),
                IncludeTemplateFiles(),
            ]
        }
    });

    return merge(config, common);
}

// Compile bundle.js
const clientConfig = (mode) => configure(mode, {
    target: 'web',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, '../../static'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        // new WorkboxPlugin.InjectManifest({
        //     swSrc: './src/client/worker.js',
        //     swDest: 'worker.js'
        // }),
        new CompressionPlugin({
            test: /\.(js|css)?$/i,
            algorithm: 'gzip',
        }),
        new MiniCssExtractPlugin()
    ]
}, true);

// Compile server
const serverConfig = (mode) => configure(mode, {
    target: 'node',
    entry: './src/server/index.js',
    output: {
        path: path.resolve(__dirname, mode == "development" ? "./dist" : "./build"),
        filename: 'server.js',
        publicPath: '/'
    },
    externals: [
        nodeExternals()
    ]
})

// Extract client socket.io.js
const socketConfig = () => { return {
    entry: '../../node_modules/socket.io/client-dist/socket.io.js',
    output: {
        path: path.resolve(__dirname, '../../static'),
        filename: 'wsclient.js'
    },
    plugins: [
        new CompressionPlugin({
            test: /\.(js|css)?$/i,
            algorithm: 'gzip',
        })
    ]
}}

// ===== EXPORT
module.exports = (env, options) => [clientConfig(options.mode), serverConfig(options.mode), socketConfig()]