
import { tools } from '../utils';

function Fetch(){
  const fetchNew = !!window.fetch ? window.fetch :require('fetch-ie8');
  return fetchNew;
}



function parseJSON(response) {
  return response.json().then((res) => {
    if (res.code !== 200) {
      // const error = new Error(res.message);
      // error.response = response;
      // error.rsCode = res.code;
      // throw error;
       const msg = res.message || '系统繁忙';
       Modal.error({
          title: '提示',
          content: msg,
          width: 300,
       });
      return res;
    } else {
      return res.data;
    }
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function doError(error) {
  console.log(error, '=====/');
  const msg = error.message || '系统繁忙';
  Modal.error({
    title: '提示',
    content: msg,
    width: 300,
  });
  const errorx = new Error('请求出现异常' + error);
  throw errorx;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// const baseUri = 'http://127.0.0.1:8089/regieapp_lic_web';
const baseUri = 'http://218.75.75.132:9080/REGIEAPP_LIC_WEB';
export default function request(url, options) {
 
 
  options = options || {};
  options.method = 'post';
  if (!options.headers) {
    // options.headers = new Headers();
    // options.headers.append('accesstoken', tools.getCookie('accesstoken'));
    // options.headers.append('orgCode', tools.getCookie('orgCode'));
    options.headers = {};
  } 
  options.headers.accesstoken = tools.getCookie('accesstoken');
  options.headers.orgCode = tools.getCookie('orgCode');
 

  const fetch = Fetch();
 
  return fetch(baseUri + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(doError);
}
