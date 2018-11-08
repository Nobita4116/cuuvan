import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import Button from '../../common/Button/Button';

class SkyModalBorder extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {title, isShow, handleHide, headerStyle, size, hasButtonCancel, hasButtonAction, onClickAction, textAction} = this.props;
        size = size || 'large';
        isShow = isShow || false;
        textAction = textAction || 'OK';
        hasButtonCancel = hasButtonCancel || false;
        hasButtonAction = hasButtonAction || false;
        let customDialog = (size == 'full') ? 'full-modal' : '';
        size = (size != 'full') ? size : 'large';
        
        let classHeader = headerStyle ? 'modal-header bg-' + headerStyle : 'modal-header';
        return(
            <Modal
                show={isShow}
                onHide={handleHide}
                bsSize={size}
                dialogClassName={customDialog}
            >
                <Modal.Header 
                    closeButton
                    bsClass={classHeader} 
                >
                    <Modal.Title >{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                </Modal.Body>

                {(hasButtonCancel || hasButtonAction) ? (
                    <Modal.Footer>
                        {hasButtonCancel ? (
                            <Button onClick={handleHide}>Close</Button>
                        ) : ''}
                        {hasButtonAction ? (
                            <Button onClick={onClickAction} style='primary'>{textAction}</Button>
                        ) : ''}

                    </Modal.Footer>
                ) : ''}

            </Modal>
        );
    }
}

SkyModalBorder.propTypes = {
    title: PropTypes.string,
    isShow: PropTypes.bool,
    handleHide: PropTypes.func.isRequired,
    headerStyle: PropTypes.string,
    size: PropTypes.string,
    hasButtonAction: PropTypes.bool,
    hasButtonCancel: PropTypes.bool,
    onClickAction: PropTypes.func,
    textAction: PropTypes.string
};

export default SkyModalBorder;