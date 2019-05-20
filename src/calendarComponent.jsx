import React from 'react';
import MonthComponent from './monthComponent.jsx';

class CalendarModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1> "Hello World!" </h1>
                <MonthComponent className="month" />
                <MonthComponent className="month" />
            </div>
        )
    }
}

export default CalendarModule;