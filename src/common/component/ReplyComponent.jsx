import React from 'react';
import { Button, Row, Col, Tag } from 'antd';
import './reply.less';


const close = () => {
  window.location.href = 'http://www.zjzwfw.gov.cn/';
}

const ReplyComponent = ({ reply }) => {
  const fileList = reply.fileList || [];
  const fileLi = fileList.map((info, i) => {
    return <li key={i}>{ i }.{ info.materialName }</li>;
  });
  return (
    <div className="replyContainer">
      <h1>申请答复书</h1>
      <div>
        <p>{ reply.applicantName }：</p>
        <p className="nr">您于{ reply.receiveTime }向本局提出的新办烟草专卖零售许可证申请，已被自动受理，受理编号：{reply.preAcceptNo}。 </p>
        <p className="nr">本局将在一个工作日内进行复核，若发现您的申请材料内容有误或不属于本局法定职权范围的，将通过短信并电话联系，告知您通过撤回申请。若您未及时撤回申请的，我局将依法终止办理。</p>
        <p className="end">{ reply.receiveUnit }</p>
        <p className="end">{ reply.receiveTime }</p>
      </div>
      <div className="applyNo">申报号：{ reply.column1 }， 查询密码：{ reply.column2 }</div>
      <div className="applyFileList">
        <div>
          <Tag color="#2db7f5" style={{ width: '120px', height: '30px', lineHeight: '30px', fontSize: '14px', textAlign: 'center' }}>已提交材料清单</Tag>
          <ul>
            <li>1.申请表</li>
            <li>2.负责人（经营者）身份证-正面</li>
            <li>3.负责人（经营者）身份证-反面</li>
            <li>4.工商营业执照</li>
          </ul>
        </div>
        <div>
          <Tag color="#2db7f5" style={{ width: '120px', height: '30px', lineHeight: '30px', fontSize: '14px', textAlign: 'center' }}>办事指引</Tag>
          <ul>
            {fileLi}
          </ul>
        </div>
      </div>
      <Row>
        <Col span={12} offset={10}>
          <Button className="ant-btn ant-btn-primary ant-btn-lg" onClick={close}>关闭</Button>
        </Col>
      </Row>
    </div>
  );
}

export default ReplyComponent;
