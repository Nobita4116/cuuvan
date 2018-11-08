import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import moment from 'moment'

class DateInput extends Component {
    constructor(props) {
        super(props)
        let timeInput = props.timeInput
        let isValid = !timeInput ? false : moment(timeInput, "DD/MM/YYYY").isValid()
        let timeSelect = isValid ? moment(timeInput, 'DD/MM/YYYY') : moment()
        this.state = {
            timeSelect
        }
    }

    handleChangeDate(date) {
        let { name } = this.props
        this.setState({ timeSelect: date })
        this.props.changeDate(date, name)
    }

    render() {
        return (
            <DatePicker
                dateFormat="DD/MM/YYYY"
                selected={this.state.timeSelect}
                onChange={this.handleChangeDate.bind(this)}
                className="form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
        );
    }
}

export default DateInput;