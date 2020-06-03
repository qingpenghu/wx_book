//login.js
//获取应用实例
var app = getApp();
import {API} from "../../utils/config"
import {decodeUrl} from "../../utils/util"
Page({
  data: {
    bookId:'',
    flag:false,
    goodDetail:{},
    tagsColor:["rgb(64, 6, 127)","rgb(8, 94, 135)","rgb(73, 7, 153)","rgb(4, 145, 39)","rgb(7, 43, 117)","rgb(73, 7, 153)","rgb(4, 145, 39)","rgb(7, 43, 117)"]
  },
  onLoad (e) {
    const that = this
    that.setData({
      bookId:e.id
    })
    // wx.getStorageInfoSync({
    //   success(res) {
    //     console.log(res.keys["bookList"])
    //   }
    // })
    wx.getStorageInfoSync({
      key: "bookList",
      success: function(res){
        console.log(res)
      }
      })
    
    wx.request({
      url:API+"/book/"+e.id,
      success(res){
        if(res.statusCode == 200){
          res.data.cover = decodeUrl(res.data.cover)
          that.setData({
            goodDetail:res.data
          })
        }
      }
    })
  },
  onShow () {
    let that = this
    console.log("show")
  },
  onReady(){
    console.log("onReady")
  },
  updataFn(e){
    let that = this
    Array.prototype.remove = function(val) { 
      var index = this.indexOf(val); 
      if (index > -1) { 
      this.splice(index, 1); 
      } 
    };
    let storagebookList = []
    if(wx.getStorageInfoSync("bookList")){
      storagebookList = storagebookList.concat(wx.getStorageInfoSync("bookList")) 
    }
    if( storagebookList.length>0 ) {
      if(!this.data.flag){
        storagebookList.push(this.data.bookId)
        wx.setStorageSync("bookList",storagebookList)
        that.setData({
          flag:true
        })
        // console.log(wx.getStorageInfoSync("bookList"))
      }else{
        storagebookList.remove(this.data.bookId)
        wx.setStorageSync("bookList",storagebookList)
        that.setData({
          flag:false
        })
      }
    }else{
      storagebookList.remove(this.data.bookId)
      wx.setStorageSync("bookList",storagebookList)
      that.setData({
        flag:true
      })
    }
    

  }
});