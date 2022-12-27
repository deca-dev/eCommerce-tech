import React from 'react'
import './styles/inputSearch.css'

const InputSearch = ({ setInputText, inputText }) => {

    const handleChange = e => {
        e.preventDefault()
        setInputText(e.target.value)

    }

    return (
        <div className='inputSearch'>
            <input className='inputSearch__input' value={inputText} onChange={handleChange} type="text" id='inputSearch' placeholder='What are you looking for?' />
            <span><i className="inputSearch__icon fa-solid fa-magnifying-glass"></i></span>
        </div>
    )
}

export default InputSearch