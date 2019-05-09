Page({
    data:{
        lists:[]
    },
    //通过判断手机号，来加载不同客户的订单信息
    onLoad:function () {
        var that=this;
        wx.request({
            url: 'https://localhost/server/data/order_getbyphone.php', //仅为示例，并非真实的接口地址
            data: {
                phone:wx.getStorageSync("phone")
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
               // console.log(res.data);
                that.setData({
                    lists:res.data
                })

            }
        });
    }
});