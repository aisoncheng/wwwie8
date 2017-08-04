import React from 'react';

import { ApplyFileUpload,Declaration, TitleSpilt } from '../bizComponent';
import { Form, Button, Input, Row, Col, FormItem,Cascader,Checkbox,RadioGroup, Radio,DatePicker,RangePicker,Select } from  '../core';
import { city, tools } from '../utils';
import api from '../service/api'

// const FormItem = Form.Item;
// const Option = Select.Option;
// const RadioGroup = Radio.Group;
// const RangePicker = DatePicker.RangePicker

const formItemLayout = {
   labelCol:{
      span:'4'
    },
    wrapperCol:{
      span:'20'
    }
}

class NewForm extends React.Component {
  state = {
    ecoTypeOther: false,
    biPeriod: false,
    tenancyDate: false,
    material: false,
    promise : false,
    formKV:{},
    fileItem: [
      {
        auto: true,
        materialName: '申请表',
        applyMaterialAttArray: [],
        count: 1,
        allowFix: 'jpg,jpeg,gif,png',
      },
      {
        materialNameTitle: 'identificationCard1',
        fileSeqNo: 0,
        isFileCatalog: 1,
        pageNum: 1,
        count: 1,
        allowFix: 'jpg,jpeg,gif,png',
        applyMaterialAttArray: [

        ],
        materialName: '身份证-正面'
      },
      {
        materialNameTitle: 'identificationCard2',
        fileSeqNo: 1,
        isFileCatalog: 1,
        pageNum: 1,
        count: 1,
        allowFix: 'jpg,jpeg,gif,png',
        applyMaterialAttArray: [

        ],
        materialName: '身份证-反面'
      },
      {
        materialNameTitle: 'businessLicense',
        fileSeqNo: 2,
        isFileCatalog: 1,
        allowFix: 'jpg,jpeg,gif,png',
        pageNum: 1,
        count: 1000,
        applyMaterialAttArray: [

        ],
        materialName: '工商营业执照'
      },
    ]
  };

  componentDidUpdate() {
    const meterArray =  [];
    if(meterArray.length > 0 && !this.state.material){
      meterArray.forEach((info, i) => {
        info.materialNameTitle.indexOf('identificationCard')>=0 ? info.count = 1 : 1000;
        info.allowFix = 'jpg,jpeg,gif,png';
        info.applyMaterialAttArray.forEach((itemInfo, z) => {
          itemInfo.uid = (0 - z);
          itemInfo.name = itemInfo.picName;
          itemInfo.url = `http://218.75.75.132:9080/REGIEAPP_LIC_WEB/licPreGns/filePreview?filePath=${itemInfo.applyMaterialAttPath}&accesstoken=${tools.getCookieAcce()}&orgCode=${tools.getCookieOrg()}`;
        });
      });
      meterArray.splice(0, 0, {
        auto: true,
        materialName: '申请表',
        applyMaterialAttArray: [],
        count: 1,
        allowFix: 'jpg,jpeg,gif,png',
      });
      this.setState({fileItem: meterArray, material: true });
    }
  }

  // ecoType 绑定
  ecoTypeChange = (r,v,cb) => {
    if(v === '1410') {
      this.setState({ ecoTypeOther: true });
      const other = this.props.form.getFieldValue('ecoTypeOther');
      if(!other){
        cb('请输入其他经济类型');
      }else{
        cb();
      }
    }else{
      this.setState({ ecoTypeOther: false });
      cb();
    }
  }
  ecoTypeChangeOther = (r,v,cb) =>{
     //调用 ecoType 的验证
     this.props.form.validateFields(['ecoType'], { force: true });
     cb();
  }
  // onChangeBiPeriod 营业执照有效期
  onChangeBiPeriod = (e) => {
    this.setState({ biPeriod: !this.state.biPeriod });
  }
  // tenancyDate
  onChangeTenancyDate = (e) => {
    this.setState({ tenancyDate: !this.state.tenancyDate });
  }

  // 提交事件
  handleSubmit = (e) => {

    e.preventDefault();

    Form.validate(this,(valMap,erros)=>{
        if(erros.length>0){
            return false;
        }
    });
    //console.log(this.refs.entName.validate(null,''));
    // let pass = true;
    // for( const  item of this.state.fileItem) {
    //   if(item.applyMaterialAttArray.length==0 && !item.auto ) {
    //     Modal.error({
    //       title: '提示',
    //       content: `请上传申报材料【${item.materialName}】`
    //     });
    //     pass = false;
    //     break;
    //   }
    // }
    // if(!pass) {
    //   return false;
    // }
    // this.props.form.validateFieldsAndScroll((err, values) => {
      
     
    //   if (!err) {
    //     const fileItem = this.state.fileItem;
    //     let sendFieItem = [];
    //     for( const item of fileItem){
    //       if(!item.auto) {
    //         let sendItem = tools.deepCopy(item);
    //         sendItem.applyMaterialAttArray = [];
    //         for(const file of item.applyMaterialAttArray) {
    //           let fileSend = {};
    //           fileSend.seqNo = 0;
    //           fileSend.picName = file.name;
    //           fileSend.applyMaterialAttPath = file.applyMaterialAttPath;
    //           sendItem.applyMaterialAttArray.push(fileSend);
    //         }
    //         sendFieItem.push(sendItem);
    //       }
    //     }
    //     values.bizAddrStreet = tools.getCityByCodes(values.bizAddrAdc) + values.bizAddrStreet;
    //     values.bizAddrAdc = values.bizAddrAdc.join(',');

    //     values.postAddrStreet = tools.getCityByCodes(values.postAddrAdc) + values.postAddrStreet;
    //     values.postAddrAdc = values.postAddrAdc.join(',');
    //     //values.bizRange = values.bizRange.join(',');
    //     values.tenancyEnd = tools.formatDate(values.tenancyDate[1]);
    //     values.tenancyBegin = tools.formatDate(values.tenancyDate[0]);
    //     values.biPeriod = tools.formatDate(values.biPeriod);

    //     values.postLinkName = '艾成松'; //this.props.user.user.username
    //     values.postLinkTel = '18268107023'; //this.props.user.user.mobile
    //     values.applyType = tools.getApplyTypeCode();
    //     delete  values.tenancyDate;
    //     let postData = {rlicPreAcceptInfo: values, applyMaterialArray: sendFieItem};
    //     api.submitNewApply(JSON.stringify(postData)).then((data) => {
    //          data.fileList = sendFieItem;
    //          this.props.dispatch({
    //            type:'reply/toReply',
    //            payload: { data },
    //          });
    //          this.props.dispatch(routerRedux.push('/reply/' + tools.getApplyType() ))
    //     });
    //   }
    // });
  }

  render() {
    const BizRegion = {'procode':'330000','admdivcode':'330100'};
    const limitCity = tools.disableCity(city, BizRegion);
    const acceptInfo =  {}; //this.props.applyForm.rlicPreAcceptInfo ||
    const type = 1 ; //this.props.applyForm.type
    const showFeed = type !== 2;
    const form = {
      getFieldProps:(name,rules)=>{return  {rules:rules,keyName:name,formKV:this.state.formKV,ref:name} }
    };
    return (
      <div className='container'>
        <TitleSpilt  uri={require('../../assets/img/basicInfo.png')} style={{marginBottom:'30px'}}/> 
        <Form onSubmit={this.handleSubmit} layout={'horizontal'}>
           <Row>
             <Col span={12} >
               <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="企业（字号）名称" hasFeedback={showFeed}>
                  <Input disabled={!showFeed}  {...tools.formRules(form,"entName",{required: true, min:2, message: '请输入企业名称!最少2个字'})} />
                </FormItem>
             </Col>
             <Col span={12} >
               <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="经营地址" hasFeedback={showFeed}>
                 <Cascader placeholder={'请选择地址'} options={ limitCity } disabled={!showFeed} 
                   {...tools.formRules(form,"bizAddrAdc",{required: true, message: '请选择地址!'})}
                 />
               </FormItem>
             </Col>
           </Row>
           <Row>
             <Col span={12}>
               <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="详细地址" hasFeedback={showFeed}>
                <Input disabled={!showFeed}
                 {...tools.formRules(form,"bizAddrStreet",{required: true, message: '请输入详细经营地址!'})} />
               </FormItem>
             </Col>
             <Col span={12}>
               <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="经营范围" hasFeedback={false}>
                  <Checkbox value='1501' disabled={true} checked={true}>卷烟零售</Checkbox>
                  <Checkbox value='1502' disabled={true} checked={true}>雪茄烟零售</Checkbox>
               </FormItem>
             </Col>
           </Row>
        
          <FormItem {...formItemLayout} label="经济类型" hasFeedback={showFeed}>
             <RadioGroup   disabled={!showFeed}
                 options = {tools.EcoTypeCfg}
                 {...tools.formRules(form,"ecoType",{required: true, message: '请选择经济类型!'},this.ecoTypeChange)}>
                
                 {this.state.ecoTypeOther ? 
                 <Input disabled={!showFeed } style={{width:'100px'}}
                  {...tools.formRules(form,"ecoTypeOther",{required: true, message: '请填写其他经济类型!'},this.ecoTypeChangeOther)} />
                 :null}
            </RadioGroup>
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label=" 工商营业执照编码" hasFeedback={showFeed}>
                <Input disabled={!showFeed} 
                   {...tools.formRules(form,"biId",{required: true, message: '请输入工商营业执照编码!'})} />
               </FormItem>
            </Col>
            <Col span={10} >
              <FormItem labelCol={{span:10}} wrapperCol={{span:14}} label="有效期至" hasFeedback={showFeed}>
                <DatePicker style={{width:'100%'}} disabled={this.state.biPeriod || !showFeed } 
                  placeholder = "营业执照有效期"
                  {...tools.formRules(form,"biPeriod",{required: !this.state.biPeriod, message: '请选择时间!'})} />

               </FormItem>
            </Col>
            <Col span={2} >
              <FormItem labelCol={{span:0}} wrapperCol={{span:24}} label="" hasFeedback={showFeed}>
                     <Checkbox
                       checked={this.state.biPeriod }
                       onChange={this.onChangeBiPeriod}
                       disabled={!showFeed}
                       style={{marginLeft:'10px'}}
                     >
                      长期
                     </Checkbox>
               </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}}  label=" 场地归属" hasFeedback={showFeed}>
                 <RadioGroup   disabled={!showFeed} 
                  {...tools.formRules(form,"placeOwnership",{required: true, message: '请选择场地归属!'})} >
                    {tools.PlaceOwnerRadio()}
                  </RadioGroup>
               </FormItem>
            </Col>
            <Col span={10}>
              <FormItem labelCol={{span:10}} wrapperCol={{span:14}}  label="租赁/无偿使用期限" hasFeedback={showFeed}>
                <RangePicker placeholder={'请选择租赁期限'} disabled={this.state.tenancyDate || !showFeed }
                   {...tools.formRules(form,"tenancyDate",{required: !this.state.tenancyDate, message: '请选择租赁/使用期限!!'})} />
               </FormItem>
            </Col>
            <Col span={2} >
              <FormItem labelCol={{span:0}} wrapperCol={{span:24}} label="" hasFeedback={false}>
                     <Checkbox
                        checked={this.state.tenancyDate}
                        onChange={this.onChangeTenancyDate}
                        disabled={!showFeed}
                        style={{"marginLeft":"10px"}}
                     >
                     长期
                     </Checkbox>
               </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="负责人" hasFeedback={showFeed}>
                 <Input placeholder={'负责人/经营者'} disabled={!showFeed} 
                  {...tools.formRules(form,"picName",{required: true, message: '请输入负责人(经营者)名称!!'})} />
               </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="证件类型：" hasFeedback={showFeed}>
                  <Select disabled={!showFeed} 
                    {...tools.formRules(form,"picCidType",{required: true, message: '请选择证件类型'})} 
                  >
                     <Option value='2801'>身份证</Option>
                     <Option value='2802'>户口本</Option>
                     <Option value='2803'>驾照</Option>
                     <Option value='2804'>护照</Option>
                     <Option value='2805'>其他</Option>
                   </Select>
               </FormItem>
            </Col>
          </Row>
          <FormItem  {...formItemLayout} label="证件号码" hasFeedback={showFeed}>
             <Input disabled={!showFeed} 
               {...tools.formRules(form,"picCidNo",{required: true,min:6, message: '请输入证件号码'})} 
             /> 
           </FormItem>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="  身份证住址" hasFeedback={showFeed}>
                 <Input disabled={!showFeed} 
                   {...tools.formRules(form,"picCidAddrStreet",{required: true, message: '请输入身份证住址'})} 
                 />
               </FormItem>
            </Col>
            <Col span={12} >
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="现住址" hasFeedback={showFeed}>
                 <Input placeholder={'现住址'} disabled={!showFeed}
                   {...tools.formRules(form,"picAddrStreet",{required: true, message: '请输入现住址'})} 
                  />
               </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label=" 联系人" hasFeedback={showFeed}>
                <Input disabled={!showFeed}
                  {...tools.formRules(form,"linkName",{required: true, message: '请输入联系人'})} 
                 />
               </FormItem>
            </Col>
            <Col span={12} >
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="联系电话" hasFeedback={showFeed}>
                 <Input disabled={!showFeed}
                  {...tools.formRules(form,"lineTel",{required: true, message: '请输入联系电话'})} 
                 />
               </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="邮寄地址" hasFeedback={showFeed}>
                <Cascader placeholder={'请选择地址'} options={city} disabled={!showFeed}
                   {...tools.formRules(form,"postAddrAdc",{required: true, message: '请选择地址!'})} 
                 />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{span:8}} wrapperCol={{span:16}} label="邮寄地址(街道)" hasFeedback={showFeed}>
                <Input disabled={!showFeed} 
                   {...tools.formRules(form,"postAddrStreet",{required: true, message: '请输入详细经营地址!'})} 
                />
              </FormItem>
            </Col>
          </Row>

           <TitleSpilt  uri={require('../../assets/img/materials.png')}/> 

           <ApplyFileUpload
            fileItem={ this.state.fileItem }
            disabled={!showFeed}
          /> 
          <Declaration checked={ this.state.promise} disabled={!showFeed} 
            onChange={()=>{
              this.setState({promise:!this.state.promise});
            }}
          /> 
          {
            showFeed ? <Row >
              <Col span={6} offset={6}>
                  <Button type="primary" htmlType="submit" size="large"
                    onClick = {this.handleSubmit}
                  >保存草稿</Button>
              </Col>
              <Col span={10} offset={2}>
                  <Button type="primary" htmlType="submit" size="large">提交申请</Button>
              </Col>
            </Row> : ''
          }
        </Form>
      </div>
    );
  }
}
export default NewForm;
