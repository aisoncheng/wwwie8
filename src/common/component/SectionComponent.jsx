/* @flow */
import React, { Component } from 'react';
import './section.less';

export default class SectionComponent extends Component {
  render() {
    return (
      <div className="sectionDiv">
        <div className="sectionTitle">{this.props.title}</div>
        {this.props.children}
      </div>
    );
  }
}
