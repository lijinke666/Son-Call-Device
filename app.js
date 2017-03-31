//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              // that.globalData.familyData.push(res.userInfo)
              typeof cb == "function" && cb(that.globalData.userInfo,that.globalData.familyData)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    familyData:[{
      name:"李金珂",
      age:"20",
      appellation:"爹爹",
      cellPhone:"17602889647",
      latitude:30.701638,
      longitude:104.080549
    },{
      name:"王南平",
      age:"22",
      appellation:"大儿子",
      cellPhone:"17602889647",
      latitude:30.546153,
      longitude:104.080659
    },{
      name:"刘木玲",
      age:"19",
      appellation:"小儿子",
      cellPhone:"17602889647",
      latitude:30.534765,
      longitude:104.053553
    }]
  }
})