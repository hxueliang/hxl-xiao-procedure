// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const userinfo = wx.getStorageSync('userInfo');
    console.log(userinfo,'==userinfo');
    this.setData({
      userinfo
    })
  },


})