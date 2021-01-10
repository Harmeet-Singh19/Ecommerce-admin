import React, { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import Item from './Items'
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"

function Admin(props) {

    const [vendor, setVendor] = useState(false)
    const [isLoading, setisLoading] = useState(true)

    useEffect(async () => {
        let token = await localStorage.getItem('token')
        //  console.log(token)
        if (token !== null) {
            //   console.log(props)
        } else {
            //should be restricted
            props.history.push('/login')
        }
        await setisLoading(true)
        await doRequest({
            url: "/admin/auth/verify",
            method: "get",
            onSuccess: async (data) => {
                setVendor(data.admin.isVendor)
                await setisLoading(false)
            },
        });

    }, [])
    return (
        <>
            {
                isLoading === true ? (
                    <>
                        <center>
                            <Loader type='ThreeDots' color='yellow' height={250} width={250} />
                        </center>
                    </>
                ) : (

                        <div className={styles.admin_page}>
                            {
                                vendor ? (
                                    <>
                                        <h1 className={styles.admin_heading}>Welcome , Vendor </h1>

                                        <div className={styles.all_duties}>
                                            <div className={styles.duty_card} onClick={() => props.history.push('/vendor/info')}>
                                                <Item duty="Edit Your Info" ></Item>

                                            </div>
                                            <div className={styles.duty_card} onClick={() => props.history.push('/vendor/books')}>
                                                <Item duty="All Books" ></Item>

                                            </div>

                                            <div className={styles.duty_card} onClick={() => props.history.push('/vendor/add/books')}>
                                                <Item duty="Upload Books" ></Item>

                                            </div>



                                        </div>
                                    </>
                                ) : (
                                        <>
                                            <h1 className={styles.admin_heading}>Welcome , Admin </h1>

                                            <div className={styles.all_duties}>

                                                <div className={styles.duty_card} onClick={() => props.history.push('/add/books')}>
                                                    <Item duty="Upload Books" ></Item>

                                                </div>

                                                <div className={styles.duty_card} onClick={() => props.history.push('/books')}>
                                                    <Item duty="All Books" ></Item>

                                                </div>
                                                <div className={styles.duty_card} onClick={() => props.history.push('/admins')}>
                                                    <Item duty="All Admins" ></Item>

                                                </div>
                                                <div className={styles.duty_card} onClick={() => props.history.push('/add/admins')}>
                                                    <Item duty="Add new Admin/Vendor"></Item>

                                                </div>
                                                <div className={styles.duty_card} onClick={() => props.history.push('/getusers')}>
                                                    <Item duty="Get All Customers/Users" ></Item>

                                                </div>
                                                <div className={styles.duty_card} onClick={() => props.history.push('/liveorders')}>
                                                    <Item duty="Get Live Orders" ></Item>

                                                </div>
                                                <div className={styles.duty_card} onClick={() => props.history.push('/orderhistory')}>
                                                    <Item duty="Past Orders" ></Item>

                                                </div>

                                                <div className={styles.duty_card} onClick={() => props.history.push('/sendemail')}>
                                                    <Item duty="Send Email to Seller" ></Item>

                                                </div>

                                                <div className={styles.duty_card} onClick={() => props.history.push('/email/records')}>
                                                    <Item duty="Email Records" ></Item>

                                                </div>


                                            </div>
                                        </>
                                    )
                            }

                        </div>

                    )
            }
        </>
    )
}


export default (Admin);
