//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex:function(){  // 判断是否授权，授权后token 是否失效 失效后需要重新登录
    const that = this
    let userInfo = wx.getStorageSync('userInfo')  // 模拟token
    if (!userInfo) {
      console.log("start")
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
      return
    }

    if (app.globalData.isConnected) {
      wx.redirectTo({
        url: '/packageA/pages/index/index',
      });
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  onLoad:function(){
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName') ? wx.getStorageSync('mallName'):'嗨学'
    })
  },
  onShow:function(){
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function(){
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  },
  login:function(){
    const that = this;
    let token = wx.getStorageSync("token");
    if( token ){ // 判断token是否存在
        // wx.request({
        //     url: '', // 判断token 是否有效
        //     data: {
        //         token: token
        //     },
        //     success: function (res) {
        //         if (res.data.code != 0) {
        //         wx.removeStorageSync('token')
        //         that.login();
        //         } else {
                //  // token 有效去往首页
                //     if (app.globalData.isConnected) {
                //       wx.navigateTo({
                //         url: '/pages/index/index',
                //       });
                //     } else {
                //       wx.showToast({
                //         title: '当前无网络',
                //         icon: 'none',
                //       })
                //     }
        //         }
        //     }
        // })
        return;
    }

    wx.navigateBack(); // 返回上一级
    // wx.login({
    //     success:function(res){
    //         wx.request({ //用户重新登录
    //             url:'',
    //             data:'',
    //             success:function(res){
    //                 if( res.data.code != 0 ){
    //                     wx.showModal({
    //                         title:'提示',
    //                         content:'无法登陆，请重试',
    //                         showCancel:false
    //                     })
    //                     return;
    //                 }
    //                 wx.setStorageSync("token",res.data.token)
    //                 wx.setStorageSync("uid",res.data.uid)
    //                 wx.navigateBack(); // 返回上一级
    //             }
    //         })
    //     }
    // })
  },
});