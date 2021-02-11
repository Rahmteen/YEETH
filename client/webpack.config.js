var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                },
              },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            }
        ]
    },
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        // match the output path
        contentBase: path.resolve(__dirname, 'dist'),
        // enable HMR on the devServer
        hot: true,
        // match the output 'publicPath'
        publicPath: '/',
        // fallback to root for other urls
        historyApiFallback: true,
    
        inline: true,
    
        headers: { 'Access-Control-Allow-Origin': '*' },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: { "/api/**": { target: 'http://localhost:3000', secure: false }
        },
      },
    plugins: [

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}