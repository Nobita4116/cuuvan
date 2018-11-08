import React, { Component, Fragment } from 'react';
import InputForm from '../Common/InputForm'
import { connect } from 'react-redux'

class SearchOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            isSearch: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.name != this.state.name
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

    handleChangeStatus = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onHandle = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    submitSearch = (e) => {
        e.preventDefault()
        let { name } = this.state
        let dataSearch = {
            name: name,
        }
        this.props.search(dataSearch)
        this.setState({
            isSearch: true
        })
    }

    resetSearch = () => {
        this.setState({
            name: '',
            isSearch: false
        })

        this.props.search("", "")
    }



    render() {
        let { users } = this.props
        return (
            <div className="row">
                <form onSubmit={this.submitSearch}>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <InputForm
                                placeholder="Nhập tên thợ"
                                name="name"
                                value={this.state.name}
                                changeInput={this.changeInput}
                            />
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary"><span className="icon-zoomin3"></span> Tìm kiếm</button>
                            {this.state.isSearch && (
                                <button className="btn btn-danger ml-3" onClick={this.resetSearch}><span className="icon-eraser2"></span> Reset</button>
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

export default connect(mapStateToProps)(SearchOrder);
