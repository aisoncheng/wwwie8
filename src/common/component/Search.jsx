import React, { Component } from 'react';
import { Icon,Input } from 'antd';
import './search.less';


export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            focus : false,
            val : ''
        }
    }
    onFocus = () =>{
        this.setState({focus: true});
    }
    changeInput = (e) =>{
       const val =  e.target.value;
       this.setState({val : val});
    }
    blur = () =>{
       this.setState({focus: this.state.val?true:false});
    }
    render() {
        return (
        <div className="search" style={this.props.style}>
            <Input size="large" value={this.state.val}  className="searchInput" 
                onFocus={this.onFocus} 
                onChange = {this.changeInput}
                onBlur={this.blur}
            />
            <Icon type="search"  className="searchBtn"
                onClick={()=>{
                   this.props.onSearch && this.props.onSearch();
                }}
            />
            { !this.state.focus ?  <span  className="placeholder" >一键搜</span> :''}
        </div>
        );
    }
}