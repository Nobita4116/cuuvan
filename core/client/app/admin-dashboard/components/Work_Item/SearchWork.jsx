import React, { Component, Fragment } from 'react';
import InputForm from '../Common/InputFormL'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import BaseSelectServices from '../Common/BaseSelectServices'
import moment from 'moment'


class SearchWork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            services_id: '',
            isSearch: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.name != this.state.name
            || nextState.services_id != this.state.services_id
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

    submitSearch = (e) => {
        e.preventDefault()
        let { name, services_id } = this.state
        let dataSearch = {
            services_id,
            name: name
        }
        // if (retail) {

        // }
        this.props.search(dataSearch)
        this.setState({
            isSearch: true
        })
    }

    resetSearch = () => {
        let dataSearch = {
            services_id: '',
            name: ''
        }
        this.setState({
            ...dataSearch,
            isSearch: false
        })

        this.props.search(dataSearch)
    }

    render() {

        return (
            <div className="row">
                <form onSubmit={this.submitSearch}>
                    <div className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                        <div className="form-group">
                            <InputForm
                                placeholder="Nhập tên dịch vụ"
                                name="name"
                                changeInput={this.changeInput}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-2">
                        <div className="form-group">
                            <BaseSelectServices
                                name="services_id"
                                handleChange={this.changeInput}
                            />
                        </div>
                    </div>

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

export default SearchWork;