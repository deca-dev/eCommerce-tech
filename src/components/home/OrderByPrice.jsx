import React from 'react'
import { useDispatch } from 'react-redux'
import { ascendingProducts, descendingProducts } from '../../store/slices/products.slice'
import './styles/orderByPrice.css'

const OrderByPrice = () => {

  const dispatch = useDispatch()
  const handleAscending = () => {
    dispatch(ascendingProducts())
  }

  const handleDescending = () => {
    dispatch(descendingProducts())
  }

  return (
    <div className='sort'>
      <h3 className='sort__title'>Sort</h3>
      <div className='sort__btn__container'>
        <button className='sort__btn' onClick={handleAscending}>Price: Low to High</button>
        <button className='sort__btn' onClick={handleDescending}>Price: High to Low</button>
      </div>
    </div>
  )
}

export default OrderByPrice