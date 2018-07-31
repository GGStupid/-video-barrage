module.exports = {
  devServer: {
    proxy: {
      "/try": {
        target: "http://www.runoob.com",
        changeOrigin: true
      }
    }
  }
};
