import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询列表
export const page_list = (page, size, params) => {
  // 将params对象的数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口
  let url = apiUrl + '/cms/page/list/' + page + '/' + size + '?' + queryString;
  return http.requestQuickGet(url)
};

//查询单个
export const page_get = (pageId) => {
  let url = apiUrl + '/cms/page/get/' + pageId;
  return http.requestQuickGet(url)
};

//新增
export const page_add = (pageForm) => {
  let url = apiUrl + '/cms/page/add';
  return http.requestPost(url, pageForm)
};

//编辑
export const page_edit = (pageId, pageForm) => {
  let url = apiUrl + '/cms/page/edit/' + pageId;
  return http.requestPut(url, pageForm)
};

//删除
export const page_del = (pageId) => {
  let url = apiUrl + '/cms/page/del/' + pageId;
  return http.requestDelete(url)
};


