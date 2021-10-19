// import stylesheet and react
import "./Login.css";
import React, { Component } from "react";

class Content extends Component {
  // create the handle change event
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // event for posting the user entered username and password to the API
  SubmitForm = e => {
    fetch("https://cab230.hackhouse.sh/register", {
      method: "POST",
      body: 'email=' + this.refs.Regemail.value + '&password=' + this.refs.RegPassword.value,
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then(function(result) {
        let appDiv = document.getElementById("regout");
        appDiv.innerHTML = 'Welcome';
        console.log(JSON.stringify(result));
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
      });
      e.preventDefault();
  };

  render() {
    return (
      <div className="register">
      <div className="rectangle">
        <h1 className="title">Register</h1>
        {/* Create the email input form for the user */}
        <form onSubmit={this.SubmitForm}>
          <br/> <br/> 
          <input
            type="email"
            ref="Regemail"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <br/>
          <br/> <br/>
          {/* create the  password form for user input */}
          <input
            type="password"
            ref="RegPassword"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <br />
          <br />
          {/* create button and assign it the submitform event */}
          <button onClick={this.SubmitForm}>Register</button>
          <br />
          <br />
          <p id="regout" />
        </form>
        </div>
      </div>
    );
  }
}

export default Content;
