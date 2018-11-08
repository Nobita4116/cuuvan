import React, { Component } from 'react';
import { makeRequest } from '../../../libs/request'
import OneRequest from '../Drashboard/OneRequest'
import CustomerReview from '../Common/CustomerReview'


class Drashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            progress: [],
            work_item: [],
            employee: [],
            isShow: false
        }
    }

    componentDidMount() {
        let id = this.props.match.params;
        if (id) {
            this.getEmployeeById(id)
        }
        this.getProgress(),
            this.getWorkItem(),
            this.getEmployeeById()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id != this.props.match.params.id) {
            this.getEmployeeById(nextProps.match.params.id)
        }
    }

    getProgress = () => {
        makeRequest('get', '/employee/getProgress')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        progress: result.data.listProgress
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    getEmployeeById = () => {
        makeRequest('get', '/employee/searchEmployee', {})
            .then(result => {
                if (result.signal) {
                    this.setState({
                        employee: result.data.listEmployee
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    getWorkItem = () => {
        makeRequest('get', '/work/getAllWork', {})
            .then(result => {
                if (result.signal) {
                    this.setState({
                        work_item: result.data.work
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        let { progress, employee, work_item } = this.state;
        let elements = progress.map((item, index) => {
            return <OneRequest
                progress={item}
                key={index}
                index={index}
                employee={employee}
                work_item={work_item}
            />

        })
        return (
            <div>

                <div className="content">
                    <div className="panel panel-white" style={{ width: '40%' }}>
                        <div className="panel-body border-top-teal">
                            <p className="fontBold font16 center">Thông tin công việc</p>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold noWrap col-md-2">Tên Công Việc</th>
                                            <th className="fontBold col-md-2">Tên thợ</th>
                                            <th className="fontBold col-md-2">Tiến độ</th>
                                            <th className="fontBold col-md-2">Phản hồi của khách hàng</th>
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
        )
    }
}

export default Drashboard;