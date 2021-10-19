// import sytlesheet, react and JWT token
import "./Login.css";
import React, { Component } from "react";
import { JWT } from "./Login"; 


class search extends Component{
    // create constuctor to run the API data through the array for the table
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value
        });
      };

    SubmitForm = event => {
        //The parameters of the get request
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;

    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    const query = 'offence=' + this.refs.searchinput.value;
    const url = baseUrl + query;

    fetch(encodeURI(url),getParam)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((result) => {
            console.log(result.result)
            // add the results output to the data array
            this.setState({data: result.result}); 
        })
        .catch(function(error) {
                console.log("There has been a problem with your fetch operation: ",error.message);
                let errormessage = document.getElementById("showsearch")
                errormessage.innerHTML = ("You are unable to search because you are not logged in");
            });
}
    render(){
        return (
            <div>
                <div className="rectanglesearch">
                <h2>Search</h2>
                {/*  Create input for to search offences */}
                <form onSubmit={this.SubmitForm}>
                    <input
                    placeholder = "Search"
                    type="text"
                    ref="searchinput"
                    onChange={this.handleChange}
                    />
                </form>
                {/* create button and submit the data to the api */}
                <button onClick={this.SubmitForm}>Search Offences</button>
                <p id="showsearch"></p>
                {/*  Create the table */}
                <table id="resultstable">
                    <thead>
                        <th>Council</th>
                        <th>Amount</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </thead>
                    {/* Map the date to items */}
                <tbody>{this.state.data.map(function(item, key){
                  return(
                      <tr key = {key}>
                    {/*  Create headings */}
                      <td>{item.LGA}</td>
                      <td>{item.total}</td>
                      <td>{item.lat}</td>
                      <td>{item.lng}</td>
                      </tr>
                  )
              })}</tbody>
          </table>
          </div>
            </div>
        )
    }
}

export default search;