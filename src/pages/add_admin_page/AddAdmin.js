import React, { Component } from 'react'
import './AddAdmin.css'
import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";
export default class AddAdmin extends Component {

    state={
        name:"",
        email:"",
        password:"",
        phone:0,
        address:"",
        isVendor:"false",
        isStudentVendor:"false"
    }
    addAdmin = async e => {
        e.preventDefault();
        const { phone, email, password, name,address,isVendor,isStudentVendor } = this.state;
        await doRequest({
          url: `/admin/auth/add-admin`,
          method: "post",
          body:{ phone, email, password, name,address,isVendor,isStudentVendor },
          onSuccess: () => this.props.history.goBack(),
          onError: (err) => { alert(err) },
        });
      };
    render() {
        return (
            <>
             <TopBar {...this.props} />
            <div className="add-admin">
                
                <h1 className = "welcome-heading">Add New Admin</h1>

                <div className="add-admin-main">
                <div className="justify-content-center row">
                    <div className=" col-md-8 col-sm-8">
                    <div className="card" >
                        <div className="card-body" style={{width:"80%"}}>
                            
                                    <div className="mt-3">
                                        <div className="form">
                                        <form style={{justifyContent:"center"}}>
                                            <label style={{width:"100%"}}>
                                                <p>Type of Admin</p>
                                                <div className="checkBox">
                <input type="radio"
                name="admin"
                  onChange={e => {
                    this.setState({ isVendor: "false" })
                   this.setState({isStudentVendor:"false"})
                  }} />
                <p>SuperAdmin </p>
              </div>
              <div className="checkBox">
                <input type="radio" 
                name="admin"
                  onChange={async(e) => {
                    await this.setState({ isVendor: "true" })
                   await this.setState({isStudentVendor:"false"})
                  //  console.log(this.state)
                  }}  />
                <p>Regular Vendor </p>
              </div>
              <div className="checkBox">
                <input type="radio"
                name="admin"
                 onChange={e => {
                    this.setState({ isVendor: "true" })
                    this.setState({isStudentVendor:"true"})
                  }} />
                <p>Student Vendor </p>
              </div>
                                            </label>
                                        
                                        <label style={{width:"100%"}}>
                                            Name:
                                                 <input type="text" placeholder="Enter name "
                                                            className="form-control"
                                                            onChange={e => this.setState({ name: e.target.value })}
                                                            required/>
                                        </label>

                                        <label style={{width:"100%"}}>
                                            Email:
                                                 <input type="email" placeholder="Enter verified email"
                                                            className="form-control"
                                                            onChange={e => this.setState({ email: e.target.value })}
                                                            required/>
                                        </label>
                                
                                    <br />

                                    <label style={{width:"100%"}}>
                                        Password:
                                         <input type="password" placeholder="Enter password"
                                                            className="form-control"
                                                            onChange={e => this.setState({ password: e.target.value })}
                                                            required/>
                                    </label>

                                    <label style={{width:"100%"}}>
                                        Phone:
                                            <input type="Number" placeholder="Enter number "
                                                className="form-control"
                                                onChange={e => this.setState({ phone: e.target.value })}
                                                 required/>
                                        </label>

                                    <label style={{width:"100%"}}>
                                        Address:
                                            <input type="text" placeholder="Enter Address "
                                                            className="form-control"
                                                            onChange={e => this.setState({ address: e.target.value })}
                                                required/>
                                    </label>

                                    <br />
                                    <div className = "user_login_button">
                                    <input className= "login_tab_button" type="button" value="Add"
                                    onClick={(e)=>this.addAdmin(e)}
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
            </>
        )
    }
}
