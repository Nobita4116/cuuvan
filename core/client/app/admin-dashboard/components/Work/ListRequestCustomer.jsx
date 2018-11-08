import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import RowRequest from './RowRequest'
import { makeRequest } from '../../../libs/request'
import Pagination from '../Common/Pagination';
import SearchCustomer from '../Customer/SearchCustomer'


class ListRequestCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request: [],
            loading: true,
            limit: 20,
            page: 1,
            number_page: 0,
            total: 0,
            services_id: '',
            services: [],
            status: '',
        }
    }

    componentDidMount() {
        this.getAllRequest(1)
        this.getAllServices()
    }

    getAllRequest = (page, dataSearch = {}) => {
        let { limit } = this.state
        dataSearch = Object.assign(dataSearch, { limit, page })
        makeRequest('get', '/customer/getAllRequest', dataSearch)
            .then(result => {
                if (result.signal) {
                    let { request, total, number_page } = result.data
                    this.setState({
                        request,
                        number_page,
                        total,
                        page
                    })
                }
            })
    }

    getAllServices() {
        makeRequest('get', '/services/getAllServices', {})
            .then(result => {
                if (result.signal) {
                    this.setState({
                        services: result.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderServices = () => {
        let { services } = this.state;
        return services.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    clickPage = (page) => {
        let { name, mobile, services_id, status } = this.state
        this.getAllRequest(page, { name, mobile, services_id, status })
    }

    submitSearch = (dataSearch) => {
        this.setState({
            ...dataSearch
        })
        this.getAllRequest(1, dataSearch)
    }


    onRemove = (id) => {
        makeRequest('post', '/customer/removeRequest', { id })
            .then(result => {
                if (result.signal) {
                    let request = this.state.request.filter(item => item.id != result.data.id)
                    this.setState({
                        request,
                        isShowModal: false
                    })
                }
            })
    }

    render() {
        let { request, services } = this.state;
        let elements = request.map((item, index) => {
            return <RowRequest
                request={item}
                key={index}
                index={index}
                onRemove={this.onRemove}
                services={services}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Khách hàng"
                    breadcrumb={[
                        { title: 'Danh sách yêu cầu', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <SearchCustomer
                                search={this.submitSearch}
                                retail = {true}
                            />

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold noWrap col-md-2">Tên khách hàng</th>
                                            <th className="fontBold col-md-2">Số điện thoại</th>
                                            <th className="fontBold col-md-2">Nhóm dịch vụ</th>
                                            <th className="fontBold col-md-2">Ngày thực hiện</th>
                                            <th className="fontBold col-md-2">Trạng Thái</th>
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

export default ListRequestCustomer;