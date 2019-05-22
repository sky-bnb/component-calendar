import React from 'react';
// import {MonthComponent, handlePrevButtonFromCalendarComponent} from './monthComponent.jsx';
import MonthComponent from './monthComponent.jsx';

import moment from 'moment';

class CalendarModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryClicked : false,
            leftMonth : moment().format("MMMM YYYY"),
            rightMonth : moment().add(1, "months").format("MMMM YYYY"),
            daysInLeftMonth : this.monthConfig(this.leftMonth),
            daysInRightMonth : this.monthConfig(this.rightMonth)
        };

        //bind functions
        this.toPrevMonth = this.toPrevMonth.bind(this);
        this.toNextMonth = this.toNextMonth.bind(this);
    }

    //button functionality for arrows


    toPrevMonth(e) {
        let new_rightMonth = this.state.leftMonth;
        let new_daysInRightMonth = this.state.daysInLeftMonth; 
        let new_leftMonth = moment(this.state.leftMonth).subtract(1, "months").format("MMMM YYYY");
        let new_daysInLeftMonth = this.monthConfig(new_leftMonth);
        this.setState({
            leftMonth : new_leftMonth,
            rightMonth : new_rightMonth,
            daysInLeftMonth : new_daysInLeftMonth,
            daysInRightMonth : new_daysInRightMonth
        });
    }

    toNextMonth(e) {
        let new_leftMonth = this.state.rightMonth;
        let new_daysInLeftMonth = this.state.daysInRightMonth; 
        let new_rightMonth = moment(this.state.rightMonth).add(1, "months").format("MMMM YYYY");
        let new_daysInRightMonth = this.monthConfig(new_rightMonth);
        this.setState({
            leftMonth : new_leftMonth,
            rightMonth : new_rightMonth,
            daysInLeftMonth : new_daysInLeftMonth,
            daysInRightMonth : new_daysInRightMonth
        });
    }

    //generates array of days for each month
    monthConfig(month) {
        // const month =  left ? moment() : moment().add(1, "months");
        const num = moment(month).daysInMonth();
        let arrayOfDays = [];
        for (let i = 1; i < num; i++) {
            arrayOfDays.push(i);
        }
        const firstDay = moment(month).startOf('month').format('dd');
        let weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        for (let i = 0; i < 7; i++) {
            if (weekdays[i] !== firstDay) {
                //symbolizes a nonexistent day as placeholder in calendar
                arrayOfDays.unshift(null);
            } else {
                return arrayOfDays;
            }
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="calendar">
                <div className="availability"><h3><b>Availability</b></h3></div>
                <div className="minStay_and_clearDateButton">
                    <div><p>{this.props.user.minStay} night minimum stay</p></div>
                    <div className="clear_date"><p>Clear Date</p></div>
                </div>

                {/* left and right buttons, with absolute position, z-index of 2 */}
                <div className="left_button" tabIndex="0" onClick={this.toPrevMonth}>
                    <svg focusable="false" viewBox="0 0 1000 1000" className="arrow_button">
                        <path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path>
                    </svg>
                </div>
                <div className="right_button" tabIndex="0" onClick={this.toNextMonth}>
                    <svg focusable="false" viewBox="0 0 1000 1000">
                        <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path>
                    </svg>
                </div>

                {/* container for the actual calendars: left and right */}
                <div className="calendar_container">
                    
                    {/* LEFT CALENDAR MONTH */}
                    <MonthComponent className="month" availability={this.props.user.dates_reserved} monthToRender={this.state.leftMonth} daysInThisMonth={this.state.daysInLeftMonth} />

                    {/* LEFT CALENDAR MONTH */}
                    <MonthComponent className="month" availability={this.props.user.dates_reserved} monthToRender={this.state.rightMonth} daysInThisMonth={this.state.daysInRightMonth} />
                </div>

            </div>
        )
    }
}

export default CalendarModule;