import React, { useEffect, useState } from "react";
import styles from './vendor_orders.module.css'
// import "./toggleLive.module.css"
import doRequest from "../../utils/requestHooks";

import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";
// import io from "socket.io-client";
import data2 from '../../config'
import TopBar from '../../components/Header/Header'

// eslint-disable-next-line
export default ({ history }) => {
    
    const [isLoading, setisLoading] = useState(false)
    const [dataa, setdata] = useState([])
    const[id,setid]=useState("")
    const [count,setcount]=useState(0)


    // console.dir(data);

    let getOrders = async (id) => {

        await doRequest({
            url: `/admin/order/vendor/${id}`,
            method: "get",
            onSuccess: async (data) => {

                console.log(data)
                setcount(data.data.usages[0])
                setdata(data.data.usages[1])
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
        let vid="";
         await doRequest({
        url: "/admin/auth/verify",
        method: "get",
        onSuccess: async (data) => {
           
          vid=data.admin._id
          console.log(vid)
        },
      });
      setisLoading(true); 
      getOrders(vid) }, [])
    useEffect(async () => {
        let token = await localStorage.getItem('token')
        console.log(token)
        if (token !== null) {

        } else {
            //should be restricted
            history.push('/login')
        }

    }, [])



    return (
        <>
            <TopBar history={history} />
            {isLoading ?
                (<center>
                    <Loader type='ThreeDots' color='yellow' height={150} width={150} />
                </center>)
                : (
                    <div className={styles.table_container} style={{color:"yellow"}}  >
                        <h1>Past Orders</h1>
                        <table >
                            <thead>
                                <tr>
                                    <th>OrderID</th>

                                    <th>Order Status</th>
                                    <th>Placed Date</th>
                                    <th>Name</th>
                                    <th>Phone No.</th>
                                    <th>Invoice value</th>
                                    <th className="edit">Details</th>
                                </tr>
                            </thead>
                            <tbody >
                                {dataa.map((order, index) => {

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
                                        <td className="edit" onClick={() => history.push(`/vendor/orders/${order._id}`)}>
                                            <FaPencilAlt className="icon" />
                                        </td>
                                    </tr>)

                                })}
                            </tbody>
                        </table>


                    </div>
                )
            }
        </>
    )
}