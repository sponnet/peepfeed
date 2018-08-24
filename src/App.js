// Import React and Component
import React, { Component } from "react";
import "bulma/css/bulma.css";
import "./App.css";
import PeepFeed from "./PeepFeed/PeepFeed";
import config from "react-global-configuration";
import configuration from "./config";

config.set(configuration);

class App extends Component {
  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Peep Feed</h1>
            </div>
          </div>
        </section>
          <div className="container">
            <PeepFeed />
          </div>
       
      </div>
    );
  }
}

export default App;
