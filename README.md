微信小程序在近期比较火热，作者在闲暇之余研究后决定做一个今日头条的小demo。

---------
+ 微信小程序官方文档:http://wxopen.notedown.cn/


![TodayNews.gif](http://upload-images.jianshu.io/upload_images/1912827-ed2da16bb6bf6ff3.gif?imageMogr2/auto-orient/strip)
----------
首页的开发过程。

1. 首先在app.json中配置每个页面
```
{
  "pages":[
    "pages/index/index",
    "pages/attention/attention",
    "pages/mine/mine",
    "pages/video/video"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#d75b5d",
    "navigationBarTitleText": "今日头条",
    "navigationBarTextStyle":"white"
  },
   "tabBar": {
    "color": "#959394",
    "selectedColor": "#959394",
    "backgroundColor": "#f0f0f0",
    "borderStyle": "white",
    "list": [{
      "pagePath": "pages/index/index",
      "iconPath":"imges/tabbar/home_tabbar_22x22_.png",
      "selectedIconPath":"imges/tabbar/home_tabbar_press_22x22_@2x.png",
      "text": "首页"
    }, {
      "pagePath": "pages/video/video",
      "iconPath":"imges/tabbar/video_tabbar_22x22_.png",
      "selectedIconPath":"imges/tabbar/video_tabbar_press_22x22_@2x.png",
      "text": "视频"
    },{
      "pagePath": "pages/attention/attention",
      "iconPath":"imges/tabbar/newcare_tabbar_night_22x22_.png",
      "selectedIconPath":"imges/tabbar/newcare_tabbar_press_22x22_@2x.png",
      "text": "关注"
    },{
      "pagePath": "pages/mine/mine",
      "iconPath":"imges/tabbar/mine_tabbar_22x22_.png",
      "selectedIconPath":"imges/tabbar/mine_tabbar_press_22x22_@2x.png",
      "text": "我的"
    }]
  }
}
```

2. 随后我们创建导航条。
布局：运用盒型布局即可。
思路：由于这个有动画效果，当时的想法是利用js来控制动画效果，配合微信的wx.createAnimation(OBJECT)来创建动画并且实现，当我点击当前的按钮的时候，用js来控制其大小变化，当我点击其他按钮的时候，遍历所有按钮然后设当前的按钮为变大状态，其他则缩小。**但是在实现的时候发现在数据源用的是微信中数据绑定的形式渲染的，当前的按钮变大后其他按钮都随之变化，控制较难，所以作者放弃了这种思路**

  最终思路： 利用css3动画配合一个Bool值来使当前的视图发生变化。

  +  使用``` <scroll-view scroll-x="true" scroll-y="false" class="tpscview" scroll-left="-2">```来对导航条进行横向设置。
  + 使用BOOL型数据animation来控制当前的状态。
   + 使用css3代码来控制动画

```
.curPage {
     animation:myfirst 0.1s;
     animation-fill-mode:forwards;
}

@keyframes myfirst
{
	to {
       font-size: 50rpx;
    }
}
```

![导航条](http://upload-images.jianshu.io/upload_images/1912827-61a8f73fd18a1066.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)3. 获取内容
+ 作者封装了以下网络接口首先初始化数据端。

```
import  {
    device_id,
    iid,
    BASE_URL,
} from "./constant.js"
var net = require("./netLoad.js");
function fetchHeadName(){
    let url = BASE_URL + "article/category/get_subscribed/v1/?"
    let params = {"device_id": device_id,"aid": 13,"iid": iid}
     return net.fetchApi(url, params, "GET").then(data=>data)
}

function loadHomeCategoryNewsFeed(category){
     let url = BASE_URL + "api/news/feed/v39/?"
     let params = {"device_id": device_id,"category": category,"iid": iid}
     return net.fetchApi(url,params,"GET").then(data=>data);
}

function loadHomeCategoryMoreNewsFeed(category, lastRefreshTime){
     let url = BASE_URL + "api/news/feed/v39/?"
     let params = {"device_id": device_id,
                      "category": category,
                      "iid": iid,
                      "last_refresh_sub_entrance_interval": lastRefreshTime}
     return net.fetchApi(url, params, "GET").then(data=>data);
}

export {
    fetchHeadName,
    loadHomeCategoryNewsFeed,
    loadHomeCategoryMoreNewsFeed
} 


```
+ 接下来通过NetLoad.js封装文件来对网络进行请求。
```
import Promise from "../../bluebird/js/browser/bluebird.min.js"
module.exports = {
  fetchApi (url,params,method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}`,
      data: Object.assign({}, params),
      method:method,
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    })
  })
  }
}
```
+ 接下来通过wx.loading 组件来对用户进行请求提示
```
 <loading hidden="{{loading}}">
        加载中...
 </loading>
```
最终完成了此页面。

---------
另外其他页面详见作者github上的代码。

+ 若觉得本文对您有帮助请给个star。
+ 若有改进欢迎一起讨论并学习。