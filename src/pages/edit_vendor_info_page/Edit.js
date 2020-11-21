import React, { Component } from 'react'
import './EditAdmin.css'
import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";
import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";
export default class editAdmin extends Component {

    state={
        data:{
        name:"",
        email:"",
        password:"",
        phone:0,
        address:"",
        isVendor:"false",
        isStudentVendor:"false"
        },
       id:""
    }
    editAdmin = async e => {
        
        e.preventDefault();
        const { phone, email, password, name,address,isVendor,isStudentVendor } = this.state.data;
        await doRequest({
          url: `/admin/auth/admin/${this.state.id}`,
          method: "put",
          body:{ phone, email, password, name,address,isVendor,isStudentVendor },
          onSuccess: () => alert('Info updated succesfully!'),
          onError: (err) => { alert(err) },
        });
      };
   
      componentDidMount=async()=>{
        await doRequest({
            url: "/admin/auth/verify",
            method: "get",
            onSuccess: async (data) => {
               
               await this.setState({
                   ...this.state,
                   id:data.admin._id
               })
               console.log(this.state)
            },
          });
        await doRequest({
            url: `/admin/auth/admin/${this.state.id}`,
            method: "get",
            onSuccess: async (data) => {
              await this.setState({ ...this.state,
            data:data });
             
            },
            onError: (err) => { alert(err) },
            noToken: () => this.props.history.push("/login")
          });
         
      }
    render() {
        return (
            <>
             <TopBar {...this.props} />
            <div className="add-admin">
                
                <h1 className = "welcome-heading">Update Your Info</h1>

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
                                                 <input type="text" placeholder="Enter name "
                                                            className="form-control"
                                                            onChange={e => this.setState({ data:{...this.state.data,name: e.target.value }})}
                                                            value={this.state.data.name}
                                                            required/>
                                        </label>

                                        <label style={{width:"100%"}}>
                                            Email:
                                                 <input type="email" placeholder="Enter verified email"
                                                            className="form-control"
                                                            onChange={e => this.setState({  data:{...this.state.data,email: e.target.value } })}
                                                            value={this.state.data.email}
                                                            disabled={true}
                                                            required/>
                                        </label>
                                
                                    <br />

                                    <label style={{width:"100%"}}>
                                        Phone:
                                            <input type="Number" placeholder="Enter number "
                                                className="form-control"
                                                onChange={e => this.setState({  data:{...this.state.data,phone: e.target.value }})}
                                                value={this.state.data.phone}
                                                 required/>
                                        </label>

                                    <label style={{width:"100%"}}>
                                        Address:
                                            <input type="text" placeholder="Enter Address "
                                                            className="form-control"
                                                            onChange={e => this.setState({  data:{...this.state.data,address: e.target.value } })}
                                                            value={this.state.data.address}
                                                required/>
                                    </label>

                                    <br />
                                    <div className = "user_login_button">
                                    <input className= "login_tab_button" type="button" value="Update"
                                    onClick={(e)=>this.editAdmin(e)}
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
