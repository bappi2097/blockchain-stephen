import "./App.css";
import React from "react";
import web3 from "./web3";

const App = () => {
  web3.eth.getAccounts().then(console.log)
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}
export default App;
