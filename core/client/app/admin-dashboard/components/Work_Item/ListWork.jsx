import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import RowWork from './RowWork'
import { makeRequest } from '../../../libs/request'
import Pagination from '../Common/Pagination';
import SearchWork from '../Work_Item/SearchWork'


class ListWork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            work: [],
            loading: true,
            limit: 20,
            page: 1,
            number_page: 0,
            total: 0,
            services_id: '',
            services: [],
        }
    }

    componentDidMount() {
        this.getAllWork(1);
        this.getAllServices()
    }

    clickPage = (page) => {
        let { name, services_id } = this.state
        this.getAllWork(page, { name, services_id })
    }

    submitSearch = (dataSearch) => {
        this.setState({
            ...dataSearch
        })
        this.getAllWork(1, dataSearch)
    }

    getAllWork = (page, dataSearch = {}) => {
        let { limit } = this.state
        dataSearch = Object.assign(dataSearch, { limit, page })
        makeRequest('get', '/work/getAllWork', dataSearch)
            .then(result => {
                if (result.signal) {
                    let { work, total, number_page } = result.data
                    this.setState({
                        work,
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

    onRemove = (id) => {
        makeRequest('post', '/work/removeWork', { id })
            .then(result => {
                if (result.signal) {
                    let work = this.state.work.filter(item => item.id != result.data.id)
                    this.setState({
                        work,
                        isShowModal: false
                    })
                }
            })
    }

    render() {
        let { work, services } = this.state;
        let elements = work.map((item, index) => {
            return <RowWork
                work={item}
                key={index}
                index={index}
                onRemove={this.onRemove}
                services={services}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Hạng mục công việc"
                    breadcrumb={[
                        { title: 'Danh sách hạng mục', link: '' }
                    ]}
                />
                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <SearchWork
                                search={this.submitSearch}
                            />

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold col-md-2">Tên dịch vụ</th>
                                            <th className="fontBold col-md-2">Mô tả</th>
                                            <th className="fontBold noWrap col-md-2">Số lượng</th>
                                            <th className="fontBold noWrap col-md-2">Đơn vị tính</th>
                                            <th className="fontBold noWrap col-md-2">Nhóm dịch vụ</th>
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

export default ListWork;