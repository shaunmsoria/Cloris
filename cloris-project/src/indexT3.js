import React from "react";
import ReactDom from "react-dom";

const root = ReactDom.createRoot(document.getElementById("root"));

// function Clock (props) {
//     return (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>The time is {props.date.toLocaleTimeString()}</h2>
//         </div>
//     );
// }

// function tick (){
//     root.render(<Clock />);
// }

// setInterval(tick, 1000);

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>The time is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

// root.render(<Clock />);

function App () {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

root.render(<App />);