import React, { useEffect, useState } from "react";
import styles from "./email_record_page.module.css";

import doRequest from "../../utils/requestHooks";
import TopBar from "../../components/Header/Header";

import Loader from "react-loader-spinner"


// eslint-disable-next-line
export default ({ history }) => {
    const [emails,setEmails]=useState([])
    const [isLoading, setisLoading] = useState(false)


    // console.dir(data);

    let getEmails = async () => {


        await doRequest({
            url: `/admin/email/`,
            method: "get",
            onSuccess: async (data) => {
                
                setEmails(data);

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
        setisLoading(true);getEmails();
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
                                    <th>Book</th>
                                    <th>Buyer Name</th>
                                    <th>Buyer Address</th>

                                </tr>
                            </thead>
                            <tbody>
                                 {emails.map((email, index) => {
                                    return (<tr key={index}>
                                        <td>{new Date(
                                                                    email.date
                                                                ).toLocaleDateString(
                                                                    "en-GB"
                                                                )}</td>
                                        <td>{email.seller.name}</td>
                                        <td>{email.book.name}x{email.bookQty}-{email.book.hand===1?'Fresh':'Used'}</td>
                                        <td>{email.buyerName}</td>
                                        <td>{email.buyerAddr}</td>
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