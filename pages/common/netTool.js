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
