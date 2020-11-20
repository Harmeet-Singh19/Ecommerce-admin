import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import styles from "./Login.module.css";
import { connect } from 'react-redux';


  
  const getUser = () => async (dispatch) => {
    await doRequest({
      url: "/admin/auth/verify",
      method: "get",
      onSuccess: async (data) => {
        // console.log(data)
        dispatch({
            type: 'SET_USER',
            user:data
          })
          console.log(data)
      },
    });
  };
class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            cred:"",
            password:""
        }
    }

    handleLogin = async e => {
        e.preventDefault();
        console.log(this.state)
        await doRequest({
            url: "/admin/auth/login",
            method: "post",
            body: { ...this.state },
            onSuccess: async({ data }) => {
                await localStorage.setItem("token", data.token)
                this.props.getUser()
                this.props.history.push("/")
            },
            onError: (err) => alert(err),
        });
    };
   
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
                                                        onChange={e => this.setState({ cred: e.target.value })}
                                                            className="form-control"
                                                            required/>
                                        </label>
                                
                                    <br />

                                    <label style={{width:"100%"}}>
                                        Password:
                                         <input type="password" placeholder="Enter your password"
                                                        onChange={e => this.setState({ password: e.target.value })}
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
const mapStateToProps = (state) => {
    return {
      user: state.user.user
    }
  }
export default connect(mapStateToProps,{getUser})(Login);

