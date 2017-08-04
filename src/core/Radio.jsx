import React, { Component } from 'react';
import '';


export default class Radio  extends Component {

  constructor(props){
    super(props);
    this.state = {
      radioVal : this.props.value
    }
  }

  render() {
    const size = ( this.props.size || 14)+'px';
    const style = this.props.style || {};
    style.marginRight = '20px';
    return (
      <div className={`checkboxContainer ${this.props.className||''}`}  styles={style}>
          <div className='boxOne' 
             style={{width:size,height:size}}
          >
               <span 
                className={`radioSpan ${this.props.radioVal == this.props.value ? 'checked' : ''}`}
                style={{width:size,height:size}}
                ></span>
                <input type= 'radio'  
                    style={{width:size,height:size}}
                    className='radio'
                    ref = 'radio'
                    name = {this.props.name}
                />
          </div>
          <span ref='content' className='content' style={{marginLeft:'5px'}} 
          >{this.props.children}</span>
      </div>
    );
  }
}

