import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import Pagination from '../Common/Pagination'
import SearchEmployee from './SearchEmployee'
import OneEmployee from './OneEmployee';

class ListEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allEmployee: [],
            listEmployee_type: [],
            loading: true,
            limit: 20,
            page: 1,
            number_page: 0,
            total: 0,
            type: '',
            services_id: '',
            services: [],
            retail : false
        }
    }

    componentDidMount() {
        this.searchEmployee(1),
            this.getEmployee(),
            this.getAllServices()
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


    searchEmployee = (page, dataSearch = {}) => {
        let { limit } = this.state
        dataSearch = Object.assign(dataSearch, { limit, page })
        makeRequest('get', '/employee/searchEmployee', dataSearch)
            .then(result => {
                if (result.signal) {
                    let { listEmployee, total, number_page } = result.data
                    this.setState({
                        allEmployee: listEmployee,
                        number_page,
                        total,
                        page
                    })
                }
            })
    }

    handleDelete = (id) => {
        let allEmployee = this.state.allEmployee.filter(item => item.id != id)
        this.setState({
            allEmployee
        })
    }

    renderEmployee = () => {
        let { allEmployee, services } = this.state
        return allEmployee.map((employee, idx) => {
            return <OneEmployee employee={employee} key={`employee-${employee.id}`} services={services} handleDelete={this.handleDelete} />
        })
    }

    render() {
        let { listEmployee_type , retail} = this.state
        return (
            <div>
                <PageHeader
                    title="Danh sách thợ"
                    breadcrumb={[
                        { title: 'Danh sách thợ', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <SearchEmployee
                                search={this.submitSearch}
                                listEmployee_type={listEmployee_type}
                                retail = {false}
                            />

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold">Tên thợ</th>
                                            <th className="fontBold noWrap">Số điện thoại</th>
                                            <th className="fontBold">Ngày sinh</th>
                                            <th className="fontBold noWrap">Địa chỉ</th>
                                            <th className="fontBold">Nhóm dịch vụ</th>
                                            <th className="fontBold noWrap">Loại thợ</th>
                                            <th className="fontBold noWrap">Trạng thái</th>
                                            <th className="fontBold noWrap text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderEmployee()}
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

export default ListEmployee;