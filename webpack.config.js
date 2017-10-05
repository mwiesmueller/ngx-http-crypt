// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');
var marked = require("marked");
var renderer = new marked.Renderer();

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';
var isTest = ENV === 'test' || isTestWatch;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};

  if (isProd) {
    config.devtool = 'source-map';
  }
  else if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }

 if (!isTest) {
   config.entry = isTest ? {} : {
     'polyfills': './demo/polyfills.ts',
     'vendor': './demo/vendor.ts',
     'app': './demo/main.ts' // our angular app
   };
 } else {
   config.entry = () => { return {}};
 }

  config.output = isTest ? {} : {
    path: root('dist'),
    // publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html', '.pug'],
  };

  var atlOptions = '';
  if (isTest && !isTestWatch) {
    // awesome-typescript-loader needs to output inlineSourceMap for code coverage to work with source maps.
    atlOptions = 'inlineSourceMap=true&sourceMap=false';
  }

  config.module = {
    rules: [
    {
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader?' + atlOptions, 'angular2-template-loader', '@angularclass/hmr-loader'],
      exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.xlf/,
      loader: 'raw-loader'
    },
    {
      test: /\.css$/,
      exclude: root('demo', 'app'),
      use: [
                {
                    loader: 'to-string-loader'
                },
                {
                    loader: 'css-loader'
                }]
    },
    {
      test: /\.css$/,
      include: root('demo', 'app'),
      loader: 'raw-loader!postcss-loader'
    },
    {
      test: /\.(scss|sass)$/,
      exclude: root('demo', 'style'),
      loader: 'raw-loader!postcss-loader!sass-loader'
    },
    { test: /\.html$/,
      loader: 'raw-loader',
      exclude: root('demo', 'public')
    },
    { test: /\.pug/,
      loader: [ 'raw-loader', 'pug-html-loader' ]
    },
    {
      test: /\.md$/, use: [
        {
          loader: "html-loader"
        },
        {
          loader: "markdown-loader",
          options: {
              pedantic: true,
              renderer
          }
        }
      ]
    }
    ]
  };

  if (isTest && !isTestWatch) {
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'post',
      include: path.resolve('demo'),
      loader: 'istanbul-instrumenter-loader',
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
    });
  }

  if (!isTest || !isTestWatch) {
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      exclude: /(build)/
    });
  }

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    new WebpackShellPlugin({
      onBuildStart: [ 'gulp watch' ]
    }),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)demo|demo)(\\|\/)linker/,
      root('./demo') // location of your demo
    ),

    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        sassLoader: {
        },
        postcss: [
          autoprefixer({
            browsers: ['last 3 version']
          })
        ]
      }
    })
  ];

  if (!isTest && !isTestWatch) {
    config.plugins.push(

      new CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),

      new HtmlWebpackPlugin({
        template: './demo/public/index.html',
        chunksSortMode: 'dependency'
      }),

      new ExtractTextPlugin({filename: 'css/[name].[hash].css', disable: !isProd})
    );
  }

  if (isProd) {
    config.plugins.push(

      new webpack.NoErrorsPlugin(),

      new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),

      new CopyWebpackPlugin([{
        from: root('demo/public')
      }])
    );
  }

  config.devServer = {
    contentBase: './demo/public',
    historyApiFallback: true,
    disableHostCheck: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
