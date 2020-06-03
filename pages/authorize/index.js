var app = getApp()
Page({
    data:{
        motto: '欢迎使用',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onload:function(){  // 监听页面加载
        console.log('sss')
        if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                setTimeout(()=>{
                    wx.navigateBack(); // 返回上一级
                },1000)
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
              }
            })
        }
    },
    onReady:function(){ // 监听页面初次渲染完成

    },
    onShow:function(){ // 监听页面显示

    },
    onHide:function(){ // 监听页面隐藏

    },
    onUnload:function(){ // 监听页面卸载

    },
    onPullDownRefresh:function(){ // 监听用户 页面下拉动作

    },
    onReachBottom:function(){ // 页面上拉触底的处理函数

    },
    onShareAppMessage:function(){ // 右上角分享

    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        // this.setData({
        //     userInfo: e.detail.userInfo,
        //     hasUserInfo: true
        // })
        wx.setStorageSync('userInfo', e.detail.userInfo)
        // wx.redirectTo({
        //     url: "/pages/index/index"
        //   })
          wx.redirectTo({
            url: "/packageA/pages/index/index"
          })
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
            //         // 回到原来的地方放
            //         wx.navigateBack();
            //         }
            //     }
            // })
            return;
        }

        wx.navigateBack(); // 返回上一级
        // wx.login({
        //     success:function(res){
        //         wx.request({ //判断用户是否注册
        //             url:'',
        //             data:'',
        //             success:function(res){
        //                 if( res.code == 1 ){ // 未注册
        //                     that.registerUser();
        //                     return;
        //                 }
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
    registerUser:function(){
        let that = this;
        wx.login({
            success:function(res){
                let code = res.code; // 微信登录接口返回code参数，后天通过code获取用户openId
                wx.getUserInfo({
                    success:function(res){
                        console.log(res)
                        wx.request({
                            url:'', // 注册接口
                            data:'',
                            success:(res)=>{
                                wx.hideLoading()
                                that.login() // 
                            }
                        })
                    }
                })
            }
        })
    }

})