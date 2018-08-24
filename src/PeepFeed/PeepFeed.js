import React, { Component } from "react";
import axios from "axios";
// import NumberFormat from "react-number-format";
import config from "react-global-configuration";

class PeepFeed extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor() {
    super();
    this.state = {
      peeps: []
    };
  }
  // This is called when an instance of a component is being created and inserted into the DOM.
  componentWillMount() {
    this.urlTail = window.location.search.substring(1).length > 0 ? window.location.search.substring(1) : config.get('defaulthash');
    this.loadpeeps(this.urlTail, 1000);
  }

  loadpeeps(startHash, count) {
    axios
      .get(config.get('ipfsroot') + startHash)
      .then(response => {
        let newpeeps = this.state.peeps;
        newpeeps.push(response.data);
        this.setState({ peeps: newpeeps });
        if (response.data.childHash && count > 0) {
          this.loadpeeps(response.data.childHash, count - 1);
        }
      })
      // Catch any error here
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (!navigator.onLine) {
      try {
        //let f = JSON.parse(localStorage.getItem("faucetinfo"));
        //this.setState({ faucetinfo: f });
      } catch (e) {
        //
      }
    }
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    var peeps = this.state.peeps.map(function(peep) {
      if (peep.content.length ===0){
        return undefined;
      }
      return (
        <div key={peep.transaction.hash} className="card">
          <div className="card-content">
            <div className="content">{peep.content}</div>
          </div>
        </div>
      );
    });

    return (
      <section className="section">
        <div className="content has-text-centered has-text-weight-light has-text-grey-light">
        <p>Showing peeps starting from <a href={config.get('ipfsroot') + this.urlTail} target="_new">{this.urlTail}</a></p>
          {peeps}
        </div>
      </section>
    );
  }
}

export default PeepFeed;
