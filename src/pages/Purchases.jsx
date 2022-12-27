import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartPurchase from '../components/purchases/CartPurchase'
import getConfig from '../utils/getConfig'
import './styles/purchases.css'

const Purchases = () => {

  const [purchases, setPurchases] = useState()

  useEffect(() => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/purchases";
    axios.get(URL, getConfig())
      .then(res => setPurchases(res.data.data.purchases))
      .catch(err => console.log(err))
  }, [])



  return (
    <div className='purchases'>
      <h2 className='purchases__title'>My Purchases</h2>
      <div className='purchases__container'>
        {
          purchases?.length ? (
          purchases?.sort((a , b) => {
            const prevDate = new Date(a.createdAt)
            const nextDate = new Date(b.createdAt)
            return nextDate - prevDate
          }).map(purchase => (
            <CartPurchase
            key = {purchase.id}
            purchase = {purchase}
            />

          ))
          ) : (
            <p>No hay nada</p>
          )
        }
      </div>
    </div>
  )
}

export default Purchases