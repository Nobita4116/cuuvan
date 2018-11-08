import React, { Component } from 'react';
import InputForm from '../Common/InputForm'
import { connect } from 'react-redux'
import BaseSelectServices from '../Common/BaseSelectServices'
import BaseSelectEmployee from '../Common/BaseSelectEmployee'

class SearchEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            name: '',
            services_id: '',
            employee_id: '',
            listEmployee_type: [],
            isSearch: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.name != this.state.name
            || nextState.services_id != this.state.services_id
            || nextState.employee_id != this.state.employee_id
            || nextState.type != this.state.type
            || nextProps.listEmployee_type != this.props.listEmployee_type
            || nextState.isSearch != this.state.isSearch) {
            return true
        }

        return false
    }

    changeInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    resetSearch = () => {
        this.setState({
            name: '',
            services_id: '',
            type: '',
            employee_id: '',
            isSearch: false
        })

        this.props.search("", "")
    }

    onHandle = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    renderType_Employee = () => {
        let { listEmployee_type } = this.props
        return listEmployee_type.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    submitSearch = (e) => {
        e.preventDefault()
        let { name, services_id, type, employee_id } = this.state
        this.props.search({ name, services_id, type, employee_id })
        this.setState({
            isSearch: true
        })
    }



    render() {
        let { users, retail } = this.props
        return (
            <div className="row">
                <form onSubmit={this.submitSearch}>

                    {(retail == false) && (
                        <div>
                            <div className="col-xs-12 col-sm-6 col-md-2">
                                <div className="form-group">
                                    <InputForm
                                        placeholder="Nhập tên thợ"
                                        name="name"
                                        value={this.state.name}
                                        changeInput={this.changeInput}
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-2">
                                <div className="form-group">
                                    <BaseSelectServices
                                        name="services_id"
                                        handleChange={this.changeInput}
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                    {(retail == true) && (
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <div className="form-group">
                                <BaseSelectEmployee
                                    name="employee_id"
                                    handleChange={this.changeInput}
                                />
                            </div>
                        </div>
                    )}


                    <div className="col-xs-12 col-sm-6 col-md-2">
                        <select onChange={this.onHandle} className="form-control" value={this.state.type} name="type">
                            <option value="">Tất cả loại thợ</option>
                            {this.renderType_Employee()}
                        </select>
                    </div>



                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary"><span className="icon-zoomin3"></span> Tìm kiếm</button>
                            {this.state.isSearch && (
                                <button className="btn btn-danger ml-5" onClick={this.resetSearch}><span className="icon-eraser2"></span> Reset</button>
                            )}

                        </div>
                    </div>
                </form>
            </div>
        );
    }



}

function mapStateToProps(state) {
    let { users } = state
    return {
        users: users.profile
    }
}

export default connect(mapStateToProps)(SearchEmployee);
