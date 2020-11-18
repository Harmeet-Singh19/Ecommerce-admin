import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './App.css'


const LoginPage= lazy(()=>
import('./pages/login_page/loginScreen'))

const HomePage=lazy(()=>import('./pages/home_page/Admin'))
const UploadPage = lazy(()=> import('./pages/upload_books/Upload'))
const AddAdminPage = lazy(() => import('./pages/add_admin_page/AddAdmin'))

function App() {
  return (
    <Suspense
    fallback={
      <center>
        <Loader type='ThreeDots' color='yellow' height={150} width={150} />
      </center>
    }
  >
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/login" component={LoginPage}/>
    <Route exact path="/upload" component={UploadPage}/>
    <Route exact path="/addadmin" component={AddAdminPage}/>
  </Suspense>

  );
}

export default App;