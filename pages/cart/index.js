// pages/cart/index.js
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
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function (options) {
    let address = wx.getStorageSync('address');
    if(address && address.provinceName){
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    }

    const cart = wx.getStorageSync('cart')||[];
    // const allChecked = cart.length ? cart.every(v=>v.checked) : false;
    
    this.setData({
      address,
    })
    wx.setStorageSync("address",address);

    this.setCart(cart);
  },

  async handleChooseAddress() {
    // console.log('干一行 行一行 一行行 行行行');

    /*
    wx.getSetting({
      success: (result)=>{
        console.log(result); // authSetting scope.address
        const scopeAddress = result.authSetting['scope.address'];
        if(scopeAddress !== false){
          wx.chooseAddress({
            success: (result1)=>{
              console.log(result1);
              
            }
          });
        }
        else{
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  console.log(result3);
                  
                }
              });
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    // */
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      if (scopeAddress === false) {
        await openSetting();
      }
      const res2 = await chooseAddress();
      console.log(res2);
      wx.setStorageSync("address",res2);
    } catch (error) {
      console.log(error);

    }

  },

  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked = !cart[index].checked; 
    
    this.setCart(cart);
  },

  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
      else{
        allChecked = false;
      }
    });
    allChecked = cart.length !== 0 ? allChecked: false;

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked,
    })
    wx.setStorageSync('cart', cart);
  },

  handleItemAllChange(e) {
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked = allChecked);
    this.setCart(cart);
  },

  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    console.log(operation,id);
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num === 1 && operation === -1){
      const res = await showModal({content:'您是否要删除？'});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    }
    
  },

  async handlePay() {
    const {address, totalNum} = this.data;
    if(!address.userName) {
      await showToast({title:'您还没有选择收货地址'});
      return;
    }
    if(!totalNum) {
      await showToast({title:'您还没有选购商品'});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },

  

})