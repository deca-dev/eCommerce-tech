import React, { useState } from 'react'
import './styles/filterPrice.css'

const FilterPrice = ({ setFilterByPrice }) => {

    const handleSubmit = e => {
        e.preventDefault()
        const from = +e.target.from.value
        const to = +e.target.to.value
        const obj = {
            from: from,
            to: to !== 0 ? to : Infinity
        }
        setFilterByPrice(obj)
    }

    const [isActive, setIsActive] = useState(false);

    return (
        <form className='accordion__price' onSubmit={handleSubmit}>
            <div onClick={() => setIsActive(!isActive)} className="accordion-title">
                <h3>Price</h3>
                <div className='accordion__plus-minus'>{isActive ? '-' : '+'}</div>
            </div>
            {
                isActive &&
                <div className='accordion__container'>
                    <div className='accordion__container__label__input'>
                        <label className='accordion__label' htmlFor="">From</label>
                        <input className='accordion__input' type="number" id='from' />
                    </div>
                    <div className='accordion__container__label__input'>
                        <label className='accordion__label' htmlFor="">To</label>
                        <input className='accordion__input' type="number" id='to' />
                    </div>
                    <div className='accordion__btn__container'>
                        <button className='accordion__btn'>Filter</button>
                    </div>
                </div>
            }
        </form>
    )
}

export default FilterPrice