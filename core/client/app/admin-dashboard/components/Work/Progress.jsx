import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import Pagination from '../Common/Pagination'
import OneProgress from './OneProgress';

class Progress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            limit: 20,
            page: 1,
            number_page: 0,
            total: 0,
            listWork: [],
            work_item_id: '',
            listEmployee: [],
            request_customer: '',
            listRequest: [],
            listProgress: [],
        }
    }

    componentDidMount() {
        this.searchProgress(1),
            this.getEmployee(),
            this.getRequestCustomer(),
            this.getWorkItem()
    }

    clickPage = (page) => {
        let { name, service_group, type } = this.state
        this.setState(page, { name, service_group, type })
    }

    submitSearch = (dataSearch) => {
        this.setState({
            ...dataSearch
        })
        this.searchEmployee(1, dataSearch)
    }

    getEmployee() {
        makeRequest('get', '/employee/searchEmployee')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listEmployee: result.data.listEmployee
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    getWorkItem() {
        makeRequest('get', '/work/getAllWork')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listWork: result.data.work
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    getRequestCustomer() {
        makeRequest('get', '/customer/getAllRequest')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listRequest: result.data.request
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    searchProgress = (page, dataSearch = {}) => {
        let { limit } = this.state
        dataSearch = Object.assign(dataSearch, { limit, page })
        makeRequest('get', '/employee/getProgress', dataSearch)
            .then(result => {
                if (result.signal) {
                    let { listProgress, total, number_page } = result.data
                    this.setState({
                        listProgress,
                        number_page,
                        total,
                        page
                    })
                }
            })
    }


    renderProgress = () => {
        let { listProgress, listRequest, listWork, listEmployee } = this.state
        return listProgress.map((progress, idx) => {
            return <OneProgress progress={progress} key={`progress-${progress.id}`} request={listRequest} work={listWork} employee={listEmployee} handleDelete={this.handleDelete} />
        })
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="Tiến độ công việc của thợ"
                    breadcrumb={[
                        { title: 'Quản lý thợ', link: '' }
                    ]}
                />

                <div className="content ">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold noWrap">Tên công việc</th>
                                            <th className="fontBold noWrap">Ảnh công việc</th>
                                            <th className="fontBold">Ngày bắt đầu</th>
                                            <th className="fontBold">Tên thợ</th>
                                            <th className="fontBold">Tiến độ công việc</th>
                                            <th className="fontBold noWrap">Ghi chú</th>
                                            <th className="fontBold noWrap">Đánh giá của khách hàng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderProgress()}
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

export default Progress;