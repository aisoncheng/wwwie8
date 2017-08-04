import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import { Input } from '../core';


class MyDatePicker  extends Component {


    state = {
        hasChage : false,
        message:'',
        val : ''
    }
    getCalendarContainer =() => {
      return this.refs.d;
    }

    getTimeVal =(value)=>{
        return value && value.format(this.props.format||'YYYY-MM-DD') || '' ;
    }

    onchange =(val)=>{
        this.setState({'val':val});
        this.validate(val);
    }

    validate = (val)=>{
     const input = this.refs.picker.refs.pickerInput;
     val = val || this.state.val;
     input.validate(null,val);
     const those = this;
     setTimeout(function() {
        those.setState({message:input.state.message});
     }, 20);
   };

    render () {
        return (
            <div id="d" ref="d">
               <DatePicker
                    animation="slide-up"
                    getCalendarContainer={this.getCalendarContainer}
                    calendar={<Calendar locale={zhCN}/>}
                    onChange = {this.onchange}
                    ref = 'picker'
                >
                {
                    ({value})=>{
                        return  <Input ref='pickerInput' defaultValue = {this.props.initVal}  value={ this.getTimeVal(value) }   placeholder = {this.props.placeholder} {...this.props} /> 
                    }
                }
                </DatePicker>
            </div>
        )
    }
}

MyDatePicker.propTypes = {
    format : PropTypes.string
}
export default MyDatePicker 


//   {
// ({ value }) => {
//     return (
//     <span>
//     <input
//     style={{ width: 250 }}
//     readOnly
//     value={value && value.format(format) || ''}
//     />
//     </span>
//     );
// }
// }