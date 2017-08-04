import React, { Component } from 'react';
import './core.less';


export default class Row extends Component {
  render() {
   
    const style = this.props.style || {};
    return (
      <div style={style} className='row'>
        {this.props.children}    
      </div>
    );
  }
}