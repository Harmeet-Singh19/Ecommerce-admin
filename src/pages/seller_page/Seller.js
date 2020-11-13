import React from 'react'
import Item from './Items'

import './Seller.css'

function Seller() {
    return (
        <div className = "seller-page">
            <h1 className = "seller-heading">Welcome , Name of User</h1>

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
                    <Item duty = "Account Info"></Item>
                    
                </div>

            </div>

        </div>
    )
}

export default Seller
