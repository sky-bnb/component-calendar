import React from 'react';
import DayComponent from './dayComponent.jsx';
import moment from 'moment';


class MonthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            availability: this.props.dates,
            monthToRender: this.props.monthToRender,
            daysInThisMonth : this.props.daysInThisMonth
        };

        this.onMouseOverFn = this.onMouseOverFn.bind(this);
        this.handlePrevButtonFromCalendarComponent = this.handlePrevButtonFromCalendarComponent.bind(this);
    }

    onMouseOverFn(e) {
        e.preventDefault();
        this.setState({
            hovered: !this.state.hovered
        });
    }

    handlePrevButtonFromCalendarComponent(newState) {

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
                    {this.props.daysInThisMonth.map((typeOfDay, i) => {
                        return <DayComponent key={i} exists={(typeOfDay !== null) ? "day" : "doesnt_exist"} typeOfDay={typeOfDay} availability={this.props.availability}/>
                    })}
                </div>
            </div>
        )
    }
}

// export default {MonthComponent, handlePrevButtonomCalendarComponent};
export default MonthComponent;