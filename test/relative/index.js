'use strict';
var expect = require("expect.js");
expect(
	require("../..")
		.call({resourcePath: __dirname + '/tpl/question/question.tpl'})
		.indexOf("require('./choose/choose.tpl')") != -1
).to.be(true);
console.log('通过');