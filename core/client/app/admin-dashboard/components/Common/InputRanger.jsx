import React, { Component } from 'react';
import {DATE_RANGER} from '../../data/config'

class InputRanger extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: props.start || '',
            end: props.end || ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nb_clear != this.props.nb_clear) {
            this.setState({
                start: '',
                end: ''
            })
        }
    }

    componentDidMount() {
        var moment = window.moment;
        let self = this
        let {idName} = this.props
        idName = idName || 'chart-ranger'
        $('#' + idName).daterangepicker({
            "ranges": DATE_RANGER,
            "maxSpan": {
                "days": 100
            },
	        startDate: moment().subtract(9, 'days'),
            endDate: moment(),
            maxDate: new Date(),
	        locale: {
	            format: 'DD/MM/YYYY',
            },
            autoApply: true,
	        alwaysShowCalendars: false
	    }, function(start, end, label) {
            self.changeRanger(start, end)
    	})
    }

    changeRanger = (start, end) => {
        this.setState({
            start: start.format('DD/MM/YYYY'),
            end: end.format('DD/MM/YYYY')
        })

        this.props.handleInput(start, end)
    }

    render() {
        let {start, end} = this.state
        let {idName} = this.props
        idName = idName || 'chart-ranger'
        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <input type="text" className="form-control" id={idName} value={start && end ? `${start} - ${end}` : ''} placeholder="Chọn khoảng thời gian" readOnly/>
                </div>
            </div>
        );
    }
}

export default InputRanger;