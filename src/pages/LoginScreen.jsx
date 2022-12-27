import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './styles/loginScreen.css'

const LoginScreen = () => {

    const { register, handleSubmit, reset } = useForm()
    const [isLogged, setIsLogged] = useState(false)
    const [isErrorLogin, setIsErrorLogin] = useState(false)
    
    const navigate = useNavigate();


    const submit = data => {
        const URL = "https://e-commerce-api.academlo.tech/api/v1/users/login";

        axios.post(URL, data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                console.log(res.data)
                setIsLogged(true)
            })
            .catch(err => {
                setIsErrorLogin(true)
                setTimeout(() => {
                    setIsErrorLogin(false)
                }, 6000)
                console.log(err)
                localStorage.setItem("token", '')
            })
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLogged(false)
    }

    if (localStorage.getItem('token')) {
        return (
            <div className='userLogged__container'>
                <h2>User Logged</h2>
                <div className='userLogged__icon'>
                    <i className=" fa-solid fa-circle-user"></i>
                </div>
                <button className='userLooged__btn' onClick={handleLogout}>Logout</button>
            </div>
        )
    }



    const goToSignup = () => {
        navigate('/signup')
    }

    const getToken = localStorage.getItem("token");

    return (
        // <>
        //     {
        //         getToken ? (
        //             <h2>Si</h2 >
        //         ) : (
                    <div className='login'>
                        <h3 className='login__header'>Welcome! Enter your email and password to continue</h3>
                        <div className='login__test-data__container'>
                            <h4 className='login__test-data__header'>Test data</h4>
                            <div className='login__test-data__email__container'>
                                <span><i className="fa-regular fa-envelope"></i> :</span><span className='login__test-data-email'>test@mail.com</span>
                            </div>
                            <div className='login__test-data__password__container'>
                                <span><i className="fa-solid fa-lock"></i> : </span><span className='login__test-data-password'>Testmail123</span>
                            </div>
                        </div>
                        <form className='login__form' onSubmit={handleSubmit(submit)}>
                            <div className='login__form__email__container'>
                                <label className='login__form__email__label' htmlFor="email">Email</label>
                                <input className='login__form__email__input' type="email" id='email' {...register('email')} />
                            </div>
                            <div>
                                <label className='login__form__password__label' htmlFor="password">Password</label>
                                <input className='login__form__password__input' type="password" id='password' {...register('password')} />
                            </div>
                            <div>
                                {
                                    isErrorLogin && 'Invalid credentials, try again...'
                                }
                            </div>
                            <button className='login__form__btn'>Login</button>
                        </form>
                        <div>
                            <p>Don't have an acconunt? <span className='signup__text' onClick={goToSignup}>Sign up</span></p>
                        </div>
                    </div>
            // )}
    // </>
    )
}

export default LoginScreen