const path = require('path');
const loader = require('sass-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        home: './components/home/home.js',
        contact: './components/contact/contact.js'
    },
    module: {
        rules: [
            {
                test: /.(scss|css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'                    
                ]
            },
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpeg|png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:6].[ext]',
                    outputPath: 'images',
                    publicPath: 'images',
                    emitFile: true,
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new MinifyPlugin({}, {
            comments: false
        }),
        new HtmlWebpackPlugin({
            title: 'home',
            template: 'components/home/index.html',
            filename: 'index.html',
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            title: 'contact',
            template: 'components/contact/contact.html',
            filename: 'contact.html',
            chunks: ['contact'],
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/components/nav.html'),
            location: 'navbar-component',
            template_filename: ['index.html', 'contact.html'],
            options: {
                appname: "webpack_config"
            }
        }),

        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/components/footer.html'),
            location: 'footer-component',
            template_filename: ['index.html', 'contact.html'],
            options: {
                appname: "webpack_config"
            }
        })
    ]
}