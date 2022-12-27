import axios from 'axios'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/shared/Footer'
import Header from './components/shared/Header'
import Cart from './pages/Cart'
import Home from './pages/Home'
import LoginScreen from './pages/LoginScreen'
import ProductId from './pages/ProductId'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Purchases from './pages/Purchases'
import Signup from './pages/Signup'

function App() {

    return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductId/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/signup' element={<Signup/>}/>

        <Route element={<ProtectedRoutes />}>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
        </Route>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App

