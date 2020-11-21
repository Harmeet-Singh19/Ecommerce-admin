import React,{useEffect} from 'react'
import './Admin.css'
import Item from './Items'



function Admin(props) {
    useEffect(async() => {
        let token = await localStorage.getItem('token')
            console.log(token)
            if (token !== null) {
                console.log(props)
            } else {
                //should be restricted
                props.history.push('/login')
            }
       
      }, [])
    return (
        <div className = "admin-page">
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
        </div>
    )
}


export default(Admin);
