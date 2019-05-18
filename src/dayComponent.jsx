import React from 'react';

class DayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <p> Sunday </p>
                <p> Monday </p>
                <p> Tuesday </p>
                <p> Wednesday </p>
                <p> Thursday </p>
                <p> Friday </p>
                <p> Saturday </p>
            </div>
        )
    }
}

export default DayComponent;