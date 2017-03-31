//index.js
//获取应用实例
var helper = require('../../utils/util')
var app = getApp()
Page({
  data: {
    motto: '你好 儿子！',
    userInfo: {},
    familyData:[],
    model:'',
    latitude:null,
    longitude:null

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  selectLocation:function(e){
    const {latitude,longitude} = e.target.dataset;
    console.log(e.target.dataset)
    wx.openLocation({
      latitude,
      longitude
    })
  },
  cellPhone:function(e){
    console.log(e)
    const {cellphone,son} = e.target.dataset;
    wx.makePhoneCall({
      phoneNumber: cellphone,
      success:function(){
        wx.showToast({title:`和${son}儿子聊得开心吗?`})
        setTimeout(()=>wx.hideToast(),2000)
      },
      error:function(){
        wx.showToast({title:"哦豁,打不通"})
        setTimeout(()=>wx.hideToast(),2000)
      }
    })
  },
  onLoad: function () {
    var that = this
      //获取系统信息
      const {model} = wx.getSystemInfoSync();   //手机型号
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo,familyData){
      //更新数据
      that.setData({
        userInfo,
        familyData
      })

      that.setData({model})
      console.log('family',familyData)
      // console.log(that.getData('userInfo'))
    })
    //设置页面标题
    wx.setNavigationBarTitle({
      title: '儿子列表'
    })
    // window.fetch('../data/family.json').then(d=>console.log(d))
    // wx.showNavigationBarLoading();


    //获取经纬度
    wx.getLocation({
      success: function(res){
        // success
        const {latitude,longitude} = res;
        that.setData({
          latitude,
          longitude
        })
      }.bind(this),
      fail: function(res) {
        wx.showToast({
          title:"获取地理位置失败"
        })
      }
    })
    
  }
})
