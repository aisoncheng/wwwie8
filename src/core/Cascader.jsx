import React, { Component } from 'react';
import Input from './Input';
import 'rc-cascader/assets/index.css';
import RCCascader from 'rc-cascader';


class Cascader extends Component {

    constructor(props){
      super(props);
      this.state = {
       inputValue: '',
       message : ''
      }
    }

   validate = ()=>{
      this.refs.cascader.validate(null,this.state.inputValue);
      const thost = this;
      setTimeout(function() {
        thost.setState({message:thost.refs.cascader.state.message});
      }, 20);
   };

   onChange = (value, selectedOptions) => {
      const val = selectedOptions.map(o => o.label).join(', ') ;
      this.setState({
        inputValue: val,
      });
      this.refs.cascader.validate(null,val);
  }

  render() {
    return (
      <RCCascader options={this.props.options} onChange={this.onChange} transitionName="slide-up">
        <Input {...this.props}  value = {this.state.inputValue}  ref='cascader'/>
      </RCCascader>
    );
  }
}

export  default Cascader;