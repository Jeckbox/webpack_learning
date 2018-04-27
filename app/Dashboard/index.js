import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import LeftNav from './LeftNav';
import Clock from '../Clock/Loadable.js';
import CountDown from '../CountDown/Loadable.js';
import MoveCanvas from '../MoveCanvas/Loadable.js';

import {
    Content,
    Container,
} from './styles.js';

class Dashboard extends PureComponent {

    render() {
        const { history, match, location } =  this.props;
        return(
            <Content>
                <LeftNav history={history} location={location} />
                <Container>
                    <Switch>
                        <Route
                            exact
                            path={match.url}
                            component={Clock}
                        />
                        <Route
                            exact
                            path={`${match.path}countdown`}
                            component={CountDown}
                        />
                        <Route
                            exact
                            path={`${match.path}movecanvas`}
                            component={MoveCanvas}
                        />
                    </Switch>
                </Container>
            </Content>
        );
    }
}
Dashboard.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
};
export default  Dashboard;