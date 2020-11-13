import React from 'react'
import './Item.css'

function Items(props) {
    return (
        <div className="individual-card">
            {props.duty}
        </div>
    )
}

export default Items
