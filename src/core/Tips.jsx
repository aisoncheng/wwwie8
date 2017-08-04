import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import './core.less';

export default class componentName extends Component {


  render() {
    //this.props.children.props.onMouseOver = this.onMouseOver;
    
    return (
         <Tooltip
            placement="top"
            animation="zoom"
            trigger = {this.props.title? (this.props.trigger || 'hover'):'none'}
            overlayClassName='tipsContent'
            overlayStyle = {{minHeight:'20px'}}
            overlay = {<span>{this.props.title}</span>} 
          >
            {this.props.children}
         </Tooltip>
    );
  }
}