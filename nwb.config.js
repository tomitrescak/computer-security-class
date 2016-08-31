const path = require("path");

// We have to cheat on the zero config thing because React 15.3.0 has a couple
// of global "process" references left after eliminating process.env.NODE_ENV,
// which cause a process shim to be imported from node-libs-browser.
module.exports = {
  babel: {
    plugins: ['jsx-control-statements']
  },
  webpack: {
    hotMiddleware: {
      reload: true
    },
    loaders: {
      babel: {
        test: /\.jsx?/
      }
    },
    extra: {
      entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'
      ],
      // plugins: [
      //   new webpack.HotModuleReplacementPlugin()
      // ],
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      node: {
        process: false
      }
    }
  }
}