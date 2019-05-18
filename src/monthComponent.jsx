import React from 'react';
import DayComponent from './dayComponent.jsx';

class MonthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <DayComponent className="day" />
                <DayComponent className="day" />
                <DayComponent className="day" />
                <DayComponent className="day" />
                <DayComponent className="day" />
                <DayComponent className="day" />
                <DayComponent className="day" />
            </div>
        )
    }
}

export default MonthComponent;