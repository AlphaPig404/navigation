var jsonp = require('jsonp')
var url = "http://www.alloyteam.com/nav/build/fe-nav/index.js#"
var opts = null
var fn = function webpackJsonp(data){
  console.log(data)
}
jsonp(url, opts, fn)