import React from 'react'
import './styles/cartProduct.css'

const NoProductsComponent = () => {
  return (
    <div className='noProducts__img-container'>
        <img className='noProducts__img' src='./images/empty-cart.jpeg' alt="" />
    </div>
  )
}

export default NoProductsComponent