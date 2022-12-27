import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CardProduct from "../components/home/CardProduct"
import FilterCategory from "../components/home/FilterCategory"
import FilterPrice from "../components/home/FilterPrice"
import InputSearch from "../components/home/InputSearch"
import OrderByPrice from "../components/home/OrderByPrice"
import { getAllProducts } from "../store/slices/products.slice"
import './styles/home.css'

const Home = () => {

    const [inputText, setInputText] = useState('')
    const [filterByText, setFilterByText] = useState()
    const [filterByPrice, setFilterByPrice] = useState({ from: 0, to: Infinity })

    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        if (inputText !== '' && products) {
            const cb = product => product.title.toLowerCase().includes(inputText.toLowerCase().trim())
            setFilterByText(products.filter(cb))
        } else {
            setFilterByText(products)
        }
    }, [inputText, products])

    const callBackFilterPrice = product => {
        return +product.price >= filterByPrice.from && +product.price <= filterByPrice.to
    }

    const filterOpen = useRef()

    const clickFilterMenu = () => {
        filterOpen.current.classList.toggle('home__principal__filters-open')
    }

    return (
        <main className="home">
            <div onClick={clickFilterMenu} className="home__filter-icon__container"><i class="fa-solid fa-filter"></i><span>Filters</span></div>
            <div className="home__filter__container">
                <div className="home__principal__filters" ref={filterOpen}>
                    <div className="home__filters__container">
                        <div className="home__filters__xIcon"><i onClick={clickFilterMenu} class="home__filters__x fa-solid fa-xmark"></i></div>
                        <div className="home__filters__components">
                            <h3 className="home__filters__title">Filters</h3>
                            <FilterCategory />
                            <FilterPrice
                                setFilterByPrice={setFilterByPrice}
                            />
                            <OrderByPrice />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                <InputSearch
                    setInputText={setInputText}
                    inputText={inputText}
                />
            </div>
                    <div className="home__container">
                        {
                            filterByText?.filter(callBackFilterPrice).map(product => (
                                <CardProduct
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Home

