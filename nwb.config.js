const path = require("path");

// We have to cheat on the zero config thing because React 15.3.0 has a couple
// of global "process" references left after eliminating process.env.NODE_ENV,
// which cause a process shim to be imported from node-libs-browser.
module.exports = {
  babel: {
    plugins: ['jsx-control-statements']
  },
  webpack: {
    loaders: {
      babel: {
        test: /\.jsx?/
      }
    },
    extra: {
      module: {
        preLoaders: [
          { test: /\.js$/, loader: "source-map-loader", exclude: [/node_modules/]  },
          { test: /\.jsx$/, loader: "source-map-loader", exclude: [/node_modules/]  }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      node: {
        process: false
      }
    }
  }
}