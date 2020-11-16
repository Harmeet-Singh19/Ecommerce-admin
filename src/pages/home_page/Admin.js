import React from 'react'
import './Admin.css'
import Item from './Items'

function Admin() {
    return (
        <div className = "admin-page">
            <h1 className = "admin-heading">Welcome , Admin </h1>

            <div className = "all-duties">

                <div className ="duty-card">
                    <Item duty = "Previous Orders"></Item>
                    
                </div>

                <div className ="duty-card">
                    <Item duty = "Upload Books"></Item>
                    
                </div>
                <div className ="duty-card">
                    <Item duty = "Edit Books"></Item>
                    
                </div>
                <div className ="duty-card">
                    <Item duty = "Delivered Orders"></Item>
                    
                </div>

            </div>

            <div className = "all-duties">

                <div className ="duty-card">
                    <Item duty = "Edit Customer Accounts"></Item>
                    
                </div>

                <div className ="duty-card">
                    <Item duty = "Edit Seller Accounts"></Item>
                    
                </div>
               

            </div>

        </div>
    )
}

export default Admin
