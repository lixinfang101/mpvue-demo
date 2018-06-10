//工具函数库
import config from './config'

//get方法，获取数据
export function get(url){
  return new Promise((resolve,reject)=>{
    wx.request({
      url : config.host + url,
      success : function(res){
        if(res.data.code == 0){
          resolve(res.data.data);
        }else{
          reject(res.data);
        }
      }
    });
  });
}

//post方法，添加数据
export function post(url,data){
  return new Promise((resolve,reject)=>{
    wx.request({
      url : config.host + url,
      method : 'POST',
      data,
      success : function(res){
        if(res.data.code === 0 || res.data.code === 1){
          resolve(res.data);
        }else{
          reject(res.data);
        }
      }
    });
  });
}

export function showSuccess(text){
  wx.showToast({
    title : text,
    icon : 'success'
  });
}

export function showModal(title,text){
  wx.showModal({
    title : title,
    content : text,
    showCancel : false
  });
}

