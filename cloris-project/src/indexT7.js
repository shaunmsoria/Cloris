import React from "react";
import ReactDom from "react-dom/client";

const root = ReactDom.createRoot(document.getElementById("root"));


// example 1
// function NumberList(props){
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => 
//         <li key={number.toString() }>
//             {number}
//             </li>
//     );
//     return (
//         <ul>{listItems}</ul>
//     );
// }

// example 2
// function ListItem (props){
//     return <li>{props.value}</li>
// }

// function NumberList(props){
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => 
//         <ListItem key={number.toString()} value={number} />
//     );
//     return (
//         <ul>{listItems}</ul>
//     );
// }

// Used in example 1 & 2
// const numbers = [1, 2, 3, 4, 5];
// root.render(<NumberList numbers={numbers} />);

// example 3
function ListItem (props){
    return <li>{props.value}</li>
}

function NumberList(props){
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) => 
                <ListItem key={number.toString()} value={number} />
            )}
        </ul>
    );
}

// Used in example 1 & 2
const numbers = [1, 2, 3, 4, 5];
root.render(<NumberList numbers={numbers} />);

// example 4
// function Blog(props){
//     const sidebar = (
//         <ul>
//             {props.posts.map((post) => 
//                 <li key={post.id}>
//                     {post.title}
//                 </li>
//             )}
//         </ul>
//     );
//     const content = props.posts.map((post) =>
//         <div key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//         </div>
//     );
//     return (
//         <div>
//             {sidebar}
//             <hr />
//             {content}
//         </div>
//     )
// }

// const posts = [
//     {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
//     {id: 2, title: 'Installation', content: 'You can install React from npm.'}
// ];

// root.render(<Blog posts={posts} />);

// if we want to pass the key of an item to a component we have to pass it as part of the props argument, example:
// const content = posts.map((post) =>
//   <Post
//     key={post.id}
//     id={post.id}
//     title={post.title} />
// );

