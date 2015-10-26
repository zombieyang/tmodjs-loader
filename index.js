'use strict';
var path = require('path');
var Tmod = require('tmodjs');
var rmdir = require("delete");

var timer = null;//尽量在webpack编译完成后再执行rmdir

module.exports = function () {

    this.cacheable && this.cacheable();

    var options = this.query ? JSON.parse(this.query.replace(/\?/g, "")) : {};
    options.cache = false;//不设为false就只有第一次才转化出requires，而且loader本身有cache功能
    options.combo = false;
    options.output = process.cwd() + '/.temp';

    var tmod = new Tmod(__dirname, options);
    // 不明白为什么要在构造函数里检查base/package.json的tmod版本，而且还写死了dependencies不能用devDependencies,
    // 是为了阻止别人做封装么？
    tmod.base = process.cwd().replace(/\\/g, '/');

    var output = tmod._compile(this.resourcePath.replace(/\\/g, "/"));
    if (!output || !output.output) throw new Error(output);

    //以入口tpl的后缀名为准
    var extname = path.extname(output.sourceFile);

    //转化所有子模板为require
    var requires = output.requires.map(function (req) {
        return "require('" + path.relative(path.dirname(output.sourceFile), req + extname).replace(/\\/g, '/') + "');";
    }).join('');

    clearTimeout(timer);
    timer = setTimeout(function () {
        rmdir.sync(process.cwd() + '/.temp/');
    }, 200);

    return "var template=require('tmodjs-loader/runtime');" +
        requires + "\nmodule.exports=" +
        output.output.replace(/^\/\*.*\*\/\n/, '');
};