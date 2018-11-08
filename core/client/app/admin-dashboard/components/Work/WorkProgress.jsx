import React, { Component, Fragment } from 'react';
import InputGroup from '../Common/InputGroupV2'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'
import CustomerReview from '../Common/CustomerReview'


class WorkProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            work_item_id: '',
            employee_id: '',
            description: '',
            employee_progress: '',
            customer_review_id: '',
            customer_request: [],
            progress: [],
            work_item: [],
            employee: [],
            isLoading: false,
            status: 5,
            request_customer_id: parseInt(props.match.params.id),
        }
    }

    componentWillMount() {
        this.getProgressByRequestId(),
            this.getProgress(),
            this.getWorkItem(),
            this.getEmployee()
    }

    getProgressByRequestId() {
        let { id } = this.props.match.params; //api lấy thông tin từ id
        makeRequest('get', '/customer/getProgressByRequestId', { request_customer_id: id })
            .then(result => {
                if (result.signal) {
                    this.setState({
                        customer_request: result.data
                    })

                } else {
                    this.props.history.push('/customer/request/list')
                }
            }).catch(err => console.log(err))
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

    getEmployee = () => {
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

    renderEmployee = () => {
        let { employee } = this.state;
        return employee.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    renderWorkItem = () => {
        let { work_item } = this.state;
        return work_item.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    renderItem = () => {
        let { customer_request } = this.state
        let result = customer_request.map((item, idx) => {
            let { status } = this.state;
            return (

                <div className="panel panel-flat col-md-4" style={{ marginRight: 20 }} key={idx}>
                    <div className="panel-body">
                        <form className="form-horizontal" >
                            <fieldset className="content-group">
                                <div className="form-group">

                                    <div className="form-group">
                                        <label className="control-label fontBold">Tên công việc: <span className="text-danger">*</span></label>

                                        <select name="work" className="form-control" value={item.work_item_id} disabled>
                                            {this.renderWorkItem()}
                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label className="control-label fontBold">Tên thợ: <span className="text-danger">*</span></label>

                                        <select name="employee" className="form-control" value={item.employee_id} disabled>
                                            {this.renderEmployee()}
                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label className="control-label fontBold">Tiến độ: <span className="text-danger">*</span></label>

                                        <InputGroup
                                            type="text"
                                            name="progress"
                                            value={`${item.employee_progress}%`}
                                            icon="icon-hour-glass"
                                            changeInput={this.handleInput}
                                            required
                                            status={status}
                                        />

                                    </div>

                                    <div className="form-group">
                                        <label className="control-label fontBold">Ghi chú: <span className="text-danger">*</span></label>

                                        <InputGroup
                                            type="text"
                                            name="description"
                                            value={item.description}
                                            icon="icon-bubble-lines4"
                                            changeInput={this.handleInput}
                                            required
                                            status={status}
                                        />

                                    </div>

                                    <div className="form-group">
                                        <label className="control-label fontBold">Phản hồi của khách hàng:
                                        <div className="col-md-2"></div>
                                        </label>

                                        <CustomerReview
                                            review={item.customer_review_id}
                                        />

                                    </div>

                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>

            )
        })
        return result
    }
    render() {

        return (
            <div>
                <Fragment>
                    <PageHeader
                        title="Tiến độ công việc"
                        breadcrumb={[
                            { title: 'Danh sách yêu cầu', link: '/customer/request/list' },
                            { title: 'Tiến độ', link: '' }
                        ]}
                    />

                    <div className="content">

                        {this.renderItem()}

                    </div>

                    <div className="panel-body col-md-1">
                        <Link to={`/work/request/list/`} className="btn btn-danger col-md-12" style={{ width: 'auto' }}><i className=" icon-rotate-ccw2 position-left"></i>Quay lại</Link>
                    </div>

                </Fragment>
            </div>

        );
    }
}

export default WorkProgress;
