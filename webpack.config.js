module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        // libraryTarget: 'var',
        // library: 'SQLiteQueryLib'
    },
    devServer: {
        publicPath: "/dist",
    },
};
