import React from 'react';
import DayComponent from './dayComponent.jsx';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MonthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.resMaker = this.resMaker.bind(this);
    }

    resMaker(childState) {
        //check if this is an open res
        console.log(childState);
        let availableNights = this.props.availability;
        if (availableNights.includes(childState)) {
            let currentDate = childState;
            const datesToRender = [];
            let maxDate = moment().add(90, 'd').format("YYYY-MM-DD");
            while(availableNights.includes(currentDate) && moment(currentDate, "YYYY-MM-DD").isBefore(maxDate, "YYYY-MM-DD")) {
                console.log(availableNights, currentDate);
                
                datesToRender.push(currentDate);
                currentDate = moment(currentDate, "YYYY-MM-DD").add(1, 'd').format("YYYY-MM-DD");
            }
            console.log(datesToRender);
            this.props.resMaker(datesToRender);
        }
    }

    render() {
        return (

            <div className="month">

                {/* FOR MONTH HEADER WITH YEAR */}
                <div className="month_title">
                    <p> {this.props.monthToRender} </p>
                </div>

                {/* FOR WEEKDAY ROW */}
                <div className="weekdays">
                    <div className="weekday"> Su </div>
                    <div className="weekday"> Mo </div>
                    <div className="weekday"> Tu </div>
                    <div className="weekday"> We </div>
                    <div className="weekday"> Th </div>
                    <div className="weekday"> Fr </div>
                    <div className="weekday"> Sa </div>
                </div>

                {/* FOR EACH WEEK, MAX OF 6, MIN of 4 */}
                <div className="days">
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
                        />
                    })}
                </div>
            </div>
        )
    }
}

// export default {MonthComponent, handlePrevButtonomCalendarComponent};
export default MonthComponent;