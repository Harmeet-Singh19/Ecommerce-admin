import React, { lazy, Suspense, useEffect } from 'react'
import { Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './App.css'



const LoginPage = lazy(() =>
  import('./pages/login_page/loginScreen'))

const HomePage = lazy(() => import('./pages/home_page/Admin'))
const UploadPage = lazy(() => import('./pages/upload_books/Upload'))
const AddAdminPage = lazy(() => import('./pages/add_admin_page/AddAdmin'))
const AllAdminPage = lazy(() => import('./pages/all_admin_page/allAdmin'))
const EditAdminPage = lazy(() => import('./pages/edit_admin_page/EditAdmin'))
const GetUserPage = lazy(() => import('./pages/get_users_page/GetUser'))
const EditPage = lazy(() => import('./pages/edit_books/edit_book'))
const SendEmail = lazy(() => import('./pages/send_email_pages/SendEmail'))

const AllLiveOrdersPage = lazy(() =>
  import('./pages/live_order_page/all_orders_page')
)
const EditLiveOrderPage = lazy(() =>
  import('./pages/live_order_page/edit_order_page')
)

const PastOrders = lazy(() =>
  import('./pages/past_orders_page/past_orders_page')
)

const PastOrderDetails = lazy(() =>
  import('./pages/past_orders_page/past_order_details_page')
)

const AllBooksPage = lazy(() => import('./pages/books_page/allBooks'))
const AllVBooksPage = lazy(() => import('./pages/vbooks_page/allvbooks'))

const VendorAllBooksPage = lazy(() => import('./pages/vendor_allbooks_page/vendor_allbooks'))

const VendorUploadBookPage = lazy(() => import('./pages/upload_book_vendor_page/Upload'))

const VendorEditBookPage = lazy(() => import('./pages/edit_book_vendor_page/edit_book'))

const VendorAdminEditPage = lazy(() => import('./pages/edit_vendor_info_page/Edit'))

const EmailRecordsPage = lazy(() => import('./pages/emails_record_page/emailRecord'))

function App() {


  return (
    <Suspense
      fallback={
        <center>
          <Loader type='ThreeDots' color='yellow' height={250} width={250} />
        </center>
      }
    >
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/books" component={AllBooksPage} />
      <Route exact path="/vbooks" component={AllVBooksPage} />
      <Route exact path="/add/books" exact component={UploadPage} />
      <Route exact path="/books/:id" component={EditPage} />
      <Route exact path="/add/admins" component={AddAdminPage} />
      <Route exact path="/admins" component={AllAdminPage} />
      <Route exact path="/admins/:id" component={EditAdminPage} />
      <Route exact path="/getusers" component={GetUserPage} />
      <Route exact path='/liveorders' component={AllLiveOrdersPage} />
      <Route exact path='/liveorders/:id' component={EditLiveOrderPage} />
      <Route exact path='/orderhistory' component={PastOrders} />
      <Route exact path='/orderhistory/:id' component={PastOrderDetails} />
      <Route exact path='/vendor/books' component={VendorAllBooksPage} />
      <Route exact path='/email/records' component={EmailRecordsPage} />
      <Route exact path="/vendor/add/books" component={VendorUploadBookPage} />
      <Route exact path="/vendor/books/:id" component={VendorEditBookPage} />
      <Route exact path="/vendor/info" component={VendorAdminEditPage} />
      <Route exact path="/sendemail" component={SendEmail} />
    </Suspense>

  );
}

export default App;