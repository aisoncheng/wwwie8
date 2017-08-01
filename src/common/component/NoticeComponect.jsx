/* @flow */

import React, { Component } from 'react';
import { Checkbox, Button, Tooltip, Row, Col, Modal, Input, Alert,Icon } from 'antd';
import { ButtonWithLoading,TitleSpilt } from '../../common';
import { tools } from '../../utils';
import api from '../../service/api'
import './noticeCss.less';

let timer ;
class NoticeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      loading: false,
      visible: false,
      phone: '',
      phoneMsg: '获取验证码',
      validating: false,
      validateCode: '',
      disabledPhone: false,
      disSubmit: true,
      disYzmBox: true,
      validateId: '',
      hasHistoryApply:false
    };
  }
  // 组件被移除的时候调用
  componentWillUnmount(){
    clearInterval(timer);
  }
  // 组件的dom被渲染出来后调用
  componentDidMount(){
    let applyType = tools.getApplyTypeCode();
   
    api.hasHistoryApply(applyType).then( (res) => {
        this.setState({ hasHistoryApply: (res && res.length>0) });
    });
  }

  // 点击弹出发送验证码框
  onClick =() => {
    this.setState({
      visible: true,
    });
  }
  // 手机号码绑定
  handlerVal = (e) => {
     this.setState({ phone: e.target.value });
  }
  // 验证码绑定
  handlerVM = (e) => {
    let val = e.target.value;
    // 为空或者不是数字 或者长度不阻6位
    if(!!val && !isNaN(val) && val.toString().length === 6 ){
      this.setState({ disSubmit: false });
    }else{
      this.setState({ disSubmit: true });
    }
    this.setState({ validateCode: e.target.value });
  }

  //获取验证码
  senPhoneMsg = () => {
     if(this.state.validating){
        return false;
     }
     if(!this.state.phone){
       Modal.error({
         title: '提示',
         content: '请输入正确的手机号码',
         width:300,
       });
       return false;
     }else{
       // 发送验证码
       api.smsSendMsg(this.state.phone).then( (res) => {
           const resn = tools.isOk(res);
           if(resn){ //发送成功后
               this.timeOut();
               this.setState({ disabledPhone: true, disYzmBox: false });
               this.setState({ validateId: resn.id });
           }
       })
     }
  }

  // 倒计时
  timeOut = () => {
      let out = 300;
      this.setState({ validating: true });
      timer = setInterval( () => {
        out--;
        this.setState({ phoneMsg: '还有'+ out + '秒' });
        if(out<=0){
          clearInterval(timer);
          this.setState({ validating: false });
        }
      },1000)
  }
  // 确定按钮
  handleOk = () => {
    this.setState({ loading: true });
    api.validateCode(this.state.validateId, this.state.validateCode).then( (res) => {
       this.setState({ loading: false });
    });
 
  }
  // 取消按钮
  handleCancel = () => {
    this.setState({ visible: false, disabled: false });
  }

  // 查看当前申请
  showHistoryApply = () => {
    window.open('/list/'+tools.getApplyType(),'_blank');
  }

  // 下一步跳转
  nextButton = () => {
    _global.history.push('/material/' + tools.getApplyType());
  }
  render() {

    const notice = tools.noticeCfg;
    const noticeSpan = notice.map((info, i) => <span key={i} className="noticeSpan">{info}</span>);
    const { visible, loading } = this.state;
    const getValidation = <a onClick={this.senPhoneMsg}>{this.state.phoneMsg}</a>;
    return (
      <div className="container">
         <TitleSpilt
              title = {'网上申请须知'}
              detail = {'为方便您申请烟草专卖零售许可证，现开通网上申请功能，请您在申请前仔细阅读本须知。'}
        />
        {noticeSpan}
        <Checkbox
          onClick={this.onClick}
          indeterminate={false}
          checked={!this.state.disabled}
          className="thisChekBox"
        >
          <span>我已阅读并同意</span>
        </Checkbox>
        <Row className="buttons">
          <Col span={3} offset={9} >
            <Tooltip placement="top" title={!this.state.hasHistoryApply ? '没有正在申请的记录' : ''}>
              <Button type="primary" size="large" disabled={!this.state.hasHistoryApply} onClick={this.showHistoryApply}>查看当前申请</Button>
            </Tooltip>
          </Col>
          <Col span={2} offset={1}>
            <Tooltip placement="top" title={this.state.disabled ? '请勾选已阅读并同意' : ''}>
              <Button type="primary" size="large" disabled={this.state.disabled} onClick={this.nextButton}>继续申请</Button>
            </Tooltip>
          </Col>
        </Row>

        <div>
          <Modal
            visible={visible}
            title="联系人手机号验证"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={420}
            footer={[
              <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
              <ButtonWithLoading 
                type="primary" 
                size="large"
                loading={this.state.loading} 
                disabled={this.state.disSubmit}
                onClick={this.handleOk}>
                确定
              </ButtonWithLoading>
            ]}
          >
            <Row>
              <Col span={16} offset={4}>
                <Input addonBefore="手机号"
                       size="large"
                       placeholder="请输入手机号"
                       addonAfter={getValidation}
                       value={this.state.phone}
                       onChange={this.handlerVal}
                       disabled={this.state.disabledPhone}
                />
              </Col>
            </Row>
            <Row style={{marginTop:'20px'}}>
              <Col span={16} offset={4}>
                <Input addonBefore="验证码"
                       size="large"
                       placeholder="请输入验证码"
                       value={this.state.validateCode}
                       onChange={this.handlerVM}
                       disabled={this.state.disYzmBox}
                />
              </Col>
            </Row>

           
          </Modal>
        </div>
      </div>
    );
  }
}
export default NoticeComponent;

