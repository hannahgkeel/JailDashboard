const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "frontend", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "public", "index.html"),
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};
