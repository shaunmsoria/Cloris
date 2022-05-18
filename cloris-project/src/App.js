import { render } from "@testing-library/react";
import logo from "./logo.svg";
import React from "react";
import "./App.css";






function App (){
    return (
        <div className="App">
             <div className="title">
                 <h1>
                     Welcome to the Cloris Project!
                 </h1>
             </div>
             <div className="content">
                 <div>
                     <img src={logo} className="App-logo" alt="logo" />
                 </div>
                 <div className="status">
                     <span>
                         Value time left before minting
                     </span>
                 </div>
             </div>
             <div className="socialMedia">
                 <h1>
                     Social Media
                </h1>
             </div>
         </div>
    );
}

export default App;