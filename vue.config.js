"use strict";
const path = require("path");

module.exports = {
  publicPath: "/", // 基本 URL
  outputDir: "dist", // 生成的生产环境构建文件的目录
  assetsDir: "", // 放置生成的静态资源的 (相对于 outputDir 的) 目录
  indexPath: "index.html", // 生成的 index.html 的输出路径
  filenameHashing: true, // 文件名hash值，控制缓存
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  }, // 多页面时配置的对象, 每个"page"应该有一个对应的 JavaScript 入口文件
  // lintOnSave: true, // 开发环境下，每次保存时lint检测代码
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false, // 使用运行时编译器的Vue构建版本
  transpileDependencies: [], // babel-loader会忽略所有node_modules中的文件, 需要转译时可以一一列出
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
  integrity: false, // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)

  // webpack配置 - 简单配置方式
  configureWebpack: {
    resolve: {
      alias: {
        // 别名
        vue$: "vue/dist/vue.esm.js",
        "@api": path.resolve(__dirname, "./src/api"),
        "@comp": path.resolve(__dirname, "./src/components"),
        "@view": path.resolve(__dirname, "./src/views"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@": path.resolve(__dirname, "./src")
      }
    }
  },
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置 - 链式操作
  chainWebpack: config => {
    // js文件babel-loader解析器
    config.module
      .rule("js")
      .test(/\.js$/)
      .use("babel-loader")
      .loader("babel-loader")
      .tap(options => {
        return options;
      });
    // 添加tpl文件的解析器
    config.module
      .rule("tpl")
      .test(/\.(html|tpl)$/)
      .use("html-loader")
      .loader("html-loader")
      .tap(options => {
        return options;
      });
    // pwa添加workbox插件
    // config.plugin("workbox");
  },

  // css相关配置
  css: {
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    modules: false // 只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
  }
};
