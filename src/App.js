import React from 'react'
// import App from './App'
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map'
import { BrowserRouter as Router, Switch,
  Route,
} from "react-router-dom";

 class App extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    // const {loggedIn} = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <div>
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Map} />
                <Route  path="/Map" component={Map} />
                {/* <Route exact path="/courses" component={JobBoard} /> */}
                
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  }


}

export default App;
