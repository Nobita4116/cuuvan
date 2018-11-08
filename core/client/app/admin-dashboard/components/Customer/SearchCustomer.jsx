import React, { Component, Fragment } from 'react';
import InputForm from '../Common/InputFormL'
import BaseSelectServices from '../Common/BaseSelectServices'



class SearchCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            services_id: '',
            isSearch: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.name != this.state.name
            || nextState.mobile != this.state.mobile
            || nextState.services_id != this.state.services_id
            || nextState.status != this.state.status
            || nextState.isSearch != this.state.isSearch
        ) {
            return true
        }

        return false
    }

    changeInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleChangeStatus = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitSearch = (e) => {
        e.preventDefault()
        let { retail } = this.props
        let { name, mobile, services_id, status } = this.state
        let dataSearch = {
            name: name,
            mobile: mobile,
        }
        if (retail) {
            dataSearch.services_id = services_id
            dataSearch.status = status
        }
        this.props.search(dataSearch)
        this.setState({
            isSearch: true
        })
    }

    resetSearch = () => {
        let { retail } = this.props
        let dataSearch = {
            name: '',
            mobile: ''
        }

        if (retail) {
            dataSearch.services_id = '', //? reset ko về mặc định
                dataSearch.status = ''
        }

        this.setState({
            ...dataSearch,
            isSearch: false
        })

        this.props.search(dataSearch)
    }

    render() {
        let { retail } = this.props
        return (
            <div className="row">
                <form onSubmit={this.submitSearch}>
                    <div className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                        <div className="form-group">
                            <InputForm
                                placeholder="Nhập tên khách hàng"
                                name="name"
                                changeInput={this.changeInput}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                        <div className="form-group">
                            <InputForm
                                placeholder="Nhập số điện thoại"
                                name="mobile"
                                changeInput={this.changeInput}
                            />
                        </div>
                    </div>

                    {retail && (

                        <Fragment>
                            <div className="col-xs-12 col-sm-6 col-md-2">
                                <div className="form-group">
                                    <BaseSelectServices
                                        name="services_id"
                                        handleChange={this.changeInput}
                                    />
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                                <div className="form-group">
                                    <select name="status" className="form-control" value={this.state.status} onChange={this.handleChangeStatus}>
                                        <option value="">Trạng thái yêu cầu</option>
                                        <option value="0">Chờ duyệt</option>
                                        <option value="1">Đã được duyệt</option>
                                        <option value="2">Khách hàng đồng ý</option>
                                        <option value="3">Đang thực hiện</option>
                                        <option value="4">Hoàn thành</option>
                                        <option value="5">Hủy yêu cầu</option>
                                    </select>
                                </div>
                            </div>
                        </Fragment>

                    )}


                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary"><span className="icon-zoomin3"></span> Tìm kiếm</button>
                            {this.state.isSearch && (
                                <button className="btn btn-danger ml-5" onClick={this.resetSearch}><span className="icon-eraser2"></span> Bỏ lọc</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchCustomer;