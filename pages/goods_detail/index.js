// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo : {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url:'/goods/detail',data:{goods_id}});
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        pics: goodsObj.pics,
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      }
    })
    
  },
  handlePrevewImage(e) {
    console.log('handlePrevewImage');
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    console.log(urls);
    
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  handleCartAdd() {
    console.log('handleCartAdd');
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      console.log('不存在');
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }
    else {
      console.log('存在');
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})