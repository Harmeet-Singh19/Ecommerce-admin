import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import styles from './edit_order_page.module.css'

import Loader from "react-loader-spinner";
import DateString from "../../utils/dateUtil";


class EditLiveOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: "confirmed",
            isLoading: true,
            cancelReason: "",
            assignDelivery: "",
            deliveryPerson: [],
            courier: "",
            unDeliveredReason: "",
        }
    }

    updateStatus = async () => {
        // e.preventDefault();
        await doRequest({
            url: `/admin/order/${this.props.match.params.id}`,
            method: "put",
            body: { orderStatus: this.state.orderStatus },
            onSuccess: () => this.props.history.goBack(),
            onError: (err) => { alert(err) },
        });
    }

    confirmOrder = async () => {
        await this.setState({ orderStatus: "confirmed" })
        this.updateStatus();
    }

    

    cancelOrder = async (e) => {
        e.preventDefault();
        await this.setState({ orderStatus: "cancelled" })
        this.updateStatus();
    }

    orderOutforDelivery = async () => {
        await this.setState({ orderStatus: "out_for_delivery" })
        this.updateStatus();
    }

    orderDelivered = async () => {
        await this.setState({orderStatus:"delivered"})
        this.updateStatus();
    }



    componentDidMount = async () => {
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

    render() {

        return (
            <>
               
                {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                    </center>
                ) : (   
                        <div className={styles.allOrders_v}>
                        <div className={styles.InfoCard} >
                                {/* detailsRow */}
                                <div className={styles.typeRow}>
                                    <div className={styles.typeRow}>
                                    <h2>User Details</h2>
                                        <p>Name: <span>{this.state.userId.name}</span></p>
                                        <p>Phone Number: <span>{this.state.userId.phone}</span></p>
                                    <p>Email: <span>{this.state.userId.email}</span></p>

                                </div>
                                    <div className={styles.typeRow}>
                                    <h2>Order Details</h2>
                                        <p>Order Type : <span>{this.state.orderType}</span></p>
                                        <p>Delivery Address: <span>{this.state.address.address}</span></p>
                                        <p>Order Placed on: <span>{DateString(this.state.placedAt)}</span></p>
                                        <p>Order Status: <span>{this.state.orderStatus}</span></p>
                                </div>
                            </div>
                            {/* generateRow */}
                            <div className={styles.buttonCont}>
                                {this.state.orderStatus === "placed" ?
                                    (
                                        <>
                                            <button className={styles.standardButton} onClick={this.confirmOrder}>
                                                Confirm Order

                                                {/* list="cancelReason" */}
                                                </button>             
                                                {/* dataListRow */}
                                            {/* <div className=""> */}
                                                <form onSubmit={this.cancelOrder}>
                                                    <input type="text" style={{ width: "70%",height:"20px",margin:"10px 15%",color:"white" }} placeholder="Reason to Cancel Order" onChange={e => this.setState({
                                                        cancelReason: e.target.value
                                                    })} required />
                                                    <br></br>
                                                    {/* <datalist id="cancelReason">
                                                        <option value="Raw Materials not available">Raw Materials not available</option>
                                                        <option value="Other Reason">Other Reason</option>
                                                    </datalist> */}
                                                    <div style={{display:"flex", alignContent:"center", alignItems:"center",backgroundColor:"black"}}>
                                                    <button className={styles.standardButton} style={{ margin: "0 45%" }}>
                                                        Cancel Order
                          </button>
                                                    </div>
                                                </form>
                                            {/* </div> */}
                                        </>
                                    ) : (<></>)}

                                {this.state.orderStatus === "confirmed" ?
                                    <>
                                        {                    /*<a className="secButton" href={`/packageslip/${this.props.match.params.id}`} target="__blank">
                      Generate Packing Slip
                    </a>*/}

                                        <a className="secButton" href={`/invoice/${this.props.match.params.id}`} target="__blank">
                                            Generate Invoice
                                        </a>

                                        <button className={styles.standardButton} onClick={this.orderOutforDelivery}>
                                            Out for delivery

                                                {/* list="cancelReason" */}
                                        </button>
                                        {/* dataListRow */}
                                        <div className="">
                                            <form onSubmit={this.cancelOrder}>
                                                    <input type="text" style={{ width: "70%",height:"20px",margin:"10px 15%",color:"white" }} placeholder="Reason to Cancel Order" onChange={e => this.setState({
                                                    cancelReason: e.target.value
                                                    
                                                })} required />
                                                {/* <datalist id="cancelReason">
                                                        <option value="Raw Materials not available">Raw Materials not available</option>
                                                        <option value="Other Reason">Other Reason</option>
                                                    </datalist> */}
                                                    <div style={{display:"flex", alignContent:"center", alignItems:"center",backgroundColor:"black"}}>
                                                <button className={styles.standardButton} style={{margin:"0 45%"}}>
                                                    Cancel Order

                          </button>
                          </div>
                                            </form>
                                        </div>                                        

                                    </> : (<> </>)
                                }


                                {this.state.orderStatus === "out_for_delivery" ?
                                    <>
                                        {                    /*<a className="secButton" href={`/packageslip/${this.props.match.params.id}`} target="__blank">
                      Generate Packing Slip
                    </a>*/}

                                        <a className="secButton" href={`/invoice/${this.props.match.params.id}`} target="__blank">
                                            Generate Invoice
                                        </a>

                                        <button className={styles.standardButton} onClick={this.orderDelivered}>
                                            Order Delivered

                                                {/* list="cancelReason" */}
                                        </button>
                                        {/* dataListRow */}
                                        <div className="">
                                            <form onSubmit={this.cancelOrder}>
                                                    <input type="text" style={{ width: "70%",height:"20px",margin:"10px 15%",color:"white" }} placeholder="Reason to Cancel Order" onChange={e => this.setState({
                                                    cancelReason: e.target.value
                                                })} required />
                                                {/* <datalist id="cancelReason">
                                                        <option value="Raw Materials not available">Raw Materials not available</option>
                                                        <option value="Other Reason">Other Reason</option>
                                                    </datalist> */}
                                                    <div style={{display:"flex", alignContent:"center", alignItems:"center",backgroundColor:"black"}}>
                                                        <button className={styles.standardButton} >
                                                            Cancel Order
                          </button>

                                                    </div>
                                                    
                                            </form>
                                        </div>

                                    </> : (<> </>)
                                }


                                {/* {this.state.orderStatus === "out_for_delivery" ?
                                    <h3>Delivery Assigned to {this.state.assignDelivery.name}</h3>
                                    : <> </>
                                } */}
                            </div>

                                <h3 style={{ backgroundColor: "black" }}>Ordered Books</h3>
                                <div className="dishRow" style={{backgroundColor:"black"}}>
                                {this.state.books.map((book, index) => {
                                    return (
                                        <div className="dishCard" style={{ backgroundColor: "black" }} key={index}>
                                            <div className="dishImage" style={{ backgroundColor: "black" }}>
                                                {book.book.image.map((imag) => (
                                                    <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                                ))}
                                                {/* <img src={book.bookId.image} alt="No Image Uploaded" /> */}
                                            </div>
                                            <h3 style={{ backgroundColor: "black" }}>{book.bookRef}</h3>
                                            <h4 style={{ backgroundColor: "black" }}>Price : {`${book.book.name} x ${book.quantity} = ${(book.billedPrice) * (book.quantity)}`}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        </div>
                    )}
            </>
        );
    }
}

export default EditLiveOrderPage;