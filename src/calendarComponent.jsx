import React from 'react';
import MonthComponent from './monthComponent.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import moment from 'moment';

class CalendarModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthCount : 0,
            leftMonth : moment().format("MMMM YYYY"),
            rightMonth : moment().add(1, "months").format("MMMM YYYY"),
            daysInLeftMonth : this.monthConfig(0),
            daysInRightMonth : this.monthConfig(1),
            availableDates : this.availableDates(),
            resMakingMode : false,
            inBetweenDates : [],
            selectedDates : [],
            hideClearBtn : true
        };

        //bind functions
        this.monthConfig = this.monthConfig.bind(this);
        this.toPrevMonth = this.toPrevMonth.bind(this);
        this.toNextMonth = this.toNextMonth.bind(this);
        this.availableDates = this.availableDates.bind(this);
        this.resMaker = this.resMaker.bind(this);
        this.mouseOverDuringResMode = this.mouseOverDuringResMode.bind(this);
        this.endDateClicked = this.endDateClicked.bind(this);
        this.clearDataClickHandler = this.clearDataClickHandler.bind(this);

    }

    //button functionality for arrows
    toPrevMonth(e) {
        let new_monthCount = this.state.monthCount-1;
        let new_rightMonth = this.state.leftMonth;
        let new_daysInRightMonth = this.state.daysInLeftMonth; 
        let new_leftMonth = moment(this.state.leftMonth, "MMMM YYYY").subtract(1, "months").format("MMMM YYYY");
        let new_daysInLeftMonth = this.monthConfig(new_monthCount);
        let new_availableDates = this.availableDates(new_daysInLeftMonth, new_daysInRightMonth);
        this.setState({
            monthCount : new_monthCount,
            leftMonth : new_leftMonth,
            rightMonth : new_rightMonth,
            daysInLeftMonth : new_daysInLeftMonth,
            daysInRightMonth : new_daysInRightMonth,
            availableDates : new_availableDates
        });
    }
    toNextMonth(e) {
        let new_monthCount = this.state.monthCount+1;
        let new_leftMonth = this.state.rightMonth;
        let new_daysInLeftMonth = this.state.daysInRightMonth; 
        let new_rightMonth = moment(this.state.rightMonth, "MMMM YYYY").add(1, "months").format("MMMM YYYY");
        let new_daysInRightMonth = this.monthConfig(new_monthCount+1);
        let new_availableDates = this.availableDates(new_daysInLeftMonth, new_daysInRightMonth);
        this.setState({
            monthCount : new_monthCount,
            leftMonth : new_leftMonth,
            rightMonth : new_rightMonth,
            daysInLeftMonth : new_daysInLeftMonth,
            daysInRightMonth : new_daysInRightMonth,
            availableDates : new_availableDates
        });
    }

    availableDates() {
        let arrayOfDays = [];
        for (let i = 0; i < 90; i++) {
            let firstOfTheMonth = moment().startOf('month');
            arrayOfDays.push(moment(firstOfTheMonth).add({days: i}).format("YYYY-MM-DD"));
        }
        return arrayOfDays.filter(day => !this.props.user.dates_reserved.includes(day));
    }

    resMaker(arrayOfConsecutiveDatesAvailable) {
        this.setState({
            availableDates: arrayOfConsecutiveDatesAvailable,
            resMakingMode: true,
            selectedDates : []
        });
    }

    // generates array of days for each month
    monthConfig(monthCountToUse) {
        let arrayOfDays = [];
        let firstDay; 
        if (monthCountToUse >= 0) {
            //for current months and any following months
            for (let i = 0; i < moment().add(monthCountToUse, 'months').daysInMonth(); i++) {
                //pushes all the dates of the month into the given month, using the first day as the reference point
                let firstOfTheMonth = moment().startOf('month');
                arrayOfDays.push(moment(firstOfTheMonth).add({months: monthCountToUse, days: i}).format("YYYY-MM-DD"));
            }
            firstDay = moment().add(monthCountToUse, 'months').startOf('month').format('dd');
        } else {
            //for when monthCount is negative (looking for months before current one)
            monthCountToUse = (monthCountToUse) * -1;
            for (let i = 0; i < moment().subtract(monthCountToUse, 'months').daysInMonth(); i++) {
                //pushes all the dates of the month into the given month, using the first day as the reference point
                arrayOfDays.push(moment().startOf('month').subtract({months: monthCountToUse}).add({days: i}).format("YYYY-MM-DD"));
            }
            firstDay = moment().subtract(monthCountToUse, 'months').startOf('month').format('dd');
        }

        //check when the fhe first of the month is at, then return the array when you got all the placeholders
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

    mouseOverDuringResMode(date) {
        this.setState({
            inBetweenDates : this.state.availableDates.slice(0, this.state.availableDates.indexOf(date)+1)
        });
    }

    endDateClicked(date) {
        let resetDates = this.availableDates();
        const new_daysInRightMonth = this.monthConfig(this.state.monthCount+1); 
        const new_daysInLeftMonth = this.monthConfig(this.state.monthCount);
        this.setState({
            selectedDates : this.state.inBetweenDates,
            availableDates : resetDates,
            inBetweenDates : [],
            daysInLeftMonth : new_daysInLeftMonth,
            daysInRightMonth : new_daysInRightMonth,
            resMakingMode : false,
            hideClearBtn : false
        });
    }

    clearDataClickHandler(e) {
        console.log("clear clicked");
        let new_daysInRightMonth = this.monthConfig(this.state.monthCount+1); 
        let new_daysInLeftMonth = this.monthConfig(this.state.monthCount);
        let new_availableDates = this.availableDates();
        this.setState({
            daysInLeftMonth : new_daysInLeftMonth,
            daysInRightMonth : new_daysInRightMonth,
            availableDates : new_availableDates,
            selectedDates : [],
            resMakingMode : false,
            hideClearBtn : true
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="calendar">

                {/* availability header and minimum stay / clear button sections */}
                <div className="availability"><h3><b>Availability</b></h3></div>

                {(this.state.resMakingMode || (!this.state.resMakingMode && !this.state.hideClearBtn)) ?  
                    <div className="minStay_and_clearDateButton">
                        <div><p>{this.props.user.minStay} night minimum stay</p></div>
                        <div className="clear_date" onClick={this.clearDataClickHandler}><p>Clear Date</p></div>
                        
                    </div>
                    : null
                }

                {/* left and right buttons, with absolute position, z-index of 2 */}
                <div className="buttons">
                    <div className="left_button" tabIndex="0" onClick={this.toPrevMonth}>
                        <svg focusable="false" viewBox="0 0 1000 1000" className="arrow_button">
                            <path className="arrows" d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path>
                        </svg>
                    </div>
                    <div className="right_button" tabIndex="0" onClick={this.toNextMonth}>
                        <svg focusable="false" viewBox="0 0 1000 1000">
                            <path className="arrows" d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path>
                        </svg>
                    </div>
                </div>

                {/* container for the actual calendars: left and right */}
                <div className="calendar_container">
                    
                    {/* LEFT CALENDAR MONTH */}
                    <MonthComponent className="month" 
                        availability={this.state.availableDates} 
                        minStay={this.props.user.minStay} 
                        resMakingMode={this.state.resMakingMode} 
                        monthToRender={this.state.leftMonth} 
                        daysInThisMonth={this.state.daysInLeftMonth}
                        mouseOverDuringResMode={this.mouseOverDuringResMode} 
                        resMaker={this.resMaker}
                        inBetweenDates={this.state.inBetweenDates}
                        endDateClicked={this.endDateClicked}
                        selectedDates = {this.state.selectedDates} />

                    {/* LEFT CALENDAR MONTH */}
                    <MonthComponent className="month" 
                        availability={this.state.availableDates} 
                        minStay={this.props.user.minStay} 
                        resMakingMode={this.state.resMakingMode} 
                        monthToRender={this.state.rightMonth} 
                        daysInThisMonth={this.state.daysInRightMonth} 
                        mouseOverDuringResMode={this.mouseOverDuringResMode} 
                        resMaker={this.resMaker}
                        inBetweenDates={this.state.inBetweenDates}
                        endDateClicked={this.endDateClicked}
                        selectedDates = {this.state.selectedDates} />
                </div>

            </div>
        )
    }
}

export default CalendarModule;