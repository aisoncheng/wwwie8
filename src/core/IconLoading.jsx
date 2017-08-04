import React, { Component } from 'react';


export default class IconLoading extends Component {
  render() {
    return (
      <img src={require('../../assets/img/loading.gif')} {...this.props}/>
    );
  }
}