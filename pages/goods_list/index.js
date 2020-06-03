// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合0',
        isActive: true
      },
      {
        id: 1,
        value: '综合1',
        isActive: false
      },
      {
        id: 2,
        value: '综合2',
        isActive: false
      },
    ],
    goodsList: []
  },
  QueryParame: {
    query: '华为小米',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  PageTotal: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParame.cid = options.cid || '';
    this.QueryParame.query = options.query || '';
    this.getGoodsList();

    
  },
  async getGoodsList() {
    const res = await request({url:'/goods/search',data:this.QueryParame});
    console.log(res,'res==');
    const goodsList = res.goods;
    this.PageTotal = Math.ceil(res.total / this.QueryParame.pagesize);
    
    this.setData({
      goodsList: [...this.data.goodsList,...goodsList]
    });

    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e) {
    console.log(e);
    const {index} = e.detail;
    console.log(index);
    const {tabs} = this.data;
    tabs.forEach( (v,i) => {
      i === index ? v.isActive = true: v.isActive = false
    });
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    if(this.QueryParame.pagenum>=this.PageTotal){
      console.log('没有下一页');
      wx.showToast({
        title: '没有下一页',
        icon: ''
      })
    }
    else{
      console.log('有下一页');
      this.QueryParame.pagenum++;  
      this.getGoodsList(); 
    }
  },
  onPullDownRefresh() {
    console.log('下拉');
    this.setData({
      goodsList: []
    });
    this.QueryParame.pagenum = 1;
    this.getGoodsList();
  },
  
})