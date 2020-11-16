import React from 'react'
import './PreviousOrders.css'
import './IndividualOrdersHeader'
import IndividualOrdersHeader from './IndividualOrdersHeader'
import IndividualOrder from './IndividualOrders'
function PreviousOrder() {
    return (
        <div className= "previous-orders">
            <h1 className= "welcome-heading">Previous Orders</h1>

            <div className="individual-orders">
                <IndividualOrdersHeader />
                <IndividualOrder 
                    order_id =  "ladlvlamo"
                    order_status = "Confirmed"
                    order_date = "27-12-2000"
                    order_user_name = "Mulli Barwal"
                    user_phone = "10101010111"
                    order_price = "300"
                    />

                <IndividualOrder 
                    order_id =  "ladlvlamo"
                    order_status = "Confirmed"
                    order_date = "27-12-2000"
                    order_user_name = "Mulli Barwal"
                    user_phone = "10101010111"
                    order_price = "300"
                    /> 

                <IndividualOrder 
                    order_id =  "ladlvlamo"
                    order_status = "Confirmed"
                    order_date = "27-12-2000"
                    order_user_name = "Mulli Barwal"
                    user_phone = "10101010111"
                    order_price = "300"
                    />      
            </div>
        </div>
    )
}

export default PreviousOrder
