import React from 'react';
import moment from 'moment';

class DayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availability : this.props.availability
        };
    }

    render() {
        return (
            <div className={this.props.exists}>
            <p>
                <font color='grey'>{this.props.typeOfDay}</font>
            </p>
            </div>
        )
    }
}

export default DayComponent;