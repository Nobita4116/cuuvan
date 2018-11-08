import React, {Component} from 'react';

class InputValidation extends Component {
    render() {
        let {value, inputType, type, fieldName, placeholder, onChange, icon_text, helper} = this.props;
        inputType = inputType || 'text';
        type = type || 'normal';
        placeholder = placeholder || '';
        icon_text = icon_text || '';
        helper = helper || '';

        if (type == 'modal') {
            return(
                <div className={value.error ? 'form-group has-error' : 'form-group'}>
                    <label className="control-label col-sm-3">{fieldName}</label>
                    <div className="col-sm-9">
                        <input 
                            type={inputType}
                            className='form-control'
                            placeholder={placeholder}
                            value = {value.data}
                            onChange={onChange}
                        />
                        {value.error ? (
                            <span className="help-block">{value.error}</span>
                        ) : ''}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={value.error ? 'form-group has-error' : 'form-group'}>
                    <p className="fontBold">{fieldName}</p>
                        <div className="input-group">
                        <span className="input-group-addon"><span className={icon_text}></span></span>
                        <input
                            type={inputType}
                            className='form-control'
                            placeholder={placeholder}
                            value = {value.data}
                            onChange = {onChange}
                            />
                            
                        </div>
                        {value.error ? (
                            <span className="help-block">{value.error}</span>
                        ) : ''}

                        {helper ? (
                            <span className="help-block help-description">{helper}</span>
                        ) : ''}
                </div>
            );
        }
    }
}

export default InputValidation;