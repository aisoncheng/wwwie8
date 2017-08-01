/* @flow */
import React, { Component } from 'react';
import { tools } from '../../utils';
import './containerCss.less';

export default class Container extends Component {
  render() {
    const applyInfo = tools.getApplyTypeInfo();
    return (
      <div className="containerMy">
        <div className="containerBody">
          <div className="containerTop">
            <img src={require('../../assets/img/icon_house.gif')} alt="" />
            <div className="containerTopRight">
              <span className="titlSpan">烟草专卖零售许可证({applyInfo.name})</span>
              <span className="busiSpan">事项编码：{applyInfo.code}</span>
            </div>
          </div>
          <div className="containerCenter">
            <div className="containerLeft">
              <span >操作流程</span>
              <div>
                <img src={require('../../assets/img/lc_icon_a1.gif')} alt="" />
              </div>
              <div className="erect" />
              <div>
                <img src={require('../../assets/img/lc_icon_b2.gif')}></img>
              </div>
              <div className="erect" />
              <div>
                <img src={require('../../assets/img/lc_icon_b3.gif')}></img>
              </div>
            </div>
            <div className="containerRight">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
