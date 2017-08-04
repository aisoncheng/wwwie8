/* @flow */
import React, { Component } from 'react';
import './notice.less';

export default class TitleSpilt extends Component {
  render() {
    return (
      <div className="datumLable" {...this.props}>
          { !this.props.uri ? <span className="datumLableTitle">{this.props.title}</span> : ''}
          { !this.props.uri ? <span className="datumLableComment">&nbsp;&nbsp;&nbsp;{this.props.detail||''}</span> : ''}
          {
            this.props.uri ? 
            <div style={{marginBottom:'20px'}}>
              <img src={this.props.uri} style={{width:'100%'}} />
            </div> : ''
          }
      </div>
    );
  }
}
