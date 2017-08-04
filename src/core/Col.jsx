import React, { Component } from 'react';
import './core.less';

export default class Col extends Component {
  render() {
    const style = this.props.style || {};
    const span = this.props.span || 24; //占几分
    const point = span/24*100+'%';
    style.marginLeft = (this.props.offset||0)/24*100+'%';
    style.width = point;
    return (
     <div className='col' style={style}>
         {this.props.children}
     </div>
    );
  }
}