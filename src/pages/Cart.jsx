import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartProduct from '../components/cart/CartProduct'
import { getAllProductsCart, setCartGlobal } from '../store/slices/cart.slice'
import getConfig from '../utils/getConfig'
import NoProductInCart from './NoProductInCart'
import './styles/cart.css'

const Cart = () => {

  const [total, setTotal] = useState(0)

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = () => useNavigate()

  useEffect(() => {
    dispatch(getAllProductsCart())
  }, [])

  console.log(cart)

  const handlePurchase = () => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/purchases"
    const data = {
      street: "Green St. 1456",
      colony: "Southwest",
      zipCode: 12345,
      city: "USA",
      references: "Some references",
    }
    axios.post(URL, data, getConfig())
    .then(res => {
      console.log(res.data)
      dispatch(setCartGlobal(null))
      setTotal(0)
      
    })
    .catch(err => console.log(err))

  }

  useEffect(() => {
    if (cart) {
      const result = cart.reduce((acc, cv) => {
        let midResult = acc + Number(cv.price) * cv.productsInCart.quantity;
        return midResult
      }, 0)
      setTotal(result)
    }
  }, [cart])


  return (
    <div>
      {
        cart?.length ? (
          <div className='cart'>
            <h3>My Cart</h3>
            <div className='cart__container'>
              {
                cart?.map(product => (
                  <CartProduct
                    key={product.id}
                    product={product}
                  />
                ))
              }
            </div>
            <div className='total__container'>
              <div className='total__total'>
                <spa className='total__label'>Total:</spa>
                <span className='total__number'>${
                  String(parseFloat(total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                }</span>

              </div>
              <button className='total__btn' onClick={handlePurchase}>Checkout</button>
            </div>
          </div>
        ) :
          <div>
            <NoProductInCart />
          </div>
      }

    </div>
  )
}



// <div className='cart'>
//     <h3>My Cart</h3>
//   <div className='cart__container'>
//     {
//       cart?.map(product => (
//         <CartProduct
//           key={product.id}
//           product={product}
//         />
//       ))
//     }
//   </div>
//   <div className='total__container'>
//     <div className='total__total'>
//       <spa className='total__label'>Total:</spa>
//       <span className='total__number'>${
//         String(parseFloat(total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
//       }</span>

//     </div>
//     <button className='total__btn' onClick={handlePurchase} >Checkout</button>
//   </div>
// </div>



export default Cart