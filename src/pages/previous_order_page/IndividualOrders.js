import React from 'react'
import './IndividualOrders.css'

function IndividualOrders(props) {
    return (
        <div className="individual-order">
            <div className= "row-order">
                <div className="col-order">{props.order_id}</div>
                <div className="col-order">{props.order_status}</div>
                <div className="col-order">{props.order_date}</div>
                <div className="col-order">{props.order_user_name}</div>
                <div className="col-order">{props.user_phone}</div>
                <div className="col-order">{props.order_price}</div>
            </div>
        </div>
    )
}

export default IndividualOrders
