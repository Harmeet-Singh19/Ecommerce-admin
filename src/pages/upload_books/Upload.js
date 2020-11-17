import React from 'react'
import './Upload.css'

function Upload() {
    return (
        <div className="upload">
            <h1 className="welcome-heading-upload"> Book Upload</h1>
            <br/><br/>


        <div className="upload-page">

            <div className="justify-content-center row">
                    <div className=" col-md-8 col-sm-8">
                    <div className="card" >
                        <div className="card-body" style={{width:"80%"}}>
                            
                                    <div className="mt-3">
                                        <div className= "form">
                                        <form style={{justifyContent:"center"}}>
                                        
                                        <label style={{width:"100%"}}>
                                            Book Name: 
                                                 <input type="text" placeholder="Enter book name"
                                                            className="form-control"
                                                            required/>
                                        </label>
                                
                                    <br />

                                    <label style={{width:"100%"}}>
                                        Price: 
                                         <input type="text" placeholder="Enter the price of book"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Description: 
                                         <input type="text" placeholder="Brief description of the book"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Author: 
                                         <input type="text" placeholder="Author"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Publisher: 
                                         <input type="text" placeholder="Publisher"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Edition: 
                                         <input type="text" placeholder="1/2/3/.."
                                                            className="form-control"
                                                            required/>
                                    </label>
                                    <label style={{width:"100%"}}>
                                        Weight: 
                                         <input type="number" placeholder="Rough estimate of the weight"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Subject: 
                                         <input type="text" placeholder="Subject"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Author: 
                                         <input type="text" placeholder="Author of the book"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Year: 
                                         <input type="number" placeholder="Of the course used in"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Quantity: 
                                         <input type="number" placeholder="Number of books to be seen on website"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Image (to upload):
                                        <button className="upload-buttons">Picture 1</button>
                                        <button className="upload-buttons">Picture 2</button>
                                        <button className="upload-buttons">Picture 3</button>
                                         
                                    </label>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                   <label style={{width:"100%"}}>
                                        Author :
                                            To be rendered
                                       
                                         
                                    </label> 


                                    <br />
                                    <div className = "user_login_button">
                                    <input className= "login_tab_button" type="button" value="Upload" 
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

export default Upload
