import React from 'react';
import ReactDom from 'react-dom/client';
import "./index.css";


const root = ReactDom.createRoot(document.getElementById('root'));

// Composition vs Inheritance

function FancyBorder(props){
    return(
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function Dialog(props){
    return(
        <FancyBorder color="blue">
            <h1 className="dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ""};
    }

    render(){
        return(
            <Dialog title="Mars Exploration Program"
                    message="How should we refer to you?">

                <input  value={this.state.login} 
                        onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }

    handleChange(e){
        this.setState({login: e.target.value});
    }

    handleSignUp(){
        alert(`Welcome aboard, ${this.state.login}`);
    }
}


function WelcomeDialog(){
    return(
        <Dialog
            title="Welcome"
            message="Thank you for visiting our spacecraft!" />
    );
}

function SplitPane(props){
    return(
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function Contacts(){
    return <div className="Contacts" />;
}

function Chat(){
    return <div className="Chat" />;
}

function App(){
    return(
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
    );
}

root.render(<SignUpDialog />);