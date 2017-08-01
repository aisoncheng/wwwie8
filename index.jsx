import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Material,IndexMenu, ApplyNewForm } from './src/component';
import { tools } from  './src/utils';
// HTML5 history, 推荐
import createHistory from 'history/lib/createBrowserHistory'

// Hash history
//import createHistory from 'history/lib/createHashHistory'

// 内存 history （如：node环境）
//import createHistory from 'history/lib/createMemoryHistory'
const history = createHistory();
require('es6-promise').polyfill();

_global.history = history;
class App extends React.Component {
  render() {
    return (
        <Router history={history}>
          <Route path="/notice/:name" component={IndexMenu} onEnter={this.onenter}/>
          <Route path="/material/:name" component={Material} onEnter={this.onenter}/>
          <Route path="/form/new" component={ApplyNewForm} onEnter={this.onenter}/>
        </Router>
    );
  }


  onenter = ()=>{
    tools.setParamsCookie();
    console.log('enter the componnet');
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
