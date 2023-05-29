import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
/**
 * showGraph variable is added to ensure only once the user clicks start streaming
 * the graph will be shown. 
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      //
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  /**
   * A condition is added to check if the state varible 'showGraph'
   * is set to true, for us to print the graph on the screen.
   */
  renderGraph() {
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  /**
   * We add an interval function which we check for data every 100 milliseconds.
   * Each time we receive the data from the server, we set the state component
   * with the server responses. We clear the interval once the count hits 1000.
   * This way the data updates itself from server without manually calling the function. 
   */
  getDataFromServer() {
    let count = 0;
    const interval = setInterval (()=>{
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          showGraph: true,
          data: serverResponds,
        });
      });
      count++;
      if(count>1000){
        clearInterval(interval);
      }
    },100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
