import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './App.css'
import allBooks from './pages/books_page/allBooks'


const LoginPage= lazy(()=>
import('./pages/login_page/loginScreen'))

const HomePage=lazy(()=>import('./pages/home_page/Admin'))



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
    <Route exact path="/book" component={AllBooksPage}></Route>
  </Suspense>
  );
}

export default App;