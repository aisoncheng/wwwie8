import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../core';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import Picker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

class RangePicker  extends Component {

    state = {
         value: [],
         hoverValue: [],
         message:'',
         val : '',
         formatStr:this.props.format || 'YYYY-MM-DD'
    }
    onChange = (value) =>{
        this.setState({ value:value });
        this.validate(value);
    }
    format =(v)=> {
        return v ? v.format(this.state.formatStr) : '';
    }
    validate = (val)=>{
        const input = this.refs.picker.refs.pickerInput;
        
        val = val || this.state.value.length>0 ? this.state.value : null;
    
        input.validate(null,val);
        const those = this;
        setTimeout(function() {
            those.setState({message:input.state.message});
        }, 20);
    };

    getVal = (value) => {
        if(!this.isValidRange(value)){
            return '';
        }
        if(typeof value[0] === 'string'){
            value[0] = new moment(value[0]);
        }
        if(typeof value[1] === 'string'){
            value[1] = new moment(value[1]);
        }
        return  `${this.format(value[0])} - ${this.format(value[1])}`;
    }

    isValidRange = (v) => {
        return v && v[0] && v[1];
    }
    disabledTime = (time, type) =>{
        console.log('disabledTime', time, type);
        if (type === 'start') {
            return {
            disabledHours() {
                const hours = newArray(0, 60);
                hours.splice(20, 4);
                return hours;
            },
            disabledMinutes(h) {
                if (h === 20) {
                return newArray(0, 31);
                } else if (h === 23) {
                return newArray(30, 60);
                }
                return [];
            },
            disabledSeconds() {
                return [55, 56];
            },
            };
        }
        }
    render () {
        const timePickerElement = (
            <TimePickerPanel />
        );

        const calendar = (
            <RangeCalendar
                hoverValue={this.state.hoverValue}
                onHoverChange={this.onHoverChange}
                showWeekNumber={false}
                dateInputPlaceholder={['开始时间', '结束时间']}
                defaultValue={this.props.initVal || []}
                locale={zhCN}
                disabledTime={this.disabledTime}
                timePicker={this.timePickerElement}
            />
            );

        return (
            <div>
                <Picker
                    value={this.state.value}
                    onChange={this.onChange}
                    animation="slide-up"
                    calendar={calendar}
                    disabled={this.props.disabled}
                    ref="picker"
                >
                    {
                    ({ value }) => {
                        return (
                            <Input
                                placeholder={this.props.placeholder}
                                style = {this.props.style}
                                disabled={this.props.disabled}
                                readOnly
                                defaultValue = {this.getVal(this.props.initVal)}
                                value={this.getVal(value)}
                                ref="pickerInput"
                                {...this.props}
                            />
                        );
                    }
                    }
                </Picker>
            </div>
        )
    }
}
RangePicker .propTypes = {

}

export default RangePicker 