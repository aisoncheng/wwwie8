import React, { Component } from 'react';
import { Header,Container,Notice } from '../bizComponent';

export default class componentName extends Component {
  render() {
    return (
      <div className="container">
         <Header/>
         <Container >
           <Notice  />
         </Container>
      </div>
    );
  }
}