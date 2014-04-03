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
  var opts = _.extend(options, { filename: file, sourceMap: options.sourceMaps});
  return _.extend(traceur.compile(content, opts), { file: file });
};

