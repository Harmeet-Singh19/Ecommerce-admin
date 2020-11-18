import React, { useEffect, useState } from "react";
// import "./order_pages.css";
// import "./toggleLive.css"
import doRequest from "../../utils/requestHooks";

import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";
// import io from "socket.io-client";
import data2 from '../../config'

export default ({ history }) => {
    const [data, setdata] = useState({})
    const [isLoading, setisLoading] = useState(false)
    // const [accepting, setaccepting] = useState(false)
    const [restaurandId, setrestaurantId] = useState("")

    console.dir(data);

    let getOrders = async () => {
       

        await doRequest({
            url: `/admin/order/live/orders`,
            method: "get",
            onSuccess: (data) => {
                setdata({ ...data })
                 console.log('hello')
                // console.log(DateString(data.placedAt))
                setisLoading(false)
            },
            onError: (err) => {
                alert(err)
                setisLoading(false)
            },
            noToken: () => history.push("/login")
        });

    }

    useEffect(async ()=>{
        await getOrders()

    },[])
    

    return (
        <>
            
            {isLoading ?
                (<center>
                    <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                </center>)
                : (<div className="allOrders">

                    {/* <h2>Accepting Live Orders</h2>
                    <label className="switch">
                        <input type="checkbox" checked={accepting} onChange={e => {
                            confirmStatus(e.target.checked)
                        }} />
                        <span className="slider round"></span>
                    </label> */}

                    <h2>Placed Orders</h2>
                    <div className="typeRow placed">
                        {data.placed.map((order, index) => {
                            console.log(order)
                            return (
                                <div className="card h-300" style={{ maxHeight: "300px", minWidth: "300px", overflowY: "scroll" }} key={index}>
                                    <p>OrderId: <span>{order.orderId}</span></p>
                                    <p>Placed At: <span>{DateString(order.placedAt)}</span></p>
                                    <p>Placed By: <span>{order.userId.name}</span></p>
                                    <p>Phone Number: <span>{order.userId.phone}</span></p>
                                    <p>Address: <span>{order.address.address}</span></p>
                                    <div className="edit" onClick={() => history.push(`/liveorders/${order._id}`)}>
                                        <FaPencilAlt className="icon" />
                                    </div>
                                    <p>Books: </p>
                                    <>{order.dishes.map((book, index) => {
                                        return (
                                            <li key={index}>{book.bookId.name} x {book.quantity}</li>
                                        )
                                    })}</>
                                </div>
                            )
                        })}
                    </div>
                    <h2>Confirmed Orders</h2>
                    <div className="typeRow confirmed">
                        {data.confirmed.map((order, index) => {
                            return (
                                <div className="card" style={{ maxHeight: "300px", minWidth: "300px", overflowY: "scroll" }} key={index}>
                                    <p>OrderId: <span>{order.orderId}</span></p>
                                    <p>Placed At: <span>{DateString(order.placedAt)}</span></p>
                                    <p>Placed By: <span>{order.userId.name}</span></p>
                                    <p>Phone Number: <span>{order.userId.phone}</span></p>
                                    <p>Address: <span>{order.address.address}</span></p>
                                    <div className="edit" onClick={() => history.push(`/liveorders/${order._id}`)}>
                                        <FaPencilAlt className="icon" />
                                    </div>
                                    <p>Books: </p>
                                    <>{order.dishes.map((book, index) => {
                                        return (
                                            <li key={index}>{book.bookId.name} x {book.quantity}</li>
                                        )
                                    })}</>
                                </div>
                            )
                        })}
                    </div>
                    <h2>Orders Out for Delivery</h2>
                    <div className="typeRow out_for_delivery">
                        {data.out_for_delivery.map((order, index) => {
                            return (
                                <div className="card" style={{ maxHeight: "300px", minWidth: "300px", overflowY: "scroll" }} key={index}>
                                    <p>OrderId: <span>{order.orderId}</span></p>
                                    <p>Placed At: <span>{DateString(order.placedAt)}</span></p>
                                    <p>Placed By: <span>{order.userId.name}</span></p>
                                    <p>Phone Number: <span>{order.userId.phone}</span></p>
                                    <p>Address: <span>{order.address.address}</span></p>
                                    <div className="edit" onClick={() => history.push(`/liveorders/${order._id}`)}>
                                        <FaPencilAlt className="icon" />
                                    </div>
                                    <p>Books: </p>
                                    <>{order.dishes.map((book, index) => {
                                        return (
                                            <li key={index}>{book.bookId.name} x {book.quantity}</li>
                                        )
                                    })}</>
                                </div>
                            )
                        })}
                    </div>
                </div>
                )
            }
        </>
    )
}