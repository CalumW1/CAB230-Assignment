// import react
import React, { Component } from "react";


class mainpage extends Component{
    render(){
        return (
            <main>
                <section className="mainpageimage">
                    <div className="maintext">
                    {/*  Create Title for webpage */}
                    <h1 className="Mainpagetitle">Crime Statistics</h1>                    
                    {/* Link to the register page */}
                    <a className="regbutton" href="/Register">Register</a>
                    {/*  Link to the offences page */}
                    <a href="/GetOffences">Get Offences</a>
                    </div>
                </section> 
            </main>
        )
    }
}

export default mainpage;