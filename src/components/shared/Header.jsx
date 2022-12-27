import React, { useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './styles/header.css'

const Header = () => {

    const navbarOpen = useRef()

    const navigate = useNavigate()


    const clickMenuHam = () => {
        navbarOpen.current.classList.toggle('header__nav-open')
    }

    return (
        <header className='header'>
            <h1 className='header__title'>
                <Link to='/'>e-Commerce</Link>
            </h1>
            <div onClick={clickMenuHam} className='header__menuham'>
                <i className="fa-solid fa-bars"></i>
            </div>
            <nav ref={navbarOpen} className='header__nav'>
                <ul className='header__list'>
                    <li className='header__item'><NavLink onClick={clickMenuHam} 
                    className={({isActive}) => isActive ? 'header__link-active header__link' : 'header__link'} to="/">
                        <i class="fa-solid fa-house-chimney"></i>
                        <p>Home</p>
                    </NavLink>

                    </li>
                    <li className='header__item'><NavLink onClick={clickMenuHam} className={({isActive}) => isActive ? 'header__link-active header__link' : 'header__link'} to="/login">
                        <i class="fa-solid fa-user"></i>
                        <p>Login</p>
                    </NavLink>

                    </li>
                    <li className='header__item'><NavLink onClick={clickMenuHam} 
                    className={({isActive}) => isActive ? 'header__link-active header__link' : 'header__link'} to="/purchases">
                        <i class="fa-solid fa-shop"></i>
                        <p>Purchases</p>
                    </NavLink>

                    </li>
                    <li className='header__item'><NavLink onClick={clickMenuHam} 
                    className={({isActive}) => isActive ? 'header__link-active header__link' : 'header__link'} to="/cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p>Cart</p>
                    </NavLink>

                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header