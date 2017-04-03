var webpack    = require('webpack');
var path       = require('path');
var util       = require('gulp-util');
var config     = require('./gulp/config');

function createConfig(env) {
    var isProduction, webpackConfig;

    if (env === undefined) {
        env = process.env.NODE_ENV;
    }

    isProduction = env === 'production';

    webpackConfig = {
        context: path.join(__dirname, config.src.js),
        entry: {
            // vendor: ['jquery'],
            app: './app.js'
        },
        output: {
            path: path.join(__dirname, config.dest.js),
            filename: '[name].js',
            publicPath: 'js/'
        },
        devtool: isProduction
            ? '#source-map'
            : '#cheap-module-eval-source-map',
        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     filename: '[name].js',
            //     minChunks: Infinity
            // }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                IScroll: 'scrolloverflow'
            }),
            new webpack.NoErrorsPlugin()
        ],
        resolve: {
            alias: {
                "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
                "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
                "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
                "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
                "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
                "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
                "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
                "CSSPlugin": path.resolve('node_modules', 'gsap/src/uncompressed/plugins/CSSPlugin.js'),
                "CSSRulePlugin": path.resolve('node_modules', 'gsap/src/uncompressed/plugins/CSSRulePlugin.js'),
                "scrolloverflow": path.resolve('node_modules', 'fullpage.js/vendors/scrolloverflow.min.js'),
            },
            extensions: ['', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }
            ]
        }
    };

    if (isProduction) {
        webpackConfig.plugins.push(
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );
    }

    return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
