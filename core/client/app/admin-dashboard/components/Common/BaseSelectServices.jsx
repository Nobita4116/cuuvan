import React, { Component, PropTypes } from 'react';
import { makeRequest } from '../../../libs/request'

class BaseSelectServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            services_id: '',
        }
    }

    componentWillMount() {
        makeRequest('get', '/services/getAllServices')
            .then(result => {
                if (result.signal) {
                    let services = result.data
                    this.setState({
                        services
                    })
                }
            })
    }


    handleChangeServices = (e) => {
        let services_id = e.target.value
        this.setState({
            services_id
        })

        this.props.handleChange(this.props.name, services_id)
    }


    render() {
        let { services_id, services } = this.state
        let contentOpts = services.map((item, idx) => {
            return <option value={item.id} key={'opts-' + idx}>{item.name}</option>
        });
        return (
            <select name="services_id" className="form-control" value={services_id} onChange={this.handleChangeServices}>
                <option value="">Nhóm dịch vụ</option>
                {contentOpts}
            </select>
        )
    }
}

export default BaseSelectServices;