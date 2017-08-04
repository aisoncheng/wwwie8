import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tools from './tools';

import './core.less';

class FormItem extends Component {
  render () {

    const labelStyle = tools.position(this.props.labelCol);
    const contentStyle = tools.position(this.props.wrapperCol);
    return (
      <div className='formItem' ref='item'>
        {
          this.props.label ?
          <div className='label' style={labelStyle}>
          {this.props.required ? <span className='required'>*</span> : ''}
          {this.props.label}
          <span>:&nbsp;&nbsp;</span>
        </div> :
        ''
        }
        <div className='content' style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

//labelCol={{span:8}} wrapperCol={{span:16}} label="现住址" hasFeedback={showFeed}
FormItem.propTypes = {
  label : PropTypes.any,
  labelCol : PropTypes.object,
  wrapperCol: PropTypes.object,
  hasFeedback: PropTypes.bool
}

export default FormItem