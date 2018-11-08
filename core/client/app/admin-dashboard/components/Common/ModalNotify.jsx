import React, { Component } from 'react';

class ModalNotify extends Component {
    render() {
        let {notify, idStr} = this.props
        idStr = idStr || "modal_notify_info"
        return (
            <div id={idStr} className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h6 className="modal-title">Thông báo</h6>
                        </div>

                        <div className="modal-body">
                            <h5 className="fontBold text-modal-black">{notify.title}</h5>
                            <p className="text-modal-black">{notify.content}</p>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link text-modal-black" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalNotify;