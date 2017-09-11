// 自定义事件监听

var Event = (function(){
  var handles = {}
  return {
    on: function(eventName,handle){
      if(typeof handle !== 'function'){return}

      if(!handles[eventName]){
        handles[eventName] = []
      }

      handles[eventName].push(handle)
    },
    emit: function(eventName,data){
      handles[eventName].forEach(function(item){
        item&&item(data)
      })
    }
  }
}())