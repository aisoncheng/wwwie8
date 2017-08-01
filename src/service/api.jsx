import request from '../utils/request';

// 获取用户信息
async function getUserInfoZJ() {
  return request('/licPreGns/getUserInfoZJ');
}

// 发送验证码
async function smsSendMsg(phone) {
  return request(`/licPreGns/smsSendMsg?phone=${phone}`);
}

// 验证验证码
async function validateCode(msgId, vaCode) {
  return request(`/licPreGns/validataCode?id=${msgId}&code=${vaCode}`);
}

// 获取是否有正在申请的记录
async function hasHistoryApply(applyType) {
  return request(`/licPreGns/hasHistoryApply?applyType=${applyType}`);
}

// 获取正在申请的记录
function getPreApplyList(applyType) {
  return request(`/licPreGns/getPreApplyList?applyType=${applyType}`);
}

// 获取当前省份的信息
function getBizRegion() {
  return request('/licPreGns/getBizRegion');
}

// 提交申请表单
function submitNewApply(data) {
  const header = new Headers();
  header.set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
  return request('/licPreGns/submitApplyZJ', { body: `jsonStr=${data}`,
    headers: header });
}

// 提交延续申请
function submitAccept(data) {
  const header = new Headers();
  header.set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
  return request('/licPreGns/submitApplyZJ', { body: `jsonStr=${data}`,
    headers: header });
}

// 查看form表单 licPreGns/getPreAttrInfo?applyId=8a83ad965cd45e95015cd52e3e8a007b
function getPreAttrInfo(id) {
  return request(`/licPreGns/getPreAttrInfo?applyId=${id}`);
}

// http://218.75.75.132:9080/REGIEAPP_LIC_WEB/licPreGns/findTLicRlicInfoListZJ?applyType=1003
// 获取已有的许可证号信息
function getLicList(applyType) {
  return request(`/licPreGns/findTLicRlicInfoListZJ?applyType=${applyType}`);
}

export default {
  getUserInfoZJ,
  smsSendMsg,
  validateCode,
  hasHistoryApply,
  getPreApplyList,
  getBizRegion,
  submitNewApply,
  getPreAttrInfo,
  getLicList,
  submitAccept,
};

