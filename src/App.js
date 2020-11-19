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
const AllAdminPage=lazy(()=>import('./pages/all_admin_page/allAdmin'))
const GetUserPage = lazy(()=>import('./pages/get_users_page/GetUser'))
const EditPage= lazy(()=>import('./pages/edit_books/edit_book'))
const AllLiveOrdersPage = lazy(() =>
  import('./pages/live_order_page/all_orders_page')
)
const EditLiveOrderPage = lazy(() =>
  import('./pages/live_order_page/edit_order_page')
)

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
    <Route exact path="/add/books" exact component={UploadPage}/>
    <Route exact path="/books/:id" component={EditPage}/>
    <Route exact path="/add/admins" component={AddAdminPage}/>
    <Route exact path="/admins" component={AllAdminPage}/>
    <Route exact path="/getusers" component={GetUserPage}/>
    <Route exact path='/liveorders' component={AllLiveOrdersPage} />
    <Route exact path='/liveorders/:id' component={EditLiveOrderPage} />



  </Suspense>

  );
}

export default App;