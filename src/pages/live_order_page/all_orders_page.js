import React, { useEffect, useState } from "react";
// import "./order_pages.css";
// import "./toggleLive.css"
import doRequest from "../../utils/requestHooks";

import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";
// import io from "socket.io-client";
import data2 from '../../config'

 // eslint-disable-next-line
export default ({ history }) => {
    const [confirmed,setconfirmed]=useState([])
    const [placed,setplaced]=useState([])
    const [outford,setoutford]=useState([])
    const [isLoading, setisLoading] = useState(false)


   // console.dir(data);

    let getOrders = async () => {
       

        await doRequest({
            url: `/admin/order/live/orders`,
            method: "get",
            onSuccess: async(data) => {
                await setplaced(data.placed) 
                 
                // console.log(DateString(data.placedAt))
                console.log(data.placed)
                await setplaced(data.placed) 
                await setconfirmed(data.confirmed)
                await setoutford(data.out_for_delivery)
                console.log(placed)
                setisLoading(false)
            },
            onError: (err) => {
                alert(err)
                setisLoading(false)
            },
            noToken: () => history.push("/login")
        });

    }

    useEffect(() => { setisLoading(true); getOrders() }, [])
    useEffect(() => { console.log(placed) }, [placed])
    

    return (
        <>
            
            {isLoading ?
                (<center>
                    <Loader type='ThreeDots' color='yellow' height={150} width={150} />
                </center>)
                : (<div className="allOrders" style={{color:"yellow"}}>

                    {/* <h2>Accepting Live Orders</h2>
                    <label className="switch">
                        <input type="checkbox" checked={accepting} onChange={e => {
                            confirmStatus(e.target.checked)
                        }} />
                        <span className="slider round"></span>
                    </label> */}

                    <h2>Placed Orders</h2>
                    <div className="typeRow placed">
                        {placed.map((order, index) => {
                            //console.log(order)
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
                                    <>{order.books.map((book, index) => {
                                        return (
                                            <li key={index}>{book.book.name} x {book.quantity}</li>
                                        )
                                    })}</>
                                </div>
                            )
                        })}
                    </div>
                    <h2>Confirmed Orders</h2>
                    <div className="typeRow confirmed">
                        {confirmed.map((order, index) => {
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
                                    <>{order.books.map((book, index) => {
                                        return (
                                            <li key={index}>{book.book.name} x {book.quantity}</li>
                                        )
                                    })}</>
                                </div>
                            )
                        })}
                    </div>
                    <h2>Orders Out for Delivery</h2>
                    <div className="typeRow out_for_delivery">
                        {outford.map((order, index) => {
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
                                    <>{order.books.map((book, index) => {
                                        return (
                                            <li key={index}>{book.book.name} x {book.quantity}</li>
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