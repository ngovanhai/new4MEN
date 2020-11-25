// import React from 'react';
// import { Route, Switch, useRouteMatch } from 'react-router-dom';
// import AddEditProducts from './page/AddEditProducts';
// import Thelayout from './page/Containers/Thelayout';
// import Dashboard from './page/Dashboard';
// import Oder from './page/Oder';
// import ProductsAdmin from './page/Products';


// Products.propTypes = {};

// function Products(props) {
//     const match = useRouteMatch();
//     console.log("match", match.ul);
//     return (
//         <Switch>
//             <Route exact path={match.url} component={Thelayout} />
//             <Route exact path={`${match.url}/:ProductsId`} component={AddEditProducts} />
//             <Route exact path={`${match.url}/product`} component={ProductsAdmin} />
//             <Route exact path={`${match.url}/oder`} component={Oder} />
//         </Switch>
//     );
// }

// export default Products;