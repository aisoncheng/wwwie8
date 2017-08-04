import React, { Component } from 'react';
import { VilatdateConponet } from './VilatdateConponet';
import './core.less';

class Input extends Component {


  state = {
    width : 150
  }
  //页面加载完全后 修改input 的宽度
  componentDidMount(){
    const w = this.refs.inputContainer.offsetWidth;
    this.setState({width: w-15});
  }

  render() {
    const {placeholder,...other} = this.props;
    
    const inputprops = {};
    inputprops.defaultValue=this.props.defaultValue;
    !inputprops.defaultValue && (inputprops.placeholder=this.props.placeholder);
    if(this.props.value){
        inputprops.value = this.props.value;
    }

    return (
       <div className='inputContainer' {...other} ref = 'inputContainer'>
            <input  className='' 
              style={{width:this.state.width+'px'}}
              onKeyUp={(e)=>{
                this.props.onKeyUp && this.props.onKeyUp(e);
                this.props.validate(e);
              }}
              {...inputprops}
              ref = {this.props.keyName || null }
              disabled = {this.props.disabled}
            />
          {this.props.children}
       </div>
    );
  }
}

export default VilatdateConponet(Input);