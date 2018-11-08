import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class Select extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title, value, data, onChange} = this.props;
        if (title) {
            data = _.concat([{value: '', label: title}], data);
        }

        let contentOpts = data.map((item, idx) => {
            return <option value={item.value} key={'opts-'+idx}>{item.label}</option>
        });

        return (
            <select name="select" className="form-control" value={value} onChange={onChange}>
                {contentOpts}
            </select>
        );
    }
}

export default Select;