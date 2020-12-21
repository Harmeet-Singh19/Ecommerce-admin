import React from 'react'
import styles from './Item.module.css'

function Items(props) {
    return (
        <div className={styles.individual_card}>
            {props.duty}
        </div>
    )
}

export default Items
