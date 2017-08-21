const
    NODE_ENV = process.env.NODE_ENV || 'development',
    LISTEN_HOST = 'localhost',
    LISTEN_PORT = 3030;

var config = {
   entry: './src',

   output: {
      path: __dirname + '/src',
      filename: 'index.js'
   },

   devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,

   devServer: {
      inline: true,
      host: LISTEN_HOST,
      port: LISTEN_PORT,
      contentBase: __dirname + '/src'
   },

   module: {
      loaders: [
         {
           test: /\.css$/,
           use: [
             { loader: "style-loader" },
             { loader: "css-loader" },
           ],
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react'],
               plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
            }
         }
      ]
   },

   resolve: {
      extensions: [
        '.webpack.js',
        '.web.js',
        '.jsx',
        '.js'
      ]
    }
};

module.exports = config;
