const path = require('path');

module.exports = {
  mode: "development",
  entry: "./client/src/index.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
        ],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  }
}