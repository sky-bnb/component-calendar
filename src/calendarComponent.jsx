import React from 'react';
import MonthComponent from './monthComponent.jsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';

class CalendarModule extends React.Component {
    constructor(props) {
        super(props);

        //set up for slide transition
        this.animation = undefined;

        this.state = {
            resMakingMode: false,
            hideClearBtn: true,
            monthCount: 0,
            inBetweenDates: [],
            selectedDates: [],
            waitingLeftMonth: moment().subtract(1, 'months').format("MMMM YYYY"),
            leftMonth: moment().format("MMMM YYYY"),
            rightMonth: moment().add(1, "months").format("MMMM YYYY"),
            waitingRightMonth: moment().add(2, "months").format("MMMM YYYY"),
            daysInWaitingLeftMonth: this.monthConfig(-1),
            daysInLeftMonth: this.monthConfig(0),
            daysInRightMonth: this.monthConfig(1),
            daysInWaitingRightMonth: this.monthConfig(2),
            availableDates: this.availableDates(),
            rightWasPressed: true,
            leftWasPressed: true,
            paused: true,
            moment: null,
            reverse: false
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

        //to reset pause state so it will do slide
        if (this.state.paused === false) {
            this.setState({
                paused: true
            });
        }
        
        this.animation = [{ marginLeft: -307, duration: 0 }, {marginLeft: 0, duration: 200}];
        let new_monthCount = this.state.monthCount - 1;
        let new_waitingLeftMonth = moment(this.state.leftMonth, "MMMM YYYY").subtract(2, "months").format("MMMM YYYY");
        let new_leftMonth = moment(this.state.leftMonth, "MMMM YYYY").subtract(1, "months").format("MMMM YYYY");
        let new_rightMonth = this.state.leftMonth;
        let new_waitingRightMonth = this.state.rightMonth;
        let new_daysInWaitingLeftMonth = this.monthConfig(new_monthCount-1);
        let new_daysInLeftMonth = this.monthConfig(new_monthCount);
        let new_daysInRightMonth = this.state.daysInLeftMonth;
        let new_daysInWaitingRightMonth = this.state.daysInRightMonth;
        let new_availableDates = this.availableDates(new_daysInLeftMonth, new_daysInRightMonth);
        let new_paused = false;
        this.setState({
            paused : new_paused,
            moment: 0,
            monthCount: new_monthCount,
            waitingLeftMonth: new_waitingLeftMonth,
            leftMonth: new_leftMonth,
            rightMonth: new_rightMonth,
            waitingRightMonth: new_waitingRightMonth,
            daysInWaitingLeftMonth: new_daysInWaitingLeftMonth,
            daysInLeftMonth: new_daysInLeftMonth,
            daysInRightMonth: new_daysInRightMonth,
            daysInWaitingRightMonth: new_daysInWaitingRightMonth,
            availableDates: new_availableDates,
        },
        () => {
            //to reset transition slide   
            this.setState({
                moment: null,
            });
        });
    }

    toNextMonth(e) {

        //to reset pause state to be ready for slide transition
        if (this.state.paused === false) {
            this.setState({
                paused: true
            });
        }
        this.animation = [{ marginLeft: 307, duration: 0 }, {marginLeft: 0, duration: 200}];
        let new_monthCount = this.state.monthCount + 1;
        let new_waitingLeftMonth = this.state.leftMonth;
        let new_leftMonth = this.state.rightMonth;
        let new_rightMonth = moment(this.state.rightMonth, "MMMM YYYY").add(1, "months").format("MMMM YYYY");
        let new_waitingRightMonth = moment(this.state.rightMonth, "MMMM YYYY").add(2, "months").format("MMMM YYYY");
        let new_daysInWaitingLeftMonth = this.state.daysInLeftMonth;
        let new_daysInLeftMonth = this.state.daysInRightMonth;
        let new_daysInRightMonth = this.monthConfig(new_monthCount + 1);
        let new_daysInWaitingRightMonth = this.monthConfig(new_monthCount + 2);
        let new_availableDates = this.availableDates(new_daysInLeftMonth, new_daysInRightMonth);
        let new_paused = false;

        //change months when right button is clicked
        this.setState({
            paused : new_paused,
            moment: 0,
            monthCount: new_monthCount,
            waitingLeftMonth: new_waitingLeftMonth,
            leftMonth: new_leftMonth,
            rightMonth: new_rightMonth,
            waitingRightMonth: new_waitingRightMonth,
            daysInWaitingLeftMonth: new_daysInWaitingLeftMonth,
            daysInLeftMonth: new_daysInLeftMonth,
            daysInRightMonth: new_daysInRightMonth,
            daysInWaitingRightMonth: new_daysInWaitingRightMonth,
            availableDates: new_availableDates,
            rightWasPressed: !this.state.rightWasPressed,
        },
        () => {
            this.setState({
              moment: null
            });
        });
    }

    //returns initial available dates
    availableDates() {
        let arrayOfDays = [];
        for (let i = 0; i < 90; i++) {
            let firstOfTheMonth = moment().startOf('month');
            arrayOfDays.push(moment(firstOfTheMonth).add({ days: i }).format("YYYY-MM-DD"));
        }
        return arrayOfDays.filter(day => !this.props.user.dates_reserved.includes(day));
    }

    //displays which days are available consecutively after chosen start date
    resMaker(arrayOfConsecutiveDatesAvailable) {
        this.setState({
            availableDates: arrayOfConsecutiveDatesAvailable,
            resMakingMode: true,
            selectedDates: []
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
                arrayOfDays.push(moment(firstOfTheMonth).add({ months: monthCountToUse, days: i }).format("YYYY-MM-DD"));
            }
            firstDay = moment().add(monthCountToUse, 'months').startOf('month').format('dd');
        } else {
            //for when monthCount is negative (looking for months before current one)
            monthCountToUse = (monthCountToUse) * -1;
            for (let i = 0; i < moment().subtract(monthCountToUse, 'months').daysInMonth(); i++) {
                //pushes all the dates of the month into the given month, using the first day as the reference point
                arrayOfDays.push(moment().startOf('month').subtract({ months: monthCountToUse }).add({ days: i }).format("YYYY-MM-DD"));
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

    //allows for hovering of available consecutive dates
    mouseOverDuringResMode(date) {
        this.setState({
            inBetweenDates: this.state.availableDates.slice(0, this.state.availableDates.indexOf(date) + 1)
        });
    }

    endDateClicked(date) {
        let resetDates = this.availableDates();
        const new_daysInRightMonth = this.monthConfig(this.state.monthCount + 1);
        const new_daysInLeftMonth = this.monthConfig(this.state.monthCount);
        this.setState({
            selectedDates: this.state.inBetweenDates,
            availableDates: resetDates,
            inBetweenDates: [],
            daysInLeftMonth: new_daysInLeftMonth,
            daysInRightMonth: new_daysInRightMonth,
            resMakingMode: false,
            hideClearBtn: false
        });
    }

    //clears all dates
    clearDataClickHandler(e) {
        console.log("clear clicked");
        let new_daysInRightMonth = this.monthConfig(this.state.monthCount + 1);
        let new_daysInLeftMonth = this.monthConfig(this.state.monthCount);
        let new_availableDates = this.availableDates();
        this.setState({
            daysInLeftMonth: new_daysInLeftMonth,
            daysInRightMonth: new_daysInRightMonth,
            availableDates: new_availableDates,
            selectedDates: [],
            resMakingMode: false,
            hideClearBtn: true
        });
    }

    render() {
        console.log("rendered as: ", this.state.paused);
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
                
                    <TweenOne animation={this.animation} moment={this.state.moment} paused={this.state.paused}>
                    <div className="calendar_fixed">

                    {/* LEFT CALENDAR MONTH IN WAITING*/}
                        <MonthComponent className="month"
                            availability={this.state.availableDates}
                            minStay={this.props.user.minStay}
                            resMakingMode={this.state.resMakingMode}
                            monthToRender={this.state.waitingLeftMonth}
                            daysInThisMonth={this.state.daysInWaitingLeftMonth}
                            mouseOverDuringResMode={this.mouseOverDuringResMode}
                            resMaker={this.resMaker}
                            inBetweenDates={this.state.inBetweenDates}
                            endDateClicked={this.endDateClicked}
                            selectedDates={this.state.selectedDates} />

                        {/* LEFT CALENDAR MONTH SHOWING*/}
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
                            selectedDates={this.state.selectedDates} />

                        {/* RIGHT CALENDAR IN SHOWING*/}
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
                            selectedDates={this.state.selectedDates} />  

                        {/* RIGHT CALENDAR IN WAITING SHOWING*/}
                        <MonthComponent className="month"
                            availability={this.state.availableDates}
                            minStay={this.props.user.minStay}
                            resMakingMode={this.state.resMakingMode}
                            monthToRender={this.state.waitingRightMonth}
                            daysInThisMonth={this.state.daysInWaitingRightMonth}
                            mouseOverDuringResMode={this.mouseOverDuringResMode}
                            resMaker={this.resMaker}
                            inBetweenDates={this.state.inBetweenDates}
                            endDateClicked={this.endDateClicked}
                            selectedDates={this.state.selectedDates} />  

                    </div>
                    </TweenOne>
                </div>
            </div>
        )
    }
}

// animateCSS('.month', 'bounce');

export default CalendarModule;