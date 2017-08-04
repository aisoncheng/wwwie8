
import React from 'react';
import {Container,Header,NewForm } from '../bizComponent';


export default class NewFormRouter extends React.Component{
  

  componentDidMount() {
   // this.refs.tweeone.dom.style.width = "240px";
  }
  render() {

    return (
       <div>
          <Header />
          <Container >
              <NewForm />
          </Container>
        </div>
    );
  }
};

