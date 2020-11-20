import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={async(props) =>{
            let token = await localStorage.getItem('token')

            return(
            token!==null ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            ))}
        }
    />
);


export default (PrivateRoute);
