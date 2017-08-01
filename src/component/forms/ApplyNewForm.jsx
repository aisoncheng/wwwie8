
import React from 'react';
import {Container,Header} from '../../common';
import NewForm from '../form/NewForm';


export default class ApplyNewForm extends React.Component{
  

  componentDidMount() {
   // this.refs.tweeone.dom.style.width = "240px";
  }
  render() {
    return (
       <div>
          <Header />
          <Container >
              <NewForm
                disabledTitle={'表单'}
                nextStep = {'/new/form'}
               />
          </Container>
        </div>
    );
  }
};

