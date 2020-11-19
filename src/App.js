import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './App.css'
import allBooks from './pages/books_page/allBooks'


const LoginPage= lazy(()=>
import('./pages/login_page/loginScreen'))

const HomePage=lazy(()=>import('./pages/home_page/Admin'))
const UploadPage = lazy(()=> import('./pages/upload_books/Upload'))
const AddAdminPage = lazy(() => import('./pages/add_admin_page/AddAdmin'))
const GetUserPage = lazy(()=>import('./pages/get_users_page/GetUser'))
const EditPage= lazy(()=>import('./pages/edit_books/edit_book'))
const AllBooksPage = lazy(() => import('./pages/books_page/allBooks'))



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
    <Route exact path="/books" component={AllBooksPage}/>
    <Route exact path="/books/add" component={UploadPage}/>
    <Route exact path="/addadmin" component={AddAdminPage}/>
    <Route exact path="/getuser" component={GetUserPage}/>
    <Route exact path="/books/:id" component={EditPage}/>

  </Suspense>

  );
}

export default App;