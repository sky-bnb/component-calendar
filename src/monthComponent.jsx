import React from 'react';
import moment from 'moment';
import DayComponent from './dayComponent.jsx';
import './monthComponent.css';

class MonthComponent extends React.Component {
    constructor(props) {
        super(props);

        //bind functions
        this.resMaker = this.resMaker.bind(this);
        this.onHoverDuringResMode = this.onHoverDuringResMode.bind(this);
        this.endDateClicked = this.endDateClicked.bind(this);
    }

    resMaker(childState) {
        //check if this is an open res
        let availableNights = this.props.availability;
        if (availableNights.includes(childState)) {
            let currentDate = childState;
            const datesToRender = [];
            let maxDate = moment().add(900, 'd').format("YYYY-MM-DD");
            while(availableNights.includes(currentDate) && moment(currentDate, "YYYY-MM-DD").isBefore(maxDate, "YYYY-MM-DD")) {
                datesToRender.push(currentDate);
                currentDate = moment(currentDate, "YYYY-MM-DD").add(1, 'd').format("YYYY-MM-DD");
            }
            this.props.resMaker(datesToRender);
        }
    }

    onHoverDuringResMode(date) {
        this.props.onHoverDuringResMode(date);
    }

    endDateClicked(date) {
        this.props.endDateClicked(date);
    }

    render() {
        return (
            <div className="month">

                {/* FOR MONTH HEADER WITH YEAR */}
                <div className="month_title">
                    <p> {this.props.monthToRender} </p>
                </div>

                {/* FOR WEEKDAY NAMES ROW */}
                <div className="weekdays">
                    <div className="weekday"> Su </div>
                    <div className="weekday"> Mo </div>
                    <div className="weekday"> Tu </div>
                    <div className="weekday"> We </div>
                    <div className="weekday"> Th </div>
                    <div className="weekday"> Fr </div>
                    <div className="weekday"> Sa </div>
                </div>

                {/* FOR ALL DAYS OF THIS MONTH*/}
                <div className="days">
                    {/* TODO: ADD MIN NIGHT POPUP */}
                    {this.props.daysInThisMonth.map((thisDay, i) => {
                        return <DayComponent 
                            key={i} 
                            date={thisDay}
                            resMakingMode={this.props.resMakingMode}
                            exists={thisDay !== null ? true : false } 
                            dayNumber={thisDay === null ? '' : moment(thisDay, "YYYY-MM-DD").format('D')} 
                            dayAvailableToBook={this.props.availability.includes(thisDay) ? true : false}
                            dayClicked={this.resMaker}
                            minStay={this.props.minStay}
                            availableNights={this.props.availability}
                            onHoverDuringResMode={this.onHoverDuringResMode}
                            inBetweenDates={this.props.inBetweenDates}
                            endDateClicked={this.endDateClicked}
                            selectedDates = {this.props.selectedDates}
                        />
                    })}
                </div>

            </div>
        )
    }
}

export default MonthComponent;