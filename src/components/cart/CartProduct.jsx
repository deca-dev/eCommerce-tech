import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllProductsCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import './styles/cartProduct.css'

const CartProduct = ({ product }) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${product.id}`
        axios.delete(URL, getConfig())
            .then(res => {
                dispatch(getAllProductsCart())
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    console.log(product)
    return (
        <div className='cartProduct__over'>
            <div className='cartProduct__container'>
                <article className='cartProduct__main'>
                    <h3 className='cartProduct__brand'>{product.brand}</h3>
                    <h2 className='cartProduct__title'>{product.title}</h2>
                    <ul className='cartProduct__info'>
                        <li className='cartProduct__info-quantity'><span>Quantity:</span><span className='cartProduct__quantity'>{product.productsInCart.quantity}</span></li>
                        <li className='cartProduct__info-total'><span className='cartProduct__info-tag'>Total:</span><span className='cartProduct__price'>
                            ${
                                String(parseFloat(+product.price * product.productsInCart.quantity).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                            }
                        </span></li>
                    </ul>
                </article>
                <button onClick={handleDelete} className='card-p__btn'><i className="cart-p__icon fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    )
}

export default CartProduct