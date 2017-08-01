/* @flow */
import React, { Component } from 'react';
import { Icon, Progress } from 'antd';
import './upload.less';

export default class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.files,
      loading: [],
    };
  }
  // 数据回显
  onLoad = () => {
    let file = this.refs.iframe.contentWindow.document.body.innerHTML;
    file = JSON.parse(file);
    this.props.files.push(file.data);
    this.setState({ files: this.props.files });
    const loading = this.state.loading;
    loading.shift();
    this.setState({ loading: loading });
  }
  // 提交表单
  uploadFile = (e) => {
    let val = e.target.value;
    if (!val) {
      return false;
    }
    val = val.substring(val.lastIndexOf('\\')+1);
    const loading = this.state.loading;
    loading.push({ name: val });
    this.setState({ loading: loading });
    this.refs.form.submit();
    e.target.value = '';
  }
  // 删除文件
  deleteFile = (e) => {
    let o = e.target.id;
    if (o.indexOf('_') !== -1) {
      o = o.substring(0, o.indexOf('_'));
      this.state.loading.splice(o, 1);
      this.setState({ loading: this.state.loading });
    } else {
      this.state.files.splice(o, 1);
      this.setState({ files: this.state.files });
    }
  }

  render() {
    const options = this.props.options || {
      baseUrl: 'http://218.75.75.132:9080/REGIEAPP_LIC_WEB/licPreGns/fileUpload',
      chooseAndUpload: true,
      param: {
        accesstoken: '123',
        orgCode: 123,
        fileUrl: '123.jpg',
      },
    };
    const inputs = [];
    let i = 0;
    for (const args in options.param) {
      inputs.push(<input key={i} name={args} type="hidden" value={options.param[args]} />);
      i++;
    }
    const files = this.state.files.map((info, z) => {
      const url = `http://218.75.75.132:9080/REGIEAPP_LIC_WEB/licPreGns/filePreview?filePath=${info.path}&${options.param.accesstoken}=null&orgCode=${options.param.orgCode}`;
      return (
        <div key={z} className="currentFiles">
          <a href={url} target="_blank" className="imamgesA">
            <Icon type="paper-clip" style={{ marginRight: '5px' }} />
            {info.name}
          </a>
          <Icon type="delete" className="deleteImg" onClick={this.deleteFile} id={z} />
        </div>);
    });

    const  loadingImg = this.state.loading.map((info, z) => {
      return (
        <div key={z} className="currentFiles">
          <a  target="_blank" className="imamgesA">
            <Icon type="loading" style={{ marginRight: '5px' }} />
            {info.name}
          </a>
          <Icon type="delete" className="deleteImg" onClick={this.deleteFile} id={z + '_loading'} />
        </div>
      );
    });

    return (
      <div className="uploadFile">
        <iframe  ref="iframe" name="thisFrame" style={{ display: 'none' }} onLoad={this.onLoad} />
        <form
          method="post"
          encType="multipart/form-data"
          action={options.baseUrl}
          target="thisFrame"
          ref="form"
          className="fileForm"
        >
          {inputs}
          <div className="uploadDiv disabled">
            <input type="file" name="fileUrl" className="fileLoadInput" onChange={this.uploadFile}></input>
          </div>
        </form>
        <div className="fileList">
          {files}
          {loadingImg}
        </div>
      </div>
    );
  }
}

