import React, { Component } from 'react';
import {Row, Col, Checkbox} from '../core';
import PropTypes from 'prop-types';

class DeclarationComponent extends Component {
    render () {
        return (
             <Row style={{ margin: '30px 0px' }}>
                <Col >
                <div style={{ border: '1px dotted rgb(202, 195, 195)', borderRadiux: '5px', padding: '10px' }}>
                    <p style={{ padding: '5px' }}>申请人承诺：</p>
                    <p style={{ padding: '5px' }}>以上信息经本人核对，确认无误。本申请人所提交的文件、证件以及有关材料全部真实、</p>
                    <p style={{ padding: '5px' }}>有效，上传附件与原件一致。如果申请过程中存在虚假、欺骗等不法行为，本申请人愿承担由此引起的一切法律责任。</p>
                    <div style={{ height: '30px' }}>
                    <Checkbox
                        checked={this.props.checked}
                        disabled={this.props.disabled}
                        onChange={this.props.onChange}
                        style={{ float: 'right', marginRight: '30px', marginTop: '15px' }}>同意</Checkbox>
                    </div>
                </div>
                </Col>
            </Row>
        )
    }
}

DeclarationComponent.propTypes = {

}

export default DeclarationComponent