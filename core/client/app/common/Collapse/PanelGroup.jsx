import React, {Component} from 'react';

class PanelGroup extends Component {
    render() {
        let {title, description, idPanel} = this.props;
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h6 className="panel-title fontBold">
                        <a data-toggle="collapse" data-parent="#menu-accordion" href={'#' + idPanel} aria-expanded="false" className="collapsed">{title}</a>
                    </h6>
                </div>

                <div id={idPanel} className="panel-collapse collapse" aria-expanded="false" style={{height: "0px"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PanelGroup;