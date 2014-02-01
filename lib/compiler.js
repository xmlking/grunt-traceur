var _= require('underscore');
var path = require('path');
/**
 * @param {string} content js source.
 * @param {string} file filename.
 * @param {Object} options traceur config.
 * @return {string} compiled js source.
 */
exports.compile = function(content, file, options) {
    var traceur = require('traceur');


    return _.extend(traceur.compile(content, _.extend(options, {  filename:path.basename(file) +'.es6', sourceMap:true})), { file: file });

};


