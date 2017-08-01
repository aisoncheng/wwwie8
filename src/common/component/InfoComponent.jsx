/* @flow */
import React, { Component } from 'react';
import { Tooltip } from 'antd';

import './info.less';

export default class InfoComponent extends Component {
  render() {
    return (
      <div {...this.props} className="labelContent">
        <Tooltip placement="leftTop" title={this.props.label}>
          <div className="labelCol" >{this.props.label}</div>
        </Tooltip>
        <div className="contentCol">{this.props.content || '无'}</div>
      </div>
    );
  }
}
