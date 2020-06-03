// pages/pay/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js'
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function (options) {
    let address = wx.getStorageSync('address');

    let cart = wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
      
    });

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    })

  },

  async handleOrderPay() {
    const {code} = await login();
    
    const token = wx.getStorageSync('token');
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }
  }


})