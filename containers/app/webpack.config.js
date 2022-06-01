// Plugins
const CompressionPlugin = require('compression-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')

// Helpers
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

// Rules
const { CompileReact, CompileSass, IncludeMediaFiles, IncludeTemplateFiles } = require('./.webpack/rules');

// ====== CONFIGS
const devConfig = {
    mode: 'development',
    devtool: 'source-map',
}

const prodConfig = {
    mode: 'production',
}

// Create config from environment & shared config
function configure(mode, config) {
    const devMode = mode == "development";
    const common = merge(devMode ? devConfig : prodConfig, {
        module: {
            rules: [
                CompileReact(),
                CompileSass(),
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
        })
    ]
})

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

// ===== EXPORT
module.exports = (env, options) => [clientConfig(options.mode), serverConfig(options.mode)]