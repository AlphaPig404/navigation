var db = (function(){
  // 数据库名称
  var dbName = 'project'
  // 版本
  var version = 1
  // 数据库数据结果
  var db


  // 打开数据库
  var DBOpenRequest = window.indexedDB.open(dbName,version)
  
  // 数据库打开失败
  DBOpenRequest.onerror = function(event){
    logError('数据库打开失败')
  }
  // 数据库打开成功后
  DBOpenRequest.onsuccess = function(event){
    // 存储数据结果
    db = DBOpenRequest.result
    // 显示数据
    method.show()
  }
 
  // 下面事情执行于：数据库首次创建版本，或者window.indexedDB.open传递的新版本(版本比现在的高)
  DBOpenRequest.onupgradeneeded = function(event){
    var db = event.target.result

    db.onerror = function(event){
      logError('数据打开失败')
    }
    // 创建一个数据库存储对象
    var objectStore = db.createObjectStore(dbName,{
      keyPath: 'id',
      autoIncrement: true
    })

    // 定义存储对象的数据项
    objectStore.createIndex('id','id',{
      unique: true
    })

    objectStore.createIndex('name','name',{
      multiEntry: true
    })

  }

  var method = {
    add: function(newItem){
      var transaction = db.transaction([dbName],'readwrite')
      // 打开已经存储的数据对象
      var objectStore = transaction.objectStore(dbName)
      // 添加到数据对象中
      var objectStoreRequest = objectStore.add(newItem)

      objectStoreRequest.onsuccess = function(event){
        method.show()
      }
    },
    edit: function(id,data){
      // 编辑数据
      var transaction = db.transaction([dbName],'readwrite')
      // 打开已经存储的数据对象
      var objectStore = transaction.objectStore(dbName)
      // 获取存储大对应键的存储对象
      var objectStoreRequest = objectStore.get(id)
      // 获取成功后替换当前数据
      objectStoreRequest.onsuccess = function(event){
        // 当前数据
        var myRecord = objectStoreRequest.result
        // 遍历替换
        for(var key in data){
          if(typeof myRecord[key]!='undefined'){
            myRecord[key] = data[key]
          }
        }

        // 更新数据库存储数据
        objectStore.put(myRecord)
      }

    },
    get: function(id){
      // 编辑数据
      var transaction = db.transaction([dbName],'readwrite')
      // 打开已经存储的数据对象
      var objectStore = transaction.objectStore(dbName)

      var index = objectStore.index("name")
      // 获取存储大对应键的存储对象
      var objectStoreRequest = index.openCursor(IDBKeyRange.only("钓鱼"))
      // 获取成功后替换当前数据
      var data = []
      objectStoreRequest.onsuccess = function(event){
        // // 当前数据
        // var myRecord = objectStoreRequest.result
        // // 遍历替换
        // console.log(myRecord)
        var cursor = event.target.result
        if(cursor){
          data.push(cursor.value)
          cursor.continue()
        }else{
          console.log(data)
        }
      }
    },
    del: function(id){
      // 打开已经存储的数据对象
      var objectStore = db.transaction([dbName],'readwrite').objectStore(dbName)

      // 直接删除
      var objectStoreRequest = objectStore.delete(id)

      // 删除成功后
      objectStoreRequest.onsuccess = function(){
        method.show()
      }
    },
    show: function(cb){
      var data = []
      // 打开对象存储，获取游标列表
      var objectStore = db.transaction([dbName]).objectStore(dbName)

      objectStore.openCursor().onsuccess = function(event){
        // 如果游标没有遍历完，继续下面的逻辑
        var cursor = event.target.result
        // 如果游标没有遍历完，继续下面的逻辑
        if(cursor){
          
          data.push(cursor.value)
          // 继续下一个游标项
          cursor.continue()
        }else{
          Event.emit('onEnd',data)
          if (data == '') {
              console.log('暂无数据');    
          }
        }
      }
    }
  }

  return method
})()