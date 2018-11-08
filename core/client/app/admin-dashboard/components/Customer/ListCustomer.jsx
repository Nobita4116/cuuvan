import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import RowCustomer from './RowCustomer'
import { makeRequest } from '../../../libs/request'
import Pagination from '../Common/Pagination';
import SearchCustomer from '../Customer/SearchCustomer'


class ListCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: [],
            loading: true,
            limit: 10,
            page: 1,
            number_page: 0,
            total: 0,
        }
    }

    componentDidMount() {
        this.getAllCustomer(1)
    }

    getAllCustomer = (page, dataSearch = {}) => {
        let { limit } = this.state
        dataSearch = Object.assign(dataSearch, { limit, page })
        makeRequest('get', '/customer/getAllCustomer', dataSearch)
            .then(result => {
                if (result.signal) {
                    let { customer, total, number_page } = result.data
                    this.setState({
                        customer,
                        number_page,
                        total,
                        page
                    })
                }
            })
    }


    clickPage = (page) => {
        let { name, mobile } = this.state
        this.getAllCustomer(page, { name, mobile })
    }

    submitSearch = (dataSearch) => {
        this.setState({
            ...dataSearch
        })
        this.getAllCustomer(1, dataSearch)
    }


    onRemove = (id) => {
        makeRequest('post', '/customer/removeCustomer', { id })
            .then(result => {
                if (result.signal) {
                    let customer = this.state.customer.filter(item => item.id != result.data.id)
                    this.setState({
                        customer,
                        isShowModal: false
                    })
                }
            })
    }

    render() {
        let { customer } = this.state;
        let elements = customer.map((item, index) => {
            return <RowCustomer
                customer={item}
                key={index}
                index={index}
                onRemove={this.onRemove}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Khách hàng"
                    breadcrumb={[
                        { title: 'Danh sách khách hàng', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <SearchCustomer
                                search={this.submitSearch}
                                retail = {false}
                            />

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold noWrap col-md-3">Tên khách hàng</th>
                                            <th className="fontBold col-md-3">Số điện thoại</th>
                                            <th className="fontBold col-md-4">Địa chỉ</th>
                                            <th className="fontBold col-md-2" style={{ textAlign: "center" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elements}
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-footer">
                                <div className="pull-right">
                                    <Pagination page={this.state.page} number_page={this.state.number_page} clickPage={this.clickPage.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListCustomer;