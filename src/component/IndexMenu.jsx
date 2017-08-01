import React from 'react';
import { tools } from '../utils';
import { Header,Container,Notice } from '../common';
import './IndexMenu.less';


export default class IndexMenu extends React.Component{
  
  constructor(props){
    super(props);
    this.state ={
      current :'',
      user:'艾成松',
      theme: 'light',
      paused:true,
      sideWidth:240,
      reverse:false
    }
  }
 
  componentDidMount() {
   // this.refs.tweeone.dom.style.width = "240px";
  }
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
};

