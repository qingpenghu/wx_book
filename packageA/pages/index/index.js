//index.js
//获取应用实例
const app = getApp()
// import {decodeUrl} from "../../utils/util"
import {API} from "../../../utils/config"
Page({
  data: {
    imgUrls: [
      'https://oss.eratpay.com/4f27f14a97fa40d982445e1b877d233f.jpg',
      'https://oss.eratpay.com/432423cd44bb48918953f63912f2bb34.jpg',
      'https://oss.eratpay.com/b5cb06905d7f40f8be97353cfaa66e9a.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    swiperCurrent:0,
    scrollTop:0,
    start:0, // 开始页码
    limit:10, // 每页数量
    query:'一念',
    recommendList:[],
    lowerFlag:true,
  },
  swiperChange (e) {
    this.setData({
      swiperCurrent:e.detail.current
    })
  },
  //事件处理函数
  onLoad () {
    this.getIndexData()
  },
  listenerSearchInput(e){
    this.setData({
      query:e.detail.value
    })
  },
  toSearch(){
    this.setData({
      start:0
    })
    this.getIndexData(true)
  },
  getIndexData(searchFlag){
    const that = this
    wx.request({
      url:API + '/book/fuzzy-search',
      method:'get',
      data:{
        query:that.data.query,
        start:String(that.data.start),
        limit:String(that.data.limit)
      },
      success:(res) => {
        // for( var i = 0;i<res.data.books.length;i++){
        //   res.data.books[i].cover = decodeUrl(res.data.books[i].cover)
        // }
        let goodlist =[];
        if( !searchFlag ) {
           goodlist = that.data.recommendList
        }else{
          // wx.pageScrollTo({
          //   scrollTop: 0
          // })
          that.setData({
            recommendList:[],
          })

      }
        goodlist = goodlist.concat(res.data.books)
        if(res.statusCode == 200){
          that.setData({
            recommendList:goodlist,
            lowerFlag:true
          })
        }
      }
    })
  },
  onReachBottom: function () {
    const that = this
    if( !that.data.lowerFlag  ){
      return
    }
    that.setData({
      start: that.data.start + 1,
      lowerFlag:false
    })
    that.getIndexData()
    // this.setData({
    //   curPage: this.data.curPage+1
    // });
    // this.getGoodsList(this.data.activeCategoryId, true)
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  toDetailsTap(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url:"/pages/detail/index?id="+e.currentTarget.dataset.id
    })
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '嗨学',
      path: '/pages/index/index',
      success: function(e) {
          wx.showShareMenu({
            withShareTicket: true
          })
        }
    }
  },
})
