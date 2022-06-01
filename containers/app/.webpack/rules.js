const globImporter = require('node-sass-glob-importer');

module.exports.CompileReact = (rootPathPrefix="@", rootPathSuffix="./src/client/assets") => { return {
    test: /\.(js|jsx)$/i,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            plugins: [
                // [ '@loadable/babel-plugin' ],
                [ '@babel/plugin-proposal-class-properties' ],
                [ 'babel-plugin-root-import', {
                    rootPathPrefix: rootPathPrefix,
                    rootPathSuffix: rootPathSuffix
                }]
            ],
            presets: [
                [
                    '@babel/preset-env', {
                    "targets": {
                        "node": "16"
                    }
                }],
                '@babel/preset-react',
            ]
        }
    }
}}

module.exports.CompileSass = () => { return {
    test: /\.s?css$/,
    use: [
        // {
        //     loader: 'isomorphic-style-loader'
        // },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                esModule: false,
                modules: {
                    localIdentName: '[name]-[local]'
                }
            },
        },
        // {
        //     loader: 'postcss-loader'
        // },
        {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    outputStyle: 'compressed',
                    implementation: require('sass'),
                    importer: globImporter(),
                }
            }
        }
    ]
}}

module.exports.IncludeMediaFiles = () => { return {
    test: /\.(png|jpe?g|gif|svg|mp4)$/i,
    use: {
        loader: 'file-loader?name=[name].[ext]',
    },
}}

module.exports.IncludeTemplateFiles = () => { return {
    test: /template.*$/i,
    use: 'raw-loader'
}}

// module.exports.All = () => {    
// }