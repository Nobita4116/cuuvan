import React, {Component} from 'react';

export default class Loading extends Component {
    render(){
        return(
            <div className="loading-mask">
                <div className="tableS">
                    <div className="tableCellS">
                        <img src="/images/triple-gears-loading.svg" style={{width: "70px"}}/>
                    </div>
                </div>
            </div>
        )
    }
}