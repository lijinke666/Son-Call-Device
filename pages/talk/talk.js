var app = getApp()
Page({
    data:{
        'type':"default",
        'disabled':true,
        'loadingText':'家庭成员召集中'
    },
    onChange:function(e){
        let {value}= e.detail;
        console.log(value)
        if(value.length>0){
            this.setData({
                'type':"primary",
                'disabled':false
            })
        }else{
            this.setData({
                'type':"default",
                'disabled':true
            })
        }
    },
    onLoad:function(){
        wx.setNavigationBarTitle({
            title: '家庭会议室'
        })
        wx.showLoading({
            title:this.data.loadingText
        })
        wx.getNetworkType({
            success(res){
                const {networkType} = res.networkType
                if(networkType === 'none'){
                    wx.showToast({title:"当前无网络"})
                }
            }
        })
        wx.onNetworkStatusChange(function(){
            if(!res.isConnected){
                   wx.showToast({title:"当前无网络"})
            }
        })
    }
});