

var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var extractor = require("extract-text-webpack-plugin");
//var buildOutputPath = path.join(__dirname, 'build');
//rimraf.sync(buildOutputPath);
module.exports = {

    devtool: 'eval',
    entry:{/*'webpack/hot/dev-server' ,'./src/Announce/index.jsx'*/
              // app_announce: path.resolve(__dirname, './src/Announce/index.jsx'),
              // app_superadmin: path.resolve(__dirname, './src/Super_Admin/index.jsx')  

            announce: './src/Announce/index.jsx',
            superadmin: './src/Super_Admin/index.jsx',
           // commons: "./entry-for-the-commons-chunk", 
            vendors: ['react']
          }  
             
          ,
    output: {
       path: path.join(__dirname, "./app_announce"),
        //filename: "[name].bundle.js",
         filename: "[name].js"
      // path: path.resolve('./app/'),
          // chunkFilename: "[id].chunk.js"
     
       // path: '',
       
         // filename: "./app_announce/bundle.js",
        //  filename: './app_announce/[name].js',
          //chunkFilename: './app_announce/[id].chunk.js',
    },
  
      module: {
        loaders: [

              // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
              // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

              // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
              // loads bootstrap's css.

             //{
              //  test: /\.css$/,
            //    loader: 'style-loader!css-loader'
             // },   
              { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
              { test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: "file-loader?name=app_announce/woff/[hash].[ext]" },
              { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader?name=app_announce/ttf/[hash].[ext]" },
              { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader?name=app_announce/eot/[hash].[ext]" },
              { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader?name=app_announce/image/[hash].[ext]" },
              // {
              //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              //     loader: 'url-loader?limit=10000&minetype=application/font-woff'
              // }, 
              // {
              //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              //   loader: "url?limit=10000&mimetype=application/font-woff"
              // }, {
              //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              //   loader: "url?limit=10000&mimetype=application/octet-stream"
              // }, {
              //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              //   loader: "file?name=./[hash].[ext]"
              // }, {
              //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              //   loader: "url?limit=10000&mimetype=image/svg+xml"
              // },
               { test: /\.css$/, loader: extractor.loader("style","css") },
               {
                  test: /\.(jpe?g|png|gif)$/i,
                  loaders: [
                      'file-loader?name=app_announce/image/[hash].[ext]'
                  ]
              },

            // {test: /\.css$/, loader: "style-loader!css-loader"},
            // {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=./app_announce/[hash].[ext]'},
            // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=./app_announce/[hash].[ext]'},
            // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=./app_announce/[hash].[ext]'},
            // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml?name=./app_announce/[hash].[ext]'},
            // //{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=./app_announce/[hash].[ext]" },
              {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                  presets: [
                    'react',
                    'es2015'
                  ],
                  plugins: [
                    'transform-class-properties',
                    'transform-object-rest-spread'
                  ]
                }
            },
            
            ,
        ]
    },
    //plugins: [
        //new CommonsChunkPlugin("admin-commons.js", ["superadmin"]),
        //new CommonsChunkPlugin("commons.js", ["announce","admin-commons.js"])
   // ],
   plugins: [
    new ExtractTextPlugin("styles.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ],
  plugins: [
            new CommonsChunkPlugin("commons.chunk.js"),

          new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        // new webpack.HotModuleReplacementPlugin(),
         new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
          }),
         new webpack.optimize.UglifyJsPlugin(),
         new webpack.optimize.DedupePlugin(),
         new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
         new webpack.optimize.MinChunkSizePlugin({minChunkSize: 200}),
         new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              "window.jQuery": "jquery"
          }),
         new CommonsChunkPlugin({
            filename: "commons.js",
            name: "commons"
        })
  ],
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),  
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')],
  }
};