const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
let ajaxTimes = 0;
export const request = (params) => {
    wx.showLoading({
        title: '加载中',
        mask: true,
    });
    ajaxTimes++;
    console.log(ajaxTimes);
    
    return new Promise((resolve, reject) => {
        var reqTask = wx.request({
            ...params,
            url: baseUrl+params.url,
            success: function (res) {
                resolve(res.data.message);
            },
            fail: function (err) {
                reject(err);
            },
            complete: ()=>{
                ajaxTimes--;
                console.log(ajaxTimes);
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
            }
        });
    });
};
