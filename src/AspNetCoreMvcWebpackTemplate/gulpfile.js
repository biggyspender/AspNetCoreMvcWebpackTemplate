/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var getSiteDebugConfig = require("./Scripts/Build/webpack/config/site/getSiteDebugConfig");

gulp.task("webpack", function (callback) {

    var config = getSiteDebugConfig();

    gutil.log("[webpack]", config);

    // run webpack
    webpack(config, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});