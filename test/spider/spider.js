/**
 * 爬虫
 * 用于爬取www.alloyteam.com/nav下面的信息
 */
const http = require('http')
const url = 'http://www.alloyteam.com/nav/'

http.get(url,function(req){
  let html = ''

  req.on('data',function(data){
    html += data
  })

  req.on('end',function(){
    console.log(html)
  })
}).on('error',function(){
  console.log('爬取出错')
})

// 只能抓取到服务端渲染的页面数据