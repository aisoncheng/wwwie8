import React,{ Component } from 'react';
import './head.less';

export default class HeadComponent extends Component {
  render() {
  const user = {};
   return (
    <div className="headContainer">
      <div className="leftHead">
        <img src={require('../../assets/img/logo.gif')} alt="" />
        <span>【在线办理】</span>
      </div>
      <div className="rightHead">
        <div className="welcome">
          <div className="welcomeIcon">
            <div>
              <img src={(require('../../assets/img/zjzwfw_mhwz.gif'))} alt="" />
              <a href="http://www.zj.gov.cn" target="_blank" rel="noopener noreferrer" >浙江省政府门户网站</a>
            </div>
          </div>
          <div className="welcomeName">欢迎您：{user.username}</div>
        </div>
        <div className="rightBottom">
          <img src={(require('../../assets/img/sy_fuwusm.gif'))} alt="" />
        </div>
      </div>
    </div>
  );
  }
}


