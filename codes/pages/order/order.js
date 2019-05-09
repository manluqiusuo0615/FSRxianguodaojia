/*开发调试中，后台接口写好，实现交互*/
Page({
	//获取用户输入的信息
    data:{
        username:"",
		sex:0,
        phone:"",
        addr:""
    },
    //检测单选框的改变
    radioChange:function (e) {
        this.setData({sex: e.detail.value})
    },
    //触发表单的bindsubmit事件
    formSubmit:function (e) {
        var that=this;
        that.setData({username: e.detail.value.user});
        that.setData({phone: e.detail.value.phone});
        that.setData({addr: e.detail.value.addr});
        //提交时验证信息是不是为空
        if(e.detail.value.user==""&&e.detail.value.phone==""&&e.detail.value.addr=="") {
            wx.showToast({
                title: '订单信息要填写完整!',
                icon: 'loading',
                duration: 1500
            });
            setTimeout(function () {
                wx.hideToast()
            }, 2000)
        }else{//验证通过后,将信息本地存储，进行跳转，因为我“个人中心页”在tabBar上所以不能直接跟上参数
                //发起异步请求，插入到数据库   wx.request({})https请求
                //本地存储电话号码，个人中心页查询订单时使用
                wx.setStorageSync('phone',that.data.phone);
                wx.request({
                    url: 'https://localhost/server/data/order_add.php',//仅为示例，并非真实的接口地址
                    data: {
                        user_name:that.data.username,
                        sex:that.data.sex,
                        phone:that.data.phone,
                        addr:that.data.addr,
                        did:wx.getStorageSync("did")
                },
                    header: {
                        'content-type': 'application/json'
                    },
                    //订单成功后显示提示信息！
                    success: function(res) {
                        //console.log(res.data[0].oid);
                        //跳转到订单完成页
                        wx.navigateTo({
                            url: '../orderSuc/orderSuc?oid='+res.data[0].oid
                        })
                    }
                });

        }
    },
});