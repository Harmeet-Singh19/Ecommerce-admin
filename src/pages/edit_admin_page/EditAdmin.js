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
        books:[],
        booksd:[]
    }
    editAdmin = async e => {
        
        e.preventDefault();
        const { phone, email, password, name,address,isVendor,isStudentVendor } = this.state.data;
        await doRequest({
          url: `/admin/auth/admin/${this.props.match.params.id}`,
          method: "put",
          body:{ phone, email, password, name,address,isVendor,isStudentVendor },
          onSuccess: () => alert('Info updated succesfully!'),
          onError: (err) => { alert(err) },
        });
      };
      getAllBooks=async()=>{
        await doRequest({
            url: `/admin/book/vendor/${this.props.match.params.id}`,
            method: "get",
            onSuccess: (data) =>{this.setState({
                ...this.state,
                books:data
            });
        console.log(data)},
            onError: (err) => { alert(err) },
          });
      }
      getBookandOrderInfo=async(bookId)=>{
         
          //console.log(bookId)
        await doRequest({
            url: `/admin/order/book/${bookId}`,
            method: "get",
          
            onSuccess: (data) =>{ 
                let temp=this.state.booksd;
                temp[bookId]=data
                this.setState({
                ...this.state,
                booksd:temp
            });
            console.log(this.state.booksd)
        }
            
            ,
            onError: (err) => { alert(err) },
          });
          
        
      }
      componentDidMount=async()=>{
        await doRequest({
            url: `/admin/auth/admin/${this.props.match.params.id}`,
            method: "get",
            onSuccess: async (data) => {
              await this.setState({ ...this.state,
            data:data });
             
            },
            onError: (err) => { alert(err) },
            noToken: () => this.props.history.push("/login")
          });
          if(this.state.data.isVendor===true){
              await this.getAllBooks()
             
             await  this.state.books.map(async(book,index)=>{
             await this.getBookandOrderInfo(book._id)

              })
              
          }
      }
    render() {
        return (
            <>
             <TopBar {...this.props} />
            <div className="add-admin">
                
                <h1 className = "welcome-heading">Update Admin Info</h1>

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
                                        {(this.state.data.isVendor===false)?
                                      (  <h2>SuperAdmin</h2>):(<h2></h2>)}

                                      {(this.state.data.isVendor===true && this.state.data.isStudentVendor===false)?
                                      (  <h2>Normal Vendor</h2>):(<h2></h2>)}
                                      {(this.state.data.isVendor===true && this.state.data.isStudentVendor===true)?
                                      (  <h2>Student Vendor</h2>):(<h2></h2>)}

                                            </label>
                                        
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
        {(this.state.data.isVendor===true)&&
        
        <div className="vendor-info">
                {this.state.books.map((book,index)=>{
                    // this.getBookandOrderInfo(book._id)
                  //console.log(this.state.booksd)
                    return(
                    <div className="vendor-item" key={index}>
                     <div className="first-row">
                         <div className="vendor-book">
                             <h2>Book</h2>
                         <div className={"bookCard"} >
                                        <div className={"bookImage"}>
                                            {book.image.map((imag)=>(
                                                <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                            ))}
                                            
                                        </div>
                                        <h3>{book.name}</h3>
                                        <h4>Price : {book.price}</h4>
                                        <div className={"editBook"} onClick={() => { this.props.history.push(`/books/${book._id}`) }}>
                                            Edit
                    </div>
                                    </div>
                         </div>
                         <div className="count">
                         <h2>No of  Book  Ordered  succesfully</h2>
                      <h4>{this.state.booksd[book._id]!==undefined?(
                            `${this.state.booksd[book._id].data.usages[0]}`
                        ):(
                            ``
                        )}</h4>
                         </div>
                     </div>
                     <h2>Orders Having The book</h2>
                     <div className="second-row">
                        
                     {this.state.booksd[book._id]!==undefined?(
                           <>
                           {this.state.booksd[book._id].data.usages[1].map((order,index)=>(
                               <div className={"orderCard"} key={index}>
                               <p>OrderId: <span>{order.orderId}</span></p>
                               <p>Placed At: <span>{DateString(order.placedAt)}</span></p>
                               <p>Placed By:  <span>{order.userId.name}</span></p>
                               <p>Phone Number: <span>{order.userId.phone}</span></p>
                               <p>Address:  <span>{order.address.address}</span></p>
                               <div className={"editt"} onClick={() => this.props.history.push(`/liveorders/${order._id}`)}>
                                   <FaPencilAlt className="icon" />
                               </div>
                               <p>Books: </p>
                               <>{order.books.map((book, index) => {
                                   return (
                                       <li key={index}>{book.book.name} x {book.quantity}</li>
                                   )
                               })}</>
                           </div>
                           ))}
                           </>
                        ):(
                            ``
                        )}
                     
                     </div>

                    </div>
                )})}
        </div>
        }
            </div>
            </>
        )
    }
}
