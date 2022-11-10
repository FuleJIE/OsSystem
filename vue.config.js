module.exports = {
  publicPath: "./",

  pwa: {
    themeColor: "#000000",
    msTileColor: "#000000",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#000000",
    },
  },
  devServer: {
    proxy: {
      "/fileSystem": {
        target: "http://127.0.0.1:8087",
      },
      "/allSystem": {
        target: "http://127.0.0.1:8087",
      }
    },
  },
};
