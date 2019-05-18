import React from 'react';
import dayComponent from './dayComponent.jsx';

class MonthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <dayComponent className="day" />
                <dayComponent className="day" />
                <dayComponent className="day" />
                <dayComponent className="day" />
                <dayComponent className="day" />
                <dayComponent className="day" />
                <dayComponent className="day" />
            </div>
        )
    }
}

export default MonthComponent;