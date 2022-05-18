import { render } from "@testing-library/react";
import React from "react";
import ReactDom from "react-dom";

// conditional rendering

const root = ReactDom.createRoot(document.getElementById("root"));

function GreetingUser(props){
    return <h1>Welcome back!</h1>
}

function GreetingGuest(props){
    return <h1>Please sign up.</h1>
}

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn){
        return <GreetingUser />;
    } else {
        return <GreetingGuest />;
    }
}

function LoginButton (props) {
    return (
        <button onClick={props.onClick}>
            login
        </button>
    );
}

function LogoutButton (props){
    return (
        <button onClick={props.onClick}>
            logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn : false};
    }

    handleLoginClick(){
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick(){
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        // let button;
        // if (isLoggedIn){
        //     button = <LogoutButton onClick={this.handleLogoutClick} />;
        // } else {
        //     button = <LoginButton onClick={this.handleLoginClick} />;
        // }


        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                <div>
                    The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
                </div>
                {/* {button} */}
                {isLoggedIn 
                    ? <LogoutButton onClick={this.handleLogoutClick} />
                    : <LoginButton onClick={this.handleLoginClick} />}
            </div>
        )

    }


}

function Mailbox(props){
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 && 
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const messages = ["React", "Re: React", "Re:Re: React"];

// can chose to render one or the other
root.render(<LoginControl />); 
// root.render(<Mailbox unreadMessages={messages} />);



