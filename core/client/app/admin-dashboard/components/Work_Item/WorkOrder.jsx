import React, { Component } from 'react';
import { makeRequest } from '../../../libs/request'
import SkyModal from '../../../common/Modal/SkyModal'
import Pagination from '../Common/Pagination'
import SearchOrder from './SearchOrder'
import RowOrder from './RowOrder'


class WorkOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allEmployee: [],
            listOrder: [],
            loading: true,
            limit: 10,
            page: 1,
            number_page: 0,
            total: 0,
        }
    }

    componentDidMount() {
        this.searchEmployee(1)
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


    clickPage = (page) => {
        let { name } = this.state
        this.setState(page, { name })
    }

    hideModal = () => {
        this.props.hideModal()
    }

    submitSearch = (dataSearch) => {
        this.setState({
            ...dataSearch
        })
        this.searchEmployee(1, dataSearch)
    }

    upDate = () => {
        this.props.hideModal();
    }

    renderEmployee = () => {
        let { allEmployee } = this.state
        return allEmployee.map((employee, idx) => {
            return <RowOrder employee={employee} employee_id={this.props.employee_id || 0} key={`employee-${employee.id}`} onCheck={this.props.onCheck} />
        })
    }


    render() {
        return (
            <SkyModal
                isShow={this.props.isShow}
                title='Chọn thợ'
                handleHide={this.props.hideModal}
                hasButtonCancel={true}
                hasButtonAction={true}
                onClickAction={this.upDate}
                textAction='Chấp nhận'
                size='lg'
            >
                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <SearchOrder
                                search={this.submitSearch}

                            />

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold">Tên thợ</th>
                                            <th className="fontBold noWrap">Số điện thoại</th>
                                            <th className="fontBold noWrap">Loại thợ</th>
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

            </SkyModal>
        );
    }
}

export default WorkOrder;