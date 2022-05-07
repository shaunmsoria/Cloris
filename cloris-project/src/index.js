import React from "react";
import ReactDom from "react-dom";

const root = ReactDom.createRoot(
    document.getElementById("root")
);

// example 1
// const element = <div>
//         <span id="hello">
//             <h1>
//                 Hello, from Cloris!
//             </h1>
//         </span>
//         </div>;
// root.render(element);

// example 2 reference
// class Welcome extends React.Components {
//     render(){
//         return <h1>Hello, {this.props.name}</h1>;
//     }
// }

// example 2
// function Welcome(props){
//     return <h1>Hello, {props.name}</h1>
// }

// function App(){
//     return (
//         <div>
//             <Welcome name="Sara" />
//             <Welcome name="Cahal" />
//             <Welcome name="Edite" />
//         </div>
//     );
// }

// const element = App();
// root.render(element);

function formatDate(date){
    return date.toLocaleDateString();
}

function Avatar(props){
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name} 
        />
    );
}

function UserInfo (props){
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment (props){
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 
            "http://placekitten.com/g/64/64"
    }
};

root.render(
    <Comment 
        date={comment.date}
        text={comment.text}
        author={comment.author}
    />
)




