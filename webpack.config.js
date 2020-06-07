require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const ip = require("ip");


module.exports = (env) => {

    return {
        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },

        entry: {
            main: './front/index.tsx',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './dist'),
        },

        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
                DEBUG: false,
                IP: ip.address(),
                CHAT_WS: `ws://${ip.address()}:${process.env.PORT}/chat`
            })
        ],

        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: [
                        /node_modules/,
                        /server/
                    ],
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        // externals: {
        //     react: "React",
        //     "react-dom": "ReactDOM"
        // }
    }
};
