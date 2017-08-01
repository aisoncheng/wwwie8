import { Checkbox, Modal,Radio } from 'antd';
import React from 'react';
import cityDict from './cityDic';

function wHeight(offset,pcs){
    offset = offset || 0;
    var h = document.body.offsetHeight + offset;
    return  pcs ? h + pcs : pcs;
}


/**
 * 公告页面的内容
 */
const noticeCfg = ["1、请填报本人/单位真实信息；","2、请勿填写与烟草专卖零售许可证申办无关的信息；","3、请勿传输不符合国家法律、法规的资料；",
"4、如您是为法人分支机构提出申请，请以相应分支机构认证登录后提出申请，并提供相应分支机构的材料；",
"5、请认真填写申请信息，以便核对，填表信息如不完整或不真实,您将无法成功办理，并可能因提供虚假材料而1年内无法提出申请。"];

/**
 * 文件类型
 */
const files = {
  new:{
    approval:["（一）有与经营烟草制品零售业务相适应的资金；","（二）有与住所相独立的固定经营场所；","（三）符合当地烟草制品零售点合理布局的要求。"],
    material:["（一）申请表","（二）负责人（经营者）身份证","（三）工商营业执照"]
  },
  close:{
    approval:["（一）申请材料齐全，符合法定形式；","（二）符合法律、法规、规章的相关规定。"],
    material:["（一）申请表","（二）负责人（经营者）身份证"]
  },
  stop:{
    approval:["（一）申请材料齐全，符合法定形式；","（二）符合法律、法规、规章的相关规定。"],
    material:["（一）申请表","（二）负责人（经营者）身份证"]
  },
  extend:{
    approval:["（一）申请材料齐全，符合法定形式；","（二）无法律、法规、规章规定的不予延续的情形。"],
    material:["（一）申请表","（二）负责人（经营者）身份证"]
  },
  renew:{
    approval:["（一）申请材料齐全，符合法定形式；","（二）符合法律、法规、规章的相关规定。"],
    material:["（一）申请表","（二）负责人（经营者）身份证"]
  },
  resume:{
    approval:["（一）申请材料齐全，符合法定形式；","（二）符合法律、法规、规章的相关规定。"],
    material:["（一）申请表","（二）负责人（经营者）身份证"]
  },
  change:{
    approval:["（一）申请材料齐全，符合法定形式；","（二）无法律、法规、规章规定的不予变更的情形。"],
    material:["（一）申请表","（二）负责人（经营者）身份证","（三）与变更事项有关的证明材料"]
  }
};

function getFileByApplyType(){
  return  files[getApplyType()];
}

const applyWays = {
  new: {
    apply: 1001,
    name: '新办申请',
    code: '许可-00977-001',
  },
  extend: {
    apply: 1003,
    name: '延续申请',
    code: '许可-00977-002',
  },
  change: {
    apply: 1002,
    name: '变更申请',
    code: '许可-00977-003',
  },
  renew: {
    apply: 1006,
    name: '补办申请',
    code: '许可-00977-004',
  },
  close: {
    apply: 1004,
    name: '停业申请',
    code: '许可-00977-005',
  },
  resume: {
    apply: 1005,
    name: '恢复营业申请',
    code: '许可-00977-007',
  },
  stop: {
    apply: 1007,
    name: '歇业申请',
    code: '许可-00977-006',
  },
  retract: {
    apply: 1008,
    name: '',
    code: '',
  },
};
const EcoTypeCfg = [
  { label: '国有', value: 1401 },
  { label: '集体', value: 1402 },
  { label: '个体', value: 1403 },
  { label: '合伙', value: 1404 },
  { label: '股份制(合作)', value: 1405 },
  { label: '个人独资', value: 1406 },
  { label: '有限责任', value: 1407 },
  { label: '外商投资', value: 1408 },
  { label: '股份有限公司', value: 1409 },
  { label: '其他', value: 1410 },
];
const PlaceOwnerAll = [
  { label: '自有', value: 2501 },
  { label: '租赁', value: 2502 },
  { label: '无偿使用', value: 2503 },
  { label: '租赁长期', value: 2504 },
  { label: '无偿使用长期', value: 2505 },
];
const PlaceOwner = [
  { label: '自有', value: 2501 },
  { label: '租赁', value: 2502 },
  { label: '无偿使用', value: 2503 },
];

/**
 * @returns 
 * 经济类型radoi
 */
function EcoTypeCfgRadio(){
  return EcoTypeCfg.map((info,i)=>{
    return <Radio key ={i} value={info.value+''}>{info.label}</Radio>
  });
}

/**
 * @returns 
 * 场地归属radio
 */
function PlaceOwnerRadio(){
  return  PlaceOwner.map((info,i)=>{
      return <Radio key ={i} value={info.value+''}>{info.label}</Radio>
  });
}

/*
 通过url获取审当前的审核类型
*/
function getApplyType() {
  const url = location.href;
  const jh = url.indexOf("#");
  let pathVal = "";
  if(jh!=-1){
    let path = location.hash.replace("#/","");
    pathVal =  path.substring(0,path.lastIndexOf("?"));
  }else{
    pathVal = location.pathname.replace(window.path).substring(1);
  }
  const applyTypes = pathVal.split('/');
  if (applyTypes.length === 2) {
    return applyTypes[1];
  } else {
    return '';
  }
}

/**
 * 禁用某个下拉选
 **/
function disableCity(cityOld, bizRegion) {
  if (!bizRegion) {
    return false;
  }
 
  const city = deepCopy(cityOld);
  let targetI = 0;
  for (let i = 0; i < city.length; i++) {
    const cityItem = city[i];
    if (cityItem.id !== bizRegion.procode) {
      cityItem.disabled = true;
    } else {
      targetI = i;
      const children = cityItem.children;
      let targetCity = 0;
      for(let z = 0; z < children.length; z++) {
        const cityChildItem = children[z];
        if (cityChildItem.id !== bizRegion.admdivcode) {
          cityChildItem.disabled = true;
        } else {
          targetCity = z;
        }
      }
      const firstCity = children[0];
      children[0] = children[targetCity];
      children[targetCity] = firstCity;
    }
  }
  const first = city[0];
  city[0] = city[targetI];
  city[targetI] = first;
  return city;
}

/**
 * 深度拷贝
 **/
function deepCopy(o) {
  if (o instanceof Array) {
    const n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    const n = {}
    for (const i in o) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
}

/*
 通过url获取审当前的审核类型
 */
function getApplyTypeCode() {
  return applyWays[getApplyType()].apply;
}

/**
 * 判断是否存在申请
 **/
function hasApply() {
  const applyType = applyWays[getApplyType()];
  if (!applyType) {
    location.href = '/404';
    return false;
  }
  return !!applyWays[getApplyType()];
}

/**
 * 获取办理类型相关信息
 **/
function getApplyTypeInfo() {
  return applyWays[getApplyType()];
}

/**
 * 传递key获取cookie
 **/
function getCookie(key) {
  const all = getAllCookie();
  return all.size === 0 ? null : all[key];
}
/**
 * accesstoken
 **/
function getCookieAcce() {
  return getCookie('accesstoken');
}
/**
 * accesstoken
 **/
function getCookieOrg() {
  return getCookie('orgCode');
}

/**
 * 获取所有的cookie
 **/
function getAllCookie() {
  const cookieStr = document.cookie;
  if (!cookieStr) {
    return { size: 0 };
  }
  const cookies = cookieStr.split(';');
  const cookieJson = { size: 0 };
  let size = 0;
  for (const cookie of cookies) {
    const ck = cookie.split('=');
    cookieJson[ck[0].trim()] = ck[1].trim();
    size++;
  }
  cookieJson.size = size;
  return cookieJson;
}
/**
 * 设置cookie
 **/
function setCookie(name, val) {
  const exp = new Date();
  exp.setTime(exp.getTime() + (30 * 60 * 1000)); // 30分钟过期
  document.cookie = name + '=' + val + ';expires=' + exp.toGMTString() + ';path=/';
}
/**
 * 
 * @param {any} name 
 * @returns 
 * 所有的参数设置进cookie
 */
function setParamsCookie() {
  const params = this.getQueryParam();
  for (const name in params) {
    this.setCookie(name, params[name]);
  }
}

/**
 *获取queryString的参数
 **/
function getQueryParam(name) {
  let queryString = location.search;
  if (!queryString) {
    return {};
  }
  queryString = queryString.substring(1);
  const queryArray = queryString.split('&');
  const queryParam = {};
  for (const query of queryArray) {
    const queryItem = query.split('=');
    if (queryItem.length === 2) {
      queryParam[queryItem[0]] = queryItem[1];
    }
  }
  return !name ? queryParam : queryParam[name];
}

/**
 * 通过编码获取city的中文
 **/
function getCityNameByCode(code) {
  return cityDict[code];
}

/**
 * 传递一串地址编码
 * 返回省市县的中文
 **/
function getCityByCodes(codes) {
  if (!codes) {
    return '';
  }
  if (typeof codes === 'string') {
    codes = codes.split(',');
  }
  let names = '';
  let cityName = '';
  for (const code of codes) {
    cityName = getCityNameByCode(code);
    names += `${cityName ? cityName + '/' : ''}`;
  }
  return names.substring(0, names.length - 1);
}

/**
 * 默认的验证规则
 **/
function getDefaultRules(msg, require) {
  return [{
    required: require === undefined ? true : require,
    message: msg,
  }];
}
/**
 * 获取label
 **/
function getLabel(label, props) {
  return (
    <Checkbox {...props}><span>{label}</span></Checkbox>
  );
}

/**
 * 获取经济类型
 **/
function getEcoTypeByCode(code) {
  let name = '';
  EcoTypeCfg.forEach((info) => {
    if (code === info.value) {
      name = info.label;
    }
  });
  return name;
}

/**
 * jquery 的extend
 **/
function extend(source, target) {
  let name = '';
  for (name in source) {
    target[name] = source[name];
  }
}

/**
 * 验证非表单申请
 **/
function valMater(state) {
  let pass = true;
  if (!state.agree) {
    Modal.error({
      title: '提示',
      content: '请勾选申请人承诺',
    });
    return false;
  }
  for (const item of state.fileItem) {
    if (item.applyMaterialAttArray.length === 0 && !item.auto) {
      Modal.error({
        title: '提示',
        content: `请上传申报材料【${item.materialName}】`,
      });
      pass = false;
      break;
    }
  }
  return pass;
}

function formRules(form,name,rule,validator){
  
   const r = [];
   rule && r.push(rule);
   validator && r.push({ "validator": validator });
   return form.getFieldProps(name, {
      rules: r,
    });
}

function isOk(res){
  if(res==null){
    return false;
  }
  if(res.code && res.code !=200){
    return false;
  }
  return res;
}

/**
 * 格式化时间
 */
function formatDate (strTime,time) {
    var date = new Date(strTime);
    return !time ?  date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() :
     date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

export default {
  getQueryParam,
  getApplyType,
  getCookie,
  getAllCookie,
  setCookie,
  setParamsCookie,
  getApplyTypeCode,
  getApplyTypeInfo,
  hasApply,
  disableCity,
  deepCopy,
  getCityNameByCode,
  getCityByCodes,
  getCookieAcce,
  getCookieOrg,
  getDefaultRules,
  getLabel,
  getEcoTypeByCode,
  EcoTypeCfg,
  PlaceOwner,
  PlaceOwnerRadio,
  EcoTypeCfgRadio,
  PlaceOwnerAll,
  extend,
  valMater,
  wHeight,
  getApplyTypeInfo,
  formRules,
  isOk,
  noticeCfg,
  getFileByApplyType,
  formatDate
};


