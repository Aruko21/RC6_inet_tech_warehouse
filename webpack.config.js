const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
    return {
        entry: "./src/index.js",
        mode: options.mode,
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "index_bundle.js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                    use: ["file-loader"]
                }
            ]
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: "./public/index.html"
            }),
            new MiniCssExtractPlugin()
        ],
        resolve: {
            extensions: [".js", ".jsx", ".css", ".less"],
            alias: {
                "Components": path.resolve(__dirname, "src/components"),
                "Static": path.resolve(__dirname, "public")
            }
        }
    }
};
