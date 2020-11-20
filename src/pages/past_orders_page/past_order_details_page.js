import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";

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
        e.preventDefault();
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

    render() {
        return (
            <>
                
                {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                    </center>
                ) : (
                        <div className="orderPage">
                            <form onSubmit={this.updateStatus}>
                                <div className="detailsRow">
                                    <div>
                                        <h2>User Details</h2>
                                        <p>Name: {this.state.userId.name}</p>
                                        <p>Phone Number: {this.state.userId.phone}</p>
                                        <p>Email: {this.state.userId.email}</p>

                                    </div>
                                    <div>
                                        <h2>Order Details</h2>
                                        <p>Order Type : {this.state.orderType}</p>
                                        <p>Delivery Address: {this.state.address.address}</p>
                                        <p>Order Placed on: {DateString(this.state.placedAt)}</p>
                                        <p>Order Status: {this.state.orderStatus}</p>
                                    </div>
                                </div>
                            </form>
                            {this.state.orderStatus === "undelivered" ? (
                                <button className="primaryButton">Refund</button>
                            ) : (<> </>)}
                            <h3>Ordered Dishes</h3>
                            <div className="dishRow">
                                {this.state.books.map((book, index) => {
                                    return (
                                        <div className="dishCard" key={index}>
                                            <div className="dishImage">
                                                <img src={book.book.image} alt="No Image Uploaded" />
                                            </div>
                                            <h3>{book.book.name}</h3>
                                            <h4>Price : {`${book.book.price} x ${book.quantity} = ${(book.book.price) * (book.quantity)}`}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
            </>
        );
    }
}

export default EditOrderPage;