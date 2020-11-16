import React, { useEffect, useState } from "react";
import doRequest from "../../../utils/requestHooks";
// import "./all_admins_page.css";
import TopBar from "../../../components/topBar/topbar";
import { FaPencilAlt } from "react-icons/fa";
import Loader from "react-loader-spinner"
import { connect } from 'react-redux';
import { getUser } from "../../../actions/userActions";

const AllAdminPage = ({ user, history, getUser }) => {
  const [data, setdata] = useState([])
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    if (!user.admin)
      getUser()
    let func = async () => {
      await doRequest({
        url: "/admin/logs/all-admins",
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
          <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
        </center>)
        : (<div className="allAdmins">
          <div className="addOptions">
            {user.admin.roles.includes("create_admin") ?
              <button className="primaryButton" onClick={() => history.push("/admins/add")}>
                Add User
              </button>
              :
              <></>
            }
          </div>
          <div style={{ overflowX: "auto", width: "100vw" }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Phone Number</th>
                  <th>Roles</th>
                  {user.admin.roles.includes("assign_roles") ?
                    <th className="edit">Edit</th> :
                    <></>
                  }
                </tr>
              </thead>
              <tbody>
                {data.map((admin, index) => {
                  return (<tr key={index}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    <td className="roles">{admin.roles.map((role, index) => {
                      return (<span key={index}>{role}{", "}</span>)
                    })}</td>
                    {user.admin.roles.includes("assign_roles") ?
                      <td className="edit" onClick={() => history.push(`/admin/${admin._id}`)}>
                        <FaPencilAlt className="icon" />
                      </td>
                      :
                      <></>
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currentUser.user
  }
}

const mapDispatchToProps = {
  getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(AllAdminPage);
