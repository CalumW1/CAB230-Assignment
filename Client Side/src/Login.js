// import stylesheet and react
import "./Login.css";
import React, { Component } from "react";

// set the token to null and export it to allow other pages to use it
let JWT = null; 
export { JWT };


class Content extends Component {

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  /* Logout button function to allow the user to log out and remove the token */
  logout = event =>{
    JWT = null; 
    console.log("logout is successful");
    console.log(JWT);
    event.preventDefault();
  };

  /*  Submit the user input to the API and return a JWT token */
  SubmitForm = e => {
    fetch("https://cab230.hackhouse.sh/login", {
      method: "POST",
      body: 'email=' + this.refs.logemail.value + '&password=' + this.refs.logPassword.value,
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
        let appDiv = document.getElementById("Loggout");
        appDiv.innerHTML = 'Welcome';
        // global.JWT = result.token;
        JWT = result.token;
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
      <div className="login">
      <div className="rectangle">
        <h1 className="title">Login</h1>
        {/*  Create the email form */}
        <form onSubmit={this.SubmitForm}>
          <br/> <br/> 
          <input
            placeholder="Email"
            type="email"
            ref="logemail"
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <br/>
          <br/> <br/> 
          {/*  Create the password form */}
          <input
            placeholder="Password"
            type="password"
            ref="logPassword"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <br />
          <br />
          {/*  Create the login button and assign it to the submit form function */}
          <button onClick={this.SubmitForm}>Submit</button>
          <br />
          <br />
          {/* Displays welcome message  */}
          <p id="Loggout" />
          {/*  Creates the log out button and assign it to the log out function */}
          <button onClick={this.logout}>Logout</button>
        </form>
        </div>
      </div>
    );
  }
}

export default Content;
