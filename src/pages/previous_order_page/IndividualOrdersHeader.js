import React from 'react'
import './IndividualOrdersHeader.css'

function IndividualOrders() {
    return (
        <div className="individual-order">
            <div className= "row-order-header">
                <div className= "col-order">OrderID</div>
                <div className= "col-order">Order Status</div>
                <div className= "col-order">Placed Date</div>
                <div className= "col-order">Name</div>
                <div className= "col-order">Phone No.</div>
                <div className= "col-order">Invoice value</div>
            </div>
        </div>
    )
}

export default IndividualOrders
