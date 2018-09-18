const path = require('path')
const webpack = require('webpack')
const ROOT_PATH = path.resolve(__dirname)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // 分离css 
const fs = require('fs')
function resolve (dir) {
    return path.join(__dirname, dir)
}
console.log(123)
// fs.readdir(path.resolve(__dirname,'src'),function(err,files){
//     if (err) {
//         throw err
//     }
//     console.log(files)
// })
let files = fs.readdirSync(path.resolve(__dirname,'src/assets/css'))
let mainPath = {}
files.map((item, index) => {
    var curPath = path.resolve(__dirname,'src/assets/css', item)
    var objName = item.replace('.scss','')
    if(!fs.statSync(curPath).isDirectory()) {
        Object.assign(mainPath, {[objName]: curPath})
    }
})
module.exports = {
    // [path.resolve(ROOT_PATH, 'src/main.js'), path.resolve(ROOT_PATH, 'src/main1.js')]
    devtool: 'eval-source-map',
    entry: mainPath,
    output: {
        path:path.resolve(__dirname,'dist'),
        // filename: 'bundle.js'
        filename: './css/[name].css',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        inline: true,
        hot: true,
        port: 8090
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextWebpackPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader!sass-loader"})
                // use: ExtractTextWebpackPlugin.extract({
                //     fallback: "style-loader",
                //     use:['css-loader','sass-loader']
                // })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new ExtractTextWebpackPlugin('./css/[name].css'), // css分离插件
        new webpack.DefinePlugin({
            __DEV_ENV__: JSON.stringify('production')
        })
    ],
}