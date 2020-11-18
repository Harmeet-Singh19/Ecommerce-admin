import React, { useEffect, useState } from "react";
import doRequest from "../../utils/requestHooks";
import './GetUser.css'
import Loader from "react-loader-spinner"
import data2 from '../../config'

export default ({ history }) => {
    const [data, setdata] = useState([])
    const [isLoading, setisLoading] = useState(true)


    let getUsers = async () => {
        await doRequest({
          url: `/admin/users/`,
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
          url: `/admin/users/downloadusers`,
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
          await getUsers();
        }
        func();
    }, [])
    
    
        return (
            <div className="get-user">

        {isLoading ?
        (<center>
          <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
        </center>)
        : (
          <div className="allUsers">
            <div className="rowForm">
              <a className="secButton" href={`${data2.url}/api/admin/users/downloadusers`} target="__blank">
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
