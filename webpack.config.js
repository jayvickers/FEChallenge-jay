const path = require('path');

module.exports = {
  entry: ['./src/index.tsx'],
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'build/[name].bundle.js',
    chunkFilename: 'build/[name].bundle.js',
    publicPath: '/'
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 6002,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use:[
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json"
            }
          },
        ],
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss']
  }
};
