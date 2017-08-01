import React, { Component } from 'react';
import { Icon } from 'antd';

export default class FieItemComponent extends Component {
  render() {
    return (
      <div key={this.props.key} className="currentFiles">
        <a href={this.props.url} target="_blank" className="imamgesA">
          <Icon type="paper-clip" style={{ marginRight: '5px' }} />
          {this.props.name}
        </a>
        <Icon type="delete" className="deleteImg" />
      </div>
    );
  }

}
