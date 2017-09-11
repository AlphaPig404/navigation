import Dexie from 'dexie'

import data from '@/assets/js/data'

export default {
  data() {
    return {
      db: []
    }
  },
  created() {
    this.initDB()
  },
  methods: {
    setLocalStore(name,value){
      value = JSON.stringify(value)
      localStorage.setItem(name,value)
    },
    getLocalStore(name){
      const value = localStorage.getItem(name)
      return value?JSON.parse(value): false
    },
    initDB(){
      var db = new Dexie('Navigation')

      db.version(1).stores({
        cards: "++id,name,url,desc,folder_id,group_id,group_name,img,bg_text,bg_color",
        groups: "++id,name,icon,folder_id",
        folders: "++id,&name"
      })

      // Open the database
      db.open().catch(function (error) {
        alert('Uh oh : ' + error)
      })

      if(this.getLocalStore('_navigation')){
        // do nothing
      }else{
        // init db
        db.folders.bulkPut(data.folders)
        db.groups.bulkPut(data.groups)
        db.cards.bulkPut(data.cards)
        this.setLocalStore('_navigation',true)
      }

      return this.db = db
    },
    initContentData(folder_id,cb){
      let cards_data = []
      const self = this
      let db = self.db

      db.groups.where('folder_id')
      .equals(folder_id)
      .toArray()
      .then(data =>{
        cards_data = cards_data.concat(data)
        
      }).then(function(){
          db.cards.where('folder_id')
          .equals(folder_id)
          .toArray()
          .then(data=>{
      
            cards_data.forEach(item => {
           
              item.links = []
              data.forEach(card => {
  
                if(card.group_id === item.id){
                  item.links.push(card)
                }
              })
            })

            cb&&cb(cards_data)
          })
      })
    },
    initNavData(cb){
      const self = this
      let db = self.db

      db.folders.where('id')
      .above(0)
      .toArray()
      .then(folder =>{
        db.groups.where('folder_id')
        .above(0)
        .toArray()
        .then(data=>{
          folder.forEach(item=>{
            item.groups = []
            data.forEach(group=>{
              if(group.folder_id === item.id){
                item.groups.push(group)
              }
            })
          })
          cb&&cb(folder)
        })
      })
    },
  }
}
