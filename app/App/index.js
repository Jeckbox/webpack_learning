import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import First from '../First/Loadable.js';
import Second from '../Second/Loadable.js';

const history = createHistory();
class App extends React.Component {
    render() {
        return(
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={First} />
                        <Route exact path="/second" component={Second} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

