import React from "react";
import ReactDom from "react-dom";

const root = ReactDom.createRoot(
    document.getElementById('root')
);

// const element = <h1>Hello, form Cloris!</h1>;
// root.render(element);

function tick () {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    );
    root.render(element);
}

setInterval(tick, 1000);