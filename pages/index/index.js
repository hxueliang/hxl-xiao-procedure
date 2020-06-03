//index.js
//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [], // 轮播图list
    catesList: [], // 分类list
    floorList: [], // 楼层list
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播图
  getSwiperList() {
    /*
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      }
    });
    */
    let obj = {
      url: '/home/swiperdata'
    }
    request(obj).then(res => {
      this.setData({
        swiperList: res.map(v=>{
          return {
            ...v,
            navigator_url: v.navigator_url.replace('main','index')
          }
        })
      })
    });
  },
  // 获取分类list
  getCateList() {
    let obj = {
      url: '/home/catitems'
    }
    request(obj).then(res => {
      this.setData({
        catesList: res
      })
    });
  },
  // 获取楼层list
  getFloorList() {
    let obj = {
      url: '/home/floordata'
    }
    request(obj).then(res => {
      console.log(res,'==获取楼层list');
      this.setData({
        floorList: res.map(v=>{
          return {
            ...v,
            product_list: v.product_list.map(v1=>{
              let urlArr = v1.navigator_url.split('?');
              let url = urlArr[0] + '/index?' + urlArr[1];
              return {
                ...v1,
                navigator_url: url
              }
            })
          }
        })
      })
    });
  },

  
});