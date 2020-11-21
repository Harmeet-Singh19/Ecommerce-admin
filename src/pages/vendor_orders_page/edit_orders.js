import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import styles from './vendor_orders.module.css'


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

               {/* <TopBar history={this.props.history} />  */}
                {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                    </center>
                ) : (
                        <div className={styles.allOrders_v}>
                            <div className={styles.InfoCard} >
                                <div>
                                    
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
                                   
                                    

                                    <h3 style={{ backgroundColor: "#222222" }}>Ordered Books</h3>
                                    <div className="dishRow" style={{ backgroundColor: "#222222" }}>
                                        {this.state.books.map((book, index) => {
                                            return (
                                                <div className="dishCard" style={{ backgroundColor: "#222222" }} key={index}>
                                                    <div className="dishImage" style={{ backgroundColor: "#222222" }}>
                                                        {book.book.image.map((imag) => (
                                                            <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                                        ))}
                                                        
                                                    </div>
                                                    <h3 style={{ backgroundColor: "#222222" }}>{book.bookRef}</h3>
                                                    <h4 style={{ backgroundColor: "#222222" }}>Price : {`${book.book.name} x ${book.quantity} = ${(book.billedPrice) * (book.quantity)}`}</h4>
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