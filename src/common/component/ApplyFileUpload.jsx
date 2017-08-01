/* @flow */

import React, { Component } from 'react';
import { Row, Col, Icon, Button, Upload, Modal } from 'antd';
import './upload.less';

export default class ApplyFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  onChangeApply = (files, info) => {
    const file = files.file;
    let fileList = files.fileList;
    fileList = fileList.map((f) => {
      if (f.response) {
        const uri = `http://218.75.75.132:9080/REGIEAPP_LIC_WEB/licPreGns/filePreview?filePath=${f.response.data.path}&accesstoken=8afac0cc5c9f0e98015cbeaed6250c3e-ticket&orgCode=10330101`;
        f.url = uri;
        f.seqNo = 0;
        f.picName = f.name;
        f.applyMaterialAttPath = f.response.data.path;
      }
      return f;
    });
    this.props.fileItem.forEach((item) => {
      if (item.materialNameTitle === info.materialNameTitle) {
        item.applyMaterialAttArray = fileList;
        return false;
      }
    });
    console.log(this.props.fileItem);
    this.setState({ fileList: this.props.fileItem });
  };
  render() {
    // this.setState({ fileList: this.props.fileItem });
    const props2 = {
      action: 'http://218.75.75.132:9080/REGIEAPP_LIC_WEB/licPreGns/fileUpload',
      name: 'fileUrl',
      withCredentials: true,
      className: 'upload-list-inline',
      //accept: 'image/*',
    };
    const uploads = this.props.fileItem.map((info, i) => {
      return (
        <Row key={i} className="uploadRow" onClick={this.onClick}>
          <Col span={4} className="labelCol">
            <span className="fileLable">{info.materialName}</span>
          </Col>
          <Col span={20} className="contentCol">
            {info.auto ?
              <a className="autoCreate">自动生成</a> :
              <Upload
                {...props2}
                onChange={(file) => {
                  this.onChangeApply(file, info);
                }}
                fileList={info.applyMaterialAttArray}
                className="uploadCom"
                ref={info.materialNameTitle}
                disabled={info.applyMaterialAttArray.length >= info.count || this.props.disabled }
                beforeUpload={(file) => {
                  const fix = file.name.substring(file.name.lastIndexOf('.') + 1);
                  if (info.allowFix && info.allowFix.indexOf(fix) === -1) {
                    Modal.error({
                      title: '提示',
                      content: `只允许上传 ${info.allowFix} 格式的文件`,
                    });
                    return false;
                  }
                }}
              >
                <Button>
                  <Icon type="upload" /> upload
                </Button>
              </Upload>
            }
          </Col>
        </Row>
      );
    });
    return (
      <div className={this.props.disabled ? 'applyFileUpload disabled' : 'applyFileUpload'}>
        {uploads}
      </div>
    );
  }
}
