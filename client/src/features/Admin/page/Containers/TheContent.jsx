import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
    Redirect,
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import testOder from 'features/Admin/component/testOder';



const Dashboard = React.lazy(() => import('../Dashboard'));
const ProductAdmin = React.lazy(() => import('../Products'));
const AddEditProduct = React.lazy(() => import('../AddEditProducts'));
const Oder = React.lazy(() => import('../Oder'));
const TestOder = React.lazy(() => import('../../component/testOder'))

const TheContent = () => {

    const match = useRouteMatch();

    const loading = (
        <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
    )
    return (
        <main className="c-main">
            <main className="c-main">
                <CContainer fluid>
                    <Suspense fallback={loading}>
                        <Switch>
                            <Route path="/admin/oder" name="Home" render={props => <Oder {...props} />} />
                            <Route path="/admin/dashboard" name="Home" render={props => <Dashboard {...props} />} />
                            <Route path="/admin/product" name="Home" render={props => <ProductAdmin {...props} />} />
                            <Route path="/addedit/:productId" name="Home" render={props => <AddEditProduct {...props} />} />
                            <Route path="/addedit" name="Home" render={props => <AddEditProduct {...props} />} />
                            <Route path="/oder/:oderId" name="Home" render={props => <TestOder {...props} />} />
                            <Redirect from="/admin" to="/admin/dashboard" />
                        </Switch>
                    </Suspense>
                </CContainer>
            </main>
        </main>
    );
}

export default React.memo(TheContent);