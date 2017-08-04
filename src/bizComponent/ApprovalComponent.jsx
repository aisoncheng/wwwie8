/* @flow */
import React, { Component } from 'react';
import { TitleSpilt } from  '../bizComponent';
import { Button } from '../core';
import { tools } from  '../utils'
import './notice.less'

class Approval extends Component {
  constructor(props){
    super(props);
    this.state={
      disabled:true
    }
  }
  nextButton = ()=>{
      const applyType = tools.getApplyType();
      _global.history.push('/form/'+applyType);
  }
render() {
   const approvals = tools.getFileByApplyType();
   const approval = approvals.approval.map((info,i)=>{
     return (
       <span className='noticeSpan' key={i}>{info}</span>
     );
   });
   const material = approvals.material.map((info,i)=>{
     return (
       <span className='noticeSpan' key={i}>{info}</span>
     );
   });
  return (
       <div className='container'>
           <TitleSpilt title = {'审批条件'} detail = {'办理该项业务，需满足以下申请条件才能进行业务的办理。'} />
           {approval}
           <TitleSpilt title = {'收取材料'} />
           {material}
           <div message="注：本人对办理该事项所提交的申报材料实质内容的真实性负责。" type="error"  style={{marginTop:'30px',fontSize:'14px',color:'red'}}/>
            <div className='nextButtonDiv'>
              <Button  type="primary" size='large'  onClick={this.nextButton}>下一步</Button>
            </div>
       </div>
    );
  }
}
function mapStateToProps({state}) {
    return {state};
}
export default Approval;
