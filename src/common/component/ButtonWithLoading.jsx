import React, { Component,StyleSheet } from 'react';
import { Button } from 'antd';
import { IconLoading } from '../../common';

export default class ButtonWithLoading extends Component {
  render() {
    const {loading,...other} = this.props;
    const buttonStyle   = style.button;
    if(this.props.loading){
        buttonStyle['padding-left'] = '25px';
    }else{
        buttonStyle['padding-left'] = '15px';
    }

    return (
      <Button style={buttonStyle} {...other}>
        {this.props.loading ?  <IconLoading style={style.icon}/> : ''}
        {this.props.children}
      </Button>
    );
  }
}

const  style = {
   button : {
      "position":"relative",
      "width":"60px"
   },
   icon:{
     "position": "absolute",
     "left":"5px",
     "top":"5px"
   }
};

