import React, { Suspense, useEffect } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import './scss/style.scss';


import Headers from './component/Header';
import NotFound from './component/NotFound';
import Footer from 'component/Footer';
import Empty from 'component/Empty';
import SelectProduct from 'features/Products/pages/Item';
import Payment from 'features/Products/pages/Payment';
import Thelayout from 'features/Admin/page/Containers/Thelayout';
import { AddToProduct } from 'features/Products/productSlice';

import productApi from 'api/productsAPI';
import userApi from 'api/useAPI';





const Products = React.lazy(() => import('./features/Products/pages/MainPage'));
const Login = React.lazy(() => import('./features/Login'));
const Admin = React.lazy(() => import('./features/Admin'));
const Category = React.lazy(() => import('./features/Products/pages/Category'));


function App(props) {
  const dispatch = useDispatch();

  const refreshToken = async () => {

    try {
      const token = localStorage.getItem("token")
      const token_refresh = await userApi.refresh_token(token)
      localStorage.setItem("accesstoken", JSON.stringify(token_refresh))

    } catch (err) {
      console.log(err.msg)
    }
  }

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const response = await productApi.getAll();
        dispatch(AddToProduct(response));
      } catch (err) {
        console.log('failed to fetch product list :')
      }
    }
    fetchProductsList();
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Empty}></Route>
          <Route exact path='/admin/' component={Empty}></Route>\
          <Route exact path='/admin/product' component={Empty}></Route>
          <Route exact path='/admin/oder' component={Empty}></Route>
          <Route exact path='/admin/product' component={Empty}></Route>
          <Route exact path='/admin/dashboard' component={Empty}></Route>
          <Route exact path='/Addedit' component={Empty}></Route>
          <Route exact path='/Addedit/:productId' component={Empty}></Route>
          <Route exact path='' component={Headers}></Route>
        </Switch>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact path='/' component={Products} />
            <Route path='/category/:category' component={Category} />
            <Route path='/4MEN/:productId' component={SelectProduct} />
            <Route path='/thanh-toan' component={Payment} />
            <Route path='/login' component={Login} ></Route>
            <Route path="/admin" name="Home" render={props => <Thelayout {...props} />} />
            <Route path="/addedit" name="addedit" render={props => <Thelayout {...props} />} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Switch>
          <Route exact path='/login' component={Empty}></Route>
          <Route exact path='/admin/' component={Empty}></Route>
          <Route exact path='/admin/product' component={Empty}></Route>
          <Route exact path='/Addedit' component={Empty}></Route>
          <Route exact path='/Addedit/:productId' component={Empty}></Route>
          <Route exact path='' component={Footer}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
