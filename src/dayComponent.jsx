import React from 'react';
import moment from 'moment';

class DayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        //bind functions
        this.onFirstClickHandler = this.onFirstClickHandler.bind(this);
        this.dayStateHandler = this.dayStateHandler.bind(this);
    }

    onFirstClickHandler(e) {
        console.log(e);
        this.props.dayClicked(this.props.date);
    }

    dayStateHandler() {
        if (moment(this.props.date).isBefore(moment()) && this.props.exists) {
            return "date_taken";
        } else if (moment(this.props.date).isAfter(moment().add(90, 'd')) && this.props.exists) {
            return "date_taken";
        } else if (this.props.exists && this.props.dayAvailableToBook) {
            return "date_available";
        } else if (this.props.exists && !this.props.dayAvailableToBook) {
            return "date_taken";
        } else {
            return "doesnt_exist";
        }
    }

    render() {
        return (
            <div className={this.dayStateHandler()} onClick={this.onFirstClickHandler}>
            <p>
                <font color='grey'>{this.props.dayNumber}</font>
            </p>
            </div>
        )
    }
}

export default DayComponent;