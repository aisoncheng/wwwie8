//@flow

import React from 'react';
import './core.less';
//1
export var VilatdateConponet = ComposeComponent => class extends ComposeComponent {
    // 2
    static displayName = 'ComponentEnhancedWithIntervalHOC';

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            message:''
        };
    }
    // 3
    componentDidMount() {
       // this.interval = setInterval(this.tick.bind(this), 1000);
    }
    // 3
    componentWillUnmount() {
       // clearInterval(this.interval);
    }

    // tick() {
    //     this.setState({
    //         seconds: this.state.seconds + 1000
    //     });
    // }

     validate = (e,v) =>{
        const val = e ? e.target.value : v === undefined ? '': v;
        const rules = this.props.rules;
        const keyName = this.props.keyName;

        this.setState({hasChanged:true});
        if(keyName){
            this.props.formKV[keyName] = val
        }
        typeof val === 'string' && (val.trim());
        if(rules && rules.rules){
            let rule ;
            const ruless = rules.rules;
            for(let i =0; i<ruless.length;i++ ){
                rule = ruless[i];   
                //验证是否必须
                if(rule.required && !val){  //如果是必须的
                  this.setState({message:rule.message});
                  break;
                }else{
                  this.setState({message:''});
                }  
                //验证长度
                if(rule.min && rule.min > val.length){
                  this.setState({message:rule.message});
                  break;
                }else{
                  this.setState({message:''});
                }
            } 
        }
     }

     //初始化组件的时候如果存在默认值 则赋默认值
     componentDidMount(){
        const formKV = this.props.formKV;
        const keyName = this.props.keyName;
        const defaultValue = this.props.defaultValue;
        if(formKV && keyName && defaultValue!==undefined ){
            formKV[keyName] = defaultValue
        }
     }

    render() {
        return (
            // 4
            <ComposeComponent validate = {this.validate}  {...this.props} {...this.state} >
                {this.state.message ? <span className='error'>{this.state.message}</span> : ''}
                {this.state.hasChanged ? <i className={`icon ${this.state.message ? 'wrong' : 'right' }`} /> : ''}
            </ComposeComponent>
        );
    }
}
