import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductInfo from '../components/productId/ProductInfo'
import SimilarProducts from '../components/productId/SimilarProducts'
import SliderImgs from '../components/productId/SliderImgs'
import './styles/productId.css'

const ProductId = () => {

  const [product, setProduct] = useState()

  const { id } = useParams()

  useEffect(() => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`
    axios.get(URL)
      .then(res => setProduct(res.data.data.product))
      .catch(err => console.log(err))
  }, [id])


  return (
    <div>
        <div className='history'>
          <a href="/">Home</a>
          <div className='separator'></div>
          <b>{product?.title}</b>
        </div>
      <div className='productImg-info__container'>
        {
          product && <SliderImgs product={product} />

        }
        <ProductInfo product={product} />
      </div>
      <SimilarProducts product={product} />
    </div>
  )
}

export default ProductId