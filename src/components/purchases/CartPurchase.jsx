import React from 'react'
import './styles/cartPurchases.css'

const CartPurchase = ({ purchase }) => {

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateData = new Date(purchase.updatedAt)

  const datePurchase = `${months[dateData.getMonth()]} ${dateData.getDate()}, ${dateData.getFullYear()}`;

  console.log(purchase)

  return (
    <article className='purchase'>
      <header className='purchase__date'>{datePurchase}</header>
      <div className='purchase__body'>
        {
          purchase?.cart.products.map(product => (
            <section className='purchase__body-info'>
              <h3 className='purchase__info__title'>{product.title}</h3>
              <div className='purchase__info__quantity-price__container'>
                <span className='purchase__info__quantity'>{product.productsInCart.quantity}</span>
                <div className='purchase__info__price'>${
                  String(parseFloat(+product.price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }</div>
              </div>
            </section>

           
          ))
        }
      </div>
    </article>
  )
}

export default CartPurchase