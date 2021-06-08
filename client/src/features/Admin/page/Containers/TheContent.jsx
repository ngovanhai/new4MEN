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
import ManagerUsers from '../ManagerUsers';
import AddEditUser from '../AddEditUser';



const Dashboard = React.lazy(() => import('../Dashboard'));
const ProductAdmin = React.lazy(() => import('../Products'));
const AddEditProduct = React.lazy(() => import('../AddEditProducts'));
const Oder = React.lazy(() => import('../Oder'));
const TestOder = React.lazy(() => import('../../component/testOder'))

const TheContent = () => {

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
                            <Route path="/admin/user" name="User" render={props => <ManagerUsers {...props} />} />
                            <Route path="/addeditUser" name="Home" render={props => <AddEditUser {...props} />} />
                            <Route path="/addeditUser/:userId" name="Home" render={props => <AddEditUser {...props} />} />
                            <Route path="/admin/product" name="Home" render={props => <ProductAdmin {...props} />} />
                            <Route path="/addedit/:productId" name="Home" render={props => <AddEditProduct {...props} />} />
                            <Route path="/addedit" name="Home" render={props => <AddEditProduct {...props} />} />
                            <Route path="/oder/:oderId" name="Home" render={props => <TestOder {...props} />} />
                            <Redirect from="/admin" to="/admin/product" />
                        </Switch>
                    </Suspense>
                </CContainer>
            </main>
        </main>
    );
}

export default React.memo(TheContent);