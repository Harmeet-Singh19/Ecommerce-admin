import React,{useEffect, useState} from 'react'
import './Admin.css'
import Item from './Items'
import doRequest from "../../utils/requestHooks";


function Admin(props) {

    const[vendor,setVendor]=useState(false)

    useEffect(async() => {
        let token = await localStorage.getItem('token')
          //  console.log(token)
            if (token !== null) {
             //   console.log(props)
            } else {
                //should be restricted
                props.history.push('/login')
            }
            await doRequest({
                url: "/admin/auth/verify",
                method: "get",
                onSuccess: async (data) => {
                    setVendor(data.admin.isVendor) 
                },
              });
       
      }, [])
    return (
        <div className = "admin-page">
            {
                vendor?(
                    <>
                     <h1 className = "admin-heading">Welcome , Vendor </h1>

<div className = "all-duties">
<div className ="duty-card" onClick={()=>props.history.push('/vendor/info')}>
        <Item duty = "Edit Your Info" ></Item>
        
    </div>
    <div className ="duty-card" onClick={()=>props.history.push('/vendor/books')}>
        <Item duty = "All Books" ></Item>
        
    </div>
   
    <div className ="duty-card" onClick={()=>props.history.push('/vendor/add/books')}>
        <Item duty = "Upload Books" ></Item>
        
    </div>
  

</div>
                    </>
                ):(
                    <>
                    <h1 className = "admin-heading">Welcome , Admin </h1>

                    <div className = "all-duties">
        
                        <div className ="duty-card" onClick={()=>props.history.push('/add/books')}>
                            <Item duty = "Upload Books" ></Item>
                            
                        </div>
                       
                        <div className ="duty-card" onClick={()=>props.history.push('/books')}>
                            <Item duty = "All Books" ></Item>
                            
                        </div>
                        <div className ="duty-card" onClick={()=>props.history.push('/admins')}>
                            <Item duty = "All Admins" ></Item>
                            
                        </div>
                        <div className ="duty-card"  onClick={()=>props.history.push('/add/admins')}>
                            <Item duty = "Add new Admin/Vendor"></Item>
                            
                        </div>
                        <div className ="duty-card" onClick={()=>props.history.push('/getusers')}>
                            <Item duty = "Get All Customers/Users" ></Item>
                            
                        </div>
                        <div className ="duty-card" onClick={()=>props.history.push('/liveorders')}>
                            <Item duty = "Get Live Orders" ></Item>
                            
                        </div>
                        <div className ="duty-card" onClick={()=>props.history.push('/orderhistory')}>
                            <Item duty = "Past Orders" ></Item>
                            
                        </div>
                        
        
                    </div>
                    </>
                )
            }
           
        </div>
    )
}


export default(Admin);
