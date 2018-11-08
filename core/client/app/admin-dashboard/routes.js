import React from 'react';
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/Main/App';
import MainLogin from './components/Main/MainLogin'
import Loading from '../common/Loading/Loading';
import Loadable from 'react-loadable';
import ListEmployee from './components/Employee/ListEmployee'
import CreateEmployee from './components/Employee/CreateEmployee'
import Edit from './components/Employee/Edit'
// import Delete from './components/Employee/CreateEmployee'

const history = createBrowserHistory();

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

const loadAsync = (opts) => {
    return Loadable(Object.assign({
        loading: () => {
            return (
                // <Loading/>
                <div>...Loading</div>
            )
        }
    }, opts));
}

export default () => {
    return (
        <BrowserRouter>

            <Switch>

                <AppRoute exact path="/dashboard" layout={App} component={loadAsync({ loader: () => import('./components/Drashboard/Drashboard') })} />

                <AppRoute path="/services/create" layout={App} component={loadAsync({ loader: () => import('./components/Services/CreateServices') })} />
                <AppRoute path="/services/list" layout={App} component={loadAsync({ loader: () => import('./components/Services/ListServices') })} />
                <AppRoute path="/services/update/:id" layout={App} component={loadAsync({ loader: () => import('./components/Services/UpdateServices') })} />

                <AppRoute path="/work_item/create" layout={App} component={loadAsync({ loader: () => import('./components/Work_Item/CreateWork') })} />
                <AppRoute path="/work_item/list" layout={App} component={loadAsync({ loader: () => import('./components/Work_Item/ListWork') })} />
                <AppRoute path="/work_item/update/:id" layout={App} component={loadAsync({ loader: () => import('./components/Work_Item/UpdateWork') })} />

                <AppRoute path="/work/progress" layout={App} component={loadAsync({ loader: () => import('./components/Work/Progress') })} />
                <AppRoute exact path="/work/request/detail/:id" layout={App} component={loadAsync({ loader: () => import('./components/Work/RequestDetail') })} />
                <AppRoute exact path="/work/request/progress/:id" layout={App} component={loadAsync({ loader: () => import('./components/Work/WorkProgress') })} />
                <AppRoute exact path="/work/request/list" layout={App} component={loadAsync({ loader: () => import('./components/Work/ListRequestCustomer') })} />
                <AppRoute exact path="/work/request/create" layout={App} component={loadAsync({ loader: () => import('./components/Work/RequestCustomer') })} />
                {/* exact check link độ chính xác cao */}

                <AppRoute path="/employee/list" layout={App} component={ListEmployee} />
                <AppRoute path="/employee/new" layout={App} component={CreateEmployee} />
                <AppRoute path="/employee/edit/:employee_id" layout={App} component={Edit} />
                <AppRoute path="/employee/wage" layout={App} component={loadAsync({ loader: () => import('./components/Employee/Wage') })} />
                <AppRoute path="/employee/table" layout={App} component={loadAsync({ loader: () => import('./components/Employee/Table_Wage') })} />
                <AppRoute exact path="/employee/update/:id" layout={App} component={loadAsync({ loader: () => import('./components/Employee/UpdateWage') })} />
                <AppRoute exact path="/employee/history/:employee_id" layout={App} component={loadAsync({ loader: () => import('./components/Employee/HistoryWage') })} />

                <AppRoute path="/customer/create" layout={App} component={loadAsync({ loader: () => import('./components/Customer/CreateCustomer') })} />
                <AppRoute path="/customer/list" layout={App} component={loadAsync({ loader: () => import('./components/Customer/ListCustomer') })} />
                <AppRoute path="/customer/update/:id" layout={App} component={loadAsync({ loader: () => import('./components/Customer/UpdateCustomer') })} />

                < AppRoute exact path="/login" layout={MainLogin} component={loadAsync({ loader: () => import('./components/Login/Login') })} />

            </Switch>

        </BrowserRouter>
    )
}