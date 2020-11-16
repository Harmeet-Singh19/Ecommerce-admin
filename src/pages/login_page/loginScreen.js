import React, { Component } from "react";

import styles from "./Login.module.css";


class Login extends Component {
   
    render() {
        return (
            <div className={styles.parent_div}>
                <div className={styles.login_section} >
                    <h1 className={styles.welcome_heading}>Welcome! </h1>
                    <br></br><br></br>
                    <div className="justify-content-center row">
                    <div className=" col-md-8 col-sm-8">
                    <div className={"card"} >
                        <div className={"card-body"} style={{width:"80%"}}>
                            
                                    <div className="mt-3">
                                        <div className={styles.form}>
                                        <form style={{justifyContent:"center"}}>
                                        
                                        <label style={{width:"100%"}}>
                                            Email:
                                                 <input type="email" placeholder="Enter your registered email"
                                                            className="form-control"
                                                            required/>
                                        </label>
                                
                                    <br />

                                    <label style={{width:"100%"}}>
                                        Password:
                                         <input type="password" placeholder="Enter your password"
                                                            className="form-control"
                                                            required/>
                                    </label>

                                    <br />
                                    <div className = {styles.user_login_button}>
                                    <input className= {styles.login_tab_button} type="button" value="Login" onClick={
                                                            this.handleLogin
                                                        }
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
        );
    }
}
export default(Login);

