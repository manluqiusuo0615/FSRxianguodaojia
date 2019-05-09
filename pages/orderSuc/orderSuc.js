/*orderSuc.js*/
Page({
	//获取用户输入的信息
    data:{
        AddResult:""
    },
    onLoad:function (e) {
        var that=this;
        //console.log(e.oid);
        that.setData({AddResult:e.oid})
    }

});