import React from "react";
import ReactDom from "react-dom";

const root = ReactDom.createRoot(document.getElementById("root"));

class Toggle extends React.Component {
    constructor (props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState( prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render(){
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

root.render(<Toggle />);

// examples to pass Arguments to Event Handlers
// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
