import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import Pagination from '../Common/Pagination'
import SearchEmployee from './SearchEmployee'
import OneWage from './OneWage';

class ListWage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listWage: [],
            listEmployee: [],
            listEmployee_type: [],
            loading: true,
            limit: 20,
            page: 1,
            number_page: 0,
            total: 0,
            type: '',
            retail: true
        }
    }

    componentDidMount() {
        this.getAllWage(1),
            this.getEmployeeType(),
            this.getAllEmployee()
    }

    clickPage = (page) => {
        let { name, type } = this.state
        this.setState(page, { name, type })
    }

    submitSearch = (dataSearch) => {
        this.setState({
            ...dataSearch
        })
        this.getAllWage(1, dataSearch)
    }

    getEmployeeType() {
        makeRequest('get', '/employee/getEmployeeType')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listEmployee_type: result.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    getAllEmployee() {
        makeRequest('get', '/employee/searchEmployee')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listEmployee: result.data.listEmployee
                    })
                }
            })
    }

    getAllWage = (page, dataSearch = {}) => {
        let { limit } = this.state
        dataSearch = Object.assign(dataSearch, { limit, page })
        makeRequest('get', '/employee/getAllWage', dataSearch)
            .then(result => {
                if (result.signal) {
                    let { listWage, total, number_page } = result.data
                    this.setState({
                        listWage: listWage,
                        number_page,
                        total,
                        page
                    })
                }
            })
    }

    handleDelete = (id) => {
        let listWage = this.state.listWage.filter(item => item.id != id)
        this.setState({
            listWage
        })
    }

    renderWage = () => {
        let { listWage, listEmployee } = this.state
        return listWage.map((wage, idx) => {
            return <OneWage wage={wage} key={`wage-${wage.id}`} employee={listEmployee} handleDelete={this.handleDelete} />
        })
    }

    render() {
        let { listEmployee_type, retail } = this.state
        return (
            <div>
                <PageHeader
                    title="Quản lý thợ"
                    breadcrumb={[
                        { title: 'Bảng lương', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <SearchEmployee
                                search={this.submitSearch}
                                listEmployee_type={listEmployee_type}
                                retail={true}
                            />

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold">Tên thợ</th>
                                            <th className="fontBold noWrap">Loại thợ</th>
                                            <th className="fontBold noWrap">Mức lương</th>
                                            <th className="fontBold noWrap">Ngày thực thi</th>
                                            <th className="fontBold noWrap text-center col-md-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderWage()}
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

export default ListWage;