//app.js
App({
  onLaunch: function () {
    var that = this;
    /**
   * 初次加载判断网络情况
   * 无网络状态下根据实际情况进行调整
   */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });       
  
    // 判断是否登录
    let token = wx.getStorageSync('token');
    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    // wx.request({
    //   url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
    //   data: {
    //     token: token
    //   },
    //   success: function (res) {
    //     if (res.data.code != 0) {
    //       wx.removeStorageSync('token')
    //       that.goLoginPageTimeOut()
    //     }
    //   }
    // })
  },

    
  goLoginPageTimeOut: function () {
    console.log("aaa")
    // setTimeout(function(){
    //   wx.navigateTo({
    //     url: "/pages/authorize/index"
    //   })
    // }, 1000)    
  },
  goStartIndexPage: function () {
    setTimeout(function () {
      wx.redirectTo({
        url: "/pages/start/index"
      })
    }, 1000)
  },
  globalData:{
    userInfo:null,
    isConnected: true // 网络是否连接
  }
  /*
  根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒；
  1、/pages/to-pay-order/index.js 中已添加关闭订单、商家发货后提醒消费者；
  2、/pages/order-details/index.js 中已添加用户确认收货后提供用户参与评价；评价后提醒消费者好评奖励积分已到账；
  3、请自行修改上面几处的模板消息ID，参数为您自己的变量设置即可。  
   */
})
