'use strict';

var PNG = require('png-js');
var rgb2xterm = require('color2xterm').rgb2xterm;
var sizeOf = require('image-size');
var clc = require('cli-color');
var sign = '  ';

module.exports = function(imageUrl, callback) {
  var result = '';
  PNG.decode(imageUrl, function(pixels) {
    var width = sizeOf(imageUrl).width;
    for(var i=0, l=pixels.length; i<l; i+=4) {
      //shortColors.push(rgb2xterm(pixels[i], pixels[i+1], pixels[i+2]));
      var c = rgb2xterm(pixels[i], pixels[i+1], pixels[i+2]);
      result += clc.bgXterm(c)(sign);
      if ((i+4)%((4*width)) === 0) {
        result += '\n';
      }
    }
    callback(result);
  });
};
