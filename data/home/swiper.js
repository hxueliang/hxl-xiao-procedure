// 轮番图
const url = 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata';
export const swiperData = {
    message: [
        {
            image_src: "https://api-hmugo-web.itheima.net/pyg/banner1.png",
            open_type: "navigate",
            goods_id: 129,
            navigator_url: "/pages/goods_detail/main?goods_id=129"
        },
        {
            image_src: "https://api-hmugo-web.itheima.net/pyg/banner2.png",
            open_type: "navigate",
            goods_id: 395,
            navigator_url: "/pages/goods_detail/main?goods_id=395"
        },
        {
            image_src: "https://api-hmugo-web.itheima.net/pyg/banner3.png",
            open_type: "navigate",
            goods_id: 38,
            navigator_url: "/pages/goods_detail/main?goods_id=38"
        }
    ],
    meta: {
        msg: "获取成功",
            status: 200
    }
}