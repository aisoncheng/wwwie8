import React, { Component } from 'react';
import { Radio } from '../core';
import PropTypes from 'prop-types';

export default class RadioGroup  extends Component {
  

  state={
    value:''
  }
  onChange = (e)=>{
     this.props.onChange &&  this.props.onChange(e);
  }
  
  render() {
    const options = this.props.options || [];
    const Checkboxs = [];
    const style = {marginRight:'20px'}
    options.forEach((item,i)=>{
       Checkboxs.push(<Radio onChange = {this.onChange} style={style} type='radio'  value={item.value+''} name={this.props.keyName} key={i}>{item.label}</Radio>);
    });
    
    return (
      <div>
        {Checkboxs}
        {this.props.children}
      </div>
    );
  }
}

RadioGroup.PropTypes = {
   options:PropTypes.array.isRequired
}