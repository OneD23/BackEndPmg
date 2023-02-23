module.exports = {
    // ...otras configuraciones...
    resolve: {
        fallback: {
            "os": require.resolve("os-browserify/browser"),
            "path": require.resolve("path-browserify"), util: require.resolve('util/'),
            util: require.resolve('util/'),
            stream: require.resolve('stream-browserify'),
            "crypto": require.resolve("crypto-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "fs": false,
            "child_process": false,
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "console": require.resolve("console-browserify"),
            dgram:false

        }
    },
    // ...otras configuraciones...
};
