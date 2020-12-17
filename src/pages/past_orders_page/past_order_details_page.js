import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import styles from './past_orders_page.module.css'


import Loader from "react-loader-spinner";
import DateString from "../../utils/dateUtil";

class EditOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: "confirmed",
            isLoading: true
        }
    }

    updateStatus = async (e) => {
        
        await doRequest({
            url: `/admin/order/${this.props.match.params.id}`,
            method: "put",
            body: { orderStatus: this.state.orderStatus },
            onSuccess: () => this.props.history.push("/orderhistory"),
            onError: (err) => { alert(err) },
            noToken: () => this.props.history.push("/login")
        });
    }


    componentDidMount = async () => {
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
        await doRequest({
            url: `/admin/order/${this.props.match.params.id}`,
            method: "get",
            onSuccess: async (data) => {
                delete data.__v;
                await this.setState({ ...data, isLoading: false })

            },
            onError: (err) => { alert(err) },
            noToken: () => this.props.history.push("/login")
        });
    }

    componentDidUpdate = () => {
        console.log(this.state)
    }

    refundOrder = async () => {
        await this.setState({ orderStatus: "refunded" })
        this.updateStatus();
    }

    render() {
        return (
            <>
                
                {/* <TopBar history={this.props.history} /> */}
                {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                    </center>
                ) : (
                        <div className={styles.allOrders_v}>
                            <div className={styles.InfoCard} >
                                <div>
                                    {/* detailsRow */}
                                    <div className={styles.typeCol}>
                                        <div className={styles.typeRow}>
                                            <h2>User Details</h2>
                                            <p>Name: <span>{this.state.userId.name}</span></p>
                                            <p>Phone Number: <span>{this.state.address.phone}</span></p>
                                            <p>Email: <span>{this.state.userId.email}</span></p>

                                        </div>
                                        <div className={styles.typeRow}>
                                            <h2>Order Details</h2>
                                            
                                            <p>Delivery Address: <span>{this.state.address.address + ' , ' + this.state.address.city + ' , ' + this.state.address.state + ' , ' + this.state.address.pincode}</span></p>
                                            <p>Order Placed on: <span>{DateString(this.state.placedAt)}</span></p>
                                            <p>Order Status: <span>{this.state.orderStatus}</span></p>
                                        </div>
                                    </div>
                                    {/* generateRow */}
                                    <div className={styles.buttonCont}>
                                        {this.state.orderStatus === "cancelled" ?
                                            (
                                                <>
                                                    <button className={styles.standardButton} onClick={this.refundOrder}>
                                                        Refund Order

                                                    </button>
                                                    
                                                    
                                                    
                                                </>
                                            ) : (<></>)}

                                        
                                    </div>

                                    <h3 style={{ backgroundColor: "#222222", textAlign: "center", margin: "10px 0", fontSize: "18px" }}>Ordered Books</h3>
                                    <div className={styles.typeCol} style={{ backgroundColor: "#222222" }}>
                                        {this.state.books.map((book, index) => {
                                            return (
                                                <div style={{
                                                    backgroundColor: "#222222", flex: 1, minWidth: "500px", border: "0px solid white", margin: "10px 10px", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center",
                                                    border: "0px solid white", padding: "20px 0"
                                                }} key={index}>
                                                    <div className="dishImage" style={{ backgroundColor: "#222222" }}>
                                                        {book.book.image.map((imag) => (
                                                            <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                                        ))}
                                                        {/* <img src={book.bookId.image} alt="No Image Uploaded" /> */}
                                                    </div>
                                                    <h3 style={{ backgroundColor: "#222222" }}>{book.book.name}</h3>
                                                    <h4 style={{ backgroundColor: "#222222" }}>Price : {`${book.billedPrice} x ${book.quantity} = ${(book.billedPrice) * (book.quantity)}`}</h4>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </>
        );
    }
}

export default EditOrderPage;