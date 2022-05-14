import React from "react";
import ReactDom from "react-dom/client";

const root = ReactDom.createRoot(document.getElementById("root"));

// const hi = ReactDOM.createRoot(mountNode).render(<input value="hi" />);

// const Timer = setTimeout(function() {
//   ReactDOM.createRoot(mountNode).render(<input value={null} />);
// }, 1000);

// Forms

class NameForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "coconut"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    // example 1 with textarea
    // render(){
    //     return (
    //     <form onSubmit={this.handleSubmit}>
    //         <label>
    //             Essay:
    //             <textarea value={this.state.value} onChange={this.handleChange} />
    //         </label>
    //         <input type="submit" value="Submit" />
    //     </form>
    //     );
    // };

    // example 2 with select
    render(){
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Pick your favorite flavor:
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    };

    // note: You can pass an array into the value attribute, allowing you to select multiple options in a select tag:
    // <select multiple={true} value={['B', 'C']}></select>

    // note: In HTML, an <input type="file"> lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the File API.
    // <input type="file" />

}


class Reservation extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}

// works with example 1 & 2
// root.render(<NameForm />);



root.render(<Reservation />);

// allow to delay when the user can edit a component
// ReactDOM.createRoot(mountNode).render(<input value="hi" />);

// setTimeout(function() {
//   ReactDOM.createRoot(mountNode).render(<input value={null} />);
// }, 1000);