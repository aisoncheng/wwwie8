import React, { Component } from 'react';
import './core.less';

export default class Button extends Component {
 

 
  render() {

    const {onClick,...other} = this.props;
    return (
     <div className={this.props.disabled ? 'buttonContainer disabled ' :'buttonContainer'} {...other}>
         <button className={this.props.disabled ? 'disabled' : 'primary'} 
           onClick = {(e)=>{
              e.preventDefault();
              if(this.props.disabled) return false;
              this.props.onClick && this.props.onClick(e);
           }}
         >
             {this.props.children}
         </button>
     </div>
    );
  }
}