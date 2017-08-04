import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Checkbox extends Component {

  constructor(props){
    super(props);
    this.state = {
        checked : false,
        position:{}
    }
  }

  onChange = (re)=>{
     const v = !this.state.checked;
     this.setState({checked:v});
     this.props.onClick && this.props.onClick(v);
  }

  componentDidMount() {
  }

  render() {
    const size = ( this.props.size || 14)+'px';
    return (
      <div className={`checkboxContainer ${this.props.className||''}`}  style={this.props.style}>
          <div className='boxOne' 
             style={{width:size,height:size}}
          >
               <span 
                className={`${this.props.type||'checkbox'}Span ${this.state.checked ? 'checked' : ''}`}
                style={{width:size,height:size}}
                ></span>
                <input type= {this.props.type || 'checkbox'}  
                    style={{width:size,height:size}}
                    className={this.props.type || 'checkbox'}
                    ref = 'checbox'
                    onChange={this.onChange}
                    name = {this.props.name}
                />
          </div>
          <span ref='content' className='content' style={this.props.type==='radio' ? {marginLeft:'5px'} : {}}
            onClick={this.onChange}
          >{this.props.children}</span>
      </div>
    );
  }
}