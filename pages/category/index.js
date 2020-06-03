import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  Cates: [],

  onLoad: function (options) {

    const Cates = wx.getStorageSync('Cates');
    const time = Date.now() - wx.getStorageSync('Cates').time;


    if (!Cates) {
      this.getCateList();
    }
    else if (time > 1000 * 5) {
      this.getCateList();
    }
    else {
      this.Cates = wx.getStorageSync('Cates').Cates;
      const leftMenuList = this.Cates.map(v => v.cat_name);
      const rightContent = this.Cates[0].children;

      this.setData({
        leftMenuList,
        rightContent,
      })
    }

  },

  // 获取分类
  async getCateList() {
    /*
    let obj = {
      url: '/categories'
    }
    request(obj).then(res => {
      this.Cates = res.data.message;
      wx.setStorageSync('Cates',{time:Date.now(),Cates:this.Cates});
      
      const leftMenuList = this.Cates.map(v=>v.cat_name);
      const rightContent = this.Cates[0].children;
      
      this.setData({
        leftMenuList,
        rightContent,
      })
    });
    */
    let obj = {
      url: '/categories'
    };
    const res = await request(obj);
    // this.Cates = res.data.message;
    this.Cates = res;
    wx.setStorageSync('Cates', { time: Date.now(), Cates: this.Cates });

    const leftMenuList = this.Cates.map(v => v.cat_name);
    const rightContent = this.Cates[0].children;

    this.setData({
      leftMenuList,
      rightContent,
    });
  },
  handleItemTap(e) {
    console.log(e);
    const { index } = e.currentTarget.dataset;
    const rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    })
  }
})
