import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './App.css'


const LoginPage= lazy(()=>
import('./pages/login_page/loginScreen'))


function App() {
  return (
    <Suspense
    fallback={
      <center>
        <Loader type='ThreeDots' color='yellow' height={150} width={150} />
      </center>
    }
  >
    <Route exact path="/login" component={LoginPage}/>
  </Suspense>
  );
}

export default App;