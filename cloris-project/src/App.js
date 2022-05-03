import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import './App.css';
// import {walletUser} from './helpers';




function App() {
  // const signer = walletUser();
  return (
    <div className="App">
      <div className="socialMedia">
        <span>Welcome to the Cloris Project!</span>
      </div>
      <div className="content" alt="content">
        <div>
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <div className="timeText">
          <span>Time left before the minting: "timeLeftBeforeMinting"</span>
          <button>mint</button>
          <span>Time since the minting "timeSinceMinting"</span>
        </div>

      </div>
      <div className="socialMedia">
        <span>social medias</span>
      </div>

    </div>
  );
}

export default App;
