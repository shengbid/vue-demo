module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: ["@babel/plugin-transform-runtime", "transform-vue-jsx"],
  comments: false,
  env: {
    test: {
      presets: ["@babel/preset-env"],
      plugins: ["istanbul"]
    }
  }
}
