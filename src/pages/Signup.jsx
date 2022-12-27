import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import './styles/signup.css'
import { useNavigate } from 'react-router-dom'
import UserCreate from '../components/Sign Up/UserCreate'

const Signup = () => {
    const { register, handleSubmit, reset } = useForm()

    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    const [isEmptyFieldsError, setIsEmptyFieldsError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [errorRole, setErrorRole] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const [modalUserSucces, setModalUserSucces] = useState(false);


  const navigateLogin = () => navigate("/login");

  const defaultValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "Admin",
  };

  const submit = (data) => {
    const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const regexEmail = /\S+@\S+\.\S+/;
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users";
    if (
      data.firstName == "" ||
      data.lastName == "" ||
      data.email == "" ||
      data.password == "" ||
      data.phone == "" ||
      data.role == ""
    ) {
      setIsEmptyFieldsError(true);
      setTimeout(() => {
        setIsEmptyFieldsError(false);
      }, 5000);
    } else if (!regexPassword.test(data.password)) {
      setIsPasswordError(true);
      setTimeout(() => {
        setIsPasswordError(false);
      }, 5000);
    } else if (!regexEmail.test(data.email)) {
      setErrorEmail(true);
      setTimeout(() => {
        setErrorEmail(false);
      }, 5000);
    } else if (data.phone.length < 10) {
      setMobileError(true);
      setTimeout(() => {
        setMobileError(false);
      }, 5000);
    } else if (data.role !== "admin") {
      setErrorRole(true);
      setTimeout(() => {
        setErrorRole(false);
      }, 5000);
    } else {
      axios
        .post(URL, data)
        .then((res) => {
          console.log(res.data);
          setModalUserSucces(true);
          setTimeout(() => {
            setModalUserSucces(false);
            navigate("/login");
          }, 3000);
          reset(defaultValue);
        })
        .catch((err) => console.log(err));
    }
  };



    return (
        <div className='signup'>
            {
                modalUserSucces ? (
                    <UserCreate/>
                ) : (
            
            <div className='signup__card'>
                <h3 className='signup__header'>Sign Up</h3>
                <div className='signup__test-data__container'>
                </div>
                <form className='signup__form' onSubmit={handleSubmit(submit)}>
                    <div className='signup__form__email__container'>
                        <label className='signup__form__email__label' htmlFor="email">Email</label>
                        <input className='signup__form__email__input' type="email" id='email' {...register('email')} />
                    </div>
                    <div>
                        <label className='signup__form__firstName__label' htmlFor="firstName">First Name</label>
                        <input className='signup__form__firstName__input' type="text" id='firstName' {...register('firstName')} />
                    </div>
                    <div>
                        <label className='signup__form__lastName__label' htmlFor="lastName">Last Name</label>
                        <input className='signup__form__lastName__input' type="text" id='lastName' {...register('lastName')} />
                    </div>
                    <div>
                        <label className='signup__form__password__label' htmlFor="password">Password</label>
                        <input className='signup__form__password__input' type="password" id='password' {...register('password')} />
                    </div>
                    <div>
                        <label className='signup__form__phone__label' htmlFor="phone">Phone(10 digits)</label>
                        <input className='signup__form__phone__input' type="tel" id='phone' {...register('phone')} />
                    </div>
                    <div>
                        <label className='signup__form__role__label' htmlFor="role" >Role</label>
                        <input className='signup__form__role__input' type="text" id='role' defaultValue='admin' {...register('role')} />
                    </div>

                    <div className="form__error">
            {isEmptyFieldsError && "All data must be fullfiled."}
            {isPasswordError &&
              "Password must be 8-16 characters long, include at least a number, a uppercase and a lowercase."}
            {mobileError && "Phone must be at least 10 digits long"}
            {errorRole && 'You must be an "admin" to continue! '}
            {errorEmail && "Invalid email example -> example@example.com"}
          </div>


                    <button className='signup__form__btn'>Sign up</button>
                </form>
                <div>
                    <p>Already have an account? <span className='signup__text' onClick={goToLogin}>Log in</span></p>
                </div>

            </div>
            )}
        </div>
    )
    
}

export default Signup