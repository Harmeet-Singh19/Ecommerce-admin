import React, { Component } from 'react'
import './AddAdmin.css'

export default class AddAdmin extends Component {
    render() {
        return (
            <div className="add-admin">
                
                <h1 className = "welcome-heading">Add sellers</h1>

                <div className="add-admin-main">
                <div className="justify-content-center row">
                    <div className=" col-md-8 col-sm-8">
                    <div className="card" >
                        <div className="card-body" style={{width:"80%"}}>
                            
                                    <div className="mt-3">
                                        <div className="form">
                                        <form style={{justifyContent:"center"}}>
                                        
                                        <label style={{width:"100%"}}>
                                            Name:
                                                 <input type="text" placeholder="Enter name of seller"
                                                            className="form-control"
                                                            required/>
                                        </label>

                                        <label style={{width:"100%"}}>
                                            Email:
                                                 <input type="email" placeholder="Enter verified email of seller"
                                                            className="form-control"
                                                            required/>
                                        </label>
                                
                                    <br />

                                    <label style={{width:"100%"}}>
                                        Password:
                                         <input type="password" placeholder="Enter password"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Confirm Password:
                                         <input type="password" placeholder="Confirm password"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Phone:
                                            <input type="Number" placeholder="Enter number of seller"
                                                className="form-control"
                                                 required/>
                                        </label>

                                    <label style={{width:"100%"}}>
                                        Address:
                                            <input type="text" placeholder="Enter Address of seller"
                                                            className="form-control"
                                                required/>
                                    </label>

                                    <br />
                                    <div className = "user_login_button">
                                    <input className= "login_tab_button" type="button" value="Add"
                                                         />
                                    </div>
                                </form>
                                        </div>
                                    </div>
                                    <br />
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
