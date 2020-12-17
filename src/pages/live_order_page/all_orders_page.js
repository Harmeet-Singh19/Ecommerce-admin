import React, { useEffect, useState } from "react";
 import styles from "./order_page.module.css";
 import "./toggleLive.module.css"
import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";
import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";
// import io from "socket.io-client";
import data2 from '../../config'
import design from '../past_orders_page/past_orders_page.module.css'

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

    useEffect(async() => { 
        await doRequest({
            url: "/admin/auth/verify",
            method: "get",
            onSuccess: async (data) => {
               
             if(data.isVendor===true){
                 alert('Not authorized')
                 history.push('/')
             }
            },
          });
        setisLoading(true); getOrders() }, [])
    useEffect(async() => {
        let token = await localStorage.getItem('token')
            console.log(token)
            if (token !== null) {
                
            } else {
                //should be restricted
                history.push('/login')
            }
       
      }, [])
    useEffect(() => { console.log(placed) }, [placed])
    

    return (
        <>
            <TopBar history={history}/>
            {isLoading ?
                (<center>
                    <Loader type='ThreeDots' color='yellow' height={150} width={150} />
                </center>)
                : (<div className={styles.allOrders_v} >

                   

                    <div className={design.table_container}  >
                        <h1>Placed Orders</h1>
                        <table >
                            <thead>
                                <tr>
                                    <th>OrderID</th>

                                    <th>Order Status</th>
                                    <th>Placed Date</th>
                                    <th>Name</th>
                                    <th>Phone No.</th>
                                    <th>Invoice value</th>
                                    <th className="edit">Edit</th>
                                </tr>
                            </thead>
                            <tbody >
                                {placed.map((order, index) => {

                                    let total = 0;
                                    for (let ind = 0; ind < order.books.length; ind++) {
                                        total += order.books[ind].book.price * order.books[ind].quantity
                                    }
                                    return (<tr key={index}>
                                        <td><span>{order.orderId}</span></td>

                                        <td>{order.orderStatus}</td>
                                        <td>{DateString(order.placedAt)}</td>
                                        <td>{order.userId.name}</td>
                                        <td>{order.userId.phone}</td>
                                        <td>{total}</td>
                                        <td className="edit" onClick={() => history.push(`/liveorders/${order._id}`)}>
                                            <FaPencilAlt className="icon" />
                                        </td>
                                    </tr>)

                                })}
                            </tbody>
                        </table>


                    </div>
                    <div className={design.table_container}  >
                        <h1>Confirmed Orders</h1>
                        <table >
                            <thead>
                                <tr>
                                    <th>OrderID</th>

                                    <th>Order Status</th>
                                    <th>Placed Date</th>
                                    <th>Name</th>
                                    <th>Phone No.</th>
                                    <th>Invoice value</th>
                                    <th className="edit">Edit</th>
                                </tr>
                            </thead>
                            <tbody >
                                {confirmed.map((order, index) => {

                                    let total = 0;
                                    for (let ind = 0; ind < order.books.length; ind++) {
                                        total += order.books[ind].book.price * order.books[ind].quantity
                                    }
                                    return (<tr key={index}>
                                        <td><span>{order.orderId}</span></td>

                                        <td>{order.orderStatus}</td>
                                        <td>{DateString(order.placedAt)}</td>
                                        <td>{order.userId.name}</td>
                                        <td>{order.userId.phone}</td>
                                        <td>{total}</td>
                                        <td className="edit" onClick={() => history.push(`/liveorders/${order._id}`)}>
                                            <FaPencilAlt className="icon" />
                                        </td>
                                    </tr>)

                                })}
                            </tbody>
                        </table>


                    </div>

                    <div className={design.table_container}  >
                        <h1>Orders Out For Delivery</h1>
                        <table >
                            <thead>
                                <tr>
                                    <th>OrderID</th>

                                    <th>Order Status</th>
                                    <th>Placed Date</th>
                                    <th>Name</th>
                                    <th>Phone No.</th>
                                    <th>Invoice value</th>
                                    <th className="edit">Edit</th>
                                </tr>
                            </thead>
                            <tbody >
                                {outford.map((order, index) => {

                                    let total = 0;
                                    for (let ind = 0; ind < order.books.length; ind++) {
                                        total += order.books[ind].book.price * order.books[ind].quantity
                                    }
                                    return (<tr key={index}>
                                        <td><span>{order.orderId}</span></td>

                                        <td>{order.orderStatus}</td>
                                        <td>{DateString(order.placedAt)}</td>
                                        <td>{order.userId.name}</td>
                                        <td>{order.userId.phone}</td>
                                        <td>{total}</td>
                                        <td className="edit" onClick={() => history.push(`/liveorders/${order._id}`)}>
                                            <FaPencilAlt className="icon" />
                                        </td>
                                    </tr>)

                                })}
                            </tbody>
                        </table>


                    </div>
                    
                    
                </div>
                )
            }
        </>
    )
}