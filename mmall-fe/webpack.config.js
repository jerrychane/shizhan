/*
* @Author: jerrychane
* @Date:   2019-06-14 03:34:33
* @Last Modified by:   jerrychane
* @Last Modified time: 2019-06-14 18:25:49
*/
const path                  = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack               = require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
// 环境变量配置，dev / onLine
var WEBPACK_ENV             = process.env.WEBPACK_ENV || 'dev'

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    }
}
// webpack config
module.exports = {

  entry: {
    'common':['./src/page/common/index.js'],//使用通用模块
    'index' :['./src/page/index/index.js'],
    'login' :['./src/page/login/index.js'],
    },

  output: {
    filename: 'js/[name].js', //存放文件的路径
    publicPath: '/dist/',//访问的路径
    path: __dirname+'/dist',
  },

  externals:{
    'jquery':'window.jQuery'
  },

  plugins:[
    //把css单独打包到文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
})
  ],



  module:{
    rules:[
        {
         test:/\.css$/,
         use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
         'css-loader',
        ],},

        { test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
          use: [{ loader:'url-loader',query:{
          limit:10000,
          publicPath:'../',
          name:'resouce/[name].[ext]'
        }}]
         }
    ]
  },

  optimization: {
     splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  },


   mode: 'development' // 设置mode
};