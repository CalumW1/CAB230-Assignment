// imporrt react and the css sytle sheet;
import React, { Component } from "react";
import "./Login.css";

// create class which extends component 
class Content extends Component {

    // create a constructor to pass the output from the API into a table
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    // button click event fetches the offecnces
    handleClick = event => {
        fetch("http://hackhouse.sh:3000/offences")
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((result) => {
            // add the API output to the array for the table
            this.setState({data: result.offences});
            
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
    }

  render() {
    return (
        // create a div class
      <div className="rectangleoffence"> 
      {/* creates button and handles the click event */}
      <button onClick={this.handleClick}>Get Offences</button>
      {/* output  */}
          <p id="offout" />
          <br />
          <br />
        {/* creation of the table */}
          <table id="offencestable">
              {/* Map the API data to item */}
              <tbody>{this.state.data.map(function(item, key){
                  return(
                      <tr key = {key}>
                      <td>{item}</td>
                      </tr>
                  )
              })}</tbody>
          </table>
      </div>      
    );
  }
}


export default Content;



