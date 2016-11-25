//index.js
//获取应用实例
var net = require("../common/netLoad.js");
var app = getApp();
let params = {"device_id":60926495334,"category":"__all__","iid":5034850950};
import {fetchHeadName,loadHomeCategoryNewsFeed,loadHomeCategoryMoreNewsFeed} from "../common/netTool.js"
// var net1 = require("../common/netTool.js");
import dateTimeStamp from '../common/datamissing.js';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    selData:[],
    ishidden:true,
    curpage:0,
    detaildata:[],
    timePublic:[],
    loading:false
  },

   onReady:function(){
         this.animation =  wx.createAnimation({
            duration:1000,
            timingFunction:"ease",
         })
   },

  //排列数据
  listdata(resp){
      // var jsonstr = resp.data.data[0].content;
      var dataArr = [],timepublic = [];
      for (var index of resp.data.data){
          //转换Json字符串=》Json对象
          dataArr.push(JSON.parse(index.content));
      }
      for (var data of dataArr){
          var time = dateTimeStamp(data.publish_time);
          data.publish_time = time;
      }
      console.log(dataArr);
      this.setData({
        detaildata:dataArr,
        loading:true
      });
  },

  onLoad: function () {
    console.log('onLoad');
     wx.showNavigationBarLoading();
    let dataArr = [],topname = [];

    fetchHeadName().then(resp=>{
        //此时给头部
        // console.log(resp.data.data.data[0].name);
        wx.hideNavigationBarLoading();
        dataArr = resp.data.data.data;
        console.log(dataArr);
        this.setData({
          selData:dataArr
        })
    })
    loadHomeCategoryNewsFeed("__all__").then(resp=>{
          this.listdata(resp);
    })
  },
  
  listClick(e){
        this.setData({
          loading:false
        })
        var idx = e.currentTarget.dataset.idx;
        console.log(idx);
        var selLength = this.data.selData.length;
        for (var i=0; i<selLength; i++){
          if(i == e.target.id){
            this.setData({
              ishidden:false,
              curpage:e.target.id           
            });
            break;
          }
        }
        //此时得到刷新列表的数据
       loadHomeCategoryNewsFeed(idx).then(resp=>{
           console.log(resp);
           this.listdata(resp);
       })
  },
  //添加数据
   addData(e){
     wx.showNavigationBarLoading();
      var now = new Date().getTime()/1000;
      var curdata = this.data.detaildata;
      loadHomeCategoryMoreNewsFeed("__all__",now).then(resp=>{
        var arr = resp.data.data;
        var dataArr = [];
        for (var index of arr){
            //转换Json字符串=》Json对象
            dataArr.push(JSON.parse(index.content));
        }
        curdata = curdata.concat(dataArr);
        console.log(curdata);
         wx.hideNavigationBarLoading();
        this.setData({
        detaildata:curdata,
      });
      })
   }
})


  