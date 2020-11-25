import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Size from './page/Size';
import Chinhsachvip from './page/chinhsachvip';
import Gioithieu from './page/gioithieu';


Information.propTypes = {};

function Information(props) {
    const match = useRouteMatch();
    console.log(match);
    return (
        <Switch>
            <Redirect exact from="/test" to="/test/size" />
            <Route path={`${match.url}/size`} component={Size} />
            <Route path={`${match.url}/chinhsachvip`} component={Chinhsachvip} />
            <Route path={`${match.url}/gioithieu`} component={Gioithieu} />
        </Switch>
    );
}

export default Information;