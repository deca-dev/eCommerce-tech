import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProducts, getProductsByCategory } from '../../store/slices/products.slice'
import './styles/filterCategory.css'

const FilterCategory = () => {

    const [categories, setCategories] = useState()
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/products/categories';
        axios.get(URL)
            .then(res => setCategories(res.data.data.categories))
            .catch(err => console.log(err))
    }, [])

    const handleFetchCategory = id => {
        if (id) {
            dispatch(getProductsByCategory(id))
        } else {
            dispatch(getAllProducts())
        }
    }

    return (
        <article className='accordion'>
            <div className='accordion-item'>
                <div onClick={() => setIsActive(!isActive)} className="accordion-title">
                    <h3>Category</h3>
                    <div className='accordion__plus-minus'>{isActive ? '-' : '+'}</div>
                </div>
                {
                    isActive &&
                    <div>
                        {
                            <ul className='panel'>
                                <li className='panel__item' onClick={() => handleFetchCategory()}>All Products</li>
                                {
                                    categories?.map(category => (
                                        <li
                                            className='panel__item'
                                            onClick={() => handleFetchCategory(category.id)}
                                            key={category.id}
                                        >{category.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        }

                    </div>
                }
            </div>
        </article>
    )
}

export default FilterCategory