import React, { useEffect, useState } from "react";
import doRequest from "../../utils/requestHooks";
import styles from './GetUser.module.css'
import Loader from "react-loader-spinner"
import data2 from '../../config'
import Topbar from '../../components/Header/Header'

// eslint-disable-next-line
export default ({ history }) => {
    const [data, setdata] = useState([])
    const [isLoading, setisLoading] = useState(true)


    let getUsers = async () => {
        await doRequest({
          url: `/admin/user/`,
          method: "get",
          onSuccess: (data) => {
            setdata([...data])
            setisLoading(false)
          },
          onError: (err) => {
            alert(err)
            setisLoading(false)
          },
          noToken: () => history.push("/login")
        });
    }

    let downloadCSV = async () => {
        await doRequest({
          url: `/admin/user/downloadusers`,
          method: "get",
          onSuccess: (data) => {
            console.log(data)
          },
          onError: (err) => {
            alert(err)
          },
        });
    }

    useEffect(() => {
        let func = async () => {
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
          await getUsers();
        }
        func();
    }, [])
    
    
        return (
            <div className="get-user">

              <Topbar history={history}/>
        {isLoading ?
        (<center>
          <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
        </center>)
        : (
          <div className={styles.allUsers}>
            <div className={styles.rowForm}>
              <a className={styles.secButton} href={`${data2.url}/api/admin/user/downloadusers`} target="__blank">
                Download CSV
              </a>
            </div>
            <div style={{ overflowX: "auto", width: "100vw" }}>
              <table>
                <thead>
                  <tr>
                    <th>UserId</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => {
                    console.log(user.phone)
                    return (<tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
                
            </div>
        )
}
