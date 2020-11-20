import React, { useEffect, useState } from "react";
import doRequest from "../../utils/requestHooks";
// import "./all_admins_page.css";
import TopBar from "../../components/Header/Header";
import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import { connect } from 'react-redux';
import styles from './allAdmin.module.css'

const setUser = (user) => {
    // console.log(user)
    return {
      type: 'SET_USER',
      user
    }
  }
  
  const getUser = () => async (dispatch) => {
    await doRequest({
      url: "/admin/auth/verify",
      method: "get",
      onSuccess: async (data) => {
        // console.log(data)
        dispatch(setUser(data))
      },
    });
  };

const AllAdminPage = ({ user, history, getUser }) => {
  const [data, setdata] = useState([])
  const [isLoading, setisLoading] = useState(true)
 
  useEffect(() => {
    if (!user)
      getUser()
    let func = async () => {
      await doRequest({
        url: "/admin/auth/all-admins",
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
    func();
  }, [])

  useEffect(() => {
    console.log(user, user.admin)
    if (!user.admin)
      getUser()
  }, [user])


  return (
    <>
      <TopBar history={history} />
      {isLoading ?
        (<center>
          <Loader type='ThreeDots' color='yellow' height={150} width={150} />
        </center>)
        : (<div className={styles.allAdmins}>
          <div className={styles.addOptions}>
           
              <button className={styles.primaryButton} onClick={() => history.push("/admins/add")}>
                Add Admin/Vendor
              </button>
            
            
          </div>
          <div style={{ overflowX: "auto", width: "100vw",color:"white" }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Phone Number</th>
                  <th>Type of Admin</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.map((admin, index) => {
                  return (<tr key={index}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                  <td>{(admin.isVendor===false)?(
                      "SuperAdmin"
                  ):("Vendor")}</td>
                    
                    {
                      <td className="edit" onClick={() => history.push(`/admins/${admin._id}`)}>
                        <FaPencilAlt className="icon" />
                      </td>
                     
                    }
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

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(AllAdminPage);
