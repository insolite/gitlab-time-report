var config = {
   entry: './src',

   output: {
      path: __dirname + '/src',
      filename: 'index.js'
   },

   devServer: {
      inline: true,
      port: 3030,
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
