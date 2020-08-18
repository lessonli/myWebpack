/*
* 此文件是webpack 的配置文件，用于指定webpack 执行了哪些任务*/

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
  // entry:'./src/js/index'  //简写 
  entry: {
    main:['./src/js/index','./src/index.html']
  },
  output: {
    path: resolve(__dirname, 'dist/js'),  //输出路径
    filename: 'index.js' // 输出的文件名
  },
  mode:'production',
  // 所有的loader 都要在Module 对象的rules 属性中, rules 是一个数组，数组中的每一个对象就是一个loader,
  // loader 下载后不用声明直接使用
  module: {
    rules: [
      // 解析less 但是不完美
      {
        test: /\.less$/, // 匹配所有的less 文件
        // use: [
        //   {
        //     loader: 'style-loader', 用于在html文档中创建一个style标签，把样式放进去
        //   },
        //   {
        //     loader: 'css-loader', // 将less 编译后的css 转换成commonJs的一个模块
        //   },
        //   {
        //     loader: 'less-loader',
        //     options: {
        //       lessOptions: {
        //         strictMath: true,
        //       },
        //     },
        //   },
        // ],
        // loader: 'less-loader', // 将 Less 文件编译为 CSS 文件，不生成单独的css文件，使用less-loader
        use:['style-loader','css-loader','less-loader']
      },
     
      {
        test: /\.js$/,  //只检测js文件
        exclude: /node_modules/,  //排除node_modules文件夹
        enforce: "pre",  //提前加载使用
        // 当没有语法options 的时候可以简写
        // use: { //使用eslint-loader解析
        //   loader: "eslint-loader"
        // }
        use:['eslint-loader']
      },
      // 语法转换es6->es5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: ['@babel/preset-env']  // 只能转换低级的
        //   }
        // }
        
        // 语法转换的按需引入（推荐使用）
        use: {
          loader: 'babel-loader', options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',  // 按需引入需要使用polyfill
                  corejs: { version: 3 }, // 解决不能够找到core-js 的问题
                  targets: { // 指定兼容性处理哪些浏览器
                    "chrome": "58",
                    "ie": "9",
                  }
                }
              ]
            ],
            cacheDirectory: true, // 开启babel缓存
          }
        }
      
      },
    //   样式文件中的图片资源
      {
        test: /\.(png|jpg|gif)$/,
        use:[
          {
            loader:'url-loader', //()
            options:{
              limit:8192, //8kb --> 8kb以下的图片会base64处理 （file-loader 不会识别限定）
              outputPath:'images',  // 决定文件本地输出路径
              publicPath: '/images', // 决定图片的url路径
              name: '[hash:5].[ext]'
            }
          }
        ]
      },
      // 处理html中的 图片资源 （图片经过打包变成了 hash 值 而html中却改变引入的名字 因此需要处理）
      {
        test: /\.(html)$/,
        use:['html-loader']
      },
    //  其他资源的处理
      {
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:8].[ext]'
        }
      }
    
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html' // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
  })
  ],
//  配置自动化编译
  devServer: {
    // open:'C:\\Program Files (x86)\\Google\\Chrome\\Application/chrome.exe'// 打开本机chrome
    open: true,
    compress: true, // 启动gzip 压缩
    port:8080,
    hot: true  // 模块热更新（热模替换）
    // 问题：html文件无法自动更新了，需要增加一个入口 因为 ./src/index.html 不经过 入口文件
    // main:['./src/js/index','./src/index.html']
  },
  // devtool: "cheap-module-eval-source-map"  //开发环境推荐，借鉴react 配置
  devtool: ' cheap-module-source-map'   // 生产环境推荐
}

