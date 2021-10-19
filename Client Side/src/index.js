// import react and other packages 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import other pages for the NAV bar
import Register from "./Register";
import Login from "./Login";
import Offences from "./Getoffences";
import Homepage from "./HomePage";
import Search from "./SearchOffences";

// Import Stylesheet
import "./styles.css";

// Creates Nav bar and links the different buttons to their pages
function App() {
  return (
    <Router>
      <div>
        <nav> 
          <ul>
            <li>
              <Link to="/">HomePage</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/GetOffences">Offences</Link>
            </li>
            <li>
              <Link to="/SearchOffences">Search</Link>
            </li>
          </ul>
        </nav>
        {/*  Provide the routes for the url and the page */}
        <Route path="/" exact component={Homepage} />
        <Route path="/Register" exact component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/GetOffences" component={Offences} />
        <Route path="/SearchOffences" component={Search}/>

      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
