import React from 'react';
import moment from 'moment';
import style from './dayComponent.css';

class DayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        //bind functions
        this.clickHandler = this.clickHandler.bind(this);
        this.dayStateHandler = this.dayStateHandler.bind(this);
        this.onHoverDuringResMode = this.onHoverDuringResMode.bind(this);
    }

    clickHandler(e) {
        if (this.props.resMakingMode) {
            this.props.endDateClicked(this.props.date);
        } else {
            this.props.dayClicked(this.props.date);
        }
    }

    onHoverDuringResMode(e) {
        this.props.onHoverDuringResMode(this.props.date);
    }

    //fn that chooses what kind of day to render, via css styling name
    dayStateHandler() {

        //When date is before current date, unavailable
        if (moment(this.props.date).isBefore(moment()) && this.props.exists) {
            return "date_taken";

        //when date is past the allowed 90 days, unavailable
        // } else if (moment(this.props.date).isAfter(moment().add(90, 'd')) && this.props.exists) {
        //     return "date_taken";

        //when reservation dates are finally selected
        } else if (this.props.exists && this.props.selectedDates.includes(this.props.date)) {
            return "starting_date";

        //when reservation mode is on and the first available date needs to show as starting date
        } else if (this.props.exists && this.props.dayAvailableToBook && this.props.resMakingMode && this.props.availableNights[0] === this.props.date) {
            return "starting_date";

        //when reservation mode is on and hovering over available dates
        } else if (this.props.exists && this.props.dayAvailableToBook && this.props.resMakingMode && this.props.inBetweenDates.includes(this.props.date)) {
            return "inbetween_dates";

        //when reservation mode is on and the first available nights that are under the min night stay needs to render as unavailable
        } else if (this.props.exists && this.props.dayAvailableToBook && this.props.resMakingMode && !this.props.availableNights.slice(this.props.minStay).includes(this.props.date)) {
            return "date_taken";

        //when defualt rendering of available dates 
        } else if (this.props.exists && this.props.dayAvailableToBook) {
            return "date_available";
        
        //when default rendering of dates already taken
        } else if (this.props.exists && !this.props.dayAvailableToBook) {
            return "date_taken";

        //placeholder boxes before first day of the month
        } else {
            return "doesnt_exist";
        }
    }

    render() {
        return (
            <div className="day_container">
                {this.dayStateHandler() === "starting_date" && this.props.date === this.props.availableNights[0] ? <div className="minNightPopup"><span>{this.props.minStay} night minimum stay</span></div> : undefined}
                <div className={this.dayStateHandler()} onClick={this.clickHandler} onMouseOver={this.onHoverDuringResMode}>
                    <div className="dayNumber">
                        {this.props.dayNumber}
                    </div>
                </div>
            </div>
        )
    }
}

export default DayComponent;