import webpack from 'webpack';
import path from 'path';

export default {
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  devtool: 'inline-source-map',
  entry: [
    'eventsource-polyfill',
  // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
  // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'client/src/index.jsx')
  ],
  target: 'web',
  output: {
    path: `${__dirname}/client/public`,
/* Note: Physical files are only output by
 the production build task `npm run build`.*/
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        noInfo: true
      }
    })
  ],
  module: {
    rules: [
       { test: /(\.css)$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      { test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'url?prefix=font/&limit=5000'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};