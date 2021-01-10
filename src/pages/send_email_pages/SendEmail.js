import React, { Component } from 'react'
import styles from './SendEmail.module.css'
import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";
import Loader from "react-loader-spinner"
export default class SendEmail extends Component {

    state={
        data:{
            seller:"",
            book:"",
            bookQty:0,
            buyerName:"",
            buyerAddr:"",
            buyerPhone:"",
        },
        vendors:[],
        books:[]
    }
    getSellers=async()=>{
        let vendors=[];
        await this.setState({ isLoading: true })
        await doRequest({
            url: `/admin/auth/all-vendors`,
            method: "get",
            onSuccess: (res) => {this.setState({
                ...this.state,
                vendors:res
            });
            this.setState({ isLoading: false })},
            onError: (err) => {
                this.setState({ isLoading: false })
                console.log(err)
                alert(err)
            },
        });
       // console.log(vendors)
        return vendors
    }
     getBooks = async() => {
        await this.setState({ isLoading: true })
        await doRequest({
            url: "/admin/book",
            method: "get",
            onSuccess: (data) => {
                this.setState({
                    ...this.state,
                    books:data
                });
                this.setState({ isLoading: false })
            },
    
        });
    }
    sendMail=async()=>{
        await this.setState({ isLoading: true })
        await doRequest({
            url: `/admin/email/send`,
            method: "post",
            body: { ...this.state.data, },
            onSuccess: () => this.props.history.goBack(),
            onError: (err) => {
                this.setState({ isLoading: false })
                alert(err)
                console.log(err)
            },
        });
    }
    
    componentDidMount=async()=>{
        await doRequest({
            url: "/admin/auth/verify",
            method: "get",
            onSuccess: async (data) => {
               
             if(data.isVendor===true){
                 alert('Not authorized')
                 this.props.history.push('/')
             }
            },
          });
        await this.getSellers();
        await this.getBooks();
    }
    render() {
        return (
            <>
             <TopBar {...this.props} />
             {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='yellow' height={250} width={250} />
                    </center>
                ):(
                  
            <div className={styles.send_email}>
                
                <h1 className = {styles.welcome_heading}>Send Email</h1>

                <div className={styles.send_email_main}>
                <div className={styles.row}>
                    <div className={styles.card} >
                        <div className={styles.card_body} style={{width:"80%"}}>
                            
                                    <div className="mt-3">
                                        <div className={styles.form}>
                                        <form style={{justifyContent:"center"}} >
                                            <label style={{width:"100%"}}>
                                                <p>Select vendor</p>
                                                <select required className="form-control" placeholder="of the course used in (uptil 3 for commerce and 4 for btech)" onChange={async(e) => {
                                            await this.setState({
                                                ...this.state,
                                                 data: {
                                                     ...this.state.data,
                                                     seller:e.target.value
                                                 }
                                             })
                                           await console.log(this.state.data.seller)
                                        }} >
                                          {this.state.vendors.map((vendor,index)=>(
                                              <option value={`${vendor._id}`}>{vendor.name},{vendor.address}</option>
                                          ))}
                                            
                                        </select>
                                            </label>
                                        
                                        <br/><br/>
                                        <label style={{width:"100%"}}>
                                                <p>Select Book</p>
                                                <select required className="form-control" placeholder="of the course used in (uptil 3 for commerce and 4 for btech)" onChange={async(e) => {
                                           await this.setState({
                                               ...this.state,
                                                data: {
                                                    ...this.state.data,
                                                    book:e.target.value
                                                }
                                            })
                                           await console.log(this.state.data.book)
                                        }} >
                                          {this.state.books.map((book,index)=>(
                                              <option value={`${book._id}`}>{book.name},{book.hand===1?'Fresh':'Used'}, Edition: {book.edition}</option>
                                          ))}
                                            
                                        </select>
                                            </label>

                                            <br/><br/>
                                            <label style={{width:"100%"}}>
                                                <p>Qty sold</p>
                                                <input type="text" placeholder="Enter Quantity "
                                                            className="form-control"
                                                            value={this.state.data.bookQty}
                                                            onChange={(e)=>  this.setState({
                                                                ...this.state,
                                                                 data: {
                                                                     ...this.state.data,
                                                                     bookQty:e.target.value
                                                                 }
                                                             })}
                                                required/>
                                            </label>
                                            <br/><br/>
                                            <label style={{width:"100%"}}>
                                        Name of Buyer:
                                            <input type="text" placeholder="Enter Name "
                                                            className="form-control"
                                                            value={this.state.data.buyerName}
                                                            onChange={(e)=>  this.setState({
                                                                ...this.state,
                                                                 data: {
                                                                     ...this.state.data,
                                                                     buyerName:e.target.value
                                                                 }
                                                             })}
                                                required/>
                                    </label>
                                    <br/><br/>
                                    <label style={{width:"100%"}}>
                                        Delivery Address of Buyer:
                                            <input type="text" placeholder="Enter Address "
                                                            className="form-control"
                                                            value={this.state.data.buyerAddr}
                                                            onChange={(e)=>  this.setState({
                                                                ...this.state,
                                                                 data: {
                                                                     ...this.state.data,
                                                                     buyerAddr:e.target.value
                                                                 }
                                                             })}
                                                required/>
                                    </label>

                                    <br />
                                    <label style={{width:"100%"}}>
                                        Phone Number of Buyer(from address):
                                            <input type="text" placeholder="Enter Number "
                                                            className="form-control"
                                                            value={this.state.data.buyerPhone}
                                                            onChange={(e)=>  this.setState({
                                                                ...this.state,
                                                                 data: {
                                                                     ...this.state.data,
                                                                     buyerPhone:e.target.value
                                                                 }
                                                             })}
                                                required/>
                                    </label>

                                    <br />
                                    <div className = "user_login_button">
                                    <input className= "login_tab_button" type="button" value="Send"
                                     onClick={()=>this.sendMail()}
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
            )
             
       }
       </>
        )
        
    }
}
