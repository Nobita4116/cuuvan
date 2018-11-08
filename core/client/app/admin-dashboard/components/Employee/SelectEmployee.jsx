import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Select from '../../../common/Select/Select'
import { makeRequest } from '../../../libs/request'

class SelectEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allType: [],
            type: this.props.value || ''
        }
    }

    componentWillMount() {
        makeRequest('get', '/employee/getEmployeeType')
            .then(result => {
                if (result.signal) {
                    let allType = result.data
                    let type = ''
                    if (this.state.type == '') {
                        type = allType.length ? allType[0].id : ''
                    } else {
                        type = this.state.type
                    }

                    this.setState({
                        allType,
                        type
                    })

                    if (type || allType) {
                        this.props.handleChange(type)
                    }
                }
            })
    }


    handleChangeType = (e) => {
        this.setState({
            type: e.target.value
        })
        this.props.handleChange(e.target.value)
    }


    render() {
        let { allType, type } = this.state
        let contentOpts = allType.map((item, idx) => {
            return <option value={item.id} key={'opts-' + idx}>{item.name}</option>
        });

        return (
            <div className="form-group">
                <label className="control-label fontBold">Loại thợ</label>
                <div className="input-group">
                    <div className="input-group-addon">
                        <i className="icon-tree5"></i>
                    </div>
                    <select name="select" className="form-control" value={type} onChange={this.handleChangeType}>
                        {contentOpts}
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectEmployee;