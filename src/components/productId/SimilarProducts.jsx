import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProduct from '../home/CardProduct'
import './styles/similarProducts.css'

const SimilarProducts = ({ product }) => {

    const [categories, setCategories] = useState()
    const [idCategory, setIdCategory] = useState()
    const [similarProducts, setSimilarProducts] = useState()

    useEffect(() => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/products/categories'
        axios.get(URL)
            .then(res => setCategories(res.data.data.categories))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (categories && product) {
            const cb = category => category.name === product.category
            setIdCategory(categories.filter(cb)[0].id)
        }
    }, [categories, product])

    
    useEffect(() => {
        if (idCategory) {
            const URL = `https://e-commerce-api.academlo.tech/api/v1/products/?category=${idCategory}`
            axios.get(URL)
            .then(res => setSimilarProducts(res.data.data.products))
            .catch(err => console.log(err))
        }
    }, [idCategory])
    
    console.log(similarProducts)

    return (
        <div className='similarProducts__main'>
            <h2 className='similarProducts__title'>Discover similar products</h2>
            <div className='similarProdcuts__container'>
                {
                    similarProducts?.map(prod => {
                        if(product.id !== prod.id){
                            return (<CardProduct
                            product= {prod}
                            key={prod.id}
                            />)
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SimilarProducts
