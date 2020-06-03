// pages/auth/index.js
import { login } from '../../utils/asyncWx.js'
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  async hendleGetUserInfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail;
    const {code} = await login();
    const obj = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    const {token} = await request({url:'/users/wxlogin',data:obj,method:'post'});
    console.log(token); // 不是企业账号，无法成功
    
  }
})