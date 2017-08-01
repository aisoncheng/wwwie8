import {Input,Cascader,Select,DatePicker} from 'antd'
import city from './city'
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
export default {
    notice:{

    },
    form:{
      //延续
      extend:{
         base:[
            [{
                label:'申请人',
                require:true,
                type:<Input disabled/>,
                initVal:'',
                key:'applyUserName'
              },
              {
                label:'许可证号',
                require:true,
                type:(
                  <Select>
                    <Option value='xx'>aasssss</Option>
                  </Select>
                ),
                initVal:'',
                requireMsg:'',
                key:'licNo'
              }],
              [{
                  label:'联系人',
                  require:true,
                  type:<Input />,
                  initVal:'',
                  requireMsg:'',
                  key:'touchName'
                },
                {
                  label:'联系电话',
                  require:true,
                  type:<Input disabled />,
                  initVal:'',
                  requireMsg:'请输入联系电话',
                  key:'touchTel'
              }],
              [{
                  label:'邮寄省份',
                  require:true,
                  type:<Cascader placeholder={'请选择地址'} options={city}/>,
                  initVal:'',
                  requireMsg:'请选择地址',
                  key:'postAddree'
              }],
              [{
                  label:'邮寄详细地址',
                  require:true,
                  type:<Input/>,
                  initVal:'邮寄详细地址',
                  requireMsg:'',
                  key:'postAddressDetail'
              }],
              [{
                  label:'申请停业事由',
                  require:true,
                  type:<Input type='textarea' rows={4}/>,
                  initVal:'',
                  requireMsg:'',
                  key:'stopReson'
              }],
              [{
                  label:'申请停业日期',
                  require:false,
                  type:(
                    <RangePicker placeholder={'租赁（无偿使用）'} />
                  ),
                  initVal:'',
                  requireMsg:'',
                  key:'stopDate'
              }]
         ],
         files:[
           {label:'申请表',auto:true},{label:'负责人身份证正面'},{label:'负责人身份证反面'}
         ],
         fromUri:'/form/close',
         info:'延续申请'
      },//end
      //停业
      stop:{
         base:[
            [{
                label:'申请人',
                require:true,
                type:<Input disabled/>,
                initVal:'',
                key:'applyUserName'
              },
              {
                label:'许可证号',
                require:true,
                type:(
                  <Select>
                    <Option value='xx'>aasssss</Option>
                  </Select>
                ),
                initVal:'',
                requireMsg:'',
                key:'licNo'
              }],
              [{
                  label:'联系人',
                  require:true,
                  type:<Input />,
                  initVal:'',
                  requireMsg:'',
                  key:'touchName'
                },
                {
                  label:'联系电话',
                  require:true,
                  type:<Input />,
                  initVal:'',
                  requireMsg:'请输入联系电话',
                  key:'touchTel'
              }],
              [{
                  label:'邮寄省份',
                  require:true,
                  type:<Cascader placeholder={'请选择地址'} options={city}/>,
                  initVal:'',
                  requireMsg:'请选择地址',
                  key:'postAddree'
              }],
              [{
                  label:'邮寄详细地址',
                  require:true,
                  type:<Input/>,
                  initVal:'邮寄详细地址',
                  requireMsg:'',
                  key:'postAddressDetail'
              }],
              [{
                  label:'申请停业事由',
                  require:true,
                  type:<Input type='textarea' rows={4}/>,
                  initVal:'',
                  requireMsg:'',
                  key:'stopReson'
              }],
              [{
                  label:'申请停业日期',
                  require:false,
                  type:(
                    <RangePicker placeholder={'租赁（无偿使用）'} />
                  ),
                  initVal:'',
                  requireMsg:'',
                  key:'stopDate'
              }]
         ],
         files:[
           {label:'申请表',auto:true},{label:'负责人身份证正面'},{label:'负责人身份证反面'}
         ],
         fromUri:'/form/close',
         info:'停业申请'
      },//end
      //恢复营业
      resume:{
         base:[
            [{
                label:'申请人',
                require:true,
                type:<Input disabled/>,
                initVal:'',
                key:'applyUserName'
              },
              {
                label:'许可证号',
                require:true,
                type:(
                  <Select>
                    <Option value='xx'>aasssss</Option>
                  </Select>
                ),
                initVal:'',
                requireMsg:'',
                key:'licNo'
              }],
              [{
                  label:'联系人',
                  require:true,
                  type:<Input />,
                  initVal:'',
                  requireMsg:'',
                  key:'touchName'
                },
                {
                  label:'联系电话',
                  require:true,
                  type:<Input />,
                  initVal:'',
                  requireMsg:'请输入联系电话',
                  key:'touchTel'
              }],
              [{
                  label:'邮寄省份',
                  require:true,
                  type:<Cascader placeholder={'请选择地址'} options={city}/>,
                  initVal:'',
                  requireMsg:'请选择地址',
                  key:'postAddree'
              }],
              [{
                  label:'邮寄详细地址',
                  require:true,
                  type:<Input/>,
                  initVal:'邮寄详细地址',
                  requireMsg:'',
                  key:'postAddressDetail'
              }],
              [{
                  label:'申请恢复营业事由',
                  require:true,
                  type:<Input type='textarea' rows={4}/>,
                  initVal:'',
                  requireMsg:'',
                  key:'recoveryReson'
              }],
              [{
                  label:'原停业日期',
                  require:false,
                  type:(
                    <div>
                      <Input value='xxx' style={{width:'150px'}} disabled></Input>
                      <span>&nbsp;&nbsp;到&nbsp;&nbsp;</span>
                      <Input value='xxx' style={{width:'150px'}}  disabled></Input>
                    </div>
                  ),
                  initVal:'',
                  requireMsg:'',
                  key:'recoveryOldDate'
              }],
              [{
                  label:'恢复营业日期',
                  require:true,
                  type:<DatePicker style={{width:'50%'}}/>,
                  initVal:'',
                  requireMsg:'',
                  key:'recoveryDate'
              }]
         ],
         files:[
           {label:'申请表',auto:true},{label:'负责人身份证正面'},{label:'负责人身份证反面'}
         ],
         fromUri:'/form/close',
         info:'恢复营业申请'
      },//end
      //歇业
      close:{
         base:[
            [{
                label:'申请人',
                require:true,
                type:<Input/>,
                initVal:'',
                key:'applyUserName'
              },
              {
                label:'许可证号',
                require:true,
                type:(
                  <Select>
                    <Option value='xx'>aasssss</Option>
                  </Select>
                ),
                initVal:'',
                requireMsg:'',
                key:'licNo'
              }],
              [{
                  label:'联系人',
                  require:true,
                  type:<Input/>,
                  initVal:'',
                  requireMsg:'',
                  key:'touchName'
                },
                {
                  label:'联系电话',
                  require:true,
                  type:<Input disabled/>,
                  initVal:'',
                  requireMsg:'',
                  key:'touchTel'
              }],
              [{
                  label:'邮寄省份',
                  require:true,
                  type:<Cascader placeholder={'请选择地址'} options={city}/>,
                  initVal:'',
                  requireMsg:'',
                  key:'postAddress'
              }],
              [{
                  label:'邮寄详细地址',
                  require:true,
                  type:<Input/>,
                  initVal:'',
                  requireMsg:'',
                  key:'postAddressDetail'
              }],
              [{
                  label:'歇业事由',
                  require:true,
                  type:<Input type='textarea' rows={4}/>,
                  initVal:'',
                  requireMsg:'',
                  key:'closeReson'
              }],
         ],
         files:[
           {label:'申请表',auto:true},{label:'负责人身份证正面'},{label:'负责人身份证反面'}
         ],
         fromUri:'/form/close',
         info:'歇业申请'
      },//end
    },
}

