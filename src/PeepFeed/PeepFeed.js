import React, { Component } from "react";
import axios from "axios";
// import NumberFormat from "react-number-format";
import config from "react-global-configuration";
import InfiniteScroll from "react-infinite-scroller";

class PeepFeed extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor() {
    super();
    this.state = {
      peeps: [],
      hasMoreItems: true
    };
  }
  // This is called when an instance of a component is being created and inserted into the DOM.
  componentWillMount() {
    this.urlTail =
      window.location.search.substring(1).length > 0
        ? window.location.search.substring(1)
        : config.get("defaulthash");
  }

  loadmorepeeps() {
    this.loadpeeps().then(([peeps, tail]) => {
      this.setState({ peeps: peeps, tail: tail, hasMoreItems: tail != null });
    });
  }

  loadpeeps(tail, accum, count) {
    //debugger;
    return new Promise((resolve, reject) => {
      tail = tail || this.state.tail || this.urlTail;
      count = count || 3;
      accum = accum || this.state.peeps || [];
      axios
        .get(config.get("ipfsroot") + tail)
        .then(response => {
          accum.push(response.data);
          if (response.data.parentHash) {
            if (count > 1) {
              return resolve(
                this.loadpeeps(response.data.parentHash, accum, count - 1)
              );
            } else {
              return resolve([accum, response.data.parentHash]);
            }
          } else {
            return resolve([accum, null]);
          }
        })
        // Catch any error here
        .catch(error => {
          return reject(error);
        });
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
    var peeps = this.state.peeps.map((peep, i) => {
      if (!peep.ipfsData || peep.ipfsData.content === "") {
        return undefined;
      }
      let image = undefined;
      if (peep.ipfsData.pic) {
        image = (
          <img
            src={config.get("ipfsroot") + peep.ipfsData.pic}
            width="300"
            alt="QUAAK"
          />
        );
      }

      return (
        <div key={peep.ipfsHash} className="card">
          <div className="card-content">
            <div className="content">{peep.ipfsData.content}</div>
            <p>
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(peep.ipfsData.untrustedTimestamp * 1000)}
            </p>
            {image}
          </div>
        </div>
      );
    });

    // debugger;

    //const loader = <div className="loader" />;

    const loader = <div className="loader"></div>;

    return (
      <section className="section">
        <div className="content has-text-centered has-text-weight-light has-text-grey-light">
          <p>
            Showing peeps starting from{" "}
            <a href={config.get("ipfsroot") + this.urlTail} target="_new">
              {this.urlTail}
            </a>
          </p>
          <div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadmorepeeps.bind(this)}
              hasMore={this.state.hasMoreItems}
              loader={loader}
            >
              {peeps}
            </InfiniteScroll>
          </div>
        </div>
      </section>
    );
  }
}

export default PeepFeed;
