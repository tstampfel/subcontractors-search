import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { HeaderComponent } from '../header/header';
import Home from '../home';

function Routes(props:any) {
    return (
        <div>
            <Router>
                <div>
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default Routes;