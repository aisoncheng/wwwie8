import React, { Component } from 'react';

export default class Form extends Component {

  /**
   * 验证表单
   * @static
   * @memberof Form
   */
  static validate(componet,callback){
     
     const refs = componet.refs;
     console.log(refs);
     
     const erros = [];
     let ref = null;
     let validate = null;
     let val = null;
     for(name in refs){
        ref = refs[name];
        validate = ref.validate;
        if(validate){
             val = ref.props.formKV[name];
             validate(null,val);
        }
    }
    
    setTimeout(function() {
       for(name in refs){
          ref = refs[name];
          if(ref.state){
            console.log(ref.state.message,name);
            erros.push({name:ref.state.message});
          }
       }
       callback(ref.props.formKV,erros);
    }, 20);
  }
  
  /**
   * 获取某个属性的值
   * 
   * @static
   * @returns 
   * @memberof Form
   */
  static getField(){
    
  }
  
  render() {
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
}