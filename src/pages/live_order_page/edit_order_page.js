import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";

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
                        <div className="orderPage" style={{color:"yellow"}}>

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

                            <div className="generateRow">
                                {this.state.orderStatus === "placed" ?
                                    (
                                        <>
                                            <button className="primaryButton" onClick={this.confirmOrder}>
                                                Confirm Order
                      </button>
                                            <div className="dataListRow">
                                                <form onSubmit={this.cancelOrder}>
                                                    <input type="text" list="cancelReason" placeholder="Reason to Cancel Order" onChange={e => this.setState({
                                                        cancelReason: e.target.value
                                                    })} required />
                                                    <datalist id="cancelReason">
                                                        <option value="Raw Materials not available">Raw Materials not available</option>
                                                        <option value="Other Reason">Other Reason</option>
                                                    </datalist>
                                                    <button className="primaryButton">
                                                        Cancel Order
                          </button>
                                                </form>
                                            </div>
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

                                        {/* {this.state.assignDelivery === "" ? (
                                            <div className="dataListRow">
                                                <form onSubmit={this.assignDeliveryTo}>
                                                    <input type="text" list="assignDelivery" placeholder="Select person to deliver" onChange={async (e) => {
                                                        let val = e.target.value;
                                                        // console.log(val.split("-")[1])
                                                        await this.setState({ courier: val.split("-")[1] })
                                                        console.log(this.state.courier)
                                                    }} required />
                                                    <datalist id="assignDelivery">
                                                        {this.state.deliveryPerson.map((person, index) => {
                                                            if (person.roles.includes("delivery")) {
                                                                return (
                                                                    <option key={index} value={`${person.name}-${person._id}`}>{person.name}</option>
                                                                )
                                                            }
                                                        })}
                                                    </datalist>
                                                    <button className="primaryButton">
                                                        Assign Delivery
                          </button>
                                                </form>
                                            </div>
                                        ) : (<> <h3>Delivery Assigned to {this.state.assignDelivery.name}</h3>

                                            <button className="primaryButton" onClick={this.orderOutforDelivery}>
                                                Mark out for Delivery
                        </button>
                                        </>)} */}
                                    </> : (<> </>)
                                }

                                {/* {this.state.orderStatus === "out_for_delivery" ?
                                    <h3>Delivery Assigned to {this.state.assignDelivery.name}</h3>
                                    : <> </>
                                } */}
                            </div>

                            <h3>Ordered Books</h3>
                            <div className="dishRow">
                                {this.state.books.map((book, index) => {
                                    return (
                                        <div className="dishCard" key={index}>
                                            <div className="dishImage">
                                                {book.book.image.map((imag) => (
                                                    <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                                ))}
                                                {/* <img src={book.bookId.image} alt="No Image Uploaded" /> */}
                                            </div>
                                            <h3>{book.bookRef}</h3>
                                            <h4>Price : {`${book.book.name} x ${book.quantity} = ${(book.billedPrice) * (book.quantity)}`}</h4>
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

export default EditLiveOrderPage;