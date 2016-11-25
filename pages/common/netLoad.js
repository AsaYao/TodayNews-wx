// var API_URL = "http://lf.snssdk.com/article/category/get_subscribed/v1/?";
// var API_CONTENT = "http://lf.snssdk.com/api/news/feed/v39/?";

// let params = {"device_id":6096495334,"aid":13,iid:5034850950};


// function fetchApi (url,params) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: `${url}`,
//       data: Object.assign({}, params),
//       header: { 'Content-Type': 'application/json' },
//       success: resolve,
//       fail: reject
//     })
//   })
// }
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
