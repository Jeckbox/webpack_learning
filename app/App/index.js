import React from 'react';
import {  Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Loadable.js';

class App extends React.Component {
    render() {
        return(
            <div style={{ fontFamily: '微软雅黑' }}>
                <Switch>
                    <Route path="/" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default App;

