import React, { useRef, useState, useEffect } from "react";
import doRequest from "../../utils/requestHooks";
import styles from './past_orders_page.module.css'
import { FaPencilAlt } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";




export default ({ history }) => {
    const [data, setdata] = useState([])
    const [fdata, setfdata] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [from, setfrom] = useState("")
    const [to, setto] = useState("")
    const [filterStatus, setfilterStatus] = useState("")
    const [pgno, setPgno] = useState(0)

    let handlePageClick = async () => {

        await doRequest({
            url: `/admin/order/history/orders`,
            method: "get",
            onSuccess: (data) => {
                setdata([...data])
                console.log(data)
                setisLoading(false)
                return JSON.parse(data)
            },
            onError: (err) => {
                alert(err)
                setisLoading(false)
            },
            noToken: () => history.push("/login")
        });
        await doRequest({
            url: `/admin/order/history/orders?`,
            method: "get",
            onSuccess: (data) => {
                setfdata([...data])
                // console.log(data)
                setisLoading(false)
                return JSON.parse(data)
            },
            onError: (err) => {
                alert(err)
                setisLoading(false)
            },
            noToken: () => history.push("/login")
        });

    }

    useEffect(() => {

        handlePageClick()

    }, [pgno]);



    let getFilteredByDate = async e => {
        e.preventDefault();
        let url = `/admin/order/history/${from}/${to}`
        if (to === "")
            url = `/admin/order/history/${from}/${from}`
        await doRequest({
            url,
            method: "get",
            onSuccess: (data) => {
                setdata([...data])
            },
            onError: (err) => {
                alert(err)
                setisLoading(false)
            },
            noToken: () => history.push("/login")
        });
    }
    let func = () => {
        console.log(pgno)

    }
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(fdata.length / 10); i++) {
        pageNumbers.push(i);
    }

    //setdata(data.slice(indexOfFirstPost,indexOfLastPost))
    //console.log(currentdata)
    return (
        <>
            
            {isLoading ?
                (<center>
                    <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                </center>)
                : (<div className="allOrders">
                    <form className="rowForm" onSubmit={(e) => { handlePageClick() }}>
                        <div>
                            <span style={{ fontWeight: "600" }}>From: </span>
                            <input type="date" onChange={e => setfrom(e.target.value)} />
                        </div>
                        <div>
                            <span style={{ fontWeight: "600" }}>To: </span>
                            <input type="date" onChange={e => setto(e.target.value)} />
                        </div>
                        <button className="primaryButton">
                            Get Orders
            </button>
                        <div>
                            <span style={{ fontWeight: "600" }}>Status: </span>
                            <select value={filterStatus} className="secButton" style={{ padding: "5px" }} onChange={e => setfilterStatus(e.target.value)}>
                                <option value="">All</option>
                                <option value="delivered">Delivered</option>
                                <option value="undelivered">UnDelivered</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="refunded">refunded</option>
                            </select>
                        </div>
                        <div className="primaryButton" style={{ fontSize: "1.5em" }} onClick={async () => { setfilterStatus(""); await handlePageClick() }}>
                            <FiRefreshCcw />
                        </div>
                    </form>
                    <div style={{ overflowX: "auto", width: "100vw" }} >
                        <table >
                            <thead>
                                <tr>
                                    <th>OrderID</th>
                                    <th>Type</th>
                                    <th>Order Status</th>
                                    <th>Placed Date</th>
                                    <th>Name</th>
                                    <th>Phone No.</th>
                                    <th>Invoice value</th>
                                    <th className="edit">Edit</th>
                                </tr>
                            </thead>
                            <tbody >
                                {data.map((order, index) => {
                                    if (filterStatus === order.orderStatus || (filterStatus === "")) {
                                        let total = 0;
                                        for (let ind = 0; ind < order.dishes.length; ind++) {
                                            total += order.dishes[ind].dishId.price * order.dishes[ind].quantity
                                        }
                                        return (<tr key={index}>
                                            <td>{order.orderId}</td>
                                            <td>{order.orderType}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>{DateString(order.placedAt)}</td>
                                            <td>{order.userId.name}</td>
                                            <td>{order.userId.phone}</td>
                                            <td>{total}</td>
                                            <td className="edit" onClick={() => history.push(`/orderhistory/${order._id}`)}>
                                                <FaPencilAlt className="icon" />
                                            </td>
                                        </tr>)
                                    }
                                })}
                            </tbody>
                        </table>
                        {/* <nav>
                            <ul className="pagination">
                                {pageNumbers.map(number => (
                                    <li key={number} className="page-item">
                                        <a className="page-link" onClick={(e) => setPgno(number - 1)}>
                                            {number}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav> */}

                    </div>
                </div>
                )
            }
        </>
    )
 }