import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProductsCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import './styles/cardProduct.css'

const CardProduct = ({ product }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigation = () => {
        navigate(`/product/${product.id}`)
    }

    const handleAddCart = e => {
        e.stopPropagation()
        const URL = "https://e-commerce-api.academlo.tech/api/v1/cart";
        const data = {
            "id": product.id,
            "quantity": 1
        };
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res.data)
                dispatch(getAllProductsCart())
            })
            .catch(err => console.log(err))
    };

    return (
        <article onClick={handleNavigation} className='product'>
            <div className='productId__container'>
                
                    <header className='product__header'>
                        <img className='product__img' src={product.productImgs[0]} alt="" />
                    </header>

               
                <div className='product__body'>
                    <h3 className='product__title'>{product.title}</h3>
                    <div className='product__price'>
                        <span className='product__price-label' >Price</span>
                        <p className='product__price-number'>{
                            String(parseFloat(+product.price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }</p>
                    </div>
                    <button className='product__icon-container' onClick={handleAddCart}>
                        <i className="product__icon fa-solid fa-cart-shopping"></i>
                    </button>
                </div>


            </div>
        </article>
    )
}

export default CardProduct