import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import RowServices from './RowServices'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'


class ListServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            data: {},
            loading: true,
            isShowModal: false,
            text: '',
        }
    }

    componentDidMount() {
        this.getAllServices()
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

    onRemove = (id) => {
        makeRequest('post', '/services/removeServices', { id })
            .then(result => {
                if (result.signal) {
                    let services = this.state.services.filter(item => item.id != result.data.id)
                    this.setState({
                        services,
                        isShowModal: false
                    })
                }
            })
    }

    render() {
        let { services, text } = this.state;
        let elements = services.map((item, index) => {
            return <RowServices
                services={item}
                key={index}
                index={index}
                onUpdate={this.onUpdate}
                onRemove={this.onRemove}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Dịch vụ"
                    breadcrumb={[
                        { title: 'Danh sách dịch vụ', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold noWrap col-md-3">Hình ảnh</th>
                                            <th className="fontBold col-md-3">Tên dịch vụ</th>
                                            <th className="fontBold col-md-4">Mô tả</th>
                                            <th className="fontBold col-md-2" style={{ textAlign: "center" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elements}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListServices;