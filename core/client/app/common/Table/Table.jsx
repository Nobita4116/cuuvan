import React, {Component} from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="table-responsive">
                <table className="table table-bordered">
                    {this.props.children}
                </table>
            </div>
        );
    }
}

export default Table;