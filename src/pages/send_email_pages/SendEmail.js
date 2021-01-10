import React, { Component } from 'react'
import styles from './SendEmail.module.css'
import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";
export default class SendEmail extends Component {

    state={
        
    }
    
    render() {
        return (
            <>
             <TopBar {...this.props} />
            <div className={styles.send_email}>
                
                <h1 className = {styles.welcome_heading}>Send Email</h1>

                <div className={styles.send_email_main}>
                <div className={styles.row}>
                    <div className={styles.card} >
                        <div className={styles.card_body} style={{width:"80%"}}>
                            
                                    <div className="mt-3">
                                        <div className={styles.form}>
                                        <form style={{justifyContent:"center"}}>
                                            <label style={{width:"100%"}}>
                                                <p>Select vendor</p>
                                                --- to add a dropdown here ---
                                            </label>
                                        
                                        <br/><br/><br/><br/>
                                        <label style={{width:"100%"}}>
                                            Book Names and Quantities:
                                                 <input type="text" placeholder="Enter details "
                                                            className="form-control"
                                                           
                                                            required/>
                                        </label>


                                    <label style={{width:"100%"}}>
                                        Delivery Address of Buyer:
                                            <input type="text" placeholder="Enter Address "
                                                            className="form-control"
                                                required/>
                                    </label>

                                    <br />
                                    <div className = "user_login_button">
                                    <input className= "login_tab_button" type="button" value="Send"
                                    
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
            </>
        )
    }
}
