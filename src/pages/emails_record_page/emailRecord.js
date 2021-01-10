import React, { useEffect, useState } from "react";
import styles from "./email_record_page.module.css";

import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";

import Loader from "react-loader-spinner"
import DateString from "../../utils/dateUtil";

import data2 from '../../config'


// eslint-disable-next-line
export default ({ history }) => {

    const [isLoading, setisLoading] = useState(false)


    // console.dir(data);

    let getOrders = async () => {


        await doRequest({
            url: `/admin/order/live/orders`,
            method: "get",
            onSuccess: async (data) => {

                setisLoading(false)
            },
            onError: (err) => {
                alert(err)
                setisLoading(false)
            },
            noToken: () => history.push("/login")
        });

    }

    useEffect(async () => {
        await doRequest({
            url: "/admin/auth/verify",
            method: "get",
            onSuccess: async (data) => {

                if (data.isVendor === true) {
                    alert('Not authorized')
                    history.push('/')
                }
            },
        });
        setisLoading(true); getOrders()
    }, [])
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
                : (<div className={styles.allOrders_v} >



                    <div style={{ overflowX: "auto", width: "100vw", color: "white" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Seller Name</th>
                                    <th>Buyer Name</th>
                                    <th>Buyer Address</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* {data.map((email, index) => {
                                    return (<tr key={index}>
                                        <td>{email.name}</td>
                                        <td>{email.email}</td>
                                        <td>{email.phone}</td>



                                    </tr>)
                                })} */}
                            </tbody>
                        </table>
                    </div>





                </div>
                )
            }
        </>
    )
} 